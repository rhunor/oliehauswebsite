'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface NavigationItem {
  label: string;
  href: string;
}

interface ScrollState {
  scrollY: number;
  isAtTop: boolean;
}

interface AdaptiveNavigationProps {
  className?: string;
}

const navigationItems: NavigationItem[] = [
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Inside the Design', href: '/inside-design' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const AdaptiveNavigation: React.FC<AdaptiveNavigationProps> = ({ className = '' }) => {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    isAtTop: true,
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Simple scroll detection - no hiding navbar
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const isAtTop = currentScrollY < 10;

    setScrollState({
      scrollY: currentScrollY,
      isAtTop,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const toggleMobileMenu = (): void => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = (): void => setIsMobileMenuOpen(false);

  // Always visible navbar - only changes background
  const navbarClasses = cn(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out',
    scrollState.isAtTop 
      ? 'bg-transparent backdrop-blur-none' 
      : 'bg-white/95 backdrop-blur-md shadow-lg',
    className
  );

  const textClasses = scrollState.isAtTop ? 'text-white' : 'text-luxury-charcoal';
  const phoneIconClasses = `w-5 h-5 transition-colors duration-300 ${scrollState.isAtTop ? 'text-white' : 'text-luxury-charcoal'}`;
  const hamburgerClasses = `w-6 h-6 transition-colors duration-300 ${scrollState.isAtTop ? 'text-white' : 'text-luxury-charcoal'}`;

  return (
    <>
      <nav className={navbarClasses}>
        <div className="container-luxury">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo - Larger size */}
            <Link href="/" className="flex-shrink-0 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <h1 className={`font-serif text-3xl lg:text-4xl font-bold tracking-wide ${textClasses}`}>
                  <span className="text-luxury-gold">OLIVE</span>
                  <span>HAUS</span>
                </h1>
                <p className={`text-xs lg:text-sm font-light tracking-[0.2em] uppercase ${textClasses} opacity-80`}>
                  I N T E R I O R S
                </p>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative py-2 font-medium transition-all duration-300 hover:text-luxury-gold ${textClasses} group`}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-luxury-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Contact CTA & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <Link
                href="tel:+2348000000000"
                className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-300 hover:bg-luxury-gold hover:text-white hover:border-luxury-gold ${
                  scrollState.isAtTop 
                    ? 'border-white/30 text-white' 
                    : 'border-luxury-charcoal/20 text-luxury-charcoal'
                }`}
              >
                <Phone className={phoneIconClasses} />
                <span className="hidden sm:inline font-medium">Call Us</span>
              </Link>

              <button
                onClick={toggleMobileMenu}
                className={`lg:hidden p-2 rounded-lg transition-all duration-300 hover:bg-white/10 ${textClasses}`}
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className={hamburgerClasses} />
                ) : (
                  <Menu className={hamburgerClasses} />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Same as before */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={closeMobileMenu}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ 
                type: 'spring', 
                damping: 25, 
                stiffness: 200,
                duration: 0.5 
              }}
              className="fixed top-0 right-0 h-full w-80 bg-white z-50 lg:hidden shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div>
                  <h2 className="font-serif text-xl font-bold text-luxury-charcoal">
                    <span className="text-luxury-gold">OLIVE</span>HAUS
                  </h2>
                  <p className="text-xs font-light tracking-[0.2em] uppercase text-luxury-charcoal/70">
                    I N T E R I O R S
                  </p>
                </div>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  aria-label="Close mobile menu"
                >
                  <X className="w-6 h-6 text-luxury-charcoal" />
                </button>
              </div>

              <div className="py-8">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="block px-6 py-4 text-lg font-medium text-luxury-charcoal hover:text-luxury-gold hover:bg-soft-sage/10 transition-all duration-300 border-b border-gray-50 last:border-b-0"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-soft-sage/5">
                <div className="space-y-4">
                  <Link
                    href="tel:+2348000000000"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-center space-x-2 w-full py-3 px-4 bg-luxury-gold text-white rounded-lg font-medium transition-all duration-300 hover:bg-luxury-gold/90"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Call Us Now</span>
                  </Link>
                  
                  <Link
                    href="https://wa.me/2348000000000"
                    onClick={closeMobileMenu}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full py-3 px-4 border border-luxury-gold text-luxury-gold rounded-lg font-medium transition-all duration-300 hover:bg-luxury-gold hover:text-white"
                  >
                    WhatsApp Us
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdaptiveNavigation;