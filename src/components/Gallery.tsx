'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { dbService, GalleryItem } from '@/services/db';
import { Maximize2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Gallery() {
  const { t, isRtl } = useApp();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'cleaning' | 'pest'>('all');
  const [sectorFilter, setSectorFilter] = useState<'all' | 'residential' | 'commercial'>('all');
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  useEffect(() => {
    setItems(dbService.getGallery());
  }, []);

  const filteredItems = items.filter(item => {
    const matchesCategory = filter === 'all' || item.category === filter;
    const matchesSector = sectorFilter === 'all' || item.sector === sectorFilter;
    return matchesCategory && matchesSector;
  });

  return (
    <section id="gallery" className="py-24 bg-slate-100 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-display font-extrabold text-navy-base dark:text-white"
          >
            {t.galleryTitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-600 dark:text-slate-300 font-light text-base sm:text-lg"
          >
            {t.gallerySubtitle}
          </motion.p>

          {/* Filters Control Group */}
          <div className="flex flex-row items-center justify-start sm:justify-center gap-4 mt-8 w-full overflow-x-auto scrollbar-none pb-2 flex-nowrap -mx-4 px-4 sm:mx-0 sm:px-0">
            {/* Category Filter */}
            <div className="flex items-center gap-1.5 p-1 bg-white/80 dark:bg-slate-800 rounded-full shadow-sm border border-slate-200/50 dark:border-slate-800 shrink-0">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  filter === 'all'
                    ? 'bg-navy-base text-white shadow-sm'
                    : 'text-slate-500 hover:text-navy-base dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                {t.filterAll}
              </button>
              <button
                onClick={() => setFilter('cleaning')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  filter === 'cleaning'
                    ? 'bg-navy-base text-white shadow-sm'
                    : 'text-slate-500 hover:text-navy-base dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                {t.filterCleaning}
              </button>
              <button
                onClick={() => setFilter('pest')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  filter === 'pest'
                    ? 'bg-navy-base text-white shadow-sm'
                    : 'text-slate-500 hover:text-navy-base dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                {t.filterPest}
              </button>
            </div>

            {/* Sector Filter */}
            <div className="flex items-center gap-1.5 p-1 bg-white/80 dark:bg-slate-800 rounded-full shadow-sm border border-slate-200/50 dark:border-slate-800 shrink-0">
              <button
                onClick={() => setSectorFilter('all')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  sectorFilter === 'all'
                    ? 'bg-brandblue text-white shadow-sm'
                    : 'text-slate-500 hover:text-brandblue dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                {t.filterAll}
              </button>
              <button
                onClick={() => setSectorFilter('residential')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  sectorFilter === 'residential'
                    ? 'bg-brandblue text-white shadow-sm'
                    : 'text-slate-500 hover:text-brandblue dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                {t.filterResidential}
              </button>
              <button
                onClick={() => setSectorFilter('commercial')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  sectorFilter === 'commercial'
                    ? 'bg-brandblue text-white shadow-sm'
                    : 'text-slate-500 hover:text-brandblue dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                {t.filterCommercial}
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-x-auto md:overflow-x-visible flex-nowrap md:flex-wrap pb-6 md:pb-0 scrollbar-none snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="glass-card overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 flex flex-col group snap-start shrink-0 w-[82%] sm:w-[48%] md:w-auto"
              >
                {/* Image Comparison Box */}
                <div className="relative aspect-[4/3] w-full overflow-hidden flex bg-slate-200">
                  {/* Before Section */}
                  <div className="relative w-1/2 h-full border-r border-white/50">
                    <Image
                      src={item.beforeUrl}
                      alt="Before"
                      fill
                      sizes="(max-w-768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className={`absolute bottom-3 left-3 bg-red-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider`}>
                      {t.beforeLabel}
                    </div>
                  </div>

                  {/* After Section */}
                  <div className="relative w-1/2 h-full">
                    <Image
                      src={item.afterUrl}
                      alt="After"
                      fill
                      sizes="(max-w-768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className={`absolute bottom-3 right-3 bg-emerald-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider`}>
                      {t.afterLabel}
                    </div>
                  </div>

                  {/* Zoom Over Button */}
                  <button
                    onClick={() => setActiveLightbox(item)}
                    className="absolute top-3 right-3 p-2 bg-slate-950/60 hover:bg-brandblue hover:scale-105 text-white rounded-full transition-all duration-300 cursor-pointer"
                    aria-label="View Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Footer text */}
                <div className="p-4 bg-white/90 dark:bg-slate-900/90 text-center">
                  <h3 className="font-display font-bold text-sm sm:text-base text-navy-base dark:text-white leading-tight">
                    {isRtl ? item.titleAr : item.titleEn}
                  </h3>
                  <span className="text-[10px] font-semibold text-brandblue uppercase tracking-wider mt-1.5 inline-block">
                    {item.category === 'cleaning' ? t.cleaningServices : t.pestControlServices} • {item.sector === 'residential' ? t.filterResidential : t.filterCommercial}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/95 z-50 flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActiveLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-900 rounded-3xl overflow-hidden max-w-4xl w-full border border-slate-800 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveLightbox(null)}
                className="absolute top-4 right-4 p-2 bg-slate-850 hover:bg-brandblue text-white rounded-full z-10 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-center">
                {/* Images Container */}
                <div className="flex w-full md:w-3/4 aspect-[4/3] relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
                  {/* Before */}
                  <div className="relative w-1/2 h-full border-r border-slate-800">
                    <Image
                      src={activeLightbox.beforeUrl}
                      alt="Before"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
                      {t.beforeLabel}
                    </div>
                  </div>
                  {/* After */}
                  <div className="relative w-1/2 h-full">
                    <Image
                      src={activeLightbox.afterUrl}
                      alt="After"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-4 right-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
                      {t.afterLabel}
                    </div>
                  </div>
                </div>

                {/* Details side */}
                <div className="w-full md:w-1/4 space-y-4 text-center md:text-left">
                  <span className="inline-block text-xs font-semibold text-brandblue uppercase tracking-wider">
                    {activeLightbox.category === 'cleaning' ? t.cleaningServices : t.pestControlServices}
                  </span>
                  <h3 className="text-xl font-display font-bold text-white">
                    {isRtl ? activeLightbox.titleAr : activeLightbox.titleEn}
                  </h3>
                  <p className="text-sm text-slate-400 font-light">
                    {isRtl
                      ? 'تفخر شركة إيستن سفاروس بتقديم نتائج احترافية بجودة فائقة لعملائنا في قطر.'
                      : 'Eastern Sparrows delivers top-tier, reliable, and premium quality results across the State of Qatar.'}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
