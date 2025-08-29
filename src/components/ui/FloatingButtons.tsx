//src/components/ui/FloatingButton.tsx
'use client';

import { useState, useEffect } from 'react';
import { Phone, MessageCircle, X, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, buildWhatsAppUrl, buildPhoneUrl } from '@/lib/utils';

interface FloatingButtonsProps {
  phone: string;
  whatsapp: string;
  className?: string;
}

export default function FloatingButtons({ 
  phone, 
  whatsapp, 
  className 
}: FloatingButtonsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle WhatsApp click
  const handleWhatsAppClick = () => {
    const defaultMessage = "Hello! I'm interested in OliveHaus Interiors' luxury design services. I'd like to discuss my project.";
    const whatsappUrl = buildWhatsAppUrl(whatsapp, defaultMessage);
    window.open(whatsappUrl, '_blank');
    
    // Analytics tracking
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'click', {
        event_category: 'engagement',
        event_label: 'whatsapp_floating_button',
      });
    }
  };

  // Handle phone click
  const handlePhoneClick = () => {
    window.location.href = buildPhoneUrl(phone);
    
    // Analytics tracking
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'click', {
        event_category: 'engagement',
        event_label: 'phone_floating_button',
      });
    }
  };

  // Handle scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Main floating buttons */}
      <div className={cn(
        "fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3",
        className
      )}>
        {/* Scroll to top button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="p-3 bg-luxury-charcoal/90 backdrop-blur-sm text-white rounded-full shadow-luxury hover:bg-luxury-charcoal transition-all duration-300"
              aria-label="Scroll to top"
            >
              <ChevronUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Individual contact buttons when expanded */}
        <AnimatePresence>
          {isExpanded && (
            <>
              {/* WhatsApp Button */}
              <motion.button
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleWhatsAppClick}
                className="group relative p-4 bg-green-500 text-white rounded-full shadow-luxury hover:bg-green-600 transition-all duration-300"
                aria-label="Contact via WhatsApp"
              >
                <MessageCircle className="w-6 h-6" />
                
                {/* Tooltip */}
                <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-luxury-charcoal text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
                    WhatsApp Us
                    <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-luxury-charcoal"></div>
                  </div>
                </div>
              </motion.button>

              {/* Phone Button */}
              <motion.button
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ delay: 0.05 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePhoneClick}
                className="group relative p-4 bg-luxury-gold text-white rounded-full shadow-luxury hover:bg-luxury-darkGold transition-all duration-300"
                aria-label="Call us directly"
              >
                <Phone className="w-6 h-6" />
                
                {/* Tooltip */}
                <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-luxury-charcoal text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
                    Call Us
                    <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-luxury-charcoal"></div>
                  </div>
                </div>
              </motion.button>
            </>
          )}
        </AnimatePresence>

        {/* Main toggle button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "relative p-5 bg-gradient-to-r from-luxury-gold to-luxury-darkGold text-white rounded-full shadow-luxury-lg transition-all duration-300",
            isExpanded && "rotate-45"
          )}
          aria-label={isExpanded ? "Close contact options" : "Open contact options"}
        >
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="hire"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center space-x-2"
              >
                <span className="font-medium text-sm whitespace-nowrap">Hire Us</span>
                <div className="flex space-x-1">
                  <MessageCircle className="w-4 h-4" />
                  <Phone className="w-4 h-4" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulse animation ring */}
          <div className="absolute inset-0 rounded-full bg-luxury-gold animate-ping opacity-20"></div>
        </motion.button>
      </div>

      {/* Mobile-specific quick actions bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-sm border-t border-luxury-platinum p-4">
        <div className="flex space-x-3">
          <button
            onClick={handlePhoneClick}
            className="flex-1 flex items-center justify-center space-x-2 py-3 bg-luxury-gold text-white rounded-lg font-medium transition-all duration-300 hover:bg-luxury-darkGold"
          >
            <Phone className="w-5 h-5" />
            <span>Call Now</span>
          </button>
          
          <button
            onClick={handleWhatsAppClick}
            className="flex-1 flex items-center justify-center space-x-2 py-3 bg-green-500 text-white rounded-lg font-medium transition-all duration-300 hover:bg-green-600"
          >
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </>
  );
}