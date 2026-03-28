import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [rows] = await pool.query('SELECT * FROM testimonials WHERE id = ?', [id]) as [any[], any];
    
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    
    const row = rows[0];
    
    return NextResponse.json({
      id: row.id,
      name: row.name,
      title: row.title,
      company: row.company,
      content: row.content,
      rating: row.rating,
      image: row.image,
      featured: Boolean(row.featured),
      status: row.status,
      createdAt: row.created_at
    });
  } catch (error) {
    console.error('Failed to read testimonial:', error);
    return NextResponse.json({ error: 'Failed to read testimonial' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    await pool.query(
      `UPDATE testimonials SET 
        name = ?, title = ?, company = ?, content = ?, 
        rating = ?, image = ?, featured = ?, status = ?
       WHERE id = ?`,
      [
        body.name,
        body.title || '',
        body.company || '',
        body.content,
        body.rating || 5,
        body.image || '',
        body.featured || false,
        body.status || 'published',
        id
      ]
    );
    
    return NextResponse.json({
      id,
      name: body.name,
      title: body.title || '',
      company: body.company || '',
      content: body.content,
      rating: body.rating || 5,
      image: body.image || '',
      featured: body.featured || false,
      status: body.status || 'published'
    });
  } catch (error) {
    console.error('Failed to update testimonial:', error);
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await pool.query('DELETE FROM testimonials WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete testimonial:', error);
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}
