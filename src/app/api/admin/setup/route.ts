import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';

/**
 * POST /api/admin/setup
 * Creates the initial admin user if none exists
 * This should only work once when there are no admins in the database
 */
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Check if any admin already exists
    const existingAdmin = await Admin.findOne({});
    if (existingAdmin) {
      return NextResponse.json(
        { success: false, error: 'Admin already exists. Setup is disabled.' },
        { status: 403 }
      );
    }

    const body: unknown = await request.json();
    
    // Type guard for request body
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const { email, password, name } = body as Record<string, unknown>;

    // Validate required fields
    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    if (typeof email !== 'string' || typeof password !== 'string' || typeof name !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid field types' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create admin
    const admin = await Admin.create({
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      name: name.trim(),
      role: 'superadmin', // First admin is always superadmin
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Admin created successfully',
        data: {
          id: admin._id.toString(),
          email: admin.email,
          name: admin.name,
          role: admin.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Admin setup error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create admin' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/setup
 * Check if setup is available (no admins exist)
 */
export async function GET() {
  try {
    await connectDB();

    const existingAdmin = await Admin.findOne({});
    
    return NextResponse.json({
      success: true,
      setupAvailable: !existingAdmin,
    });
  } catch (error) {
    console.error('Admin setup check error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to check setup status' },
      { status: 500 }
    );
  }
}