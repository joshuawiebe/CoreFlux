import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Thermometer, Bell, Lock, Wifi, LogOut, ArrowLeft, Cpu, Plus, Trash2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useModels } from '../context/ModelsContext';
import { Link } from 'react-router-dom';

const ProfessionalSettings = () => {
  const { isDark } = useTheme();
  const { user, logout } = useAuth();
  const { allModels, selectedModel, updateSelectedModel, addCustomModel, removeCustomModel } = useModels();
  const [activeTab, setActiveTab] = useState('general');
  const [temperature, setTemperature] = useState(21);
  const [newModelName, setNewModelName] = useState('');
  const [newModelId, setNewModelId] = useState('');
  const [showAddModel, setShowAddModel] = useState(false);
  const [notifications, setNotifications] = useState({
    heatingAlerts: true,
    weeklyReport: true,
    modelUpdates: false,
  });

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'models', label: 'Models', icon: Cpu },
    { id: 'heating', label: 'Heating', icon: Thermometer },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-white'}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`border-b ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}
      >
        <div className="max-w-6xl mx-auto px-6 py-6 md:py-8">
          <div className="flex items-center gap-4 mb-4">
            <Link
              to="/dashboard"
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className={`text-3xl md:text-4xl font-black ${isDark ? 'text-white' : 'text-black'}`}>
                Settings
              </h1>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Manage your CoreFlux account and heating system preferences
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    whileHover={{ x: 5 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                      activeTab === tab.id
                        ? isDark
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-600 text-white'
                        : isDark
                        ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </motion.button>
                );
              })}
            </nav>
          </motion.div>

          {/* Settings Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3"
            variants={containerVariants}
          >
            {/* General Settings */}
            {activeTab === 'general' && (
              <motion.div variants={containerVariants} className="space-y-6">
                <div>
                  <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
                    Account Settings
                  </h2>
                  <motion.div
                    variants={itemVariants}
                    className={`p-6 rounded-xl border ${
                      isDark
                        ? 'bg-gray-900 border-gray-800'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="space-y-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={user?.email || 'user@example.com'}
                          disabled
                          className={`w-full px-4 py-2 rounded-lg border disabled:opacity-50 ${
                            isDark
                              ? 'bg-gray-800 border-gray-700 text-gray-400'
                              : 'bg-gray-100 border-gray-300 text-gray-600'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Username
                        </label>
                        <input
                          type="text"
                          value={user?.username || 'user'}
                          disabled
                          className={`w-full px-4 py-2 rounded-lg border disabled:opacity-50 ${
                            isDark
                              ? 'bg-gray-800 border-gray-700 text-gray-400'
                              : 'bg-gray-100 border-gray-300 text-gray-600'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Plan
                        </label>
                        <div className={`px-4 py-3 rounded-lg border inline-block font-semibold text-blue-600`}>
                          Professional
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Models Settings */}
            {activeTab === 'models' && (
              <motion.div variants={containerVariants} className="space-y-6">
                <div>
                  <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
                    AI Models Management
                  </h2>

                  {/* Default Models */}
                  <motion.div
                    variants={itemVariants}
                    className={`p-6 rounded-xl border mb-6 ${
                      isDark
                        ? 'bg-gray-900 border-gray-800'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="mb-4">
                      <h3 className={`font-semibold text-lg mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                        Default Models
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Available models from OpenRouter. Some models are free to use.
                      </p>
                    </div>
                    <div className="space-y-2">
                      {allModels.filter(m => !allModels.some(cm => cm.provider === 'Custom')).map((model) => (
                        <motion.div
                          key={model.id}
                          whileHover={{ x: 5 }}
                          className={`p-4 rounded-lg border cursor-pointer transition-all ${
                            selectedModel === model.id
                              ? isDark
                                ? 'bg-blue-600/20 border-blue-500/50 ring-2 ring-blue-500/30'
                                : 'bg-blue-50 border-blue-300 ring-2 ring-blue-200'
                              : isDark
                              ? 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                              : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                          }`}
                          onClick={() => updateSelectedModel(model.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                                {model.name}
                              </p>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                {model.provider} {model.free && '• Free'}
                              </p>
                              {model.description && (
                                <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                                  {model.description}
                                </p>
                              )}
                            </div>
                            {selectedModel === model.id && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="text-blue-500 text-xl"
                              >
                                ✓
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Custom Models */}
                  <motion.div
                    variants={itemVariants}
                    className={`p-6 rounded-xl border ${
                      isDark
                        ? 'bg-gray-900 border-gray-800'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="mb-4">
                      <h3 className={`font-semibold text-lg mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                        Custom Models
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Add your own custom model IDs from OpenRouter or other providers.
                      </p>
                    </div>

                    {allModels.filter(m => m.provider === 'Custom').length > 0 && (
                      <div className="space-y-2 mb-6">
                        {allModels.filter(m => m.provider === 'Custom').map((model) => (
                          <motion.div
                            key={model.id}
                            whileHover={{ x: 5 }}
                            className={`p-4 rounded-lg border flex items-center justify-between ${
                              isDark
                                ? 'bg-gray-800 border-gray-700'
                                : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            <div>
                              <p className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                                {model.name}
                              </p>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                {model.id}
                              </p>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => removeCustomModel(model.id)}
                              className={`p-2 rounded-lg transition-all ${
                                isDark
                                  ? 'text-red-400 hover:bg-red-900/20'
                                  : 'text-red-600 hover:bg-red-50'
                              }`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {!showAddModel ? (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowAddModel(true)}
                        className={`w-full py-3 rounded-lg border-2 font-semibold transition-all flex items-center justify-center gap-2 ${
                          isDark
                            ? 'border-blue-500/30 text-blue-400 hover:bg-blue-600/10'
                            : 'border-blue-300 text-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        <Plus className="w-5 h-5" />
                        Add Custom Model
                      </motion.button>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3 p-4 rounded-lg border-2 border-blue-500/30"
                      >
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Model Name
                          </label>
                          <input
                            type="text"
                            value={newModelName}
                            onChange={(e) => setNewModelName(e.target.value)}
                            placeholder="e.g., My Custom Model"
                            className={`w-full px-4 py-2 rounded-lg border ${
                              isDark
                                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                                : 'bg-white border-gray-300 text-black placeholder-gray-400'
                            }`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Model ID
                          </label>
                          <input
                            type="text"
                            value={newModelId}
                            onChange={(e) => setNewModelId(e.target.value)}
                            placeholder="e.g., provider/model-name"
                            className={`w-full px-4 py-2 rounded-lg border ${
                              isDark
                                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                                : 'bg-white border-gray-300 text-black placeholder-gray-400'
                            }`}
                          />
                        </div>
                        <div className="flex gap-3">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              if (newModelName.trim() && newModelId.trim()) {
                                addCustomModel({ 
                                  id: newModelId, 
                                  name: newModelName, 
                                  provider: 'Custom',
                                  free: true 
                                });
                                setNewModelName('');
                                setNewModelId('');
                                setShowAddModel(false);
                              }
                            }}
                            className="flex-1 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-all"
                          >
                            Add Model
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setShowAddModel(false);
                              setNewModelName('');
                              setNewModelId('');
                            }}
                            className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                              isDark
                                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                            }`}
                          >
                            Cancel
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Heating Settings */}
            {activeTab === 'heating' && (
              <motion.div variants={containerVariants} className="space-y-6">
                <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
                  Heating System Preferences
                </h2>

                <motion.div
                  variants={itemVariants}
                  className={`p-6 rounded-xl border ${
                    isDark
                      ? 'bg-gray-900 border-gray-800'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
                    Preferred Temperature
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="15"
                          max="30"
                          value={temperature}
                          onChange={(e) => setTemperature(Number(e.target.value))}
                          className="flex-1"
                        />
                        <div className={`text-2xl font-bold w-12 text-center ${isDark ? 'text-white' : 'text-black'}`}>
                          {temperature}°C
                        </div>
                      </div>
                      <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Your AI system will learn from this preference
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className={`p-6 rounded-xl border ${
                    isDark
                      ? 'bg-gray-900 border-gray-800'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
                    Heating Schedule
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Weekday Active Hours</span>
                      <span className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>06:00 - 23:00</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Weekend Active Hours</span>
                      <span className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>07:00 - 23:00</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <motion.div variants={containerVariants} className="space-y-6">
                <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
                  Notification Preferences
                </h2>

                {[
                  {
                    id: 'heatingAlerts',
                    title: 'Heating Alerts',
                    description: 'Get notified when your heating system needs attention',
                  },
                  {
                    id: 'weeklyReport',
                    title: 'Weekly Report',
                    description: 'Receive a summary of your heating efficiency every Sunday',
                  },
                  {
                    id: 'modelUpdates',
                    title: 'Model Updates',
                    description: 'Be notified when new AI models are available',
                  },
                ].map((notif) => (
                  <motion.div
                    key={notif.id}
                    variants={itemVariants}
                    className={`p-6 rounded-xl border flex items-center justify-between ${
                      isDark
                        ? 'bg-gray-900 border-gray-800'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <div>
                      <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                        {notif.title}
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {notif.description}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setNotifications((prev) => ({
                          ...prev,
                          [notif.id]: !prev[notif.id],
                        }))
                      }
                      className={`w-12 h-6 rounded-full transition-colors ${
                        notifications[notif.id]
                          ? 'bg-blue-600'
                          : isDark
                          ? 'bg-gray-700'
                          : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                          notifications[notif.id] ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Security */}
            {activeTab === 'security' && (
              <motion.div variants={containerVariants} className="space-y-6">
                <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
                  Security Settings
                </h2>

                <motion.div
                  variants={itemVariants}
                  className={`p-6 rounded-xl border ${
                    isDark
                      ? 'bg-gray-900 border-gray-800'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <h3 className={`font-semibold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-black'}`}>
                    <Lock className="w-5 h-5" />
                    Password
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-all"
                  >
                    Change Password
                  </motion.button>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className={`p-6 rounded-xl border ${
                    isDark
                      ? 'bg-gray-900 border-gray-800'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <h3 className={`font-semibold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-black'}`}>
                    <Wifi className="w-5 h-5" />
                    Active Sessions
                  </h3>
                  <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Currently signed in from 1 device
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${
                      isDark
                        ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
                        : 'bg-red-100 text-red-600 hover:bg-red-200'
                    }`}
                  >
                    Sign Out All Devices
                  </motion.button>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className={`p-6 rounded-xl border ${
                    isDark
                      ? 'bg-red-900/20 border-red-700/50'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <h3 className={`font-semibold mb-2 ${isDark ? 'text-red-400' : 'text-red-700'}`}>
                    Delete Account
                  </h3>
                  <p className={`text-sm mb-4 ${isDark ? 'text-red-300/70' : 'text-red-600'}`}>
                    This action cannot be undone. All your data will be permanently deleted.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${
                      isDark
                        ? 'bg-red-600/30 text-red-400 hover:bg-red-600/40'
                        : 'bg-red-200 text-red-700 hover:bg-red-300'
                    }`}
                  >
                    Delete Account
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Logout Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto px-6 pb-12"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={logout}
          className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
            isDark
              ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
              : 'bg-red-100 text-red-600 hover:bg-red-200'
          }`}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ProfessionalSettings;
