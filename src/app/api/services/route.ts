import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const featured = searchParams.get('featured');
    
    let query = 'SELECT * FROM services WHERE 1=1';
    const params: any[] = [];
    
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }
    
    if (featured === 'true') {
      query += ' AND featured = TRUE';
    }
    
    query += ' ORDER BY display_order ASC, created_at DESC';
    
    const [rows] = await pool.query(query, params) as [any[], any];
    
    const services = rows.map(row => ({
      id: row.id,
      title: row.title,
      description: row.description,
      icon: row.icon,
      featured: Boolean(row.featured),
      displayOrder: row.display_order,
      status: row.status,
      createdAt: row.created_at
    }));
    
    return NextResponse.json(services);
  } catch (error) {
    console.error('Failed to read services:', error);
    return NextResponse.json({ error: 'Failed to read services' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const id = Date.now().toString();
    
    await pool.query(
      `INSERT INTO services (id, title, description, icon, featured, display_order, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        body.title,
        body.description || '',
        body.icon || 'bi-lightbulb',
        body.featured || false,
        body.displayOrder || 0,
        body.status || 'published'
      ]
    );
    
    const [rows] = await pool.query('SELECT * FROM services WHERE id = ?', [id]) as [any[], any];
    const row = rows[0];
    
    return NextResponse.json({
      id: row.id,
      title: row.title,
      description: row.description,
      icon: row.icon,
      featured: Boolean(row.featured),
      displayOrder: row.display_order,
      status: row.status,
      createdAt: row.created_at
    }, { status: 201 });
  } catch (error) {
    console.error('Failed to create service:', error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}
