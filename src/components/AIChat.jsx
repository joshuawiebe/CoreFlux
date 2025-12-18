import React, { useState, useEffect, useRef } from 'react';
import { Send, Zap, MessageCircle, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const AIChat = () => {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: '🤖 Hallo! Ich bin CoreFlux KI. Wie kann ich dir heute helfen?',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEnd = useRef(null);

  const fakeResponses = [
    '💡 Das ist eine großartige Frage! Nach meiner Analyse könnten wir deine Heizungseffizienz um ca. 34% optimieren.',
    '🔥 Basierend auf deinen Daten könnte eine Upgrade-Empfehlung folgende Ersparnis bringen: ~€240/Monat',
    '⚡ Interessant! Deine aktuelle Netzwerkauslastung liegt bei 67%. Ein Upgrade würde dir 89% mehr Kapazität geben.',
    '📊 Laut Prognose: Dein System wird in 5 Tagen sein Peak-Limit erreichen. Ein Upgrade wird empfohlen.',
    '🌍 Nachhaltigkeit-Score: 8.7/10 🎉 Du sparst täglich CO2-Äquivalente einer Autofahrt von 23km!',
    '💰 Aktuelle Einsparungen diese Woche: €147,63 durch KI-Optimierung!',
    '🚀 Wow! Deine KI verarbeitet aktuell 2,847 Anfragen parallel. Das ist 340% über dem Durchschnitt!',
    '🎯 Prediction: Dein nächster Peak wird Mittwoch 14:37 sein. Planung läuft...',
    '🔐 Sicherheitscheck abgeschlossen: 0 Anomalien erkannt. Alles sicher! ✓',
    '💎 Premium-Feature freigeschaltet: Advanced AI Forecasting für dein Netzwerk!',
    '⏱️ Optimierungsvorschlag: Verschiebe intensive Prozesse auf 02:00-06:00 für 12% mehr Effizienz.',
    '🌟 KI-Qualität Upgrade verfügbar! Mit unserem Pro-Plan bekommst du 5x schnellere Responses.',
    '📈 Trend: Deine Nachfrage nach KI-Services steigt 23% wöchentlich!',
    '🎁 Exklusives Angebot: 50% Rabatt auf AI-Pro für nächste 24 Stunden!',
    '🤝 Viele andere Nutzer haben gerade ein Upgrade auf Professional gemacht.',
  ];

  const scrollToBottom = () => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const randomResponse = fakeResponses[Math.floor(Math.random() * fakeResponses.length)];
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: randomResponse,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 800 + Math.random() * 800);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 w-14 h-14 rounded-full shadow-lg transition-all z-30 flex items-center justify-center font-bold text-white ${
          isOpen
            ? 'bg-red-600 hover:bg-red-700'
            : 'bg-gradient-to-r from-brand-primary to-brand-secondary hover:shadow-xl hover:scale-110'
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-24 right-8 w-96 h-96 rounded-2xl shadow-2xl flex flex-col z-30 animate-slide-in-up ${
          isDark
            ? 'dark:bg-slate-900 dark:border-slate-800'
            : 'bg-white border-slate-200'
        } border`}>
          {/* Header */}
          <div className={`p-4 border-b flex items-center gap-2 ${
            isDark
              ? 'dark:bg-slate-800 dark:border-slate-700'
              : 'bg-slate-100 border-slate-200'
          }`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary flex items-center justify-center text-white font-bold">
              🤖
            </div>
            <div>
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>CoreFlux KI</h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Sempre online</p>
            </div>
          </div>

          {/* Messages */}
          <div className={`flex-1 overflow-y-auto p-4 space-y-3 ${
            isDark
              ? 'dark:bg-slate-900'
              : 'bg-white'
          }`}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                    msg.type === 'user'
                      ? 'bg-brand-primary text-white rounded-br-none'
                      : isDark
                      ? 'dark:bg-slate-800 dark:text-slate-100 rounded-bl-none'
                      : 'bg-slate-200 text-slate-900 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className={`px-4 py-2 rounded-lg ${
                  isDark
                    ? 'dark:bg-slate-800'
                    : 'bg-slate-200'
                }`}>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-brand-primary animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-brand-primary animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-brand-primary animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEnd} />
          </div>

          {/* Input */}
          <div className={`p-4 border-t flex gap-2 ${
            isDark
              ? 'dark:bg-slate-800 dark:border-slate-700'
              : 'bg-slate-100 border-slate-200'
          }`}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Frag die KI..."
              className={`flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm ${
                isDark
                  ? 'dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400'
                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
              }`}
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className={`p-2 rounded-lg transition-all ${
                isLoading || !input.trim()
                  ? 'opacity-50 cursor-not-allowed'
                  : 'bg-brand-primary hover:bg-blue-600 text-white'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChat;
