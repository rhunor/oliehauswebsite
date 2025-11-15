'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, SkipBack, SkipForward } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHydrationSafe } from '@/hooks/useHydrationSafe';

// Extend window type for gtag function
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'set',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

interface HeroImage {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
}

interface VideoContent {
  thumbnailSrc: string;
  videoSrc: string;
  title: string;
  description: string;
}

interface HeroSectionProps {
  images: HeroImage[];
  videos: VideoContent[];
  tagline: {
    main: string;
    sub: string;
  };
  onHireUsClick: () => void;
  className?: string;
}

export default function HeroSection({
  images,
  videos,
  tagline,
  onHireUsClick,
  className
}: HeroSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  
  // Fix hydration issues properly
  const { isHydrated } = useHydrationSafe();

  // Reset loaded state when switching videos
  useEffect(() => {
    if (isVideoPlaying) {
      setIsVideoLoaded(false);
    }
  }, [currentVideoIndex, isVideoPlaying]);

  // Auto-advance slideshow - only on client
  useEffect(() => {
    if (!isHydrated || isVideoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length, isVideoPlaying, isHydrated]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isHydrated) return;
    
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (isVideoPlaying && e.key === 'Escape') {
        setIsVideoPlaying(false);
        setIsVideoLoaded(false);
        return;
      }
      
      if (!isVideoPlaying) {
        if (e.key === 'ArrowLeft') {
          setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
        } else if (e.key === 'ArrowRight') {
          setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length, isVideoPlaying, isHydrated]);

  const getVimeoEmbedUrl = useCallback((vimeoUrl: string): string => {
    const videoId = vimeoUrl.split('/').pop() || '';
    return `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1&controls=1&playsinline=1&title=0&byline=0&portrait=0&autopause=0&responsive=1&dnt=1`;
  }, []);

  const handleVideoPlay = useCallback((): void => {
    setIsVideoPlaying(true);
    setCurrentVideoIndex(0);
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'video_play', {
        event_category: 'engagement',
        event_label: 'hero_video_inline',
      });
    }
  }, []);

  const handleVideoClose = useCallback((): void => {
    setIsVideoPlaying(false);
    setIsVideoLoaded(false);
  }, []);

  const handleNextVideo = useCallback((): void => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  }, [videos.length]);

  const handlePrevVideo = useCallback((): void => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
  }, [videos.length]);

  const handleHireUsClick = useCallback((): void => {
    onHireUsClick();
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'engagement',
        event_label: 'hero_hire_us',
      });
    }
  }, [onHireUsClick]);

  // Get current image safely
  const currentImage = images[currentImageIndex] || images[0];
  if (!currentImage) {
    return <div className="min-h-screen bg-luxury-charcoal animate-pulse">Loading...</div>;
  }

  // Guard for empty videos
  if (!videos.length) {
    return <div className="min-h-screen bg-luxury-charcoal animate-pulse">Loading videos...</div>;
  }

  const currentVideo: VideoContent | undefined = videos[currentVideoIndex];
  if (!currentVideo) {
    return <div className="min-h-screen bg-luxury-charcoal animate-pulse">Loading videos...</div>;
  }

  return (
    <section className={cn("relative min-h-screen overflow-hidden bg-pale-oat", className)}>
      <div className="relative h-screen">
        {/* Image slideshow - always render first image, then animate */}
        {!isVideoPlaying ? (
          <div className="absolute inset-0">
            {/* Base image - prevents hydration mismatch */}
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              priority
              className="object-cover"
              sizes="100vw"
              style={{ zIndex: 1 }}
            />
            
            {/* Animated overlay - only when hydrated */}
            {isHydrated && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`overlay-${currentImageIndex}`}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="absolute inset-0"
                  style={{ zIndex: 2 }}
                >
                  <Image
                    src={currentImage.src}
                    alt={currentImage.alt}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div className="gradient-overlay" />
                </motion.div>
              </AnimatePresence>
            )}
            <div className="gradient-overlay" style={{ zIndex: 3 }} />
          </div>
        ) : (
          // Enhanced Video player with better responsive design
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 bg-black flex items-center justify-center"
          >
            {/* Enhanced loading state */}
            {!isVideoLoaded && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/90"
              >
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-luxury-gold/30 border-t-luxury-gold rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-8 h-8 text-luxury-gold" />
                  </div>
                </div>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-white mt-6 text-lg font-medium"
                >
                  Loading your experience...
                </motion.p>
              </motion.div>
            )}
            
            {/* Enhanced close button - top-left */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              onClick={handleVideoClose}
              className="absolute top-4 left-4 sm:top-6 sm:left-6 w-12 h-12 sm:w-14 sm:h-14 bg-black/90 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-300 z-50 border-2 border-white/20 hover:border-red-500 shadow-2xl hover:scale-110 group"
              aria-label="Close video"
            >
              <X className="w-6 h-6 sm:w-7 sm:h-7 group-hover:rotate-90 transition-transform duration-300" />
            </motion.button>

            {/* Video navigation buttons - bottom */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              onClick={handlePrevVideo}
              className="absolute bottom-20 left-6 sm:bottom-24 sm:left-8 w-12 h-12 sm:w-14 sm:h-14 bg-black/70 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-luxury-gold transition-all duration-300 z-40 border border-white/20 hover:border-luxury-gold shadow-xl hover:scale-110 group"
              aria-label="Previous video"
            >
              <SkipBack className="w-6 h-6 sm:w-7 sm:h-7 group-hover:rotate-180 transition-transform duration-300" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              onClick={handleNextVideo}
              className="absolute bottom-20 right-6 sm:bottom-24 sm:right-8 w-12 h-12 sm:w-14 sm:h-14 bg-black/70 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-luxury-gold transition-all duration-300 z-40 border border-white/20 hover:border-luxury-gold shadow-xl hover:scale-110 group"
              aria-label="Next video"
            >
              <SkipForward className="w-6 h-6 sm:w-7 sm:h-7 group-hover:rotate-180 transition-transform duration-300" />
            </motion.button>
            
            {/* Video container with responsive aspect ratio */}
            <div className="relative w-full h-full max-w-7xl mx-auto">
              <iframe
                src={getVimeoEmbedUrl(currentVideo.videoSrc)}
                className="absolute inset-0 w-full h-full rounded-lg shadow-2xl"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  border: 'none',
                  borderRadius: '8px',
                  opacity: isVideoLoaded ? 1 : 0, 
                  transition: 'opacity 0.5s ease-in-out'
                }}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                allowFullScreen
                onLoad={() => {
                  setIsVideoLoaded(true);
                  // Add a small delay for smooth transition
                  setTimeout(() => {
                    const iframe = document.querySelector(`iframe[title="${currentVideo?.title ?? 'video'}"]`) as HTMLIFrameElement;
                    if (iframe) {
                      iframe.style.opacity = '1';
                    }
                  }, 200);
                }}
                title={currentVideo.title}
              />
            </div>
            
            {/* Video info overlay - top-right */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-40 max-w-xs"
            >
              <div className="bg-black/80 backdrop-blur-md rounded-lg p-3 sm:p-4 border border-white/10">
                <h3 className="text-white text-base sm:text-lg font-semibold mb-1">{currentVideo.title}</h3>
                <p className="text-white/80 text-xs sm:text-sm">{currentVideo.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Hero content - render immediately, enhance when hydrated */}
        {!isVideoPlaying && (
          <div className="absolute inset-0 flex items-center justify-center text-center text-white z-20">
            <div className="max-w-5xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mb-8"
              >
                <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  <span className="block">{tagline.main}</span>
                  <span className="block text-luxury-gold">{tagline.sub}</span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleHireUsClick}
                  className="btn-luxury-outline text-white border-white hover:bg-white hover:text-luxury-charcoal transition-all duration-300 px-8 py-4 text-lg font-semibold shadow-lg"
                >
                  Hire Us Now
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleVideoPlay}
                  className="flex items-center space-x-3 px-8 py-4 bg-black/30 backdrop-blur-md text-white rounded-full hover:bg-black/50 transition-all duration-300 group border border-white/20 shadow-lg"
                >
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium text-lg">Watch Our Process</span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}