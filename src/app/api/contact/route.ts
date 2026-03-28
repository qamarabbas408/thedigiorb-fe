import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string | null;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    // Here you would typically send an email or store the data
    console.log('Contact form submission:', { name, email, phone, subject, message });

    // For now, just return success
    return NextResponse.json({ 
      success: true, 
      message: 'Your message has been received. We will get back to you soon!' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process your request.' },
      { status: 500 }
    );
  }
}