'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedUnderlineProps {
  children: React.ReactNode;
  className?: string;
  underlineColor?: string;
  underlineHeight?: number;
  animationDuration?: number;
  delay?: number;
}

export default function AnimatedUnderline({
  children,
  className = '',
  underlineColor = '#D4AF37', // luxury-gold default
  underlineHeight = 2,
  animationDuration = 0.8,
  delay = 0
}: AnimatedUnderlineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.3,
    margin: '-100px 0px -100px 0px' // Trigger when element is 100px from viewport
  });

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      {children}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5"
        style={{
          backgroundColor: underlineColor,
          height: `${underlineHeight}px`
        }}
        initial={{ width: 0 }}
        animate={isInView ? { width: '100%' } : { width: 0 }}
        transition={{
          duration: animationDuration,
          delay: delay,
          ease: [0.6, -0.05, 0.01, 0.99]
        }}
      />
    </div>
  );
}
