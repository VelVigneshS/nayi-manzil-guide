import { useState, useEffect } from 'react';

// Language type definition
export type Language = 'en' | 'hi' | 'ur' | 'ks' | 'dg';

// Translation interface
interface Translations {
  [key: string]: any;
}

// Available translations
const translations: Record<Language, () => Promise<Translations>> = {
  en: () => import('../translations/en.json'),
  hi: () => import('../translations/hi.json'),
  ur: () => import('../translations/ur.json'),
  ks: () => import('../translations/en.json'), // Fallback to English for now
  dg: () => import('../translations/en.json'), // Fallback to English for now
};

// Language names for display
export const languageNames: Record<Language, string> = {
  en: 'English',
  hi: 'हिन्दी',
  ur: 'اردو',
  ks: 'کٲشُر', // Kashmiri
  dg: 'डोगरी', // Dogri
};

// Custom hook for translations
export function useTranslation() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Translations>({});
  const [loading, setLoading] = useState(true);

  // Load translations when language changes
  useEffect(() => {
    const loadTranslations = async () => {
      setLoading(true);
      try {
        const translationModule = await translations[currentLanguage]();
        setTranslations(translationModule.default || translationModule);
      } catch (error) {
        console.error('Failed to load translations:', error);
        // Fallback to English
        const fallbackModule = await translations.en();
        setTranslations(fallbackModule.default || fallbackModule);
      } finally {
        setLoading(false);
      }
    };

    loadTranslations();
  }, [currentLanguage]);

  // Translation function with nested key support
  const t = (key: string, fallback?: string): string => {
    const keys = key.split('.');
    let result: any = translations;
    
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return fallback || key;
      }
    }
    
    return typeof result === 'string' ? result : fallback || key;
  };

  // Get array of translations (for lists)
  const tArray = (key: string): string[] => {
    const keys = key.split('.');
    let result: any = translations;
    
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return [];
      }
    }
    
    return Array.isArray(result) ? result : [];
  };

  // Change language
  const changeLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('nayi-manzil-language', language);
  };

  // Initialize language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('nayi-manzil-language') as Language;
    if (savedLanguage && savedLanguage in translations) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  return {
    t,
    tArray,
    currentLanguage,
    changeLanguage,
    loading,
    languageNames
  };
}