import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    let query = 'SELECT * FROM contacts WHERE 1=1';
    const params: any[] = [];
    
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }
    
    query += ' ORDER BY created_at DESC';
    
    const [rows] = await pool.query(query, params) as [any[], any];
    
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Failed to read contacts:', error);
    return NextResponse.json({ error: 'Failed to read contacts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, phone } = body;
    
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }
    
    const [result] = await pool.query(
      'INSERT INTO contacts (name, email, subject, message, phone) VALUES (?, ?, ?, ?, ?)',
      [name, email, subject || '', message, phone || '']
    ) as [any, any];
    
    return NextResponse.json({ 
      success: true, 
      id: result.insertId,
      message: 'Thank you for your message. We will get back to you soon!'
    }, { status: 201 });
  } catch (error) {
    console.error('Failed to save contact:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
