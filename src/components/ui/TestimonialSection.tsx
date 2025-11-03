'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
    clientName: 'Esther Igberase',
    location: 'Victoria Island, Lagos',
    projectType: 'Luxury Penthouse',
    content: 'Awesome experience. The world best Nigerian interior designer.The household designs are so unique!!!!!!!!',
    rating: 5,
    isHighProfile: true,
    projectImage: `${GITHUB_CDN_BASE}/projects/projectlandmark/6.webp`,
  },
  {
    id: '2',
    clientName: 'Gabriel Unogwu',
    location: 'Ikoyi, Lagos',
    projectType: 'Corporate Office',
    content: 'Your work exudes a sense of comfort and luxury,The flow of the space is seamless, The custom-built pieces are exceptional, the selection of furniture and decor is spot on.Olivehaus 💯',
    rating: 5,
    isHighProfile: true,
    projectImage: `${GITHUB_CDN_BASE}/projects/projectcasavitalis/22.webp`,
  },
  {
    id: '3',
    clientName: 'Ibimina Ezekiel-Hart',
    location: 'Banana Island, Lagos',
    projectType: 'Private Villa',
    content: 'Met Anita of Olivehaus interior round about 2021 through Instagram and she has gone ahead to create two magical properties for me. We are currently on two new projects outside her base and we cant wait to show the world the magic she will create. Olive haus interior is the best interior designing house ever.',
    rating: 5,
    isHighProfile: false,
    projectImage: `${GITHUB_CDN_BASE}/projects/projectezra/2.webp`,
  },
  {
    id: '4',
    clientName: 'Anonymous Client',
    location: 'Lekki, Lagos',
    projectType: 'Master Suite Renovation',
    content: 'What I got was a surreal transformation that took my breath away. The sort of space only imagined and fit for royalty was what Olivehaus delivered as our reality. But we didn\'t expect any less. They are simply the best Indeed! The client\'s Premium comfort comes first with them.',
    rating: 5,
    isHighProfile: true,
    projectImage: `${GITHUB_CDN_BASE}/projects/projectcasaserenalekkilagos/5.webp`,
  },
  {
    id: '5',
    clientName: 'Seyo O.',
    location: 'Lekki, Lagos',
    projectType: 'Show Home Design',
    content: 'To any one considering Olive Haus Interiors don\'t worry you\'re in good hands! The work they did was beautiful. Maximization of space in a thoughtful way, stunning design, respectful communication, I can go on and on.Anita has built a team that KNOWS their work and it shows. Everyone that comes over has raved about how nice our place is! Would recommend Olive Haus interiors a million times over!',
    rating: 5,
    isHighProfile: false,
    projectImage: `${GITHUB_CDN_BASE}/projects/projectofficeland/1.webp`,
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
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
            >
              {/* Testimonial Content */}
              <div className="space-y-6">
                {/* Pull Quote / Narrative */}
                <blockquote className="font-serif italic text-[18px] md:text-[20px] leading-8 md:leading-9 text-justify text-luxury-charcoal/90">
                  &ldquo;{currentTestimonialData.content}&rdquo;
                </blockquote>
                {/* Attribution */}
                <div className="text-xs uppercase tracking-[0.18em] text-luxury-slate/70">
                  – {currentTestimonialData.clientName}, {currentTestimonialData.location}
                </div>
              </div>

              {/* Project Image + Floating Info Box */}
              <div className="relative">
                <div className="aspect-[3/2] relative overflow-hidden rounded-2xl shadow-luxury-soft">
                  <img
                    src={currentTestimonialData.projectImage}
                    alt={`${currentTestimonialData.projectType} project`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                </div>

                {/* Floating Info Box (desktop), stacked on mobile */}
                {/* <div className="max-w-md lg:max-w-sm bg-[rgb(var(--color-pale-oat))] text-luxury-charcoal/90 border border-black/5 rounded-xl shadow-luxury-soft p-6 md:p-7 lg:absolute lg:-bottom-8 lg:-right-8 mt-6 lg:mt-0">
                  <h3 className="font-serif text-xl font-bold mb-2">{currentTestimonialData.projectType}</h3>
                  <p className="text-sm md:text-base leading-7">{currentTestimonialData.location}</p>
                </div> */}
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