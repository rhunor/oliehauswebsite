//src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'OliveHaus Interiors | Nigeria&apos;s Premier Luxury Interior Design',
  description: 'OliveHaus Interiors is Nigeria&apos;s premier interior design company serving luxury residential, corporate, and commercial clients. Design for High Quality Living.',
  keywords: 'luxury interior design Nigeria, OliveHaus Interiors, bespoke design, high-end interiors, residential design, commercial design',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#D4AF37" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      
      <body className="font-sans antialiased bg-ivory text-luxury-charcoal">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-luxury-gold text-white px-4 py-2 rounded-lg z-50 transition-all duration-300"
        >
          Skip to main content
        </a>
        
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        
        <footer className="bg-luxury-charcoal text-white py-12">
          <div className="container-luxury">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div className="md:col-span-2">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 mr-3">
                    <img
                      src="/images/logo_transparent_background.png"
                      alt="OliveHaus Interiors Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold">OliveHaus Interiors</h3>
                    <p className="text-sm text-luxury-platinum/80">Design for High Quality Living</p>
                  </div>
                </div>
                <p className="text-luxury-platinum/80 mb-4 max-w-md">
                  Nigeria&apos;s premier interior design company creating bespoke, timeless, and functional spaces for discerning clients.
                </p>
                <p className="text-sm text-luxury-platinum/60">
                  &apos;Designers who begin with the end in mind&apos;
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-luxury-platinum/80">
                  <li><a href="/about" className="hover:text-luxury-gold transition-colors duration-300">About Us</a></li>
                  <li><a href="/projects" className="hover:text-luxury-gold transition-colors duration-300">Projects</a></li>
                  <li><a href="/services" className="hover:text-luxury-gold transition-colors duration-300">Services</a></li>
                  <li><a href="/inside-the-design" className="hover:text-luxury-gold transition-colors duration-300">Inside the Design</a></li>
                  <li><a href="/contact" className="hover:text-luxury-gold transition-colors duration-300">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact</h4>
                <ul className="space-y-2 text-luxury-platinum/80 text-sm">
                  <li>Lagos, Nigeria</li>
                  <li>
                    <a href="tel:+2348123456789" className="hover:text-luxury-gold transition-colors duration-300">
                      +234 812 345 6789
                    </a>
                  </li>
                  <li>
                    <a href="mailto:hello@olivehausinteriors.com" className="hover:text-luxury-gold transition-colors duration-300">
                      hello@olivehausinteriors.com
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://wa.me/2348123456789" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-luxury-gold transition-colors duration-300"
                    >
                      WhatsApp
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-luxury-platinum/20 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-luxury-platinum/60 text-sm mb-4 md:mb-0">
                  &copy; 2025 OliveHaus Interiors. All rights reserved.
                </p>
                <div className="flex space-x-6 text-sm">
                  <a href="/privacy" className="text-luxury-platinum/60 hover:text-luxury-gold transition-colors duration-300">
                    Privacy Policy
                  </a>
                  <a href="/terms" className="text-luxury-platinum/60 hover:text-luxury-gold transition-colors duration-300">
                    Terms of Service
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
        
        <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
          <a
            href="https://wa.me/2348123456789"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-luxury-strong hover:shadow-luxury-glow transition-all duration-300 transform hover:scale-110"
            aria-label="Contact us on WhatsApp"
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.106"/>
            </svg>
          </a>
          
          <a
            href="tel:+2348123456789"
            className="w-14 h-14 bg-luxury-gold hover:bg-luxury-gold/90 text-white rounded-full flex items-center justify-center shadow-luxury-strong hover:shadow-luxury-glow transition-all duration-300 transform hover:scale-110"
            aria-label="Call us"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </a>
        </div>
      </body>
    </html>
  );
}