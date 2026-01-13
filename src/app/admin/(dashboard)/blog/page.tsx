import { requireAuth } from '@/lib/dal';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import Link from 'next/link';
import { Plus, Edit, Eye, EyeOff, ExternalLink } from 'lucide-react';
import { DeleteBlogButton } from '@/components/admin/DeleteBlogButton';

interface BlogPostItem {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  isPublished: boolean;
  publishedAt: Date | null;
  createdAt: Date;
}

async function getBlogPosts(): Promise<BlogPostItem[]> {
  await connectDB();

  const posts = await BlogPost.find({})
    .sort({ createdAt: -1 })
    .select('title slug excerpt category isPublished publishedAt createdAt')
    .lean();

  return posts as unknown as BlogPostItem[];
}

export default async function BlogManagementPage() {
  await requireAuth();
  const posts = await getBlogPosts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <p className="mt-1 text-neutral-400">
            Manage your blog posts and articles
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-amber-400 transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Link>
      </div>

      {/* Blog Posts Table */}
      <div className="overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800">
        {posts.length > 0 ? (
          <table className="w-full">
            <thead className="border-b border-neutral-800 bg-neutral-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-400">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-400">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-400">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-400">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-neutral-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {posts.map((post) => (
                <tr
                  key={post._id.toString()}
                  className="hover:bg-neutral-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <p className="truncate font-medium text-white">
                        {post.title}
                      </p>
                      <p className="truncate text-sm text-neutral-500">
                        {post.excerpt}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-neutral-800 px-2.5 py-0.5 text-xs font-medium text-neutral-300">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {post.isPublished ? (
                      <span className="inline-flex items-center text-sm text-green-400">
                        <Eye className="mr-1 h-4 w-4" />
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-sm text-neutral-500">
                        <EyeOff className="mr-1 h-4 w-4" />
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      {post.isPublished && (
                        <a
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
                          title="View post"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                      <Link
                        href={`/admin/blog/${post._id}/edit`}
                        className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
                        title="Edit post"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <DeleteBlogButton
                        id={post._id.toString()}
                        title={post.title}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="px-6 py-12 text-center">
            <p className="text-neutral-400">No blog posts yet.</p>
            <Link
              href="/admin/blog/new"
              className="mt-4 inline-flex items-center text-amber-500 hover:text-amber-400"
            >
              <Plus className="mr-1 h-4 w-4" />
              Create your first post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}