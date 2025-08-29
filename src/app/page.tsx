//src/app/page.tsx
'use client';

import { Suspense, lazy } from 'react';
import HeroSection from '@/components/ui/HeroSection';
import ExclusivitySection from '@/components/ui/ExclusivitySection';
import AchievementCounter from '@/components/ui/AchievementCounter';
import FloatingButtons from '@/components/ui/FloatingButtons';

// Lazy load components that are below the fold
const PortfolioTeaser = lazy(() => import('@/components/ui/PortfolioTeaser'));
const DesignInsightSnippet = lazy(() => import('@/components/ui/DesignInsightSnippet'));
const TestimonialSection = lazy(() => import('@/components/ui/TestimonialSection'));

// Sample data - In production, this would come from your database
const heroImages = [
  {
    src: '/images/hero/luxury-living-room.jpg',
    alt: 'Luxury living room with contemporary furnishings',
    title: 'Contemporary Elegance',
    subtitle: 'A stunning blend of modern luxury and timeless sophistication in Lagos'
  },
  {
    src: '/images/hero/luxury-bedroom.jpg',
    alt: 'Elegant master bedroom with luxury finishes',
    title: 'Master Suite Sanctuary',
    subtitle: 'Bespoke bedroom design featuring custom furnishings and premium materials'
  },
  {
    src: '/images/hero/luxury-kitchen.jpg',
    alt: 'Modern luxury kitchen with marble countertops',
    title: 'Culinary Masterpiece',
    subtitle: 'State-of-the-art kitchen design with Italian marble and custom cabinetry'
  }
];

const heroVideo = {
  thumbnailSrc: '/images/video/portfolio-thumbnail.jpg',
  videoSrc: '/videos/olivehaus-portfolio.mp4',
  title: 'OliveHaus Portfolio Showcase',
  description: 'Experience our luxury interior design projects from concept to completion'
};

const heroTagline = {
  main: 'Spaces that Define Luxury.',
  sub: 'Designs that Feel Like Home.'
};

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

export default function HomePage() {
  // Handle CTA clicks
  const handleHireUsClick = () => {
    // Scroll to contact section or open contact modal
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback: redirect to contact page
      window.location.href = '/contact';
    }
    
    // Analytics tracking
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'click', {
        event_category: 'engagement',
        event_label: 'hire_us_hero',
      });
    }
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
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'click', {
        event_category: 'engagement',
        event_label: 'book_now_exclusivity',
      });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        images={heroImages}
        video={heroVideo}
        tagline={heroTagline}
        onHireUsClick={handleHireUsClick}
      />

      {/* Exclusivity Section */}
      <ExclusivitySection
        availableSlots={availableSlots}
        currentYear={2025}
        urgencyMessage="Due to high demand and our commitment to personalized service, we maintain limited project slots per quarter to ensure exceptional quality and attention to detail."
        onBookNowClick={handleBookNowClick}
      />

      {/* Achievement Counter */}
      <AchievementCounter counters={counters} />

      {/* Portfolio Teaser - Lazy loaded */}
      <Suspense fallback={
        <div className="py-20 bg-luxury-cream">
          <div className="container-luxury">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-square bg-luxury-platinum/50 rounded-2xl animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      }>
        <PortfolioTeaser />
      </Suspense>

      {/* Design Insight Snippet - Lazy loaded */}
      <Suspense fallback={
        <div className="py-20 bg-white">
          <div className="container-luxury">
            <div className="max-w-4xl mx-auto">
              <div className="h-8 bg-luxury-platinum/50 rounded-lg mb-6 animate-pulse" />
              <div className="h-64 bg-luxury-platinum/50 rounded-2xl animate-pulse" />
            </div>
          </div>
        </div>
      }>
        <DesignInsightSnippet />
      </Suspense>

      {/* Testimonials - Lazy loaded */}
      <Suspense fallback={
        <div className="py-20 bg-luxury-cream">
          <div className="container-luxury">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="card-luxury">
                  <div className="h-32 bg-luxury-platinum/50 rounded-lg animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      }>
        <TestimonialSection />
      </Suspense>

      {/* Contact Section */}
      <section id="contact-section" className="py-20 bg-gradient-to-br from-luxury-charcoal to-luxury-slate text-white">
        <div className="container-luxury text-center">
          <h2 className="text-luxury-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Contact us today for a private consultation and discover how we can create your dream luxury space.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href={`tel:${contactInfo.phone}`}
              className="btn-luxury text-lg px-12 py-4"
            >
              Call Us Now
            </a>
            
            <a
              href={`https://wa.me/${contactInfo.whatsapp.replace(/[^\d]/g, '')}?text=Hello! I'm interested in OliveHaus Interiors' luxury design services.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-white hover:text-luxury-gold transition-colors duration-300 border border-white/30 rounded-lg px-8 py-4 hover:border-luxury-gold"
            >
              <span>WhatsApp Us</span>
            </a>
          </div>
          
          <p className="mt-8 text-sm text-white/70">
            Response time: Within 2 hours during business hours
          </p>
        </div>
      </section>

      {/* Floating Buttons */}
      <FloatingButtons
        phone={contactInfo.phone}
        whatsapp={contactInfo.whatsapp}
      />
    </>
  );
}