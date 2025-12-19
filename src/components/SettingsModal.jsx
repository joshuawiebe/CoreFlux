import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { X, Bell, Lock, Eye, Trash2, Download, Check } from 'lucide-react';

const SettingsModal = ({ isOpen, onClose }) => {
  const { isDark, toggleTheme } = useTheme();
  const { i18n, t } = useTranslation();
  const [activeTab, setActiveTab] = useState('account');
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    twoFactor: false,
    personalizeExperience: true,
    shareUsageData: false,
  });
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  const languages = [
    { code: 'de', name: 'Deutsch' },
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' },
  ];

  const tabs = [
    { id: 'account', label: t('common.profile'), icon: '👤' },
    { id: 'notifications', label: t('common.notifications'), icon: '🔔' },
    { id: 'security', label: t('common.security'), icon: '🔒' },
    { id: 'privacy', label: t('common.privacy'), icon: '👁️' },
    { id: 'about', label: t('common.about'), icon: 'ℹ️' },
  ];

  const handleLanguageChange = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('language', code);
  };

  const handleToggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSaveSettings = () => {
    localStorage.setItem('corefluxSettings', JSON.stringify(settings));
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 3000);
  };

  const handleExportData = () => {
    const data = {
      settings,
      language: i18n.language,
      exportedAt: new Date().toISOString(),
      user: { name: 'User', email: 'user@example.com' },
    };
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2)));
    element.setAttribute('download', `coreflux-data-${new Date().toISOString().split('T')[0]}.json`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 ${isDark ? 'bg-black/60' : 'bg-black/40'}`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-2xl mx-4 rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden ${
          isDark
            ? 'bg-slate-900 border border-slate-800'
            : 'bg-white border border-slate-200'
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-6 border-b ${
            isDark ? 'border-slate-800' : 'border-slate-200'
          }`}
        >
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            ⚙️ {t('common.settings')}
          </h1>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              isDark
                ? 'hover:bg-slate-800 text-slate-400'
                : 'hover:bg-slate-100 text-slate-600'
            }`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Save Message */}
        {showSaveMessage && (
          <div className="bg-green-500/20 border border-green-500 text-green-600 p-3 flex items-center gap-2">
            <Check className="w-5 h-5" />
            {t('settings.savedSuccessfully')}
          </div>
        )}

        <div className="flex max-h-[calc(90vh-80px)] overflow-hidden">
          {/* Tabs */}
          <div
            className={`w-48 border-r ${
              isDark
                ? 'bg-slate-800/50 border-slate-800'
                : 'bg-slate-50 border-slate-200'
            } overflow-y-auto`}
          >
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 transition-colors flex items-center gap-3 border-l-4 ${
                  activeTab === tab.id
                    ? isDark
                      ? 'bg-slate-700/50 border-brand-primary text-brand-primary'
                      : 'bg-blue-50 border-brand-primary text-brand-primary'
                    : isDark
                    ? 'border-transparent text-slate-400 hover:text-white hover:bg-slate-700/30'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Account Tab */}
            {activeTab === 'account' && (
              <div className="space-y-6">
                <div>
                  <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {t('settings.account')}
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {t('settings.username')}
                      </label>
                      <input
                        type="text"
                        defaultValue="John Doe"
                        className={`w-full px-4 py-2 rounded-lg border ${
                          isDark
                            ? 'bg-slate-800 border-slate-700 text-white'
                            : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {t('settings.emailAddress')}
                      </label>
                      <input
                        type="email"
                        defaultValue="john@example.com"
                        className={`w-full px-4 py-2 rounded-lg border ${
                          isDark
                            ? 'bg-slate-800 border-slate-700 text-white'
                            : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {t('settings.profilePicture')}
                      </label>
                      <div className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                        isDark
                          ? 'border-slate-700 hover:border-brand-primary hover:bg-slate-800/50'
                          : 'border-slate-300 hover:border-brand-primary hover:bg-blue-50'
                      }`}>
                        <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                          📸 {isDark ? 'Bild hochladen' : 'Upload image'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Language Selection */}
                <div>
                  <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    🌍 {t('settings.language')}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {languages.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                          i18n.language === lang.code
                            ? 'border-brand-primary bg-brand-primary text-white'
                            : isDark
                            ? 'border-slate-700 bg-slate-800 text-slate-300 hover:border-brand-primary'
                            : 'border-slate-300 bg-slate-100 text-slate-600 hover:border-brand-primary'
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Theme Selection */}
                <div>
                  <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    🎨 {t('settings.theme')}
                  </h3>
                  <button
                    onClick={toggleTheme}
                    className="w-full px-6 py-3 rounded-lg font-medium transition-all bg-gradient-to-r from-brand-primary to-brand-secondary text-white hover:shadow-lg"
                  >
                    {isDark ? '☀️ ' : '🌙 '} {isDark ? t('common.lightMode') : t('common.darkMode')}
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {t('common.notifications')}
                </h2>
                <div className="space-y-4">
                  {[
                    { key: 'emailNotifications', label: t('settings.emailNotifications') },
                    { key: 'pushNotifications', label: t('settings.pushNotifications') },
                    { key: 'marketingEmails', label: t('settings.marketingEmails') },
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between p-4 rounded-lg border"
                      style={{
                        borderColor: isDark ? '#334155' : '#e2e8f0',
                        backgroundColor: isDark ? '#1e293b' : '#f8fafc'
                      }}>
                      <label className={`font-medium cursor-pointer ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {item.label}
                      </label>
                      <div
                        onClick={() => handleToggleSetting(item.key)}
                        className={`w-12 h-6 rounded-full cursor-pointer transition-colors flex items-center px-1 ${
                          settings[item.key]
                            ? 'bg-brand-primary'
                            : isDark
                            ? 'bg-slate-700'
                            : 'bg-slate-300'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white transition-transform ${
                            settings[item.key] ? 'translate-x-6' : 'translate-x-0'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {t('common.security')}
                </h2>
                <div className="space-y-4">
                  <button className={`w-full px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                  }`}>
                    <Lock className="w-5 h-5" />
                    {t('settings.changePassword')}
                  </button>
                  <button className={`w-full px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                  }`}>
                    <Bell className="w-5 h-5" />
                    {t('settings.twoFactor')}
                  </button>
                  <div className={`p-4 rounded-lg border ${
                    isDark
                      ? 'bg-slate-800/50 border-slate-700'
                      : 'bg-blue-50 border-blue-200'
                  }`}>
                    <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                      📊 {t('settings.sessions')}: <span className="font-bold text-brand-primary">1 aktiv</span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {t('common.privacy')}
                </h2>
                <div className="space-y-4">
                  {[
                    { key: 'personalizeExperience', label: t('settings.personalizeExperience') },
                    { key: 'shareUsageData', label: t('settings.shareUsageData') },
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between p-4 rounded-lg border"
                      style={{
                        borderColor: isDark ? '#334155' : '#e2e8f0',
                        backgroundColor: isDark ? '#1e293b' : '#f8fafc'
                      }}>
                      <label className={`font-medium cursor-pointer ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {item.label}
                      </label>
                      <div
                        onClick={() => handleToggleSetting(item.key)}
                        className={`w-12 h-6 rounded-full cursor-pointer transition-colors flex items-center px-1 ${
                          settings[item.key]
                            ? 'bg-brand-primary'
                            : isDark
                            ? 'bg-slate-700'
                            : 'bg-slate-300'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white transition-transform ${
                            settings[item.key] ? 'translate-x-6' : 'translate-x-0'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleExportData}
                    className="w-full px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg"
                  >
                    <Download className="w-5 h-5" />
                    {t('settings.exportData')}
                  </button>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {t('settings.exportDataDescription')}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t"
                  style={{ borderColor: isDark ? '#334155' : '#e2e8f0' }}>
                  <button className="w-full px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white">
                    <Trash2 className="w-5 h-5" />
                    {t('settings.deleteAccount')}
                  </button>
                  <p className={`text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                    ⚠️ {t('settings.deleteAccountWarning')}
                  </p>
                </div>
              </div>
            )}

            {/* About Tab */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  ℹ️ {t('common.about')}
                </h2>
                <div className={`p-6 rounded-lg border ${
                  isDark
                    ? 'bg-slate-800/50 border-slate-700'
                    : 'bg-slate-100 border-slate-300'
                }`}>
                  <div className="space-y-3">
                    <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                      <span className="font-bold">CoreFlux</span> - Die intelligente Energielösung
                    </p>
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Version: 1.0.0
                    </p>
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      © 2025 CoreFlux GmbH. All rights reserved.
                    </p>
                    <div className="space-y-2 pt-4">
                      <a href="#" className="block text-brand-primary hover:text-brand-secondary transition-colors">
                        → Datenschutz
                      </a>
                      <a href="#" className="block text-brand-primary hover:text-brand-secondary transition-colors">
                        → Nutzungsbedingungen
                      </a>
                      <a href="#" className="block text-brand-primary hover:text-brand-secondary transition-colors">
                        → Impressum
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          className={`border-t flex justify-end gap-3 p-6 ${
            isDark ? 'border-slate-800' : 'border-slate-200'
          }`}
        >
          <button
            onClick={onClose}
            className={`px-6 py-2 rounded-lg font-medium transition-all border-2 ${
              isDark
                ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                : 'border-slate-300 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {t('common.cancel')}
          </button>
          <button
            onClick={handleSaveSettings}
            className="px-6 py-2 rounded-lg font-medium bg-gradient-to-r from-brand-primary to-brand-secondary text-white hover:shadow-lg transition-all"
          >
            {t('common.save')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
