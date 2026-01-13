import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

interface BlogPostDocument {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  images: string[];
  category: string;
  author: string;
  tags: string[];
  publishedAt: Date;
  isPublished: boolean;
}

async function getBlogPost(slug: string): Promise<BlogPostDocument | null> {
  await connectDB();

  const post = await BlogPost.findOne({ 
    slug, 
    isPublished: true 
  }).lean();

  return post as BlogPostDocument | null;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - OliveHaus Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Simple markdown-like rendering (for basic formatting)
  const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => {
      // Check for headings
      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-bold text-white mt-8 mb-4">
            {paragraph.replace('## ', '')}
          </h2>
        );
      }
      if (paragraph.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl font-semibold text-white mt-6 mb-3">
            {paragraph.replace('### ', '')}
          </h3>
        );
      }
      // Regular paragraph
      return (
        <p key={index} className="text-neutral-300 leading-relaxed mb-4">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <main className="min-h-screen bg-neutral-950">
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[50vh] min-h-[400px] w-full">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
        </div>
        
        {/* Back Button */}
        <div className="absolute left-0 top-0 w-full pt-6">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="relative -mt-32 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-8 sm:p-12">
            {/* Category */}
            <span className="inline-flex items-center rounded-full bg-amber-500/10 px-3 py-1 text-sm font-medium text-amber-500">
              {post.category}
            </span>

            {/* Title */}
            <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-neutral-400">
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
            </div>

            {/* Excerpt */}
            <p className="mt-6 text-lg text-neutral-400 italic border-l-4 border-amber-500 pl-4">
              {post.excerpt}
            </p>

            {/* Content */}
            <div className="mt-10 prose prose-invert max-w-none">
              {renderContent(post.content)}
            </div>

            {/* Gallery */}
            {post.images.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-semibold text-white mb-6">Gallery</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {post.images.map((image, index) => (
                    <div
                      key={`gallery-${index}`}
                      className="relative aspect-[4/3] overflow-hidden rounded-lg"
                    >
                      <Image
                        src={image}
                        alt={`${post.title} gallery image ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-10 pt-8 border-t border-neutral-800">
                <div className="flex items-center flex-wrap gap-2">
                  <Tag className="h-4 w-4 text-neutral-500" />
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-neutral-800 px-3 py-1 text-sm text-neutral-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
    </main>
  );
}