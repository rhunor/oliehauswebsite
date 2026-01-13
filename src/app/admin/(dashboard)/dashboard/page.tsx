import { requireAuth } from '@/lib/dal';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import DynamicProject from '@/models/DynamicProject';
import { FileText, FolderOpen, Eye, Clock } from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  totalBlogPosts: number;
  publishedBlogPosts: number;
  draftBlogPosts: number;
  totalProjects: number;
  publishedProjects: number;
  featuredProjects: number;
}

async function getDashboardStats(): Promise<DashboardStats> {
  await connectDB();

  const [
    totalBlogPosts,
    publishedBlogPosts,
    totalProjects,
    publishedProjects,
    featuredProjects,
  ] = await Promise.all([
    BlogPost.countDocuments({}),
    BlogPost.countDocuments({ isPublished: true }),
    DynamicProject.countDocuments({}),
    DynamicProject.countDocuments({ isPublished: true }),
    DynamicProject.countDocuments({ isFeatured: true }),
  ]);

  return {
    totalBlogPosts,
    publishedBlogPosts,
    draftBlogPosts: totalBlogPosts - publishedBlogPosts,
    totalProjects,
    publishedProjects,
    featuredProjects,
  };
}

interface RecentItem {
  _id: string;
  title: string;
  createdAt: string;
  isPublished: boolean;
}

async function getRecentItems(): Promise<{ recentPosts: RecentItem[]; recentProjects: RecentItem[] }> {
  await connectDB();

  const [rawPosts, rawProjects] = await Promise.all([
    BlogPost.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title createdAt isPublished')
      .lean(),
    DynamicProject.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title createdAt isPublished')
      .lean(),
  ]);

  // Transform MongoDB documents to RecentItem format
  const recentPosts: RecentItem[] = rawPosts.map((post) => ({
    _id: String(post._id),
    title: post.title,
    createdAt: post.createdAt.toISOString(),
    isPublished: post.isPublished,
  }));

  const recentProjects: RecentItem[] = rawProjects.map((project) => ({
    _id: String(project._id),
    title: project.title,
    createdAt: project.createdAt.toISOString(),
    isPublished: project.isPublished,
  }));

  return { recentPosts, recentProjects };
}

export default async function AdminDashboard() {
  const session = await requireAuth();
  const stats = await getDashboardStats();
  const { recentPosts, recentProjects } = await getRecentItems();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-neutral-400">
          Welcome back, {session.user.name}!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Blog Posts Stats */}
        <div className="rounded-xl bg-neutral-900 p-6 border border-neutral-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-400">Total Blog Posts</p>
              <p className="mt-1 text-3xl font-bold text-white">
                {stats.totalBlogPosts}
              </p>
            </div>
            <div className="rounded-lg bg-blue-500/10 p-3">
              <FileText className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-4 text-sm">
            <span className="flex items-center text-green-400">
              <Eye className="mr-1 h-4 w-4" />
              {stats.publishedBlogPosts} published
            </span>
            <span className="flex items-center text-neutral-400">
              <Clock className="mr-1 h-4 w-4" />
              {stats.draftBlogPosts} drafts
            </span>
          </div>
        </div>

        {/* Projects Stats */}
        <div className="rounded-xl bg-neutral-900 p-6 border border-neutral-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-400">Total Projects</p>
              <p className="mt-1 text-3xl font-bold text-white">
                {stats.totalProjects}
              </p>
            </div>
            <div className="rounded-lg bg-amber-500/10 p-3">
              <FolderOpen className="h-6 w-6 text-amber-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-4 text-sm">
            <span className="flex items-center text-green-400">
              <Eye className="mr-1 h-4 w-4" />
              {stats.publishedProjects} published
            </span>
            <span className="flex items-center text-amber-400">
              ★ {stats.featuredProjects} featured
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl bg-neutral-900 p-6 border border-neutral-800 sm:col-span-2">
          <p className="text-sm font-medium text-neutral-400">Quick Actions</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/admin/blog/new"
              className="inline-flex items-center rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 transition-colors"
            >
              <FileText className="mr-2 h-4 w-4" />
              New Blog Post
            </Link>
            <Link
              href="/admin/projects/new"
              className="inline-flex items-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-amber-400 transition-colors"
            >
              <FolderOpen className="mr-2 h-4 w-4" />
              Add Project
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Items */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Blog Posts */}
        <div className="rounded-xl bg-neutral-900 border border-neutral-800">
          <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
            <h2 className="font-semibold text-white">Recent Blog Posts</h2>
            <Link
              href="/admin/blog"
              className="text-sm text-amber-500 hover:text-amber-400"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-neutral-800">
            {recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <div
                  key={post._id.toString()}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">
                      {post.title}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`ml-4 inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      post.isPublished
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-neutral-700 text-neutral-400'
                    }`}
                  >
                    {post.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center text-neutral-500">
                No blog posts yet.{' '}
                <Link href="/admin/blog/new" className="text-amber-500 hover:underline">
                  Create one
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="rounded-xl bg-neutral-900 border border-neutral-800">
          <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
            <h2 className="font-semibold text-white">Recent Projects</h2>
            <Link
              href="/admin/projects"
              className="text-sm text-amber-500 hover:text-amber-400"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-neutral-800">
            {recentProjects.length > 0 ? (
              recentProjects.map((project) => (
                <div
                  key={project._id.toString()}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">
                      {project.title}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`ml-4 inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      project.isPublished
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-neutral-700 text-neutral-400'
                    }`}
                  >
                    {project.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center text-neutral-500">
                No projects yet.{' '}
                <Link href="/admin/projects/new" className="text-amber-500 hover:underline">
                  Add one
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}