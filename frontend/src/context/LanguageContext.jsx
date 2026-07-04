import React, { createContext, useState, useContext, useEffect } from 'react';
import enTranslations from '../translations/en';
import soTranslations from '../translations/so';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Check local storage for saved language, default to 'en'
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('snrms_language');
    return saved ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('snrms_language', language);
    // Optionally update document language for accessibility
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'so' : 'en'));
  };

  const t = (key) => {
    const translations = language === 'en' ? enTranslations : soTranslations;
    
    // Support nested keys like 'home.hero.title'
    const keys = key.split('.');
    let result = translations;
    
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        // Fallback to English if translation is missing, or return the key
        let fallbackResult = enTranslations;
        for (const fk of keys) {
           if (fallbackResult && typeof fallbackResult === 'object' && fk in fallbackResult) {
             fallbackResult = fallbackResult[fk];
           } else {
             return key; // Key not found even in English
           }
        }
        return fallbackResult;
      }
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
