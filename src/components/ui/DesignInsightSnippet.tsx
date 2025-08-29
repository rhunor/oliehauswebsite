'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Lightbulb, Palette, Ruler, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DesignAnnotation {
  id: string;
  x: number; // Percentage from left
  y: number; // Percentage from top
  title: string;
  description: string;
  icon: React.ElementType;
}

interface DesignInsightSnippetProps {
  className?: string;
}

// Sample design insight data - In production, this would come from your database
const sampleInsight = {
  id: 'luxury-living-room',
  title: 'Luxury Living Room Design',
  projectName: 'Victoria Island Penthouse',
  description: 'Discover the thought process behind our award-winning living room design that seamlessly blends contemporary luxury with Nigerian cultural elements.',
  renderImage: '/images/insights/living-room-render.jpg',
  annotations: [
    {
      id: 'lighting',
      x: 25,
      y: 30,
      title: 'Layered Lighting',
      description: 'Custom crystal chandelier creates ambient lighting while hidden LED strips provide task illumination',
      icon: Lightbulb,
    },
    {
      id: 'materials',
      x: 60,
      y: 45,
      title: 'Premium Materials',
      description: 'Italian marble flooring with locally-sourced Iroko wood accents celebrating Nigerian craftsmanship',
      icon: Palette,
    },
    {
      id: 'layout',
      x: 75,
      y: 25,
      title: 'Spatial Planning',
      description: 'Open-plan layout optimized for both intimate family gatherings and formal entertaining',
      icon: Ruler,
    },
    {
      id: 'details',
      x: 40,
      y: 70,
      title: 'Bespoke Details',
      description: 'Hand-crafted coffee table designed exclusively for this space with hidden storage solutions',
      icon: Sparkles,
    },
  ] as DesignAnnotation[],
  insights: [
    'Color Psychology: Warm earth tones create a sense of grounding and sophistication',
    'Cultural Integration: Traditional Adire patterns subtly incorporated into custom upholstery',
    'Smart Home Integration: Hidden technology maintains aesthetic while providing modern convenience',
    'Sustainability: 70% of materials sourced locally to support Nigerian artisans',
  ],
};

export default function DesignInsightSnippet({ className }: DesignInsightSnippetProps) {
  const [activeAnnotation, setActiveAnnotation] = useState<string | null>(null);
  const [hoveredInsight, setHoveredInsight] = useState<number | null>(null);

  const handleViewFullInsights = () => {
    // Analytics tracking
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'click', {
        event_category: 'engagement',
        event_label: 'view_design_insights',
      });
    }

    // In production, this would navigate to the "Inside the Design" page
    console.log('Viewing full design insights');
  };

  const handleAnnotationClick = (annotationId: string) => {
    setActiveAnnotation(activeAnnotation === annotationId ? null : annotationId);
  };

  return (
    <section className={cn("py-20 bg-gradient-to-br from-luxury-ivory to-luxury-cream", className)}>
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
            Inside Our
            <span className="text-gradient-gold block mt-2">Design Process</span>
          </h2>
          <p className="text-xl text-luxury-slate max-w-3xl mx-auto leading-relaxed">
            Every design decision has a purpose. Explore the thoughtful considerations and creative solutions behind our luxury spaces.
          </p>

          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="luxury-divider mt-8 max-w-md mx-auto"
          />
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Interactive Render Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Main Image */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-luxury">
                <Image
                  src={sampleInsight.renderImage}
                  alt={sampleInsight.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Interactive Annotations */}
                {sampleInsight.annotations.map((annotation) => {
                  const IconComponent = annotation.icon;
                  const isActive = activeAnnotation === annotation.id;

                  return (
                    <motion.button
                      key={annotation.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1 + (sampleInsight.annotations.indexOf(annotation) * 0.2) }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnnotationClick(annotation.id)}
                      className="absolute w-10 h-10 bg-luxury-gold text-white rounded-full shadow-luxury hover:shadow-luxury-lg transition-all duration-300 flex items-center justify-center z-10"
                      style={{ 
                        left: `${annotation.x}%`, 
                        top: `${annotation.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      aria-label={annotation.title}
                    >
                      <IconComponent className="w-5 h-5" />
                      
                      {/* Pulse animation */}
                      <div className="absolute inset-0 rounded-full bg-luxury-gold animate-ping opacity-20" />
                    </motion.button>
                  );
                })}

                {/* Active Annotation Tooltip */}
                {activeAnnotation && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute z-20 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-luxury max-w-xs"
                    style={{
                      left: `${sampleInsight.annotations.find(a => a.id === activeAnnotation)?.x}%`,
                      top: `${(sampleInsight.annotations.find(a => a.id === activeAnnotation)?.y || 0) - 10}%`,
                      transform: 'translateX(-50%) translateY(-100%)'
                    }}
                  >
                    {(() => {
                      const annotation = sampleInsight.annotations.find(a => a.id === activeAnnotation);
                      if (!annotation) return null;
                      
                      return (
                        <>
                          <h4 className="font-serif font-bold text-luxury-charcoal mb-2">
                            {annotation.title}
                          </h4>
                          <p className="text-sm text-luxury-slate leading-relaxed">
                            {annotation.description}
                          </p>
                        </>
                      );
                    })()}
                  </motion.div>
                )}
              </div>

              {/* Project Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="mt-6 text-center"
              >
                <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-luxury-soft">
                  <span className="text-sm font-medium text-luxury-gold">Featured Project:</span>
                  <span className="text-sm font-bold text-luxury-charcoal ml-2">
                    {sampleInsight.projectName}
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Content Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Title and Description */}
              <div className="space-y-4">
                <h3 className="text-luxury-heading text-3xl md:text-4xl font-bold">
                  {sampleInsight.title}
                </h3>
                <p className="text-luxury-body text-lg leading-relaxed">
                  {sampleInsight.description}
                </p>
              </div>

              {/* Design Insights List */}
              <div className="space-y-4">
                <h4 className="text-luxury-heading text-xl font-bold">Key Design Considerations:</h4>
                <div className="space-y-3">
                  {sampleInsight.insights.map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index }}
                      onHoverStart={() => setHoveredInsight(index)}
                      onHoverEnd={() => setHoveredInsight(null)}
                      className={cn(
                        "flex items-start space-x-4 p-4 rounded-xl transition-all duration-300",
                        hoveredInsight === index 
                          ? "bg-luxury-gold/10 shadow-luxury-soft" 
                          : "bg-white/50"
                      )}
                    >
                      <div className="w-2 h-2 bg-luxury-gold rounded-full mt-2 flex-shrink-0" />
                      <p className="text-luxury-body leading-relaxed">{insight}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-luxury-gold/10 to-luxury-darkGold/10 rounded-2xl p-8"
              >
                <h4 className="text-luxury-heading text-2xl font-bold mb-4">
                  See How We Think About Your Space
                </h4>
                <p className="text-luxury-body mb-6">
                  Explore our complete design process with detailed annotations, material selections, and the story behind every decision.
                </p>

                <button
                  onClick={handleViewFullInsights}
                  className="btn-luxury group"
                >
                  <span className="relative z-10">Inside the Design</span>
                  <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </motion.div>

              {/* Interactive Hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="text-center lg:text-left"
              >
                <p className="text-sm text-luxury-slate/70 italic">
                  💡 Click the annotation points on the image to explore our design decisions
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-luxury-soft max-w-4xl mx-auto">
            <h3 className="text-luxury-heading text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your Design Journey?
            </h3>
            <p className="text-luxury-body mb-6 max-w-2xl mx-auto">
              Let us create a space that tells your unique story. Every project begins with understanding your vision and lifestyle.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="btn-luxury">
                Schedule Consultation
              </button>
              <button 
                onClick={handleViewFullInsights}
                className="text-luxury-gold font-medium hover:text-luxury-darkGold transition-colors duration-300 flex items-center"
              >
                Explore More Insights
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}