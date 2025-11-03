'use client';

import { motion } from 'framer-motion';

interface ImageLoadingSpinnerProps {
  className?: string;
}

export const ImageLoadingSpinner: React.FC<ImageLoadingSpinnerProps> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-mist-grey to-[#F3EEE8] ${className}`}>
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Outer ring */}
        <motion.div
          className="w-16 h-16 border-2 border-luxury-gold/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Inner spinning element */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: -360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-12 h-12 border-t-2 border-luxury-gold rounded-full" />
        </motion.div>
        
        {/* Center logo accent */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-6 h-6">
            <path 
              d="M50 10 L90 90 L10 90 Z" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="3"
              className="text-luxury-gold/50"
            />
          </svg>
        </div>
      </motion.div>
      
      {/* Optional loading text */}
      <motion.p
        className="absolute bottom-8 text-xs tracking-widest text-luxury-slate/60 uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        Loading
      </motion.p>
    </div>
  );
};