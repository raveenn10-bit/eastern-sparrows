'use client';

import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Pricing from '@/components/Pricing';
import BookingForm from '@/components/BookingForm';
import Gallery from '@/components/Gallery';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useApp } from '@/context/AppContext';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function Home() {
  const { isRtl } = useApp();

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Section animations: fade-up reveal on scroll
      const sections = ['#services', '#pricing', '#booking', '#gallery', '#about', '#testimonials', '#faq', '#contact'];
      
      sections.forEach((selector) => {
        const element = document.querySelector(selector);
        if (element) {
          gsap.fromTo(
            element,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    }
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${isRtl ? 'font-sans' : 'font-sans'}`}>
      {/* Floating Background Glow Shape */}
      <div className="glow-shape w-[400px] h-[400px] bg-brandblue/10 top-[20%] right-[-10%] rounded-full filter blur-3xl pointer-events-none" />
      <div className="glow-shape w-[500px] h-[500px] bg-navy-base/15 bottom-[25%] left-[-15%] rounded-full filter blur-3xl pointer-events-none" />

      {/* Header / Navbar */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-grow">
        <Hero />
        <Services />
        <Pricing />
        <BookingForm />
        <Gallery />
        <About />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Widgets */}
      <WhatsAppButton />
    </div>
  );
}
