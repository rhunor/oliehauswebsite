// src/lib/utils.ts - Enhanced version with your existing code + cache busting functions
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// Date utilities
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays}d ago`;

  return formatDate(date);
}

// String utilities
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
    .trim();
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
}

export function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  // Nigerian phone number validation
  const nigerianPhoneRegex = /^(\+234|234|0)[789][01]\d{8}$/;
  const internationalPhoneRegex = /^\+[1-9]\d{1,14}$/;
  
  return nigerianPhoneRegex.test(phone) || internationalPhoneRegex.test(phone);
}

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>'"]/g, '')
    .replace(/\s+/g, ' ');
}

// URL utilities
export function getBaseUrl(): string {
  if (typeof window !== 'undefined') return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  return 'http://localhost:3000';
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

export function buildPhoneUrl(phone: string): string {
  return `tel:${phone}`;
}

// ==========================================
// CACHE BUSTING UTILITIES
// ==========================================

interface CacheBustingConfig {
  strategy: 'timestamp' | 'build-version' | 'content-hash' | 'manual';
  buildVersion?: string;
  manualVersion?: string;
}

const defaultCacheBustingConfig: CacheBustingConfig = {
  strategy: 'build-version',
  buildVersion: process.env.NEXT_PUBLIC_BUILD_VERSION || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.substring(0, 8) || Date.now().toString(),
};

export function getCacheBustedUrl(
  baseUrl: string, 
  config: Partial<CacheBustingConfig> = {}
): string {
  const finalConfig = { ...defaultCacheBustingConfig, ...config };
  
  let versionParam: string;
  
  switch (finalConfig.strategy) {
    case 'timestamp':
      versionParam = Date.now().toString();
      break;
    case 'build-version':
      versionParam = finalConfig.buildVersion || Date.now().toString();
      break;
    case 'manual':
      versionParam = finalConfig.manualVersion || '1';
      break;
    case 'content-hash':
      versionParam = finalConfig.buildVersion || Date.now().toString();
      break;
    default:
      versionParam = Date.now().toString();
  }
  
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}v=${versionParam}`;
}

export function getTimestampedUrl(baseUrl: string): string {
  return getCacheBustedUrl(baseUrl, { strategy: 'timestamp' });
}

export function getBuildVersionUrl(baseUrl: string): string {
  return getCacheBustedUrl(baseUrl, { strategy: 'build-version' });
}

export function getManualVersionUrl(baseUrl: string, version: string): string {
  return getCacheBustedUrl(baseUrl, { 
    strategy: 'manual', 
    manualVersion: version 
  });
}

export function getGitHubCdnCacheBustedUrl(
  imagePath: string,
  strategy: 'aggressive' | 'moderate' | 'conservative' = 'moderate'
): string {
  const GITHUB_CDN_BASE = "https://cdn.jsdelivr.net/gh/rhunor/olivehausimages@main";
  const fullUrl = `${GITHUB_CDN_BASE}${imagePath}`;
  
  switch (strategy) {
    case 'aggressive':
      return getTimestampedUrl(fullUrl);
    case 'moderate':
      return getBuildVersionUrl(fullUrl);
    case 'conservative':
      const version = process.env.NEXT_PUBLIC_IMAGE_VERSION || '1.0.0';
      return getManualVersionUrl(fullUrl, version);
    default:
      return getBuildVersionUrl(fullUrl);
  }
}

export function getJsDelivrPurgeUrl(imagePath: string): string {
  const GITHUB_CDN_BASE = "https://purge.jsdelivr.net/gh/rhunor/olivehausimages@main";
  return `${GITHUB_CDN_BASE}${imagePath}`;
}

export function batchCacheBustUrls(
  urls: string[],
  config: Partial<CacheBustingConfig> = {}
): string[] {
  return urls.map(url => getCacheBustedUrl(url, config));
}

export function getProjectImageUrl(
  projectId: string,
  imageName: string,
  strategy: 'aggressive' | 'moderate' | 'conservative' = 'moderate'
): string {
  const imagePath = `/projects/${projectId}/${imageName}`;
  return getGitHubCdnCacheBustedUrl(imagePath, strategy);
}

export function getHeroImageUrl(
  imageName: string,
  strategy: 'aggressive' | 'moderate' | 'conservative' = 'moderate'
): string {
  const imagePath = `/images/hero/${imageName}`;
  return getGitHubCdnCacheBustedUrl(imagePath, strategy);
}

// NEW: Helper for static project image arrays
export function createImageArray(
  basePath: string,
  count: number,
  altPrefix: string
): { src: string; alt: string }[] {
  return Array.from({ length: count }, (_, i) => ({
    src: getGitHubCdnCacheBustedUrl(`${basePath}/${i + 1}.webp`, 'moderate'),
    alt: `${altPrefix} ${i + 1}`,
  }));
}

// ==========================================
// ENHANCED IMAGE UTILITIES WITH CACHE BUSTING
// ==========================================

export function getOptimizedImageUrl(
  originalUrl: string,
  width?: number,
  height?: number,
  quality: number = 80,
  enableCacheBusting: boolean = true
): string {
  let optimizedUrl = originalUrl;
  
  if (originalUrl.includes('cloudinary') || originalUrl.includes('res.cloudinary.com')) {
    const baseUrl = originalUrl.split('/upload/')[0] + '/upload/';
    const imagePath = originalUrl.split('/upload/')[1];
    
    const transformations: string[] = [
      `q_${quality}`,
      'f_auto',
      'dpr_auto',
      'c_fill',
    ];
    
    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
    
    optimizedUrl = `${baseUrl}${transformations.join(',')}/${imagePath}`;
  }
  
  if (enableCacheBusting) {
    optimizedUrl = getBuildVersionUrl(optimizedUrl);
  }
  
  return optimizedUrl;
}

export function generateImageBlurDataUrl(_width: number = 10, _height: number = 10): string {
  return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAhEQACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx/9oADAMBAAIRAxEAPwCdABmX/9k=';
}

export function getImageDimensions(url: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('getImageDimensions can only be used on client side'));
      return;
    }
    
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    img.src = url;
  });
}

export function generateResponsiveSizes(breakpoints: Record<string, number>): string {
  const sizes = Object.entries(breakpoints)
    .sort(([, a], [, b]) => a - b)
    .map(([size, width], index, arr) => {
      if (index === arr.length - 1) {
        return `${size}`;
      }
      return `(max-width: ${width}px) ${size}`;
    });
  
  return sizes.join(', ');
}

export const responsiveSizes = {
  hero: '100vw',
  fullWidth: '100vw',
  twoColumn: '(max-width: 768px) 100vw, 50vw',
  threeColumn: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  sidebar: '(max-width: 768px) 100vw, 300px',
  thumbnail: '(max-width: 768px) 50vw, 200px',
  avatar: '(max-width: 768px) 64px, 128px',
};

export const imageQuality = {
  thumbnail: 70,
  standard: 80,
  high: 90,
  hero: 95,
} as const;

// Analytics utilities
export function trackEvent(eventType: string, category: string, label: string, value?: number): void {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    window.gtag!('event', eventType, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

export function trackImageLoad(imageSrc: string, loadTime: number): void {
  trackEvent('timing_complete', 'images', imageSrc, loadTime);
}

// Number utilities
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatCurrency(amount: number, currency: string = 'NGN'): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

// Array utilities
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j] as T, shuffled[i] as T];
  }
  return shuffled;
}

export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups: Record<string, T[]>, item) => {
    const group = String(item[key]);
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(item);
    return groups;
  }, {});
}

export const scrollUtils = {
  getScrollY: (): number => {
    if (typeof window === 'undefined') return 0;
    return window.scrollY;
  },

  isAtTop: (threshold: number = 10): boolean => {
    return scrollUtils.getScrollY() < threshold;
  },

  getScrollDirection: (currentScrollY: number, lastScrollY: number): 'up' | 'down' => {
    return currentScrollY > lastScrollY ? 'down' : 'up';
  },
};

export const performanceUtils = {
  debounce: <T extends (...args: Parameters<T>) => ReturnType<T>>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    
    return (...args: Parameters<T>): void => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  throttle: <T extends (...args: Parameters<T>) => ReturnType<T>>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    
    return (...args: Parameters<T>): void => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },
};