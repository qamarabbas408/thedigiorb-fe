import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM categories ORDER BY name') as [any[], any];
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Failed to read categories:', error);
    return NextResponse.json({ error: 'Failed to read categories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const id = body.id || body.name.toLowerCase().replace(/\s+/g, '-');
    const slug = body.name.toLowerCase().replace(/\s+/g, '-');
    const filterClass = `filter-${slug}`;
    
    await pool.query(
      'INSERT INTO categories (id, name, slug, filter_class, icon) VALUES (?, ?, ?, ?, ?)',
      [id, body.name, slug, filterClass, body.icon || 'bi-folder']
    );
    
    const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [id]) as [any[], any];
    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    console.error('Failed to create category:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    await pool.query(
      'UPDATE categories SET name = ?, icon = ? WHERE id = ?',
      [body.name, body.icon || 'bi-folder', body.id]
    );
    
    const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [body.id]) as [any[], any];
    
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Failed to update category:', error);
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    await pool.query('DELETE FROM categories WHERE id = ?', [id]);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete category:', error);
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
