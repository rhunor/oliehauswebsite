//src/components/ui/HeroSection.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  video: VideoContent;
  tagline: {
    main: string;
    sub: string;
  };
  onHireUsClick: () => void;
  className?: string;
  logoSrc?: string;
  logoAlt?: string;
}

export default function HeroSection({
  images,
  video,
  tagline,
  onHireUsClick,
  className
}: HeroSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);

  // Convert Vimeo URL to embed format
  const getVimeoEmbedUrl = (vimeoUrl: string): string => {
    // Extract video ID from URL like https://vimeo.com/1116723569
    const videoId = vimeoUrl.split('/').pop() || '';
    
    // Return Vimeo player URL with necessary parameters for inline fullscreen playback
    return `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1&controls=1&playsinline=1&title=0&byline=0&portrait=0&autopause=0`;
  };

  // Auto-advance slideshow (only when video is not playing)
  useEffect(() => {
    if (isVideoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length, isVideoPlaying]);

  // Handle keyboard navigation
  useEffect(() => {
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
  }, [images.length, isVideoPlaying]);

  // Handle video play
  const handleVideoPlay = (): void => {
    setIsVideoPlaying(true);
    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'video_play', {
        event_category: 'engagement',
        event_label: 'hero_video_inline',
      });
    }
  };

  const handleVideoClose = (): void => {
    setIsVideoPlaying(false);
    setIsVideoLoaded(false);
  };

  // Navigation functions
  const goToPrevious = (): void => {
    if (!isVideoPlaying) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const goToNext = (): void => {
    if (!isVideoPlaying) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const goToSlide = (index: number): void => {
    if (!isVideoPlaying) {
      setCurrentImageIndex(index);
    }
  };

  // Handle hire us click with analytics
  const handleHireUsClick = (): void => {
    onHireUsClick();
    
    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'engagement',
        event_label: 'hero_hire_us',
      });
    }
  };

  // Get current image safely
  const currentImage = images[currentImageIndex];
  if (!currentImage) {
    return <div className="min-h-screen bg-luxury-charcoal">Loading...</div>;
  }

  return (
    
<section className={cn("relative min-h-screen overflow-hidden bg-pale-oat", className)}>
      {/* Image Slideshow or Video */}
      <div className="relative h-screen">
        {!isVideoPlaying ? (
          // Image Slideshow
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                priority
                unoptimized={true} // Bypass Next.js optimization to avoid timeout
                className="object-cover"
                sizes="100vw"
              />
              <div className="gradient-overlay" />
            </motion.div>
          </AnimatePresence>
        ) : (
          // Vimeo Video Player - Full screen with proper aspect ratio
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-black"
          >
            {!isVideoLoaded && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-16 h-16 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin"></div>
                <p className="text-white ml-4">Loading video...</p>
              </div>
            )}
            
            {/* Close Video Button - Higher z-index and better positioning */}
            <button
              onClick={handleVideoClose}
              className="absolute top-4 right-4 w-14 h-14 bg-black/80 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-300 z-50 border-2 border-white/30 hover:border-red-500 shadow-lg"
              aria-label="Close video"
              style={{ zIndex: 999 }}
            >
              <X className="w-7 h-7" />
            </button>
            
            {/* Vimeo iframe with proper full-screen styling */}
            <iframe
              src={getVimeoEmbedUrl(video.videoSrc)}
              className="absolute inset-0 w-full h-full"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                pointerEvents: 'auto'
              }}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              onLoad={() => setIsVideoLoaded(true)}
              title={video.title}
            />
          </motion.div>
        )}

        {/* Navigation Controls - Only show when not playing video */}
        {!isVideoPlaying && (
          <>
            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-black/20 backdrop-blur-sm text-white rounded-full opacity-0 hover:opacity-100 transition-all duration-300 hover:bg-black/40 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-black/20 backdrop-blur-sm text-white rounded-full opacity-0 hover:opacity-100 transition-all duration-300 hover:bg-black/40 z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    index === currentImageIndex
                      ? "bg-luxury-gold scale-125"
                      : "bg-white/50 hover:bg-white/80"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content Overlay - Only show when not playing video */}
      {!isVideoPlaying && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="container-luxury text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              {/* Main Tagline */}
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="block text-luxury-gold">{tagline.main}</span>
                {tagline.sub && <span className="block text-white mt-2">{tagline.sub}</span>}
              </h1>

              {/* Subtitle */}
              {/* <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="text-xl md:text-2xl mb-12 text-white/90 font-light leading-relaxed max-w-3xl mx-auto"
              >
                Creating bespoke, timeless, and functional spaces for discerning clients in Nigeria and internationally
              </motion.p> */}

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.1 }}
                className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
              >
                <button
                  onClick={handleHireUsClick}
                  className="btn-luxury text-xl px-12 py-5 bg-luxury-gold hover:bg-luxury-gold/90 text-white border-2 border-luxury-gold font-bold shadow-luxury-strong hover:shadow-luxury-glow transform hover:scale-105 transition-all duration-300"
                >
                  Hire Us Now
                </button>
                
                <button
                  onClick={handleVideoPlay}
                  className="btn-luxury-outline text-lg px-8 py-4 flex items-center space-x-3 group border-2 border-white/50 hover:border-white transition-all duration-300"
                >
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>Watch Our Work</span>
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}
    </section>
  );
}