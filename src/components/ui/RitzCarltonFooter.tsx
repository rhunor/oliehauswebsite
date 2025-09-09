'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Instagram, Linkedin, Facebook } from 'lucide-react';

const RitzCarltonFooter: React.FC = () => {
  return (
    <footer className="bg-luxury-charcoal text-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.01] pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, #D4AF37 1px, transparent 1px),
            radial-gradient(circle at 80% 20%, #D4AF37 1px, transparent 1px),
            radial-gradient(circle at 20% 80%, #D4AF37 1px, transparent 1px),
            radial-gradient(circle at 80% 80%, #D4AF37 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, #D4AF37 0.5px, transparent 0.5px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Main Footer Content */}
      <div className="relative z-10 pt-16 pb-8">
        <div className="container-luxury">
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h3 className="font-serif text-3xl font-bold text-luxury-gold mb-3 tracking-wide">
                  OLIVEHAUS INTERIORS
                </h3>
                <p className="text-sm font-light tracking-[0.3em] uppercase text-white/70 mb-6">
                  L U X U R Y &nbsp;&nbsp; I N T E R I O R &nbsp;&nbsp; D E S I G N
                </p>
                <p className="text-white/90 leading-relaxed max-w-lg font-sans text-base">
                  Creating bespoke, timeless, and functional spaces for discerning clients in Nigeria and internationally. Where luxury meets exceptional craftsmanship.
                </p>
              </div>
              
              {/* Contact Information */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-luxury-gold" />
                  <a href="tel:+2348000000000" className="text-white/80 hover:text-luxury-gold transition-colors font-sans">
                    +234 800 000 0000
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-luxury-gold" />
                  <a href="mailto:hello@olivehausinteriors.com" className="text-white/80 hover:text-luxury-gold transition-colors font-sans">
                    hello@olivehausinteriors.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-luxury-gold" />
                  <span className="text-white/80 font-sans">Lagos, Nigeria</span>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div>
              <h4 className="font-serif text-xl font-semibold text-luxury-gold mb-6 tracking-wide">
                Explore
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/portfolio" className="text-white/80 hover:text-luxury-gold transition-colors font-sans text-sm">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link href="/inside-design" className="text-white/80 hover:text-luxury-gold transition-colors font-sans text-sm">
                    Inside the Design
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-white/80 hover:text-luxury-gold transition-colors font-sans text-sm">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-white/80 hover:text-luxury-gold transition-colors font-sans text-sm">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-serif text-xl font-semibold text-luxury-gold mb-6 tracking-wide">
                Services
              </h4>
              <ul className="space-y-3">
                <li>
                  <span className="text-white/80 font-sans text-sm">Residential Design</span>
                </li>
                <li>
                  <span className="text-white/80 font-sans text-sm">Corporate Interiors</span>
                </li>
                <li>
                  <span className="text-white/80 font-sans text-sm">Commercial Spaces</span>
                </li>
                <li>
                  <span className="text-white/80 font-sans text-sm">Remote Oversight</span>
                </li>
                <li>
                  <span className="text-white/80 font-sans text-sm">Project Management</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent mb-8"></div>

          {/* Social Media & CTA Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Social Media */}
            <div>
              <h4 className="font-serif text-lg font-semibold text-luxury-gold mb-4 tracking-wide">
                Follow Our Journey
              </h4>
              <div className="flex space-x-4">
                <a 
                  href="https://instagram.com/olivehausinteriors" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-luxury-gold transition-all duration-300 group"
                >
                  <Instagram className="w-5 h-5 text-white group-hover:text-luxury-charcoal" />
                </a>
                <a 
                  href="https://linkedin.com/company/olivehaus-interiors" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-luxury-gold transition-all duration-300 group"
                >
                  <Linkedin className="w-5 h-5 text-white group-hover:text-luxury-charcoal" />
                </a>
                <a 
                  href="https://facebook.com/olivehausinteriors" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-luxury-gold transition-all duration-300 group"
                >
                  <Facebook className="w-5 h-5 text-white group-hover:text-luxury-charcoal" />
                </a>
              </div>
            </div>

            {/* CTA */}
            <div className="lg:text-right">
              <h4 className="font-serif text-lg font-semibold text-luxury-gold mb-4 tracking-wide">
                Ready to Begin?
              </h4>
              <div className="flex flex-col sm:flex-row lg:justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                <a 
                  href="tel:+2348000000000"
                  className="inline-flex items-center justify-center px-6 py-3 bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-charcoal font-semibold rounded-lg transition-all duration-300 font-sans text-sm"
                >
                  Call Us
                </a>
                <a 
                  href="https://wa.me/2348000000000"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-charcoal font-semibold rounded-lg transition-all duration-300 font-sans text-sm"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              <div className="text-center lg:text-left">
                <p className="text-white/60 text-sm font-sans">
                  &copy; 2025 OliveHaus Interiors. All rights reserved.
                </p>
              </div>
              
              <div className="text-center lg:text-right">
                <p className="text-white/60 text-sm font-serif italic tracking-wide">
                  &apos;Design for High Quality Living&apos;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default RitzCarltonFooter;