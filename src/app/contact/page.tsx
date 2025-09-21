'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Clock, 
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  DollarSign,
  Briefcase,
  MapPinIcon,
  User,
  Calendar
} from 'lucide-react';
import Image from 'next/image';

// Remove custom gtag declaration to avoid conflicts with @types/gtag.js or other declarations

// GitHub CDN base URL for images
const GITHUB_CDN_BASE = "https://cdn.jsdelivr.net/gh/rhunor/olivehausimages@main";

// Properly typed interfaces
interface ContactFormData {
  // Step 1
  budgetRange: string;
  // Step 2
  servicesRequired: string[];
  // Step 3
  projectLocation: string;
  // Step 4
  fullName: string;
  email: string;
  phone: string;
  // Optional
  projectTimeline: string;
}

interface FormErrors {
  [key: string]: string;
}

// interface ContactImage {
//   src: string;
//   alt: string;
//   width: number;
//   height: number;
// }

// Budget ranges
const budgetRanges = [
  '₦25M – ₦35M',
  '₦35M – ₦65M',
  '₦70M – ₦100M',
  '₦100M+'
];

// Services options
const servicesOptions = [
  'Complete Renovation',
  'Furnishing & Styling Service',
  'Bathroom & Kitchen Renovation',
  'Finishing for Unfinished/Semi-Finished (Carcass) Building'
];

// Project timeline options
const timelineOptions = [
  'Immediately',
  'In 1–3 months',
  'In 6 months+'
];

// Contact images configuration
const contactImages = [
  { src: `${GITHUB_CDN_BASE}/images/hero/8.webp`, alt: "Luxury living room", width: 600, height: 400 },
  { src: `${GITHUB_CDN_BASE}/images/hero/9.webp`, alt: "Modern office space", width: 500, height: 600 },
  { src: `${GITHUB_CDN_BASE}/images/hero/10.webp`, alt: "Elegant bedroom", width: 700, height: 500 },
  { src: `${GITHUB_CDN_BASE}/images/hero/11.webp`, alt: "Designer kitchen", width: 550, height: 550 },
  { src: `${GITHUB_CDN_BASE}/images/hero/12.webp`, alt: "Bathroom renovation", width: 450, height: 600 }
] as const;

// Safe accessor for contact images
const getContactImage = (index: 0 | 1 | 2 | 3 | 4) => contactImages[index];

// Animation variants
const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const slideInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const slideInRightVariants: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const scaleUpVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

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
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<ContactFormData>({
    budgetRange: '',
    servicesRequired: [],
    projectLocation: '',
    fullName: '',
    email: '',
    phone: '',
    projectTimeline: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const totalSteps = 5; // Including optional step

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    switch(step) {
      case 1:
        if (!formData.budgetRange) {
          newErrors.budgetRange = 'Please select a budget range';
        }
        break;
      case 2:
        if (formData.servicesRequired.length === 0) {
          newErrors.servicesRequired = 'Please select at least one service';
        }
        break;
      case 3:
        if (!formData.projectLocation.trim()) {
          newErrors.projectLocation = 'Project location is required';
        }
        break;
      case 4:
        if (!formData.fullName.trim()) {
          newErrors.fullName = 'Full name is required';
        }
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.phone.trim()) {
          newErrors.phone = 'Phone number is required';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (): void => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = (): void => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleServiceToggle = (service: string): void => {
    setFormData(prev => ({
      ...prev,
      servicesRequired: prev.servicesRequired.includes(service)
        ? prev.servicesRequired.filter(s => s !== service)
        : [...prev.servicesRequired, service]
    }));
    if (errors.servicesRequired) {
      setErrors(prev => ({ ...prev, servicesRequired: '' }));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateStep(4)) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData);
      
      if ('gtag' in window && typeof window.gtag === 'function') {
        (window as typeof window & { 
          gtag: (command: string, action: string, parameters?: Record<string, unknown>) => void 
        }).gtag('event', 'form_submit', {
          event_category: 'engagement',
          event_label: 'contact_form',
        });
      }
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCallClick = (): void => {
    window.open('tel:+2348089533353', '_self');
  };

  const handleWhatsAppClick = (): void => {
    window.open('https://wa.me/2348089533353?text=Hello! I would like to discuss an interior design project.', '_blank');
  };

  const handleEmailClick = (): void => {
    window.open('mailto:admin@olivehausinteriors.com?subject=Interior Design Inquiry', '_self');
  };

  const getStepIcon = (step: number) => {
    switch(step) {
      case 1: return <DollarSign className="w-5 h-5" />;
      case 2: return <Briefcase className="w-5 h-5" />;
      case 3: return <MapPinIcon className="w-5 h-5" />;
      case 4: return <User className="w-5 h-5" />;
      case 5: return <Calendar className="w-5 h-5" />;
      default: return null;
    }
  };

  const getStepTitle = (step: number) => {
    switch(step) {
      case 1: return 'Budget Range';
      case 2: return 'Services Required';
      case 3: return 'Project Location';
      case 4: return 'Contact Information';
      case 5: return 'Project Timeline (Optional)';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#E3E3E1' }}>
      
      {/* Hero Section with Images */}
      <section className="pt-32 pb-20 bg-luxury-charcoal text-white relative overflow-hidden">
        <div className="container-luxury relative z-10">
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
              Bring Your Vision to Life Let&apos;s design a space that&apos;s uniquely yours.
            </motion.p>
          </div>
        </div>

        {/* Decorative Images */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute top-20 left-10 w-48 h-48 rounded-3xl overflow-hidden hidden lg:block"
        >
          <Image
            src={getContactImage(0).src}
            alt={getContactImage(0).alt}
            fill
            className="object-cover"
            sizes="192px"
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="absolute bottom-10 right-10 w-64 h-40 rounded-2xl overflow-hidden hidden lg:block"
        >
          <Image
            src={getContactImage(1).src}
            alt={getContactImage(1).alt}
            fill
            className="object-cover"
            sizes="256px"
          />
        </motion.div>
      </section>

      {/* Contact Methods with Images */}
      <section className="py-20 relative">
        <div className="container-luxury">
          <div className="grid md:grid-cols-3 gap-8 mb-16 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpVariants}
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
                +234 808 953 3353
              </p>
              <p className="text-luxury-slate text-sm">
                Speak directly with our team
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpVariants}
              transition={{ delay: 0.1 }}
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
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpVariants}
              transition={{ delay: 0.2 }}
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
                admin@olivehausinteriors.com
              </p>
              <p className="text-luxury-slate text-sm">
                Detailed project discussions
              </p>
            </motion.div>
          </div>

          {/* Decorative Image */}
          {/* <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInRightVariants}
            className="absolute top-0 right-0 w-72 h-96 rounded-[3rem] overflow-hidden hidden xl:block opacity-30"
          >
            <Image
              src={getContactImage(2).src}
              alt={getContactImage(2).alt}
              fill
              className="object-cover"
              sizes="288px"
            />
          </motion.div> */}
        </div>
      </section>

      {/* Multi-Step Contact Form */}
      <section id="contact-form" className="py-20 bg-white/50 backdrop-blur-sm relative">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpVariants}
              className="text-center mb-12"
            >
              <h2 className="text-luxury-heading text-4xl md:text-5xl font-bold mb-6">
                Start Your <span className="text-luxury-gold">Project</span>
              </h2>
              <p className="text-xl text-luxury-slate">
                Tell us about your vision and we&apos;ll bring it to life.
              </p>
            </motion.div>

            {/* Progress Steps */}
            {!isSubmitted && (
              <div className="flex justify-between items-center mb-8 px-4">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                      ${currentStep >= step 
                        ? 'bg-luxury-gold text-black' 
                        : 'bg-gray-200 text-gray-500'}
                    `}>
                      {getStepIcon(step)}
                    </div>
                    {step < 5 && (
                      <div className={`
                        hidden sm:block w-16 lg:w-24 h-1 ml-2 transition-all duration-300
                        ${currentStep > step ? 'bg-luxury-gold' : 'bg-gray-200'}
                      `} />
                    )}
                  </div>
                ))}
              </div>
            )}

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleUpVariants}
              className="bg-white rounded-2xl shadow-xl p-8"
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
                    We&apos;ve received your information and will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setCurrentStep(1);
                      setFormData({
                        budgetRange: '',
                        servicesRequired: [],
                        projectLocation: '',
                        fullName: '',
                        email: '',
                        phone: '',
                        projectTimeline: ''
                      });
                    }}
                    className="btn-luxury-outline"
                  >
                    Submit Another Project
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-semibold text-luxury-heading mb-6">
                    Step {currentStep}: {getStepTitle(currentStep)}
                  </h3>

                  <AnimatePresence mode="wait">
                    {/* Step 1: Budget Range */}
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-luxury-slate mb-6">
                          Select one that best fits your project
                        </p>
                        <div className="space-y-3">
                          {budgetRanges.map((range) => (
                            <label
                              key={range}
                              className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-luxury-cream/50 transition-colors duration-200"
                              style={{
                                borderColor: formData.budgetRange === range ? '#DAA520' : '#E5E5E5'
                              }}
                            >
                              <input
                                type="radio"
                                name="budgetRange"
                                value={range}
                                checked={formData.budgetRange === range}
                                onChange={handleInputChange}
                                className="mr-3 text-luxury-gold focus:ring-luxury-gold"
                              />
                              <span className="text-lg font-medium text-luxury-charcoal">
                                {range}
                              </span>
                            </label>
                          ))}
                        </div>
                        {errors.budgetRange && (
                          <p className="text-red-500 text-sm mt-2">{errors.budgetRange}</p>
                        )}
                      </motion.div>
                    )}

                    {/* Step 2: Services Required */}
                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-luxury-slate mb-6">
                          Select all that apply
                        </p>
                        <div className="space-y-3">
                          {servicesOptions.map((service) => (
                            <label
                              key={service}
                              className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-luxury-cream/50 transition-colors duration-200"
                              style={{
                                borderColor: formData.servicesRequired.includes(service) ? '#DAA520' : '#E5E5E5'
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={formData.servicesRequired.includes(service)}
                                onChange={() => handleServiceToggle(service)}
                                className="mr-3 text-luxury-gold focus:ring-luxury-gold"
                              />
                              <span className="text-lg text-luxury-charcoal">
                                {service}
                              </span>
                            </label>
                          ))}
                        </div>
                        {errors.servicesRequired && (
                          <p className="text-red-500 text-sm mt-2">{errors.servicesRequired}</p>
                        )}
                      </motion.div>
                    )}

                    {/* Step 3: Project Location */}
                    {currentStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-luxury-slate mb-6">
                          Where is your project located?
                        </p>
                        <input
                          type="text"
                          name="projectLocation"
                          value={formData.projectLocation}
                          onChange={handleInputChange}
                          placeholder="Enter project location (e.g., Lekki, Lagos)"
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold transition-colors duration-200 ${
                            errors.projectLocation ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.projectLocation && (
                          <p className="text-red-500 text-sm mt-2">{errors.projectLocation}</p>
                        )}
                      </motion.div>
                    )}

                    {/* Step 4: Contact Information */}
                    {currentStep === 4 && (
                      <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="space-y-4">
                          <div>
                            <label className="block text-luxury-charcoal font-medium mb-2">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              placeholder="Enter your full name"
                              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold transition-colors duration-200 ${
                                errors.fullName ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            {errors.fullName && (
                              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-luxury-charcoal font-medium mb-2">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="Enter your email address"
                              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold transition-colors duration-200 ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            {errors.email && (
                              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-luxury-charcoal font-medium mb-2">
                              Phone Number *
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="Enter your phone number"
                              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold transition-colors duration-200 ${
                                errors.phone ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            {errors.phone && (
                              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 5: Project Timeline (Optional) */}
                    {currentStep === 5 && (
                      <motion.div
                        key="step5"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-luxury-slate mb-6">
                          When are you looking to begin your project? (Optional)
                        </p>
                        <div className="space-y-3">
                          {timelineOptions.map((timeline) => (
                            <label
                              key={timeline}
                              className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-luxury-cream/50 transition-colors duration-200"
                              style={{
                                borderColor: formData.projectTimeline === timeline ? '#DAA520' : '#E5E5E5'
                              }}
                            >
                              <input
                                type="radio"
                                name="projectTimeline"
                                value={timeline}
                                checked={formData.projectTimeline === timeline}
                                onChange={handleInputChange}
                                className="mr-3 text-luxury-gold focus:ring-luxury-gold"
                              />
                              <span className="text-lg text-luxury-charcoal">
                                {timeline}
                              </span>
                            </label>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8">
                    <button
                      onClick={handlePrevious}
                      disabled={currentStep === 1}
                      className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                        currentStep === 1
                          ? 'bg-gray-200 text-black cursor-not-allowed'
                          : 'bg-luxury-charcoal text-black hover:bg-opacity-90'
                      }`}
                    >
                      <ChevronLeft className="w-5 h-5 mr-2" />
                      Previous
                    </button>

                    {currentStep < 5 ? (
                      <button
                        onClick={handleNext}
                        className="flex items-center px-6 py-3 bg-gray-200 text-black rounded-lg font-medium hover:bg-opacity-90 transition-all duration-200"
                      >
                        Next
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </button>
                    ) : (
                      <button
                        onClick={currentStep === 5 ? handleSubmit : handleNext}
                        disabled={isSubmitting}
                        className="flex items-center px-6 py-3 bg-luxury-gold text-white rounded-lg font-medium hover:bg-opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                        <CheckCircle className="w-5 h-5 ml-2" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Decorative Images Around Form */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideInLeftVariants}
          className="absolute left-0 top-1/4 w-64 h-80 rounded-[2rem] overflow-hidden hidden xl:block opacity-20"
        >
          <Image
            src={getContactImage(3).src}
            alt={getContactImage(3).alt}
            fill
            className="object-cover"
            sizes="256px"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideInRightVariants}
          className="absolute right-0 bottom-1/4 w-56 h-72 rounded-[3rem] overflow-hidden hidden xl:block opacity-20"
        >
          <Image
            src={getContactImage(4).src}
            alt={getContactImage(4).alt}
            fill
            className="object-cover"
            sizes="224px"
          />
        </motion.div>
      </section>

      {/* Business Hours & Location */}
      <section className="py-20 relative">
        <div className="container-luxury">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInLeftVariants}
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
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInRightVariants}
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

      {/* Client Journey Section with Images */}
      <section className="py-20 bg-white/50 backdrop-blur-sm relative">
        <div className="container-luxury">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
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
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scaleUpVariants}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
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

        {/* More Decorative Images */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleUpVariants}
          className="absolute top-10 right-10 w-48 h-48 rounded-[2.5rem] overflow-hidden hidden lg:block opacity-15"
        >
          <Image
            src={getContactImage(0).src}
            alt=""
            fill
            className="object-cover"
            sizes="192px"
          />
        </motion.div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-luxury-charcoal text-white text-center relative overflow-hidden">
        <div className="container-luxury relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let&apos;s transform your vision into reality. Your dream space is just a conversation away.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.button
                onClick={handleWhatsAppClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-luxury-gold btn-luxury text-lg px-8 py-4"
              >
                Start WhatsApp Chat
              </motion.button>
              <motion.button
                onClick={handleCallClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-luxury-gold btn-luxury text-lg px-8 py-4"
              >
                Schedule a Call
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Final Decorative Images */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute bottom-0 left-0 w-96 h-64 rounded-t-[4rem] overflow-hidden"
        >
          <Image
            src={getContactImage(2).src}
            alt=""
            fill
            className="object-cover"
            sizes="384px"
          />
        </motion.div>
      </section>
    </div>
  );
}