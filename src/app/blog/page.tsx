import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Blog - OliveHaus Interiors',
  description: 'Interior design insights, tips, and inspiration from OliveHaus Interiors',
};

interface BlogPostItem {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  category: string;
  author: string;
  publishedAt: Date;
  tags: string[];
}

async function getPublishedPosts(): Promise<BlogPostItem[]> {
  await connectDB();

  const posts = await BlogPost.find({ isPublished: true })
    .sort({ publishedAt: -1 })
    .select('title slug excerpt featuredImage category author publishedAt tags')
    .lean();

  return posts as unknown as BlogPostItem[];
}

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <main className="min-h-screen bg-neutral-950">
      {/* Header */}
      <section className="border-b border-neutral-800 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Our Blog
            </h1>
            <p className="mt-4 text-lg text-neutral-400">
              Interior design insights, tips, and inspiration to transform your space
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post._id}
                  className="group overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 transition-all hover:border-neutral-700"
                >
                  <Link href={`/blog/${post.slug}`}>
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span className="inline-flex items-center rounded-full bg-amber-500/90 px-3 py-1 text-xs font-medium text-neutral-900">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="mb-3 flex items-center text-sm text-neutral-500">
                        <span>{post.author}</span>
                        <span className="mx-2">•</span>
                        <time dateTime={new Date(post.publishedAt).toISOString()}>
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </time>
                      </div>
                      <h2 className="text-xl font-semibold text-white group-hover:text-amber-500 transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="mt-3 text-neutral-400 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="mt-4 flex items-center text-sm font-medium text-amber-500">
                        Read more
                        <svg
                          className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-neutral-400 text-lg">
                No blog posts yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}