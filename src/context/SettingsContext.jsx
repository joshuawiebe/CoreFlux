import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('corefluxSettings');
    return saved ? JSON.parse(saved) : {
      emailNotifications: true,
      pushNotifications: true,
      marketingEmails: false,
      twoFactor: false,
      personalizeExperience: true,
      shareUsageData: false,
    };
  });

  useEffect(() => {
    localStorage.setItem('corefluxSettings', JSON.stringify(settings));
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
