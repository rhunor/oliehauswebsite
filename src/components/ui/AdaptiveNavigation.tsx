//src/components/ui/AdaptiveNavigation.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
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
  { label: 'Our Shortlets', href: 'https://www.giftedhomesandapartments.com/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Project Tracker', href: 'https://olivehausdailymanager.com/' }
];

const AdaptiveNavigation: React.FC<AdaptiveNavigationProps> = ({ className = '' }) => {
  const [, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    isAtTop: true,
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

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

  const navbarClasses = cn(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out',
    'bg-white/95 backdrop-blur-md shadow-lg',
    className
  );

  const textClasses = 'text-luxury-charcoal';
  const hamburgerClasses = 'w-6 h-6 transition-colors duration-300 text-luxury-charcoal';

  return (
    <>
      <nav className={navbarClasses}>
        <div className="container-luxury">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo with Luxury Underline - Fixed Alignment */}
            <Link href="/" className="flex-shrink-0 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="relative flex flex-col items-start"
              >
                <h1 className={`font-olivehaus text-3xl lg:text-4xl font-bold tracking-wide ${textClasses} relative`}>
                  <span className="text-luxury-gold">OLIVE</span>
                  <span>HAUS</span>
                 
                  {/* Elegant Underline - Now directly under OLIVEHAUS */}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-luxury-gold via-yellow-400 to-luxury-gold"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    style={{ transformOrigin: 'left' }}
                  />
                  {/* Decorative dots */}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-1 h-1 bg-luxury-gold rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  />
                  <motion.div
                    className="absolute -bottom-1 right-0 w-1 h-1 bg-luxury-gold rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                  />
                </h1>
                <p className={`text-xs lg:text-sm font-light tracking-[0.3em] uppercase ${textClasses} opacity-80 mt-1 w-full text-center`}>
                  INTERIORS
                </p>
              </motion.div>
            </Link>

            {/* Desktop Navigation with Slash Separators */}
            <div className="hidden lg:flex items-center ml-auto">
              <div className="flex items-center ">
                {navigationItems.map((item, index) => (
                  <React.Fragment key={item.label}>
                    <Link
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`relative py-3 px-4 font-medium text-sm tracking-wide transition-all duration-300 hover:text-luxury-gold ${textClasses} group whitespace-nowrap`}
                    >
                      {item.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-luxury-gold transition-all duration-300 group-hover:w-full" />
                    </Link>
                    
                    {/* Slash Separator - Not shown after last item */}
                    {index < navigationItems.length - 1 && (
                      <motion.span
                        className="text-luxury-gold/40 text-sm font-light select-none"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: 0.8 + (index * 0.1),
                          ease: "easeOut"
                        }}
                        whileHover={{ 
                          scale: 1.2,
                          color: 'rgb(218, 165, 32)',
                          transition: { duration: 0.2 }
                        }}
                      >
                        |
                      </motion.span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

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
              {/* Mobile Menu Header - Better Logo Alignment */}
              <div className="flex items-center justify-between mb-8 pt-4">
                <div className="flex items-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="relative">
                      <h1 className="font-serif text-2xl font-bold tracking-wide text-luxury-charcoal">
                        <span className="text-luxury-gold">OLIVE</span>
                        <span>HAUS</span>
                        <span 
                          className="inline-block text-luxury-gold/60 font-light ml-1"
                          style={{ 
                            fontSize: '0.75em',
                            verticalAlign: 'super',
                            marginTop: '-0.2em'
                          }}
                        >
                          /
                        </span>
                      </h1>
                      <p className="text-xs font-light tracking-[0.2em] uppercase text-luxury-charcoal opacity-80 mt-0.5">
                        INTERIORS
                      </p>
                    </div>
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
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      onClick={closeMobileMenu}
                      className="block px-4 py-3 text-luxury-charcoal font-medium rounded-lg hover:bg-luxury-gold/10 hover:text-luxury-gold transition-all duration-300"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdaptiveNavigation;