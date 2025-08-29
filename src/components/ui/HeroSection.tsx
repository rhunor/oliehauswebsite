'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

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
}

export default function HeroSection({
  images,
  video,
  tagline,
  onHireUsClick,
  className
}: HeroSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === 'ArrowRight') {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === 'Escape' && isVideoModalOpen) {
        setIsVideoModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length, isVideoModalOpen]);

  // Handle video modal
  const openVideoModal = () => {
    setIsVideoModalOpen(true);
    // Analytics tracking
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'video_play', {
        event_category: 'engagement',
        event_label: 'hero_video',
      });
    }
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setIsVideoLoaded(false);
  };

  // Navigation functions
  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Get current image safely
  const currentImage = images[currentImageIndex];
  if (!currentImage) {
    return <div className="min-h-screen bg-luxury-charcoal">Loading...</div>;
  }

  return (
    <section className={cn("relative min-h-screen overflow-hidden", className)}>
      {/* Image Slideshow */}
      <div className="relative h-screen">
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
              className="object-cover"
              sizes="100vw"
            />
            <div className="gradient-overlay" />
          </motion.div>
        </AnimatePresence>

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
      </div>

      {/* Content Overlay */}
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
              <span className="block">{tagline.main}</span>
              <span className="block text-luxury-gold mt-2">{tagline.sub}</span>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-xl md:text-2xl mb-12 text-white/90 font-light leading-relaxed max-w-3xl mx-auto"
            >
              Creating bespoke, timeless, and functional spaces for discerning clients in Nigeria and internationally
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <button
                onClick={onHireUsClick}
                className="btn-luxury text-lg px-12 py-4 group"
              >
                <span className="relative z-10">Hire Us Now</span>
              </button>

              <button
                onClick={openVideoModal}
                className="flex items-center space-x-3 text-white hover:text-luxury-gold transition-colors duration-300 group"
              >
                <div className="relative">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-luxury-gold/20 transition-colors duration-300">
                    <Play className="w-6 h-6 ml-1" fill="currentColor" />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-white/10 animate-ping"></div>
                </div>
                <div className="text-left">
                  <div className="font-medium">Watch Our Work</div>
                  <div className="text-sm text-white/80">See projects come to life</div>
                </div>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Current Slide Info */}
      <motion.div
        key={currentImageIndex}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-8 left-8 text-white z-10 max-w-md"
      >
        <h3 className="font-serif text-2xl font-bold mb-2">
          {currentImage.title}
        </h3>
        <p className="text-white/80 leading-relaxed">
          {currentImage.subtitle}
        </p>
      </motion.div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeVideoModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-luxury-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeVideoModal}
                className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-colors duration-300 z-10"
                aria-label="Close video"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Video Content */}
              {!isVideoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="luxury-spinner"></div>
                </div>
              )}

              <video
                src={video.videoSrc}
                controls
                autoPlay
                className="w-full h-full object-cover"
                poster={video.thumbnailSrc}
                onLoadedData={() => setIsVideoLoaded(true)}
              >
                Your browser does not support the video tag.
              </video>

              {/* Video Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h4 className="text-white font-serif text-2xl font-bold mb-2">
                  {video.title}
                </h4>
                <p className="text-white/80">
                  {video.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}