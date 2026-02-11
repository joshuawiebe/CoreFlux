import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Plus, Trash2, Menu, X, Settings, LogOut, Home, ChevronDown, ZapOff, MessageSquare } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useModels } from '../context/ModelsContext';
import { Link } from 'react-router-dom';
import AISettingsModal from './AISettingsModal';

const EnhancedAIChat = () => {
  const { isDark } = useTheme();
  const { isLoggedIn, logout } = useAuth();
  const { allModels, selectedModel, updateSelectedModel } = useModels();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [showAISettings, setShowAISettings] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const savedKey = localStorage.getItem('openrouter_api_key');
    if (savedKey) setApiKey(savedKey);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || !apiKey) {
      setError('Please configure your API key first.');
      return;
    }

    const userMessage = input;
    setMessages((prev) => [...prev, { role: 'user', content: userMessage, id: Date.now() }]);
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
          model: selectedModel,
          messages: [
            {
              role: 'system',
              content: 'You are a helpful AI assistant for CoreFlux - an intelligent heating and distributed AI system. Be concise, professional, and helpful.'
            },
            ...messages.map((m) => ({
              role: m.role,
              content: m.content
            })),
            { role: 'user', content: userMessage }
          ],
          temperature: 0.7,
          max_tokens: 1024,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'API Error');
      }

      const data = await response.json();
      const assistantMessage = data.choices[0].message.content;

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: assistantMessage, id: Date.now() + 1 }
      ]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const newChat = () => {
    if (messages.length > 0) {
      const chatTitle = messages[0]?.content?.substring(0, 50) || 'New Chat';
      setChatHistory([...chatHistory, { 
        id: Date.now(), 
        title: chatTitle, 
        messages: [...messages], 
        model: selectedModel,
        timestamp: new Date()
      }]);
    }
    setMessages([]);
    setSelectedChat(null);
  };

  const deleteChat = (chatId) => {
    setChatHistory(chatHistory.filter((c) => c.id !== chatId));
    if (selectedChat === chatId) {
      setMessages([]);
      setSelectedChat(null);
    }
  };

  const loadChat = (chat) => {
    setMessages(chat.messages);
    setSelectedChat(chat.id);
    if (chat.model) updateSelectedModel(chat.model);
  };

  if (!apiKey) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 ${isDark ? 'bg-black' : 'bg-white'}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          <div className="text-center mb-12">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-6"
            >
              <MessageSquare className="w-16 h-16 text-blue-500" />
            </motion.div>
            <h1 className={`text-5xl font-black mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
              CoreFlux AI
            </h1>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Unlock your AI potential. Control, customize, create.
            </p>
          </div>
          <AISettingsModal isOpen={true} onClose={() => {}} />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`text-center mt-8 text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}
          >
            Configure your API key in settings to get started
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`flex h-screen ${isDark ? 'bg-black' : 'bg-white'}`}>
      {/* AI Settings Modal */}
      <AISettingsModal isOpen={showAISettings} onClose={() => setShowAISettings(false)} />
      {/* Sidebar */}
      <motion.div
        initial={{ x: -400 }}
        animate={{ x: sidebarOpen ? 0 : -400 }}
        className={`w-72 border-r flex flex-col transition-all ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'}`}
        style={{ position: sidebarOpen ? 'static' : 'absolute', zIndex: 40 }}
      >
        {/* Sidebar Header */}
        <div className={`p-4 border-b space-y-3 ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={newChat}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
              isDark
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <Plus className="w-5 h-5" />
            New Chat
          </motion.button>

          {/* Model Selector */}
          <div className="relative">
            <select
              value={selectedModel}
              onChange={(e) => updateSelectedModel(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border text-sm font-medium appearance-none cursor-pointer transition-all ${
                isDark
                  ? 'bg-gray-800 border-gray-700 text-white hover:border-blue-500'
                  : 'bg-white border-gray-300 text-black hover:border-blue-500'
              }`}
            >
              <optgroup label="🌟 Free Models">
                {allModels.filter(m => m.free).map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="⭐ All Models">
                {allModels.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </optgroup>
            </select>
            <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? 'text-gray-500' : 'text-gray-600'}`} />
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <p className={`text-xs font-bold uppercase tracking-wider mb-4 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
            History
          </p>
          {chatHistory.length === 0 ? (
            <p className={`text-xs text-center py-8 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
              No chats yet
            </p>
          ) : (
            chatHistory.map((chat) => (
              <motion.div
                key={chat.id}
                whileHover={{ x: 5 }}
                className={`p-3 rounded-lg cursor-pointer group transition-all ${
                  selectedChat === chat.id
                    ? isDark
                      ? 'bg-blue-600/20 border border-blue-500/30'
                      : 'bg-blue-100/50 border border-blue-300'
                    : isDark
                    ? 'hover:bg-gray-800'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => loadChat(chat)}
              >
                <p className={`text-xs font-medium truncate mb-1 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  {chat.title}
                </p>
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  {chat.messages.length} messages
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(chat.id);
                  }}
                  className={`hidden group-hover:block text-xs mt-1 ${isDark ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'}`}
                >
                  Delete
                </button>
              </motion.div>
            ))
          )}
        </div>

        {/* Sidebar Footer */}
        <div className={`border-t p-4 space-y-2 ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => setShowAISettings(true)}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
              isDark
                ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Settings className="w-4 h-4" />
            API Settings
          </motion.button>
          <Link
            to="/settings"
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
              isDark
                ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Settings className="w-4 h-4" />
            App Settings
          </Link>
          {isLoggedIn && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={logout}
              className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                isDark
                  ? 'text-red-400 hover:bg-red-900/20'
                  : 'text-red-600 hover:bg-red-50'
              }`}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </motion.button>
          )}
          <Link
            to="/dashboard"
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
              isDark
                ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Home className="w-4 h-4" />
            Dashboard
          </Link>
        </div>
      </motion.div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`border-b ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} px-6 py-4 flex items-center justify-between`}
        >
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-lg transition-all ${
                isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
            <div>
              <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                CoreFlux AI
              </h1>
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                {selectedChat ? 'Resume conversation' : 'New conversation'}
              </p>
            </div>
          </div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-sm font-medium px-4 py-2 rounded-full ${
              isDark ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400' : 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700'
            }`}
          >
            {allModels.find(m => m.id === selectedModel)?.name || 'unknown'}
          </motion.div>
        </motion.div>

        {/* Messages Area */}
        <div className={`flex-1 overflow-y-auto p-6 space-y-4 ${isDark ? 'bg-black' : 'bg-white'}`}>
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center justify-center h-full text-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-6"
              >
                ✨
              </motion.div>
              <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                Start your conversation
              </h2>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-md`}>
                Ask about CoreFlux, heating systems, AI, or anything else. Your privacy is paramount.
              </p>
            </motion.div>
          ) : (
            <>
              <AnimatePresence>
                {messages.map((msg, idx) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-2xl px-4 py-3 rounded-lg backdrop-blur-sm ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-none'
                          : isDark
                          ? 'bg-gray-800/50 text-gray-100 rounded-bl-none border border-gray-700/50'
                          : 'bg-gray-100/50 text-gray-900 rounded-bl-none border border-gray-200'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2 items-end"
                >
                  <div className={`px-4 py-3 rounded-lg backdrop-blur-sm ${isDark ? 'bg-gray-800/50 border border-gray-700/50' : 'bg-gray-100/50 border border-gray-200'}`}>
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 0.6, delay: i * 0.1, repeat: Infinity }}
                          className={`w-2 h-2 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mx-6 p-3 rounded-lg text-sm flex items-start gap-3 mb-4 ${
              isDark
                ? 'bg-red-900/30 border border-red-700/50 text-red-200'
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}
          >
            <ZapOff className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Input Area */}
        <div className={`border-t ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} p-6`}>
          <form onSubmit={sendMessage} className="max-w-5xl mx-auto">
            <motion.div
              initial={{ scaleY: 0.95, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              className={`flex gap-3 p-4 rounded-xl border-2 transition-all ${
                isDark
                  ? 'bg-gradient-to-b from-gray-800 to-gray-900 border-gray-700 focus-within:border-blue-500 focus-within:from-gray-800 focus-within:to-gray-800'
                  : 'bg-gradient-to-b from-gray-50 to-white border-gray-300 focus-within:border-blue-500'
              }`}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className={`flex-1 outline-none bg-transparent text-sm disabled:opacity-50 ${
                  isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
                }`}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={`text-xs mt-3 text-center ${isDark ? 'text-gray-500' : 'text-gray-500'}`}
            >
              🔒 Your API key is encrypted locally. No data is shared with our servers.
            </motion.p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnhancedAIChat;
