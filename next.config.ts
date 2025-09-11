//next.config.ts - Enhanced version
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
  
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  
  // Enable experimental features for better performance
  swcMinify: true,
  
  // Optimize for production
  productionBrowserSourceMaps: false,
  
  // Performance optimizations
  compress: true,
  
  // Configure headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
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
          // Cache static assets
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Specific headers for images
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Headers for videos
      {
        source: '/videos/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
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