// src/app/projects/page.tsx
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  Play,
  Pause,
  Grid3X3,
  Home,
  Building2
} from 'lucide-react';
import { cn } from '@/lib/utils';

// GitHub CDN Base URL
const GITHUB_CDN_BASE = "https://cdn.jsdelivr.net/gh/rhunor/olivehausimages@main";

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

// Lightbox component
interface LightboxProps {
  images: ProjectImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  projectTitle: string;
}

const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  projectTitle
}) => {
  const [isSlideshow, setIsSlideshow] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Slideshow functionality
  useEffect(() => {
    if (!isSlideshow || !isOpen) return;
    
    const interval = setInterval(() => {
      onNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [isSlideshow, isOpen, onNext]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
        case ' ':
          e.preventDefault();
          setIsSlideshow(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrevious]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg"
        onClick={onClose}
      >
        <div className="relative h-full w-full flex items-center justify-center p-4">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-60 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image container */}
          <div 
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <Image
                  src={images[currentIndex]?.src || ''}
                  alt={images[currentIndex]?.alt || ''}
                  width={1920}
                  height={1080}
                  className="max-w-full max-h-full object-contain rounded-lg"
                  onLoadingComplete={() => setImageLoading(false)}
                  priority
                />
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
            className="absolute left-4 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Bottom controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsSlideshow(!isSlideshow);
              }}
              className="p-2 text-white hover:text-luxury-gold transition-colors"
              aria-label={isSlideshow ? "Pause slideshow" : "Play slideshow"}
            >
              {isSlideshow ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            
            <div className="flex items-center gap-2 text-white">
              <span className="text-sm font-medium">{projectTitle}</span>
              <span className="text-xs opacity-70">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-4xl overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  // Jump to specific image
                  const newIndex = index;
                  if (newIndex !== currentIndex) {
                    // Update currentIndex through parent
                  }
                }}
                className={cn(
                  "flex-shrink-0 w-16 h-16 rounded overflow-hidden transition-all duration-300",
                  index === currentIndex
                    ? "ring-2 ring-luxury-gold opacity-100"
                    : "opacity-50 hover:opacity-75"
                )}
              >
                <Image
                  src={image.src}
                  alt={`Thumbnail ${index + 1}`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

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
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.43, 0.13, 0.23, 0.96]
      }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group cursor-pointer"
      onClick={() => onViewProject(project)}
    >
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-luxury-soft hover:shadow-luxury-strong transition-all duration-500">
        {/* Image container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-mist-grey">
          <Image
            src={project.thumbnail.src}
            alt={project.thumbnail.alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 6}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-4 right-4 bg-luxury-gold text-white px-3 py-1 rounded-full text-xs font-medium">
              Featured
            </div>
          )}

          {/* View indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8
            }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="bg-white/95 backdrop-blur-sm p-4 rounded-full shadow-2xl">
              <Eye className="w-6 h-6 text-luxury-charcoal" />
            </div>
          </motion.div>

          {/* Click to view text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20
            }}
            className="absolute bottom-4 left-4 right-4 text-white pointer-events-none"
          >
            <p className="text-sm font-medium">Click to view gallery</p>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-luxury-gold text-sm font-medium uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-luxury-slate/60 text-sm">
              {project.location}
            </span>
          </div>
          
          <h3 className="text-xl font-serif font-bold text-luxury-charcoal mb-3 group-hover:text-luxury-gold transition-colors duration-300">
            {project.title}
          </h3>
          
          <p className="text-luxury-slate leading-relaxed line-clamp-2">
            {project.description}
          </p>

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
  
  // Projects data with proper image paths
  const projects: Project[] = [

    {
      id: 'Edené',
      title: 'Project Edené wellness',
      location: 'Magodo, Lagos',
      description: 'This renovation reimagined the spa into a sanctuary of calm, where muted tones, refined textures, and seamless design invite relaxation at every turn.',
      category: 'commercial',
      thumbnail: {
        src: `${GITHUB_CDN_BASE}/projects/projectsereniquemagodolagos_/1.webp`,
        alt: 'Project Edené spa interior'
      },
      images: Array.from({ length: 7 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projectsereniquemagodolagos_/${i + 1}.webp`,
        alt: `Project Serenique interior ${i + 1}`
      }))
    },
      {
      id: 'landmark',
      title: 'Project Landmark',
      location: 'Lekki, Lagos',
      description: 'This space captures the spirit of Paris vibrant, romantic, and effortlessly chic. Playful details meet refined finishes, blending whimsy with sophistication. Bold yet graceful',
      category: 'residential',
      thumbnail: {
        src: `${GITHUB_CDN_BASE}/projects/projectlandmark/1.webp`,
        alt: 'Project Landmark interior'
      },
      images: Array.from({ length: 10 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projectlandmark/${i + 1}.webp`,
        alt: `Project Landmark interior ${i + 1}}`
      }))
    },
    {
      id: 'serene',
      title: 'Project Serene',
      location: 'Magodo, Lagos',
      description: 'Designed as a sanctuary, this bathroom embraces space, light, and calm. A breathy layout, soft finishes, and spa-inspired details create an atmosphere of ease and renewal — a retreat that feels both expansive and intimate',
      category: 'commercial',
      thumbnail: {
        src: `${GITHUB_CDN_BASE}/projects/projectserene/1.webp`,
        alt: 'Project Serenique spa interior'
      },
      images: Array.from({ length: 4 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projectserene/${i + 1}.webp`,
        alt: `Project serene interior ${i + 1}`
      }))
    },
    {
      id: 'ezra',
      title: 'Project Ezra',
      location: 'Victoria Island, Lagos',
      description: 'Defined by clean lines, open flow, and thoughtful details, this modern space blends functionality with understated elegance.',
      category: 'residential',
      thumbnail: {
        src: `${GITHUB_CDN_BASE}/projects/projectezra/1.webp`,
        alt: 'Project Ezra modern interior'
      },
      images: Array.from({ length: 5 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projectezra/${i + 1}.webp`,
        alt: `Project Ezra interior ${i + 1}`
      }))
    },
    {
      id: 'Keffi',
      title: 'Project Keffi',
      location: 'Lekki, Lagos',
      description: 'This home embodies modern luxury with personality — blending bold, saturated hues with serene spaces designed for rest and renewal.',
      category: 'residential',
      featured: true,
      thumbnail: {
        src: `${GITHUB_CDN_BASE}/projects/projectluminalekkilagos/3.webp`,
        alt: 'Project Keffi luxury home'
      },
      images: Array.from({ length: 12 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projectluminalekkilagos/${i + 1}.webp`,
        alt: `Project Keffi interior ${i + 1}`
      }))
    },
    {
      id: 'casa-vitalis',
      title: 'Project Casa Vitalis',
      location: 'Ikoyi, Lagos',
      description: 'This home strikes a rare balance between bold expression and refined luxury. Rich statement hues set a dramatic tone.',
      category: 'residential',
      thumbnail: {
        src: `${GITHUB_CDN_BASE}/projects/projectcasavitalis/1.webp`,
        alt: 'Project Casa Vitalis luxury residence'
      },
      images: Array.from({ length: 25 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projectcasavitalis/${i + 1}.webp`,
        alt: `Project Casa Vitalis interior ${i + 1}`
      }))
    },
    {
      id: 'casa-serena',
      title: 'Project Casa Serena',
      location: 'Lekki, Lagos',
      description: 'A stylish home with a modern edge, Casa Serena combines clean lines, contemporary finishes, and subtle warmth.',
      category: 'residential',
      thumbnail: {
        src: `${GITHUB_CDN_BASE}/projects/projectcasaserenalekkilagos/1.webp`,
        alt: 'Project Casa Serena modern home'
      },
      images: Array.from({ length: 7 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projectcasaserenalekkilagos/${i + 1}.webp`,
        alt: `Project Casa Serena interior ${i + 1}`
      }))
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
        alt: 'Project Horizon kitchen design'
      },
      images: Array.from({ length: 4 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projecthorizonlekkilagos/${i + 1}.webp`,
        alt: `Project Horizon interior ${i + 1}`
      }))
    },
    {
      id: 'modern-nest',
      title: 'Project Modern Nest',
      location: 'Omole, Lagos',
      description: 'This project brought together a soft nursery, cozy living room, warm dining space, and modern bedroom.',
      category: 'residential',
      thumbnail: {
        src: `${GITHUB_CDN_BASE}/projects/projectmodernnestomolelagos/1.webp`,
        alt: 'Project Modern Nest family home'
      },
      images: Array.from({ length: 12 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projectmodernnestomolelagos/${i + 1}.webp`,
        alt: `Project Modern Nest interior ${i + 1}`
      }))
    },
    {
      id: 'gerald',
      title: 'Project Gerald',
      location: 'Lekki, Lagos',
      description: 'A serene retreat designed with balance in mind — this bathroom combines clean lines and elegant finishes.',
      category: 'residential',
      thumbnail: {
        src: `${GITHUB_CDN_BASE}/projects/projectgeraldlekkilagos/1.webp`,
        alt: 'Project Gerald bathroom design'
      },
      images: Array.from({ length: 3 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projectgeraldlekkilagos/${i + 1}.webp`,
        alt: `Project Gerald interior ${i + 1}`
      }))
    },
    {
      id: 'lustre',
      title: 'Project Lustre',
      location: 'Victoria Island, Lagos',
      description: 'This kitchen was designed to be both beautiful and practical — a cozy space where storage and style work hand in hand.',
      category: 'residential',
      thumbnail: {
        src: `${GITHUB_CDN_BASE}/projects/projectlustre/7.webp`,
        alt: 'Project Lustre kitchen'
      },
      images: Array.from({ length: 10 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projectlustre/${i + 1}.webp`,
        alt: `Project Lustre interior ${i + 1}`
      }))
    },
    {
      id: 'blush',
      title: 'Project Blush',
      location: 'GRA, Lagos',
      description: 'This bathroom balances softness with personality, blending soothing finishes with a touch of bold colour.',
      category: 'residential',
      thumbnail: {
        src: `${GITHUB_CDN_BASE}/projects/projectblushgralagos_/2.webp`,
        alt: 'Project Blush bathroom'
      },
      images: Array.from({ length: 5 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projectblushgralagos_/${i + 1}.webp`,
        alt: `Project Blush interior ${i + 1}`
      }))
    },
    {
      id: 'haven',
      title: 'Project Haven',
      location: 'Lekki, Lagos',
      description: 'This shortlet was designed for comfort and ease — a refreshing retreat with warm finishes and thoughtful layouts.',
      category: 'commercial',
      thumbnail: {
        src: `${GITHUB_CDN_BASE}/projects/projecthavenlekkilagos/1.webp`,
        alt: 'Project Haven shortlet'
      },
      images: Array.from({ length: 4 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projecthavenlekkilagos/${i + 1}.webp`,
        alt: `Project Haven interior ${i + 1}`
      }))
    },
    {
      id: 'urban',
      title: 'Project Urban',
      location: 'Lekki, Lagos',
      description: 'This project redefined the home with an urban edge and upscale sophistication.',
      category: 'residential',
      thumbnail: {
        src: `${GITHUB_CDN_BASE}/projects/projecturbanlekkilagos/9.webp`,
        alt: 'Project Urban modern home'
      },
      images: Array.from({ length: 9 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projecturbanlekkilagos/${i + 1}.webp`,
        alt: `Project Urban interior ${i + 1}`
      }))
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
        alt: 'Project Roche luxury renovation'
      },
      images: Array.from({ length: 20 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projectroche/${i + 1}.webp`,
        alt: `Project Roche interior ${i + 1}`
      }))
    },
    {
      id: 'holiday',
      title: 'Project Holiday',
      location: 'Ikoyi, Lagos',
      description: 'This high-end renovation reshaped the home into a modern sanctuary with thoughtful layouts.',
      category: 'residential',
      thumbnail: {
        src: `${GITHUB_CDN_BASE}/projects/projectholiday/1.webp`,
        alt: 'Project Holiday renovation'
      },
      images: Array.from({ length: 25 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projectholiday/${i + 1}.webp`,
        alt: `Project Holiday interior ${i + 1}`
      }))
    },
    {
      id: 'tranquil',
      title: 'Project Tranquil',
      location: 'Magodo, Lagos',
      description: 'This project transformed everyday bathrooms into serene, spa-inspired retreats filled with colour and character.',
      category: 'residential',
      thumbnail: {
        src: `${GITHUB_CDN_BASE}/projects/projecttranquilmagodolagos_/1.webp`,
        alt: 'Project Tranquil spa bathrooms'
      },
      images: Array.from({ length: 13 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projecttranquilmagodolagos_/${i + 1}.webp`,
        alt: `Project Tranquil interior ${i + 1}`
      }))
    },
    {
      id: 'london',
      title: 'Project London',
      location: 'Lekki, Lagos',
      description: 'A complete transformation of this residence into a refined, high-end home with bespoke details.',
      category: 'residential',
      thumbnail: {
        src: `${GITHUB_CDN_BASE}/projects/projectlondon/1.webp`,
        alt: 'Project London luxury residence'
      },
      images: Array.from({ length: 24 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projectlondon/${i + 1}.webp`,
        alt: `Project London interior ${i + 1}`
      }))
    },
    {
      id: 'officeland',
      title: 'Project Officeland',
      location: 'Victoria Island, Lagos',
      description: 'We designed this workplace to balance functionality with impact — creating a space that supports both staff well-being and productivity.',
      category: 'corporate',
      featured: true,
      thumbnail: {
        src: `${GITHUB_CDN_BASE}/projects/projectofficeland/1.webp`,
        alt: 'Project Officeland corporate workspace'
      },
      images: Array.from({ length: 35 }, (_, i) => ({
        src: `${GITHUB_CDN_BASE}/projects/projectofficeland/${i + 1}.webp`,
        alt: `Project Officeland interior ${i + 1}`
      }))
    }
  ];

  // Filter projects
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  // Lightbox handlers
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
      setLightboxIndex((prev) => 
        (prev + 1) % selectedProject.images.length
      );
    }
  }, [selectedProject]);

  const handlePreviousImage = useCallback(() => {
    if (selectedProject) {
      setLightboxIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  }, [selectedProject]);

  // Simulate loading
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div className="min-h-screen bg-pale-oat relative">
      {/* Background Pattern */}
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
          backgroundSize: '60px 60px'
        }}
      />

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative pt-32 pb-20 bg-luxury-charcoal text-white overflow-hidden"
      >
        {/* Subtle gold accent pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" 
            style={{
              backgroundImage: `linear-gradient(45deg, transparent 45%, #D4AF37 45%, #D4AF37 55%, transparent 55%)`,
              backgroundSize: '20px 20px'
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
              Explore our portfolio of luxury interiors, each meticulously crafted to mirror 
              our clients&apos; distinct personalities and refined lifestyles
            </motion.p>

            {/* Stats */}
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

      {/* Filter Section */}
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
                { value: 'all', label: 'All Projects', icon: Grid3X3 },
                { value: 'residential', label: 'Residential', icon: Home },
                { value: 'corporate', label: 'Corporate', icon: Building2 },
                { value: 'commercial', label: 'Commercial', icon: Building2 }
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value as typeof activeFilter)}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300",
                    activeFilter === filter.value
                      ? "bg-luxury-charcoal text-white shadow-lg"
                      : "bg-mist-grey/20 text-luxury-slate hover:bg-soft-sage/20 hover:text-luxury-charcoal"
                  )}
                >
                  <filter.icon className="w-4 h-4" />
                  <span>{filter.label}</span>
                </button>
              ))}
            </motion.div>

            {/* <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-luxury-slate"
            >
              <span className="font-medium">{filteredProjects.length}</span> Projects
            </motion.div> */}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
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

          {/* Empty State */}
          {!isLoading && filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <p className="text-xl text-luxury-slate mb-4">
                No projects found in this category
              </p>
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

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-soft-sage/10 relative z-10"
      >
        <div className="container-luxury text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-luxury-charcoal">
            Ready to Create Your
            <span className="text-luxury-gold block mt-2">Dream Space?</span>
          </h2>
          <p className="text-xl text-luxury-slate max-w-3xl mx-auto mb-8 leading-relaxed">
            Let&apos;s design a space that&apos;s uniquely yours. 
            Contact us today to begin your luxury interior transformation.
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

      {/* Lightbox */}
      {selectedProject && (
        <Lightbox
          images={selectedProject.images}
          currentIndex={lightboxIndex}
          isOpen={!!selectedProject}
          onClose={handleCloseLightbox}
          onNext={handleNextImage}
          onPrevious={handlePreviousImage}
          projectTitle={selectedProject.title}
        />
      )}
    </div>
  );
}