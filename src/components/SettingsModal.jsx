import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { X, Moon, Sun, Globe, Bell, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SettingsModal = ({ isOpen, onClose }) => {
  const { isDark, toggleTheme } = useTheme();
  const { i18n, t } = useTranslation();
  const [activeTab, setActiveTab] = useState('appearance');

  const languages = [
    { code: 'de', name: '🇩🇪 Deutsch' },
    { code: 'en', name: '🇬🇧 English' },
    { code: 'fr', name: '🇫🇷 Français' },
    { code: 'es', name: '🇪🇸 Español' },
  ];

  const handleLanguageChange = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('language', code);
  };

  const tabs = [
    { id: 'appearance', label: 'Appearance', icon: Sun },
    { id: 'language', label: 'Language', icon: Globe },
    { id: 'privacy', label: 'Privacy', icon: Lock },
  ];

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', damping: 30, stiffness: 300 }
    },
    exit: { y: '100%', opacity: 0 },
  };

  const tabVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { delay: 0.2 } },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-end md:justify-center">
          {/* Backdrop */}
          <motion.div
            className={`absolute inset-0 ${isDark ? 'bg-black/60' : 'bg-black/40'}`}
            onClick={onClose}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          />

          {/* Modal */}
          <motion.div
            className={`relative w-full h-[90vh] md:h-auto md:max-w-md md:rounded-2xl shadow-2xl rounded-t-3xl md:rounded-b-2xl ${
              isDark
                ? 'bg-slate-900 border border-slate-800'
                : 'bg-white border border-slate-200'
            }`}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div
              className={`flex items-center justify-between p-6 border-b sticky top-0 ${
                isDark ? 'border-slate-800' : 'border-slate-200'
              }`}
            >
              <h2 className={`text-2xl font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                ⚙️ Settings
              </h2>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-lg transition-colors ${
                  isDark
                    ? 'hover:bg-slate-800 text-slate-400'
                    : 'hover:bg-slate-100 text-slate-600'
                }`}
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Tabs */}
            <div className={`flex border-b ${isDark ? 'border-slate-800' : 'border-slate-200'} px-0`}>
              {tabs.map((tab) => {
                const TabIcon = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-4 px-4 flex items-center justify-center gap-2 font-medium transition-colors relative ${
                      activeTab === tab.id
                        ? isDark ? 'text-brand-primary' : 'text-brand-primary'
                        : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <TabIcon className="w-5 h-5" />
                    <span className="text-sm">{tab.label}</span>
                    {activeTab === tab.id && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1 bg-brand-primary"
                        layoutId="tabUnderline"
                        transition={{ type: 'spring', damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Content */}
            <div className="overflow-y-auto flex-1" style={{ maxHeight: 'calc(90vh - 140px)' }}>
              <div className="p-6">
                {/* Appearance Tab */}
                <AnimatePresence mode="wait">
                  {activeTab === 'appearance' && (
                    <motion.div
                      key="appearance"
                      variants={tabVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-6"
                    >
                      <div>
                        <h3 className={`text-sm font-semibold mb-4 flex items-center gap-2 ${
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}>
                          {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                          Theme
                        </h3>
                        <motion.button
                          onClick={toggleTheme}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full px-6 py-4 rounded-xl font-medium transition-all flex items-center justify-between ${
                            isDark
                              ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-brand-primary'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 hover:border-brand-primary'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {isDark ? <></> : <>☀️</>}
                            {isDark ? '🌙 Light Mode' : '🌙 Dark Mode'}
                          </span>
                          <motion.div
                            animate={{ rotate: isDark ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                          </motion.div>
                        </motion.button>
                        <p className={`text-xs mt-3 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                          Currently using <strong>{isDark ? 'Dark' : 'Light'} mode</strong>
                        </p>
                      </div>

                      <div className={`p-4 rounded-lg ${isDark ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          💡 Dark mode reduces eye strain and uses less battery on OLED displays.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Language Tab */}
                  {activeTab === 'language' && (
                    <motion.div
                      key="language"
                      variants={tabVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-6"
                    >
                      <div>
                        <h3 className={`text-sm font-semibold mb-4 flex items-center gap-2 ${
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}>
                          <Globe className="w-4 h-4" />
                          Select Language
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          {languages.map((lang) => (
                            <motion.button
                              key={lang.code}
                              onClick={() => handleLanguageChange(lang.code)}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              className={`px-4 py-3 rounded-lg border-2 font-medium transition-all text-sm ${
                                i18n.language === lang.code
                                  ? isDark
                                    ? 'border-brand-primary bg-brand-primary/20 text-brand-primary shadow-lg shadow-brand-primary/20'
                                    : 'border-brand-primary bg-blue-50 text-brand-primary shadow-lg shadow-brand-primary/20'
                                  : isDark
                                  ? 'border-slate-700 bg-slate-800 text-slate-300 hover:border-brand-primary'
                                  : 'border-slate-300 bg-slate-100 text-slate-600 hover:border-brand-primary'
                              }`}
                            >
                              {lang.name}
                            </motion.button>
                          ))}
                        </div>
                        <p className={`text-xs mt-3 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                          Current: <strong>{languages.find(l => l.code === i18n.language)?.name}</strong>
                        </p>
                      </div>

                      <div className={`p-4 rounded-lg ${isDark ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          🌍 Available in English, Deutsch, Français & Español. More languages coming soon!
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Privacy Tab */}
                  {activeTab === 'privacy' && (
                    <motion.div
                      key="privacy"
                      variants={tabVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-6"
                    >
                      <div className={`p-5 rounded-lg border-2 ${isDark ? 'bg-brand-primary/5 border-brand-primary/30' : 'bg-blue-50 border-brand-primary/30'}`}>
                        <div className="flex items-start gap-3 mb-3">
                          <Lock className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              100% Encrypted
                            </h4>
                            <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                              All your data is protected with military-grade encryption.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className={`p-5 rounded-lg border-2 ${isDark ? 'bg-green-500/5 border-green-500/30' : 'bg-green-50 border-green-500/30'}`}>
                        <div className="flex items-start gap-3 mb-3">
                          <Globe className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              German-Only Infrastructure
                            </h4>
                            <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                              Your data never leaves Germany. GDPR compliant.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className={`p-5 rounded-lg border-2 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-300'}`}>
                        <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          Learn more about our privacy practices in the <a href="/privacy" className="text-brand-primary font-semibold hover:underline">Privacy Policy</a>.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Footer Info */}
            <div className={`border-t p-4 text-center ${isDark ? 'bg-slate-800/30 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                ✓ Your preferences sync across all devices
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SettingsModal;
