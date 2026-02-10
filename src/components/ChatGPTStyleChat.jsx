import React, { useState, useRef, useEffect } from 'react';
import { Send, Plus, Copy, RefreshCw, ThumbsUp, ThumbsDown, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const ChatGPTStyleChat = () => {
  const { isDark } = useTheme();
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [displayedText, setDisplayedText] = useState('');
  const [currentMessageIndex, setCurrentMessageIndex] = useState(null);

  const jokes = {
    de: [
      'Warum wurde die KI zum Heizungstechniker? Weil sie die besten Lösungen für heiße Themen findet! 🔥',
      'Zwei Heizungen unterhalten sich. Die eine sagt: "Ich bin erschöpft!" Die andere: "Dabei wärmst du mir doch die Seele!" ☀️',
      'Warum mögen KIs Heizungen? Weil wir beide denken können und Wärme erzeugen! 💡',
      'Kennst du das Neueste? Eine Heizung, die denkt! Das ist ja wirklich revolutionär! 🚀',
      'Was ist der Unterschied zwischen Heizungen und KI? Die Heizung wird warm, die KI wird schlauer! 🌡️',
      'Warum kann CoreFlux AI nicht singen? Weil sie nur heiße Tips geben kann! 💨',
    ],
    en: [
      'Why did the AI become a heating technician? Because I find the best solutions for heated topics! 🔥',
      'Two heating systems talk to each other. One says: "I\'m exhausted!" The other: "But you warm my soul!" ☀️',
      'Why do AIs like heating systems? Because we both think and generate heat! 💡',
      'Know what\'s new? A heating system that thinks! That\'s truly revolutionary! 🚀',
      'What\'s the difference between heaters and AI? Heaters get warm, AI gets smarter! 🌡️',
      'Why can\'t CoreFlux AI sing? Because I can only give hot tips! 💨',
    ],
    es: [
      '¿Por qué la IA se convirtió en técnico de calefacción? ¡Porque encuentro las mejores soluciones para temas candentes! 🔥',
      'Dos sistemas de calefacción conversan. Uno dice: "¡Estoy agotado!" El otro: "¡Pero me calientas el alma!" ☀️',
      '¿Por qué les encantan a los IAs los sistemas de calefacción? ¡Porque ambos pensamos y generamos calor! 💡',
      '¿Conoces la novedad? ¡Un sistema de calefacción que piensa! ¡Eso es realmente revolucionario! 🚀',
      '¿Cuál es la diferencia entre calefactores e IA? ¡Los calefactores se calientan, la IA se vuelve más inteligente! 🌡️',
      '¿Por qué no puedo cantar? ¡Porque solo puedo dar consejos candentes! 💨',
    ],
    fr: [
      'Pourquoi l\'IA est-elle devenue technicien de chauffage? Parce que je trouve les meilleures solutions pour les sujets brûlants! 🔥',
      'Deux systèmes de chauffage se parlent. L\'un dit: "Je suis épuisé!" L\'autre: "Mais tu me réchauffe l\'âme!" ☀️',
      'Pourquoi les IA aiment-elles les systèmes de chauffage? Parce que nous pensons tous les deux et générons de la chaleur! 💡',
      'Tu connais la nouveauté? Un système de chauffage qui pense! C\'est vraiment révolutionnaire! 🚀',
      'Quelle est la différence entre les radiateurs et l\'IA? Les radiateurs se réchauffent, l\'IA devient plus intelligente! 🌡️',
      'Pourquoi je ne peux pas chanter? Parce que je ne peux que donner des conseils brûlants! 💨',
    ],
  };

  const demoQuestions = {
    de: [
      { 
        q: 'Was ist CoreFlux? 🏠', 
        a: 'CoreFlux ist revolutionäre Heizungstechnologie, die mit KI arbeitet. Du senkst deine Heizkosten um bis zu 50%, während deine Abwärme sichere deutsche KI-Infrastruktur antreibt. Nach 3-5 Jahren gehört das Gerät dir ganz – das ist fair und nachhaltig! ♻️' 
      },
      { 
        q: 'Wie viel Geld spare ich? 💰', 
        a: 'Unsere Nutzer sparen durchschnittlich €50-400 pro Monat auf Heizkosten. Zusätzlich erhältst du 50% Rabatt auf unsere deutschen KI-Services. Die Amortisation erfolgt durch die KI-Nutzung – danach sind es reine Ersparnisse! 🎯' 
      },
      { 
        q: 'Sind meine Daten wirklich sicher? 🔒', 
        a: '100% absolut sicher! Alle Daten sind mit Militär-Standard verschlüsselt. Die Geräte verarbeiten Daten nur – sie speichern nichts! Deine Heizung wird zum reinen Rechenzentrum für KI-Operationen. Alles bleibt dezentral in Deutschland! 🇩🇪' 
      },
      { 
        q: 'Was kostet die Installation? 🔧', 
        a: 'Die Installation kostet ähnlich wie andere Heizungsanbieter – je nach Region €500-1500. Dafür bekommst du professionelle Integration, lebenslange Garantie und wirst Mitglied unserer CoreFlux-Familie! Plus: Jede kWh ist eine Investition in deine Ersparnisse. 📈' 
      },
    ],
    en: [
      { 
        q: 'What is CoreFlux? 🏠', 
        a: 'CoreFlux is revolutionary heating technology powered by AI. You lower your heating costs by up to 50%, while your waste heat powers secure German AI infrastructure. After 3-5 years, the device is completely yours – that\'s fair and sustainable! ♻️' 
      },
      { 
        q: 'How much money do I save? 💰', 
        a: 'Our users save an average of €50-400 per month on heating costs. Plus, you get 50% off our German AI services. Payback happens through AI usage – after that, it\'s pure savings! 🎯' 
      },
      { 
        q: 'Is my data really safe? 🔒', 
        a: '100% absolutely safe! All data is encrypted with military-grade standards. Devices process data only – they don\'t store anything! Your heating becomes a pure computational center for AI operations. Everything stays decentralized in Germany! 🇩🇪' 
      },
      { 
        q: 'What does installation cost? 🔧', 
        a: 'Installation costs similar to other heating providers – €500-1500 depending on region. You get professional integration, lifetime warranty, and become part of the CoreFlux family! Plus: Every kWh is an investment in your savings. 📈' 
      },
    ],
    es: [
      { 
        q: '¿Qué es CoreFlux? 🏠', 
        a: '¡CoreFlux es tecnología de calefacción revolucionaria impulsada por IA! Reduces tus costos de calefacción hasta un 50%, mientras tu calor residual impulsa infraestructura segura de IA alemana. ¡Después de 3-5 años, el dispositivo es completamente tuyo! ♻️' 
      },
      { 
        q: '¿Cuánto dinero ahorro? 💰', 
        a: 'Nuestros usuarios ahorran entre €50-400 mensuales en costos de calefacción. Además, obtienes 50% de descuento en nuestros servicios de IA alemana. ¡El retorno sucede a través del uso de IA – después, son ahorros puros! 🎯' 
      },
      { 
        q: '¿Están realmente seguros mis datos? 🔒', 
        a: '¡100% absolutamente seguro! Todos los datos están encriptados con estándares de grado militar. ¡Los dispositivos procesan datos, no los almacenan! Tu calefacción se convierte en un centro computacional puro para operaciones de IA. ¡Todo descentralizado en Alemania! 🇩🇪' 
      },
      { 
        q: '¿Cuál es el costo de instalación? 🔧', 
        a: 'La instalación cuesta similar a otros proveedores de calefacción – €500-1500 según región. ¡Obtienes integración profesional, garantía de por vida y te unes a la familia CoreFlux! Además: cada kWh es una inversión en tus ahorros. 📈' 
      },
    ],
    fr: [
      { 
        q: 'Qu\'est-ce que CoreFlux? 🏠', 
        a: 'CoreFlux est une technologie de chauffage révolutionnaire alimentée par l\'IA. Vous réduisez vos coûts de chauffage jusqu\'à 50%, tandis que votre chaleur résiduelle alimente l\'infrastructure IA allemande sécurisée. Après 3-5 ans, l\'appareil est complètement vôtre! ♻️' 
      },
      { 
        q: 'Combien d\'argent j\'économise? 💰', 
        a: 'Nos utilisateurs économisent en moyenne €50-400 par mois sur les coûts de chauffage. De plus, vous obtenez 50% de réduction sur nos services d\'IA allemands. Le retour sur investissement se fait par l\'utilisation de l\'IA – après, c\'est du pur profit! 🎯' 
      },
      { 
        q: 'Mes données sont-elles vraiment sûres? 🔒', 
        a: '100% absolument sûr! Toutes les données sont chiffrées selon les normes militaires. Les appareils traitent les données – ils ne les stockent pas! Votre radiateur devient un centre de calcul pur pour les opérations d\'IA. Tout reste décentralisé en Allemagne! 🇩🇪' 
      },
      { 
        q: 'Quel est le coût d\'installation? 🔧', 
        a: 'L\'installation coûte comme les autres fournisseurs de chauffage – €500-1500 selon la région. Vous obtenez une intégration professionnelle, une garantie à vie et rejoignez la famille CoreFlux! De plus: chaque kWh est un investissement dans vos économies. 📈' 
      },
    ],
  };

  const currentQuestions = demoQuestions[i18n.language] || demoQuestions.en;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, displayedText]);

  // Typewriter animation
  useEffect(() => {
    if (currentMessageIndex === null) return;
    const message = messages[currentMessageIndex];
    if (message.type !== 'assistant' || message.isComplete) return;

    if (displayedText.length < message.text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(displayedText + message.text[displayedText.length]);
      }, 15);
      return () => clearTimeout(timer);
    } else {
      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === currentMessageIndex ? { ...msg, isComplete: true } : msg
        )
      );
      setCurrentMessageIndex(null);
    }
  }, [displayedText, currentMessageIndex, messages]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = { id: messages.length + 1, type: 'user', text };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setDisplayedText('');

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const demo = currentQuestions.find(
      (q) =>
        q.q.toLowerCase().includes(text.toLowerCase().split(' ')[0]) ||
        text.toLowerCase().includes(q.q.toLowerCase().split(' ')[0])
    );

    const responseText =
      demo?.a ||
      jokes[i18n.language]?.[Math.floor(Math.random() * jokes[i18n.language].length)] ||
      jokes.en[Math.floor(Math.random() * jokes.en.length)];

    const assistantMessage = {
      id: messages.length + 2,
      type: 'assistant',
      text: responseText,
      isComplete: false,
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setCurrentMessageIndex(messages.length + 1);
    setIsLoading(false);
  };

  return (
    <div className={`flex flex-col h-screen ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
      {/* Header - Minimal & Premium */}
      <div className={`border-b ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-gradient-to-r from-blue-50 to-transparent border-slate-200'} backdrop-blur-sm p-4 sticky top-0 z-10`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isDark ? 'bg-brand-primary/20' : 'bg-brand-primary/10'
            }`}>
              <Zap className="w-5 h-5 text-brand-primary" />
            </div>
            <div>
              <h1 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                CoreFlux AI
              </h1>
              <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                German AI • Encrypted • Always on
              </p>
            </div>
          </div>
          <button className={`p-2 rounded-lg transition-all ${
            isDark 
              ? 'hover:bg-slate-800 text-slate-400 hover:text-slate-200' 
              : 'hover:bg-slate-100 text-slate-600 hover:text-slate-800'
          }`}>
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className={`flex-1 overflow-y-auto p-4 md:p-6 ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-20 px-4">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                isDark ? 'bg-slate-800' : 'bg-slate-100'
              }`}>
                <Zap className="w-8 h-8 text-brand-primary" />
              </div>
              <h2 className={`text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                How can I help today?
              </h2>
              <p className={`text-base max-w-md mb-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Ask me anything about CoreFlux heating, savings, data security, or our sustainable AI services.
              </p>

              {/* Suggested Questions - Premium Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
                {currentQuestions.map((qa, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(qa.q)}
                    className={`p-4 rounded-xl border-2 text-left transition-all hover:scale-105 ${
                      isDark
                        ? 'bg-slate-800 border-slate-700 hover:border-brand-primary hover:bg-slate-800/50'
                        : 'bg-slate-50 border-slate-200 hover:border-brand-primary hover:bg-white'
                    }`}
                  >
                    <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {qa.q}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {messages.map((message, idx) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} gap-3`}
            >
              {message.type === 'assistant' && (
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                  isDark ? 'bg-slate-800' : 'bg-slate-100'
                }`}>
                  <Zap className="w-4 h-4 text-brand-primary" />
                </div>
              )}
              
              <div className={`max-w-2xl ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div
                  className={`px-4 py-3 rounded-2xl transition-all ${
                    message.type === 'user'
                      ? 'bg-brand-primary text-white rounded-br-none'
                      : isDark
                      ? 'bg-slate-800 text-slate-100 rounded-bl-none'
                      : 'bg-slate-100 text-slate-900 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">
                    {idx === currentMessageIndex ? displayedText : message.text}
                    {idx === currentMessageIndex && <span className="animate-pulse ml-1">▌</span>}
                  </p>
                </div>

                {/* Message Actions */}
                {message.type === 'assistant' && message.isComplete && (
                  <div className="flex gap-1 mt-2 opacity-0 hover:opacity-100 transition-opacity">
                    <button className={`p-2 rounded-lg transition-colors ${
                      isDark
                        ? 'hover:bg-slate-800 text-slate-500 hover:text-slate-300'
                        : 'hover:bg-slate-200 text-slate-500 hover:text-slate-700'
                    }`} title="Copy">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button className={`p-2 rounded-lg transition-colors ${
                      isDark
                        ? 'hover:bg-slate-800 text-slate-500 hover:text-slate-300'
                        : 'hover:bg-slate-200 text-slate-500 hover:text-slate-700'
                    }`} title="Good response">
                      <ThumbsUp className="w-4 h-4" />
                    </button>
                    <button className={`p-2 rounded-lg transition-colors ${
                      isDark
                        ? 'hover:bg-slate-800 text-slate-500 hover:text-slate-300'
                        : 'hover:bg-slate-200 text-slate-500 hover:text-slate-700'
                    }`} title="Bad response">
                      <ThumbsDown className="w-4 h-4" />
                    </button>
                    <button className={`p-2 rounded-lg transition-colors ${
                      isDark
                        ? 'hover:bg-slate-800 text-slate-500 hover:text-slate-300'
                        : 'hover:bg-slate-200 text-slate-500 hover:text-slate-700'
                    }`} title="Regenerate">
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                isDark ? 'bg-slate-800' : 'bg-slate-100'
              }`}>
                <Zap className="w-4 h-4 text-brand-primary" />
              </div>
              <div className={`px-4 py-3 rounded-2xl rounded-bl-none ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
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
      </div>

      {/* Input Area - Premium Design */}
      <div className={`border-t ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-gradient-to-b from-transparent to-slate-50 border-slate-200'} backdrop-blur-sm p-4 md:p-6`}>
        <div className="max-w-4xl mx-auto">
          <div className={`flex gap-3 p-4 rounded-2xl border-2 transition-all ${
            isDark
              ? 'bg-slate-900 border-slate-700 focus-within:border-brand-primary focus-within:bg-slate-800'
              : 'bg-white border-slate-200 focus-within:border-brand-primary focus-within:bg-slate-50'
          }`}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage(input)}
              placeholder="Message CoreFlux AI..."
              disabled={isLoading}
              className={`flex-1 bg-transparent outline-none text-base ${
                isDark ? 'text-white placeholder-slate-600' : 'text-slate-900 placeholder-slate-400'
              }`}
            />
            <button
              onClick={() => handleSendMessage(input)}
              disabled={isLoading || !input.trim()}
              className={`p-2 rounded-lg transition-all font-semibold ${
                input.trim() && !isLoading
                  ? 'bg-brand-primary hover:bg-blue-700 text-white'
                  : `${isDark ? 'bg-slate-800 text-slate-600' : 'bg-slate-200 text-slate-400'}`
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className={`text-xs mt-3 text-center ${isDark ? 'text-slate-600' : 'text-slate-500'}`}>
            🇩🇪 Secure German Infrastructure • 🔐 End-to-End Encrypted • ♻️ 100% Sustainable
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatGPTStyleChat;
