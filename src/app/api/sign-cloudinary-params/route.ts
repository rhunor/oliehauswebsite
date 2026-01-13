import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Validate required environment variables
const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudinaryCloudName || !cloudinaryApiKey || !cloudinaryApiSecret) {
  console.error('Cloudinary environment variables are not properly configured');
}

// Configure Cloudinary only if all variables are present
if (cloudinaryCloudName && cloudinaryApiKey && cloudinaryApiSecret) {
  cloudinary.config({
    cloud_name: cloudinaryCloudName,
    api_key: cloudinaryApiKey,
    api_secret: cloudinaryApiSecret,
  });
}

/**
 * POST /api/sign-cloudinary-params
 * Generates a signature for secure Cloudinary uploads
 * Requires authentication
 */
export async function POST(request: NextRequest) {
  try {
    // Check if Cloudinary is configured
    if (!cloudinaryApiSecret) {
      return NextResponse.json(
        { success: false, error: 'Cloudinary is not configured' },
        { status: 500 }
      );
    }

    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body: unknown = await request.json();
    
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const { paramsToSign } = body as { paramsToSign?: Record<string, string> };

    if (!paramsToSign || typeof paramsToSign !== 'object') {
      return NextResponse.json(
        { success: false, error: 'paramsToSign is required' },
        { status: 400 }
      );
    }

    // Generate signature
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      cloudinaryApiSecret
    );

    return NextResponse.json({ signature });
  } catch (error) {
    console.error('Cloudinary signature error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate signature' },
      { status: 500 }
    );
  }
}