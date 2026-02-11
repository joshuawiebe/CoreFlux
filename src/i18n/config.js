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

// Get saved language or detect from browser
const getSavedLanguage = () => {
  // First check localStorage
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage && Object.keys(resources).includes(savedLanguage)) {
    return savedLanguage;
  }
  
  // Then check browser language
  const browserLanguage = navigator.language || navigator.userLanguage;
  const languageCode = browserLanguage.split('-')[0];
  
  if (Object.keys(resources).includes(languageCode)) {
    return languageCode;
  }
  
  // Fallback to English
  return 'en';
};

const initialLanguage = getSavedLanguage();

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLanguage,
    fallbackLng: 'en',
    ns: ['translation'],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    react: {
      useSuspense: false, // Disable Suspense
    },
  });

// Save language to localStorage and cookie when it changes
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
  document.cookie = `language=${lng};expires=${new Date(Date.now() + 7*24*60*60*1000).toUTCString()};path=/;SameSite=Strict`;
});

export default i18n;
