'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

export default function Footer() {
  const { t, isRtl } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const quickLinks = [
    { name: t.navHome, href: '#home' },
    { name: t.navServices, href: '#services' },
    { name: t.navPricing, href: '#pricing' },
    { name: t.navGallery, href: '#gallery' },
    { name: t.navAbout, href: '#about' },
  ];

  const serviceLinks = [
    { name: t.sofaCleaning, href: '#services' },
    { name: t.deepCleaning, href: '#services' },
    { name: t.villaCleaning, href: '#services' },
    { name: t.cockroachControl, href: '#services' },
    { name: t.bedBugTreatment, href: '#services' },
    { name: t.termiteControl, href: '#services' },
  ];

  return (
    <footer className="relative bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800 overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brandblue/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-navy-base/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Logo & Intro */}
          <div className="space-y-4">
            <div className={`flex items-center gap-3 ${isRtl ? 'justify-start' : 'justify-start'}`}>
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-brandblue bg-white">
                <Image
                  src="/logo.jpg"
                  alt="Eastern Sparrows Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-white leading-none">
                  Eastern Sparrows
                </span>
                <span className="text-xs font-sans text-brandblue font-semibold mt-1">
                  {isRtl ? 'مكافحة الحشرات والتنظيفات' : 'Pest Control & Cleaning'}
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t.tagline}
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-slate-800 hover:bg-brandblue hover:text-white transition-all duration-300"
                aria-label="Facebook Page"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com/eastern.sparrows"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-slate-800 hover:bg-brandblue hover:text-white transition-all duration-300"
                aria-label="Instagram Profile"
              >
                <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-white font-display font-semibold text-lg border-b border-slate-800 pb-2">
              {t.navContact}
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brandblue shrink-0 mt-0.5" />
                <span>{t.officeLocationText}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brandblue shrink-0" />
                <a href="tel:+97431267267" className="hover:text-brandblue transition-colors" dir="ltr">
                  +974 3126 7267
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brandblue shrink-0" />
                <a href="mailto:es.pestcontrolcleaning@gmail.com" className="hover:text-brandblue transition-colors break-all">
                  es.pestcontrolcleaning@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-brandblue shrink-0" />
                <span>{t.workingHoursText}</span>
              </li>
            </ul>
          </div>

          {/* Quick Links & Services */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-white font-display font-semibold text-lg border-b border-slate-800 pb-2 mb-4">
                {isRtl ? 'روابط سريعة' : 'Quick Links'}
              </h3>
              <ul className="space-y-2 text-sm">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="hover:text-brandblue transition-colors block py-0.5"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-display font-semibold text-lg border-b border-slate-800 pb-2 mb-4">
                {t.navServices}
              </h3>
              <ul className="space-y-2 text-sm">
                {serviceLinks.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      className="hover:text-brandblue transition-colors block py-0.5"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Subscribe */}
          <div className="space-y-4">
            <h3 className="text-white font-display font-semibold text-lg border-b border-slate-800 pb-2">
              {isRtl ? 'النشرة البريدية' : 'Newsletter'}
            </h3>
            <p className="text-sm text-slate-400">
              {isRtl
                ? 'اشترك في نشرتنا البريدية للحصول على أحدث العروض والنصائح للعناية بمنزلك.'
                : 'Subscribe to receive the latest promotional offers and home care tips.'}
            </p>
            <form onSubmit={handleSubscribe} className="relative flex items-center mt-2">
              <input
                type="email"
                placeholder={isRtl ? 'البريد الإلكتروني' : 'Your Email Address'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-800 text-white rounded-full px-5 py-3 pr-12 text-sm outline-none border border-slate-700 focus:border-brandblue transition-all"
              />
              <button
                type="submit"
                className="absolute right-1.5 p-2 bg-brandblue hover:bg-brandblue-dark text-white rounded-full transition-colors cursor-pointer"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-emerald-400 font-semibold mt-1">
                {isRtl ? 'تم الاشتراك بنجاح! شكراً لك.' : 'Subscribed successfully! Thank you.'}
              </p>
            )}
          </div>
        </div>

        <hr className="border-slate-800 my-8" />

        {/* Footer bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Eastern Sparrows. {t.rightsReserved}</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">
              {isRtl ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </a>
            <a href="#" className="hover:underline">
              {isRtl ? 'شروط الخدمة' : 'Terms of Service'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
