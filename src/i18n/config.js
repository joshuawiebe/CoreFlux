import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import deTranslations from './locales/de.json';
import enTranslations from './locales/en.json';
import frTranslations from './locales/fr.json';
import esTranslations from './locales/es.json';

const resources = {
  de: { translation: deTranslations },
  en: { translation: enTranslations },
  fr: { translation: frTranslations },
  es: { translation: esTranslations },
};

// Lade die gespeicherte Sprache aus LocalStorage oder nutze Browser-Sprache
const getSavedLanguage = () => {
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage) {
    return savedLanguage;
  }
  
  // Fallback zur Browser-Sprache
  const browserLanguage = navigator.language || navigator.userLanguage;
  const languageCode = browserLanguage.split('-')[0];
  
  if (Object.keys(resources).includes(languageCode)) {
    return languageCode;
  }
  
  return 'de'; // Standard auf Deutsch
};

const initialLanguage = getSavedLanguage();

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLanguage,
    fallbackLng: 'de',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

// Speichere Sprache wenn sie wechselt
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
  // Speichere auch als Cookie
  document.cookie = `language=${lng};expires=${new Date(Date.now() + 7*24*60*60*1000).toUTCString()};path=/;SameSite=Strict`;
});

export default i18n;
