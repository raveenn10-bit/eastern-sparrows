'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Shield, Users, Zap, Coins, CheckCircle2, Award, Heart, Eye } from 'lucide-react';
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
    { year: "2016", titleEn: "Company Foundation", titleAr: "تأسيس الشركة", descEn: "Started operations in Doha with a team of 4 cleaners.", descAr: "انطلاق العمليات في الدوحة بفريق يضم 4 منظفين فقط." },
    { year: "2019", titleEn: "Municipality Approval", titleAr: "الاعتماد البلدي", descEn: "Certified by Qatar Municipality for eco-friendly pest control chemicals.", descAr: "الحصول على تراخيص البلدية للمبيدات الصديقة للبيئة." },
    { year: "2022", titleEn: "Expansion", titleAr: "التوسع الإقليمي", descEn: "Opened branches to cover Al Rayyan, Al Wukair, and Al Khor.", descAr: "افتتاح فروع جديدة لتغطية الريان والوكير والخور بالكامل." },
    { year: "2026", titleEn: "5000+ Happy Customers", titleAr: "أكثر من 5000 عميل سعيد", descEn: "Recognized as a leading premium cleaning brand in Qatar.", descAr: "تصنيفنا كعلامة تجارية رائدة للخدمات المنزلية الفاخرة." }
  ];

  return (
    <section id="about" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Intro Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brandblue/10 text-brandblue text-xs font-semibold">
              <Award className="w-4 h-4" />
              <span>{isRtl ? 'من نحن' : 'Our Identity'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-base dark:text-white leading-tight">
              {t.aboutStoryTitle}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-light">
              {t.aboutStoryDesc}
            </p>

            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800/40 shadow-sm space-y-3">
                <div className="p-3 bg-brandblue/10 text-brandblue rounded-xl inline-block">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-base text-navy-base dark:text-white">
                  {t.missionTitle}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                  {t.missionDesc}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800/40 shadow-sm space-y-3">
                <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-xl inline-block">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-base text-navy-base dark:text-white">
                  {t.visionTitle}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                  {t.visionDesc}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Timeline Visual (Right) */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative p-6 sm:p-10 bg-white/50 dark:bg-slate-900/40 glass-card"
          >
            <h3 className="font-display font-bold text-xl text-navy-base dark:text-white mb-8 border-b border-slate-200/50 dark:border-slate-800/50 pb-4">
              {t.timelineTitle}
            </h3>

            {/* Vertical Timeline */}
            <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 space-y-8 py-2">
              {timeline.map((event, idx) => (
                <div key={idx} className="relative pl-8">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[9px] top-1.5 w-4.5 h-4.5 rounded-full bg-brandblue border-4 border-white dark:border-slate-950 shadow-sm" />
                  
                  <span className="text-xs font-bold text-brandblue bg-brandblue/10 px-2 py-0.5 rounded">
                    {event.year}
                  </span>
                  <h4 className="font-display font-bold text-sm sm:text-base text-navy-base dark:text-slate-200 mt-2">
                    {isRtl ? event.titleAr : event.titleEn}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light mt-1">
                    {isRtl ? event.descAr : event.descEn}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center space-y-4"
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
