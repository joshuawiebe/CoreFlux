import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { Globe } from 'lucide-react';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  const languages = [
    { code: 'de', name: '🇩🇪 Deutsch', flag: '🇩🇪' },
    { code: 'en', name: '🇬🇧 English', flag: '🇬🇧' },
    { code: 'fr', name: '🇫🇷 Français', flag: '🇫🇷' },
    { code: 'es', name: '🇪🇸 Español', flag: '🇪🇸' },
  ];

  const currentLang = languages.find(l => l.code === i18n.language);

  const setCookie = (name, value, days = 30) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Strict`;
  };

  const handleLanguageChange = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('language', code);
    setCookie('language', code, 30);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
          isDark
            ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
        }`}
        title="Change language"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{currentLang?.flag}</span>
      </button>

      {isOpen && (
        <div
          className={`absolute top-full right-0 mt-2 rounded-lg shadow-lg z-50 min-w-max ${
            isDark
              ? 'bg-slate-800 border border-slate-700'
              : 'bg-white border border-slate-200'
          }`}
        >
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full text-left px-4 py-2 transition-colors flex items-center gap-2 ${
                i18n.language === lang.code
                  ? isDark
                    ? 'bg-brand-primary/20 text-brand-primary'
                    : 'bg-blue-50 text-brand-primary'
                  : isDark
                  ? 'hover:bg-slate-700 text-slate-300'
                  : 'hover:bg-slate-100 text-slate-600'
              }`}
            >
              <span>{lang.flag}</span>
              <span className="text-sm font-medium">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
