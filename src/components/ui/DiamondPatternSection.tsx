'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface DiamondPatternSectionProps {
  children: React.ReactNode;
  className?: string;
  patternOpacity?: 'subtle' | 'medium' | 'bold';
  backgroundColor?: 'sage' | 'oat' | 'mist' | 'white' | 'charcoal';
}

const DiamondPatternSection: React.FC<DiamondPatternSectionProps> = ({
  children,
  className = '',
  patternOpacity = 'subtle',
  backgroundColor = 'white',
}) => {
  // Pattern opacity classes
  const getPatternOpacity = (): string => {
    switch (patternOpacity) {
      case 'medium':
        return 'opacity-5';
      case 'bold':
        return 'opacity-10';
      default:
        return 'opacity-[0.02]'; // Very subtle like Ritz Carlton
    }
  };

  // Background color classes
  const getBackgroundColor = (): string => {
    switch (backgroundColor) {
      case 'sage':
        return 'bg-soft-sage';
      case 'oat':
        return 'bg-pale-oat';
      case 'mist':
        return 'bg-mist-grey';
      case 'charcoal':
        return 'bg-luxury-charcoal';
      default:
        return 'bg-white';
    }
  };

  return (
    <section className={cn('relative overflow-hidden', getBackgroundColor(), className)}>
      {/* Six Diamond Pattern Background - Ritz Carlton Inspired */}
      <div 
        className={cn('absolute inset-0 pointer-events-none', getPatternOpacity())}
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, currentColor 1.5px, transparent 1.5px),
            radial-gradient(circle at 80% 20%, currentColor 1.5px, transparent 1.5px),
            radial-gradient(circle at 20% 80%, currentColor 1.5px, transparent 1.5px),
            radial-gradient(circle at 80% 80%, currentColor 1.5px, transparent 1.5px),
            radial-gradient(circle at 50% 50%, currentColor 1px, transparent 1px),
            radial-gradient(circle at 50% 0%, currentColor 1px, transparent 1px),
            radial-gradient(circle at 50% 100%, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px, 80px 80px, 80px 80px, 80px 80px, 40px 40px, 40px 40px, 40px 40px',
          backgroundPosition: '0 0, 0 0, 0 0, 0 0, 0 0, 0 20px, 0 -20px',
          color: '#D4AF37', // luxury gold color for the pattern
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
};

export default DiamondPatternSection;