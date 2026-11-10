import { NextRequest, NextResponse } from 'next/server';
import { createEnquiry } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Please provide your name (at least 2 characters).' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please provide a message with at least 10 characters.' },
        { status: 400 }
      );
    }

    const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '';

    const created = await createEnquiry({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject ? subject.trim() : 'Portfolio Website Contact',
      message: message.trim(),
      ipAddress
    });

    return NextResponse.json({
      success: true,
      message: 'Your enquiry has been successfully delivered and saved to Vaibhav’s dashboard.',
      enquiryId: created.id
    });
  } catch (err: unknown) {
    const errorDetails = err instanceof Error ? err.message : String(err);
    console.error('Contact form error:', errorDetails);
    return NextResponse.json(
      { error: errorDetails || 'An unexpected error occurred while saving your message. Please try again.' },
      { status: 500 }
    );
  }
}
