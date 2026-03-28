import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [rows] = await pool.query('SELECT * FROM contacts WHERE id = ?', [id]) as [any[], any];
    
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }
    
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Failed to read contact:', error);
    return NextResponse.json({ error: 'Failed to read contact' }, { status: 500 });
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
      'UPDATE contacts SET status = ? WHERE id = ?',
      [body.status || 'new', id]
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update contact:', error);
    return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await pool.query('DELETE FROM contacts WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete contact:', error);
    return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 });
  }
}
