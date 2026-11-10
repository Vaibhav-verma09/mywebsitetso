import { NextRequest, NextResponse } from 'next/server';
import { getProjects, createProject, updateProject, deleteProject } from '@/lib/db';
import { isAuthenticatedAdmin } from '@/lib/auth';

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json({ projects });
}

export async function POST(req: NextRequest) {
  if (!isAuthenticatedAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, category, status, description, nextStep, tags, imageUrl, liveUrl, embedUrl, githubUrl, isFeatured, sortOrder } = body;

    if (!title || !category || !status || !description) {
      return NextResponse.json({ error: 'Missing required project fields.' }, { status: 400 });
    }

    const created = await createProject({
      title,
      slug: title.toLowerCase().replace(/[^\w-]+/g, '-'),
      category,
      status,
      description,
      nextStep: nextStep || '',
      tags: Array.isArray(tags) ? tags : [],
      imageUrl: imageUrl || '',
      liveUrl: liveUrl || '',
      embedUrl: embedUrl || liveUrl || '',
      githubUrl: githubUrl || '',
      isFeatured: !!isFeatured,
      sortOrder: Number(sortOrder) || 0
    });

    return NextResponse.json({ success: true, project: created });
  } catch (err: unknown) {
    console.error('Error creating project:', err);
    return NextResponse.json({ error: 'Failed to create project.' }, { status: 500 });
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
      return NextResponse.json({ error: 'Project ID is required.' }, { status: 400 });
    }

    const updated = await updateProject(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, project: updated });
  } catch (err: unknown) {
    console.error('Error updating project:', err);
    return NextResponse.json({ error: 'Failed to update project.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticatedAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Project ID is required.' }, { status: 400 });
  }

  const success = await deleteProject(id);
  return NextResponse.json({ success });
}
