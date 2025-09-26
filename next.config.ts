//next.config.ts - Enhanced version with hydration fixes and smart caching
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: false,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false,
  },
  
  // Enable proper caching but fix hydration issues
  experimental: {
    // Only disable staleTimes in development for debugging
    ...(process.env.NODE_ENV === 'development' && {
      staleTimes: {
        dynamic: 30, // 30 seconds for dynamic content
        static: 180, // 3 minutes for static content
      },
    }),
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  
  images: {
    // Enable modern image formats (AVIF first, then WebP as fallback)
    formats: ['image/avif', 'image/webp'],
    
    // Configure remote patterns for external images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        port: '',
        pathname: '/**',
      },
      // GitHub raw content (keep as fallback)
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      // jsDelivr CDN for GitHub content (primary)
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        port: '',
        pathname: '/**',
      },
    ],
  
    
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    
    // Image sizes for images with sizes prop
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Explicitly allow quality values (NEW in Next.js 15.5+)
    // This replaces the deprecated 'quality' property
    qualities: [70, 75, 80, 85, 90, 95, 100],
    
    // Minimize overhead for the image optimization API (in seconds)
    minimumCacheTTL: 31536000, // 1 year in seconds
    
    // Enable SVG support with security policy
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Enable experimental features for better performance
  swcMinify: true,
  
  // Optimize for production
  productionBrowserSourceMaps: false,
  
  // Performance optimizations
  compress: true,
  
  // Configure headers for security, performance AND fix caching issues
  async headers() {
    return [
      {
        // Static assets - cache aggressively (Next.js assets)
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1 year
          },
        ],
      },
      {
        // API routes - short cache for dynamic data
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=60, s-maxage=300', // 1 min browser, 5 min CDN
          },
        ],
      },
      {
        // Images - reasonable caching
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=604800', // 1 day browser, 1 week CDN
          },
        ],
      },
      {
        // Videos - long cache
        source: '/videos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1 year
          },
        ],
      },
      {
        // Pages - reasonable caching (not too aggressive)
        source: '/((?!api|_next|images|videos).*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=600', // 5 min browser, 10 min CDN
          },
        ],
      },
    ];
  },
  
  // Redirect configuration if needed
  async redirects() {
    return [
      // Add any redirects here if needed
    ];
  },
  
  // Rewrite configuration for cleaner URLs
  async rewrites() {
    return [
      // Add any rewrites here if needed
    ];
  },
};

export default nextConfig;