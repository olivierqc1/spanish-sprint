// i18n/LanguageContext.tsx
'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr');
  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    // Charger la langue sauvegardée
    const saved = localStorage.getItem('spanish-sprint-language') as Language;
    if (saved && (saved === 'en' || saved === 'fr')) {
      setLanguageState(saved);
    } else {
      // Détecter la langue du navigateur
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'fr' || browserLang === 'en') {
        setLanguageState(browserLang);
      }
    }
  }, []);

  useEffect(() => {
    // Charger les traductions
    import(`./locales/${language}.json`).then(module => {
      setTranslations(module.default);
    });
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('spanish-sprint-language', lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
