//src/components/ui/AchievementCounter.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Home, Users, Calendar, Briefcase } from 'lucide-react';
import { cn, formatNumber } from '@/lib/utils';

interface CounterData {
  completedProjects: number;
  happyClients: number;
  yearsExperience: number;
  ongoingProjects: number;
}

interface AchievementCounterProps {
  counters: CounterData;
  className?: string;
}

interface CounterItemProps {
  icon: React.ElementType;
  value: number;
  label: string;
  suffix?: string;
  description: string;
  delay: number;
}

function CounterItem({ icon: Icon, value, label, suffix = '', description, delay }: CounterItemProps) {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView && !isAnimating) {
      setIsAnimating(true);
      controls.start('visible');

      // Counter animation
      const duration = 2000; // 2 seconds
      const increment = value / (duration / 16); // 60fps
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 16);

      return () => {
        clearInterval(timer);
      };
    }
    
    return undefined; // Explicit return for the else path
  }, [isInView, value, isAnimating, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.8 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.8,
            delay: delay,
            ease: [0.25, 0.25, 0, 1],
          },
        },
      }}
      className="text-center group"
    >
      <div className="card-luxury group-hover:scale-105 transition-transform duration-300">
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.8 }}
          className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-luxury-gold to-luxury-darkGold rounded-2xl flex items-center justify-center shadow-luxury-soft"
        >
          <Icon className="w-10 h-10 text-white" />
        </motion.div>

        {/* Counter */}
        <div className="mb-4">
          <motion.div
            key={count}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-5xl md:text-6xl font-bold text-luxury-gold mb-2 font-serif"
          >
            {formatNumber(count)}{suffix}
          </motion.div>
          <h3 className="text-xl font-semibold text-luxury-gold mb-2">
            {label}
          </h3>
          <p className="text-luxury-slate text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Animated progress bar */}
        <div className="w-full bg-luxury-cream/50 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '100%' } : { width: 0 }}
            transition={{ duration: 2, delay: delay + 0.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-luxury-gold to-luxury-darkGold rounded-full relative"
          >
            <motion.div
              animate={{ x: ['0%', '100%', '0%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-white/30 w-1/3 rounded-full"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AchievementCounter({ counters, className }: AchievementCounterProps) {
  const achievements = [
    {
      icon: Home,
      value: counters.completedProjects,
      label: 'Luxury Spaces',
      suffix: '',
      description: 'Exquisitely designed and completed projects across Nigeria and internationally',
      delay: 0,
    },
    {
      icon: Users,
      value: counters.happyClients,
      label: 'Happy Clients',
      suffix: '',
      description: 'High-net-worth individuals who trust us with their luxury spaces',
      delay: 0.2,
    },
    {
      icon: Calendar,
      value: counters.yearsExperience,
      label: 'Years Experience',
      suffix: '+',
      description: 'Decades of expertise in luxury interior design and project management',
      delay: 0.4,
    },
    {
      icon: Briefcase,
      value: counters.ongoingProjects,
      label: 'Active Projects',
      suffix: '',
      description: 'Current luxury projects in various stages of design and execution',
      delay: 0.6,
    },
  ];

  return (
    <section className={cn("py-20 bg-white relative overflow-hidden", className)}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-luxury-cream/30 to-transparent" />
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-luxury-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-luxury-gold/3 rounded-full blur-3xl" />
      
      <div className="container-luxury relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-luxury-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Our Track Record of
            <span className="text-gradient-gold block mt-2">Excellence</span>
          </h2>
          <p className="text-xl text-luxury-slate max-w-3xl mx-auto leading-relaxed">
            Numbers that speak to our commitment to luxury, quality, and client satisfaction across every project we undertake
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

        {/* Achievement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {achievements.map((achievement) => (
            <CounterItem
              key={achievement.label}
              icon={achievement.icon}
              value={achievement.value}
              label={achievement.label}
              suffix={achievement.suffix}
              description={achievement.description}
              delay={achievement.delay}
            />
          ))}
        </div>

        {/* Additional Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-luxury-gold mb-2">98%</div>
              <div className="text-luxury-slate">Client Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-luxury-gold mb-2">100%</div>
              <div className="text-luxury-slate">On-Time Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-luxury-gold mb-2">5★</div>
              <div className="text-luxury-slate">Average Client Rating</div>
            </div>
          </div>

          {/* Client Testimonial Quote */}
          <motion.blockquote
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <div className="card-luxury bg-gradient-to-br from-luxury-gold/5 to-luxury-darkGold/5">
              <div className="text-6xl text-luxury-gold/20 mb-4">&apos;</div>
              <p className="text-2xl font-elegant italic text-luxury-charcoal leading-relaxed mb-6">
                OliveHaus didn&apos;t just design our home; they created a masterpiece that reflects our personality and exceeds our expectations in every detail.
              </p>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-luxury-gold rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-luxury-charcoal">Anonymous Client</div>
                  <div className="text-sm text-luxury-slate">Victoria Island, Lagos</div>
                </div>
              </div>
            </div>
          </motion.blockquote>
        </motion.div>
      </div>
    </section>
  );
}