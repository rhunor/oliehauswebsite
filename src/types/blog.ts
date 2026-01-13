// Blog Post Types
export interface BlogPostData {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  images: string[];
  tags: string[];
  category: string;
  author: string;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPostFormData {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  images: string[];
  tags: string[];
  category: string;
  author: string;
  isPublished: boolean;
}

// Dynamic Project Types
export interface DynamicProjectData {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  location: string;
  year: string;
  client: string;
  featuredImage: string;
  images: string[];
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface DynamicProjectFormData {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  location: string;
  year: string;
  client: string;
  featuredImage: string;
  images: string[];
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  order: number;
}

// Admin Types
export interface AdminData {
  _id: string;
  email: string;
  name: string;
  role: 'admin' | 'superadmin';
  createdAt: string;
  updatedAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Cloudinary Upload Result Type
export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  url: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  bytes: number;
  type: string;
  placeholder: boolean;
  asset_id: string;
  version_id: string;
  version: number;
  signature: string;
  original_filename: string;
}

// Session User Type Extension
export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'superadmin';
}