'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { Expand } from 'lucide-react';
import { generateImageBlurDataUrl, imageQuality } from '@/lib/utils';
import Lightbox from '../Lightbox';

interface ProjectGalleryProps {
  images: { src: string; alt: string }[];
  projectTitle: string;
}

export default function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openAt = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => openAt(index)}
            className="group relative aspect-[4/5] overflow-hidden bg-mist-grey"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
              placeholder="blur"
              blurDataURL={generateImageBlurDataUrl(10, 12)}
              quality={imageQuality.standard}
              loading={index < 6 ? undefined : 'lazy'}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors duration-300">
              <Expand className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        images={images}
        currentIndex={currentIndex}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onIndexChange={setCurrentIndex}
        projectTitle={projectTitle}
      />
    </>
  );
}
