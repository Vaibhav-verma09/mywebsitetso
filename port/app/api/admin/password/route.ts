import { NextRequest, NextResponse } from 'next/server';
import { updateAdminPassword } from '@/lib/db';
import { isAuthenticatedAdmin } from '@/lib/auth';

export async function POST(req: NextRequest) {
  if (!isAuthenticatedAdmin()) {
    return NextResponse.json({ error: 'Unauthorized. Admin session required.' }, { status: 401 });
  }

  try {
    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Current password and new password are required.' }, { status: 400 });
    }

    const result = await updateAdminPassword(currentPassword, newPassword);
    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: result.message });
  } catch (err: unknown) {
    console.error('Password change error:', err);
    return NextResponse.json({ error: 'Failed to update admin password.' }, { status: 500 });
  }
}
