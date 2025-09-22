'use client';

import HeroSection from '@/components/ui/HeroSection';
import PortfolioTeaser from '@/components/ui/PortfolioTeaser';
import TestimonialSection from '@/components/ui/TestimonialSection';
import LuxuryWavePattern from '@/components/ui/LuxuryWavePattern';
import { motion, useMotionValue, animate, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface HeroImage {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
}

interface VideoContent {
  thumbnailSrc: string;
  videoSrc: string;
  title: string;
  description: string;
}

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
}

// Smooth Animated Counter Component with spring physics
function AnimatedCounter({ value, suffix = '', prefix = '' }: AnimatedCounterProps): React.JSX.Element {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(motionValue, value, {
        duration: 2,
        ease: [0.25, 0.1, 0.25, 1], // Custom easing for smooth acceleration
        onUpdate: (latest) => {
          setDisplayValue(Math.round(latest));
        }
      });
      return controls.stop;
    }
    // Explicitly return undefined for the else path to satisfy TypeScript
    return undefined;
  }, [inView, value, motionValue]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}

// Updated to use jsDelivr CDN for better performance and reliability
const GITHUB_CDN_BASE = "https://cdn.jsdelivr.net/gh/rhunor/olivehausimages@main";

// Updated hero images with jsDelivr CDN URLs
const heroImages: HeroImage[] = [
  {
    src: `${GITHUB_CDN_BASE}/images/hero/1.webp`,
    alt: 'Elegant luxury living room with contemporary furniture and sophisticated lighting',
    title: 'Luxury Living Spaces',
    subtitle: 'Timeless elegance meets modern comfort'
  },
  {
    src: `${GITHUB_CDN_BASE}/images/hero/2.webp`,
    alt: 'Modern luxury kitchen with premium finishes and state-of-the-art appliances',
    title: 'Gourmet Kitchens',
    subtitle: 'Where culinary dreams come to life'
  },
  {
    src: `${GITHUB_CDN_BASE}/images/hero/3.webp`,
    alt: 'Modern luxury kitchen with premium finishes and state-of-the-art appliances',
    title: 'Gourmet Kitchens',
    subtitle: 'Where culinary dreams come to life'
  },
  {
    src: `${GITHUB_CDN_BASE}/images/hero/4.webp`,
    alt: 'Serene master bedroom with custom millwork and luxury bedding',
    title: 'Tranquil Bedrooms',
    subtitle: 'Your personal sanctuary of comfort'
  },
  {
    src: `${GITHUB_CDN_BASE}/images/hero/5.webp`,
    alt: 'Serene master bedroom with custom millwork and luxury bedding',
    title: 'Tranquil Bedrooms',
    subtitle: 'Your personal sanctuary of comfort'
  },
  {
    src: `${GITHUB_CDN_BASE}/images/hero/6.webp`,
    alt: 'Serene master bedroom with custom millwork and luxury bedding',
    title: 'Tranquil Bedrooms',
    subtitle: 'Your personal sanctuary of comfort'
  },
  {
    src: `${GITHUB_CDN_BASE}/images/hero/7.webp`,
    alt: 'Serene master bedroom with custom millwork and luxury bedding',
    title: 'Tranquil Bedrooms',
    subtitle: 'Your personal sanctuary of comfort'
  },
  {
    src: `${GITHUB_CDN_BASE}/images/hero/8.webp`,
    alt: 'Serene master bedroom with custom millwork and luxury bedding',
    title: 'Tranquil Bedrooms',
    subtitle: 'Your personal sanctuary of comfort'
  },
  {
    src: `${GITHUB_CDN_BASE}/images/hero/9.webp`,
    alt: 'Serene master bedroom with custom millwork and luxury bedding',
    title: 'Tranquil Bedrooms',
    subtitle: 'Your personal sanctuary of comfort'
  },
  {
    src: `${GITHUB_CDN_BASE}/images/hero/10.webp`,
    alt: 'Serene master bedroom with custom millwork and luxury bedding',
    title: 'Tranquil Bedrooms',
    subtitle: 'Your personal sanctuary of comfort'
  },
  {
    src: `${GITHUB_CDN_BASE}/images/hero/11.webp`,
    alt: 'Serene master bedroom with custom millwork and luxury bedding',
    title: 'Tranquil Bedrooms',
    subtitle: 'Your personal sanctuary of comfort'
  },
  {
    src: `${GITHUB_CDN_BASE}/images/hero/12.webp`,
    alt: 'Serene master bedroom with custom millwork and luxury bedding',
    title: 'Tranquil Bedrooms',
    subtitle: 'Your personal sanctuary of comfort'
  },
  {
    src: `${GITHUB_CDN_BASE}/images/hero/13.webp`,
    alt: 'Serene master bedroom with custom millwork and luxury bedding',
    title: 'Tranquil Bedrooms',
    subtitle: 'Your personal sanctuary of comfort'
  },
  {
    src: `${GITHUB_CDN_BASE}/images/hero/14.webp`,
    alt: 'Serene master bedroom with custom millwork and luxury bedding',
    title: 'Tranquil Bedrooms',
    subtitle: 'Your personal sanctuary of comfort'
  },
  {
    src: `${GITHUB_CDN_BASE}/images/hero/15.webp`,
    alt: 'Serene master bedroom with custom millwork and luxury bedding',
    title: 'Tranquil Bedrooms',
    subtitle: 'Your personal sanctuary of comfort'
  },
  {
    src: `${GITHUB_CDN_BASE}/images/hero/16.webp`,
    alt: 'Serene master bedroom with custom millwork and luxury bedding',
    title: 'Tranquil Bedrooms',
    subtitle: 'Your personal sanctuary of comfort'
  },
  {
    src: `${GITHUB_CDN_BASE}/images/hero/17.webp`,
    alt: 'Serene master bedroom with custom millwork and luxury bedding',
    title: 'Tranquil Bedrooms',
    subtitle: 'Your personal sanctuary of comfort'
  },
  {
    src: `${GITHUB_CDN_BASE}/images/hero/18.webp`,
    alt: 'Serene master bedroom with custom millwork and luxury bedding',
    title: 'Tranquil Bedrooms',
    subtitle: 'Your personal sanctuary of comfort'
  },
  {
    src: `${GITHUB_CDN_BASE}/images/hero/19.webp`,
    alt: 'Serene master bedroom with custom millwork and luxury bedding',
    title: 'Tranquil Bedrooms',
    subtitle: 'Your personal sanctuary of comfort'
  },
  {
    src: `${GITHUB_CDN_BASE}/images/hero/20.webp`,
    alt: 'Serene master bedroom with custom millwork and luxury bedding',
    title: 'Tranquil Bedrooms',
    subtitle: 'Your personal sanctuary of comfort'
  }
];

// Updated video content with vimeo URL
const videoContent: VideoContent = {
  thumbnailSrc: '/images/video/portfolio-thumbnail.jpg',
  videoSrc: 'https://vimeo.com/1116723569',
  title: 'OliveHaus Portfolio Showcase',
  description: 'Discover our luxury interior design process'
};

export default function HomePage(): React.JSX.Element {
  const handleHireUsClick = (): void => {
    window.location.href = '/contact';
  };

  return (
    <>
      <div>
        {/* Hero Section - Keep clean */}
        <HeroSection
          images={heroImages}
          video={videoContent}
          tagline={{
            main: 'Design for High Quality Living',
            sub: ''
          }}
          onHireUsClick={handleHireUsClick}
        />

        {/* About Us Section - Warm Sand Background with subtle pattern */}
        <section className="relative py-12 bg-warm-sand overflow-hidden">
          {/* Subtle pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 20%, #D4AF37 1px, transparent 1px),
                radial-gradient(circle at 80% 20%, #D4AF37 1px, transparent 1px),
                radial-gradient(circle at 20% 80%, #D4AF37 1px, transparent 1px),
                radial-gradient(circle at 80% 80%, #D4AF37 1px, transparent 1px),
                radial-gradient(circle at 50% 50%, #D4AF37 0.5px, transparent 0.5px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
          <div className="container-luxury relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-luxury-charcoal tracking-wide">
                  For Nigeria&apos;s <span className="text-luxury-gold">Finest Homes...</span>
                </h2>
                <div className="space-y-6 text-lg text-luxury-charcoal/80 leading-relaxed font-sans">
                  <p>
                   OliveHaus Interiors is a premier interior design company serving luxury residential, corporate, and commercial clients in Nigeria and internationally. We specialize in creating bespoke, timeless, and functional spaces for discerning clients.
                  </p>
                  <p>
                    Our design process emphasizes luxurious personalized solutions, exceptional project management, and remote oversight for diaspora clients.
                  </p>
                  <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-center mt-16"
                      >
                        {/* <p className="text-xl text-luxury-slate max-w-3xl mx-auto leading-relaxed mb-8 font-body">
                          Bring Your Vision to Life. Let&apos;s design a space that&apos;s uniquely yours.
                        </p> */}
                        <a
                          href="/about"
                          className="btn-luxury group inline-flex items-center space-x-2"
                        >
                          <span>know more about us</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </a>
                      </motion.div>
                </div>
                   
              </motion.div>
             
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-luxury-soft"
              >
                <Image
                  src={`${GITHUB_CDN_BASE}/about/28.jpeg`}
                  alt="OliveHaus luxury interior design showcase"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            
            </div>
          </div>
        </section>

        {/* We Stand Out Section - White background with unique wave pattern */}
        <section className="relative pt-12 pb-0 bg-white overflow-hidden">
          <LuxuryWavePattern opacity={0.5} />

          <div className="container-luxury relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-5"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-luxury-charcoal tracking-wide">
                We Stand <span className="text-luxury-gold">Out</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: 'Seamless Project Experience',
                  description:
                    'Flawless client experience, before, during and after project execution',
                  icon: ''
                },
                {
                  title: 'Design for High-Quality Living',
                  description:
                    'Luxurious, personalized interiors that tastefully blend functionality with timeless aesthetics.',
                  icon: ''
                },
                {
                  title: 'Stress-free Project Oversight',
                  description:
                    'Stay in control from anywhere in the world with our Daily Manager Platform Updates—track progress, reports, and updates at your convenience',
                  icon: ''
                },
                {
                  title: 'Constant Team Support',
                  description:
                    'A responsive, detail-driven team ensures your vision is executed to perfection.',
                  icon: ''
                }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-luxury-soft hover:shadow-luxury-strong transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="font-serif text-xl font-bold mb-4 text-luxury-charcoal tracking-wide">
                    {value.title}
                  </h3>
                  <p className="text-luxury-charcoal/80 leading-relaxed font-sans mb-0">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Track Record Section - Clean animated counters with visible text */}
        <section className="py-20 bg-luxury-charcoal relative overflow-hidden">
          {/* Subtle animated pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 20%, #D4AF37 1px, transparent 1px),
                radial-gradient(circle at 80% 80%, #D4AF37 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
          
          <div className="container-luxury relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 tracking-wide" style={{ color: 'white' }}>
                Our Track <span className="text-luxury-gold">Record</span>
              </h2>
              <p className="text-xl max-w-3xl mx-auto font-sans leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Numbers that speak of our commitment to luxury, quality, and client satisfaction across every project we undertake.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  number: 150,
                  suffix: '+',
                  label: 'Luxury Spaces',
                  description: 'Exquisitely designed and completed projects across Nigeria'
                },
                {
                  number: 200,
                  suffix: '+',
                  label: 'Satisfied Clients',
                  description: 'Esteemed individuals who trust us with their luxury spaces'
                },
                {
                  number: 12,
                  suffix: '+',
                  label: 'Years of Experience',
                  description: 'Years of expertise in luxury interior design and project'
                },
                {
                  number: 25,
                  suffix: '',
                  label: 'Active Projects',
                  description: 'Current luxury projects in various stages of design and execution'
                }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.15,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  className="text-center"
                >
                  <div className="relative">
                    <motion.div 
                      className="text-5xl md:text-6xl font-bold mb-4 font-serif tabular-nums"
                      style={{ color: '#D4AF37' }}
                      whileInView={{ scale: [0.8, 1.05, 1] }}
                      transition={{ duration: 0.6, delay: index * 0.15 + 0.2 }}
                    >
                      <AnimatedCounter value={stat.number} suffix={stat.suffix} />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-3 font-serif tracking-wide" style={{ color: 'black' }}>
                      {stat.label}
                    </h3>
                    <p className="text-sm leading-relaxed font-sans px-4" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      {stat.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing Tagline - Mist Grey Background */}
        <section className="relative py-12 bg-mist-grey text-luxury-charcoal text-center overflow-hidden">
          {/* Subtle pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 20%, #D4AF37 1px, transparent 1px),
                radial-gradient(circle at 80% 20%, #D4AF37 1px, transparent 1px),
                radial-gradient(circle at 20% 80%, #D4AF37 1px, transparent 1px),
                radial-gradient(circle at 80% 80%, #D4AF37 1px, transparent 1px),
                radial-gradient(circle at 50% 50%, #D4AF37 0.5px, transparent 0.5px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
          <div className="container-luxury relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-luxury-charcoal tracking-wide">
                <em>Designers who begin with the end in mind</em>
              </h2>
              {/* <button
                onClick={handleHireUsClick}
                className="bg-clay-peach hover:bg-terracotta-blush text-white px-12 py-4 rounded-lg font-semibold text-lg font-sans transition-all duration-300 shadow-luxury-soft hover:shadow-luxury-strong transform hover:scale-105"
              >
                Bring Your Vision to Life
              </button> */}
            </motion.div>
          </div>
        </section>

        {/* Portfolio Teaser - Clay Peach Background */}
        <section className="relative bg-clay-peach overflow-hidden">
          {/* Subtle pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 20%, #D4AF37 1px, transparent 1px),
                radial-gradient(circle at 80% 20%, #D4AF37 1px, transparent 1px),
                radial-gradient(circle at 20% 80%, #D4AF37 1px, transparent 1px),
                radial-gradient(circle at 80% 80%, #D4AF37 1px, transparent 1px),
                radial-gradient(circle at 50% 50%, #D4AF37 0.5px, transparent 0.5px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
          <div className="relative z-10">
            <PortfolioTeaser />
          </div>
        </section>

        {/* Inside the Design Section - Pale Oat Background */}
        {/* <section className="relative py-12 bg-pale-oat overflow-hidden">
          
          <div 
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 20%, #D4AF37 1px, transparent 1px),
                radial-gradient(circle at 80% 20%, #D4AF37 1px, transparent 1px),
                radial-gradient(circle at 20% 80%, #D4AF37 1px, transparent 1px),
                radial-gradient(circle at 80% 80%, #D4AF37 1px, transparent 1px),
                radial-gradient(circle at 50% 50%, #D4AF37 0.5px, transparent 0.5px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
          
          <div className="container-luxury relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-luxury-charcoal tracking-wide">
                  This is How We Think About <span className="text-luxury-gold">Your Space...</span>
                </h2>
                <div className="space-y-6 text-lg text-luxury-charcoal/80 leading-relaxed font-sans">
                  <p>
                    Get a behind-the-scenes look at our design philosophy—from space planning and layout, to colour palettes, furniture, and material selections. Every element is chosen with intention, crafting a home that reflects your personality and elevates your lifestyle.
                  </p>
                  <p className="text-soft-sage font-medium italic">
                    See how we design with you in mind...
                  </p>
                </div>
                
                <div className="mt-8">
                  <a
                    href="/inside-the-design"
                    className="inline-flex items-center space-x-2 bg-clay-peach hover:bg-terracotta-blush text-white px-8 py-4 rounded-lg font-medium font-sans transition-all duration-300 shadow-luxury-soft hover:shadow-luxury-strong transform hover:scale-105"
                  >
                    <span>Visit Inside the Design</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-luxury-soft">
                  <Image
                    src={`${GITHUB_CDN_BASE}/about/28.jpeg`}
                    alt="OliveHaus design process visualization"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="mt-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-luxury-soft border-l-4 border-clay-peach">
                  <p className="text-sm text-luxury-charcoal font-medium font-sans">
                    <span className="text-luxury-gold">Annotation:</span> Every element is chosen with intention to create spaces that reflect your unique personality and elevate your lifestyle.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section> */}

        {/* Testimonial Section - Light Primrose Background */}
        <section className="relative bg-light-primrose overflow-hidden">
          {/* Subtle pattern */}
          <div 
            className="absolute inset-0 opacity-[0.015] pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 20%, #D4AF37 1px, transparent 1px),
                radial-gradient(circle at 80% 20%, #D4AF37 1px, transparent 1px),
                radial-gradient(circle at 20% 80%, #D4AF37 1px, transparent 1px),
                radial-gradient(circle at 80% 80%, #D4AF37 1px, transparent 1px),
                radial-gradient(circle at 50% 50%, #D4AF37 0.5px, transparent 0.5px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
          <div className="relative z-10">
            <TestimonialSection />
          </div>
        </section>
      </div>
    </>
  );
}