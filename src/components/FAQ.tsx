'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const { t, isRtl } = useApp();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    { question: t.faqQ1, answer: t.faqA1 },
    { question: t.faqQ2, answer: t.faqA2 },
    { question: t.faqQ3, answer: t.faqA3 },
    { question: t.faqQ4, answer: t.faqA4 },
    { question: t.faqQ5, answer: t.faqA5 }
  ];

  const handleToggle = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-base dark:text-white">
            {t.faqTitle}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 font-light text-base sm:text-lg">
            {t.faqSubtitle}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className={`glass-card overflow-hidden border transition-all duration-300 bg-white/70 dark:bg-slate-900/60 ${
                  isOpen
                    ? 'border-brandblue dark:border-brandblue/60 shadow-lg'
                    : 'border-slate-200/50 dark:border-slate-800/50'
                }`}
              >
                {/* Header Toggle */}
                <button
                  onClick={() => handleToggle(index)}
                  className={`w-full p-6 flex items-center justify-between gap-4 cursor-pointer text-right lg:text-left ${
                    isRtl ? 'flex-row-reverse' : ''
                  }`}
                  aria-expanded={isOpen}
                >
                  <div className={`flex items-center gap-3.5 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                    <HelpCircle className="w-5 h-5 text-brandblue shrink-0" />
                    <span className="font-display font-bold text-sm sm:text-base text-navy-base dark:text-white leading-tight">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-brandblue' : ''
                    }`}
                  />
                </button>

                {/* Animated Answer Box */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className={`px-6 pb-6 pt-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-light leading-relaxed border-t border-slate-100 dark:border-slate-800/40 ${
                        isRtl ? 'text-right' : 'text-left'
                      }`}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
