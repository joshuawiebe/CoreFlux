import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Plus, Trash2, Menu, X, Settings, LogOut, Home } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import APIKeySetup from './APIKeySetup';

const ProfessionalAIApp = () => {
  const { isDark } = useTheme();
  const { isLoggedIn, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [model, setModel] = useState('gpt-3.5-turbo');
  const messagesEndRef = useRef(null);

  const models = [
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI' },
    { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI' },
    { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'Anthropic' },
    { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', provider: 'Anthropic' },
    { id: 'mistral-7b-instruct', name: 'Mistral 7B', provider: 'Mistral' },
  ];

  useEffect(() => {
    const savedKey = localStorage.getItem('openrouter_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    }
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
          model: model,
          messages: [
            {
              role: 'system',
              content: 'You are a helpful AI assistant for CoreFlux, a smart heating and distributed AI system. Be concise, professional, and helpful.'
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
      setChatHistory([...chatHistory, { id: Date.now(), title: chatTitle, messages: [...messages] }]);
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
  };

  if (!apiKey) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 ${
        isDark ? 'bg-gray-950' : 'bg-white'
      }`}>
        <div className="w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className={`text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              CoreFlux AI
            </h1>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Professional AI Assistant. Your API key, your privacy, your control.
            </p>
          </motion.div>
          <APIKeySetup onApiKeySet={setApiKey} />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex h-screen ${isDark ? 'bg-gray-950' : 'bg-white'}`}>
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        className={`w-64 border-r ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'} flex flex-col transition-all duration-300`}
        style={{ position: sidebarOpen ? 'static' : 'absolute', zIndex: 50 }}
      >
        {/* Sidebar Header */}
        <div className={`p-4 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={newChat}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
              isDark
                ? 'bg-gray-800 hover:bg-gray-700 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
            }`}
          >
            <Plus className="w-5 h-5" />
            New Chat
          </motion.button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {chatHistory.length === 0 ? (
            <p className={`text-sm text-center py-8 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              No chat history yet
            </p>
          ) : (
            chatHistory.map((chat) => (
              <motion.div
                key={chat.id}
                whileHover={{ x: 5 }}
                className={`p-3 rounded-lg cursor-pointer group transition-all ${
                  selectedChat === chat.id
                    ? isDark
                      ? 'bg-gray-700'
                      : 'bg-gray-200'
                    : isDark
                    ? 'hover:bg-gray-800'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => loadChat(chat)}
              >
                <p className={`text-sm truncate font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  {chat.title}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(chat.id);
                  }}
                  className={`hidden group-hover:block text-xs mt-1 ${isDark ? 'text-gray-500 hover:text-red-400' : 'text-gray-400 hover:text-red-600'}`}
                >
                  Delete
                </button>
              </motion.div>
            ))
          )}
        </div>

        {/* Sidebar Footer */}
        <div className={`border-t p-4 space-y-2 ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <Link
            to="/settings"
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              isDark
                ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span className="text-sm">Settings</span>
          </Link>
          {isLoggedIn && (
            <button
              onClick={logout}
              className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isDark
                  ? 'text-red-400 hover:bg-red-900/20'
                  : 'text-red-600 hover:bg-red-50'
              }`}
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Logout</span>
            </button>
          )}
          <Link
            to="/"
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              isDark
                ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="text-sm">Home</span>
          </Link>
        </div>
      </motion.div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className={`border-b ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} px-6 py-4 flex items-center justify-between`}>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-lg transition-all ${
                isDark
                  ? 'hover:bg-gray-800'
                  : 'hover:bg-gray-100'
              }`}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div>
              <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                CoreFlux AI
              </h1>
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                {selectedChat ? 'Resume chat' : 'New conversation'}
              </p>
            </div>
          </div>

          {/* Model Selector */}
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className={`px-4 py-2 rounded-lg border font-medium text-sm transition-all ${
              isDark
                ? 'bg-gray-800 border-gray-700 text-white hover:border-gray-600'
                : 'bg-white border-gray-300 text-gray-900 hover:border-gray-400'
            }`}
          >
            {models.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        {/* Messages Area */}
        <div className={`flex-1 overflow-y-auto p-6 space-y-4 ${isDark ? 'bg-gray-950' : 'bg-white'}`}>
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full text-center"
            >
              <div className={`text-6xl mb-6 opacity-20`}>✨</div>
              <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Start a Conversation
              </h2>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-md`}>
                Ask anything about CoreFlux, AI, heating systems, or any topic. Your API key ensures complete privacy.
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
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-2xl px-4 py-3 rounded-lg ${
                        msg.role === 'user'
                          ? isDark
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : 'bg-blue-600 text-white rounded-br-none'
                          : isDark
                          ? 'bg-gray-800 text-gray-100 rounded-bl-none'
                          : 'bg-gray-100 text-gray-900 rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 items-end"
                >
                  <div className={`px-4 py-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 0.6, delay: i * 0.1, repeat: Infinity }}
                          className={`w-2 h-2 rounded-full ${isDark ? 'bg-gray-500' : 'bg-gray-400'}`}
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
            className={`mx-6 p-3 rounded-lg text-sm ${
              isDark
                ? 'bg-red-900/30 border border-red-700/50 text-red-200'
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}
          >
            {error}
          </motion.div>
        )}

        {/* Input Area */}
        <div className={`border-t ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} p-6`}>
          <form onSubmit={sendMessage} className="max-w-5xl mx-auto">
            <div className={`flex gap-3 p-4 rounded-xl border-2 transition-all ${
              isDark
                ? 'bg-gray-800 border-gray-700 focus-within:border-blue-500'
                : 'bg-gray-50 border-gray-300 focus-within:border-blue-500'
            }`}>
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
                className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
            <p className={`text-xs mt-3 text-center ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              Your API key is stored locally. All conversations are private.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalAIApp;
