import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [rows] = await pool.query('SELECT * FROM stats WHERE id = ?', [id]) as [any[], any];
    
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Stat not found' }, { status: 404 });
    }
    
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
    });
  } catch (error) {
    console.error('Failed to read stat:', error);
    return NextResponse.json({ error: 'Failed to read stat' }, { status: 500 });
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
      `UPDATE stats SET section = ?, label = ?, value = ?, icon = ?, display_order = ?, status = ? WHERE id = ?`,
      [
        body.section,
        body.label,
        body.value,
        body.icon || '',
        body.displayOrder || 0,
        body.status || 'published',
        id
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
    });
  } catch (error) {
    console.error('Failed to update stat:', error);
    return NextResponse.json({ error: 'Failed to update stat' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await pool.query('DELETE FROM stats WHERE id = ?', [id]);
    
    return NextResponse.json({ message: 'Stat deleted successfully' });
  } catch (error) {
    console.error('Failed to delete stat:', error);
    return NextResponse.json({ error: 'Failed to delete stat' }, { status: 500 });
  }
}
