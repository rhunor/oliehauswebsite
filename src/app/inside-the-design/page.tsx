//src/app/inside-the-design/page.tsx

'use client';
import { motion } from 'framer-motion';
import Navigation from '@/components/ui/Navigation';

export default function InsideTheDesignPage() {
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
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              Inside the
              <span className="text-luxury-gold block mt-2">Design</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl text-white/90 leading-relaxed"
            >
              This is How We Think About Your Space...
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-luxury-heading text-4xl md:text-5xl font-bold mb-6">
                Our Design <span className="text-luxury-gold">Philosophy</span>
              </h2>
              <div className="space-y-6 text-lg text-luxury-slate leading-relaxed">
                <p>
                  Get a behind-the-scenes look at our design philosophy—from space planning and layout, to colour palettes, furniture, and material selections. Every element is chosen with intention, crafting a home that reflects your personality and elevates your lifestyle.
                </p>
                <p>
                  We believe that exceptional design begins with understanding the unique story each client wants their space to tell. Our approach combines technical expertise with artistic vision, ensuring that every decision—from the grandest architectural element to the smallest decorative detail—serves both function and beauty.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden"
            >
              <div className="w-full h-full bg-luxury-platinum/30 flex items-center justify-center">
                <span className="text-luxury-slate">Design Process Image</span>
              </div>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg">
                <p className="text-sm text-luxury-charcoal font-medium">
                  Annotation: Every space tells a story through carefully curated elements
                </p>
              </div>
            </motion.div>
          </div>

          {/* Design Process Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Space Planning',
                description: 'We analyze flow, function, and form to create layouts that maximize both beauty and practicality.',
                icon: '📐'
              },
              {
                title: 'Color Palettes',
                description: 'Sophisticated color schemes that evoke emotion and create the perfect ambiance for each space.',
                icon: '🎨'
              },
              {
                title: 'Furniture Selection',
                description: 'Curated pieces that combine comfort, style, and quality craftsmanship for lasting beauty.',
                icon: '🛋️'
              },
              {
                title: 'Material Choices',
                description: 'Premium materials selected for their texture, durability, and contribution to the overall aesthetic.',
                icon: '✨'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white p-8 rounded-lg shadow-luxury-soft hover:shadow-luxury-strong transition-all duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-luxury-heading text-xl font-bold mb-4">
                  {item.title}
                </h3>
                <p className="text-luxury-slate leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* See How We Design Section */}
      <section className="py-20 bg-luxury-cream">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-luxury-heading text-4xl md:text-5xl font-bold mb-6">
              <em>See how we design with you in mind...</em>
            </h2>
            <p className="text-xl text-luxury-slate max-w-3xl mx-auto mb-8 leading-relaxed">
              Every project begins with understanding your lifestyle, preferences, and dreams. We then translate these insights into spaces that are uniquely yours.
            </p>
            
            {/* Placeholder for design showcase */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {[1, 2, 3].map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: item * 0.2 }}
                  className="relative group cursor-pointer"
                >
                  <div className="h-64 bg-luxury-platinum/30 rounded-lg overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-luxury-slate">Design Showcase {item}</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-luxury-charcoal/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                    <div className="text-center text-white p-4">
                      <h4 className="font-bold mb-2">View Design Process</h4>
                      <p className="text-sm text-white/80">See the thinking behind this space</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12"
            >
              <button
                onClick={handleHireUsClick}
                className="btn-luxury text-lg px-12 py-4"
              >
                Explore Our Full Design Process
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Design with You Section */}
      <section className="py-20">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
                <div className="w-full h-full bg-luxury-platinum/30 flex items-center justify-center">
                  <span className="text-luxury-slate">Collaborative Design Process</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-luxury-heading text-4xl md:text-5xl font-bold mb-6">
                Designing <span className="text-luxury-gold">With You</span>
              </h2>
              <div className="space-y-6 text-lg text-luxury-slate leading-relaxed">
                <p>
                  Our collaborative approach ensures that your voice is heard throughout the design process. We don&apos;t just design for you—we design with you, incorporating your feedback and preferences at every stage.
                </p>
                <p>
                  Through detailed consultations, mood boards, and 3D visualizations, we make sure you can see and feel your space before it comes to life. This collaborative process results in spaces that truly reflect who you are.
                </p>
              </div>
              
              <div className="mt-8">
                <button
                  onClick={handleHireUsClick}
                  className="btn-luxury-outline"
                >
                  Start Your Design Journey
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}