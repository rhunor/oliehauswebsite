//src/components/ui/ExclusivitySection.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Star, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuarterSlots {
  q1: number;
  q2: number;
  q3: number;
  q4: number;
}

interface ExclusivitySectionProps {
  availableSlots: QuarterSlots;
  currentYear: number;
  urgencyMessage: string;
  onBookNowClick: () => void;
  className?: string;
}

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function ExclusivitySection({
  availableSlots,
  currentYear,
  urgencyMessage,
  onBookNowClick,
  className
}: ExclusivitySectionProps) {
  const [countdown, setCountdown] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentQuarter, setCurrentQuarter] = useState(1);

  // Calculate current quarter and next quarter deadline
  useEffect(() => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const quarter = Math.ceil(month / 3);
    setCurrentQuarter(quarter);

    // Calculate next quarter deadline
    const getNextQuarterDeadline = () => {
      const year = now.getFullYear();
      const nextQuarter = quarter === 4 ? 1 : quarter + 1;
      const nextYear = quarter === 4 ? year + 1 : year;
      
      const quarterStartMonths = [1, 4, 7, 10] as const;
      const targetMonth = quarterStartMonths[nextQuarter - 1];
      
      if (targetMonth === undefined) {
        // Fallback to current month if something goes wrong
        return new Date(nextYear, month - 1, 1);
      }
      
      return new Date(nextYear, targetMonth - 1, 1);
    };

    const updateCountdown = () => {
      const deadline = getNextQuarterDeadline();
      const now = new Date().getTime();
      const distance = deadline.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  // Get current quarter slots
  const getCurrentQuarterSlots = (): number => {
    const quarterKeys: (keyof QuarterSlots)[] = ['q1', 'q2', 'q3', 'q4'];
    const quarterIndex = currentQuarter - 1;
    
    // Ensure we have a valid index
    if (quarterIndex < 0 || quarterIndex >= quarterKeys.length) {
      return 0;
    }
    
    const quarterKey = quarterKeys[quarterIndex];
    return quarterKey ? availableSlots[quarterKey] : 0;
  };

  // Get quarter name
  const getQuarterName = (q: number) => {
    const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
    return quarters[q - 1];
  };

  // Calculate urgency level based on remaining slots
  const getUrgencyLevel = (slots: number) => {
    if (slots <= 2) return 'critical';
    if (slots <= 5) return 'high';
    if (slots <= 10) return 'medium';
    return 'low';
  };

  const currentSlots = getCurrentQuarterSlots();
  const urgencyLevel = getUrgencyLevel(currentSlots);

  return (
    <section className={cn("py-20 bg-gradient-to-br from-luxury-cream to-white relative overflow-hidden", className)}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-luxury relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-luxury-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Now Booking {currentYear + 1} Projects
            </h2>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Star className="w-6 h-6 text-luxury-gold fill-current" />
              <p className="text-xl text-luxury-slate font-medium">
                Limited Slots Available
              </p>
              <Star className="w-6 h-6 text-luxury-gold fill-current" />
            </div>
            <p className="text-lg text-luxury-slate/80 max-w-2xl mx-auto leading-relaxed">
              {urgencyMessage}
            </p>
          </motion.div>

          {/* Quarterly Slots Display */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            {Object.entries(availableSlots).map(([quarter, slots], index) => {
              const quarterNum = index + 1;
              const isCurrentQuarter = quarterNum === currentQuarter;
              const urgency = getUrgencyLevel(slots);

              return (
                <div
                  key={quarter}
                  className={cn(
                    "card-luxury text-center relative overflow-hidden",
                    isCurrentQuarter && "ring-2 ring-luxury-gold"
                  )}
                >
                  {isCurrentQuarter && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <div className="bg-luxury-gold text-white text-xs px-3 py-1 rounded-full font-medium">
                        Current
                      </div>
                    </div>
                  )}

                  <div className="mb-4">
                    <h3 className="text-2xl font-serif font-bold text-luxury-charcoal mb-2">
                      {getQuarterName(quarterNum)} {currentYear + 1}
                    </h3>
                    <div className="flex items-center justify-center space-x-2 mb-3">
                      <Calendar className="w-5 h-5 text-luxury-gold" />
                      <span className="text-sm text-luxury-slate">
                        {quarterNum === 1 && 'Jan - Mar'}
                        {quarterNum === 2 && 'Apr - Jun'}
                        {quarterNum === 3 && 'Jul - Sep'}
                        {quarterNum === 4 && 'Oct - Dec'}
                      </span>
                    </div>
                  </div>

                  {/* Slot Counter */}
                  <div className="text-center">
                    <motion.div
                      key={slots}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className={cn(
                        "text-4xl font-bold mb-2",
                        urgency === 'critical' && "text-red-600",
                        urgency === 'high' && "text-orange-600",
                        urgency === 'medium' && "text-yellow-600",
                        urgency === 'low' && "text-green-600"
                      )}
                    >
                      {slots}
                    </motion.div>
                    <p className="text-sm text-luxury-slate">
                      {slots === 1 ? 'Slot Available' : 'Slots Available'}
                    </p>

                    {/* Urgency Indicator */}
                    {urgency === 'critical' && (
                      <div className="mt-2 text-xs text-red-600 font-medium animate-pulse">
                        Almost Full!
                      </div>
                    )}
                    {urgency === 'high' && (
                      <div className="mt-2 text-xs text-orange-600 font-medium">
                        Filling Fast
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="card-luxury mb-12 bg-gradient-to-r from-luxury-gold/10 to-luxury-darkGold/10"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Clock className="w-8 h-8 text-luxury-gold" />
              <h3 className="text-2xl font-serif font-bold text-luxury-charcoal">
                Next Quarter Booking Deadline
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { label: 'Days', value: countdown.days },
                { label: 'Hours', value: countdown.hours },
                { label: 'Minutes', value: countdown.minutes },
                { label: 'Seconds', value: countdown.seconds },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <motion.div
                    key={item.value}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-4xl md:text-5xl font-bold text-luxury-gold mb-2 font-mono"
                  >
                    {String(item.value).padStart(2, '0')}
                  </motion.div>
                  <div className="text-sm text-luxury-slate font-medium uppercase tracking-wide">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Social Proof & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            {/* Social Proof */}
            <div className="flex items-center justify-center space-x-8 mb-8 text-sm text-luxury-slate">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-luxury-gold" />
                <span>98% Client Satisfaction</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-luxury-platinum"></div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-luxury-gold fill-current" />
                <span>5-Star Rated</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-luxury-platinum"></div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-luxury-gold" />
                <span>15+ Years Experience</span>
              </div>
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBookNowClick}
              className="btn-luxury text-xl px-12 py-5 relative group"
            >
              <span className="relative z-10">Reserve Your Spot Now</span>
              
              {/* Urgency pulse for critical slots */}
              {urgencyLevel === 'critical' && (
                <div className="absolute inset-0 rounded-lg bg-red-500/20 animate-pulse"></div>
              )}
            </motion.button>

            <p className="mt-4 text-sm text-luxury-slate/70">
              * Slots are allocated on a first-come, first-served basis
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}