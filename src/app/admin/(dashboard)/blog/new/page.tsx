import { requireAuth } from '@/lib/dal';
import { BlogForm } from '@/components/admin/BlogForm';

export const metadata = {
  title: 'New Blog Post - Admin',
};

export default async function NewBlogPage() {
  await requireAuth();

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-white">Create New Blog Post</h1>
      <BlogForm />
    </div>
  );
}