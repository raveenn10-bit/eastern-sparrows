'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhatsAppButton() {
  const { isRtl } = useApp();
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip after 5 seconds on load
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    const phoneNumber = '+97431267267';
    const text = isRtl
      ? 'مرحباً إيستن سفاروس، أود الاستفسار عن خدمات التنظيف ومكافحة الحشرات.'
      : 'Hello Eastern Sparrows, I would like to inquire about your cleaning and pest control services.';
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div
      className={`fixed bottom-6 z-40 flex items-center gap-3 ${
        isRtl ? 'left-6 flex-row-reverse' : 'right-6'
      }`}
    >
      {/* Tooltip speech bubble */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: isRtl ? -20 : 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="hidden sm:block bg-white dark:bg-slate-900 text-navy-base dark:text-slate-100 px-4 py-2 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 text-sm font-semibold max-w-[220px] relative pointer-events-none"
          >
            {isRtl ? 'أهلاً بك! تواصل معنا مباشرة عبر الواتساب' : 'Hi! Chat with us directly on WhatsApp'}
            {/* Small speech arrow */}
            <div
              className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white dark:bg-slate-900 rotate-45 border-slate-100 dark:border-slate-800 ${
                isRtl
                  ? '-right-1.5 border-t border-r'
                  : '-left-1.5 border-b border-l'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <button
        onClick={handleClick}
        className="relative p-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl hover:shadow-emerald-500/30 transform hover:scale-110 transition-all duration-300 group cursor-pointer"
        aria-label="Contact us on WhatsApp"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Radar ping rings */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75 pointer-events-none scale-125" />
        
        {/* WhatsApp Icon */}
        <svg
          className="w-7 h-7 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 2.028 14.12 1.01 11.493 1.01c-5.41 0-9.817 4.36-9.82 9.788-.002 1.802.484 3.553 1.411 5.12L1.93 21.03l5.306-1.391zM17.473 14.382c-.301-.15-1.782-.88-2.059-.98-.277-.101-.48-.15-.68.15-.2.3-.779.98-.955 1.18-.177.2-.354.226-.656.076-.301-.15-1.274-.469-2.427-1.498-.897-.8-1.502-1.788-1.678-2.09-.177-.302-.019-.465.132-.614.136-.134.301-.352.452-.528.15-.177.2-.303.3-.503.1-.2.05-.376-.025-.526-.075-.15-.68-1.642-.931-2.247-.245-.59-.493-.51-.68-.52-.176-.01-.377-.01-.578-.01-.201 0-.528.075-.804.376-.277.302-1.056 1.03-1.056 2.512 0 1.48 1.081 2.915 1.231 3.117.15.2 2.13 3.245 5.16 4.55.72.31 1.28.496 1.72.636.723.23 1.381.197 1.902.12.58-.087 1.782-.728 2.033-1.431.251-.703.251-1.306.176-1.431-.076-.124-.277-.2-.578-.35z" />
        </svg>
      </button>
    </div>
  );
}
