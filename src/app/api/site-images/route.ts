import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import SiteImage from '@/models/SiteImage';

/**
 * GET /api/site-images
 * Public endpoint returning every current admin image override, keyed by slot key.
 * Slots with no override here simply keep showing their static default on the site.
 */
export async function GET() {
  try {
    await connectDB();

    const images = await SiteImage.find({}).lean();

    const data: Record<string, { url: string; alt: string }> = {};
    for (const image of images) {
      data[image.key] = { url: image.url, alt: image.alt };
    }

    return NextResponse.json(
      { success: true, data },
      {
        headers: {
          'Cache-Control': 'public, max-age=30, stale-while-revalidate=300',
        },
      }
    );
  } catch (error) {
    console.error('Get site images error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch site images' },
      { status: 500 }
    );
  }
}
