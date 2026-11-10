import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminPassword } from '@/lib/db';
import { createAdminToken } from '@/lib/auth';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'vermavaibhav710@gmail.com';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    if (email.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      return NextResponse.json({ error: 'Unauthorized email address.' }, { status: 401 });
    }

    const isValid = await verifyAdminPassword(password);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid password. Check credentials.' }, { status: 401 });
    }

    const token = createAdminToken(email);

    const isHttps = req.nextUrl.protocol === 'https:' || req.headers.get('x-forwarded-proto') === 'https';

    const response = NextResponse.json({
      success: true,
      message: 'Admin authentication successful.',
      token,
      user: { email: ADMIN_EMAIL, role: 'administrator' }
    });

    response.cookies.set('vaibhav_admin_token', token, {
      httpOnly: true,
      secure: isHttps,
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return response;
  } catch (err: unknown) {
    console.error('Admin login error:', err);
    return NextResponse.json({ error: 'Server error during authentication.' }, { status: 500 });
  }
}
