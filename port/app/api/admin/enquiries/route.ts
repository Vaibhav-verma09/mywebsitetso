import { NextRequest, NextResponse } from 'next/server';
import { getEnquiries, updateEnquiryStatus, deleteEnquiry } from '@/lib/db';
import { isAuthenticatedAdmin } from '@/lib/auth';

export async function GET() {
  if (!isAuthenticatedAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const enquiries = await getEnquiries();
  return NextResponse.json({ enquiries });
}

export async function PATCH(req: NextRequest) {
  if (!isAuthenticatedAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: 'ID and status are required.' }, { status: 400 });
    }

    const success = await updateEnquiryStatus(id, status);
    return NextResponse.json({ success });
  } catch (err: unknown) {
    console.error('Error updating enquiry:', err);
    return NextResponse.json({ error: 'Failed to update enquiry status.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticatedAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Enquiry ID is required.' }, { status: 400 });
  }

  const success = await deleteEnquiry(id);
  return NextResponse.json({ success });
}
