'use client';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
// import LuxuryWavePattern from '@/components/ui/LuxuryWavePattern';



// GitHub CDN base URL for images
const GITHUB_CDN_BASE = "https://cdn.jsdelivr.net/gh/rhunor/olivehausimages@main";



// Use a const object with known keys to avoid undefined issues
const aboutImages = {
  hero: [
    { src: `${GITHUB_CDN_BASE}/images/hero/1.webp`, alt: "Luxury interior design", width: 600, height: 400, shape: 'rounded' as const },
    { src: `${GITHUB_CDN_BASE}/images/hero/2.webp`, alt: "Modern living space", width: 500, height: 500, shape: 'oval' as const }
  ],
  story: [
    { src: `${GITHUB_CDN_BASE}/images/hero/3.webp`, alt: "Designer workspace", width: 500, height: 600, shape: 'square' as const },
    { src: `${GITHUB_CDN_BASE}/images/hero/4.webp`, alt: "Team collaboration", width: 400, height: 400, shape: 'oval' as const }
  ],
  mission: [
    { src: `${GITHUB_CDN_BASE}/images/hero/5.webp`, alt: "Office interior", width: 550, height: 450, shape: 'rounded' as const },
    { src: `${GITHUB_CDN_BASE}/images/hero/6.webp`, alt: "Creative space", width: 450, height: 550, shape: 'square' as const }
  ]
} as const;



// Properly typed animation variants using Framer Motion's Variants type
const fadeInUpVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: "easeOut" 
    }
  }
};

const slideInLeftVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: -100 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 1, 
      ease: "easeOut" 
    }
  }
};

const slideInRightVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: 100 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 1, 
      ease: "easeOut" 
    }
  }
};

const scaleUpVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.8, 
      ease: "easeOut" 
    }
  }
};

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax effects for images
  const heroParallax = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const storyParallax = useTransform(scrollYProgress, [0.2, 0.5], [0, -30]);
  
  const handleHireUsClick = (): void => {
    window.location.href = '/contact';
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#C8D1C0' }} ref={containerRef}>
      
      {/* Hero Section with scroll animations */}
      <section className="pt-32 pb-20 bg-luxury-charcoal text-white relative overflow-hidden">
        <div className="container-luxury relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              For Nigeria&apos;s
              <span className="text-luxury-gold block mt-2">Finest Homes</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl text-white/90 leading-relaxed"
            >
              OliveHaus Interiors is a premier interior design company serving luxury residential, corporate, and commercial clients in Nigeria and internationally.
            </motion.p>
          </div>
          
          {/* Hero Images with animations */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div 
              style={{ y: heroParallax }}
              className="absolute top-20 left-10 hidden lg:block"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="relative w-64 h-64 rounded-full overflow-hidden"
              >
                <Image
                  src={aboutImages.hero[0].src}
                  alt={aboutImages.hero[0].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 256px"
                />
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="absolute bottom-10 right-10 hidden lg:block"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 0.2, x: 0 }}
              transition={{ duration: 1.5, delay: 0.8 }}
            >
              <div className="relative w-72 h-48 rounded-lg overflow-hidden">
                <Image
                  src={aboutImages.hero[1].src}
                  alt={aboutImages.hero[1].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 288px"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Us Main Content */}
      <section className="py-20 relative">
        <div className="container-luxury">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUpVariants}
            className="max-w-5xl mx-auto mb-20"
          >
            <h2 className="text-luxury-heading text-4xl md:text-5xl font-bold mb-8 text-center">
              ABOUT <span className="text-luxury-gold">US</span>
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                variants={slideInLeftVariants}
                className="space-y-6 text-lg text-luxury-slate leading-relaxed"
              >
                <p>
                  OliveHaus Interiors is Nigeria&apos;s leading premier luxury interior design and renovation company, serving discerning residential, corporate, and commercial clients in Nigeria and internationally. We specialize in bespoke, timeless, and functional spaces tailored for clients with a taste for discreet elegance and refined luxury.
                </p>
                <p>
                  From high-end holiday homes and exclusive residences to modern commercial spaces such as wellness centers, ultra-modern spas, and status-defining offices, we craft environments that inspire, endure, and elevate.
                </p>
              </motion.div>
              
              <motion.div 
                variants={slideInRightVariants}
                className="relative grid grid-cols-2 gap-4"
              >
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src={aboutImages.story[0].src}
                    alt={aboutImages.story[0].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <div className="relative h-64 rounded-full overflow-hidden mt-8">
                  <Image
                    src={aboutImages.story[1].src}
                    alt={aboutImages.story[1].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
              </motion.div>
            </div>

            {/* <motion.div
              variants={fadeInUpVariants}
              className="mt-12 space-y-6 text-lg text-luxury-slate leading-relaxed"
            >
            
            </motion.div> */}
          </motion.div>

          {/* Mission & Vision with Images */}
          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideInLeftVariants}
              className="relative"
            >
              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-xl relative z-10">
                <h3 className="text-luxury-heading text-2xl font-bold mb-4">
                  Our <span className="text-luxury-gold">Mission</span>
                </h3>
                <p className="text-luxury-slate leading-relaxed">
                  To be a global brand known for creating personalized interior environments that increase productivity and overall quality of life.
                </p>
              </div>
              <motion.div 
                style={{ y: storyParallax }}
                className="absolute -top-10 -right-10 w-48 h-48 rounded-full overflow-hidden opacity-50"
              >
                <Image
                  src={aboutImages.mission[0].src}
                  alt={aboutImages.mission[0].alt}
                  fill
                  className="object-cover"
                  sizes="192px"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideInRightVariants}
              className="relative"
            >
              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-xl relative z-10">
                <h3 className="text-luxury-heading text-2xl font-bold mb-4">
                  Our <span className="text-luxury-gold">Vision</span>
                </h3>
                <p className="text-luxury-slate leading-relaxed">
                  To be a global brand known for creating personalized interior environments that increase productivity and overall quality of life.
                </p>
              </div>
              <motion.div 
                className="absolute -bottom-10 -left-10 w-56 h-56 rounded-lg overflow-hidden opacity-50"
              >
                <Image
                  src={aboutImages.mission[1].src}
                  alt={aboutImages.mission[1].alt}
                  fill
                  className="object-cover"
                  sizes="224px"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-20">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideInLeftVariants}
            >
              {/* <h2 className="text-luxury-heading text-4xl md:text-5xl font-bold mb-6">
                Our <span className="text-luxury-gold">Story</span>
              </h2> */}
              <div className="space-y-6 text-lg text-luxury-slate leading-relaxed">
                  <p>
                Trusted by homeowners, property investors, and Nigeria&apos;s elite from Lagos (Lekki, Ikoyi, Victoria Island, Maryland) to Abuja, Port Harcourt, and beyond we have completed more than 1,000 projects to date. Each space reflects our commitment to exceptional craftsmanship, meticulous attention to detail, and stress-free project management.
              </p>
              <p>
                With daily updates, personalized solutions, and access to a dedicated design consultant, every client experiences a seamless journey from vision to completion. For diaspora clients, our proven remote oversight ensures the same uncompromising standard of excellence, wherever they are in the world.
              </p>
              {/* <p className="font-semibold text-xl text-luxury-heading">
               
              </p> */}
                {/* <p>
                  We specialize in creating bespoke, timeless, and functional spaces for discerning clients. Our design process emphasizes luxurious personalized solutions, exceptional project management, and remote oversight for diaspora clients.
                </p>
                <p>
                  With over 12 years of experience in the luxury interior design industry, we have established ourselves as the go-to firm for Nigeria&apos;s elite and international clientele seeking exceptional design solutions.
                </p>
                <p>
                  Our philosophy is simple: <em>&apos;Designers who begin with the end in mind.&apos;</em> Every project we undertake is crafted with meticulous attention to detail and a deep understanding of our clients&apos; unique lifestyles and preferences.
                </p> */}
              </div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={scaleUpVariants}
              className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden"
            >
              <Image
                src={`${GITHUB_CDN_BASE}/images/hero/7.webp`}
                alt="OliveHaus team at work"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* We Stand Out Section - White background with unique wave pattern
              <section className="relative pt-12 pb-0 overflow-hidden">
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
                        className=" backdrop-blur-sm p-8 rounded-lg shadow-luxury-soft hover:shadow-luxury-strong transition-all duration-300"
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
       */}

      {/* Tagline Section */}
      <section className="py-16 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUpVariants}
          className="container-luxury"
        >
          <p className="font-serif text-3xl md:text-4xl italic text-luxury-heading mb-12">
            Timeless luxury, for everyday comfort…
          </p>
        </motion.div>
      </section>

      {/* Closing CTA Section */}
      <section className="py-20 bg-luxury-charcoal text-white text-center">
        <div className="container-luxury">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUpVariants}
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
              <em> At OliveHaus Interiors, we design for high-quality living.</em>
            </h2>
            <motion.button
              onClick={handleHireUsClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-luxury-gold btn-luxury text-lg px-12 py-4"
            >
              Experience our promise
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}