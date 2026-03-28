import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM team_members WHERE status = ? ORDER BY display_order ASC',
      ['active']
    ) as [any[], any];
    
    const members = rows.map(row => ({
      ...row,
      image: row.image || '/assets/img/team/placeholder.webp'
    }));
    
    return NextResponse.json(members);
  } catch (error) {
    console.error('Failed to fetch team members:', error);
    return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const id = Date.now().toString();
    
    await pool.query(
      `INSERT INTO team_members (id, name, role, bio, image, facebook_url, twitter_url, linkedin_url, instagram_url, display_order, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        body.name,
        body.role || '',
        body.bio || '',
        body.image || '',
        body.facebook_url || '#',
        body.twitter_url || '#',
        body.linkedin_url || '#',
        body.instagram_url || '#',
        body.display_order || 0,
        body.status || 'active'
      ]
    );
    
    const [rows] = await pool.query('SELECT * FROM team_members WHERE id = ?', [id]) as [any[], any];
    const row = rows[0];
    return NextResponse.json({
      ...row,
      image: row.image || '/assets/img/team/placeholder.webp'
    }, { status: 201 });
  } catch (error) {
    console.error('Failed to create team member:', error);
    return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 });
  }
}
