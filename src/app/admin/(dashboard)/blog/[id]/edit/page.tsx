import { requireAuth } from '@/lib/dal';
import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import { BlogForm } from '@/components/admin/BlogForm';
import mongoose from 'mongoose';
import type { BlogPostFormData } from '@/types/blog';

interface EditBlogPageProps {
  params: Promise<{ id: string }>;
}

interface BlogPostDocument {
  _id: mongoose.Types.ObjectId;
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

async function getBlogPost(id: string): Promise<(BlogPostFormData & { _id: string }) | null> {
  await connectDB();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  const post = await BlogPost.findById(id).lean() as BlogPostDocument | null;

  if (!post) {
    return null;
  }

  return {
    _id: post._id.toString(),
    title: post.title,
    slug: post.slug,
    content: post.content,
    excerpt: post.excerpt,
    featuredImage: post.featuredImage,
    images: post.images,
    tags: post.tags,
    category: post.category,
    author: post.author,
    isPublished: post.isPublished,
  };
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  await requireAuth();
  
  const { id } = await params;
  const post = await getBlogPost(id);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-white">Edit Blog Post</h1>
      <BlogForm initialData={post} isEditing />
    </div>
  );
}