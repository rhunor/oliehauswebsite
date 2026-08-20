import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import SiteImage from '@/models/SiteImage';
import { SITE_IMAGE_SLOT_MAP } from '@/lib/siteImageSlots';

interface RouteParams {
  params: Promise<{ key: string }>;
}

/**
 * PUT /api/site-images/[key]
 * Upserts an admin-uploaded replacement image for a known site image slot.
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { key } = await params;

    if (!SITE_IMAGE_SLOT_MAP.has(key)) {
      return NextResponse.json({ success: false, error: 'Unknown image slot' }, { status: 400 });
    }

    const body: unknown = await request.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 });
    }

    const { url, alt } = body as { url?: string; alt?: string };
    if (!url || typeof url !== 'string' || !url.trim()) {
      return NextResponse.json({ success: false, error: 'Image URL is required' }, { status: 400 });
    }

    await connectDB();

    const image = await SiteImage.findOneAndUpdate(
      { key },
      { key, url: url.trim(), alt: typeof alt === 'string' ? alt.trim() : '' },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({ success: true, data: image });
  } catch (error) {
    console.error('Update site image error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update site image' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/site-images/[key]
 * Removes an override so the slot reverts to its static default image.
 */
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { key } = await params;

    await connectDB();
    await SiteImage.deleteOne({ key });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete site image error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to reset site image' },
      { status: 500 }
    );
  }
}
