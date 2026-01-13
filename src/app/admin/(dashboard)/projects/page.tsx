import { requireAuth } from '@/lib/dal';
import connectDB from '@/lib/mongodb';
import DynamicProject from '@/models/DynamicProject';
import Link from 'next/link';
import { Plus, Edit, Eye, EyeOff, Star } from 'lucide-react';
import { DeleteProjectButton } from '@/components/admin/DeleteProjectButton';

interface ProjectItem {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  category: string;
  featuredImage: string;
  isPublished: boolean;
  isFeatured: boolean;
  order: number;
  createdAt: Date;
}

async function getProjects(): Promise<ProjectItem[]> {
  await connectDB();

  const projects = await DynamicProject.find({})
    .sort({ order: 1, createdAt: -1 })
    .select('title slug shortDescription category featuredImage isPublished isFeatured order createdAt')
    .lean();

  return projects as unknown as ProjectItem[];
}

export default async function ProjectsManagementPage() {
  await requireAuth();
  const projects = await getProjects();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="mt-1 text-neutral-400">
            Manage your portfolio projects
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-amber-400 transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Link>
      </div>

      {/* Info Box */}
      <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-4">
        <p className="text-sm text-blue-400">
          <strong>Note:</strong> Projects added here will appear alongside your existing hardcoded projects on the portfolio page. 
          They will be displayed based on their order number (lower numbers appear first).
        </p>
      </div>

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project._id.toString()}
              className="group overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800 transition-all hover:border-neutral-700"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                {project.featuredImage ? (
                  <img
                    src={project.featuredImage}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-neutral-800">
                    <span className="text-neutral-500">No image</span>
                  </div>
                )}
                
                {/* Badges */}
                <div className="absolute left-3 top-3 flex items-center space-x-2">
                  {project.isFeatured && (
                    <span className="inline-flex items-center rounded-full bg-amber-500 px-2 py-1 text-xs font-medium text-neutral-900">
                      <Star className="mr-1 h-3 w-3" />
                      Featured
                    </span>
                  )}
                  {project.isPublished ? (
                    <span className="inline-flex items-center rounded-full bg-green-500/20 px-2 py-1 text-xs font-medium text-green-400">
                      <Eye className="mr-1 h-3 w-3" />
                      Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-neutral-700 px-2 py-1 text-xs font-medium text-neutral-400">
                      <EyeOff className="mr-1 h-3 w-3" />
                      Draft
                    </span>
                  )}
                </div>

                {/* Order Badge */}
                <div className="absolute right-3 top-3">
                  <span className="inline-flex items-center rounded-full bg-neutral-900/80 px-2 py-1 text-xs font-medium text-neutral-300">
                    #{project.order}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="mb-2">
                  <span className="inline-flex items-center rounded-full bg-neutral-800 px-2 py-0.5 text-xs font-medium text-neutral-400">
                    {project.category}
                  </span>
                </div>
                <h3 className="font-semibold text-white line-clamp-1">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-neutral-500 line-clamp-2">
                  {project.shortDescription}
                </p>

                {/* Actions */}
                <div className="mt-4 flex items-center justify-between border-t border-neutral-800 pt-4">
                  <span className="text-xs text-neutral-500">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Link
                      href={`/admin/projects/${project._id}/edit`}
                      className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
                      title="Edit project"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <DeleteProjectButton
                      id={project._id.toString()}
                      title={project.title}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl bg-neutral-900 border border-neutral-800 px-6 py-12 text-center">
          <p className="text-neutral-400">No projects yet.</p>
          <Link
            href="/admin/projects/new"
            className="mt-4 inline-flex items-center text-amber-500 hover:text-amber-400"
          >
            <Plus className="mr-1 h-4 w-4" />
            Add your first project
          </Link>
        </div>
      )}
    </div>
  );
}