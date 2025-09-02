'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn, getOptimizedImageUrl } from '@/lib/utils';
import { OptimizedImageProps } from '@/types';
import { StaticImageData } from 'next/image';

interface ExtendedOptimizedImageProps extends Omit<OptimizedImageProps, 'src'> {
  src: string | StaticImageData;
  showLoadingState?: boolean;
  hoverEffect?: boolean;
  rounded?: boolean;
  shadow?: boolean;
  unoptimized?: boolean; // Added for debugging optimization issues
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  quality = 85,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  className = '',
  blurDataURL,
  placeholder = 'blur',
  showLoadingState = true,
  hoverEffect = false,
  rounded = false,
  shadow = false,
  unoptimized = false, // Default to false to maintain optimization
}: ExtendedOptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Generate blur placeholder if not provided
  const defaultBlurDataUrl = blurDataURL || 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';

  // Optimized image URL (for Cloudinary or other CDNs)
  const optimizedSrc = typeof src === 'string' && (src.includes('cloudinary') || src.includes('res.cloudinary.com')) 
    ? getOptimizedImageUrl(src, width, height, quality)
    : src;

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    console.error(`Failed to load image: ${typeof src === 'string' ? src : src.src}`);
  };

  const imageClasses = cn(
    'transition-all duration-700 ease-in-out',
    showLoadingState && isLoading && 'scale-105 blur-lg',
    showLoadingState && !isLoading && 'scale-100 blur-0',
    hoverEffect && 'hover:scale-110 hover:brightness-110',
    rounded && 'rounded-lg',
    shadow && 'shadow-luxury-soft',
    className
  );

  const containerClasses = cn(
    'relative overflow-hidden',
    rounded && 'rounded-lg',
    shadow && 'shadow-luxury-soft'
  );

  if (hasError) {
    return (
      <div className={cn(containerClasses, 'bg-luxury-cream flex items-center justify-center')} style={{ width, height }}>
        <div className="text-luxury-slate text-center">
          <div className="w-8 h-8 mx-auto mb-2 opacity-50">
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-xs">Image not available</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={containerClasses}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Image
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        quality={quality}
        sizes={sizes}
        placeholder={placeholder}
        blurDataURL={defaultBlurDataUrl}
        className={imageClasses}
        onLoad={handleLoad}
        onError={handleError}
        unoptimized={unoptimized} // Pass the prop to bypass optimization for debugging
        style={{
          objectFit: 'cover',
        }}
      />
      
      {/* Loading overlay */}
      {showLoadingState && isLoading && (
        <div className="absolute inset-0 bg-luxury-cream/50 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-6 h-6 border-2 border-luxury-gold border-t-transparent rounded-full"
          />
        </div>
      )}
    </motion.div>
  );
}

// Specialized components for specific use cases
export function HeroImage({ 
  className, 
  unoptimized = false, // Added default
  ...props 
}: ExtendedOptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      priority={true}
      quality={90}
      sizes="100vw"
      className={cn('hero-image', className)}
      unoptimized={unoptimized}
    />
  );
}

export function PortfolioImage({ 
  className, 
  unoptimized = true, // Set to true temporarily for debugging load issues
  ...props 
}: ExtendedOptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      quality={85}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      hoverEffect={true}
      rounded={true}
      shadow={true}
      className={cn('portfolio-image', className)}
      unoptimized={unoptimized}
    />
  );
}

export function ThumbnailImage({ 
  className, 
  unoptimized = false, // Added default
  ...props 
}: ExtendedOptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      quality={75}
      sizes="(max-width: 768px) 50vw, 300px"
      rounded={true}
      className={cn('thumbnail-image', className)}
      unoptimized={unoptimized}
    />
  );
}