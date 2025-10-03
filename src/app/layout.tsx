// src/app/layout.tsx - FIXED GTM PROP TO gtmId (TS-SAFE)
import type { Metadata } from 'next';
import Script from 'next/script';
import { GoogleTagManager } from '@next/third-parties/google';
import './globals.css';
import AdaptiveNavigation from '@/components/ui/AdaptiveNavigation';
import RitzCarltonFooter from '@/components/ui/RitzCarltonFooter';
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp';

export const metadata: Metadata = {
  title: {
    default: 'OliveHaus Interiors - Luxury Interior Design',
    template: '%s | OliveHaus Interiors',
  },
  description: 'Premier luxury interior design company serving high-net-worth individuals in Nigeria and internationally. Creating bespoke, timeless, and functional spaces for discerning clients.',
  keywords: [
    'luxury interior design',
    'Nigeria interior design',
    'high-end interior design',
    'bespoke interior design',
    'luxury homes Nigeria',
    'interior design Lagos',
    'premium interior design',
    'OliveHaus Interiors'
  ],
  authors: [{ name: 'OliveHaus Interiors' }],
  creator: 'OliveHaus Interiors',
  publisher: 'OliveHaus Interiors',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://olivehausinteriors.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'en-NG': '/en-NG',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://olivehausinteriors.com',
    title: 'OliveHaus Interiors - Luxury Interior Design',
    description: 'Premier luxury interior design company serving high-net-worth individuals in Nigeria and internationally.',
    siteName: 'OliveHaus Interiors',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'OliveHaus Interiors - Luxury Interior Design',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OliveHaus Interiors - Luxury Interior Design',
    description: 'Premier luxury interior design company serving high-net-worth individuals in Nigeria and internationally.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  category: 'Interior Design',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        
        {/* Google Fonts - Luxury Typography */}
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Lato:wght@300;400;700;900&family=Oranienbaum&family=Playfair+Display:wght@400;700;900&family=Quintessential&family=Almendra+Display&display=swap"
          rel="stylesheet"
        />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme color */}
        <meta name="theme-color" content="#D4AF37" />
        <meta name="msapplication-TileColor" content="#D4AF37" />
        
        {/* Viewport for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      
      <body className="font-sans antialiased bg-ivory text-luxury-charcoal">
        {/* GTM - Production only */}
        {process.env.NODE_ENV === 'production' && (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ''} />
        )}

        {/* Main wrapper - removing height:100% constraints that might hide footer */}
        <div id="app-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          {/* Skip to main content for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-luxury-gold text-white px-4 py-2 rounded-lg z-50 transition-all duration-300"
          >
            Skip to main content
          </a>
          
          {/* Adaptive Navigation Component */}
          <AdaptiveNavigation />
          
          {/* Main content - flex-1 to take remaining space */}
          <main id="main-content" style={{ flex: 1, paddingTop: '80px' }}>
            {children}
          </main>
          
          {/* Footer - Force visibility with explicit background */}
          <div className="bg-luxury-charcoal" style={{ backgroundColor: '#1C1C1C' }}>
            <RitzCarltonFooter />
          </div>
        </div>
        
        {/* Floating WhatsApp Button */}
        <FloatingWhatsApp 
          phoneNumber="+2348089533353"
          whatsappNumber="+2348089533353"
        />
        
        {/* Loading indicator for better UX */}
        <div id="loading-indicator" className="fixed top-0 left-0 w-full h-1 bg-luxury-gold/20 z-50 opacity-0 transition-opacity duration-300">
          <div className="h-full bg-luxury-gold w-0 transition-all duration-300 ease-out" />
        </div>

        {/* Structured Data for Local Business */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'InteriorDesignCompany',
              name: 'OliveHaus Interiors',
              image: '/og-image.jpg',
              description: 'Premier luxury interior design company serving high-net-worth individuals in Nigeria and internationally.',
              url: 'https://olivehausinteriors.com',
              telephone: '+234-808-953-3353',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Lagos',
                addressCountry: 'NG',
              },
              sameAs: [
                'https://instagram.com/olivehausinteriors',
              ],
            }),
          }}
        />

        {/* Google Analytics */}
        {process.env.NODE_ENV === 'production' && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_title: document.title,
                  page_location: window.location.href,
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}