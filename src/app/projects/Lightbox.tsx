//src/app/projects/Lightbox.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface LightboxProps {
  images: ProjectImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onIndexChange: (index: number) => void;
  projectTitle: string;
}

const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  onIndexChange,
  projectTitle,
}) => {
  const [isSlideshow, setIsSlideshow] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    if (!isSlideshow || !isOpen) return;
    const interval = setInterval(() => {
      onNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [isSlideshow, isOpen, onNext]);

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
          setIsSlideshow((prev) => !prev);
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
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-60 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>
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
                  loading="eager"
                  placeholder="blur"
                  blurDataURL={`${images[currentIndex]?.src}?w=10&h=10`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
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
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsSlideshow(!isSlideshow);
              }}
              className="p-2 text-white hover:text-luxury-gold transition-colors"
              aria-label={isSlideshow ? 'Pause slideshow' : 'Play slideshow'}
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
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-4xl overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  onIndexChange(index);
                }}
                className={cn(
                  'flex-shrink-0 w-16 h-16 rounded overflow-hidden transition-all duration-300',
                  index === currentIndex
                    ? 'ring-2 ring-luxury-gold opacity-100'
                    : 'opacity-50 hover:opacity-75'
                )}
              >
                <Image
                  src={image.src}
                  alt={`Thumbnail ${index + 1}`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={`${image.src}?w=5&h=5`}
                />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;