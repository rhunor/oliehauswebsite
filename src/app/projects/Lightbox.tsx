//src/app/projects/Lightbox.tsx
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { cn, generateImageBlurDataUrl, responsiveSizes, imageQuality } from '@/lib/utils';
import { ImageLoadingSpinner } from '@/components/ImageLoadingSpinner';

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
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  // Memoize current image for performance
  const currentImage = useMemo(() => {
    const img = images[currentIndex];
    return img || null;
  }, [images, currentIndex]);

  // Preload adjacent images for smooth navigation
  const imagesToPreload = useMemo(() => {
    const preloadIndices: number[] = [];
    const totalImages = images.length;
    
    // Preload current, next, and previous images
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + totalImages) % totalImages;
      preloadIndices.push(index);
    }
    
    return preloadIndices
      .map(index => {
        const img = images[index];
        return img ? {
          index,
          src: img.src,
          alt: img.alt
        } : null;
      })
      .filter((img): img is { index: number; src: string; alt: string } => img !== null);
  }, [currentIndex, images]);

  // Handle image load completion
  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages(prev => new Set(prev).add(index));
    setImageErrors(prev => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
    if (index === currentIndex) {
      setImageLoading(false);
    }
  }, [currentIndex]);

  // Handle image load error
  const handleImageError = useCallback((index: number) => {
    setImageErrors(prev => new Set(prev).add(index));
    if (index === currentIndex) {
      setImageLoading(false);
    }
  }, [currentIndex]);

  // Reset loading state when current index changes
  useEffect(() => {
    if (!loadedImages.has(currentIndex) || imageErrors.has(currentIndex)) {
      setImageLoading(true);
    } else {
      setImageLoading(false);
    }
  }, [currentIndex, loadedImages, imageErrors]);

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
          setIsSlideshow((prev) => !prev);
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrevious]);

  // Clean up when closing
  useEffect(() => {
    if (!isOpen) {
      setIsSlideshow(false);
      setImageLoading(true);
      setLoadedImages(new Set());
      setImageErrors(new Set());
    }
  }, [isOpen]);

  if (!isOpen || !currentImage) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg"
        onClick={onClose}
      >
        {/* Preload images for smooth navigation */}
        <div className="hidden">
          {imagesToPreload.map(({ index, src, alt }) => (
            <Image
              key={`preload-${index}`}
              src={src}
              alt={alt}
              width={1920}
              height={1080}
              priority={Math.abs(index - currentIndex) <= 1}
              onLoad={() => handleImageLoad(index)}
              onError={() => handleImageError(index)}
              style={{ display: 'none' }}
            />
          ))}
        </div>

        <div className="relative h-full w-full flex items-center justify-center p-4">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-60 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Main image container */}
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
                  src={currentImage.src}
                  alt={currentImage.alt}
                  width={1920}
                  height={1080}
                  className={cn(
                    "max-w-full max-h-full object-contain rounded-lg transition-opacity duration-300",
                    imageLoading || imageErrors.has(currentIndex) ? "opacity-0" : "opacity-100"
                  )}
                  priority={true}
                  loading="eager"
                  placeholder="blur"
                  blurDataURL={generateImageBlurDataUrl(16, 12)}
                  quality={imageQuality.hero}
                  sizes={responsiveSizes.fullWidth}
                  onLoad={() => handleImageLoad(currentIndex)}
                  onError={() => handleImageError(currentIndex)}
                />
                
                {/* Loading indicator */}
                {(imageLoading || imageErrors.has(currentIndex)) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageLoadingSpinner className="bg-black/50" />
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
            className="absolute left-4 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-50"
            aria-label="Previous image"
            disabled={images.length <= 1}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-50"
            aria-label="Next image"
            disabled={images.length <= 1}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Control panel */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsSlideshow(!isSlideshow);
              }}
              className="p-2 text-white hover:text-luxury-gold transition-colors disabled:opacity-50"
              aria-label={isSlideshow ? 'Pause slideshow' : 'Play slideshow'}
              disabled={images.length <= 1}
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

          {/* Thumbnail navigation */}
          {images.length > 1 && (
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-4xl overflow-x-auto pb-2 px-4">
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
                  aria-label={`View image ${index + 1}`}
                >
                  <Image
                    src={image.src}
                    alt={`Thumbnail ${index + 1}`}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={generateImageBlurDataUrl(4, 4)}
                    quality={imageQuality.thumbnail}
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;