'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { dbService } from '@/services/db';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const { t, isRtl } = useApp();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName && phone && message) {
      dbService.addContactRequest({
        fullName,
        phone,
        email,
        message
      });
      setSubmitted(true);
      setFullName('');
      setPhone('');
      setEmail('');
      setMessage('');
      setTimeout(() => setSubmitted(false), 8000);
    }
  };

  const contactInfo = [
    { icon: MapPin, title: t.officeLocation, text: t.officeLocationText, link: "https://maps.google.com" },
    { icon: Phone, title: t.callNow, text: "+974 3126 7267", link: "tel:+97431267267" },
    { icon: Mail, title: "Email Us", text: "es.pestcontrolcleaning@gmail.com", link: "mailto:es.pestcontrolcleaning@gmail.com" },
    { icon: Clock, title: t.workingHours, text: t.workingHoursText, link: null }
  ];

  return (
    <section id="contact" className="py-24 bg-slate-100 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-base dark:text-white">
            {t.contactTitle}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 font-light text-base sm:text-lg">
            {t.contactSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Contact Details & Map (Left) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            {/* Info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-sm flex flex-col space-y-2.5"
                >
                  <div className="p-2.5 bg-brandblue/10 text-brandblue rounded-xl inline-block w-fit">
                    <info.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-navy-base dark:text-slate-200 text-sm">
                    {info.title}
                  </h4>
                  {info.link ? (
                    <a
                      href={info.link}
                      target={info.link.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="text-xs text-slate-500 hover:text-brandblue dark:text-slate-400 break-all transition-colors leading-relaxed"
                    >
                      {info.text}
                    </a>
                  ) : (
                    <span className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {info.text}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Google Map Embed */}
            <div className="relative h-64 rounded-3xl overflow-hidden border border-slate-200/50 dark:border-slate-800/50 shadow-sm">
              <iframe
                title="Eastern Sparrows Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.2045582319426!2d51.5204443!3d25.2637222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c55a5b5b5b5b%3A0x5b5b5b5b5b5b5b5b!2sMunthaza%20Trading%20Center!5e0!3m2!1sen!2sqa!4v1700000000000!5m2!1sen!2sqa"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact Form (Right) */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 sm:p-10 bg-white/70 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 h-full flex flex-col justify-between">
              
              <div className="space-y-6">
                <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <MessageSquare className="w-5 h-5 text-brandblue" />
                  <h3 className="font-display font-bold text-lg text-navy-base dark:text-white">
                    {isRtl ? 'أرسل لنا رسالة مباشرة' : 'Send Us a Direct Message'}
                  </h3>
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex flex-col items-center text-center space-y-3"
                  >
                    <CheckCircle className="w-10 h-10 text-emerald-500" />
                    <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                      {t.messageSuccess}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className={`text-xs font-semibold text-slate-500 dark:text-slate-400 block ${
                          isRtl ? 'text-right' : 'text-left'
                        }`}>
                          {t.fullNameLabel} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className={`w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 px-4 py-3 text-sm outline-none focus:border-brandblue dark:focus:border-brandblue transition-all ${
                            isRtl ? 'text-right' : 'text-left'
                          }`}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className={`text-xs font-semibold text-slate-500 dark:text-slate-400 block ${
                          isRtl ? 'text-right' : 'text-left'
                        }`}>
                          {t.phoneLabel} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className={`w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 px-4 py-3 text-sm outline-none focus:border-brandblue dark:focus:border-brandblue transition-all ${
                            isRtl ? 'text-right' : 'text-left'
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
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 px-4 py-3 text-sm outline-none focus:border-brandblue dark:focus:border-brandblue transition-all ${
                          isRtl ? 'text-right' : 'text-left'
                        }`}
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label className={`text-xs font-semibold text-slate-500 dark:text-slate-400 block ${
                        isRtl ? 'text-right' : 'text-left'
                      }`}>
                        {t.messageLabel} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className={`w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 px-4 py-3 text-sm outline-none focus:border-brandblue dark:focus:border-brandblue transition-all ${
                          isRtl ? 'text-right' : 'text-left'
                        }`}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-navy-base to-brandblue text-white py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
                    >
                      <Send className="w-4 h-4" />
                      <span>{t.sendButton}</span>
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
