import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const EmbeddedAIChat = () => {
  const { isDark } = useTheme();
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);

  // Translations for demo questions and jokes
  const jokes = {
    de: [
      '🤖 Warum wurde die KI zum Heizungstechniker? Weil sie die besten Lösungen für heiße Themen findet!',
      '☀️ Was sagten zwei Heizungen zueinander? "Ist mir heute eine Last auf dem Herzen!" - "Na ja, du wärmst mir immerhin die Seele auf!"',
      '💡 Warum mögen KIs Heizungen? Weil sie beide denken können!',
      '🔥 Kennst du die neuste Erfindung? Eine Heizung, die denkt! Das ist ja wirklich revolutionär!',
      '🌡️ Was ist der Unterschied zwischen einer Heizung und einer KI? Die Heizung wird warm, die KI wird schlauer!',
      '💨 Warum kann die CoreFlux AI nicht singen? Weil sie nur heiße Tips geben kann!',
    ],
    en: [
      '🤖 Why did the AI become a heating technician? Because it finds the best solutions for heated topics!',
      '☀️ What did two heating systems say to each other? "Is it heavy on my heart today!" - "Well, at least you warm my soul!"',
      '💡 Why do AIs like heating systems? Because they both can think!',
      '🔥 Do you know the latest invention? A heating system that thinks! That\'s really revolutionary!',
      '🌡️ What\'s the difference between a heating system and an AI? The heating gets warm, the AI gets smarter!',
      '💨 Why can\'t the CoreFlux AI sing? Because it can only give hot tips!',
    ],
    es: [
      '🤖 ¿Por qué la IA se convirtió en técnico de calefacción? ¡Porque encuentra las mejores soluciones para temas candentes!',
      '☀️ ¿Qué se dijeron dos sistemas de calefacción? "¡Hoy me pesa el corazón!" - "Bueno, ¡al menos te calienta el alma!"',
      '💡 ¿Por qué les encantan a los IAs los sistemas de calefacción? ¡Porque ambos pueden pensar!',
      '🔥 ¿Conoces el último invento? ¡Un sistema de calefacción que piensa! ¡Eso es realmente revolucionario!',
      '🌡️ ¿Cuál es la diferencia entre un sistema de calefacción y una IA? ¡La calefacción se calienta, la IA se vuelve más inteligente!',
      '💨 ¿Por qué no puede cantar la IA de CoreFlux? ¡Porque solo puede dar consejos candentes!',
    ],
    fr: [
      '🤖 Pourquoi l\'IA est-elle devenue technicien de chauffage? Parce qu\'elle trouve les meilleures solutions pour des sujets brûlants!',
      '☀️ Que se sont dit deux systèmes de chauffage? "C\'est lourd sur mon cœur aujourd\'hui!" - "Eh bien, tu me réchauffe au moins l\'âme!"',
      '💡 Pourquoi les IA aiment-elles les systèmes de chauffage? Parce que les deux peuvent penser!',
      '🔥 Connaissez-vous la dernière invention? Un système de chauffage qui pense! C\'est vraiment révolutionnaire!',
      '🌡️ Quelle est la différence entre un système de chauffage et une IA? Le chauffage se réchauffe, l\'IA devient plus intelligente!',
      '💨 Pourquoi l\'IA CoreFlux ne peut-elle pas chanter? Parce qu\'elle ne peut que donner des conseils brûlants!',
    ],
  };

  const demoQuestions = {
    de: [
      { q: 'Was ist CoreFlux?', a: '🔥 CoreFlux kombiniert intelligente Heizung mit KI-Services. Du sparst Heizkosten und wir nutzen deine Abwärme für sichere deutsche KI-Infrastruktur!' },
      { q: 'Wie viel kann ich sparen?', a: '💰 Nutzer sparen typischerweise €50-400 monatlich auf Heizkosten. Plus 50% Rabatt auf KI-Services beim Geräte-Paket!' },
      { q: 'Ist meine Daten sicher?', a: '🔐 100% sicher! Alle Daten sind vollständig verschlüsselt auf Geräten in Deutschland. Wir nutzen die Geräte nur zur Berechnung, nicht zur Speicherung!' },
      { q: 'Was kostet die Installation?', a: '💡 Installation kostet wie bei anderen Anbietern. Dafür spart du langfristig Heizkosten und profitierst von unserem KI-Angebot!' },
    ],
    en: [
      { q: 'What is CoreFlux?', a: '🔥 CoreFlux combines smart heating with AI services. You save on heating costs and we use your waste heat for secure German AI infrastructure!' },
      { q: 'How much can I save?', a: '💰 Users typically save €50-400 monthly on heating. Plus 50% discount on AI services with the device package!' },
      { q: 'Is my data safe?', a: '🔐 100% safe! All data is fully encrypted on German devices. We only use devices for computation, not storage!' },
      { q: 'How much does installation cost?', a: '💡 Installation costs like other providers. In return, you\'ll save on heating long-term and benefit from our AI offering!' },
    ],
    es: [
      { q: '¿Qué es CoreFlux?', a: '🔥 ¡CoreFlux combina calefacción inteligente con servicios de IA! Ahorras en costos de calefacción y utilizamos tu calor residual para infraestructura segura de IA alemana.' },
      { q: '¿Cuánto puedo ahorrar?', a: '💰 Los usuarios ahorran típicamente €50-400 mensuales en calefacción. ¡Más 50% de descuento en servicios de IA con el paquete de dispositivos!' },
      { q: '¿Están seguros mis datos?', a: '🔐 ¡100% seguros! Todos los datos están completamente encriptados en dispositivos alemanes. ¡Solo usamos dispositivos para cálculo, no para almacenamiento!' },
      { q: '¿Cuánto cuesta la instalación?', a: '💡 La instalación cuesta como otros proveedores. ¡A cambio, ahorrarás en calefacción a largo plazo y te beneficiarás de nuestra oferta de IA!' },
    ],
    fr: [
      { q: 'Qu\'est-ce que CoreFlux?', a: '🔥 CoreFlux combine le chauffage intelligent avec les services d\'IA. Vous économisez sur les coûts de chauffage et nous utilisons votre chaleur résiduelle pour l\'infrastructure sécurisée de l\'IA allemande!' },
      { q: 'Combien puis-je économiser?', a: '💰 Les utilisateurs économisent généralement €50-400 mensuellement sur le chauffage. Plus 50% de réduction sur les services d\'IA avec le forfait d\'appareil!' },
      { q: 'Mes données sont-elles sûres?', a: '🔐 100% sûr! Toutes les données sont entièrement cryptées sur les appareils allemands. Nous n\'utilisons les appareils que pour le calcul, pas pour le stockage!' },
      { q: 'Combien coûte l\'installation?', a: '💡 L\'installation coûte comme les autres fournisseurs. En échange, vous économiserez sur le chauffage à long terme et bénéficierez de notre offre d\'IA!' },
    ],
  };

  const currentQuestions = demoQuestions[i18n.language] || demoQuestions.en;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: text,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setShowSuggestions(false);
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Find matching demo answer
    const demo = currentQuestions.find(
      (q) => q.q.toLowerCase().includes(text.toLowerCase().split(' ')[0]) ||
             text.toLowerCase().includes(q.q.toLowerCase().split(' ')[0])
    );

    const response = demo
      ? demo.a
      : jokes[i18n.language]?.[Math.floor(Math.random() * jokes[i18n.language].length)] ||
        jokes.en[Math.floor(Math.random() * jokes.en.length)];

    const assistantMessage = {
      id: messages.length + 2,
      type: 'assistant',
      text: response,
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  return (
    <div className={`rounded-2xl border-2 border-brand-primary overflow-hidden ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`} style={{ maxHeight: '600px' }}>
      {/* Header */}
      <div className={`p-4 border-b flex items-center gap-3 ${isDark ? 'bg-brand-primary/20 border-slate-700' : 'bg-blue-50 border-slate-200'}`}>
        <Sparkles className="w-5 h-5 text-brand-primary" />
        <div>
          <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            CoreFlux AI Assistant
          </h3>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Ask anything about heating & AI
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className={`overflow-y-auto p-4 space-y-3 flex-1`} style={{ maxHeight: '400px' }}>
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <Sparkles className="w-12 h-12 text-brand-primary/30 mx-auto mb-3" />
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Ask me anything about CoreFlux! ✨
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                  message.type === 'user'
                    ? 'bg-brand-primary text-white rounded-br-none'
                    : isDark
                    ? 'bg-slate-700 text-slate-100 rounded-bl-none'
                    : 'bg-slate-100 text-slate-900 rounded-bl-none'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className={`px-4 py-2 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-brand-primary animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-brand-primary animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 rounded-full bg-brand-primary animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {showSuggestions && messages.length === 0 && (
        <div className={`p-4 border-t space-y-2 bg-opacity-50 ${isDark ? 'bg-slate-700 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
          {currentQuestions.map((qa, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(qa.q)}
              className={`w-full text-left text-xs p-2 rounded transition-all ${
                isDark
                  ? 'hover:bg-slate-600 text-slate-300'
                  : 'hover:bg-slate-200 text-slate-700'
              }`}
            >
              💬 {qa.q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className={`p-4 border-t flex gap-2 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(input)}
          onFocus={() => setShowSuggestions(messages.length === 0)}
          placeholder="Ask anything..."
          disabled={isLoading}
          className={`flex-1 px-3 py-2 rounded-lg border text-sm outline-none transition-all ${
            isDark
              ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-500 focus:border-brand-primary'
              : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-brand-primary'
          }`}
        />
        <button
          onClick={() => handleSendMessage(input)}
          disabled={isLoading || !input.trim()}
          className="px-3 py-2 rounded-lg bg-brand-primary text-white hover:bg-blue-700 disabled:opacity-50 transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default EmbeddedAIChat;
