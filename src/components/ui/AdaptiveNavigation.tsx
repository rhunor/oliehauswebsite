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
  { label: 'About Us', href: '/about' },
  { label: 'Projects', href: '/projects' },
    { label: 'Services', href: '/services' },
  { label: 'Inside the Design', href: '/inside-the-design' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
];

const AdaptiveNavigation: React.FC<AdaptiveNavigationProps> = ({ className = '' }) => {
  // Use comma to ignore the unused state value, only keep the setter
  const [, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    isAtTop: true,
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Simple scroll detection - track scroll for potential animations but navbar always has background
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

  // Always visible navbar with solid background (no transparency)
  const navbarClasses = cn(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out',
    'bg-white/95 backdrop-blur-md shadow-lg', // Always have solid background
    className
  );

  // Always use dark text since we now have a light background
  const textClasses = 'text-luxury-charcoal';
  // const phoneIconClasses = 'w-5 h-5 transition-colors duration-300 text-luxury-charcoal';
  const hamburgerClasses = 'w-6 h-6 transition-colors duration-300 text-luxury-charcoal';

  return (
    <>
      <nav className={navbarClasses}>
        <div className="container-luxury">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo - Left aligned */}
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

            {/* Desktop Navigation - Left aligned next to logo with proper spacing */}
            <div className="hidden lg:flex items-center ml-16">
              <div className="flex items-center space-x-10">
                {navigationItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`relative py-3 px-1 font-medium text-sm tracking-wide transition-all duration-300 hover:text-luxury-gold ${textClasses} group whitespace-nowrap`}
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-luxury-gold transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact CTA & Mobile Menu - Right aligned */}
            <div className="flex items-center space-x-4">
              {/* <Link
                href="tel:+2348000000000"
                className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-300 hover:bg-luxury-gold hover:text-white hover:border-luxury-gold border-luxury-charcoal ${textClasses} hidden md:flex`}
              >
                <Phone className={phoneIconClasses} />
                <span className="font-medium">Call Us</span>
              </Link> */}

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-lg transition-colors duration-300 hover:bg-luxury-platinum/20"
                aria-label="Toggle mobile menu"
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={closeMobileMenu}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 lg:hidden"
          >
            <div className="p-6">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between mb-8 pt-4">
                <div className="flex items-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h1 className="font-serif text-2xl font-bold tracking-wide text-luxury-charcoal">
                      <span className="text-luxury-gold">OLIVE</span>
                      <span>HAUS</span>
                    </h1>
                    <p className="text-xs font-light tracking-[0.2em] uppercase text-luxury-charcoal opacity-80">
                      I N T E R I O R S
                    </p>
                  </motion.div>
                </div>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 text-luxury-charcoal hover:bg-luxury-platinum/20 rounded-lg transition-colors duration-300"
                  aria-label="Close mobile menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="space-y-2 mb-8">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="block px-4 py-3 text-luxury-charcoal font-medium rounded-lg hover:bg-luxury-gold/10 hover:text-luxury-gold transition-all duration-300"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile CTA */}
              <div className="border-t border-luxury-platinum pt-6">
                <Link
                  href="tel:+2348000000000"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center space-x-2 w-full px-6 py-3 bg-luxury-gold text-white rounded-lg hover:bg-luxury-gold/90 transition-colors duration-300 font-medium"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Us Now</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdaptiveNavigation;