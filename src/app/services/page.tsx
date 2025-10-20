'use client';

import {  useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import Image from 'next/image';
import { 
  Home, 
  Briefcase, 
  PaintBucket, 
  Wrench,
  Bath,
  Building2,
  Key,
  Settings,
  ChevronRight,
  Check
} from 'lucide-react';

// GitHub CDN base URL for images
const GITHUB_CDN_BASE = "https://cdn.jsdelivr.net/gh/rhunor/olivehausimages@main";

// Service interface
interface Service {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
}

// Process step interface
interface ProcessStep {
  step: string;
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

// Updated services data with new content
const services: Service[] = [
  {
    title: 'Turnkey Renovation Solutions',
    description: 'We handle every stage of your renovation with the highest level of precision and discretion. From structural planning to the final reveal, we orchestrate the process so you enjoy a seamless transformation without the stress.',
    features: [
      'Complete project management',
      'Structural planning & execution',
      'Vendor coordination',
      'Quality control at every stage',
      'Stress-free transformation'
    ],
    icon: <Wrench className="w-8 h-8" />
  },
  {
    title: 'Bespoke Furnishing & Styling',
    description: 'We curate furnishings, art, and accessories that speak to your taste and lifestyle. Every piece is chosen to elevate your space and create an atmosphere of understated elegance and lasting comfort.',
    features: [
      'Custom furniture selection',
      'Art & accessory curation',
      'Personalized styling',
      'Luxury material selection',
      'Cohesive design execution'
    ],
    icon: <PaintBucket className="w-8 h-8" />
  },
  {
    title: 'Accessibility-Focused Bathrooms',
    description: 'We design bathrooms that balance refined luxury with ease of use. By blending safety, comfort, and sophistication, we ensure these spaces are both practical and beautifully discreet.',
    features: [
      'Safety-first design approach',
      'Luxury finishes & fixtures',
      'Ergonomic layouts',
      'Discreet accessibility features',
      'Sophisticated aesthetics'
    ],
    icon: <Bath className="w-8 h-8" />
  },
  {
    title: 'Kitchen & Bathroom Remodeling',
    description: 'We reimagine kitchens and bathrooms into spaces that feel indulgent yet functional. With fine finishes, thoughtful layouts, and a focus on modern living, we deliver rooms that inspire daily enjoyment.',
    features: [
      'Modern layout optimization',
      'Premium appliance integration',
      'Custom cabinetry design',
      'Luxury finishes & materials',
      'Functional elegance'
    ],
    icon: <Home className="w-8 h-8" />
  },
  {
    title: 'Completion of Unfinished Interiors',
    description: 'We take unfinished interiors and complete them to the highest standard. From bare walls to fully realized living spaces, we bring cohesion, polish, and luxury to every detail.',
    features: [
      'Semi-finished space completion',
      'Carcass building finishing',
      'Complete interior development',
      'Cohesive design integration',
      'Premium quality standards'
    ],
    icon: <Building2 className="w-8 h-8" />
  },
  {
    title: 'Shortlet Design & Set-Up',
    description: 'We design shortlet properties that command attention in a competitive market. Stylish, durable, and investment-focused, our interiors attract discerning guests and maximize your returns.',
    features: [
      'Investment-focused design',
      'Durable material selection',
      'Guest experience optimization',
      'Market-competitive styling',
      'ROI maximization'
    ],
    icon: <Key className="w-8 h-8" />
  },
  {
    title: 'Shortlet Management Services',
    description: 'We manage your property with the same meticulous care that defines our design work. From guest relations to property upkeep, we safeguard your investment while ensuring an exceptional experience for every stay.',
    features: [
      'Professional guest relations',
      'Property maintenance',
      'Booking management',
      'Quality assurance',
      'Investment protection'
    ],
    icon: <Settings className="w-8 h-8" />
  },
  {
    title: 'Design Consultation',
    description: 'Expert advice and guidance for your interior design projects and space planning needs.',
    features: [
      'Design strategy sessions',
      'Space assessment',
      'Style development',
      'Material recommendations',
      'Budget planning'
    ],
    icon: <Briefcase className="w-8 h-8" />
  }
];

// Process steps
const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Discovery Call',
    description: 'We understand your vision, requirements, and lifestyle needs through a detailed consultation.'
  },
  {
    step: '02',
    title: 'Site Assessment',
    description: 'Our team visits your property to evaluate its layout, structure, and potential, ensuring every design decision is grounded in accuracy and tailored to your space.'
  },
  {
    step: '03',
    title: 'Design Development',
    description: 'We refine every detail from spatial layouts to materials, finishes, bespoke elements and 3D Renders.'
  },
  {
    step: '04',
    title: 'Project Execution',
    description: 'We manage the project seamlessly, coordinating craftsmen, suppliers, and schedules.'
  },
  {
    step: '05',
    title: 'Progress Updates',
    description: 'For international clients, we provide detailed remote progress updates and monitoring.'
  },
  {
    step: '06',
    title: 'Final Reveal',
    description: 'Your dream space, exquisitely executed and ready to welcome you home.'
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

const slideInLeftVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: -100 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.8, 
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
      duration: 0.8, 
      ease: "easeOut" 
    }
  }
};

// Timeline item component for the Process section
interface TimelineItemProps {
  item: ProcessStep;
  index: number;
}

function TimelineItem({ item }: TimelineItemProps) {
  const itemRef = useRef<HTMLLIElement>(null);
  const { scrollYProgress: itemProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "center center"]
  });

  return (
    <li
      ref={itemRef}
      className="relative my-14 first:mt-0 last:mb-0 w-full pl-10"
    >
      {/* Animated circle icon */}
      <motion.span
        className="absolute left-0 top-2 -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-luxury-gold bg-[#1A1513] shadow-[0_0_0_4px_rgba(212,165,116,0.2)]"
        style={{ scale: itemProgress }}
      />

      {/* Number & card */}
      <div className="grid grid-cols-[auto,1fr] gap-4 md:gap-6 items-start">
        <div className="font-serif text-4xl md:text-5xl text-white/90 leading-none pt-1">
          {item.step}
        </div>
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="rounded-lg p-5 md:p-7 shadow-2xl bg-gradient-to-br from-white/8 to-white/5 ring-1 ring-white/10"
        >
          <h3 className="text-2xl md:text-3xl font-semibold tracking-wide text-white mb-2">
            {item.title}
          </h3>
          <p className="text-white/80 leading-relaxed md:text-base text-sm">
            {item.description}
          </p>
        </motion.div>
      </div>
    </li>
  );
}

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax effects
  const heroParallax = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  // const [selectedService, setSelectedService] = useState<number | null>(null);
  
  // CTA handler kept in services hero; currently unused here after CTA removal

  // Safe image access helper
  const getImage = (index: number): ServiceImage => {
    const clampedIndex = Math.max(0, Math.min(index, serviceImages.length - 1));
    return serviceImages[clampedIndex]!;
  };

  return (
    <div className="min-h-screen bg-ivory" ref={containerRef}>
      
      {/* Hero Section with Full-Width Landscape Image */}
      <section className="relative h-screen">
        <motion.div 
          className="absolute inset-0"
          style={{ y: heroParallax }}
        >
          <Image
            src={getImage(0).src}
            alt={getImage(0).alt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
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
              <span className="text-luxury-gold block mt-2">Services</span>
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

      {/* Services Section with Images - Editorial Style */}
      <section className="py-20 relative bg-ivory">
        {/* Top Editorial Border */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent mb-20" />
        
        <div className="container-luxury max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
            className="text-center mb-20"
          >
            <h2 className="text-luxury-heading text-4xl md:text-5xl font-bold mb-6">
              OUR <span className="text-luxury-gold">SERVICES</span>
            </h2>
            {/* Decorative underline */}
            <div className="w-24 h-px bg-luxury-gold mx-auto mt-6" />
          </motion.div>

          {/* Continuous Vertical Line Through Entire Section */}
          <div className="absolute left-1/2 -translate-x-1/2 top-32 bottom-32 w-[1.5px] bg-luxury-slate/25 hidden lg:block" />

          {/* Services Grid - Editorial Layout with Hard Shadows */}
          <div className="space-y-32 md:space-y-40 relative">
            {services.map((service, index) => {
              // Define shadow colors for variety - using your color palette
              const shadowColors = [
                'bg-[#C8D1C0]',      // soft-sage
                'bg-[#E7B9A9]',      // clay-peach
                'bg-[#D4AF37]',      // luxury-gold
                'bg-[#C99789]',      // desert-rose
                'bg-[#E8E2DA]',      // warm-sand
                'bg-[#B6C2AD]',      // misty-olive
                'bg-[#D8A48F]',      // terracotta-blush
                'bg-[#F2EDE7]',      // pale-oat
              ];
              
              const shadowColor = shadowColors[index % shadowColors.length];
              
              return (
                <motion.div
                  key={service.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={index % 2 === 0 ? slideInLeftVariants : slideInRightVariants}
                  className="relative"
                >
                  {/* Editorial Border Frame */}
                  <div className="absolute -inset-x-4 -inset-y-8 border-l border-r border-luxury-slate/10 hidden lg:block" />
                  
                  <div className={`grid lg:grid-cols-2 gap-8 md:gap-16 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                  }`}>
                    {/* Text Content */}
                    <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''} px-4 md:px-0`}>
                      <div className="max-w-xl">
                        <div className="text-luxury-gold mb-6">
                          {service.icon}
                        </div>
                        <h3 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-luxury-charcoal leading-tight">
                          {service.title}
                        </h3>
                        <p className="text-luxury-slate text-base md:text-lg leading-relaxed mb-8">
                          {service.description}
                        </p>
                        <ul className="space-y-3">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start text-luxury-slate">
                              <Check className="w-5 h-5 text-luxury-gold mr-3 flex-shrink-0 mt-0.5" />
                              <span className="text-sm md:text-base">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Image with Hard Shadow - Editorial Style */}
                    <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''} px-4 md:px-0 flex ${index % 2 === 1 ? 'justify-end' : 'justify-start'}`}>
                      <div className="relative w-full max-w-md">
                        {/* Hard Shadow Rectangle - Offset Behind - More Pronounced */}
                        <div 
                          className={`absolute ${shadowColor} opacity-60 rounded-sm`}
                          style={{
                            width: '85%',
                            height: '85%',
                            top: index % 2 === 0 ? '30px' : '-30px',
                            left: index % 2 === 0 ? '30px' : '-30px',
                            right: index % 2 === 0 ? 'auto' : '30px',
                            zIndex: 0
                          }}
                        />
                        
                        {/* Main Image - Smaller for pronounced shadow */}
                        <motion.div 
                          className="relative h-[350px] md:h-[420px] w-full max-w-sm overflow-hidden bg-white shadow-lg"
                          style={{ zIndex: 1 }}
                          whileHover={{ 
                            scale: 1.02,
                            transition: { duration: 0.4, ease: "easeOut" }
                          }}
                        >
                          {index < 4 && (
                            <Image
                              src={getImage(index + 1).src}
                              alt={service.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 400px"
                            />
                          )}
                          {index >= 4 && (
                            <Image
                              src={getImage(((index - 4) % 4) + 1).src}
                              alt={service.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 400px"
                            />
                          )}
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative horizontal line between services */}
                  {index < services.length - 1 && (
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-luxury-slate/10 to-transparent mt-16 md:mt-20" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Editorial Border */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent mt-20" />
      </section>

      {/* Process Section - Vertical timeline with scroll-driven line & dots */}
      <section className="pt-20 pb-12 relative bg-[#1A1513] text-white">
        <div className="container-luxury">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-luxury-gold">Process</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              From first hello to final reveal, here&apos;s how we work with you to create your dream space.
            </p>
          </motion.div>

          {/* Timeline container */}
          <Timeline />
        </div>

        {/* Background Decorative Image removed to avoid extra perceived gap before footer */}
      </section>

      {/* CTA Section removed to allow the Process section to connect directly to the global footer */}
    </div>
  );
}

// Timeline component (separate to keep ServicesPage clean)
function Timeline() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start end", "center start"]
  });

  return (
    <div className="relative w-[75%] mx-auto lg:w-[75%] md:w-[90%]" ref={lineRef}>
      {/* Track */}
      <div className="absolute left-6 md:left-8 top-0 w-[2px] md:w-[3px] h-full bg-white/15" />
      {/* Animated vertical line that grows with scroll */}
      <motion.div
        className="absolute left-6 md:left-8 top-0 w-[2px] md:w-[3px] h-full bg-luxury-gold origin-top"
        style={{ scaleY: scrollYProgress }}
      />

      <ul className="w-full flex flex-col items-start justify-between ml-10 md:ml-12">
        {processSteps.map((item, index) => (
          <TimelineItem key={item.step} item={item} index={index} />
        ))}
      </ul>
    </div>
  );
}