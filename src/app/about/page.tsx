'use client';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import AnimatedUnderline from '@/components/ui/AnimatedUnderline';

// GitHub CDN base URL for images
const GITHUB_CDN_BASE = "https://cdn.jsdelivr.net/gh/rhunor/olivehausimages@main";

// Properly typed animation variants
const fadeInUpVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 60 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const fadeInVariants: Variants = {
  hidden: { 
    opacity: 0
  },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 1, 
      ease: "easeOut" 
    }
  }
};

const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const collageItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function AboutPage() {
  const aboutRef = useRef<HTMLDivElement>(null);

  const handleScrollToAbout = (): void => {
    aboutRef.current?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  };

  const handleExperienceClick = (): void => {
    window.location.href = '/contact';
  };

  // Collage images data
  const collageImages = [1, 2, 3, 4, 5].map((i) => ({
    src: `${GITHUB_CDN_BASE}/images/hero/${i}.webp`,
    alt: `Interior design collage image ${i}`
  }));

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section with Overlay Text and Scroll Arrow */}
      <section className="relative h-screen overflow-hidden">
        <Image
          src={`${GITHUB_CDN_BASE}/images/hero/1.webp`}
          alt="Luxury living room interior"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/20" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeInVariants}
          className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4"
        >
          <h1 className="font-serif text-2xl md:text-4xl lg:text-6xl font-bold tracking-wide mb-8">
            Who we are 
          </h1>
          <motion.button
            onClick={handleScrollToAbout}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="p-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-300"
            aria-label="Scroll to about section"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                d="M12 5L12 19M12 19L8 15M12 19L16 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </motion.div>
      </section>

      {/* Top Header */}
      <section className="pt-16 md:pt-24 pb-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeInUpVariants}
          className="container-luxury"
        >
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-wide text-luxury-heading">
            ABOUT <span className="text-luxury-charcoal">US</span>
          </h1>
        </motion.div>
      </section>

      {/* Main About Section: Text left, Image right on desktop; stacked on mobile */}
      <section ref={aboutRef} className="py-16 md:py-24">
        <div className="container-luxury">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start"
          >
            <motion.div variants={fadeInVariants} className="space-y-6 text-luxury-slate leading-relaxed">
              <p className="text-base md:text-lg">
                OliveHaus Interiors is Nigeria’s leading premier luxury interior design and renovation company, serving discerning residential, corporate, and commercial clients in Nigeria and internationally. We specialize in bespoke, timeless, and functional spaces tailored for clients with a taste for discreet elegance and refined luxury. From high-end holiday homes and exclusive residences to modern commercial spaces such as wellness centers, ultra-modern spas, and status-defining offices, we craft environments that inspire, endure, and elevate. 
              </p>
              <p className="text-base md:text-lg">
                Trusted by homeowners, property investors, and Nigeria’s elite — from Lagos (Lekki, Ikoyi, Victoria Island, Maryland) to Abuja, Port Harcourt, and beyond — we have completed more than 1,000 projects to date. Each space reflects our commitment to exceptional craftsmanship, meticulous attention to detail, and stress-free project management. With daily updates, personalized solutions, and access to a dedicated design consultant, every client experiences a seamless journey from vision to completion. For diaspora clients, our proven remote oversight ensures the same uncompromising standard of excellence, wherever they are in the world.
              </p>
            </motion.div>
            <motion.div 
              variants={fadeInVariants} 
              className="relative h-80 md:h-96 rounded-md overflow-hidden shadow-lg order-first md:order-none"
            >
              <Image
                src={`${GITHUB_CDN_BASE}/images/hero/2.webp`}
                alt="OliveHaus founder portrait"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-luxury">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUpVariants}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-luxury-heading mb-6">
              Our Vision
            </h2>
            <p className="text-luxury-slate text-base md:text-lg leading-relaxed">
              To be a global brand known for creating personalized interior environments that increase productivity and overall quality of life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-luxury">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUpVariants}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-luxury-heading mb-6">
              Our Mission
            </h2>
            <p className="text-luxury-slate text-base md:text-lg leading-relaxed">
              To create and implement personalized designs using materials that will give the best user experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Lateral Photo Collage Section */}
      <section className="py-8 md:py-16 bg-white">
        <div className="container-luxury">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainerVariants}
            className="relative"
          >
            {/* Collage Container - Responsive horizontal layout */}
            <div className="flex overflow-x-auto md:overflow-visible h-48 md:h-64 lg:h-80 snap-x snap-mandatory md:snap-none scrollbar-hide px-2 md:px-0">
              {collageImages.map((img, index) => (
                <motion.div
                  key={index}
                  variants={collageItemVariants}
                  className="flex-shrink-0 md:flex-1 relative snap-center w-64 md:w-auto h-full border border-white/20"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 20vw"
                  />
                </motion.div>
              ))}
            </div>
            {/* Overlay Text - Centered Follow Instagram Prompt */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            >
              {/* <div className="bg-white/80 md:bg-white/90 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 rounded-md inline-block">
                <p className="font-serif text-sm md:text-base font-medium text-luxury-slate mb-1">
                  Follow us on Instagram
                </p>
                <p className="text-xs md:text-sm font-bold text-luxury-charcoal">
                  @olivehaus
                </p>
              </div> */}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Closing CTA Section - Founder Style (Unchanged) */}
      <section className="py-20 md:py-28 bg-luxury-charcoal text-white text-center relative overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-5">
          <Image
            src={`${GITHUB_CDN_BASE}/images/hero/7.webp`}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        {/* Contrast overlay for readability over photo */}
        <div className="absolute inset-0 bg-black/35" />

        <div className="container-luxury relative z-10 px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUpVariants}
            className="max-w-4xl mx-auto"
          >
            <AnimatedUnderline 
              className="font-serif text-sm md:text-base uppercase tracking-[0.3em] text-white mb-6"
              underlineColor="#D4AF37"
              underlineHeight={3}
              animationDuration={1.2}
              delay={0.3}
            >
              Our Promise
            </AnimatedUnderline>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 md:mb-12 leading-tight">
              At OliveHaus Interiors, we design for high-quality living.
            </h2>
            <motion.button
              onClick={handleExperienceClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-luxury-gold text-white font-semibold text-base md:text-lg px-10 md:px-14 py-4 md:py-5 rounded-sm hover:bg-luxury-gold/90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Experience Our Promise
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}