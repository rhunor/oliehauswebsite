//src/types/index.ts - Enhanced version with optimized image types
import { ObjectId } from 'mongodb';

// Base interfaces
export interface BaseDocument {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Enhanced image interfaces for optimization
export interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  className?: string;
  blurDataURL?: string;
  placeholder?: 'blur' | 'empty';
}

export interface ResponsiveImageSizes {
  mobile: string;
  tablet: string;
  desktop: string;
  xl: string;
}

// Project interfaces (enhanced from your existing)
export interface Project extends BaseDocument {
  title: string;
  slug: string;
  description: string;
  category: ProjectCategory;
  subcategory: ProjectSubcategory;
  location: string;
  scope: string;
  specialFeatures: string[];
  images: ProjectImage[];
  beforeAfterImages: BeforeAfterImage[];
  testimonial?: ProjectTestimonial;
  featured: boolean;
  status: ProjectStatus;
  completionDate: Date;
  tags: string[];
}

// Enhanced ProjectImage with optimization properties
export interface ProjectImage {
  url: string;
  alt: string;
  caption?: string;
  isPrimary: boolean;
  cloudinaryId: string;
  width: number;
  height: number;
  aspectRatio: string; // e.g., "16:9", "4:3", "1:1"
  category: ImageCategory;
  optimizedVersions?: {
    webp: string;
    avif: string;
    thumbnail: string;
  };
}

export interface BeforeAfterImage {
  before: {
    url: string;
    alt: string;
    cloudinaryId: string;
    width: number;
    height: number;
  };
  after: {
    url: string;
    alt: string;
    cloudinaryId: string;
    width: number;
    height: number;
  };
  description: string;
}

export interface ProjectTestimonial {
  clientName: string;
  content: string;
  rating: number;
  isHighProfile: boolean;
  clientPhoto?: OptimizedImageProps;
}

export type ProjectCategory = 'residential' | 'corporate' | 'commercial';
export type ProjectSubcategory = 'bathroom' | 'bedroom' | 'kitchen' | 'living-room' | 'office' | 'retail' | 'hospitality';
export type ProjectStatus = 'completed' | 'in-progress' | 'planned';
export type ImageCategory = 'hero' | 'portfolio' | 'detail' | 'thumbnail' | 'before' | 'after';

// Hero section interfaces (matching your existing components)
export interface HeroImage extends OptimizedImageProps {
  title: string;
  subtitle: string;
}

export interface VideoContent {
  thumbnailSrc: string;
  videoSrc: string;
  title: string;
  description: string;
  thumbnail: OptimizedImageProps;
}

// Design insight interfaces (enhanced)
export interface DesignInsight extends BaseDocument {
  title: string;
  slug: string;
  description: string;
  projectId: ObjectId;
  renderImages: DesignRender[];
  narrative: string;
  inspiration: string;
  challenges: string[];
  solutions: string[];
  uniqueSellingPoints: string[];
  featured: boolean;
}

export interface DesignRender {
  url: string;
  alt: string;
  annotations: DesignAnnotation[];
  cloudinaryId: string;
  width: number;
  height: number;
  optimizedVersions?: {
    webp: string;
    avif: string;
  };
}

export interface DesignAnnotation {
  x: number; // Percentage from left
  y: number; // Percentage from top
  title: string;
  description: string;
  id: string;
}

// Contact and lead interfaces
export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  projectType: ProjectCategory;
  message: string;
  leadQualifier?: LeadQualifier;
}

export interface LeadQualifier {
  budget: BudgetRange;
  timeline: TimelineRange;
  propertyType: PropertyType;
  inspirationStyle: string[];
  hasArchitect: boolean;
  currentStage: ProjectStage;
}

export type BudgetRange = 'under-50k' | '50k-100k' | '100k-250k' | '250k-500k' | '500k-1m' | 'over-1m';
export type TimelineRange = 'immediate' | '1-3-months' | '3-6-months' | '6-12-months' | 'over-1-year';
export type PropertyType = 'house' | 'apartment' | 'office' | 'retail' | 'hospitality' | 'other';
export type ProjectStage = 'planning' | 'design' | 'construction' | 'finishing';

export interface Lead extends BaseDocument, ContactForm {
  status: LeadStatus;
  source: LeadSource;
  assignedTo?: ObjectId;
  notes: LeadNote[];
  followUpDate?: Date;
}

export interface LeadNote extends BaseDocument {
  content: string;
  author: ObjectId;
}

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal-sent' | 'closed-won' | 'closed-lost';
export type LeadSource = 'website' | 'referral' | 'social-media' | 'google-ads' | 'direct' | 'other';

// Analytics and tracking
export interface AnalyticsEvent {
  eventType: 'page_view' | 'click' | 'form_submit' | 'video_play' | 'download';
  category: string;
  label: string;
  value?: number;
  userId?: string;
  sessionId: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}