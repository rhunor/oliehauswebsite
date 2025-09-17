'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, X, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FloatingWhatsAppProps {
  phoneNumber: string;
  whatsappNumber: string;
  message?: string;
  className?: string;
}

// interface GtagConfig {
//   event_category: string;
//   event_label: string;
// }

// Extend window type for gtag (match the signature from HeroSection.tsx to avoid conflicts)
declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "set",
      targetId: string,
      config?: Record<string, unknown> | undefined
    ) => void;
  }
}

const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  phoneNumber,
  whatsappNumber,
  message = "Hello! I'm interested in OliveHaus Interiors' luxury design services.",
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Handle scroll visibility
  useEffect(() => {
    const handleScroll = (): void => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = (): void => {
    const encodedMessage = encodeURIComponent(message);
    const formattedNumber = whatsappNumber.replace(/[^\d]/g, '');
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
    
    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'engagement',
        event_label: 'whatsapp_floating_button',
      });
    }
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsExpanded(false);
  };

  const handlePhoneClick = (): void => {
    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'engagement',
        event_label: 'phone_floating_button',
      });
    }
    
    window.location.href = `tel:${phoneNumber}`;
    setIsExpanded(false);
  };

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleExpanded = (): void => {
    setIsExpanded(prev => !prev);
  };

  return (
    <>
      {/* Floating Button Container */}
      <div className={cn(
        "fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3",
        className
      )}>
        
        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="p-3 bg-luxury-charcoal/90 backdrop-blur-sm text-white rounded-full shadow-luxury-hard hover:bg-luxury-charcoal transition-all duration-300"
              aria-label="Scroll to top"
            >
              <ChevronUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Expanded Options */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="bg-white rounded-2xl shadow-luxury-hard border border-luxury-gold/20 overflow-hidden mb-2"
            >
              {/* WhatsApp Option */}
              <button
                onClick={handleWhatsAppClick}
                className="w-full flex items-center space-x-3 px-5 py-4 text-left hover:bg-luxury-cream/50 transition-colors duration-200 border-b border-luxury-platinum/30"
              >
                <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-md">
                  <MessageCircle className="w-5 h-5" fill="white" />
                </div>
                <div className="min-w-[140px]">
                  <div className="font-semibold text-luxury-charcoal text-sm">WhatsApp</div>
                  <div className="text-xs text-luxury-slate">Quick message</div>
                </div>
              </button>
              
              {/* Phone Option */}
              <button
                onClick={handlePhoneClick}
                className="w-full flex items-center space-x-3 px-5 py-4 text-left hover:bg-luxury-cream/50 transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-luxury-gold rounded-full flex items-center justify-center text-white shadow-md">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="min-w-[140px]">
                  <div className="font-semibold text-luxury-charcoal text-sm">Call Us</div>
                  <div className="text-xs text-luxury-slate">Direct line</div>
                </div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main WhatsApp Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleExpanded}
          className={cn(
            "relative p-4 rounded-full shadow-luxury-hard transition-all duration-300",
            isExpanded 
              ? "bg-luxury-charcoal hover:bg-luxury-charcoal/90"
              : "bg-[#25D366] hover:bg-[#20BD5C] animate-luxury-pulse"
          )}
          aria-label={isExpanded ? "Close contact options" : "Open contact options"}
        >
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="whatsapp"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-6 h-6 text-white" fill="white" />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Tooltip on hover */}
          {!isExpanded && (
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-luxury-charcoal text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
                Contact Us
                <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-luxury-charcoal"></div>
              </div>
            </div>
          )}
        </motion.button>
      </div>
    </>
  );
};

export default FloatingWhatsApp;