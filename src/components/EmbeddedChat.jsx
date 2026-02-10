import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const EmbeddedChat = () => {
  const { isDark } = useTheme();
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [showChatSuggestions, setShowChatSuggestions] = useState(true);

  const sampleQuestions = [
    { q: '💰 How much can I save?', a: 'Users typically save €50-400/month on heating costs. Plus, you get 50% off AI services!' },
    { q: '🔐 Is my data secure?', a: '100% secure! All data is encrypted with military-grade standards and stored only in Germany. GDPR compliant.' },
    { q: '⚡ What is CoreFlux?', a: 'CoreFlux combines a smart heating system with distributed AI computing. Your heat powers German AI infrastructure!' },
    { q: '✓ Do I own the device?', a: 'Yes! After 3-5 years, the device is completely yours. You keep enjoying 50% AI discounts for life!' },
  ];

  const handleChatQuestion = (answer) => {
    setChatMessages([...chatMessages, { type: 'assistant', text: answer }]);
    setChatInput('');
    setShowChatSuggestions(false);
  };

  return (
    <section id="chat-section" className={`py-24 ${isDark ? 'bg-slate-950' : 'bg-white'} overflow-hidden relative border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}> <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`text-sm font-black text-brand-primary uppercase tracking-[0.3em] mb-4`}>
            Chat
          </h2>
          <h3 className={`text-4xl md:text-6xl font-black leading-tight tracking-tighter mb-4 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Ask Our AI
          </h3>
          <p className={`text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Questions about CoreFlux? Chat with our AI instantly.
          </p>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`max-w-3xl mx-auto rounded-2xl border-2 overflow-hidden ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          {/* Messages Area */}
          <div className={`h-96 overflow-y-auto p-6 space-y-4 ${isDark ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
            {chatMessages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Zap className="w-12 h-12 text-brand-primary mx-auto mb-4 opacity-50" />
                <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                  Click a question below to get started
                </p>
              </motion.div>
            ) : (
              chatMessages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.type === 'user'
                        ? 'bg-brand-primary text-white rounded-br-none'
                        : isDark
                        ? 'bg-slate-700 text-slate-100 rounded-bl-none'
                        : 'bg-slate-200 text-slate-900 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Input Area */}
          <div className={`p-6 border-t ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            {showChatSuggestions ? (
              <div className="space-y-2">
                <p className={`text-xs font-black uppercase tracking-wider mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Common Questions:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {sampleQuestions.map((qa, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => handleChatQuestion(qa.a)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-3 rounded-lg text-left text-xs font-bold uppercase tracking-wider transition-all ${
                        isDark
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                      }`}
                    >
                      {qa.q}
                    </motion.button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask anything..."
                  className={`flex-1 px-4 py-2 rounded-lg border outline-none transition-all text-sm ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                  }`}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-brand-primary text-white rounded-lg font-black uppercase tracking-wider transition-all"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EmbeddedChat;
