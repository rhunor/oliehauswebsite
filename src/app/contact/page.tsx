//src/app/contact/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, Clock, CheckCircle } from 'lucide-react';
import Navigation from '@/components/ui/Navigation';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const projectTypes: string[] = [
  'Residential - Full Home',
  'Residential - Single Room',
  'Commercial - Office',
  'Commercial - Retail',
  'Commercial - Hospitality',
  'Consultation Only'
];

const journeySteps = [
  {
    step: '01',
    title: 'Your First Contact',
    description: 'The moment you reach out via WhatsApp, Call, or our form, our Client Concierge responds promptly—ensuring you feel attended to from the start.'
  },
  {
    step: '02',
    title: 'Discovery Call Booking',
    description: 'We schedule a private discovery call at your convenience to understand your vision, requirements, and lifestyle needs.'
  },
  {
    step: '03',
    title: 'Concept & Proposal',
    description: 'You receive a tailored presentation with mood boards, preliminary renders, and a personalized project roadmap.'
  },
  {
    step: '04',
    title: 'Design Development',
    description: 'Our team refines every detail—from spatial layouts to materials, finishes, and bespoke elements—ensuring your space reflects your individuality.'
  },
  {
    step: '05',
    title: 'Execution & Oversight',
    description: 'We manage the project seamlessly, coordinating craftsmen, suppliers, and schedules. For our international clients, we provide detailed remote progress updates.'
  },
  {
    step: '06',
    title: 'The Final Reveal',
    description: 'Your dream space, exquisitely executed and ready to welcome you.'
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.projectType) {
      newErrors.projectType = 'Please select a project type';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In production, send data to your API
      console.log('Form submitted:', formData);
      
      // Analytics tracking
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'form_submit', {
          event_category: 'engagement',
          event_label: 'contact_form',
        });
      }
      
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error state here
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHireUsClick = (): void => {
    // Scroll to contact form
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCallClick = (): void => {
    window.open('tel:+2348123456789', '_self');
  };

  const handleWhatsAppClick = (): void => {
    window.open('https://wa.me/2348123456789?text=Hello! I would like to discuss an interior design project.', '_blank');
  };

  const handleEmailClick = (): void => {
    window.open('mailto:hello@olivehausinteriors.com?subject=Interior Design Inquiry', '_self');
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
              Contact
              <span className="text-luxury-gold block mt-2">Us</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl text-white/90 leading-relaxed"
            >
              Bring Your Vision to Life — Let&apos;s design a space that&apos;s uniquely yours.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="container-luxury">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center group cursor-pointer"
              onClick={handleCallClick}
            >
              <div className="w-16 h-16 bg-luxury-gold text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-luxury-heading text-xl font-bold mb-2">
                Call Us
              </h3>
              <p className="text-luxury-gold font-medium mb-1">
                +234 812 345 6789
              </p>
              <p className="text-luxury-slate text-sm">
                Speak directly with our team
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center group cursor-pointer"
              onClick={handleWhatsAppClick}
            >
              <div className="w-16 h-16 bg-luxury-gold text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h3 className="text-luxury-heading text-xl font-bold mb-2">
                WhatsApp
              </h3>
              <p className="text-luxury-gold font-medium mb-1">
                Chat with us instantly
              </p>
              <p className="text-luxury-slate text-sm">
                Quick responses guaranteed
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center group cursor-pointer"
              onClick={handleEmailClick}
            >
              <div className="w-16 h-16 bg-luxury-gold text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-luxury-heading text-xl font-bold mb-2">
                Email
              </h3>
              <p className="text-luxury-gold font-medium mb-1">
                hello@olivehausinteriors.com
              </p>
              <p className="text-luxury-slate text-sm">
                Detailed project discussions
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-20 bg-luxury-cream">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-luxury-heading text-4xl md:text-5xl font-bold mb-6">
                Start Your <span className="text-luxury-gold">Project</span>
              </h2>
              <p className="text-xl text-luxury-slate">
                Tell us about your vision and we&apos;ll bring it to life.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white rounded-lg shadow-luxury-soft p-8"
            >
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-luxury-heading mb-4">
                    Thank You!
                  </h3>
                  <p className="text-luxury-slate mb-6">
                    We&apos;ve received your message and will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn-luxury-outline"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-luxury-charcoal font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold transition-colors duration-300 ${
                          errors.name ? 'border-red-500' : 'border-luxury-platinum'
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-luxury-charcoal font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold transition-colors duration-300 ${
                          errors.email ? 'border-red-500' : 'border-luxury-platinum'
                        }`}
                        placeholder="Enter your email address"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-luxury-charcoal font-medium mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold transition-colors duration-300 ${
                          errors.phone ? 'border-red-500' : 'border-luxury-platinum'
                        }`}
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="projectType" className="block text-luxury-charcoal font-medium mb-2">
                        Project Type *
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold transition-colors duration-300 ${
                          errors.projectType ? 'border-red-500' : 'border-luxury-platinum'
                        }`}
                      >
                        <option value="">Select project type</option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.projectType && (
                        <p className="text-red-500 text-sm mt-1">{errors.projectType}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-luxury-charcoal font-medium mb-2">
                      Project Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold transition-colors duration-300 resize-vertical ${
                        errors.message ? 'border-red-500' : 'border-luxury-platinum'
                      }`}
                      placeholder="Tell us about your project, vision, timeline, and any specific requirements..."
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                    )}
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-luxury text-lg px-12 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Business Hours & Location */}
      <section className="py-20">
        <div className="container-luxury">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-luxury-heading text-2xl font-bold mb-6 flex items-center">
                <Clock className="w-6 h-6 text-luxury-gold mr-3" />
                Business Hours
              </h3>
              <div className="space-y-3 text-luxury-slate">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-medium">By Appointment</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="text-luxury-heading text-2xl font-bold mb-6 flex items-center">
                <MapPin className="w-6 h-6 text-luxury-gold mr-3" />
                Location
              </h3>
              <div className="text-luxury-slate space-y-2">
                <p className="font-medium">OliveHaus Interiors</p>
                <p>Victoria Island</p>
                <p>Lagos, Nigeria</p>
                <p className="mt-4 text-sm">
                  <em>Serving clients across Nigeria and internationally</em>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Client Journey Section */}
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
              Your OliveHaus <span className="text-luxury-gold">Experience</span>
            </h2>
            <p className="text-xl text-luxury-slate max-w-3xl mx-auto">
              From First Hello to Final Reveal — Here&apos;s How We Work With You
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {journeySteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-luxury-soft"
              >
                <div className="w-12 h-12 bg-luxury-gold text-white rounded-full flex items-center justify-center font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-luxury-heading text-lg font-bold mb-3">
                  {item.title}
                </h3>
                <p className="text-luxury-slate leading-relaxed text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-luxury-charcoal text-white text-center">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let&apos;s transform your vision into reality. Your dream space is just a conversation away.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button
                onClick={handleWhatsAppClick}
                className="btn-luxury text-lg px-8 py-4"
              >
                Start WhatsApp Chat
              </button>
              <button
                onClick={handleCallClick}
                className="btn-luxury-outline text-lg px-8 py-4"
              >
                Schedule a Call
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}