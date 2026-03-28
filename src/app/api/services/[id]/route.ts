import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [rows] = await pool.query('SELECT * FROM services WHERE id = ?', [id]) as [any[], any];
    
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    
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
    });
  } catch (error) {
    console.error('Failed to read service:', error);
    return NextResponse.json({ error: 'Failed to read service' }, { status: 500 });
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
      `UPDATE services SET title = ?, description = ?, icon = ?, featured = ?, display_order = ?, status = ? WHERE id = ?`,
      [
        body.title,
        body.description || '',
        body.icon || 'bi-lightbulb',
        body.featured || false,
        body.displayOrder || 0,
        body.status || 'published',
        id
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
    });
  } catch (error) {
    console.error('Failed to update service:', error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await pool.query('DELETE FROM services WHERE id = ?', [id]);
    
    return NextResponse.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Failed to delete service:', error);
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
