//src/app/projects/page.tsx
'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { ChevronRight, Grid3X3, Home, Building2, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

// GitHub CDN Base URL
const GITHUB_CDN_BASE = 'https://cdn.jsdelivr.net/gh/rhunor/olivehausimages@main';

// Project types
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
}

// Dynamic import for Lightbox to reduce initial bundle
const Lightbox = dynamic(() => import('./Lightbox'), { ssr: false });

// Project card component
interface ProjectCardProps {
  project: Project;
  index: number;
  onViewProject: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onViewProject }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group cursor-pointer"
      onClick={() => onViewProject(project)}
    >
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-luxury-soft hover:shadow-luxury-strong transition-all duration-500">
        <div className="relative aspect-[4/3] overflow-hidden bg-mist-grey">
          <Image
            src={project.thumbnail.src}
            alt={project.thumbnail.alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 3}
            loading={index >= 3 ? 'lazy' : undefined}
            placeholder="blur"
            blurDataURL={`${project.thumbnail.src}?w=10&h=10`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {project.featured && (
            <div className="absolute top-4 right-4 bg-luxury-gold text-white px-3 py-1 rounded-full text-xs font-medium">
              Featured
            </div>
          )}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8,
            }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <Eye className="w-6 h-6 text-luxury-charcoal" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20,
            }}
            className="absolute bottom-4 left-4 right-4 text-white pointer-events-none"
          >
            <p className="text-sm font-medium">Click to view gallery</p>
          </motion.div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-luxury-gold text-sm font-medium uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-luxury-slate/60 text-sm">{project.location}</span>
          </div>
          <h3 className="text-xl font-serif font-bold text-luxury-charcoal mb-3 group-hover:text-luxury-gold transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-luxury-slate leading-relaxed line-clamp-2">{project.description}</p>
          <div className="mt-4 flex items-center text-luxury-gold font-medium">
            <span className="text-sm">View Project</span>
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main Projects Page Component
export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<'all' | 'residential' | 'corporate' | 'commercial'>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Memoized projects data
  const projects = useMemo<Project[]>(() => [
    {
      id: 'Edené',
      title: 'Project Edené wellness',
      location: 'Magodo, Lagos',
      description: 'This renovation reimagined the spa into a sanctuary of calm, where muted tones, refined textures, and seamless design invite relaxation at every turn.',
      category: 'commercial',
      thumbnail: {
        src: `${GITHUB_CDN_BASE}/projects/projectsereniquemagodolagos_/1.webp`,
        alt: 'Project Edené spa interior',
      },
      images: Array.from({ length: 9 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projectsereniquemagodolagos_/${i + 1}.webp`,
        alt: `Project Serenique interior ${i + 1}`,
      })),
    },
    {
      id: 'landmark',
      title: 'Project Landmark',
      location: 'Oniru, Lagos',
      description: 'This space captures the spirit of Paris vibrant, romantic, and effortlessly chic. Playful details meet refined finishes, blending whimsy with sophistication. Bold yet graceful',
      category: 'residential',
      thumbnail: {
        src: `${GITHUB_CDN_BASE}/projects/projectlandmark/1.webp`,
        alt: 'Project Landmark interior',
      },
      images: Array.from({ length: 10 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projectlandmark/${i + 1}.webp`,
        alt: `Project Landmark interior ${i + 1}`,
      })),
    },
    {
      id: 'serene',
      title: 'Project Serene',
      location: 'Maryland, Lagos',
      description: 'Designed as a sanctuary, this bathroom embraces space, light, and calm. A breathy layout, soft finishes, and spa-inspired details create an atmosphere of ease and renewal &apos; a retreat that feels both expansive and intimate',
      category: 'residential',
      thumbnail: {
        src: `${GITHUB_CDN_BASE}/projects/projectserene/1.webp`,
        alt: 'Project Serenique spa interior',
      },
      images: Array.from({ length: 4 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projectserene/${i + 1}.webp`,
        alt: `Project serene interior ${i + 1}`,
      })),
    },
    {
      id: 'ezra',
      title: 'Project Ezra',
      location: 'Lekki, Lagos',
      description: 'Defined by clean lines, open flow, and thoughtful details, this modern space blends functionality with understated elegance.',
      category: 'residential',
      thumbnail: {
        src: `${GITHUB_CDN_BASE}/projects/projectezra/4.webp`,
        alt: 'Project Ezra modern interior',
      },
      images: Array.from({ length: 6 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projectezra/${i + 1}.webp`,
        alt: `Project Ezra interior ${i + 1}`,
      })),
    },
    {
      id: 'Keffi',
      title: 'Project Keffi',
      location: 'ikoyi, Lagos',
      description: 'This home embodies modern luxury with personality &apos; blending bold, saturated hues with serene spaces designed for rest and renewal.',
      category: 'residential',
      featured: true,
      thumbnail: {
        src: `${GITHUB_CDN_BASE}/projects/projectluminalekkilagos/1.webp`,
        alt: 'Project Keffi luxury home',
      },
      images: Array.from({ length: 6 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projectluminalekkilagos/${i + 1}.webp`,
        alt: `Project Keffi interior ${i + 1}`,
      })),
    },
    {
      id: 'casa-vitalis',
      title: 'Project Casa Vitalis',
      location: 'Lekki, Lagos',
      description: 'This home strikes a rare balance between bold expression and refined luxury. Rich statement hues set a dramatic tone.',
      category: 'residential',
      thumbnail: {
        src: `${GITHUB_CDN_BASE}/projects/projectcasavitalis/12.webp`,
        alt: 'Project Casa Vitalis luxury residence',
      },
      images: Array.from({ length: 25 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projectcasavitalis/${i + 1}.webp`,
        alt: `Project Casa Vitalis interior ${i + 1}`,
      })),
    },
    {
      id: 'casa-serena',
      title: 'Project Casa Serena',
      location: 'Lekki, Lagos',
      description: 'A stylish home with a modern edge, Casa Serena combines clean lines, contemporary finishes, and subtle warmth.',
      category: 'residential',
      thumbnail: {
        src: `${GITHUB_CDN_BASE}/projects/projectcasaserenalekkilagos/1.webp`,
        alt: 'Project Casa Serena modern home',
      },
      images: Array.from({ length: 8 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projectcasaserenalekkilagos/${i + 1}.webp`,
        alt: `Project Casa Serena interior ${i + 1}`,
      })),
    },
    {
      id: 'horizon',
      title: 'Project Horizon',
      location: 'Lekki, Lagos',
      description: 'This kitchen balances refined aesthetics with everyday function, blending seamless storage and elegant finishes.',
      category: 'residential',
      featured: true,
      thumbnail: {
        src: `${GITHUB_CDN_BASE}/projects/projecthorizonlekkilagos/1.webp`,
        alt: 'Project Horizon kitchen design',
      },
      images: Array.from({ length: 4 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projecthorizonlekkilagos/${i + 1}.webp`,
        alt: `Project Horizon interior ${i + 1}`,
      })),
    },
    {
      id: 'modern-nest',
      title: 'Project Modern Nest',
      location: 'Ikeja, Lagos',
      description: 'This project brought together a soft nursery, cozy living room, warm dining space, and modern bedroom.',
      category: 'residential',
      thumbnail: {
        src: `${GITHUB_CDN_BASE}/projects/projectmodernnestomolelagos/1.webp`,
        alt: 'Project Modern Nest family home',
      },
      images: Array.from({ length: 3 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projectmodernnestomolelagos/${i + 1}.webp`,
        alt: `Project Modern Nest interior ${i + 1}`,
      })),
    },
    {
      id: 'gerald',
      title: 'Project Gerald',
      location: 'Lekki, Lagos',
      description: 'A serene retreat designed with balance in mind &apos; this bathroom combines clean lines and elegant finishes.',
      category: 'residential',
      thumbnail: {
        src: `${GITHUB_CDN_BASE}/projects/projectgeraldlekkilagos/2.webp`,
        alt: 'Project Gerald bathroom design',
      },
      images: Array.from({ length: 2 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projectgeraldlekkilagos/${i + 1}.webp`,
        alt: `Project Gerald interior ${i + 1}`,
      })),
    },
    {
      id: 'lustre',
      title: 'Project Lustre',
      location: 'Victoria Island, Lagos',
      description: 'This kitchen was designed to be both beautiful and practical &apos; a cozy space where storage and style work hand in hand.',
      category: 'residential',
      thumbnail: {
        src: `${GITHUB_CDN_BASE}/projects/projectlustre/7.webp`,
        alt: 'Project Lustre kitchen',
      },
      images: Array.from({ length: 10 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projectlustre/${i + 1}.webp`,
        alt: `Project Lustre interior ${i + 1}`,
      })),
    },
    {
      id: 'blush',
      title: 'Project Blush',
      location: 'GRA, Lagos',
      description: 'This bathroom balances softness with personality, blending soothing finishes with a touch of bold colour.',
      category: 'residential',
      thumbnail: {
        src: `${GITHUB_CDN_BASE}/projects/projectblushgralagos_/2.webp`,
        alt: 'Project Blush bathroom',
      },
      images: Array.from({ length: 5 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projectblushgralagos_/${i + 1}.webp`,
        alt: `Project Blush interior ${i + 1}`,
      })),
    },
    {
      id: 'haven',
      title: 'Project Haven',
      location: 'Lekki, Lagos',
      description: 'This shortlet was designed for comfort and ease &apos; a refreshing retreat with warm finishes and thoughtful layouts.',
      category: 'commercial',
      thumbnail: {
        src: `${GITHUB_CDN_BASE}/projects/projecthavenlekkilagos/1.webp`,
        alt: 'Project Haven shortlet',
      },
      images: Array.from({ length: 4 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projecthavenlekkilagos/${i + 1}.webp`,
        alt: `Project Haven interior ${i + 1}`,
      })),
    },
    {
      id: 'urban',
      title: 'Project Urban',
      location: 'Lekki, Lagos',
      description: 'This project redefined the home with an urban edge and upscale sophistication.',
      category: 'residential',
      thumbnail: {
        src: `${GITHUB_CDN_BASE}/projects/projecturbanlekkilagos/10.webp`,
        alt: 'Project Urban modern home',
      },
      images: Array.from({ length: 9 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projecturbanlekkilagos/${i + 1}.webp`,
        alt: `Project Urban interior ${i + 1}`,
      })),
    },
    {
      id: 'roche',
      title: 'Project Roche',
      location: 'Banana Island, Lagos',
      description: 'This renovation was designed around our client&apos;s love for warmth and vibrance.',
      category: 'residential',
      featured: true,
      thumbnail: {
        src: `${GITHUB_CDN_BASE}/projects/projectroche/1.webp`,
        alt: 'Project Roche luxury renovation',
      },
      images: Array.from({ length: 20 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projectroche/${i + 1}.webp`,
        alt: `Project Roche interior ${i + 1}`,
      })),
    },
    {
      id: 'holiday',
      title: 'Project Holiday',
      location: 'Lekki, Lagos',
      description: 'This high-end renovation reshaped the home into a modern sanctuary with thoughtful layouts.',
      category: 'residential',
      thumbnail: {
        src: `${GITHUB_CDN_BASE}/projects/projectholiday/22.webp`,
        alt: 'Project Holiday renovation',
      },
      images: Array.from({ length: 25 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projectholiday/${i + 1}.webp`,
        alt: `Project Holiday interior ${i + 1}`,
      })),
    },
    {
      id: 'tranquil',
      title: 'Project Tranquil',
      location: 'Magodo, Lagos',
      description: 'This project transformed everyday bathrooms into serene, spa-inspired retreats filled with colour and character.',
      category: 'residential',
      thumbnail: {
        src: `${GITHUB_CDN_BASE}/projects/projecttranquilmagodolagos_/2.webp`,
        alt: 'Project Tranquil spa bathrooms',
      },
      images: Array.from({ length: 13 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projecttranquilmagodolagos_/${i + 1}.webp`,
        alt: `Project Tranquil interior ${i + 1}`,
      })),
    },
    {
      id: 'london',
      title: 'Project Osapa London',
      location: 'Lekki, Lagos',
      description: 'A complete transformation of this residence into a refined, high-end home with bespoke details.',
      category: 'residential',
      thumbnail: {
        src: `${GITHUB_CDN_BASE}/projects/projectlondon/20.webp`,
        alt: 'Project London luxury residence',
      },
      images: Array.from({ length: 23 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projectlondon/${i + 1}.webp`,
        alt: `Project London interior ${i + 1}`,
      })),
    },
    {
      id: 'officeland',
      title: 'Project Officeland',
      location: 'Ikoyi, Lagos',
      description: 'We designed this workplace to balance functionality with impact &apos; creating a space that supports both staff well-being and productivity.',
      category: 'corporate',
      featured: true,
      thumbnail: {
        src: `${GITHUB_CDN_BASE}/projects/projectofficeland/6.webp`,
        alt: 'Project Officeland corporate workspace',
      },
      images: Array.from({ length: 9 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projectofficeland/${i + 1}.webp`,
        alt: `Project Officeland interior ${i + 1}`,
      })),
    },
  ], []);

  const filteredProjects = useMemo(
    () => (activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter)),
    [activeFilter, projects]
  );

  const handleViewProject = useCallback((project: Project) => {
    setSelectedProject(project);
    setLightboxIndex(0);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setSelectedProject(null);
    setLightboxIndex(0);
  }, []);

  const handleNextImage = useCallback(() => {
    if (selectedProject) {
      const project = selectedProject as Project; // Explicit narrowing for TS
      setLightboxIndex((prev) => (prev + 1) % project.images.length);
    }
  }, [selectedProject]);

  const handlePreviousImage = useCallback(() => {
    if (selectedProject) {
      const project = selectedProject as Project; // Explicit narrowing for TS
      setLightboxIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
    }
  }, [selectedProject]);

  const handleIndexChange = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        {selectedProject?.images?.[0]?.src && (
          <link
            rel="preload"
            href={selectedProject.images[0].src}
            as="image"
            type="image/webp"
            key={selectedProject.images[0].src}
          />
        )}
      </Head>
      <div className="min-h-screen bg-pale-oat relative">
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
            opacity: 0.02,
            backgroundImage: `
              radial-gradient(circle at 20% 20%, #D4AF37 1px, transparent 1px),
              radial-gradient(circle at 80% 20%, #D4AF37 1px, transparent 1px),
              radial-gradient(circle at 20% 80%, #D4AF37 1px, transparent 1px),
              radial-gradient(circle at 80% 80%, #D4AF37 1px, transparent 1px),
              radial-gradient(circle at 50% 50%, #D4AF37 0.5px, transparent 0.5px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative pt-32 pb-20 bg-luxury-charcoal text-white overflow-hidden"
        >
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `${GITHUB_CDN_BASE}/projects/projectezra/4.webp`,
                backgroundSize: '20px 20px',
              }}
            />
          </div>
          <div className="container-luxury relative z-10">
            <div className="text-center max-w-5xl mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-wide"
              >
                Our Signature
                <span className="text-luxury-gold block mt-2">Projects</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-white/90 leading-relaxed font-sans"
              >
                A showcase of the homes and spaces we’ve transformed with elegance and precision.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap justify-center gap-8 mt-12"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-luxury-gold">150+</div>
                  <div className="text-sm text-white/70 mt-1">Completed Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-luxury-gold">12+</div>
                  <div className="text-sm text-white/70 mt-1">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-luxury-gold">98%</div>
                  <div className="text-sm text-white/70 mt-1">Client Satisfaction</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
        <section className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm">
          <div className="container-luxury py-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-wrap gap-3"
              >
                {[
                  { value: 'all' as const, label: 'All Projects', icon: Grid3X3 },
                  { value: 'residential' as const, label: 'Residential', icon: Home },
                  { value: 'corporate' as const, label: 'Corporate', icon: Building2 },
                  { value: 'commercial' as const, label: 'Commercial', icon: Building2 },
                ].map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setActiveFilter(filter.value)}
                    className={cn(
                      'flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300',
                      activeFilter === filter.value
                        ? 'bg-luxury-charcoal text-white shadow-lg'
                        : 'bg-mist-grey/20 text-luxury-slate hover:bg-soft-sage/20 hover:text-luxury-charcoal'
                    )}
                  >
                    <filter.icon className="w-4 h-4" />
                    <span>{filter.label}</span>
                  </button>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
        <section className="py-20 relative z-10">
          <div className="container-luxury">
            {isLoading ? (
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-luxury-slate">Loading luxury spaces...</p>
                </div>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFilter}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      onViewProject={handleViewProject}
                    />
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
                  onClick={() => setActiveFilter('all')}
                  className="text-luxury-gold hover:text-luxury-darkGold transition-colors"
                >
                  View all projects
                </button>
              </motion.div>
            )}
          </div>
        </section>
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-20 bg-soft-sage/10 relative z-10"
        >
          <div className="container-luxury text-center">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-luxury-charcoal">
              Love Our Spaces?
            </h2>
            <p className="text-xl text-luxury-slate max-w-3xl mx-auto mb-8 leading-relaxed">
              Your project deserves the same touch. Connect with us to begin.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/contact'}
              className="border border-luxury-gold btn-luxury text-lg px-12 py-4"
            >
              Start Your Project
            </motion.button>
          </div>
        </motion.section>
        {selectedProject && (
          <Lightbox
            images={selectedProject.images}
            currentIndex={lightboxIndex}
            isOpen={!!selectedProject}
            onClose={handleCloseLightbox}
            onNext={handleNextImage}
            onPrevious={handlePreviousImage}
            onIndexChange={handleIndexChange}
            projectTitle={selectedProject.title}
          />
        )}
      </div>
    </>
  );
}