import { requireAuth } from '@/lib/dal';
import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import DynamicProject from '@/models/DynamicProject';
import { ProjectForm } from '@/components/admin/ProjectForm';
import mongoose from 'mongoose';
import type { DynamicProjectFormData } from '@/types/blog';

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

interface ProjectDocument {
  _id: mongoose.Types.ObjectId;
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

async function getProject(id: string): Promise<(DynamicProjectFormData & { _id: string }) | null> {
  await connectDB();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  const project = await DynamicProject.findById(id).lean() as ProjectDocument | null;

  if (!project) {
    return null;
  }

  return {
    _id: project._id.toString(),
    title: project.title,
    slug: project.slug,
    description: project.description,
    shortDescription: project.shortDescription,
    category: project.category,
    location: project.location,
    year: project.year,
    client: project.client,
    featuredImage: project.featuredImage,
    images: project.images,
    tags: project.tags,
    isPublished: project.isPublished,
    isFeatured: project.isFeatured,
    order: project.order,
  };
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  await requireAuth();
  
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-white">Edit Project</h1>
      <ProjectForm initialData={project} isEditing />
    </div>
  );
}