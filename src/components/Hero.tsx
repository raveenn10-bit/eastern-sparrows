'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Shield, Award, Sparkles, CheckCircle, Phone, Calendar, ArrowRight, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// Simple CountUp animation component
function Counter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
}

export default function Hero() {
  const { t, openBookingWithService, isRtl } = useApp();

  const trustBadges = [
    { text: t.badgeEco, icon: Shield, color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' },
    { text: t.badgeCertified, icon: Award, color: 'text-brandblue bg-brandblue/10 border-brandblue/20' },
    { text: t.badgeAffordable, icon: Sparkles, color: 'text-amber-500 bg-amber-500/10 border-amber-500/20' },
    { text: t.badgeSameDay, icon: CheckCircle, color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20' }
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-slate-50 dark:bg-slate-950"
    >
      {/* Background GIF with Dark Glass Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/design.gif"
          alt="Background Design"
          className="w-full h-full object-cover opacity-65 select-none pointer-events-none"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/70 to-slate-950 z-10" />
      </div>

      {/* Dynamic Floating Background Gradient Orbs */}
      <div className="glow-shape w-[500px] h-[500px] bg-brandblue/20 top-[-10%] left-[-10%]" />
      <div className="glow-shape w-[600px] h-[600px] bg-navy-base/20 bottom-[-20%] right-[-10%]" />
      <div className="glow-shape w-[350px] h-[350px] bg-indigo-500/10 top-[40%] right-[20%]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Copy (Left) */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Tagline pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brandblue/20 bg-brandblue/5 text-brandblue text-xs font-semibold uppercase tracking-wider mx-auto lg:mx-0 ${
                isRtl ? 'flex-row-reverse' : ''
              }`}
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>{isRtl ? 'الرعاية المنزلية الفاخرة بأسعار مناسبة' : 'Premium Home Care & Cleaning'}</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-navy-base dark:text-white leading-[1.1] tracking-tight"
            >
              {isRtl ? (
                <>
                  خدمات <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandblue to-indigo-400">تنظيف ومكافحة حشرات</span> احترافية في قطر
                </>
              ) : (
                <>
                  Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandblue to-indigo-400">Cleaning & Pest</span> Control in Qatar
                </>
              )}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light"
            >
              {t.heroSubtitle}
            </motion.p>

            {/* Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`flex flex-wrap items-center justify-center lg:justify-start gap-4 ${
                isRtl ? 'flex-row-reverse' : ''
              }`}
            >
              {/* Primary - Book Now */}
              <button
                onClick={() => openBookingWithService('')}
                className="flex items-center gap-2 bg-gradient-to-r from-navy-base to-brandblue text-white px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-brandblue/30 transform hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>{t.bookNow}</span>
                <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRtl ? 'rotate-180' : ''}`} />
              </button>

              {/* Call Now */}
              <a
                href="tel:+97431267267"
                className="flex items-center gap-2 bg-white dark:bg-slate-950 text-navy-base dark:text-white border border-slate-200 dark:border-slate-800 px-8 py-4 rounded-full font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                <Phone className="w-5 h-5 text-brandblue" />
                <span>{t.callNow}</span>
              </a>

              {/* WhatsApp Quick Chat */}
              <a
                href="https://wa.me/+97431267267"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-full font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>{t.whatsapp}</span>
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4"
            >
              {trustBadges.map((badge, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col sm:flex-row items-center sm:justify-start gap-2.5 p-3 rounded-2xl border bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm ${badge.color}`}
                >
                  <badge.icon className="w-5 h-5 shrink-0" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 text-center sm:text-left">
                    {badge.text}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Stats & Visual (Right) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Stats Glassmorphism Grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="glass-card p-8 sm:p-10 relative border-2 border-white/20 dark:border-slate-800/40"
            >
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-brandblue/20 rounded-full blur-xl" />
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-navy-base/20 rounded-full blur-xl" />

              <h3 className="font-display font-bold text-xl text-navy-base dark:text-white mb-8 border-b border-slate-200/50 dark:border-slate-800/50 pb-4 text-center">
                {isRtl ? 'إحصائيات إيستن سفاروس' : 'Our Track Record in Qatar'}
              </h3>

              <div className="grid grid-cols-2 gap-8 text-center">
                {/* Stat 1 */}
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-display font-extrabold text-brandblue">
                    <Counter end={5000} suffix="+" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                    {t.statCustomers}
                  </p>
                </div>

                {/* Stat 2 */}
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-display font-extrabold text-navy-base dark:text-slate-100">
                    <Counter end={10} suffix="+" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                    {t.statExperience}
                  </p>
                </div>

                {/* Stat 3 */}
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-display font-extrabold text-brandblue">
                    24/7
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                    {t.statSupport}
                  </p>
                </div>

                {/* Stat 4 */}
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-display font-extrabold text-navy-base dark:text-slate-100">
                    100%
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                    {t.statSatisfaction}
                  </p>
                </div>
              </div>

              {/* Service guarantee footer */}
              <div className="mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-800/50 text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {isRtl
                    ? '✓ نلتزم التزاماً كاملاً بضمان جودة خدماتنا، وفي حال عدم رضاكم نعيد الخدمة مجاناً.'
                    : '✓ All services are backed by our satisfaction warranty. If you are not satisfied, we will reclean it for free.'}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
