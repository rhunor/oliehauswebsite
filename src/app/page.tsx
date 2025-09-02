//src/app/page.tsx - Updated with proper image implementation
'use client';

import { Suspense, lazy } from 'react';
import HeroSection from '@/components/ui/HeroSection';
import ExclusivitySection from '@/components/ui/ExclusivitySection';
import AchievementCounter from '@/components/ui/AchievementCounter';
import FloatingButtons from '@/components/ui/FloatingButtons';
import { HeroImage, VideoContent } from '@/types';

// Lazy load components that are below the fold
const PortfolioTeaser = lazy(() => import('@/components/ui/PortfolioTeaser'));
const DesignInsightSnippet = lazy(() => import('@/components/ui/DesignInsightSnippet'));
const TestimonialSection = lazy(() => import('@/components/ui/TestimonialSection'));

// Extend window type for gtag function
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'set',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

// Hero images with optimized specifications for luxury interior design
const heroImages: HeroImage[] = [
  {
    src: '/images/hero/luxury-living-room.jpg',
    alt: 'Luxury living room with contemporary furnishings and panoramic city views',
    title: 'Contemporary Elegance',
    subtitle: 'A stunning blend of modern luxury and timeless sophistication in Lagos',
    width: 1920,
    height: 800,
    priority: true,
    quality: 95,
    sizes: '100vw'
  },
  {
    src: '/images/hero/luxury-bedroom.jpg',
    alt: 'Elegant master bedroom with luxury finishes and bespoke furniture',
    title: 'Master Suite Sanctuary',
    subtitle: 'Bespoke bedroom design featuring custom furnishings and premium materials',
    width: 1920,
    height: 800,
    priority: false,
    quality: 90,
    sizes: '100vw'
  },
  {
    src: '/images/hero/luxury-kitchen.jpg',
    alt: 'Modern luxury kitchen with marble countertops and Italian cabinetry',
    title: 'Culinary Masterpiece',
    subtitle: 'State-of-the-art kitchen design with Italian marble and custom cabinetry',
    width: 1920,
    height: 800,
    priority: false,
    quality: 90,
    sizes: '100vw'
  }
];

const availableSlots = {
  q1: 3,
  q2: 8,
  q3: 12,
  q4: 15
};

const counters = {
  completedProjects: 157,
  happyClients: 143,
  yearsExperience: 15,
  ongoingProjects: 28
};

const contactInfo = {
  phone: '+234-xxx-xxx-xxxx',
  whatsapp: '+234-xxx-xxx-xxxx'
};


// Video content with optimized thumbnail
const heroVideo: VideoContent = {
  thumbnailSrc: '/images/video/portfolio-thumbnail.jpg',
  videoSrc: '/videos/olivehaus-portfolio.mp4',
  title: 'OliveHaus Portfolio Showcase',
  description: 'Experience our luxury interior design projects from concept to completion',
  thumbnail: {
    src: '/images/video/portfolio-thumbnail.jpg',
    alt: 'Portfolio video thumbnail showing luxury interior design projects',
    width: 800,
    height: 450,
    priority: false,
    quality: 85,
    sizes: '(max-width: 768px) 100vw, 800px'
  }
};

const heroTagline = {
  main: 'Spaces that Define Luxury.',
  sub: 'Designs that Feel Like Home.'
};

export default function Home() {
  // Analytics and lead generation handlers
  const handleHireUsClick = () => {
    // Track conversion event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'conversion',
        event_label: 'hero_hire_us',
        value: 1,
      });
    }

    // In production, this would trigger the contact modal or redirect
    console.log('Hire Us clicked - Opening contact options');
    
    // For now, scroll to contact section or show WhatsApp/Call options
    // You can implement a modal or redirect logic here
  };

  const handleBookNowClick = () => {
    // Scroll to contact section or open booking modal
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback: redirect to contact page
      window.location.href = '/contact';
    }
    
    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'engagement',
        event_label: 'book_now_exclusivity',
      });
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        images={heroImages}
        video={heroVideo}
        tagline={heroTagline}
        onHireUsClick={handleHireUsClick}
        className="relative z-10"
      />

      {/* Exclusivity Section */}
      <ExclusivitySection 
        availableSlots={availableSlots}
        currentYear={2025}
        urgencyMessage="Due to high demand and our commitment to personalized service, we maintain limited project slots per quarter to ensure exceptional quality and attention to detail."
        onBookNowClick={handleBookNowClick}
        className="relative z-20" 
      />

      {/* Achievement Counter */}
      <AchievementCounter 
        counters={counters}
        className="relative z-20" 
      />

      {/* Below-the-fold content - Lazy loaded for performance */}
      <Suspense 
        fallback={
          <div className="py-20 bg-luxury-cream">
            <div className="container-luxury">
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin" />
              </div>
            </div>
          </div>
        }
      >
        <PortfolioTeaser className="relative z-20" />
      </Suspense>

      <Suspense 
        fallback={
          <div className="py-20 bg-white">
            <div className="container-luxury">
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin" />
              </div>
            </div>
          </div>
        }
      >
        <DesignInsightSnippet className="relative z-20" />
      </Suspense>

      <Suspense 
        fallback={
          <div className="py-20 bg-luxury-cream">
            <div className="container-luxury">
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin" />
              </div>
            </div>
          </div>
        }
      >
        <TestimonialSection className="relative z-20" />
      </Suspense>

      {/* Floating Action Buttons - Always visible */}
      <FloatingButtons 
        phone={contactInfo.phone}
        whatsapp={contactInfo.whatsapp}
        className="fixed bottom-6 right-6 z-50" 
      />
    </main>
  );
}