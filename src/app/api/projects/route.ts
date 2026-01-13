import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import DynamicProject from '@/models/DynamicProject';
import type { DynamicProjectFormData } from '@/types/blog';

interface ProjectQueryParams {
  page: number;
  limit: number;
  category: string | undefined;
  featured: boolean | undefined;
  published: boolean | undefined;
}

function parseQueryParams(searchParams: URLSearchParams): ProjectQueryParams {
  const categoryParam = searchParams.get('category');
  const featuredParam = searchParams.get('featured');
  const publishedParam = searchParams.get('published');

  return {
    page: Math.max(1, parseInt(searchParams.get('page') ?? '1', 10)),
    limit: Math.min(50, Math.max(1, parseInt(searchParams.get('limit') ?? '10', 10))),
    category: categoryParam ?? undefined,
    featured: featuredParam === 'true' ? true : 
              featuredParam === 'false' ? false : undefined,
    published: publishedParam === 'true' ? true : 
               publishedParam === 'false' ? false : undefined,
  };
}

/**
 * GET /api/projects
 * Get all dynamic projects with pagination and filtering
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const { page, limit, category, featured, published } = parseQueryParams(searchParams);

    // Build query
    const query: Record<string, unknown> = {};
    
    if (category) {
      query.category = category;
    }
    
    if (featured !== undefined) {
      query.isFeatured = featured;
    }
    
    if (published !== undefined) {
      query.isPublished = published;
    }

    // Get total count for pagination
    const total = await DynamicProject.countDocuments(query);

    // Get paginated results
    const projects = await DynamicProject.find(query)
      .sort({ order: 1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      data: projects,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get projects error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/projects
 * Create a new project (requires authentication)
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

    const data = body as DynamicProjectFormData;

    // Validate required fields
    const requiredFields = ['title', 'description', 'shortDescription', 'category', 'featuredImage'];
    for (const field of requiredFields) {
      if (!data[field as keyof DynamicProjectFormData]) {
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
    const existingProject = await DynamicProject.findOne({ slug });
    if (existingProject) {
      return NextResponse.json(
        { success: false, error: 'A project with this slug already exists' },
        { status: 400 }
      );
    }

    // Get the next order number
    const lastProject = await DynamicProject.findOne().sort({ order: -1 });
    const nextOrder = lastProject ? lastProject.order + 1 : 0;

    // Create project
    const project = await DynamicProject.create({
      ...data,
      slug,
      order: data.order ?? nextOrder,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Project created successfully',
        data: project,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create project error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    );
  }
}