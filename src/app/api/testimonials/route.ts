import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const status = searchParams.get('status');
    
    let query = 'SELECT * FROM testimonials WHERE 1=1';
    const params: any[] = [];
    
    if (featured === 'true') {
      query += ' AND featured = TRUE';
    }
    
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    } else {
      query += ' AND status = ?';
      params.push('published');
    }
    
    query += ' ORDER BY featured DESC, created_at DESC';
    
    const [rows] = await pool.query(query, params) as [any[], any];
    
    const testimonials = rows.map(row => ({
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
    }));
    
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Failed to read testimonials:', error);
    return NextResponse.json({ error: 'Failed to read testimonials' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const id = Date.now().toString();
    
    await pool.query(
      `INSERT INTO testimonials (id, name, title, company, content, rating, image, featured, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        body.name,
        body.title || '',
        body.company || '',
        body.content,
        body.rating || 5,
        body.image || '',
        body.featured || false,
        body.status || 'published'
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
    }, { status: 201 });
  } catch (error) {
    console.error('Failed to create testimonial:', error);
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}
