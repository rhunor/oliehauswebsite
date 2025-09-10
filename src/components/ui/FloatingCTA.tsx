'use client';

import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingCTAProps {
  whatsappNumber?: string;
  phoneNumber?: string;
  whatsappMessage?: string;
  className?: string;
}

const FloatingCTA: React.FC<FloatingCTAProps> = ({
  whatsappNumber = '+2348000000000',
  phoneNumber = '+2348000000000',
  whatsappMessage = 'Hello! I would like to inquire about your luxury interior design services.',
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  // Auto-hide on scroll (optional UX enhancement)
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide when scrolling down fast, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsExpanded(false);
      } else {
        setIsVisible(true);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^\d]/g, '')}?text=${encodedMessage}`;
    
    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'engagement',
        event_label: 'whatsapp_cta',
      });
    }
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handlePhoneClick = () => {
    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'engagement',
        event_label: 'phone_cta',
      });
    }
    
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const toggleExpanded = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`fixed bottom-6 right-6 z-50 ${className}`}
        >
          {/* Expanded Menu */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-luxury-hard border border-luxury-gold/20 overflow-hidden min-w-[200px]"
              >
                {/* WhatsApp Button */}
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full flex items-center space-x-3 px-6 py-4 text-left hover:bg-luxury-cream/50 transition-colors duration-200 border-b border-luxury-platinum/30"
                >
                  <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-md">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-luxury-charcoal text-sm">WhatsApp</div>
                    <div className="text-luxury-slate text-xs">Start conversation</div>
                  </div>
                </button>

                {/* Phone Button */}
                <button
                  onClick={handlePhoneClick}
                  className="w-full flex items-center space-x-3 px-6 py-4 text-left hover:bg-luxury-cream/50 transition-colors duration-200"
                >
                  <div className="w-12 h-12 bg-luxury-gold rounded-full flex items-center justify-center text-white shadow-md">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-luxury-charcoal text-sm">Call Us</div>
                    <div className="text-luxury-slate text-xs">Direct consultation</div>
                  </div>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main CTA Button */}
          <motion.button
            onClick={toggleExpanded}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-16 h-16 bg-gradient-to-br from-luxury-gold to-luxury-gold/80 rounded-full shadow-luxury-hard flex items-center justify-center text-white transition-all duration-300 hover:shadow-luxury-glow group"
          >
            {/* Pulse animation */}
            <div className="absolute inset-0 rounded-full bg-luxury-gold animate-ping opacity-20"></div>
            
            {/* Icon */}
            <AnimatePresence mode="wait">
              {isExpanded ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-7 h-7" />
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MessageCircle className="w-7 h-7" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Luxury glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-luxury-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
          </motion.button>

          {/* Elegant text label that appears on hover */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute right-20 top-1/2 -translate-y-1/2 bg-luxury-charcoal text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg pointer-events-none whitespace-nowrap"
          >
            Get in Touch
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-luxury-charcoal rotate-45"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTA;