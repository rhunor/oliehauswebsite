'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn, generateImageBlurDataUrl, responsiveSizes, imageQuality } from '@/lib/utils';
import type { DynamicProjectData } from '@/types/blog';

interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  image: {
    src: string;
    alt: string;
  };
  description: string;
  featured: boolean;
}

interface PortfolioTeaserProps {
  className?: string;
}

// Analytics tracking helper - using the existing window.gtag type from FloatingWhatsApp
const trackEvent = (action: string, category: string, label: string): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
    });
  }
};

export default function PortfolioTeaser({ className }: PortfolioTeaserProps) {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadFeaturedProjects() {
      try {
        const response = await fetch('/api/projects?featured=true&published=true&limit=6', {
          cache: 'no-store',
        });
        const data = await response.json();

        if (!cancelled && data.success) {
          const mapped: PortfolioProject[] = (data.data as DynamicProjectData[]).map((p) => ({
            id: p._id,
            slug: p.slug,
            title: p.title,
            category: p.category,
            location: p.location || 'Lagos, Nigeria',
            image: {
              src: p.featuredImage,
              alt: `${p.title} thumbnail`,
            },
            description: p.shortDescription,
            featured: p.isFeatured,
          }));
          setProjects(mapped);
        }
      } catch {
        // Swallow - the section simply renders empty if the fetch fails
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadFeaturedProjects();
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.category)));
    return ['All', ...unique];
  }, [projects]);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((project) => project.category === activeCategory);

  const handleCategoryChange = (category: string): void => {
    setActiveCategory(category);
    trackEvent('click', 'engagement', `portfolio_filter_${category.toLowerCase()}`);
  };

  if (!isLoading && projects.length === 0) {
    return null;
  }

  return (
    <section className={cn("py-12 bg-luxury-cream", className)}>
      <div className="container-luxury">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5  font-serif">
            Our Signature Spaces
          </h2>
          <p className="text-xl text-luxury-slate max-w-3xl mx-auto leading-relaxed mb-3 font-body ">
            A showcase of the homes and spaces we&apos;ve transformed with elegance and precision.
          </p>

          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="luxury-divider max-w-md mx-auto"
          />
        </motion.div>

        {categories.length > 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={cn(
                  "px-6 py-3 rounded-full font-medium transition-all duration-300",
                  activeCategory === category
                    ? "bg-luxury-gold text-white shadow-luxury-soft"
                    : "bg-white text-luxury-slate hover:bg-luxury-gold hover:text-white shadow-sm"
                )}
              >
                {category}
              </button>
            ))}
          </motion.div>
        )}

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/projects/${project.slug}`} className="block">
                <div className="card-luxury overflow-hidden h-full">
                  {/* Project Image Container */}
                  <div
                    className="relative aspect-[4/3] mb-6 overflow-hidden rounded-xl"
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <Image
                      src={project.image.src}
                      alt={project.image.alt}
                      fill
                      className={cn(
                        "object-cover transition-all duration-500",
                        hoveredProject === project.id ? "scale-110 brightness-75" : "scale-100 brightness-100"
                      )}
                      sizes={responsiveSizes.threeColumn}
                      priority={index < 3}
                      placeholder="blur"
                      blurDataURL={generateImageBlurDataUrl(10, 8)}
                      quality={imageQuality.standard}
                    />

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 right-4 z-10">
                        <div className="bg-luxury-gold text-white text-xs px-3 py-1 rounded-full font-medium">
                          Featured
                        </div>
                      </div>
                    )}

                    {/* Hover Eye Icon */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: hoveredProject === project.id ? 1 : 0,
                        scale: hoveredProject === project.id ? 1 : 0.8
                      }}
                      className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                    >
                      <div className="bg-white p-4 rounded-full shadow-luxury-soft">
                        <Eye className="w-6 h-6 text-luxury-charcoal" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-luxury-charcoal text-sm font-medium uppercase tracking-wider">
                        {project.category}
                      </span>
                      <span className="text-luxury-slate text-sm">
                        {project.location}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-luxury-charcoal group-hover:text-luxury-gold transition-colors duration-300 font-accent">
                      {project.title}
                    </h3>

                    <p className="text-luxury-slate leading-relaxed font-body">
                      {project.description}
                    </p>

                    <div className="flex items-center text-luxury-charcoal font-medium group-hover:gap-3 gap-2 transition-all duration-300">
                      <span>View Project</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Portfolio Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Link
            href="/projects"
            className="btn-luxury group inline-flex items-center space-x-2"
          >
            <span>View Full Portfolio</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
