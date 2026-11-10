import { NextRequest, NextResponse } from 'next/server';
import { getServices, createService, updateService, deleteService } from '@/lib/db';
import { isAuthenticatedAdmin } from '@/lib/auth';

export async function GET() {
  const services = await getServices();
  return NextResponse.json({ services });
}

export async function POST(req: NextRequest) {
  if (!isAuthenticatedAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, shortDescription, detailedDescription, iconName, features, isActive, sortOrder } = body;

    if (!title || !shortDescription) {
      return NextResponse.json({ error: 'Title and description are required.' }, { status: 400 });
    }

    const created = await createService({
      title,
      shortDescription,
      detailedDescription: detailedDescription || '',
      iconName: iconName || 'Palette',
      features: Array.isArray(features) ? features : [],
      isActive: isActive !== false,
      sortOrder: Number(sortOrder) || 0
    });

    return NextResponse.json({ success: true, service: created });
  } catch (err: unknown) {
    console.error('Error creating service:', err);
    return NextResponse.json({ error: 'Failed to create service.' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!isAuthenticatedAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, ...updates } = body;
    if (!id) {
      return NextResponse.json({ error: 'Service ID is required.' }, { status: 400 });
    }

    const updated = await updateService(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Service not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, service: updated });
  } catch (err: unknown) {
    console.error('Error updating service:', err);
    return NextResponse.json({ error: 'Failed to update service.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticatedAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Service ID is required.' }, { status: 400 });
  }

  const success = await deleteService(id);
  return NextResponse.json({ success });
}
