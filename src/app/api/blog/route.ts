import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import type { BlogPostFormData } from '@/types/blog';

interface BlogQueryParams {
  page: number;
  limit: number;
  category: string | undefined;
  tag: string | undefined;
  published: boolean | undefined;
}

function parseQueryParams(searchParams: URLSearchParams): BlogQueryParams {
  const categoryParam = searchParams.get('category');
  const tagParam = searchParams.get('tag');
  const publishedParam = searchParams.get('published');

  return {
    page: Math.max(1, parseInt(searchParams.get('page') ?? '1', 10)),
    limit: Math.min(50, Math.max(1, parseInt(searchParams.get('limit') ?? '10', 10))),
    category: categoryParam ?? undefined,
    tag: tagParam ?? undefined,
    published: publishedParam === 'true' ? true : 
               publishedParam === 'false' ? false : undefined,
  };
}

/**
 * GET /api/blog
 * Get all blog posts with pagination and filtering
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const { page, limit, category, tag, published } = parseQueryParams(searchParams);

    // Build query
    const query: Record<string, unknown> = {};
    
    if (category) {
      query.category = category;
    }
    
    if (tag) {
      query.tags = tag;
    }
    
    if (published !== undefined) {
      query.isPublished = published;
    }

    // Get total count for pagination
    const total = await BlogPost.countDocuments(query);

    // Get paginated results
    const posts = await BlogPost.find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      data: posts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get blog posts error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/blog
 * Create a new blog post (requires authentication)
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const body: unknown = await request.json();
    
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const data = body as BlogPostFormData;

    // Validate required fields
    const requiredFields = ['title', 'content', 'excerpt', 'featuredImage', 'category', 'author'];
    for (const field of requiredFields) {
      if (!data[field as keyof BlogPostFormData]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Generate slug if not provided
    const slug = data.slug || data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Check for duplicate slug
    const existingPost = await BlogPost.findOne({ slug });
    if (existingPost) {
      return NextResponse.json(
        { success: false, error: 'A post with this slug already exists' },
        { status: 400 }
      );
    }

    // Create blog post
    const post = await BlogPost.create({
      ...data,
      slug,
      publishedAt: data.isPublished ? new Date() : null,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Blog post created successfully',
        data: post,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create blog post error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}