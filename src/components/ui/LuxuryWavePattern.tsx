'use client';

import React from 'react';

interface LuxuryWavePatternProps {
  opacity?: number;
  color?: string;
  className?: string;
}

const LuxuryWavePattern: React.FC<LuxuryWavePatternProps> = ({
  opacity = 0.04,
  color = '#D4AF37',
  className = ''
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Elegant flowing wave pattern inspired by luxury textiles */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
        overflow="hidden"
        focusable="false"
        className="absolute inset-0 block w-full h-full"
        style={{ display: 'block' }}
      >
        <defs>
          {/* Subtle gradient for the waves */}
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity={0.8} />
            <stop offset="50%" stopColor={color} stopOpacity={0.4} />
            <stop offset="100%" stopColor={color} stopOpacity={0.8} />
          </linearGradient>

          {/* Pattern definition */}
          <pattern
            id="luxuryWaves"
            x="0"
            y="0"
            width="200"
            height="200"
            patternUnits="userSpaceOnUse"
          >
            {/* Flowing wave lines */}
            <path
              d="M0,50 Q50,10 100,50 T200,50"
              stroke="url(#waveGradient)"
              strokeWidth={1}
              fill="none"
              opacity={0.6}
            />
            <path
              d="M0,100 Q50,60 100,100 T200,100"
              stroke="url(#waveGradient)"
              strokeWidth={0.8}
              fill="none"
              opacity={0.4}
            />
            <path
              d="M0,150 Q50,110 100,150 T200,150"
              stroke="url(#waveGradient)"
              strokeWidth={1.2}
              fill="none"
              opacity={0.5}
            />

            {/* Subtle geometric accents */}
            <circle cx="25" cy="25" r="1" fill={color} opacity={0.3} />
            <circle cx="175" cy="175" r="1" fill={color} opacity={0.3} />
            <circle cx="25" cy="175" r="0.8" fill={color} opacity={0.2} />
            <circle cx="175" cy="25" r="0.8" fill={color} opacity={0.2} />

            {/* Delicate connecting lines */}
            <line
              x1="25"
              y1="25"
              x2="175"
              y2="25"
              stroke={color}
              strokeWidth={0.3}
              opacity={0.2}
            />
            <line
              x1="25"
              y1="175"
              x2="175"
              y2="175"
              stroke={color}
              strokeWidth={0.3}
              opacity={0.2}
            />
          </pattern>
        </defs>

        {/* Apply the pattern */}
        <rect width="100%" height="100%" fill="url(#luxuryWaves)" />
      </svg>
    </div>
  );
};

export default LuxuryWavePattern;
