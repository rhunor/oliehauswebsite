import type { Metadata } from 'next';
import { Inter, Playfair_Display, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | OliveHaus Interiors',
    default: 'OliveHaus Interiors - Spaces that Define Luxury. Designs that Feel Like Home.',
  },
  description: 'Premier luxury interior design company serving high-net-worth individuals in Nigeria and internationally. Creating bespoke, timeless, and functional spaces for discerning clients.',
  keywords: [
    'luxury interior design',
    'high-end interior design Nigeria',
    'bespoke interior design',
    'luxury home design',
    'commercial interior design',
    'residential interior design',
    'interior design Lagos',
    'luxury furniture',
    'custom interior design',
    'premium interior design services'
  ],
  authors: [{ name: 'OliveHaus Interiors' }],
  creator: 'OliveHaus Interiors',
  publisher: 'OliveHaus Interiors',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://olivehausinteriors.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
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
    <html 
      lang="en" 
      className={`${inter.variable} ${playfairDisplay.variable} ${cormorantGaramond.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        
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
        
        {/* Structured Data for Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'InteriorDesignCompany',
              name: 'OliveHaus Interiors',
              image: '/og-image.jpg',
              description: 'Premier luxury interior design company serving high-net-worth individuals in Nigeria and internationally.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Lagos',
                addressRegion: 'Lagos State',
                addressCountry: 'Nigeria',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '6.5244',
                longitude: '3.3792',
              },
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://olivehausinteriors.com',
              telephone: '+234-xxx-xxx-xxxx',
              priceRange: '$$$',
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '09:00',
                closes: '17:00',
              },
              sameAs: [
                'https://www.instagram.com/olivehausinteriors',
                'https://www.linkedin.com/company/olivehausinteriors',
                'https://www.facebook.com/olivehausinteriors',
              ],
              serviceArea: {
                '@type': 'Country',
                name: 'Nigeria',
              },
              areaServed: [
                {
                  '@type': 'Country',
                  name: 'Nigeria',
                },
                {
                  '@type': 'Continent',
                  name: 'Africa',
                },
              ],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Interior Design Services',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Luxury Residential Interior Design',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Corporate Interior Design',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Commercial Interior Design',
                    },
                  },
                ],
              },
            }),
          }}
        />
        
        {/* Google Analytics - Only in production */}
        {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_title: document.title,
                    page_location: window.location.href,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      
      <body className="font-sans antialiased bg-ivory text-luxury-charcoal">
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-luxury-gold text-white px-4 py-2 rounded-lg z-50 transition-all duration-300"
        >
          Skip to main content
        </a>
        
        {/* Main content */}
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="bg-luxury-charcoal text-white py-8">
          <div className="container-luxury">
            <div className="text-center">
              <p className="text-lg font-elegant mb-2">
                OliveHaus Interiors
              </p>
              <p className="text-luxury-platinum/80 text-sm">
                &apos;Design for High Quality Living&apos; &copy; 2025
              </p>
            </div>
          </div>
        </footer>
        
        {/* Loading indicator for better UX */}
        <div id="loading-indicator" className="fixed top-0 left-0 w-full h-1 bg-luxury-gold/20 z-50 opacity-0 transition-opacity duration-300">
          <div className="h-full bg-luxury-gold w-0 transition-all duration-300 ease-out" />
        </div>
      </body>
    </html>
  );
}