'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations } from '@/utils/translations';
import { dbService } from '@/services/db';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: 'dark';
  activeService: string;
  setActiveService: (service: string) => void;
  openBookingWithService: (serviceKey: string) => void;
  t: typeof translations.en;
  isRtl: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [activeService, setActiveService] = useState<string>('');

  // Handle system preference on mount & load saved preferences
  useEffect(() => {
    // Initialise mock database
    dbService.init();

    // Language Preference
    const savedLang = localStorage.getItem('es_language') as Language;
    if (savedLang) {
      setLanguageState(savedLang);
    } else {
      setLanguageState('en');
    }

    // Force Dark Mode on HTML element
    const root = window.document.documentElement;
    root.classList.add('dark');
    root.style.colorScheme = 'dark';
  }, []);

  // Update language/RTL direction on HTML element
  useEffect(() => {
    const root = window.document.documentElement;
    root.dir = language === 'ar' ? 'rtl' : 'ltr';
    root.lang = language;
    localStorage.setItem('es_language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const openBookingWithService = (serviceKey: string) => {
    setActiveService(serviceKey);
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const t = translations[language];
  const isRtl = language === 'ar';

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme: 'dark',
        activeService,
        setActiveService,
        openBookingWithService,
        t,
        isRtl,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppContextProvider');
  }
  return context;
}
