'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Shield, Users, Zap, Coins, CheckCircle2, Award, Heart, Eye,
  Flag, ShieldCheck, MapPin, Trophy 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  const { t, isRtl } = useApp();

  const features = [
    { title: t.why1Title, desc: t.why1Desc, icon: Shield },
    { title: t.why2Title, desc: t.why2Desc, icon: Users },
    { title: t.why3Title, desc: t.why3Desc, icon: Zap },
    { title: t.why4Title, desc: t.why4Desc, icon: Coins },
  ];

  const coverageAreas = [
    { nameEn: "Doha", nameAr: "الدوحة", descEn: "Capital city and municipal hubs", descAr: "العاصمة والدوائر البلدية المركزية" },
    { nameEn: "Al Rayyan", nameAr: "الريان", descEn: "Residential villas & commercial sectors", descAr: "الفلل السكنية والقطاعات التجارية" },
    { nameEn: "Umm Salal", nameAr: "أم صلال", descEn: "Local community coverage", descAr: "تغطية كاملة للمجمعات السكنية" },
    { nameEn: "Al Wukair", nameAr: "الوكير", descEn: "Southern region deep cleans", descAr: "خدمات المنطقة الجنوبية والوكرة" },
    { nameEn: "Al Khor", nameAr: "الخور", descEn: "Northern districts and residential hubs", descAr: "المناطق الشمالية والبلديات السكنية" }
  ];

  const timeline = [
    { 
      year: "2016", 
      titleEn: "Company Foundation", 
      titleAr: "تأسيس الشركة", 
      descEn: "Started operations in Doha with a team of 4 cleaners.", 
      descAr: "انطلاق العمليات في الدوحة بفريق يضم 4 منظفين فقط.",
      icon: Flag,
      color: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
    },
    { 
      year: "2019", 
      titleEn: "Municipality Approval", 
      titleAr: "الاعتماد البلدي", 
      descEn: "Certified by Qatar Municipality for eco-friendly pest control chemicals.", 
      descAr: "الحصول على تراخيص البلدية للمبيدات الصديقة للبيئة.",
      icon: ShieldCheck,
      color: "border-brandblue/30 text-brandblue bg-brandblue/10"
    },
    { 
      year: "2022", 
      titleEn: "Expansion", 
      titleAr: "التوسع الإقليمي", 
      descEn: "Opened branches to cover Al Rayyan, Al Wukair, and Al Khor.", 
      descAr: "افتتاح فروع جديدة لتغطية الريان والوكير والخور بالكامل.",
      icon: MapPin,
      color: "border-indigo-500/30 text-indigo-400 bg-indigo-500/10"
    },
    { 
      year: "2026", 
      titleEn: "5000+ Happy Customers", 
      titleAr: "أكثر من 5000 عميل سعيد", 
      descEn: "Recognized as a leading premium cleaning brand in Qatar.", 
      descAr: "تصنيفنا كعلامة تجارية رائدة للخدمات المنزلية الفاخرة.",
      icon: Trophy,
      color: "border-amber-500/30 text-amber-400 bg-amber-500/10"
    }
  ];

  return (
    <section id="about" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Intro Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brandblue/10 text-brandblue text-xs font-semibold">
              <Award className="w-4 h-4" />
              <span>{isRtl ? 'من نحن' : 'Our Identity'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-base dark:text-white leading-tight">
              {t.aboutStoryTitle}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-light text-base">
              {t.aboutStoryDesc}
            </p>
          </motion.div>

          {/* Mission & Vision Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <div className="p-6 rounded-3xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 glass-card space-y-4 hover:shadow-lg">
              <div className="p-3 bg-brandblue/10 text-brandblue rounded-2xl inline-block">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-navy-base dark:text-white">
                {t.missionTitle}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                {t.missionDesc}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 glass-card space-y-4 hover:shadow-lg">
              <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-2xl inline-block">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-navy-base dark:text-white">
                {t.visionTitle}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                {t.visionDesc}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Dedicated Modern Alternating Timeline */}
        <div className="mb-32 relative">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-navy-base dark:text-white">
              {t.timelineTitle}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-light">
              {isRtl ? 'خطوات ثابتة من التميز والريادة في قطر' : 'Milestones of dedication and growth across Qatar'}
            </p>
          </div>

          {/* Central Line Container */}
          <div className="relative">
            {/* Central Vertical Line (Desktop only) */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brandblue/30 via-indigo-500/30 to-brandblue/5 hidden md:block" />
            
            {/* Left/Right Grid */}
            <div className="space-y-12 relative">
              {timeline.map((event, idx) => {
                const isLeft = idx % 2 === 0;
                const EventIcon = event.icon;

                return (
                  <div 
                    key={idx} 
                    className={`flex flex-col md:flex-row items-center justify-between w-full ${
                      isLeft ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Empty placeholder to balance layout on desktop */}
                    <div className="w-full md:w-[45%] hidden md:block" />

                    {/* Timeline Node marker with pulse */}
                    <div className="relative z-10 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 border-4 border-slate-950 shadow-md">
                      <span className="absolute inset-0 rounded-full bg-brandblue/20 animate-ping scale-150 opacity-40" />
                      <EventIcon className="w-5 h-5 text-brandblue" />
                    </div>

                    {/* Card Container */}
                    <motion.div
                      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ type: 'spring', stiffness: 80, delay: 0.1 }}
                      className="w-full md:w-[45%]"
                    >
                      <div className="glass-card p-6 bg-white/70 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 shadow-lg relative group">
                        
                        {/* Year Badge */}
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${event.color} mb-4`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                          {event.year}
                        </div>

                        {/* Title */}
                        <h4 className="font-display font-extrabold text-base sm:text-lg text-navy-base dark:text-slate-100 group-hover:text-brandblue transition-colors">
                          {isRtl ? event.titleAr : event.titleEn}
                        </h4>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light mt-2 leading-relaxed">
                          {isRtl ? event.descAr : event.descEn}
                        </p>

                        {/* Small triangle arrow pointer (Desktop only) */}
                        <div className={`absolute top-8 w-3 h-3 bg-white/70 dark:bg-slate-900/60 border-slate-200/50 dark:border-slate-800/50 rotate-45 hidden md:block ${
                          isLeft 
                            ? 'left-full -translate-x-1.5 border-t border-r' 
                            : 'right-full translate-x-1.5 border-b border-l'
                        }`} />
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-navy-base dark:text-white">
              {t.whyChooseUs}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-light">
              {isRtl
                ? 'جودة لا تضاهى، اعتماد تام، وحلول وقائية فعالة مخصصة لراحتك.'
                : 'Unmatched standards, municipal credentials, and highly effective preventative measures.'}
            </p>
          </div>

          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 overflow-x-auto md:overflow-x-visible flex-nowrap md:flex-wrap pb-6 md:pb-0 scrollbar-none snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0">
            {features.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center space-y-4 snap-center shrink-0 w-[78%] sm:w-[45%] md:w-auto"
              >
                <div className="p-4 bg-brandblue/10 text-brandblue rounded-2xl">
                  <feat.icon className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-base text-navy-base dark:text-white">
                  {feat.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Service Coverage Section */}
        <div className="p-8 sm:p-12 bg-gradient-to-br from-navy-base/95 to-slate-900 text-white rounded-3xl relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brandblue/15 rounded-full filter blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-5 space-y-4 text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold">
                {t.coverageTitle}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                {t.coverageDesc}
              </p>
            </div>
            
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {coverageAreas.map((area, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/15 transition-all text-center space-y-1"
                >
                  <CheckCircle2 className="w-5 h-5 text-brandblue mx-auto mb-2" />
                  <h4 className="font-display font-bold text-sm sm:text-base">
                    {isRtl ? area.nameAr : area.nameEn}
                  </h4>
                  <p className="text-[10px] text-slate-300">
                    {isRtl ? area.descAr : area.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
