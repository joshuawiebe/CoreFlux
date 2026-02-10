import React, { useState, useEffect, useRef } from 'react';
import { Send, Plus, Zap, Trash2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const AIChat = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      text: t('aiChat.welcome') || '🤖 Hallo! Ich bin CoreFlux AI. Wie kann ich dir heute helfen?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState([
    { id: 1, title: t('aiChat.conversation') || 'Heating Optimization', active: true },
  ]);
  const messagesEndRef = useRef(null);

  // Demo questions and responses
  const demoQA = [
    {
      q: 'How can I optimize my heating system?',
      a: '💡 Based on your data, I recommend using thermostat optimization. You could save €80-180/month!',
      keywords: ['optimize', 'heating', 'saves', 'energy'],
    },
    {
      q: 'What is CoreFlux?',
      a: '⚡ CoreFlux combines smart heating with distributed AI computing. Your heat powers secure German AI infrastructure!',
      keywords: ['what', 'coreflux', 'concept', 'idea'],
    },
    {
      q: 'How much can I save?',
      a: '💰 Users typically save €50-400 per month on heating. Plus, get 50% off all AI services!',
      keywords: ['save', 'cost', 'money', 'price'],
    },
    {
      q: 'Is my data safe?',
      a: '🔐 100% encrypted with AES-256. All data stays in Germany. GDPR compliant. Zero third-party sharing.',
      keywords: ['secure', 'safe', 'private', 'encrypt', 'data'],
    },
    {
      q: 'Do I own the device?',
      a: '✓ After 3-5 years, it\'s completely yours! You keep getting 50% AI discounts for life.',
      keywords: ['own', 'device', 'ownership', 'yours'],
    },
  ];

  const jokes = {
    de: [
      '😄 Warum ging das Heizsystem zum Therapeuten? Es hatte zu viele Druckprobleme!',
      '🤖 Ein Rechenzentrum betritt eine Bar... Der Barkeeper fragt: "Was kann ich dir geben?" Es antwortet: "Nur etwas kühle Luft!"',
      '🌡️ Warum wird das Heizsystem nie einsam? Weil es immer in das verwickelt ist, was es tut!',
      '💻 Klopf Klopf! Wer ist da? Daten. Daten wer? Das ist der Spirit!',
      '🔥 Warum sind Heizungen wie Köche? Sie wissen, wie man die richtigen Temperatureinstellungen erreicht!',
    ],
    en: [
      '😄 Why did the heating system go to therapy? It had too many pressure issues!',
      '🤖 A data center walks into a bar... bartender asks: "What\'ll it be?" It says: "Just some cool air!"',
      '🌡️ Why don\'t heating systems ever get lonely? Because they\'re always wrapped up in what they do!',
      '💻 Knock knock! Who\'s there? Data. Data who? That\'s the spirit!',
      '🔥 What do you call a heating system that tells jokes? A warm comedian!',
    ],
    fr: [
      '😄 Pourquoi le système de chauffage est-il allé chez le thérapeute? Il avait trop de problèmes de pression!',
      '🤖 Un centre de données entre dans un bar... le barman demande: "Qu\'est-ce que ce sera?" Il répond: "Juste de l\'air frais!"',
      '🌡️ Pourquoi les systèmes de chauffage ne sont jamais seuls? Parce qu\'ils sont toujours absorbés dans ce qu\'ils font!',
      '💻 Toc toc! Qui est-ce? Les données. Les données qui? C\'est l\'esprit!',
      '🔥 Que dit un système de chauffage hilarant? "C\'est chaud!"',
    ],
    es: [
      '😄 ¿Por qué el sistema de calefacción fue al terapeuta? ¡Tenía demasiados problemas de presión!',
      '🤖 Un centro de datos entra a un bar... el barman pregunta: "¿Qué te traigo?" Responde: "Solo aire fresco"',
      '🌡️ ¿Por qué los sistemas de calefacción nunca están solos? ¡Porque siempre están absorbidos en lo que hacen!',
      '💻 ¡Toc toc! ¿Quién es? Datos. ¿Datos qué? ¡Ese es el espíritu!',
      '🔥 ¿Qué hace una calefacción que cuenta chistes? ¡Una comedia caliente!',
    ],
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Find matching demo answer by checking keywords
    let responseText = null;
    const lowerText = text.toLowerCase();
    
    for (const qa of demoQA) {
      if (qa.keywords.some(keyword => lowerText.includes(keyword))) {
        responseText = qa.a;
        break;
      }
    }

    // If no match found, tell a joke
    if (!responseText) {
      const jokesForLang = jokes[i18n.language] || jokes['en'];
      responseText = jokesForLang[Math.floor(Math.random() * jokesForLang.length)];
    }

    const assistantMessage = {
      id: messages.length + 2,
      type: 'assistant',
      text: responseText,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const newConversation = () => {
    setMessages([
      {
        id: 1,
        type: 'assistant',
        text: t('aiChat.welcome') || '🤖 Hello! I am CoreFlux AI. How can I help you today?',
        timestamp: new Date(),
      },
    ]);
    setConversations((prev) =>
      prev.map((c) => ({ ...c, active: false }))
    );
    setConversations((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title: `${t('aiChat.conversation') || 'Conversation'} ${prev.length + 1}`,
        active: true,
      },
    ]);
  };

  return (
    <motion.div
      className={`flex h-screen max-h-screen ${isDark ? 'bg-slate-900' : 'bg-white'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Sidebar */}
      <motion.div
        className={`w-64 border-r flex flex-col ${
          isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
        }`}
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="p-4 border-b">
          <motion.button
            onClick={newConversation}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              isDark
                ? 'bg-brand-primary text-white hover:bg-blue-700'
                : 'bg-brand-primary text-white hover:bg-blue-700'
            }`}
          >
            <Plus className="w-4 h-4" />
            New Chat
          </motion.button>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {conversations.map((conv, idx) => (
            <motion.div
              key={conv.id}
              className={`p-3 rounded-lg cursor-pointer transition-all truncate ${
                conv.active
                  ? 'bg-brand-primary text-white'
                  : isDark
                  ? 'hover:bg-slate-700 text-slate-300'
                  : 'hover:bg-slate-200 text-slate-700'
              }`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ x: 5 }}
            >
              <p className="text-sm font-medium truncate">{conv.title}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main Chat Area */}
      <motion.div
        className="flex-1 flex flex-col"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {/* Header */}
        <div
          className={`border-b ${
            isDark
              ? 'bg-slate-800 border-slate-700'
              : 'bg-white border-slate-200'
          } p-6`}
        >
          <motion.div className="flex items-center gap-3" initial={{ y: -10 }} animate={{ y: 0 }}>
            <motion.div
              className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Zap className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                CoreFlux AI
              </h2>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Your intelligent heating companion ⚡
              </p>
            </div>
          </motion.div>
        </div>

        {/* Messages */}
        <AnimatePresence>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <motion.div
                className="h-full flex items-center justify-center text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <div>
                  <motion.div
                    className="w-16 h-16 rounded-full bg-brand-primary/20 flex items-center justify-center mx-auto mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Zap className="w-8 h-8 text-brand-primary" />
                  </motion.div>
                  <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Welcome to CoreFlux AI
                  </h3>
                  <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Ask me anything about heating, savings, or CoreFlux!
                  </p>
                </div>
              </motion.div>
            ) : (
              messages.map((message, idx) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`flex ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-2xl px-4 py-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-brand-primary text-white rounded-br-none'
                        : isDark
                        ? 'bg-slate-700 text-slate-100 rounded-bl-none'
                        : 'bg-slate-100 text-slate-900 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </motion.div>
              ))
            )}
            {isLoading && (
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div
                  className={`px-4 py-3 rounded-lg ${
                    isDark
                      ? 'bg-slate-700 text-slate-100'
                      : 'bg-slate-100 text-slate-900'
                  }`}
                >
                  <div className="flex gap-2">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-current"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                    />
                    <motion.div
                      className="w-2 h-2 rounded-full bg-current"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                    />
                    <motion.div
                      className="w-2 h-2 rounded-full bg-current"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </AnimatePresence>

        {/* Demo Questions (if just started) */}
        <AnimatePresence>
          {messages.length === 1 && !isLoading && (
            <motion.div
              className="px-6 pb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <p className={`text-sm font-medium mb-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Try asking about:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {demoQA.map((qa, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => handleSendMessage(qa.q)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`p-3 rounded-lg text-left text-sm transition-all ${
                      isDark
                        ? 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {qa.q}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input */}
        <div
          className={`border-t ${
            isDark
              ? 'bg-slate-800 border-slate-700'
              : 'bg-white border-slate-200'
          } p-6`}
        >
          <div className="flex gap-3">
            <motion.input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage(input);
                }
              }}
              placeholder="Ask CoreFlux AI anything..."
              disabled={isLoading}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className={`flex-1 px-4 py-3 rounded-lg border outline-none transition-all ${
                isDark
                  ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-500 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20'
                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20'
              }`}
            />
            <motion.button
              onClick={() => handleSendMessage(input)}
              disabled={isLoading || !input.trim()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-3 rounded-lg bg-brand-primary text-white font-medium transition-all hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AIChat;
