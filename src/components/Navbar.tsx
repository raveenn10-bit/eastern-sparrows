'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { Menu, X, Calendar, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { language, setLanguage, openBookingWithService, t, isRtl } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.navHome, href: '#home' },
    { name: t.navServices, href: '#services' },
    { name: t.navPricing, href: '#pricing' },
    { name: t.navGallery, href: '#gallery' },
    { name: t.navAbout, href: '#about' },
    { name: t.navTestimonials, href: '#testimonials' },
    { name: t.navFaq, href: '#faq' },
    { name: t.navContact, href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md shadow-md border-b border-slate-200/50 dark:border-slate-800/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleLinkClick('#home')}>
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-brandblue">
              <Image
                src="/logo.jpg"
                alt="Eastern Sparrows Logo"
                fill
                className="object-cover"
              />
            </div>
            <div className={`flex flex-col ${isRtl ? 'text-right' : 'text-left'}`}>
              <span className="font-display font-bold text-sm sm:text-base text-navy-base dark:text-brandblue tracking-tight leading-none">
                Eastern Sparrows
              </span>
              <span className="text-[10px] font-sans text-brandblue dark:text-slate-300 font-medium leading-tight">
                {isRtl ? 'مكافحة الحشرات والتنظيفات' : 'Pest Control & Cleaning'}
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-navy-base dark:text-slate-300 hover:text-brandblue dark:hover:text-brandblue font-sans text-sm font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Phone Quick Link */}
            <a
              href="tel:+97431267267"
              className="flex items-center gap-2 text-navy-base dark:text-slate-300 hover:text-brandblue transition-colors font-medium text-sm"
            >
              <Phone className="w-4 h-4 text-brandblue" />
              <span dir="ltr">+974 3126 7267</span>
            </a>

            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-navy-base dark:text-slate-300 transition-colors font-semibold text-sm font-display min-w-[36px]"
            >
              {language === 'en' ? 'العربية' : 'EN'}
            </button>



            {/* CTA */}
            <button
              onClick={() => openBookingWithService('')}
              className="flex items-center gap-2 bg-gradient-to-r from-navy-base to-brandblue text-white px-5 py-2.5 rounded-full font-sans text-sm font-semibold hover:shadow-lg hover:shadow-brandblue/20 transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <Calendar className="w-4 h-4" />
              {t.bookNow}
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-3 lg:hidden">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-navy-base dark:text-slate-300 transition-colors font-semibold text-xs"
            >
              {language === 'en' ? 'العربية' : 'EN'}
            </button>



            {/* Burger menu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-navy-base dark:text-slate-300 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden py-4 z-40"
          >
            <div className="px-4 space-y-2 flex flex-col items-stretch">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={`text-navy-base dark:text-slate-300 hover:text-brandblue dark:hover:text-brandblue font-sans text-base font-semibold py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors ${
                    isRtl ? 'text-right' : 'text-left'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-slate-200 dark:border-slate-800 my-2" />
              {/* Call Now */}
              <a
                href="tel:+97431267267"
                className={`flex items-center gap-3 text-navy-base dark:text-slate-300 font-sans font-semibold py-2.5 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 ${
                  isRtl ? 'flex-row-reverse text-right' : 'text-left'
                }`}
              >
                <Phone className="w-5 h-5 text-brandblue" />
                <span dir="ltr">+974 3126 7267</span>
              </a>
              {/* Mobile Book CTA */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  openBookingWithService('');
                }}
                className="w-full bg-gradient-to-r from-navy-base to-brandblue text-white py-3 rounded-full font-sans font-semibold text-center mt-2 flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                {t.bookNow}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
