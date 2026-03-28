import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const folder = formData.get('folder') as string || 'misc';
    const uploadDir = path.join(process.cwd(), 'public', 'assets', 'img', folder);
    
    await mkdir(uploadDir, { recursive: true });

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const ext = path.extname(file.name);
    const filename = `${uniqueSuffix}${ext}`;
    const filepath = path.join(uploadDir, filename);

    await writeFile(filepath, buffer);

    const publicPath = `/assets/img/${folder}/${filename}`;

    return NextResponse.json({ url: publicPath, filename }, { status: 201 });
  } catch (error) {
    console.error('Upload failed:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
