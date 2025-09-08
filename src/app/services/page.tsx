//src/app/services/page.tsx

'use client';
import { motion } from 'framer-motion';
import Navigation from '@/components/ui/Navigation';

interface Service {
  title: string;
  description: string;
  features: string[];
  icon: string;
}

const services: Service[] = [
  {
    title: 'Residential Design',
    description: 'Transform your home into a luxurious sanctuary that reflects your personality and lifestyle.',
    features: [
      'Complete home makeovers',
      'Room-by-room design',
      'Custom furniture design',
      'Space planning & optimization',
      'Color & material selection'
    ],
    icon: '🏠'
  },
  {
    title: 'Commercial Design',
    description: 'Create inspiring work environments that enhance productivity and reflect your brand identity.',
    features: [
      'Office space design',
      'Retail interior design',
      'Restaurant & hospitality design',
      'Brand integration',
      'Ergonomic workspace planning'
    ],
    icon: '🏢'
  },
  {
    title: 'Project Management',
    description: 'End-to-end project oversight ensuring seamless execution from concept to completion.',
    features: [
      'Remote project monitoring',
      'Daily progress updates',
      'Vendor coordination',
      'Quality control',
      'Timeline management'
    ],
    icon: '📋'
  },
  {
    title: 'Design Consultation',
    description: 'Expert advice and guidance for your interior design projects and space planning needs.',
    features: [
      'Design strategy sessions',
      'Space assessment',
      'Style development',
      'Material recommendations',
      'Budget planning'
    ],
    icon: '💡'
  }
];

export default function ServicesPage() {
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
              Our
              <span className="text-luxury-gold block mt-2">Services</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl text-white/90 leading-relaxed"
            >
              Comprehensive luxury interior design services tailored to your unique vision and lifestyle.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container-luxury">
          <div className="grid md:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white p-8 rounded-lg shadow-luxury-soft hover:shadow-luxury-strong transition-all duration-300"
              >
                <div className="text-5xl mb-6">{service.icon}</div>
                <h3 className="text-luxury-heading text-2xl font-bold mb-4">
                  {service.title}
                </h3>
                <p className="text-luxury-slate leading-relaxed mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-luxury-slate">
                      <span className="w-2 h-2 bg-luxury-gold rounded-full mr-3 flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-luxury-cream">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-luxury-heading text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-luxury-gold">Process</span>
            </h2>
            <p className="text-xl text-luxury-slate max-w-3xl mx-auto">
              From first hello to final reveal, here&apos;s how we work with you to create your dream space.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Discovery Call',
                description: 'We understand your vision, requirements, and lifestyle needs through a detailed consultation.'
              },
              {
                step: '02',
                title: 'Concept Development',
                description: 'Receive a tailored presentation with mood boards, preliminary renders, and a personalized project roadmap.'
              },
              {
                step: '03',
                title: 'Design Development',
                description: 'We refine every detail from spatial layouts to materials, finishes, and bespoke elements.'
              },
              {
                step: '04',
                title: 'Project Execution',
                description: 'We manage the project seamlessly, coordinating craftsmen, suppliers, and schedules.'
              },
              {
                step: '05',
                title: 'Progress Updates',
                description: 'For international clients, we provide detailed remote progress updates and monitoring.'
              },
              {
                step: '06',
                title: 'Final Reveal',
                description: 'Your dream space, exquisitely executed and ready to welcome you home.'
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-luxury-gold text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 mx-auto">
                  {item.step}
                </div>
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

      {/* CTA Section */}
      <section className="py-20 bg-luxury-charcoal text-white text-center">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss your project and create a space that&apos;s uniquely yours.
            </p>
            <button
              onClick={handleHireUsClick}
              className="btn-luxury text-lg px-12 py-4"
            >
              Start Your Project
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}