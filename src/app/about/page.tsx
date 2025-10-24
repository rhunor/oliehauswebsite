'use client';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
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

const slideInLeftVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: -80 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.9, 
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const slideInRightVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: 80 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.9, 
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const scaleUpVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.85
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.9, 
      ease: [0.6, -0.05, 0.01, 0.99]
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

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax effect for full-bleed overlay cards
  const fullBleedOverlayY = useTransform(scrollYProgress, [0.25, 0.7], [20, -20]);

  const handleExperienceClick = (): void => {
    window.location.href = '/contact';
  };

  return (
    <div className="min-h-screen bg-white" ref={containerRef}>
      
      {/* Top Header */}
      <section className="pt-24 md:pt-32 pb-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeInUpVariants}
          className="container-luxury"
        >
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-wide text-luxury-heading">
            ABOUT <span className="text-luxury-gold">US</span>
          </h1>
        </motion.div>
      </section>

      {/* Full-bleed Hero with centered overlay card */}
      <section className="relative h-[60vh] md:h-[72vh] lg:h-[78vh] overflow-hidden">
                <Image
          src={`${GITHUB_CDN_BASE}/images/hero/3.webp`}
          alt="Warm contemporary kitchen interior"
                  fill
          priority
                  className="object-cover"
          sizes="100vw"
                />
            <motion.div 
          style={{ y: fullBleedOverlayY }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={scaleUpVariants}
          className="absolute inset-0 flex items-center justify-center p-4"
        >
          <div className="max-w-3xl w-full bg-white/95 backdrop-blur-sm border border-black/10 rounded-lg shadow-2xl p-6 md:p-10 text-center">
            <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-luxury-slate/70 mb-3">
              Philosophy
            </p>
            <p className="text-luxury-slate text-base md:text-lg leading-relaxed">
              OliveHaus Interiors is Nigeria&apos;s leading premier luxury interior design and renovation company, serving discerning residential, corporate, and commercial clients in Nigeria and internationally. We specialize in bespoke, timeless, and functional spaces tailored for clients with a taste for discreet elegance and refined luxury.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Bordered “Meet OliveHaus” card with portrait */}
      <section className="py-16 md:py-24">
        <div className="container-luxury">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainerVariants}
            className="mx-auto bg-white border border-black/10 rounded-lg shadow-xl px-4 py-6 md:p-10"
          >
            <motion.p variants={fadeInVariants} className="text-center uppercase tracking-[0.3em] text-xs md:text-sm text-luxury-slate/70 mb-6">
              Meet OliveHaus
            </motion.p>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <motion.div variants={slideInLeftVariants} className="order-2 md:order-1">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-luxury-heading mb-4">Our Story</h3>
                <div className="space-y-5 text-base md:text-lg text-luxury-slate leading-relaxed">
                <p>
                  OliveHaus Interiors is Nigeria&apos;s leading premier luxury interior design and renovation company, serving discerning residential, corporate, and commercial clients in Nigeria and internationally. We specialize in bespoke, timeless, and functional spaces tailored for clients with a taste for discreet elegance and refined luxury.
                </p>
                <p>
                  From high-end holiday homes and exclusive residences to modern commercial spaces such as wellness centers, ultra-modern spas, and status-defining offices, we craft environments that inspire, endure, and elevate.
                </p>
                </div>
              </motion.div>
              <motion.div variants={slideInRightVariants} className="order-1 md:order-2">
                <div className="relative h-72 md:h-80 lg:h-96 rounded-md overflow-hidden shadow-lg">
                  <Image
                    src={`${GITHUB_CDN_BASE}/images/hero/2.webp`}
                    alt="Founder portrait"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Three‑image strip */}
      <section className="py-6 md:py-10">
        <div className="container-luxury">
            <motion.div
              initial="hidden"
              whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainerVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {[
              `${GITHUB_CDN_BASE}/images/hero/5.webp`,
              `${GITHUB_CDN_BASE}/images/hero/6.webp`,
              `${GITHUB_CDN_BASE}/images/hero/7.webp`
            ].map((src, index) => (
              <motion.div key={src} variants={fadeInUpVariants} className="relative h-52 md:h-64 lg:h-72 rounded-md overflow-hidden shadow-md">
                <Image src={src} alt={`Project ${index + 1}`} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 33vw" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Experience - full‑bleed with centered overlay */}
      <section className="relative h-[60vh] md:h-[70vh] lg:h-[76vh] my-10 md:my-16 overflow-hidden">
        <Image
          src={`${GITHUB_CDN_BASE}/images/hero/2.webp`}
          alt="Grand staircase and living area"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <motion.div
          style={{ y: fullBleedOverlayY }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={scaleUpVariants}
          className="absolute inset-0 flex items-center justify-center p-4"
        >
          <div className="max-w-3xl w-full bg-white/95 backdrop-blur-sm border border-black/10 rounded-lg shadow-2xl p-6 md:p-10 text-center">
            <p className="uppercase tracking-[0.3em] text-xs md:text-sm text-luxury-slate/70 mb-3">Our Experience</p>
            <div className="text-luxury-slate text-base md:text-lg leading-relaxed space-y-4">
              <p>
                Trusted by homeowners, property investors, and Nigeria&apos;s elite from Lagos (Lekki, Ikoyi, Victoria Island, Maryland) to Abuja, Port Harcourt, and beyond we have completed more than 1,000 projects to date. Each space reflects our commitment to exceptional craftsmanship, meticulous attention to detail, and stress-free project management.
              </p>
              <p>
                With daily updates, personalized solutions, and access to a dedicated design consultant, every client experiences a seamless journey from vision to completion. For diaspora clients, our proven remote oversight ensures the same uncompromising standard of excellence, wherever they are in the world.
                </p>
              </div>
          </div>
        </motion.div>
      </section>

      {/* Mission (full‑bleed) */}
      <section className="relative h-[55vh] md:h-[64vh] lg:h-[70vh] overflow-hidden">
                <Image
          src={`${GITHUB_CDN_BASE}/images/hero/1.webp`}
          alt="Soft light living room"
                  fill
                  className="object-cover"
          sizes="100vw"
                />
            <motion.div
          style={{ y: fullBleedOverlayY }}
              initial="hidden"
              whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={scaleUpVariants}
          className="absolute inset-0 flex items-center justify-center p-4"
        >
          <div className="max-w-2xl w-full bg-white/95 backdrop-blur-sm border border-black/10 rounded-lg shadow-2xl p-6 md:p-10 text-center">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-luxury-heading mb-4">Our Mission</h3>
            <p className="text-luxury-slate text-base md:text-lg leading-relaxed">
                  To be a global brand known for creating personalized interior environments that increase productivity and overall quality of life.
                </p>
              </div>
        </motion.div>
      </section>

      {/* Vision (full‑bleed) */}
      <section className="relative h-[55vh] md:h-[64vh] lg:h-[70vh] overflow-hidden">
                <Image
          src={`${GITHUB_CDN_BASE}/images/hero/6.webp`}
          alt="Refined contemporary bedroom"
                  fill
                  className="object-cover"
          sizes="100vw"
        />
        <motion.div
          style={{ y: fullBleedOverlayY }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={scaleUpVariants}
          className="absolute inset-0 flex items-center justify-center p-4"
        >
          <div className="max-w-2xl w-full bg-white/95 backdrop-blur-sm border border-black/10 rounded-lg shadow-2xl p-6 md:p-10 text-center">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-luxury-heading mb-4">Our Vision</h3>
            <p className="text-luxury-slate text-base md:text-lg leading-relaxed">
              To be a global brand known for creating personalized interior environments that increase productivity and overall quality of life.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Tagline Section with Image */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#f8f6f3] to-white relative overflow-hidden">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUpVariants}
              className="text-center lg:text-left px-4 md:px-0"
            >
              <p className="font-serif text-3xl md:text-4xl lg:text-5xl italic text-luxury-heading leading-tight">
                Timeless luxury, for everyday comfort…
              </p>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={scaleUpVariants}
              className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-xl"
            >
              <Image
                src={`${GITHUB_CDN_BASE}/images/hero/6.webp`}
                alt="Timeless luxury interiors"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Closing CTA Section - Founder Style */}
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
              className="font-serif text-sm md:text-base uppercase tracking-[0.3em] text-luxury-gold mb-6"
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
              className="inline-block bg-luxury-gold text-luxury-charcoal font-semibold text-base md:text-lg px-10 md:px-14 py-4 md:py-5 rounded-sm hover:bg-luxury-gold/90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Experience Our Promise
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
