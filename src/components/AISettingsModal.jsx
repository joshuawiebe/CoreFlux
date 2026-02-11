import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Eye, EyeOff, Trash2, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const AISettingsModal = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [newApiKey, setNewApiKey] = useState('');
  const [showAddKey, setShowAddKey] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('openrouter_api_key');
    if (savedKey) setApiKey(savedKey);
  }, [isOpen]);

  const handleSaveApiKey = () => {
    if (newApiKey.trim()) {
      localStorage.setItem('openrouter_api_key', newApiKey);
      setApiKey(newApiKey);
      setNewApiKey('');
      setShowAddKey(false);
    }
  };

  const handleCopyKey = async () => {
    if (apiKey) {
      try {
        await navigator.clipboard.writeText(apiKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const handleClearKey = () => {
    if (window.confirm('Remove API key? You\'ll need to add a new one to use the AI chat.')) {
      localStorage.removeItem('openrouter_api_key');
      setApiKey('');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 rounded-xl border ${
              isDark
                ? 'bg-gray-900 border-gray-800'
                : 'bg-white border-gray-200'
            }`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-6 border-b ${
              isDark ? 'border-gray-800' : 'border-gray-200'
            }`}>
              <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                AI Chat Settings
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                }`}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* API Key Section */}
              <div>
                <h3 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-black'}`}>
                  OpenRouter API Key
                </h3>
                <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Your API key is stored locally in your browser. Never shared with our servers.
                </p>

                {apiKey ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`p-4 rounded-lg border ${
                      isDark
                        ? 'bg-green-900/20 border-green-700/50'
                        : 'bg-green-50 border-green-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-500" />
                        <span className={`text-sm font-medium ${isDark ? 'text-green-400' : 'text-green-700'}`}>
                          API Key Configured
                        </span>
                      </div>
                    </div>

                    <div className={`p-3 rounded border mb-3 flex items-center justify-between ${
                      isDark
                        ? 'bg-gray-800 border-gray-700'
                        : 'bg-gray-100 border-gray-300'
                    }`}>
                      <code className={`text-sm truncate ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {showKey ? apiKey : '•'.repeat(40)}
                      </code>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowKey(!showKey)}
                        className={`p-1 rounded ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                      >
                        {showKey ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </motion.button>
                    </div>

                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCopyKey}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded text-sm font-medium transition-all ${
                          copied
                            ? isDark
                              ? 'bg-green-600/20 text-green-400'
                              : 'bg-green-100 text-green-700'
                            : isDark
                            ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30'
                            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }`}
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy
                          </>
                        )}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleClearKey}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded text-sm font-medium transition-all ${
                          isDark
                            ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }`}
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`p-4 rounded-lg border ${
                      isDark
                        ? 'bg-yellow-900/20 border-yellow-700/50'
                        : 'bg-yellow-50 border-yellow-200'
                    }`}
                  >
                    <p className={`text-sm mb-3 ${isDark ? 'text-yellow-400' : 'text-yellow-700'}`}>
                      No API key configured. Add one to start using the AI chat.
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Add/Update Key */}
              {!showAddKey ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowAddKey(true)}
                  className={`w-full py-2 rounded-lg font-medium transition-all ${
                    isDark
                      ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  {apiKey ? 'Update API Key' : 'Add API Key'}
                </motion.button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <input
                    type="password"
                    value={newApiKey}
                    onChange={(e) => setNewApiKey(e.target.value)}
                    placeholder="Paste your OpenRouter API key"
                    className={`w-full px-3 py-2 rounded-lg border text-sm ${
                      isDark
                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                        : 'bg-white border-gray-300 text-black placeholder-gray-400'
                    }`}
                  />
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSaveApiKey}
                      className="flex-1 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 font-medium transition-all"
                    >
                      Save
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setShowAddKey(false);
                        setNewApiKey('');
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

              {/* Info Section */}
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                  How to get your API key
                </h4>
                <ol className={`text-sm space-y-2 list-decimal list-inside ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <li>Visit <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">openrouter.ai</a></li>
                  <li>Sign up or log in</li>
                  <li>Go to your account settings</li>
                  <li>Copy your API key</li>
                  <li>Paste it here</li>
                </ol>
              </div>
            </div>

            {/* Footer */}
            <div className={`border-t p-4 flex justify-end gap-3 ${
              isDark ? 'border-gray-800' : 'border-gray-200'
            }`}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  isDark
                    ? 'bg-gray-800 text-white hover:bg-gray-700'
                    : 'bg-gray-200 text-black hover:bg-gray-300'
                }`}
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AISettingsModal;
