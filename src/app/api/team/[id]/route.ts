import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [rows] = await pool.query('SELECT * FROM team_members WHERE id = ?', [id]) as [any[], any];
    
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }
    
    const row = rows[0];
    return NextResponse.json({
      ...row,
      image: row.image || '/assets/img/team/placeholder.webp'
    });
  } catch (error) {
    console.error('Failed to fetch team member:', error);
    return NextResponse.json({ error: 'Failed to fetch team member' }, { status: 500 });
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
      `UPDATE team_members SET 
        name = ?, role = ?, bio = ?, image = ?, 
        facebook_url = ?, twitter_url = ?, linkedin_url = ?, instagram_url = ?,
        display_order = ?, status = ?
       WHERE id = ?`,
      [
        body.name,
        body.role || '',
        body.bio || '',
        body.image || '',
        body.facebook_url || '#',
        body.twitter_url || '#',
        body.linkedin_url || '#',
        body.instagram_url || '#',
        body.display_order || 0,
        body.status || 'active',
        id
      ]
    );
    
    const [rows] = await pool.query('SELECT * FROM team_members WHERE id = ?', [id]) as [any[], any];
    
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }
    
    const row = rows[0];
    return NextResponse.json({
      ...row,
      image: row.image || '/assets/img/team/placeholder.webp'
    });
  } catch (error) {
    console.error('Failed to update team member:', error);
    return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await pool.query('DELETE FROM team_members WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete team member:', error);
    return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 });
  }
}
