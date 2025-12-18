import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Settings, User, Bell, Shield, Eye, EyeOff } from 'lucide-react';

const SettingsPage = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: false,
    darkMode: true,
    autoRefresh: true,
    refreshInterval: 5,
    twoFactor: false,
  });
  const [savedMessage, setSavedMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    setSavedMessage('Einstellungen gespeichert!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const SettingItem = ({ icon: Icon, label, description, value, onChange, type = 'toggle' }) => (
    <div className="card mb-4 hover:scale-102 transform">
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-4">
          <Icon className="w-5 h-5 text-neon-cyan mt-1" />
          <div>
            <h4 className="text-lg font-bold text-white mb-1">{label}</h4>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
        </div>
        {type === 'toggle' && (
          <button
            onClick={() => onChange(!value)}
            className={`relative w-14 h-8 rounded-full transition-colors ${value ? 'bg-neon-cyan' : 'bg-gray-600'}`}
          >
            <div className={`absolute top-1 left-1 w-6 h-6 bg-dark-bg rounded-full transition-transform ${value ? 'translate-x-6' : ''}`}></div>
          </button>
        )}
        {type === 'input' && (
          <input
            type="number"
            min="1"
            max="60"
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="input-neon w-20"
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold glow-text-cyan mb-2 flex items-center">
          <Settings className="w-8 h-8 mr-3" />
          Einstellungen
        </h1>
        <p className="text-gray-400">Verwalte dein Profil und deine Präferenzen</p>
      </div>

      {/* Saved Message */}
      {savedMessage && (
        <div className="p-4 rounded bg-neon-green bg-opacity-20 border border-neon-green text-neon-green animate-slideInDown">
          ✓ {savedMessage}
        </div>
      )}

      {/* Profile Section */}
      <div className="card neon-border">
        <h2 className="text-2xl font-bold text-neon-cyan mb-6 flex items-center">
          <User className="w-6 h-6 mr-3" />
          Profil
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Benutzername</label>
            <input
              type="text"
              value={user?.username}
              disabled
              className="input-neon bg-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">Name</label>
            <input
              type="text"
              value={user?.name}
              disabled
              className="input-neon bg-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">Rolle</label>
            <div className="px-4 py-3 rounded-lg bg-dark-card border border-neon-cyan border-opacity-30 text-neon-cyan font-bold uppercase">
              {user?.role}
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">Passwort</label>
            <div className="flex gap-2">
              <input
                type={passwordVisible ? 'text' : 'password'}
                value="••••••••"
                disabled
                className="input-neon bg-opacity-50 flex-1"
              />
              <button
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="btn-neon px-4"
              >
                {passwordVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div>
        <h2 className="text-2xl font-bold text-neon-pink mb-6 flex items-center">
          <Bell className="w-6 h-6 mr-3" />
          Benachrichtigungen
        </h2>
        <SettingItem
          icon={Bell}
          label="Benachrichtigungen aktivieren"
          description="Erhalte Benachrichtigungen über wichtige Ereignisse"
          value={settings.notifications}
          onChange={(v) => { handleToggle('notifications'); setSettings(prev => ({ ...prev, notifications: v })); }}
        />
        <SettingItem
          icon={Bell}
          label="E-Mail Benachrichtigungen"
          description="Erhalte E-Mails über System-Updates"
          value={settings.emailAlerts}
          onChange={(v) => { handleToggle('emailAlerts'); setSettings(prev => ({ ...prev, emailAlerts: v })); }}
        />
        <SettingItem
          icon={Settings}
          label="Auto-Refresh Intervall"
          description="Sekunden zwischen den Aktualisierungen"
          value={settings.refreshInterval}
          onChange={(v) => setSettings(prev => ({ ...prev, refreshInterval: v }))}
          type="input"
        />
      </div>

      {/* Display */}
      <div>
        <h2 className="text-2xl font-bold text-neon-green mb-6 flex items-center">
          <Settings className="w-6 h-6 mr-3" />
          Anzeige
        </h2>
        <SettingItem
          icon={Eye}
          label="Dark Mode"
          description="Verwende dunkles Design (empfohlen für Nacht)"
          value={settings.darkMode}
          onChange={(v) => { handleToggle('darkMode'); setSettings(prev => ({ ...prev, darkMode: v })); }}
        />
      </div>

      {/* Security */}
      <div>
        <h2 className="text-2xl font-bold text-neon-purple mb-6 flex items-center">
          <Shield className="w-6 h-6 mr-3" />
          Sicherheit
        </h2>
        <SettingItem
          icon={Shield}
          label="Zwei-Faktor-Authentifizierung"
          description="Erhöhe die Sicherheit deines Kontos"
          value={settings.twoFactor}
          onChange={(v) => { handleToggle('twoFactor'); setSettings(prev => ({ ...prev, twoFactor: v })); }}
        />
        <SettingItem
          icon={Settings}
          label="Auto-Refresh aktivieren"
          description="Dashboard wird automatisch aktualisiert"
          value={settings.autoRefresh}
          onChange={(v) => { handleToggle('autoRefresh'); setSettings(prev => ({ ...prev, autoRefresh: v })); }}
        />
      </div>

      {/* Save Button */}
      <button onClick={handleSave} className="btn-primary w-full">
        Einstellungen speichern
      </button>

      {/* Danger Zone */}
      <div className="card border-red-500 border-opacity-30">
        <h3 className="text-lg font-bold text-red-500 mb-4">Gefahrenzone</h3>
        <button className="w-full px-6 py-3 rounded-lg font-bold uppercase border-2 border-red-500 text-red-500 hover:bg-red-500 hover:bg-opacity-20 transition-all">
          Konto löschen
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
