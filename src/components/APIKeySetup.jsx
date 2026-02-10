import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Copy, Check, Lock, Eye, EyeOff } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const APIKeySetup = ({ onApiKeySet }) => {
  const { isDark } = useTheme();
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Load API key from localStorage on mount
    const savedKey = localStorage.getItem('openrouter_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setIsSaved(true);
      onApiKeySet(savedKey);
    }
  }, [onApiKeySet]);

  const handleSave = () => {
    if (!apiKey.trim()) return;
    localStorage.setItem('openrouter_api_key', apiKey);
    setIsSaved(true);
    onApiKeySet(apiKey);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setApiKey('');
    localStorage.removeItem('openrouter_api_key');
    setIsSaved(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border-2 p-6 md:p-8 ${
        isDark
          ? 'bg-slate-800 border-slate-700'
          : 'bg-white border-slate-200'
      }`}
    >
      <div className="flex items-start gap-4 mb-6">
        <Lock className="w-6 h-6 text-brand-primary flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            OpenRouter API Key Setup
          </h3>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Your API key is stored securely in your browser. Never shared with our servers.
          </p>
        </div>
      </div>

      {!isSaved ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`p-4 rounded-lg mb-6 border flex gap-3 ${
            isDark
              ? 'bg-amber-500/10 border-amber-500/30'
              : 'bg-amber-50 border-amber-200'
          }`}
        >
          <AlertCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
          <div className={`text-sm ${isDark ? 'text-amber-200' : 'text-amber-900'}`}>
            No API key set. Please enter your OpenRouter API key to use the AI chat.
            <br />
            <a
              href="https://openrouter.ai/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline hover:opacity-80"
            >
              Get your free key here
            </a>
          </div>
        </motion.div>
      ) : null}

      <div className="space-y-4">
        <div>
          <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            API Key
          </label>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-or-..."
                className={`w-full px-4 py-3 rounded-lg border outline-none transition-all font-mono text-sm ${
                  isDark
                    ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-500'
                    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                }`}
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded transition-colors ${
                  isDark ? 'hover:bg-slate-600' : 'hover:bg-slate-200'
                }`}
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {apiKey && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopy}
                className={`p-3 rounded-lg transition-colors ${
                  isDark
                    ? 'bg-slate-700 hover:bg-slate-600'
                    : 'bg-slate-100 hover:bg-slate-200'
                }`}
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </motion.button>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          {!isSaved ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              disabled={!apiKey.trim()}
              className="flex-1 px-4 py-3 rounded-lg font-bold bg-brand-primary text-white hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save API Key
            </motion.button>
          ) : (
            <>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setApiKey('')}
                className="flex-1 px-4 py-3 rounded-lg font-bold border-2 border-brand-primary text-brand-primary hover:bg-blue-50 dark:hover:bg-slate-700 transition-all"
              >
                Update Key
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClear}
                className={`flex-1 px-4 py-3 rounded-lg font-bold transition-all ${
                  isDark
                    ? 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                    : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                }`}
              >
                Clear
              </motion.button>
            </>
          )}
        </div>

        {isSaved && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-3 rounded-lg border flex gap-2 ${
              isDark
                ? 'bg-green-500/10 border-green-500/30'
                : 'bg-green-50 border-green-200'
            }`}
          >
            <Check className={`w-5 h-5 flex-shrink-0 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
            <span className={`text-sm font-medium ${isDark ? 'text-green-200' : 'text-green-700'}`}>
              API key saved securely ✓
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default APIKeySetup;
