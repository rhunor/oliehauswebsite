'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import Image from 'next/image';
import { 
  ChevronRight,
  Phone,
  Home,
  Pencil,
  Hammer,
  BarChart3,
  Sparkles
} from 'lucide-react';

// GitHub CDN base URL for images
const GITHUB_CDN_BASE = "https://cdn.jsdelivr.net/gh/rhunor/olivehausimages@main";

// Service interface
interface Service {
  title: string;
  description: string;
}

// Service image interface
interface ServiceImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// Images configuration with const assertion
const serviceImages = [
  {
    src: `${GITHUB_CDN_BASE}/images/hero/13.webp`,
    alt: "Luxury interior design showcase",
    width: 1920,
    height: 800
  },
  {
    src: `${GITHUB_CDN_BASE}/images/hero/14.webp`,
    alt: "Modern living space",
    width: 600,
    height: 400
  },
  {
    src: `${GITHUB_CDN_BASE}/images/hero/15.webp`,
    alt: "Kitchen renovation",
    width: 500,
    height: 600
  },
  {
    src: `${GITHUB_CDN_BASE}/images/hero/16.webp`,
    alt: "Bathroom design",
    width: 700,
    height: 500
  },
  {
    src: `${GITHUB_CDN_BASE}/images/hero/17.webp`,
    alt: "Commercial space",
    width: 450,
    height: 450
  }
] as const;

// Updated services data matching provided write-up
const services: Service[] = [
  {
    title: 'Turnkey Renovation Solutions',
    description: 'We handle every stage of your renovation with the highest level of precision and discretion. From structural planning to the final reveal, we orchestrate the process so you enjoy a seamless transformation without the stress.'
  },
  {
    title: 'Bespoke Furnishing & Styling',
    description: 'We curate furnishings, art, and accessories that speak to your taste and lifestyle. Every piece is chosen to elevate your space and create an atmosphere of understated elegance and lasting comfort.'
  },
  {
    title: 'Accessibility-Focused Bathrooms',
    description: 'We design bathrooms that balance refined luxury with ease of use. By blending safety, comfort, and sophistication, we ensure these spaces are both practical and beautifully discreet.'
  },
  {
    title: 'Kitchen & Bathroom Remodeling',
    description: 'We reimagine kitchens and bathrooms into spaces that feel indulgent yet functional. With fine finishes, thoughtful layouts, and a focus on modern living, we deliver rooms that inspire daily enjoyment.'
  },
  {
    title: 'Completion of Unfinished & Semi-Finished Interiors',
    description: 'We take unfinished interiors and complete them to the highest standard. From bare walls to fully realized living spaces, we bring cohesion, polish, and luxury to every detail.'
  },
  {
    title: 'Shortlet Design & Set-Up',
    description: 'We design shortlet properties that command attention in a competitive market. Stylish, durable, and investment-focused, our interiors attract discerning guests and maximize your returns.'
  },
  {
    title: 'Shortlet Management Services',
    description: 'We manage your property with the same meticulous care that defines our design work. From guest relations to property upkeep, we safeguard your investment while ensuring an exceptional experience for every stay.'
  }
];

// Process step interface
interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Process steps with icons
const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Discovery Call',
    description: 'We understand your vision, requirements, and lifestyle needs through a detailed consultation.',
    icon: Phone
  },
  {
    step: '02',
    title: 'Site Assessment',
    description: 'Our team visits your property to evaluate its layout, structure, and potential, ensuring every design decision is grounded in accuracy and tailored to your space.',
    icon: Home
  },
  {
    step: '03',
    title: 'Design Development',
    description: 'We refine every detail from spatial layouts to materials, finishes, bespoke elements and 3D Renders.',
    icon: Pencil
  },
  {
    step: '04',
    title: 'Project Execution',
    description: 'We manage the project seamlessly, coordinating craftsmen, suppliers, and schedules.',
    icon: Hammer
  },
  {
    step: '05',
    title: 'Progress Updates',
    description: 'For international clients, we provide detailed remote progress updates and monitoring.',
    icon: BarChart3
  },
  {
    step: '06',
    title: 'Final Reveal',
    description: 'Your dream space, exquisitely executed and ready to welcome you home.',
    icon: Sparkles
  }
];

// Animation variants
const fadeInUpVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: "easeOut" 
    }
  }
};

// NumberFrame component for clipping image inside number
interface NumberFrameProps {
  number: string;
  imageSrc: string;
  alt: string;
}

function NumberFrame({ number, imageSrc, alt }: NumberFrameProps) {
  return (
    <motion.div
      className="relative w-full max-w-xs mx-auto lg:mx-0"
      initial={{ scale: 0.95, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{ height: 'clamp(200px, 30vw, 300px)' }}
    >
      <span
        className="block w-full h-full"
        style={{
          fontFamily: 'serif, Georgia, "Times New Roman", serif',
          fontSize: 'clamp(8rem, 20vw, 16rem)',
          fontWeight: 'bold',
          lineHeight: 1,
          textAlign: 'center',
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
          WebkitTextStroke: '3px #D4AF37',
          display: 'block',
        }}
        aria-label={alt}
        role="img"
      >
        {number}
      </span>
    </motion.div>
  );
}

// Process Card component for grid layout
interface ProcessCardProps {
  item: ProcessStep;
  index: number;
}

function ProcessCard({ item, index }: ProcessCardProps) {
  const Icon = item.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center text-center p-6 md:p-8"
    >
      {/* Icon Container */}
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-luxury-gold/10 flex items-center justify-center mb-6 transition-transform hover:scale-110">
        <Icon className="w-10 h-10 md:w-12 md:h-12 text-luxury-charcoal" />
      </div>

      {/* Step Number */}
      <div className="font-serif text-2xl md:text-3xl font-bold text-luxury-charcoal mb-3">
        {item.step}
      </div>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-semibold text-luxury-charcoal mb-4 tracking-wide">
        {item.title}
      </h3>

      {/* Description */}
      <p className="text-luxury-slate leading-relaxed text-sm md:text-base">
        {item.description}
      </p>
    </motion.div>
  );
}

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax effects
  const parallaxDistance = 100;
  const heroParallax = useTransform(scrollYProgress, [0, 0.3], [0, -parallaxDistance]);
  
  // Safe image access helper
  const getImage = (index: number): ServiceImage => {
    const clampedIndex = Math.max(0, Math.min(index, serviceImages.length - 1));
    return serviceImages[clampedIndex] as ServiceImage;
  };

  // Pre-fetch hero image to avoid re-calls in JSX
  const heroImage = getImage(0);

  return (
    <div className="min-h-screen bg-ivory" ref={containerRef}>
      
      {/* Hero Section with Full-Width Landscape Image */}
      <section className="relative h-screen m-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{ 
            y: heroParallax,
            height: `calc(100% + ${parallaxDistance}px)`
          }}
        >
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </motion.div>
        
        <div className="relative h-full flex items-center justify-center text-white">
          <div className="container-luxury text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
            >
              Our
              <span className="text-white block mt-2">Services</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto"
            >
              From vision to completion, we deliver world-class interiors that define refined living.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-8"
            >
              <ChevronRight className="w-8 h-8 mx-auto animate-bounce" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section - Number-Framed Images with Text */}
      <section className="pt-0 pb-20 relative m-0" style={{ backgroundColor: '#e8e7e6' }}>
        <div className="container-luxury max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
            className="text-center mb-20 mt-0"
          >
            <h2 className="text-luxury-heading text-4xl md:text-5xl font-bold mb-10 mt-0 py-25">
              OUR <span className="text-luxury-charcoal">SERVICES</span>
            </h2>
            {/* Decorative underline */}
            <div className="w-24 h-px bg-luxury-gold mx-auto mt-6" />
          </motion.div>

          {/* Stacked Services with Responsive Layout */}
          <div className="space-y-24">
            {services.map((service, index) => {
              const number = `${(index + 1).toString().padStart(2, '0')}`;
              const imageIndex = (index % 4) + 1;
              const serviceImage = getImage(imageIndex);
              const isEvenIndex = index % 2 === 0;

              return (
                <motion.div
                  key={service.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUpVariants}
                  className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start"
                >
                  {/* Number Frame with Image - Always first in DOM for mobile (order-1) */}
                  <div className={`order-1 ${isEvenIndex ? 'lg:order-1' : 'lg:order-2'} w-full lg:w-1/2`}>
                    <NumberFrame
                      number={number}
                      imageSrc={serviceImage.src}
                      alt={serviceImage.alt}
                    />
                  </div>

                  {/* Text Content - Always second in DOM for mobile (order-2) */}
                  <div className={`order-2 ${isEvenIndex ? 'lg:order-2' : 'lg:order-1'} w-full lg:w-1/2 space-y-6 text-left`}>
                    <h3 className="font-serif text-3xl md:text-4xl font-bold text-luxury-charcoal leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-luxury-slate text-base md:text-lg leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section - Grid Layout with Icons */}
      <section className="py-20 relative text-luxury-charcoal" style={{ backgroundColor: '#f6f5e9' }}>
        <div className="container-luxury max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-luxury-charcoal">Process</span>
            </h2>
            <p className="text-xl text-luxury-slate max-w-3xl mx-auto">
              From first hello to final reveal, here&apos;s how we work with you to create your dream space.
            </p>
            {/* Decorative underline */}
            <div className="w-24 h-px bg-luxury-gold mx-auto mt-6" />
          </motion.div>

          {/* Grid Container - Responsive: 1 column on mobile, 2 on tablet, 3 on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {processSteps.map((step, index) => (
              <ProcessCard key={step.step} item={step} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}