//src/app/blog/page.tsx

'use client';
// import Navigation from '@/components/ui/Navigation';

export default function BlogPage() {
  const handleHireUsClick = (): void => {
    window.location.href = '/contact';
  };

  return (
    <div className="min-h-screen bg-ivory">
      {/* <Navigation onHireUsClick={handleHireUsClick} /> */}
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-luxury-charcoal text-white">
        <div className="container-luxury">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Design
              <span className="text-luxury-gold block mt-2">Insights</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Discover the latest trends, tips, and insights from our luxury interior design experts.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-20">
        <div className="container-luxury">
          <div className="text-center">
            <p className="text-xl text-luxury-slate mb-8">
              Our design blog is coming soon. Stay tuned for expert insights on luxury interior design trends, space planning, and creating beautiful homes.
            </p>
            <button
              onClick={handleHireUsClick}
              className="btn-luxury"
            >
              Get Design Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}