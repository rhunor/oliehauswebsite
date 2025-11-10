'use client';

import HeroSection from '@/components/ui/HeroSection';
import PortfolioTeaser from '@/components/ui/PortfolioTeaser';
import TestimonialSection from '@/components/ui/TestimonialSection';

import { motion, useMotionValue, animate, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Workflow, Home, Globe, Users } from 'lucide-react';

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
  const inView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(motionValue, value, {
        duration: 2,
        ease: [0.25, 0.1, 0.25, 1],
        onUpdate: (latest) => {
          setDisplayValue(Math.round(latest));
        }
      });
      return controls.stop;
    }
    return undefined;
  }, [inView, value, motionValue]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}

const GITHUB_CDN_BASE = "https://cdn.jsdelivr.net/gh/rhunor/olivehausimages@main";

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

const videoOptions: VideoContent[] = [
  {
    thumbnailSrc: '/images/video/portfolio-thumbnail.jpg',
    videoSrc: 'https://vimeo.com/1130164764',
    title: 'Project Aiona',
    description: 'OliveHaus Portfolio Showcase'
  },
  {
    thumbnailSrc: `${GITHUB_CDN_BASE}/projects/projectsereniquemagodolagos_/7.webp`,
    videoSrc: 'https://vimeo.com/1116723569',
    title: 'Project Edene Wellness',
    description: 'Edene Wellness project showcase'
  }
];

export default function HomePage(): React.JSX.Element {
  const handleHireUsClick = (): void => {
    window.location.href = '/contact';
  };

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null);
  
  const closeVideo = () => {
    setIsVideoOpen(false);
    setSelectedVideoIndex(null);
  };
  
  const openVideo = () => {
    setSelectedVideoIndex(null);
    setIsVideoOpen(true);
  };
  
  const startVideo = (index: number) => {
    setSelectedVideoIndex(index);
  };

  return (
    <>
      <div >
        {/* Hero Section */}
        <div className="relative">
          <HeroSection
            images={heroImages}
            video={videoOptions[0]!}
            tagline={{
              main: 'Design for High Quality Living',
              sub: ''
            }}
            onHireUsClick={handleHireUsClick}
          />

          {/* Overlayed Watch Video button */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="flex justify-center items-start h-full pt-28 pointer-events-auto">
              <button
                onClick={() => openVideo()}
                className="inline-flex items-center space-x-3 bg-black/70 text-white px-5 py-3 rounded-full shadow-lg backdrop-blur-sm hover:scale-105 transition-transform"
                aria-haspopup="dialog"
              >
                <span>Watch Video</span>
              </button>
            </div>
          </div>
        </div>

        {/* Video modal */}
        {isVideoOpen && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={closeVideo}
          >
            <div
              className="w-full max-w-4xl bg-white rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <h3 className="font-semibold">
                  {selectedVideoIndex === null
                    ? 'Choose a Video'
                    : videoOptions[selectedVideoIndex]?.title ?? 'Unknown Video'}
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={closeVideo}
                    className="text-sm px-3 py-1 rounded-md bg-gray-100"
                    aria-label="Close video"
                  >
                    Close
                  </button>
                </div>
              </div>

              {selectedVideoIndex === null ? (
                <div className="p-6 grid sm:grid-cols-2 gap-6">
                  {videoOptions.map((v, i) => (
                    <div key={v.title} className="flex flex-col items-center bg-gray-50 rounded-md p-4">
                      <div className="w-full overflow-hidden rounded-md mb-3 bg-black" style={{ aspectRatio: '16/9' }}>
                        <Image src={v.thumbnailSrc} alt={v.title} width={1200} height={675} className="object-cover w-full h-full" />
                      </div>
                      <h4 className="font-semibold mb-1">{v.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{v.description}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startVideo(i)}
                          className="px-4 py-2 bg-luxury-gold text-black rounded-md"
                        >
                          Play
                        </button>
                        <button
                          onClick={() => setSelectedVideoIndex(i)}
                          className="px-4 py-2 bg-gray-200 rounded-md text-sm"
                        >
                          Preview (select)
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {(() => {
                    const idx = selectedVideoIndex as number;
                    const selected = videoOptions[idx];
                    if (!selected) {
                      return (
                        <div className="p-8 text-center text-red-600">
                          Selected video not found.
                        </div>
                      );
                    }
                    const videoId = selected.videoSrc.split('/').pop()?.split('?')[0] ?? '';
                    return (
                      <>
                        <div className="aspect-video bg-black">
                          <iframe
                            src={`https://player.vimeo.com/video/${videoId}?autoplay=1`}
                            title={selected.title}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                          />
                        </div>

                        <div className="px-4 py-3 flex items-center justify-between border-t">
                          <p className="text-sm text-gray-600">{selected.description}</p>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                setSelectedVideoIndex(prev => {
                                  const current = prev ?? 0;
                                  return (current + 1) % videoOptions.length;
                                })
                              }
                              className="px-3 py-1 rounded-md bg-luxury-gold text-black text-sm"
                            >
                              Switch Video
                            </button>
                            <button
                              onClick={() => setSelectedVideoIndex(null)}
                              className="px-3 py-1 rounded-md bg-gray-100 text-sm"
                            >
                              Choose Another
                            </button>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </>
              )}
             </div>
           </div>
         )}

        {/* About Us Section */}
        <section className="relative py-12 bg-warm-sand overflow-hidden">
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
                <h2 className="font-title text-4xl md:text-5xl font-bold mb-6 text-luxury-charcoal tracking-wide">
                  For Nigeria&apos;s <span className="text-luxury-charcoal">Finest Homes...</span>
                </h2>
                <div className="space-y-6 text-lg text-luxury-charcoal/80 leading-relaxed font-body">
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
                        <a
                          href="/about"
                          className="btn-luxury group inline-flex items-center space-x-2"
                        >
                          <span>Read More</span>
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
                  src={`${GITHUB_CDN_BASE}/about/28.webp`}
                  alt="OliveHaus luxury interior design showcase"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            
            </div>
          </div>
        </section>

        {/* We Stand Out Section - Updated with Subtle Elegant Cards */}
        <section className="py-16 bg-warm-sand overflow-hidden">
          <div className="container-luxury">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="font-title text-4xl md:text-5xl font-bold mb-6 text-luxury-charcoal tracking-wide">
                We Stand <span className="text-luxury-charcoal">Out</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Workflow,
                  title: 'Seamless Project Experience',
                  description: 'Flawless client experience, before, during and after project execution.',
                  href: '/about'
                },
                {
                  icon: Home,
                  title: 'Design for High-Quality Living',
                  description: 'Luxurious, personalized interiors that blend functionality with timeless aesthetics.',
                  href: '/about'
                },
                {
                  icon: Globe,
                  title: 'Stress-free Project Oversight',
                  description: 'Track progress worldwide with our Daily Manager Platform Updates.',
                  href: '/about'
                },
                {
                  icon: Users,
                  title: 'Constant Team Support',
                  description: 'A responsive team ensures your vision is executed to perfection.',
                  href: '/about'
                }
              ].map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.15 }}
                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md border border-warm-sand/50 hover:border-luxury-gold/30 transition-all duration-300 hover:scale-102"
                  >
                    <div className="w-12 h-12 bg-luxury-gold/10 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-luxury-gold" aria-hidden="true" />
                    </div>
                    <h3 className="font-serif text-xl font-bold mb-3 text-luxury-charcoal tracking-wide">
                      {value.title}
                    </h3>
                    <p className="text-luxury-charcoal/80 leading-relaxed font-body text-sm mb-4">
                      {value.description}
                    </p>
                    <a
                      href={value.href}
                      className="inline-flex items-center space-x-1 text-luxury-gold font-medium text-sm hover:text-luxury-charcoal transition-colors group"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                    </a>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Track Record Section - New Two-Column Design */}
        <section className="py-20 bg-[#1a1a1a] relative overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-luxury-charcoal via-[#1a1a1a] to-black opacity-90" />
          
          <div className="container-luxury relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-title text-4xl md:text-5xl font-bold mb-5 text-white tracking-wide">
                Our Track <span className="text-luxury-gold">Record</span>
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto font-body leading-relaxed">
                Numbers that speak of our commitment to luxury, quality, and client satisfaction across every project we undertake.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Statistics with animated counters */}
              <div className="grid grid-cols-2 gap-6">
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
                    className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-luxury-gold/50 transition-all duration-300"
                  >
                    <div className="relative">
                      <motion.div 
                        className="text-4xl md:text-5xl font-bold mb-3 font-serif tabular-nums text-luxury-gold"
                        whileInView={{ scale: [0.8, 1.05, 1] }}
                        transition={{ duration: 0.6, delay: index * 0.15 + 0.2 }}
                      >
                        <AnimatedCounter value={stat.number} suffix={stat.suffix} />
                      </motion.div>
                      <h3 className="text-lg font-bold mb-2 font-serif tracking-wide text-white">
                        {stat.label}
                      </h3>
                      <p className="text-xs leading-relaxed font-body text-white/60">
                        {stat.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right: Our Excellence */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10"
              >
                <h3 className="font-title text-3xl font-bold mb-8 text-white tracking-wide">
                  Our <span className="text-luxury-gold">Excellence</span>
                </h3>
                
                <div className="space-y-6">
                  {[
                    { label: 'Bespoke Design', value: 98 },
                    { label: 'Client Satisfaction', value: 95 },
                    { label: 'Timely Delivery', value: 92 },
                    { label: 'Quality Craftsmanship', value: 97 }
                  ].map((skill, index) => (
                    <motion.div
                      key={skill.label}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium font-body">{skill.label}</span>
                        <span className="text-luxury-gold font-bold">{skill.value}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-luxury-gold to-yellow-600 rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="text-white/70 text-sm font-body leading-relaxed">
                    Our commitment to excellence is reflected in every project we undertake. From initial consultation to final execution, we maintain the highest standards of quality, creativity, and professionalism.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Closing Tagline */}
        <section className="relative py-20 md:py-28 bg-luxury-charcoal text-white text-center  overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <Image
              src={`${GITHUB_CDN_BASE}/images/hero/2.webp`}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-luxury-charcoal/95 to-luxury-charcoal" />
          <div className="absolute inset-0 bg-luxury-charcoal/80" />

          <div className="container-luxury relative z-10 px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="font-title text-4xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-12 leading-tight drop-shadow-lg">
                Designers Who Begin 
                <span className="text-white block">With The End In Mind</span>
              </h2>
            </motion.div>
          </div>
        </section>

        {/* Portfolio Teaser */}
        <section className="relative bg-clay-peach overflow-hidden">
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

        {/* Testimonial Section */}
        <section className="relative bg-light-primrose overflow-hidden">
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