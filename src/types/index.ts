//src/ypes/index.ts
import { ObjectId } from 'mongodb';

// Base interfaces
export interface BaseDocument {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Project interfaces
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

export interface ProjectImage {
  url: string;
  alt: string;
  caption?: string;
  isPrimary: boolean;
  cloudinaryId: string;
}

export interface BeforeAfterImage {
  before: {
    url: string;
    alt: string;
    cloudinaryId: string;
  };
  after: {
    url: string;
    alt: string;
    cloudinaryId: string;
  };
  description: string;
}

export interface ProjectTestimonial {
  clientName: string;
  content: string;
  rating: number;
  isHighProfile: boolean;
}

export type ProjectCategory = 'residential' | 'corporate' | 'commercial';
export type ProjectSubcategory = 'bathroom' | 'bedroom' | 'kitchen' | 'living-room' | 'office' | 'retail' | 'hospitality';
export type ProjectStatus = 'completed' | 'in-progress' | 'planned';

// Design insight interfaces
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
  priority: LeadPriority;
  estimatedValue: number;
}

export interface LeadNote {
  content: string;
  createdBy: ObjectId;
  createdAt: Date;
  isImportant: boolean;
}

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal-sent' | 'negotiation' | 'closed-won' | 'closed-lost';
export type LeadSource = 'website' | 'whatsapp' | 'phone' | 'referral' | 'social-media' | 'other';
export type LeadPriority = 'low' | 'medium' | 'high' | 'urgent';

// Testimonial interfaces
export interface Testimonial extends BaseDocument {
  clientName: string;
  content: string;
  rating: number;
  projectId?: ObjectId;
  location: string;
  isHighProfile: boolean;
  featured: boolean;
  clientImage?: {
    url: string;
    alt: string;
    cloudinaryId: string;
  };
  tags: string[];
}

// Settings and configuration interfaces
export interface SiteSettings extends BaseDocument {
  counters: ProjectCounters;
  bookingSettings: BookingSettings;
  contactInfo: ContactInfo;
  socialMedia: SocialMediaLinks;
  seo: SEOSettings;
}

export interface ProjectCounters {
  completedProjects: number;
  happyClients: number;
  yearsExperience: number;
  ongoingProjects: number;
}

export interface BookingSettings {
  availableSlots: QuarterlySlots;
  currentYear: number;
  showCountdown: boolean;
  urgencyMessage: string;
}

export interface QuarterlySlots {
  q1: number;
  q2: number;
  q3: number;
  q4: number;
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  businessHours: BusinessHours;
}

export interface BusinessHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export interface DayHours {
  open: string;
  close: string;
  isClosed: boolean;
}

export interface SocialMediaLinks {
  instagram: string;
  linkedin: string;
  facebook: string;
  twitter: string;
  pinterest: string;
}

export interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage: {
    url: string;
    width: number;
    height: number;
  };
}

// Admin interfaces
export interface AdminUser extends BaseDocument {
  name: string;
  email: string;
  password: string;
  role: AdminRole;
  isActive: boolean;
  lastLogin?: Date;
  avatar?: {
    url: string;
    cloudinaryId: string;
  };
}

export type AdminRole = 'super-admin' | 'admin' | 'editor';

// API response interfaces
export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  message: string;
  error?: string;
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedResponse<T> extends APIResponse<T[]> {
  meta: PaginationMeta;
}

// Utility types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Component prop interfaces
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

// Form validation interfaces
export interface FormErrors {
  [key: string]: string | undefined;
}

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: unknown) => boolean | string;
}

export interface FormField<T = string> {
  value: T;
  error?: string;
  touched: boolean;
  rules?: ValidationRule;
}

// Database connection interfaces
export interface DatabaseConfig {
  uri: string;
  options: Record<string, unknown>;
}

// Email interfaces
export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export interface EmailConfig {
  from: string;
  replyTo: string;
  templates: Record<string, EmailTemplate>;
}

// Analytics interfaces
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export interface PageViewData {
  path: string;
  title: string;
  timestamp: Date;
  userAgent: string;
  referrer?: string;
}

// Search and filter interfaces
export interface SearchFilters {
  category?: ProjectCategory;
  subcategory?: ProjectSubcategory;
  tags?: string[];
  featured?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

// Media upload interfaces
export interface CloudinaryUploadResponse {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  asset_id: string;
  display_name: string;
  original_filename: string;
}