import { NextRequest, NextResponse } from 'next/server';
import { getProfile, updateProfile } from '@/lib/db';
import { isAuthenticatedAdmin } from '@/lib/auth';

export async function GET() {
  const profile = await getProfile();
  return NextResponse.json({ profile });
}

export async function PUT(req: NextRequest) {
  if (!isAuthenticatedAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const updates = await req.json();
    const updated = await updateProfile(updates);
    return NextResponse.json({ success: true, profile: updated });
  } catch (err: unknown) {
    console.error('Error updating profile:', err);
    return NextResponse.json({ error: 'Failed to update profile.' }, { status: 500 });
  }
}
