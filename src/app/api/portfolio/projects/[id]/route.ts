import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [id]) as [any[], any];
    
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    
    const row = rows[0];
    const galleryImages = row.gallery_images 
      ? JSON.parse(row.gallery_images) 
      : row.gallery 
        ? JSON.parse(row.gallery) 
        : [];
    
    return NextResponse.json({
      id: row.id,
      title: row.title,
      subtitle: row.subtitle,
      categoryId: row.category_id,
      year: row.year,
      technologies: row.technologies ? JSON.parse(row.technologies) : [],
      description: row.description,
      image: row.image || '/assets/img/portfolio/placeholder.webp',
      gallery: galleryImages,
      featured: Boolean(row.featured),
      client: row.client,
      url: row.url,
      status: row.status,
      createdAt: row.created_at
    });
  } catch (error) {
    console.error('Failed to read project:', error);
    return NextResponse.json({ error: 'Failed to read project' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const galleryImages = body.gallery || [];
    
    await pool.query(
      `UPDATE projects SET 
        title = ?, subtitle = ?, category_id = ?, year = ?, 
        technologies = ?, description = ?, image = ?, 
        gallery_images = ?, featured = ?, client = ?, url = ?, status = ?
       WHERE id = ?`,
      [
        body.title,
        body.subtitle || '',
        body.categoryId,
        body.year || '',
        JSON.stringify(body.technologies || []),
        body.description || '',
        body.image || '',
        JSON.stringify(galleryImages),
        body.featured || false,
        body.client || '',
        body.url || '#',
        body.status || 'published',
        id
      ]
    );
    
    const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [id]) as [any[], any];
    
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    
    const row = rows[0];
    const gallery = row.gallery_images ? JSON.parse(row.gallery_images) : [];
    
    return NextResponse.json({
      id: row.id,
      title: row.title,
      subtitle: row.subtitle,
      categoryId: row.category_id,
      year: row.year,
      technologies: row.technologies ? JSON.parse(row.technologies) : [],
      description: row.description,
      image: row.image || '/assets/img/portfolio/placeholder.webp',
      gallery: gallery,
      featured: Boolean(row.featured),
      client: row.client,
      url: row.url,
      status: row.status,
      createdAt: row.created_at
    });
  } catch (error) {
    console.error('Failed to update project:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await pool.query('DELETE FROM projects WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
