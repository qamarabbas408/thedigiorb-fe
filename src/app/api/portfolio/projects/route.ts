import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const status = searchParams.get('status');
    
    let query = 'SELECT * FROM projects WHERE 1=1';
    const params: any[] = [];
    
    if (categoryId) {
      query += ' AND category_id = ?';
      params.push(categoryId);
    }
    
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }
    
    query += ' ORDER BY created_at DESC';
    
    const [rows] = await pool.query(query, params) as [any[], any];
    
    const projects = rows.map(row => {
      const galleryImages = row.gallery_images 
        ? JSON.parse(row.gallery_images) 
        : row.gallery 
          ? JSON.parse(row.gallery) 
          : [];
      
      return {
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
      };
    });
    
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Failed to read projects:', error);
    return NextResponse.json({ error: 'Failed to read projects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const id = Date.now().toString();
    const galleryImages = body.gallery || [];
    
    await pool.query(
      `INSERT INTO projects (id, title, subtitle, category_id, year, technologies, description, image, gallery_images, featured, client, url, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        body.title,
        body.subtitle || '',
        body.categoryId,
        body.year || new Date().getFullYear().toString(),
        JSON.stringify(body.technologies || []),
        body.description || '',
        body.image || '',
        JSON.stringify(galleryImages),
        body.featured || false,
        body.client || '',
        body.url || '#',
        body.status || 'published'
      ]
    );
    
    const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [id]) as [any[], any];
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
    }, { status: 201 });
  } catch (error) {
    console.error('Failed to create project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
