'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  description: string;
  featured: boolean;
}

interface PortfolioTeaserProps {
  className?: string;
}

// Sample portfolio data - In production, this would come from your database
const portfolioProjects: PortfolioProject[] = [
  {
    id: '1',
    title: 'Luxury Penthouse',
    category: 'Residential',
    location: 'Victoria Island, Lagos',
    image: '/images/portfolio/penthouse-main.jpg',
    description: 'A stunning 4-bedroom penthouse with panoramic city views and bespoke furnishings',
    featured: true,
  },
  {
    id: '2',
    title: 'Corporate Headquarters',
    category: 'Commercial',
    location: 'Ikoyi, Lagos',
    image: '/images/portfolio/office-main.jpg',
    description: 'Modern corporate office design emphasizing productivity and luxury aesthetics',
    featured: true,
  },
  {
    id: '3',
    title: 'Private Villa',
    category: 'Residential',
    location: 'Banana Island, Lagos',
    image: '/images/portfolio/villa-main.jpg',
    description: 'Contemporary villa design with tropical luxury elements and smart home integration',
    featured: true,
  },
  {
    id: '4',
    title: 'Boutique Hotel',
    category: 'Hospitality',
    location: 'Lekki Phase 1, Lagos',
    image: '/images/portfolio/hotel-main.jpg',
    description: 'Intimate boutique hotel combining Nigerian heritage with modern luxury',
    featured: true,
  },
  {
    id: '5',
    title: 'Executive Suite',
    category: 'Residential',
    location: 'Abuja',
    image: '/images/portfolio/suite-main.jpg',
    description: 'Elegant master suite with custom millwork and premium finishes',
    featured: false,
  },
  {
    id: '6',
    title: 'Restaurant Interior',
    category: 'Commercial',
    location: 'Victoria Island, Lagos',
    image: '/images/portfolio/restaurant-main.jpg',
    description: 'Fine dining restaurant with sophisticated ambiance and innovative lighting',
    featured: false,
  },
];

export default function PortfolioTeaser({ className }: PortfolioTeaserProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const categories = ['All', 'Residential', 'Commercial', 'Hospitality'];

  const filteredProjects = activeCategory === 'All' 
    ? portfolioProjects 
    : portfolioProjects.filter(project => project.category === activeCategory);

  const handleViewProject = (projectId: string) => {
    // Analytics tracking
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'click', {
        event_category: 'engagement',
        event_label: `portfolio_project_${projectId}`,
      });
    }

    // In production, this would navigate to the project detail page
    console.log(`Viewing project: ${projectId}`);
  };

  const handleViewAllPortfolio = () => {
    // Analytics tracking
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'click', {
        event_category: 'engagement',
        event_label: 'view_all_portfolio',
      });
    }

    // In production, this would navigate to the full portfolio page
    console.log('Viewing full portfolio');
  };

  return (
    <section className={cn("py-20 bg-luxury-cream", className)}>
      <div className="container-luxury">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-luxury-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Our Signature
            <span className="text-gradient-gold block mt-2">Projects</span>
          </h2>
          <p className="text-xl text-luxury-slate max-w-3xl mx-auto leading-relaxed mb-8">
            Explore our portfolio of luxury interior design projects, each meticulously crafted to reflect our clients&apos; unique personalities and sophisticated tastes.
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
              onClick={() => setActiveCategory(category)}
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
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              className="group cursor-pointer"
              onClick={() => handleViewProject(project.id)}
            >
              <div className="card-luxury overflow-hidden">
                {/* Project Image */}
                <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-xl">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  {/* Overlay */}
                  <div className="image-overlay" />
                  
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-luxury-gold text-white text-xs px-3 py-1 rounded-full font-medium">
                        Featured
                      </div>
                    </div>
                  )}

                  {/* Hover Button */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: hoveredProject === project.id ? 1 : 0,
                      scale: hoveredProject === project.id ? 1 : 0.8
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center z-10"
                  >
                    <button className="bg-white/90 backdrop-blur-sm text-luxury-charcoal p-4 rounded-full shadow-luxury hover:bg-white transition-colors duration-300">
                      <Eye className="w-6 h-6" />
                    </button>
                  </motion.div>
                </div>

                {/* Project Info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-luxury-gold font-medium uppercase tracking-wide">
                      {project.category}
                    </span>
                    <span className="text-sm text-luxury-slate">
                      {project.location}
                    </span>
                  </div>

                  <h3 className="text-luxury-heading text-2xl font-bold group-hover:text-luxury-gold transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-luxury-body text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* View Project Link */}
                  <div className="flex items-center text-luxury-gold font-medium text-sm group-hover:text-luxury-dark-gold transition-colors duration-300">
                    <span>View Project</span>
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Portfolio CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <button
            onClick={handleViewAllPortfolio}
            className="btn-luxury text-lg px-12 py-4 group"
          >
            <span className="relative z-10">View Complete Portfolio</span>
            <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          
          <p className="mt-4 text-sm text-luxury-slate/70">
            Discover all {portfolioProjects.length}+ luxury projects in our complete portfolio
          </p>
        </motion.div>
      </div>
    </section>
  );
}