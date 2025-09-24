'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Testimonial {
  id: string;
  clientName: string;
  location: string;
  projectType: string;
  content: string;
  rating: number;
  isHighProfile: boolean;
  clientImage?: string;
  projectImage: string;
}

interface TestimonialSectionProps {
  className?: string;
}

// Updated to use jsDelivr CDN for better performance and reliability
const GITHUB_CDN_BASE = "https://cdn.jsdelivr.net/gh/rhunor/olivehausimages@main";

// Sample testimonials data - In production, this would come from your database
const testimonials: Testimonial[] = [
  {
    id: '1',
    clientName: 'Mrs. A. Adebayo',
    location: 'Victoria Island, Lagos',
    projectType: 'Luxury Penthouse',
    content: 'OliveHaus Interiors transformed our penthouse into a masterpiece that exceeds our wildest dreams. Their attention to detail and understanding of luxury design is unparalleled. Every corner tells a story of elegance and sophistication.',
    rating: 5,
    isHighProfile: true,
    projectImage: `${GITHUB_CDN_BASE}/projects/projectlandmark/6.webp`,
  },
  {
    id: '2',
    clientName: 'Chief Executive',
    location: 'Ikoyi, Lagos',
    projectType: 'Corporate Office',
    content: 'Working with OliveHaus was an absolute pleasure. They created a workspace that not only impresses our clients but also inspires our team daily. The blend of functionality and luxury is exactly what we envisioned.',
    rating: 5,
    isHighProfile: true,
    projectImage: `${GITHUB_CDN_BASE}/projects/projectcasavitalis/22.webp`,
  },
  {
    id: '3',
    clientName: 'Dr. & Mrs. Johnson',
    location: 'Banana Island, Lagos',
    projectType: 'Private Villa',
    content: 'From the initial consultation to the final reveal, OliveHaus demonstrated exceptional professionalism and creativity. Our villa now reflects our personality perfectly while maintaining the highest standards of luxury.',
    rating: 5,
    isHighProfile: false,
    projectImage: `${GITHUB_CDN_BASE}/projects/projectezra/6.webp`,
  },
  {
    id: '4',
    clientName: 'Anonymous Client',
    location: 'Lekki, Lagos',
    projectType: 'Master Suite Renovation',
    content: 'The team at OliveHaus created the most beautiful and serene master suite. Their ability to balance luxury with comfort is remarkable. We feel like we are staying in a five-star resort every night.',
    rating: 5,
    isHighProfile: true,
    projectImage: `${GITHUB_CDN_BASE}/projects/projectcasaserenalekkilagos/8.webp`,
  },
  {
    id: '5',
    clientName: 'Real Estate Developer',
    location: 'Abuja',
    projectType: 'Show Home Design',
    content: 'OliveHaus delivered show homes that sold 40% faster than our previous projects. Their understanding of what luxury buyers want is exceptional, and the ROI on their design was immediate.',
    rating: 5,
    isHighProfile: false,
    projectImage: `${GITHUB_CDN_BASE}/images/hero/1.webp`,
  },
];

export default function TestimonialSection({ className }: TestimonialSectionProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
  };

  const currentTestimonialData = testimonials[currentTestimonial];
  if (!currentTestimonialData) {
    return null;
  }

  return (
    <section className={cn("py-20 bg-white relative overflow-hidden", className)}>
      {/* Background Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-luxury-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-luxury-cream/50 rounded-full blur-2xl" />

      <div className="container-luxury relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-luxury-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Trusted By Distinguished 
            <span className="text-luxury-heading block mt-2">Clients…</span>
          </h2>
          <p className="text-xl text-luxury-slate max-w-3xl mx-auto leading-relaxed">
            Discover why discerning clients trust OliveHaus Interiors with their most important spaces
          </p>

          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="luxury-divider mt-8 max-w-md mx-auto"
          />
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              {/* Testimonial Content */}
              <div className="space-y-8">
                {/* Quote Icon */}
                <div className="w-16 h-16 bg-luxury-gold/10 rounded-2xl flex items-center justify-center">
                  <Quote className="w-8 h-8 text-luxury-gold" />
                </div>

                {/* Stars */}
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-6 h-6",
                        i < currentTestimonialData.rating
                          ? "text-luxury-gold fill-current"
                          : "text-luxury-platinum"
                      )}
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-2xl md:text-3xl font-elegant leading-relaxed text-luxury-charcoal italic">
                  &ldquo;{currentTestimonialData.content}&rdquo;
                </blockquote>

                {/* Client Info */}
                <div className="space-y-2">
                  <div className="font-serif text-xl font-bold text-luxury-charcoal">
                    {currentTestimonialData.clientName}
                  </div>
                  <div className="text-luxury-slate">
                    {currentTestimonialData.projectType} • {currentTestimonialData.location}
                  </div>
                  {currentTestimonialData.isHighProfile && (
                    <div className="inline-flex items-center text-xs bg-luxury-gold/10 text-luxury-gold px-3 py-1 rounded-full font-medium">
                      High-Profile Client
                    </div>
                  )}
                </div>
              </div>

              {/* Project Image */}
              <div className="relative">
                <div className="aspect-[4/3] relative overflow-hidden rounded-2xl shadow-luxury">
                  <img
                    src={currentTestimonialData.projectImage}
                    alt={`${currentTestimonialData.projectType} project`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Floating Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-6 -right-6 bg-luxury-gold text-white p-4 rounded-2xl shadow-luxury"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold">5.0</div>
                    <div className="text-xs opacity-90">Rating</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center mt-12 space-x-6">
            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              className="p-3 bg-white border border-luxury-platinum rounded-full hover:bg-luxury-gold hover:border-luxury-gold hover:text-white transition-all duration-300 shadow-sm"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Testimonial Indicators */}
            <div className="flex space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    index === currentTestimonial
                      ? "bg-luxury-gold scale-125"
                      : "bg-luxury-platinum hover:bg-luxury-gold/50"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="p-3 bg-white border border-luxury-platinum rounded-full hover:bg-luxury-gold hover:border-luxury-gold hover:text-white transition-all duration-300 shadow-sm"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 pt-12 border-t border-luxury-platinum/50"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-luxury-gold mb-2">98%</div>
              <div className="text-luxury-slate">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-luxury-gold mb-2">5.0</div>
              <div className="text-luxury-slate">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-luxury-gold mb-2">94%</div>
              <div className="text-luxury-slate">On-time Delivery</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}