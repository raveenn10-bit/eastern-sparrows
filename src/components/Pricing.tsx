'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Check, X, Calendar, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface PricingTier {
  name: string;
  price: string;
  unit: string;
  popular: boolean;
  desc: string;
  features: boolean[];
}

export default function Pricing() {
  const { t, openBookingWithService, isRtl } = useApp();

  const tiers: PricingTier[] = [
    {
      name: t.packageBasic,
      price: "25",
      unit: t.perHour,
      popular: false,
      desc: isRtl ? "مثالي للتنظيف الدوري البسيط والمحافظة على النظافة." : "Perfect for regular maintenance cleaning and dusting.",
      features: [true, true, false, false, false, false, false]
    },
    {
      name: t.packageStandard,
      price: "35",
      unit: t.perHour,
      popular: true,
      desc: isRtl ? "الخيار الأفضل للبيوت والشقق، يشمل مواد وأجهزة تنظيف متقدمة." : "Our best seller for homes. Includes materials and advanced tools.",
      features: [true, true, true, true, false, false, true]
    },
    {
      name: t.packagePremium,
      price: "199",
      unit: isRtl ? "البداية" : "Flat rate",
      popular: false,
      desc: isRtl ? "تنظيف شامل وعميق للمجالس، المراتب، المطبخ، وتعقيم متكامل بالبخار." : "Full detailed sanitization, deep kitchen scrubbing, and steam treatment.",
      features: [true, true, true, true, true, true, true]
    }
  ];

  const featureLabels = [
    t.featureHours,
    t.featureEquipment,
    t.featureSupervisor,
    t.featureSanitization,
    t.featureDisinfection,
    t.featurePestControl,
    t.featureWarranty
  ];

  return (
    <section id="pricing" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
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
            {t.pricingTitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-600 dark:text-slate-300 font-light text-base sm:text-lg"
          >
            {t.pricingSubtitle}
          </motion.p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
          {tiers.map((tier, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`glass-card p-8 flex flex-col justify-between relative border-2 ${
                tier.popular
                  ? 'border-brandblue dark:border-brandblue/80 bg-white/90 dark:bg-slate-900/80 shadow-xl shadow-brandblue/5 scale-100 lg:scale-[1.03]'
                  : 'border-slate-200/50 dark:border-slate-800/50'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-navy-base to-brandblue text-white text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  {t.popular}
                </div>
              )}

              <div>
                <h3 className="font-display font-bold text-xl text-navy-base dark:text-white mb-2">
                  {tier.name}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-light leading-relaxed mb-6 min-h-[48px]">
                  {tier.desc}
                </p>

                {/* Price block */}
                <div className={`flex items-baseline gap-1 mb-8 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                    {t.priceStarting}
                  </span>
                  <span className="text-4xl sm:text-5xl font-display font-extrabold text-navy-base dark:text-white">
                    {tier.price}
                  </span>
                  <span className="text-lg font-bold text-brandblue">
                    {t.qr}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    / {tier.unit}
                  </span>
                </div>

                <hr className="border-slate-200/50 dark:border-slate-800/50 mb-6" />

                {/* Micro checklist */}
                <ul className="space-y-3.5 text-sm mb-8">
                  {featureLabels.map((label, fIdx) => (
                    <li key={fIdx} className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                      {tier.features[fIdx] ? (
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-slate-400 dark:text-slate-600 shrink-0" />
                      )}
                      <span className={tier.features[fIdx] ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400 dark:text-slate-600'}>
                        {label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => openBookingWithService(tier.name)}
                className={`w-full py-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  tier.popular
                    ? 'bg-gradient-to-r from-navy-base to-brandblue text-white shadow-lg hover:shadow-brandblue/20 hover:-translate-y-0.5'
                    : 'bg-slate-100 hover:bg-navy-base hover:text-white dark:bg-slate-800 text-navy-base dark:text-slate-300'
                }`}
              >
                <Calendar className="w-4 h-4" />
                {t.bookNow}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="glass-card overflow-hidden border border-slate-200/50 dark:border-slate-800/50">
          <div className="p-6 bg-slate-100/50 dark:bg-slate-900/50 border-b border-slate-200/50 dark:border-slate-800/50 text-center font-display font-bold text-navy-base dark:text-white">
            {t.compareFeatures}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-950/20 text-slate-500 dark:text-slate-400 font-semibold">
                  <th className={`p-4 ${isRtl ? 'text-right' : 'text-left'}`}>{isRtl ? 'الميزات' : 'Features'}</th>
                  <th className="p-4 text-center">{t.packageBasic}</th>
                  <th className="p-4 text-center">{t.packageStandard}</th>
                  <th className="p-4 text-center">{t.packagePremium}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/50 dark:divide-slate-800/50">
                {featureLabels.map((label, fIdx) => (
                  <tr key={fIdx} className="hover:bg-slate-100/20 dark:hover:bg-slate-900/10 transition-colors">
                    <td className={`p-4 font-medium text-slate-700 dark:text-slate-300 ${isRtl ? 'text-right' : 'text-left'}`}>{label}</td>
                    <td className="p-4 text-center">
                      {tiers[0].features[fIdx] ? (
                        <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-slate-400 mx-auto" />
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {tiers[1].features[fIdx] ? (
                        <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-slate-400 mx-auto" />
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {tiers[2].features[fIdx] ? (
                        <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-slate-400 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
