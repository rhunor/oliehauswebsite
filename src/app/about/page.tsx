//src/app/about/page.tsx

'use client';
import { motion } from 'framer-motion';
// import Navigation from '@/components/ui/Navigation';

// interface TeamMember {
//   name: string;
//   role: string;
//   bio: string;
//   imageUrl: string;
// }

interface CompanyValue {
  title: string;
  description: string;
  icon: string;
}

// const teamMembers: TeamMember[] = [
//   {
//     name: 'Oluyole Christabel',
//     role: 'Founder & Principal Designer',
//     bio: 'With over 12 years of experience in luxury interior design, Christabel founded OliveHaus Interiors to create exceptional spaces for Nigeria&apos;s elite.',
//     imageUrl: '/images/team/christabel.jpg'
//   }
// ];

const companyValues: CompanyValue[] = [
  {
    title: 'Seamless Project Experience',
    description: 'Flawless client experience, before, during and after project execution',
    icon: '✨'
  },
  {
    title: 'Design for High-Quality Living',
    description: 'Luxurious, personalized interiors that tastefully blend functionality with timeless aesthetics.',
    icon: '🏛️'
  },
  {
    title: 'Stress-free Project Oversight',
    description: 'Stay in control from anywhere in the world with our Daily Manager Platform Updates—track progress, reports, and updates at your convenience',
    icon: '📱'
  },
  {
    title: 'Constant Team Support',
    description: 'A responsive, detail-driven team ensures your vision is executed to perfection.',
    icon: '🤝'
  }
];

export default function AboutPage() {
  const handleHireUsClick = (): void => {
    // Handle hire us click - redirect to contact or open modal
    window.location.href = '/contact';
  };

  return (
    <div className="min-h-screen bg-ivory">
      {/* <Navigation onHireUsClick={handleHireUsClick} /> */}
      
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
              For Nigeria&apos;s
              <span className="text-luxury-gold block mt-2">Finest Homes</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl text-white/90 leading-relaxed"
            >
              OliveHaus Interiors is a premier interior design company serving luxury residential, corporate, and commercial clients in Nigeria and internationally.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-luxury-heading text-4xl md:text-5xl font-bold mb-6">
                Our <span className="text-luxury-gold">Story</span>
              </h2>
              <div className="space-y-6 text-lg text-luxury-slate leading-relaxed">
                <p>
                  We specialize in creating bespoke, timeless, and functional spaces for discerning clients. Our design process emphasizes luxurious personalized solutions, exceptional project management, and remote oversight for diaspora clients.
                </p>
                <p>
                  With over 12 years of experience in the luxury interior design industry, we have established ourselves as the go-to firm for Nigeria&apos;s elite and international clientele seeking exceptional design solutions.
                </p>
                <p>
                  Our philosophy is simple: <em>&apos;Designers who begin with the end in mind.&apos;</em> Every project we undertake is crafted with meticulous attention to detail and a deep understanding of our clients&apos; unique lifestyles and preferences.
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
                <span className="text-luxury-slate">Company Story Image</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Makes Us Stand Out */}
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
              We Stand <span className="text-luxury-gold">Out</span>
            </h2>
            <p className="text-xl text-luxury-slate max-w-3xl mx-auto">
              Our commitment to excellence and attention to detail sets us apart in the luxury interior design industry.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white p-8 rounded-lg shadow-luxury-soft hover:shadow-luxury-strong transition-all duration-300"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-luxury-heading text-xl font-bold mb-4">
                  {value.title}
                </h3>
                <p className="text-luxury-slate leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="py-20"> */}
        {/* <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-luxury-heading text-4xl md:text-5xl font-bold mb-6">
              Meet Our <span className="text-luxury-gold">Team</span>
            </h2>
            <p className="text-xl text-luxury-slate max-w-3xl mx-auto">
              Our talented team of designers and project managers are dedicated to bringing your vision to life.
            </p>
          </motion.div> */}

          {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white rounded-lg overflow-hidden shadow-luxury-soft hover:shadow-luxury-strong transition-all duration-300"
              >
                <div className="h-64 bg-luxury-platinum/30 flex items-center justify-center">
                  <span className="text-luxury-slate">Team Member Photo</span>
                </div>
                <div className="p-6">
                  <h3 className="text-luxury-heading text-xl font-bold mb-2">
                    {member.name}
                  </h3>
                  <p className="text-luxury-gold font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-luxury-slate leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div> */}
        {/* </div>
      </section> */}

      {/* Closing Tagline Section */}
      <section className="py-20 bg-luxury-charcoal text-white text-center">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
              <em>Designers who begin with the end in mind</em>
            </h2>
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