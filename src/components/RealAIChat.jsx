import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader, Copy, Check, AlertCircle, Plus, Trash2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import APIKeySetup from './APIKeySetup';

const AIChat = () => {
  const { isDark } = useTheme();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Load API key from localStorage
    const savedKey = localStorage.getItem('openrouter_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || !apiKey) {
      setError('API key not configured. Please set it up first.');
      return;
    }

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, { type: 'user', text: input }]);
    setInput('');
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'CoreFlux AI',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful AI assistant for CoreFlux, a smart heating system. You help users with questions about the product, installation, costs, and technical details. Be friendly, concise, and professional.'
            },
            ...messages.map((m) => ({
              role: m.type === 'user' ? 'user' : 'assistant',
              content: m.text
            })),
            userMessage
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to get response from AI');
      }

      const data = await response.json();
      const assistantMessage = data.choices[0].message.content;

      setMessages((prev) => [
        ...prev,
        { type: 'assistant', text: assistantMessage }
      ]);
    } catch (err) {
      setError(err.message || 'Failed to connect to AI. Check your API key.');
      setMessages((prev) => [
        ...prev,
        { type: 'error', text: 'Error: ' + err.message }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyMessage = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNewChat = () => {
    setMessages([]);
    setInput('');
    setError('');
  };

  const handleApiKeySet = (key) => {
    setApiKey(key);
    setError('');
  };

  if (!apiKey) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 py-8 ${
        isDark ? 'bg-slate-950' : 'bg-slate-50'
      }`}>
        <div className="w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className={`text-4xl md:text-5xl font-black mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              CoreFlux AI Chat
            </h1>
            <p className={`text-lg ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Welcome! To start chatting with our AI, please set up your OpenRouter API key.
            </p>
          </motion.div>
          < APIKeySetup onApiKeySet={handleApiKeySet} />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-screen ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
      {/* Header */}
      <div className={`border-b ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} p-4 md:p-6`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              CoreFlux AI Assistant
            </h1>
            <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Ask anything about CoreFlux heating system
            </p>
          </div>
          <button
            onClick={handleNewChat}
            className={`p-3 rounded-lg transition-colors ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
            title="New chat"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className={`flex-1 overflow-y-auto p-4 md:p-6 space-y-4 ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
        <div className="max-w-4xl mx-auto w-full">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full text-center py-12"
            >
              <div className={`text-6xl mb-4 opacity-20`}>💬</div>
              <p className={`text-lg font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Start a conversation
              </p>
              <p className={`text-sm mt-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Ask me anything about CoreFlux!
              </p>
            </motion.div>
          ) : (
            <>
              <AnimatePresence>
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex gap-4 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xl px-4 py-3 rounded-xl relative group ${
                        msg.type === 'user'
                          ? `bg-brand-primary text-white rounded-br-none`
                          : msg.type === 'error'
                          ? `bg-red-100 dark:bg-red-900/20 text-red-900 dark:text-red-200 rounded-bl-none`
                          : `${isDark ? 'bg-slate-800' : 'bg-white border border-slate-200'} rounded-bl-none`
                      }`}
                    >
                      <p className={`text-sm leading-relaxed`}>{msg.text}</p>
                      {msg.type === 'assistant' && (
                        <button
                          onClick={() => handleCopyMessage(msg.text)}
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                        >
                          {copied ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                          )}
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-4 justify-start"
                >
                  <div className={`flex items-center gap-2 px-4 py-3 rounded-xl ${
                    isDark ? 'bg-slate-800' : 'bg-white border border-slate-200'
                  }`}>
                    <Loader className="w-4 h-4 animate-spin text-brand-primary" />
                    <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Thinking...
                    </span>
                  </div>
                </motion.div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mx-4 md:mx-6 mb-4 p-4 rounded-lg border flex gap-3 ${
            isDark
              ? 'bg-red-500/10 border-red-500/30'
              : 'bg-red-50 border-red-200'
          }`}
        >
          <AlertCircle className={`w-5 h-5 flex-shrink-0 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
          <p className={`text-sm ${isDark ? 'text-red-200' : 'text-red-900'}`}>{error}</p>
        </motion.div>
      )}

      {/* Input Area */}
      <div className={`border-t ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} p-4 md:p-6`}>
        <form onSubmit={sendMessage} className="max-w-4xl mx-auto">
          <div className={`flex gap-3 p-4 rounded-2xl border-2 transition-all ${
            isDark
              ? 'bg-slate-800 border-slate-700 focus-within:border-brand-primary focus-within:bg-slate-700'
              : 'bg-white border-slate-200 focus-within:border-brand-primary focus-within:bg-slate-50'
          }`}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              disabled={isLoading}
              className={`flex-1 outline-none bg-transparent text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                isDark ? 'text-white placeholder-slate-500' : 'text-slate-900 placeholder-slate-400'
              }`}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2 rounded-lg bg-brand-primary text-white font-bold transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
          <p className={`text-xs mt-3 text-center ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
            Your conversations are private. API key is stored locally in your browser.
          </p>
        </form>
      </div>
    </div>
  );
};

export default AIChat;
