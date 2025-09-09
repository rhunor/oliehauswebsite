//src/components/ui/Navigation.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationItem {
  href: string;
  label: string;
  isExternal?: boolean;
}

interface NavigationProps {
  className?: string;
  logoSrc?: string;
  logoAlt?: string;
  onHireUsClick?: () => void;
}

const navigationItems: NavigationItem[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' },
  { href: '/inside-the-design', label: 'Inside the Design' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact Us' },
];

export default function Navigation({ 
  className,
  logoSrc = '/images/logo_transparent_background.png',
  logoAlt = 'OliveHaus Interiors Logo',
  onHireUsClick
}: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mobile menu close on route change
  useEffect(() => {
    const handleRouteChange = (): void => {
      setIsMobileMenuOpen(false);
    };

    // Close mobile menu when clicking outside
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as HTMLElement;
      if (!target.closest('.mobile-menu') && !target.closest('.mobile-menu-trigger')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // Handle CTA click with analytics tracking
  const handleHireUsClick = (): void => {
    if (onHireUsClick) {
      onHireUsClick();
    }
    
    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'engagement',
        event_label: 'nav_hire_us',
      });
    }
  };

  // Handle mobile menu toggle
  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(prev => !prev);
  };

  return (
    <>
      {/* Main Navigation */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-luxury-soft py-3" 
          : "bg-transparent py-4",
        className
      )}>
        <div className="container-luxury">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="relative w-12 h-12 md:w-16 md:h-16 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={logoSrc}
                  alt={logoAlt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="ml-3 hidden md:block">
                {/* <div className="font-serif text-xl lg:text-2xl font-bold text-luxury-charcoal">
                  OliveHaus
                </div>
                <div className="text-xs lg:text-sm text-luxury-slate tracking-wider uppercase">
                  Interiors
                </div> */}
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-all duration-300 hover:text-luxury-gold relative group",
                    isScrolled ? "text-luxury-charcoal" : "text-white"
                  )}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-luxury-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-4">
              {/* Hire Us Button */}
              <button
                onClick={handleHireUsClick}
                className="btn-luxury-outline hidden md:flex items-center space-x-2 text-sm px-6 py-3"
              >
                <Phone className="w-4 h-4" />
                <span>Hire Us Now</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className={cn(
                  "lg:hidden p-2 rounded-lg transition-colors duration-300 mobile-menu-trigger",
                  isScrolled 
                    ? "text-luxury-charcoal hover:bg-luxury-platinum/20" 
                    : "text-white hover:bg-white/20"
                )}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
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
            onClick={() => setIsMobileMenuOpen(false)}
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
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-luxury-strong z-50 lg:hidden mobile-menu"
          >
            <div className="p-6">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className="relative w-10 h-10">
                    <Image
                      src={logoSrc}
                      alt={logoAlt}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="font-serif text-lg font-bold text-luxury-charcoal">
                      OliveHaus
                    </div>
                    <div className="text-xs text-luxury-slate tracking-wider uppercase">
                      Interiors
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-luxury-charcoal hover:bg-luxury-platinum/20 rounded-lg transition-colors duration-300"
                  aria-label="Close mobile menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="space-y-4 mb-8">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="block py-3 px-4 text-luxury-charcoal hover:text-luxury-gold hover:bg-luxury-cream/50 rounded-lg transition-all duration-300 font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile CTA Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleHireUsClick}
                  className="w-full btn-luxury flex items-center justify-center space-x-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Hire Us Now</span>
                </button>
                
                <button
                  onClick={() => {
                    window.open('https://wa.me/1234567890', '_blank');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full btn-luxury-outline flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}