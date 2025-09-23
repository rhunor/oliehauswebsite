'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Eye } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const GITHUB_CDN_BASE = "https://cdn.jsdelivr.net/gh/rhunor/olivehausimages@main";


interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  location: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  description: string;
  featured: boolean;
}

interface PortfolioTeaserProps {
  className?: string;
}

// Enhanced portfolio data with string paths instead of static imports
const portfolioProjects: PortfolioProject[] = [
  {
    id: '1',
    title: 'Project Lumina',
    category: 'Residential',
    location: 'Lekki, Lagos',
    image: {
      src: `${GITHUB_CDN_BASE}/projects/projectluminalekkilagos/11.webp`,
      alt: 'Luxury penthouse living room with panoramic Lagos city views, contemporary furniture, and premium finishes',
      width: 800,
      height: 600,
    },
    description: 'This home embodies modern luxury with personality blending bold, saturated hues that make a statement, with serene spaces designed for rest and renewal.',
    featured: true,
  },
  {
    id: '2',
    title: 'Project Officeland',
    category: 'Commercial',
    location: 'Ikoyi, Lagos',
    image: {
      src: `${GITHUB_CDN_BASE}/projects/projectofficeland/1.webp`,
      alt: 'Modern corporate office with open-plan design, ergonomic furniture, and sophisticated lighting',
      width: 800,
      height: 600,
    },
    description: 'We designed this workplace to balance functionality with impact creating a space that supports both staff well-being and productivity.',
    featured: true,
  },
  {
    id: '3',
    title: 'Project Serenique',
    category: 'Hospitality',
    location: 'Magodo, Lagos',
    image: {
      src: `${GITHUB_CDN_BASE}/projects/projectsereniquemagodolagos_/8.webp`,
      alt: 'Boutique hotel lobby featuring Nigerian heritage elements blended with modern luxury design',
      width: 800,
      height: 600,
    },
    description: 'This renovation reimagined the spa into a sanctuary of calm, where muted tones, refined textures, and seamless design invite relaxation at every turn.',
    featured: true,
  },
  {
  id: '4',
    title: 'Project Casa Vitalis',
    category: 'Residential',
    location: 'Victoria Island, Lagos',
    image: {
      src: `${GITHUB_CDN_BASE}/projects/projectcasavitalis/17.webp`,
      alt: 'Luxury penthouse living room with panoramic Lagos city views, contemporary furniture, and premium finishes',
      width: 800,
      height: 600,
    },
    description: 'This home strikes a rare balance between bold expression and refined luxury. Rich statement hues set a dramatic tone.',
    featured: true,
  },
  {
    id: '5',
    title: 'Project Landmark',
    category: 'Residential',
    location: 'Lekki, Lagos',
    image: {
      src: `${GITHUB_CDN_BASE}/projects/projectlandmark/5.webp`,
      alt: 'Modern corporate office with open-plan design, ergonomic furniture, and sophisticated lighting',
      width: 800,
      height: 600,
    },
    description: 'This space captures the spirit of Paris vibrant, romantic, and effortlessly chic. Playful details meet refined finishes, blending whimsy with sophistication.',
    featured: true,
  },
  {
    id: '6',
    title: 'Project Aiona',
    category: 'Hospitality',
    location: 'Magodo, Lagos',
    image: {
      src: '/images/portfolio/hotel-main.webp',
      alt: 'Boutique hotel lobby featuring Nigerian heritage elements blended with modern luxury design',
      width: 800,
      height: 600,
    },
    description: 'This renovation reimagined the spa into a sanctuary of calm, where muted tones, refined textures, and seamless design invite relaxation at every turn.',
    featured: true,
  },
  
];

// Analytics tracking helper - using the existing window.gtag type from FloatingWhatsApp
const trackEvent = (action: string, category: string, label: string): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
    });
  }
};

export default function PortfolioTeaser({ className }: PortfolioTeaserProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const categories = ['All', 'Residential', 'Commercial', 'Hospitality'];

  const filteredProjects = activeCategory === 'All' 
    ? portfolioProjects 
    : portfolioProjects.filter(project => project.category === activeCategory);

  const handleViewProject = (projectId: string): void => {
    trackEvent('click', 'engagement', `portfolio_project_${projectId}`);
    // In production, navigate to project detail
    console.log(`Viewing project: ${projectId}`);
  };

  const handleCategoryChange = (category: string): void => {
    setActiveCategory(category);
    trackEvent('click', 'engagement', `portfolio_filter_${category.toLowerCase()}`);
  };

  return (
    <section className={cn("py-12 bg-luxury-cream", className)}>
      <div className="container-luxury">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5  font-serif">
            Our Signature Spaces 
            
          </h2>
          <p className="text-xl text-luxury-slate max-w-3xl mx-auto leading-relaxed mb-3 font-body ">
            Explore our portfolio of luxury interiors, created to mirror each client&apos;s distinct personality and style
          </p>

          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="luxury-divider max-w-md mx-auto"
          />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={cn(
                "px-6 py-3 rounded-full font-medium transition-all duration-300",
                activeCategory === category
                  ? "bg-luxury-gold text-white shadow-luxury-soft"
                  : "bg-white text-luxury-slate hover:bg-luxury-gold hover:text-white shadow-sm"
              )}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => handleViewProject(project.id)}
            >
              <div className="card-luxury overflow-hidden h-full">
                {/* Project Image Container */}
                <div 
                  className="relative aspect-[4/3] mb-6 overflow-hidden rounded-xl"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Image - starts at full brightness */}
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    width={project.image.width}
                    height={project.image.height}
                    className={cn(
                      "object-cover w-full h-full transition-all duration-500",
                      hoveredProject === project.id ? "scale-110 brightness-75" : "scale-100 brightness-100"
                    )}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 3}
                  />
                  
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-luxury-gold text-white text-xs px-3 py-1 rounded-full font-medium">
                        Featured
                      </div>
                    </div>
                  )}

                  {/* Hover Eye Icon */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: hoveredProject === project.id ? 1 : 0,
                      scale: hoveredProject === project.id ? 1 : 0.8
                    }}
                    className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                  >
                    <div className="bg-white p-4 rounded-full shadow-luxury-soft">
                      <Eye className="w-6 h-6 text-luxury-gold" />
                    </div>
                  </motion.div>
                </div>

                {/* Project Details */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-luxury-gold text-sm font-medium uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span className="text-luxury-slate text-sm">
                      {project.location}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-luxury-charcoal group-hover:text-luxury-gold transition-colors duration-300 font-accent">
                    {project.title}
                  </h3>

                  <p className="text-luxury-slate leading-relaxed font-body">
                    {project.description}
                  </p>

                  <div className="flex items-center text-luxury-gold font-medium group-hover:gap-3 gap-2 transition-all duration-300">
                    <span>View Project</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Portfolio Button */}
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
            href="/portfolio"
            className="btn-luxury group inline-flex items-center space-x-2"
          >
            <span>View Full Portfolio</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}