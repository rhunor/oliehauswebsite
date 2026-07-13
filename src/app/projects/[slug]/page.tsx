import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import DynamicProject from '@/models/DynamicProject';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar, User, Tag } from 'lucide-react';
import type { Metadata } from 'next';
import { generateImageBlurDataUrl, imageQuality } from '@/lib/utils';
import ProjectGallery from './ProjectGallery';

// Always render fresh from the database - this page must never be
// statically frozen at build/deploy time (see /projects staleness issue).
export const dynamic = 'force-dynamic';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

interface ProjectDocument {
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
  isFeatured: boolean;
}

async function getProject(slug: string): Promise<ProjectDocument | null> {
  await connectDB();

  const project = await DynamicProject.findOne({
    slug,
    isPublished: true,
  }).lean();

  return project as ProjectDocument | null;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: `${project.title} | OliveHaus Interiors`,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: [project.featuredImage],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const galleryImages = project.images.map((src, i) => ({
    src,
    alt: `${project.title} image ${i + 1}`,
  }));

  return (
    <main className="min-h-screen bg-[#F3EEE8]">
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[420px] w-full">
        <Image
          src={project.featuredImage}
          alt={project.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
          placeholder="blur"
          blurDataURL={generateImageBlurDataUrl(10, 12)}
          quality={imageQuality.high}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

        <div className="absolute left-0 top-0 w-full pt-6">
          <div className="container-luxury">
            <Link
              href="/projects"
              className="inline-flex items-center text-white/90 hover:text-white transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full pb-10">
          <div className="container-luxury">
            <span className="inline-block bg-luxury-gold text-white px-4 py-1.5 text-xs tracking-widest uppercase font-medium mb-4">
              {project.category}
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white tracking-wide max-w-4xl">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Meta + Description */}
      <section className="py-14">
        <div className="container-luxury max-w-4xl">
          <div className="flex flex-wrap items-center gap-6 text-sm text-luxury-slate/70 mb-8 pb-8 border-b border-luxury-slate/10">
            {project.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {project.location}
              </div>
            )}
            {project.year && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {project.year}
              </div>
            )}
            {project.client && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {project.client}
              </div>
            )}
          </div>

          <p className="text-lg md:text-xl text-luxury-charcoal/90 leading-relaxed font-body mb-6">
            {project.shortDescription}
          </p>

          <div className="text-luxury-slate/80 leading-relaxed whitespace-pre-line font-body">
            {project.description}
          </div>

          {project.tags.length > 0 && (
            <div className="mt-10 pt-8 border-t border-luxury-slate/10 flex items-center flex-wrap gap-2">
              <Tag className="h-4 w-4 text-luxury-slate/50" />
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-luxury-charcoal/5 px-3 py-1 text-sm text-luxury-slate/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Gallery */}
      {galleryImages.length > 0 && (
        <section className="pb-20">
          <div className="container-luxury max-w-6xl">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-luxury-charcoal mb-8">
              Gallery
            </h2>
            <ProjectGallery images={galleryImages} projectTitle={project.title} />
          </div>
        </section>
      )}
    </main>
  );
}
