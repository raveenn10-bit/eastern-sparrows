'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Sofa, Brush, Bed, ShieldCheck, Building2, Home, Flame, Bath,
  Bug, EyeOff, ShieldAlert, Waves, ShieldQuestion, HelpCircle
} from 'lucide-react';

interface ServiceItem {
  id: string;
  name: string;
  desc: string;
  price: string;
  icon: React.ComponentType<any>;
}

export default function Services() {
  const { t, openBookingWithService, isRtl } = useApp();
  const [activeTab, setActiveTab] = useState<'cleaning' | 'pest'>('cleaning');

  const cleaningList: ServiceItem[] = [
    { id: 'sofa', name: t.sofaCleaning, desc: t.sofaCleaningDesc, price: '80', icon: Sofa },
    { id: 'carpet', name: t.carpetCleaning, desc: t.carpetCleaningDesc, price: '100', icon: Brush },
    { id: 'mattress', name: t.mattressCleaning, desc: t.mattressCleaningDesc, price: '90', icon: Bed },
    { id: 'deep', name: t.deepCleaning, desc: t.deepCleaningDesc, price: '199', icon: Sparkles },
    { id: 'office', name: t.officeCleaning, desc: t.officeCleaningDesc, price: '25/hr', icon: Building2 },
    { id: 'villa', name: t.villaCleaning, desc: t.villaCleaningDesc, price: '150', icon: Home },
    { id: 'kitchen', name: t.kitchenCleaning, desc: t.kitchenCleaningDesc, price: '120', icon: Flame },
    { id: 'bathroom', name: t.bathroomCleaning, desc: t.bathroomCleaningDesc, price: '60', icon: Bath },
  ];

  const pestList: ServiceItem[] = [
    { id: 'cockroach', name: t.cockroachControl, desc: t.cockroachControlDesc, price: '120', icon: Bug },
    { id: 'bedbug', name: t.bedBugTreatment, desc: t.bedBugTreatmentDesc, price: '150', icon: Bed },
    { id: 'rodent', name: t.rodentControl, desc: t.rodentControlDesc, price: '130', icon: EyeOff },
    { id: 'mosquito', name: t.mosquitoControl, desc: t.mosquitoControlDesc, price: '140', icon: ShieldAlert },
    { id: 'ant', name: t.antControl, desc: t.antControlDesc, price: '100', icon: Bug },
    { id: 'termite', name: t.termiteControl, desc: t.termiteControlDesc, price: '250', icon: ShieldCheck },
    { id: 'general', name: t.generalPestControl, desc: t.generalPestControlDesc, price: '180', icon: ShieldQuestion },
  ];

  const services = activeTab === 'cleaning' ? cleaningList : pestList;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } }
  };

  return (
    <section id="services" className="py-24 bg-slate-100 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-base dark:text-white">
            {t.servicesTitle}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 font-light text-base sm:text-lg">
            {t.servicesSubtitle}
          </p>
          
          {/* Tab buttons */}
          <div className="inline-flex p-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mt-6 shadow-inner">
            <button
              onClick={() => setActiveTab('cleaning')}
              className={`px-6 sm:px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeTab === 'cleaning'
                  ? 'bg-gradient-to-r from-navy-base to-brandblue text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-navy-base dark:hover:text-white'
              }`}
            >
              {t.cleaningServices}
            </button>
            <button
              onClick={() => setActiveTab('pest')}
              className={`px-6 sm:px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeTab === 'pest'
                  ? 'bg-gradient-to-r from-navy-base to-brandblue text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-navy-base dark:hover:text-white'
              }`}
            >
              {t.pestControlServices}
            </button>
          </div>
        </div>

        {/* Services List Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="glass-card flex flex-col justify-between p-6 bg-white/70 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 hover:shadow-xl hover:shadow-brandblue/5 transform hover:-translate-y-1.5 group"
              >
                <div>
                  {/* Icon Frame */}
                  <div className="inline-flex p-4.5 rounded-2xl bg-gradient-to-br from-brandblue/10 to-brandblue/5 text-brandblue dark:text-brandblue-light mb-6 transition-transform group-hover:scale-110">
                    <service.icon className="w-8 h-8" />
                  </div>
                  {/* Title */}
                  <h3 className="text-lg font-display font-bold text-navy-base dark:text-white mb-3">
                    {service.name}
                  </h3>
                  {/* Description */}
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 font-light">
                    {service.desc}
                  </p>
                </div>

                <div>
                  {/* Price Tag */}
                  <div className={`flex items-baseline gap-1 mb-5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {t.startingFrom}
                    </span>
                    <span className="text-2xl font-display font-extrabold text-brandblue">
                      {service.price}
                    </span>
                    <span className="text-sm font-semibold text-navy-base dark:text-slate-300">
                      {t.qr}
                    </span>
                  </div>

                  {/* Book Button */}
                  <button
                    onClick={() => openBookingWithService(service.name)}
                    className="w-full bg-slate-50 hover:bg-gradient-to-r hover:from-navy-base hover:to-brandblue dark:bg-slate-800 hover:text-white dark:hover:bg-brandblue border border-slate-200/80 dark:border-slate-800 py-3 rounded-xl text-navy-base dark:text-slate-300 font-semibold text-sm transition-all duration-300 cursor-pointer"
                  >
                    {t.bookNow}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
