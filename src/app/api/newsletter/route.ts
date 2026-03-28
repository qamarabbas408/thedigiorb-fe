import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const email = formData.get('email') as string;

    // Here you would typically add the email to a newsletter service
    console.log('Newsletter subscription:', email);

    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for subscribing to our newsletter!' 
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}