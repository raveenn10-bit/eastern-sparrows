'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { dbService } from '@/services/db';
import { 
  Calendar as CalendarIcon, Clock, MapPin, User, Phone, Mail, 
  MessageSquare, ChevronRight, ChevronLeft, Check, Sparkles, MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock list of services & prices for calculation
const servicePrices: Record<string, number> = {
  // Cleaning
  "Sofa Cleaning": 80,
  "تنظيف الكنب": 80,
  "Carpet & Rug Cleaning": 100,
  "تنظيف السجاد والموكيت": 100,
  "Mattress Sanitization": 90,
  "تعقيم المراتب": 90,
  "Deep Cleaning": 199,
  "تنظيف عميق": 199,
  "Office Cleaning": 100, // 4 hours basic
  "تنظيف المكاتب": 100,
  "Villa & Apartment Cleaning": 150,
  "تنظيف الفلل والشقق": 150,
  "Kitchen Deep Cleaning": 120,
  "تنظيف المطبخ العميق": 120,
  "Bathroom Sanitization": 60,
  "تعقيم الحمامات": 60,
  // Pest Control
  "Cockroach Eradication": 120,
  "مكافحة الصراصير": 120,
  "Bed Bug Treatment": 150,
  "مكافحة بق الفراش": 150,
  "Rodent & Mouse Control": 130,
  "مكافحة الفئران والقوارض": 130,
  "Mosquito & Fly Control": 140,
  "مكافحة البعوض والذباب": 140,
  "Ant & Insect Control": 100,
  "مكافحة النمل والحشرات": 100,
  "Termite Barrier Treatment": 250,
  "مكافحة النمل الأبيض (الرمة)": 250,
  "General Pest Control": 180,
  "مكافحة الحشرات العامة": 180
};

export default function BookingForm() {
  const { t, activeService, setActiveService, isRtl } = useApp();
  const [step, setStep] = useState(1);
  
  // Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('Doha');
  const [propertyType, setPropertyType] = useState('residential');
  const [service, setService] = useState('Deep Cleaning');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('09:00 AM - 12:00 PM');
  const [message, setMessage] = useState('');
  
  // Calculations
  const [estimate, setEstimate] = useState(199);
  const [isSuccess, setIsSuccess] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState('');

  // Prefill service from context
  useEffect(() => {
    if (activeService) {
      setService(activeService);
    }
  }, [activeService]);

  // Recalculate price estimate when service or propertyType changes
  useEffect(() => {
    const basePrice = servicePrices[service] || 150;
    const modifier = propertyType === 'commercial' ? 1.3 : 1.0;
    setEstimate(Math.round(basePrice * modifier));
  }, [service, propertyType]);

  const qatarLocations = [
    { en: "Doha", ar: "الدوحة" },
    { en: "Al Rayyan", ar: "الريان" },
    { en: "Umm Salal", ar: "أم صلال" },
    { en: "Al Wukair", ar: "الوكير" },
    { en: "Al Khor", ar: "الخور" }
  ];

  const timeSlots = [
    { label: "Morning (08:00 AM - 12:00 PM)", labelAr: "صباحاً (08:00 ص - 12:00 م)" },
    { label: "Afternoon (12:00 PM - 04:00 PM)", labelAr: "ظهراً (12:00 م - 04:00 م)" },
    { label: "Evening (04:00 PM - 08:00 PM)", labelAr: "مساءً (04:00 م - 08:00 م)" }
  ];

  const servicesList = Object.keys(servicePrices);

  const handleNext = () => {
    if (step === 1 && !service) return;
    if (step === 2 && (!preferredDate || !location)) return;
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    // Register booking in localStorage DB
    const booked = dbService.addBooking({
      fullName,
      phone,
      email,
      location,
      propertyType,
      service,
      preferredDate,
      preferredTime,
      message,
      estimatedPrice: estimate
    });

    // Generate WhatsApp text confirmation
    const waText = isRtl
      ? `*حجز جديد - إيستن سفاروس*
----------------------------
• *الاسم:* ${fullName}
• *الهاتف:* ${phone}
• *البريد:* ${email || 'غير محدد'}
• *الخدمة:* ${service}
• *نوع العقار:* ${propertyType === 'residential' ? 'سكني (فيلا/شقة)' : 'تجاري'}
• *المنطقة:* ${location}
• *التاريخ:* ${preferredDate}
• *الوقت:* ${preferredTime}
• *ملاحظات:* ${message || 'لا يوجد'}
----------------------------
• *السعر التقديري:* ${estimate} ر.ق
----------------------------
الرجاء تأكيد حجزي بالموعد المحدد.`
      : `*New Booking Request - Eastern Sparrows*
----------------------------
• *Name:* ${fullName}
• *Phone:* ${phone}
• *Email:* ${email || 'N/A'}
• *Service:* ${service}
• *Property:* ${propertyType === 'residential' ? 'Residential' : 'Commercial'}
• *Location:* ${location}
• *Date:* ${preferredDate}
• *Time Slot:* ${preferredTime}
• *Notes:* ${message || 'N/A'}
----------------------------
• *Price Estimate:* ${estimate} QR
----------------------------
Please confirm my booking for the selected slot.`;

    const encodedText = encodeURIComponent(waText);
    const waNumber = '+97431267267';
    setWhatsappLink(`https://wa.me/${waNumber}?text=${encodedText}`);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setStep(1);
    setFullName('');
    setPhone('');
    setEmail('');
    setPreferredDate('');
    setMessage('');
    setIsSuccess(false);
    setActiveService('');
  };

  return (
    <section id="booking" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-base dark:text-white">
            {t.bookingTitle}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 font-light text-sm sm:text-base">
            {t.bookingSubtitle}
          </p>
        </div>

        {/* Wizard Form Wrapper */}
        <div className="glass-card p-6 sm:p-10 bg-white/70 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 shadow-xl overflow-hidden relative">
          
          {/* Progress Indicators */}
          {!isSuccess && (
            <div className="flex items-center justify-between mb-10 border-b border-slate-100 dark:border-slate-800/60 pb-6">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2.5">
                  <div
                    className={`w-8.5 h-8.5 rounded-full flex items-center justify-center font-display font-bold text-xs transition-all duration-300 ${
                      step >= s
                        ? 'bg-gradient-to-r from-navy-base to-brandblue text-white shadow-md'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {step > s ? <Check className="w-4 h-4" /> : s}
                  </div>
                  <span
                    className={`text-xs font-semibold hidden sm:inline-block ${
                      step === s ? 'text-navy-base dark:text-white' : 'text-slate-400'
                    }`}
                  >
                    {s === 1 ? t.step1 : s === 2 ? t.step2 : t.step3}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Form Content */}
          <AnimatePresence mode="wait">
            {isSuccess ? (
              // Success Screen
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-10 space-y-6 flex flex-col items-center"
              >
                <div className="p-5 bg-emerald-500/10 text-emerald-500 rounded-full inline-block animate-bounce">
                  <Sparkles className="w-12 h-12" />
                </div>
                <h3 className="font-display font-extrabold text-2xl text-navy-base dark:text-white">
                  {t.bookingSuccess}
                </h3>
                <p className="text-slate-500 dark:text-slate-300 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
                  {t.bookingSuccessDesc}
                </p>

                {/* Estimate details */}
                <div className="bg-slate-100 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 w-full max-w-sm">
                  <span className="text-xs text-slate-500">{t.priceEstimate}</span>
                  <div className="text-3xl font-display font-extrabold text-brandblue mt-1">
                    {estimate} QR
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full justify-center">
                  {/* WhatsApp button */}
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-sm shadow-lg hover:shadow-emerald-500/30 transform hover:-translate-y-0.5 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>{t.sendWhatsAppText}</span>
                  </a>

                  {/* Reset button */}
                  <button
                    onClick={handleReset}
                    className="px-8 py-4 bg-slate-200 hover:bg-slate-350 dark:bg-slate-800 dark:hover:bg-slate-700 text-navy-base dark:text-slate-200 rounded-xl font-bold text-sm transition-colors cursor-pointer"
                  >
                    {isRtl ? 'حجز جديد' : 'New Booking'}
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  // STEP 1
                  <motion.div
                    initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                    className="space-y-6"
                  >
                    {/* Service Selector */}
                    <div className="space-y-2">
                      <label className={`text-xs font-semibold text-slate-500 dark:text-slate-400 block ${
                        isRtl ? 'text-right' : 'text-left'
                      }`}>
                        {t.serviceSelect} <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className={`w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3.5 text-sm outline-none focus:border-brandblue transition-all ${
                          isRtl ? 'text-right' : 'text-left'
                        }`}
                      >
                        {servicesList.map((srv) => (
                          <option key={srv} value={srv}>
                            {srv}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Property Type selection */}
                    <div className="space-y-2">
                      <label className={`text-xs font-semibold text-slate-500 dark:text-slate-400 block ${
                        isRtl ? 'text-right' : 'text-left'
                      }`}>
                        {t.propertyType}
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setPropertyType('residential')}
                          className={`py-3.5 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
                            propertyType === 'residential'
                              ? 'bg-navy-base border-navy-base text-white shadow-sm'
                              : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          {t.residential}
                        </button>
                        <button
                          type="button"
                          onClick={() => setPropertyType('commercial')}
                          className={`py-3.5 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
                            propertyType === 'commercial'
                              ? 'bg-navy-base border-navy-base text-white shadow-sm'
                              : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          {t.commercial}
                        </button>
                      </div>
                    </div>

                    {/* Price Estimate preview */}
                    <div className="p-5 rounded-2xl bg-brandblue/5 border border-brandblue/10 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-navy-base dark:text-white">
                          {t.priceEstimate}
                        </h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {isRtl ? '*سعر تقديري أولي مبدئي' : '*Initial approximate rate'}
                        </p>
                      </div>
                      <div className="text-2xl font-display font-extrabold text-brandblue">
                        {estimate} QR
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  // STEP 2
                  <motion.div
                    initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                    className="space-y-6"
                  >
                    {/* Date Picker */}
                    <div className="space-y-2">
                      <label className={`text-xs font-semibold text-slate-500 dark:text-slate-400 block ${
                        isRtl ? 'text-right' : 'text-left'
                      }`}>
                        {t.preferredDate} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <CalendarIcon className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 ${
                          isRtl ? 'left-4' : 'right-4'
                        }`} />
                        <input
                          type="date"
                          required
                          value={preferredDate}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className={`w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3.5 text-sm outline-none focus:border-brandblue transition-all ${
                            isRtl ? 'text-right pl-12' : 'text-left pr-12'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Time slots */}
                    <div className="space-y-2">
                      <label className={`text-xs font-semibold text-slate-500 dark:text-slate-400 block ${
                        isRtl ? 'text-right' : 'text-left'
                      }`}>
                        {t.preferredTime}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {timeSlots.map((slot) => {
                          const slotLabel = isRtl ? slot.labelAr : slot.label;
                          const isSelected = preferredTime === slot.label;
                          return (
                            <button
                              key={slot.label}
                              type="button"
                              onClick={() => setPreferredTime(slot.label)}
                              className={`py-3 px-4 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                                isSelected
                                  ? 'bg-navy-base border-navy-base text-white shadow-sm'
                                  : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                              }`}
                            >
                              {slotLabel}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Location picker */}
                    <div className="space-y-2">
                      <label className={`text-xs font-semibold text-slate-500 dark:text-slate-400 block ${
                        isRtl ? 'text-right' : 'text-left'
                      }`}>
                        {t.officeLocation} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 ${
                          isRtl ? 'left-4' : 'right-4'
                        }`} />
                        <select
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className={`w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3.5 text-sm outline-none focus:border-brandblue transition-all ${
                            isRtl ? 'text-right pl-12' : 'text-left pr-12'
                          }`}
                        >
                          {qatarLocations.map((loc) => (
                            <option key={loc.en} value={loc.en}>
                              {isRtl ? loc.ar : loc.en}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  // STEP 3
                  <motion.div
                    initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                    className="space-y-5"
                  >
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className={`text-xs font-semibold text-slate-500 dark:text-slate-400 block ${
                        isRtl ? 'text-right' : 'text-left'
                      }`}>
                        {t.fullNameLabel} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 ${
                          isRtl ? 'left-4' : 'right-4'
                        }`} />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className={`w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3.5 text-sm outline-none focus:border-brandblue transition-all ${
                            isRtl ? 'text-right pl-12' : 'text-left pr-12'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className={`text-xs font-semibold text-slate-500 dark:text-slate-400 block ${
                        isRtl ? 'text-right' : 'text-left'
                      }`}>
                        {t.phoneLabel} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 ${
                          isRtl ? 'left-4' : 'right-4'
                        }`} />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className={`w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3.5 text-sm outline-none focus:border-brandblue transition-all ${
                            isRtl ? 'text-right pl-12' : 'text-left pr-12'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className={`text-xs font-semibold text-slate-500 dark:text-slate-400 block ${
                        isRtl ? 'text-right' : 'text-left'
                      }`}>
                        {t.emailLabel}
                      </label>
                      <div className="relative">
                        <Mail className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 ${
                          isRtl ? 'left-4' : 'right-4'
                        }`} />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3.5 text-sm outline-none focus:border-brandblue transition-all ${
                            isRtl ? 'text-right pl-12' : 'text-left pr-12'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Special notes */}
                    <div className="space-y-1.5">
                      <label className={`text-xs font-semibold text-slate-500 dark:text-slate-400 block ${
                        isRtl ? 'text-right' : 'text-left'
                      }`}>
                        {t.messageNotes}
                      </label>
                      <div className="relative">
                        <MessageSquare className={`absolute top-[18px] w-5 h-5 text-slate-400 ${
                          isRtl ? 'left-4' : 'right-4'
                        }`} />
                        <textarea
                          rows={3}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className={`w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3.5 text-sm outline-none focus:border-brandblue transition-all ${
                            isRtl ? 'text-right pl-12' : 'text-left pr-12'
                          }`}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Controls */}
                <div className={`flex justify-between items-center mt-10 border-t border-slate-100 dark:border-slate-800/60 pt-6 ${
                  isRtl ? 'flex-row-reverse' : ''
                }`}>
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex items-center gap-2 bg-slate-200 hover:bg-slate-305 dark:bg-slate-800 dark:hover:bg-slate-700 text-navy-base dark:text-slate-200 px-6 py-3 rounded-xl font-bold text-xs transition-colors cursor-pointer"
                    >
                      <ChevronLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                      {t.backBtn}
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={step === 2 && !preferredDate}
                      className="flex items-center gap-2 bg-navy-base hover:bg-brandblue text-white px-6 py-3 rounded-xl font-bold text-xs transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {t.nextBtn}
                      <ChevronRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!fullName || !phone}
                      className="flex items-center gap-2 bg-gradient-to-r from-navy-base to-brandblue text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
                    >
                      <MessageCircle className="w-5 h-5 fill-current" />
                      {t.bookNowBtn}
                    </button>
                  )}
                </div>
              </form>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
