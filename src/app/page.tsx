//src/app/page.tsx - Updated with Cloudinary video URL
'use client';

import Navigation from '@/components/ui/Navigation';
import HeroSection from '@/components/ui/HeroSection';
import PortfolioTeaser from '@/components/ui/PortfolioTeaser';
import TestimonialSection from '@/components/ui/TestimonialSection';
import { motion } from 'framer-motion';

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

// Updated hero images
const heroImages: HeroImage[] = [
  {
    src: '/images/hero/1.webp',
    alt: 'Elegant luxury living room with contemporary furniture and sophisticated lighting',
    title: 'Luxury Living Spaces',
    subtitle: 'Timeless elegance meets modern comfort'
  },
  {
    src: '/images/hero/2.webp',
    alt: 'Modern luxury kitchen with premium finishes and state-of-the-art appliances',
    title: 'Gourmet Kitchens',
    subtitle: 'Where culinary dreams come to life'
  },
   {
    src: '/images/hero/3.webp',
    alt: 'Modern luxury kitchen with premium finishes and state-of-the-art appliances',
    title: 'Gourmet Kitchens',
    subtitle: 'Where culinary dreams come to life'
  },
  {
    src: '/images/hero/4.webp',
    alt: 'Serene master bedroom with custom millwork and luxury bedding',
    title: 'Tranquil Bedrooms',
    subtitle: 'Your personal sanctuary of comfort'
  },
   {
    src: '/images/hero/5.webp',
    alt: 'Serene master bedroom with custom millwork and luxury bedding',
    title: 'Tranquil Bedrooms',
    subtitle: 'Your personal sanctuary of comfort'
  },
   {
    src: '/images/hero/6.webp',
    alt: 'Serene master bedroom with custom millwork and luxury bedding',
    title: 'Tranquil Bedrooms',
    subtitle: 'Your personal sanctuary of comfort'
  },
   {
    src: '/images/hero/7.webp',
    alt: 'Serene master bedroom with custom millwork and luxury bedding',
    title: 'Tranquil Bedrooms',
    subtitle: 'Your personal sanctuary of comfort'
  },
   {
    src: '/images/hero/8.webp',
    alt: 'Serene master bedroom with custom millwork and luxury bedding',
    title: 'Tranquil Bedrooms',
    subtitle: 'Your personal sanctuary of comfort'
  },
   {
    src: '/images/hero/9.webp',
    alt: 'Serene master bedroom with custom millwork and luxury bedding',
    title: 'Tranquil Bedrooms',
    subtitle: 'Your personal sanctuary of comfort'
  },
   {
    src: '/images/hero/10.webp',
    alt: 'Serene master bedroom with custom millwork and luxury bedding',
    title: 'Tranquil Bedrooms',
    subtitle: 'Your personal sanctuary of comfort'
  },
   {
    src: '/images/hero/3.webp',
    alt: 'Serene master bedroom with custom millwork and luxury bedding',
    title: 'Tranquil Bedrooms',
    subtitle: 'Your personal sanctuary of comfort'
  },
   {
    src: '/images/hero/11.webp',
    alt: 'Serene master bedroom with custom millwork and luxury bedding',
    title: 'Tranquil Bedrooms',
    subtitle: 'Your personal sanctuary of comfort'
  },
   {
    src: '/images/hero/12.webp',
    alt: 'Serene master bedroom with custom millwork and luxury bedding',
    title: 'Tranquil Bedrooms',
    subtitle: 'Your personal sanctuary of comfort'
  },
   {
    src: '/images/hero/13.webp',
    alt: 'Serene master bedroom with custom millwork and luxury bedding',
    title: 'Tranquil Bedrooms',
    subtitle: 'Your personal sanctuary of comfort'
  },
   {
    src: '/images/hero/14.webp',
    alt: 'Serene master bedroom with custom millwork and luxury bedding',
    title: 'Tranquil Bedrooms',
    subtitle: 'Your personal sanctuary of comfort'
  },
   {
    src: '/images/hero/15.webp',
    alt: 'Serene master bedroom with custom millwork and luxury bedding',
    title: 'Tranquil Bedrooms',
    subtitle: 'Your personal sanctuary of comfort'
  },
];

// Updated video content with vimeo URL
const videoContent: VideoContent = {
  thumbnailSrc: '/images/video/portfolio-thumbnail.jpg',
  // Vimeo video URL format
  videoSrc: 'https://vimeo.com/1116723569',
  title: 'OliveHaus Portfolio Showcase',
  description: 'Discover our luxury interior design process'
};

export default function HomePage() {
  const handleHireUsClick = (): void => {
    window.location.href = '/contact';
  };

  return (
    <div className="min-h-screen">
      <Navigation onHireUsClick={handleHireUsClick} />

      <HeroSection
        images={heroImages}
        video={videoContent}
        tagline={{
          main: 'Design for High Quality Living',
          sub: ''
        }}
        onHireUsClick={handleHireUsClick}
      />

      {/* About Us Section */}
      <section className="py-20 bg-ivory">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-luxury-heading text-4xl md:text-5xl font-bold mb-6">
                For Nigeria&apos;s <span className="text-luxury-gold">Finest Homes</span>
              </h2>
              <div className="space-y-6 text-lg text-luxury-slate leading-relaxed">
                <p>
                  OliveHaus Interiors is a premier interior design company serving luxury residential, corporate, and commercial clients in Nigeria and internationally. We specialize in creating bespoke, timeless, and functional spaces for discerning clients.
                </p>
                <p>
                  Our design process emphasizes luxurious personalized solutions, exceptional project management, and remote oversight for diaspora clients.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden"
            >
              <div className="w-full h-full bg-luxury-platinum/30 flex items-center justify-center">
                <span className="text-luxury-slate">About Us Image</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Rest of your sections remain the same */}
      {/* We Stand Out Section */}
      <section className="py-20 bg-luxury-cream">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-luxury-heading text-4xl md:text-5xl font-bold mb-6">
              We Stand <span className="text-luxury-gold">Out</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Seamless Project Experience',
                description: 'Flawless client experience, before, during and after project execution',
                icon: '✨'
              },
              {
                title: 'Design for High-Quality Living',
                description: 'Luxurious, personalized interiors that tastefully blend functionality with timeless aesthetics.',
                icon: '🏛️'
              },
              {
                title: 'Stress-free Project Oversight',
                description: 'Stay in control from anywhere in the world with our Daily Manager Platform Updates—track progress, reports, and updates at your convenience',
                icon: '📱'
              },
              {
                title: 'Constant Team Support',
                description: 'A responsive, detail-driven team ensures your vision is executed to perfection.',
                icon: '🤝'
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white p-8 rounded-lg shadow-luxury-soft hover:shadow-luxury-strong transition-all duration-300"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-luxury-heading text-xl font-bold mb-4">
                  {value.title}
                </h3>
                <p className="text-luxury-slate leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Track Record Section */}
      <section className="py-20 bg-luxury-charcoal text-white">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our Track <span className="text-luxury-gold">Record</span>
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Numbers that speak of our commitment to luxury, quality, and client satisfaction across every project we undertake.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                number: '150+',
                label: 'Luxury Spaces',
                description: 'Exquisitely designed and completed projects across Nigeria'
              },
              {
                number: '200+',
                label: 'Satisfied Clients',
                description: 'Esteemed individuals who trust us with their luxury spaces'
              },
              {
                number: '12+',
                label: 'Years of Experience',
                description: 'Years of expertise in luxury interior design and project'
              },
              {
                number: '25',
                label: 'Active Projects',
                description: 'Current luxury projects in various stages of design and execution'
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-bold text-luxury-gold mb-4">
                  {stat.number}
                </div>
                <h3 className="text-xl font-bold mb-2">{stat.label}</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PortfolioTeaser />

      {/* Inside the Design Section */}
      <section className="py-20 bg-ivory">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-luxury-heading text-4xl md:text-5xl font-bold mb-6">
                This is How We Think About <span className="text-luxury-gold">Your Space</span>
              </h2>
              <div className="space-y-6 text-lg text-luxury-slate leading-relaxed">
                <p>
                  Get a behind-the-scenes look at our design philosophy—from space planning and layout, to colour palettes, furniture, and material selections. Every element is chosen with intention, crafting a home that reflects your personality and elevates your lifestyle.
                </p>
                <p>
                  <em>See how we design with you in mind...</em>
                </p>
              </div>
              
              <div className="mt-8">
                <a
                  href="/inside-the-design"
                  className="btn-luxury-outline inline-flex items-center space-x-2"
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
              <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
                <div className="w-full h-full bg-luxury-platinum/30 flex items-center justify-center">
                  <span className="text-luxury-slate">Design Process Image</span>
                </div>
              </div>
              <div className="mt-4 bg-white p-4 rounded-lg shadow-luxury-soft">
                <p className="text-sm text-luxury-charcoal font-medium">
                  Annotation: Every element is chosen with intention to create spaces that reflect your unique personality and elevate your lifestyle.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <TestimonialSection />

      {/* Closing Tagline */}
      <section className="py-20 bg-luxury-charcoal text-white text-center">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
              <em>Designers who begin with the end in mind</em>
            </h2>
            <button
              onClick={handleHireUsClick}
              className="btn-luxury text-lg px-12 py-4"
            >
              Bring Your Vision to Life
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}