import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');
    const status = searchParams.get('status');
    
    let query = 'SELECT * FROM stats WHERE 1=1';
    const params: any[] = [];
    
    if (section) {
      query += ' AND section = ?';
      params.push(section);
    }
    
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }
    
    query += ' ORDER BY section, display_order ASC, created_at DESC';
    
    const [rows] = await pool.query(query, params) as [any[], any];
    
    const stats = rows.map(row => ({
      id: row.id,
      section: row.section,
      label: row.label,
      value: row.value,
      icon: row.icon,
      displayOrder: row.display_order,
      status: row.status,
      createdAt: row.created_at
    }));
    
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Failed to read stats:', error);
    return NextResponse.json({ error: 'Failed to read stats' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const id = Date.now().toString();
    
    await pool.query(
      `INSERT INTO stats (id, section, label, value, icon, display_order, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        body.section,
        body.label,
        body.value,
        body.icon || '',
        body.displayOrder || 0,
        body.status || 'published'
      ]
    );
    
    const [rows] = await pool.query('SELECT * FROM stats WHERE id = ?', [id]) as [any[], any];
    const row = rows[0];
    
    return NextResponse.json({
      id: row.id,
      section: row.section,
      label: row.label,
      value: row.value,
      icon: row.icon,
      displayOrder: row.display_order,
      status: row.status,
      createdAt: row.created_at
    }, { status: 201 });
  } catch (error) {
    console.error('Failed to create stat:', error);
    return NextResponse.json({ error: 'Failed to create stat' }, { status: 500 });
  }
}
