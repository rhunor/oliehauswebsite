//src/app/projects/page.tsx

'use client';
import Navigation from '@/components/ui/Navigation';

export default function ProjectsPage() {
  const handleHireUsClick = (): void => {
    window.location.href = '/contact';
  };

  return (
    <div className="min-h-screen bg-ivory">
      <Navigation onHireUsClick={handleHireUsClick} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-luxury-charcoal text-white">
        <div className="container-luxury">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Our Signature
              <span className="text-luxury-gold block mt-2">Projects</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Explore our portfolio of luxury interiors, created to mirror each client&apos;s distinct personality and style.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Content */}
      <section className="py-20">
        <div className="container-luxury">
          <div className="text-center">
            <p className="text-xl text-luxury-slate mb-8">
              Our full portfolio will be available soon. Please contact us to view our complete collection of luxury interior design projects.
            </p>
            <button
              onClick={handleHireUsClick}
              className="btn-luxury"
            >
              Contact Us for Portfolio
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}