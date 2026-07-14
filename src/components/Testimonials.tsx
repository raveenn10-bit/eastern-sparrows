'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { dbService, Testimonial } from '@/services/db';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Testimonials() {
  const { t, isRtl } = useApp();
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setReviews(dbService.getTestimonials());
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  if (reviews.length === 0) return null;

  const activeReview = reviews[activeIndex];

  return (
    <section id="testimonials" className="py-24 bg-slate-100 dark:bg-slate-900 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-base dark:text-white">
            {t.testimonialsTitle}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 font-light text-base sm:text-lg">
            {t.testimonialsSubtitle}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto relative px-4 sm:px-12">
          {/* Main Card View */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: isRtl ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRtl ? 50 : -50 }}
              transition={{ duration: 0.4 }}
              className="glass-card p-8 sm:p-12 bg-white/80 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 relative shadow-xl"
            >
              {/* Quote Mark Icon */}
              <Quote className={`absolute top-6 w-12 h-12 text-brandblue/10 dark:text-brandblue/5 ${isRtl ? 'left-6' : 'right-6'}`} />

              <div className="flex flex-col items-center text-center space-y-6">
                
                {/* User Avatar */}
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-md">
                  <Image
                    src={activeReview.avatarUrl}
                    alt={activeReview.nameEn}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(activeReview.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <blockquote className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-200 font-light italic leading-relaxed max-w-2xl">
                  "{isRtl ? activeReview.textAr : activeReview.textEn}"
                </blockquote>

                {/* Reviewer Details */}
                <div>
                  <h4 className="font-display font-bold text-navy-base dark:text-white text-base sm:text-lg">
                    {isRtl ? activeReview.nameAr : activeReview.nameEn}
                  </h4>
                  <div className="flex items-center justify-center gap-2 mt-1.5">
                    <span className="text-[10px] bg-brandblue/10 text-brandblue dark:text-brandblue-light font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {t.verifiedCustomer}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${
                      activeReview.platform === 'google' ? 'text-red-500' : 'text-blue-600'
                    }`}>
                      {activeReview.platform === 'google' ? t.googleReview : t.facebookReview}
                    </span>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="flex justify-center items-center gap-6 mt-8">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-navy-base dark:text-slate-200 hover:bg-brandblue hover:text-white transition-all shadow-md cursor-pointer"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Dots indicator */}
            <div className="flex gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    idx === activeIndex
                      ? 'bg-brandblue w-6'
                      : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-navy-base dark:text-slate-200 hover:bg-brandblue hover:text-white transition-all shadow-md cursor-pointer"
              aria-label="Next Review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
