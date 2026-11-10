import { NextRequest, NextResponse } from 'next/server';
import { getMedia, createMedia, deleteMedia } from '@/lib/db';
import { isAuthenticatedAdmin } from '@/lib/auth';

export async function GET() {
  const media = await getMedia();
  return NextResponse.json({ media });
}

export async function POST(req: NextRequest) {
  if (!isAuthenticatedAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, kind, category, url, storagePath, thumbnailUrl, isFeatured } = body;

    if (!title || !kind || !url) {
      return NextResponse.json({ error: 'Title, kind, and URL are required.' }, { status: 400 });
    }

    const created = await createMedia({
      title,
      kind: kind === 'video' ? 'video' : 'image',
      category: category || 'Other',
      url,
      storagePath: storagePath || '',
      thumbnailUrl: thumbnailUrl || '',
      isFeatured: !!isFeatured,
      sortOrder: 0
    });

    return NextResponse.json({ success: true, media: created });
  } catch (err: unknown) {
    console.error('Error creating media item:', err);
    return NextResponse.json({ error: 'Failed to add media item.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticatedAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Media ID is required.' }, { status: 400 });
  }

  const success = await deleteMedia(id);
  return NextResponse.json({ success });
}
