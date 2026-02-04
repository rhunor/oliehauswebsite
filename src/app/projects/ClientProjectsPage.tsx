// src/app/projects/ClientProjectsPage.tsx
'use client';

import { useState, useEffect, useRef, useCallback, useMemo, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Head from 'next/head';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn, getGitHubCdnCacheBustedUrl, generateImageBlurDataUrl, imageQuality } from '@/lib/utils';
import { ImageLoadingSpinner } from '@/components/ImageLoadingSpinner';

interface ProjectImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface Project {
  id: string;
  title: string;
  location: string;
  description: string;
  category: 'residential' | 'corporate' | 'commercial';
  thumbnail: ProjectImage;
  images: ProjectImage[];
  featured?: boolean;
  area?: string;
}

const GITHUB_CDN_BASE = "https://cdn.jsdelivr.net/gh/rhunor/olivehausimages@main";

// Helper function for GitHub-hosted images (used in static projects)
// const createImageArray = (basePath: string, count: number, altPrefix: string): ProjectImage[] =>
//   Array.from({ length: count }, (_, i) => ({
//     src: getGitHubCdnCacheBustedUrl(`${basePath}/${i + 1}.webp`, 'moderate'),
//     alt: `${altPrefix} ${i + 1}`,
//   }));

// Custom smooth scroll function with easing
const smoothScrollTo = (targetPosition: number, duration: number = 1800): void => {
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const startTime = performance.now();

  const easeInOutQuad = (t: number): number =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  const animationStep = (currentTime: number): void => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutQuad(progress);
    window.scrollTo(0, startPosition + distance * easedProgress);
    if (progress < 1) {
      requestAnimationFrame(animationStep);
    }
  };

  requestAnimationFrame(animationStep);
};

// Magazine-style Project Card Component
const MagazineProjectCard: React.FC<{
  project: Project;
  index: number;
  isExpanded: boolean;
  onToggle: (projectId: string) => void;
}> = ({ project, index, isExpanded, onToggle }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [visibleImages, setVisibleImages] = useState<number[]>([]);
  const [galleryImageStates, setGalleryImageStates] = useState<Record<number, { loaded: boolean; error: boolean }>>({});
  const [dynamicHeight, setDynamicHeight] = useState(0);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  // Cache-busted thumbnail URL
  const cacheBustedThumbnail = useMemo(() =>
    project.thumbnail.src.startsWith('https://cdn.jsdelivr.net')
      ? getGitHubCdnCacheBustedUrl(project.thumbnail.src.replace('https://cdn.jsdelivr.net/gh/rhunor/olivehausimages@main', ''), 'moderate')
      : project.thumbnail.src,
  [project.thumbnail.src]);

  useLayoutEffect(() => {
    if (contentRef.current) {
      if (isExpanded) {
        setDynamicHeight(contentRef.current.scrollHeight);
      } else {
        setDynamicHeight(0);
      }
    }
  }, [isExpanded]);

  const handleThumbnailLoad = useCallback(() => {
    setImageLoaded(true);
    setImageError(false);
  }, []);

  const handleThumbnailError = useCallback(() => {
    setImageError(true);
    setImageLoaded(false);
  }, []);

  const handleGalleryImageLoad = useCallback((imgIndex: number) => {
    setGalleryImageStates(prev => ({
      ...prev,
      [imgIndex]: { loaded: true, error: false }
    }));
  }, []);

  const handleGalleryImageError = useCallback((imgIndex: number) => {
    setGalleryImageStates(prev => ({
      ...prev,
      [imgIndex]: { loaded: false, error: true }
    }));
  }, []);

  useEffect(() => {
    if (!isExpanded) return;

    const observers = imageRefs.current.map((ref, idx) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleImages((prev) => [...new Set([...prev, idx])]);
            }
          });
        },
        { threshold: 0.2, rootMargin: '50px' }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [isExpanded]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
      className="relative"
    >
      <div className="relative bg-white rounded-none shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden h-full">
        <div className="flex items-center justify-between px-6 py-4 border-b border-luxury-slate/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 relative">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M50 10 L90 90 L10 90 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-luxury-gold"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs tracking-wider text-luxury-slate/60">
            <span>FR</span>
            <span>UA</span>
            <span className="text-luxury-charcoal font-medium">EN</span>
          </div>
          <button className="w-6 h-6" onClick={() => onToggle(project.id)}>
            <div className="flex flex-col gap-1">
              <span className="w-full h-0.5 bg-luxury-charcoal"></span>
              <span className="w-full h-0.5 bg-luxury-charcoal"></span>
              <span className="w-full h-0.5 bg-luxury-charcoal"></span>
            </div>
          </button>
        </div>

        <div className="px-8 pt-12 pb-6 text-center min-h-[150px] md:min-h-[180px] flex flex-col justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-4xl md:text-5xl font-bold text-luxury-charcoal tracking-wide mb-3 uppercase"
            style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {project.title.replace('Project ', '')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-luxury-slate/70 tracking-widest"
          >
            {project.area && `${project.area} / `}{project.location}
          </motion.p>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden bg-mist-grey">
          <Image
            src={cacheBustedThumbnail}
            alt={project.thumbnail.alt}
            fill
            className={cn(
              "object-cover transition-all duration-1000",
              imageLoaded && !imageError ? "opacity-100 scale-100" : "opacity-0 scale-105"
            )}
            sizes="(max-width: 768px) 100vw, 700px"
            priority={index < 3}
            loading={index >= 3 ? 'lazy' : undefined}
            placeholder="blur"
            blurDataURL={generateImageBlurDataUrl(10, 12)}
            quality={imageQuality.high}
            onLoad={handleThumbnailLoad}
            onError={handleThumbnailError}
          />
          {(!imageLoaded || imageError) && <ImageLoadingSpinner />}

          {project.featured && (
            <div className="absolute top-6 right-6 bg-luxury-gold text-white px-4 py-1.5 text-xs font-medium tracking-widest z-10">
              FEATURED
            </div>
          )}
        </div>

        <div className="px-8 py-8 min-h-[140px] md:min-h-[160px]">
          <p
            className="text-luxury-slate/80 leading-relaxed text-sm md:text-base"
            style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {project.description}
          </p>
        </div>

        <div className="px-8 pb-8">
          <motion.button
            onClick={() => onToggle(project.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full border-2 border-luxury-charcoal bg-transparent hover:bg-luxury-gold hover:text-luxury-charcoal text-luxury-charcoal py-4 flex items-center justify-center gap-3 transition-all duration-300 group"
          >
            <span className="font-medium tracking-wider text-sm">
              {isExpanded ? 'CLOSE GALLERY' : 'VIEW FULL GALLERY'}
            </span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              layout
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: dynamicHeight,
                opacity: 1,
                transition: {
                  height: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] },
                  opacity: { duration: 0.5, delay: 0.2 }
                }
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  height: { duration: 1.0, ease: 'easeInOut' },
                  opacity: { duration: 0.8, ease: 'easeInOut' }
                }
              }}
              className="overflow-hidden border-t border-luxury-slate/10"
            >
              <div ref={contentRef} className="bg-gradient-to-b from-luxury-slate/5 to-[#F3EEE8]">
                <div className="px-8 py-6 border-b border-luxury-slate/10">
                  <p className="text-xs tracking-widest text-luxury-slate/60 uppercase">
                    Gallery — {project.images.length} Images
                  </p>
                </div>

                <div className="px-4 md:px-8 py-8 space-y-6">
                  {project.images.map((image, imgIndex) => {
                    const imageState = galleryImageStates[imgIndex] || { loaded: false, error: false };

                    return (
                      <motion.div
                        key={imgIndex}
                        ref={(el) => { imageRefs.current[imgIndex] = el; }}
                        initial={{ opacity: 0, y: 40 }}
                        animate={visibleImages.includes(imgIndex) ? {
                          opacity: 1,
                          y: 0
                        } : {}}
                        transition={{
                          duration: 0.8,
                          delay: 0.1,
                          ease: [0.43, 0.13, 0.23, 0.96]
                        }}
                        className="relative"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs font-medium text-luxury-slate/40 tracking-widest">
                            {String(imgIndex + 1).padStart(2, '0')}
                          </span>
                          <div className="flex-1 h-px bg-luxury-slate/10"></div>
                        </div>

                        <div className="relative aspect-[4/5] overflow-hidden bg-mist-grey">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className={cn(
                              "object-cover transition-all duration-700",
                              imageState.loaded && !imageState.error ? "opacity-100 hover:scale-105" : "opacity-0"
                            )}
                            sizes="(max-width: 768px) 100vw, 700px"
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL={generateImageBlurDataUrl(10, 12)}
                            quality={imageQuality.standard}
                            onLoad={() => handleGalleryImageLoad(imgIndex)}
                            onError={() => handleGalleryImageError(imgIndex)}
                          />
                          {(!imageState.loaded || imageState.error) && <ImageLoadingSpinner />}
                        </div>

                        <div className="mt-3 text-xs text-luxury-slate/60 italic">
                          {image.alt}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="px-8 py-8 border-t border-luxury-slate/10 text-center">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggle(project.id);
                    }}
                    whileHover={{ scale: 1.02 }}
                    className="inline-flex items-center gap-2 text-luxury-charcoal hover:text-luxury-gold transition-colors font-medium"
                  >
                    <ChevronUp className="w-4 h-4" />
                    <span className="text-sm tracking-wider">CLOSE GALLERY</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center mt-6"
      >
        <span className="text-xs tracking-[0.2em] text-luxury-slate/50 uppercase font-medium">
          {project.category}
        </span>
      </motion.div>
    </motion.div>
  );
};

interface ClientProjectsPageProps {
  initialProjects: Project[];
}

export default function ClientProjectsPage({ initialProjects }: ClientProjectsPageProps) {
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'residential' | 'corporate' | 'commercial'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);

  const filteredProjects = activeFilter === 'all'
    ? initialProjects
    : initialProjects.filter((p) => p.category === activeFilter);

  const handleToggleProject = useCallback((projectId: string) => {
    setExpandedProjectId((current) => {
      const isCurrentlyExpanded = current === projectId;
      const newId = isCurrentlyExpanded ? null : projectId;

      if (isCurrentlyExpanded) {
        setTimeout(() => {
          const element = document.getElementById(`project-${projectId}`);
          if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offset = 100;
            const targetPosition = elementPosition - offset;
            smoothScrollTo(targetPosition);
          }
        }, 0);
      }

      return newId;
    });
  }, []);

  const handleFilterChange = useCallback((filter: 'all' | 'residential' | 'corporate' | 'commercial') => {
    setIsFiltering(true);
    setActiveFilter(filter);
    setTimeout(() => setIsFiltering(false), 400);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Our Signature Projects | Olivehaus Interiors</title>
      </Head>
      <div className="min-h-screen bg-[#F3EEE8] relative">
        <div
          className="diamond-pattern"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            zIndex: 1,
            opacity: 0.015,
            backgroundImage: `
              radial-gradient(circle at 20% 20%, #D4AF37 1px, transparent 1px),
              radial-gradient(circle at 80% 20%, #D4AF37 1px, transparent 1px),
              radial-gradient(circle at 20% 80%, #D4AF37 1px, transparent 1px),
              radial-gradient(circle at 80% 80%, #D4AF37 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative h-[65vh] md:h-[75vh] lg:h-[85vh] overflow-hidden"
        >
          <Image
            src={getGitHubCdnCacheBustedUrl('/projects/projectroche/1.webp', 'moderate')}
            alt="Luxury interior design project"
            fill
            priority
            className={cn(
              "object-cover transition-opacity duration-1000",
              heroImageLoaded ? "opacity-100" : "opacity-0"
            )}
            sizes="100vw"
            quality={imageQuality.high}
            onLoad={() => setHeroImageLoaded(true)}
          />

          {!heroImageLoaded && (
            <div className="absolute inset-0">
              <ImageLoadingSpinner />
            </div>
          )}

          <div className="absolute inset-0 bg-black/40" />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="absolute inset-0 flex items-center justify-center p-4"
          >
            <div className="container-luxury text-center text-white">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-5 tracking-wide"
              >
                Our Signature
                <span className="text-white block mt-2">Projects</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-base md:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto"
              >
                A curated collection of transformative spaces, where luxury meets livability. Each project reflects our commitment to exceptional craftsmanship and timeless design.
              </motion.p>
            </div>
          </motion.div>
        </motion.section>

        <section className="sticky top-0 z-40 bg-[#F3EEE8]/98 backdrop-blur-md shadow-sm border-b border-luxury-slate/10">
          <div className="container-luxury py-5">
            <div className="max-w-xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-2"
              >
                {[
                  { value: 'all' as const, label: 'All' },
                  { value: 'residential' as const, label: 'Residential' },
                  { value: 'corporate' as const, label: 'Corporate' },
                  { value: 'commercial' as const, label: 'Commercial' },
                ].map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => handleFilterChange(filter.value)}
                    className={cn(
                      'w-full py-2.5 text-center text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300',
                      activeFilter === filter.value
                        ? 'bg-luxury-charcoal text-white'
                        : 'bg-transparent text-luxury-slate/60 hover:text-luxury-charcoal border border-luxury-slate/20 hover:border-luxury-slate/40'
                    )}
                  >
                    {filter.label}
                  </button>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <motion.section
          layoutScroll
          className="py-16 md:py-24 relative z-10"
        >
          <div className="container-luxury max-w-7xl relative">
            {isFiltering && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 flex items-center justify-center bg-[#F3EEE8]/80 backdrop-blur-sm"
              >
                <div className="text-center">
                  <ImageLoadingSpinner className="w-12 h-12 mx-auto mb-4" />
                  <p className="text-luxury-slate text-sm tracking-wider">Filtering projects...</p>
                </div>
              </motion.div>
            )}

            {isLoading ? (
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                  <ImageLoadingSpinner className="relative w-16 h-16 mx-auto mb-4" />
                  <p className="text-luxury-slate text-sm tracking-wider">Loading collection...</p>
                </div>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                <motion.div
                  layout
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      id={`project-${project.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
                      layout
                    >
                      <MagazineProjectCard
                        project={project}
                        index={index}
                        isExpanded={expandedProjectId === project.id}
                        onToggle={handleToggleProject}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}

            {!isLoading && filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <p className="text-xl text-luxury-slate mb-4">No projects found in this category</p>
                <button
                  onClick={() => handleFilterChange('all')}
                  className="text-luxury-gold hover:text-luxury-darkGold transition-colors text-sm tracking-wider"
                >
                  View all projects
                </button>
              </motion.div>
            )}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-24 bg-luxury-charcoal relative z-10 overflow-hidden"
        >
          <div className="absolute inset-0">
            <Image
              src={`${GITHUB_CDN_BASE}/images/hero/9.webp`}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>

          <div className="absolute inset-0 bg-black/50" />

          <div className="container-luxury text-center relative z-20 px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-white text-sm tracking-[0.3em] uppercase font-semibold mb-6 block drop-shadow-lg">
                Let&apos;s Create Together
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-100 drop-shadow-lg">
                Love Our Spaces?
                <span className="text-white block mt-2 drop-shadow-lg">Your project deserves the same touch</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed font-light drop-shadow-md">
                Every exceptional space starts with a conversation. Let&apos;s discuss your vision.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/contact'}
                className="bg-luxury-gold hover:bg-luxury-darkGold text-white px-12 py-4 text-sm tracking-[0.2em] uppercase font-semibold transition-all duration-300 shadow-2xl hover:shadow-3xl border-2 border-luxury-gold/20 hover:border-luxury-gold/40"
              >
                Connect with us to begin
              </motion.button>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </>
  );
}