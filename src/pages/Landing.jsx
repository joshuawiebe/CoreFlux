import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, Cpu, Lock, TrendingUp, Zap, BarChart3, Shield, Clock, Globe, Send } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '../components/Reveal';
import Intro from '../components/Intro';

const Landing = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const [introActive, setIntroActive] = useState(true);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [showChatSuggestions, setShowChatSuggestions] = useState(true);

  const sampleQuestions = [
    { q: '💰 How much can I save?', a: 'Users typically save €50-400/month on heating!' },
    { q: '🔐 Is my data secure?', a: '100% encrypted. All data stays in Germany. GDPR compliant.' },
    { q: '⚡ What is CoreFlux?', a: 'Smart heating + distributed AI computing = sustainable future!' },
    { q: '✓ Do I own it?', a: 'After 3-5 years, yes! You keep 50% AI discounts forever.' },
  ];

  const handleChatQuestion = (answer) => {
    setChatMessages([...chatMessages, { type: 'assistant', text: answer }]);
    setChatInput('');
    setShowChatSuggestions(false);
  };

  if (introActive) {
    return <Intro onComplete={() => setIntroActive(false)} />;
  }

  return (
    <div className={`min-h-screen transition-colors ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
      {/* HERO SECTION */}
      <section className={`relative min-h-[90vh] flex items-center px-4 pt-20 pb-20 overflow-hidden ${
        isDark ? 'bg-slate-900' : 'bg-gradient-to-b from-white to-blue-50'
      }`}>
        {/* Subtle background glow */}
        {isDark && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-brand-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          </div>
        )}

        <motion.div
          className="max-w-5xl mx-auto relative z-10 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            className={`inline-block mb-8 px-4 py-2 rounded-full border text-xs font-bold tracking-widest uppercase ${
              isDark
                ? 'bg-brand-primary/20 border-brand-primary/40 text-brand-primary'
                : 'bg-brand-primary/10 border-brand-primary/30 text-brand-primary'
            }`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            ⚡ The Future of Heating
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className={`text-6xl md:text-7xl lg:text-8xl font-black leading-tight mb-6 tracking-tighter ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Your Heat
            <br />
            <span className="bg-gradient-to-r from-brand-primary to-blue-600 bg-clip-text text-transparent">
              Thinks Along
            </span>
            <br />
            With You
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className={`text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-light ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Smart heating system that becomes yours. Sustainable AI that saves you money. All data encrypted in Germany.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Link
              to="/pricing"
              className={`px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                isDark
                  ? 'bg-brand-primary hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                  : 'bg-brand-primary hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              Explore Plans <ArrowRight className="w-5 h-5" />
            </Link>
            <button className={`px-8 py-4 rounded-lg font-bold border-2 border-brand-primary transition-all ${
              isDark
                ? 'text-brand-primary hover:bg-slate-800'
                : 'text-brand-primary hover:bg-blue-50'
            }`}>
              Chat With AI ↓
            </button>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            className="grid grid-cols-3 gap-4 md:gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {[
              { stat: '50%', label: 'Heating Savings' },
              { stat: '€0', label: 'Device Cost' },
              { stat: '100%', label: 'Encrypted' },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border text-center ${
                  isDark
                    ? 'bg-slate-800/50 border-slate-700'
                    : 'bg-white border-slate-200'
                }`}
              >
                <p className="text-3xl font-black text-brand-primary">{item.stat}</p>
                <p className={`text-sm mt-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {item.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* EMBEDDED AI CHAT SECTION */}
      <section className={`py-20 md:py-28 px-4 border-b ${
        isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}>
        <Reveal>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Ask Our AI
              </h2>
              <p className={`text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Questions? Chat instantly. Our AI knows everything about CoreFlux.
              </p>
            </div>

            {/* Chat Box */}
            <div
              className={`rounded-2xl border-2 overflow-hidden ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              {/* Messages */}
              <div className={`h-96 overflow-y-auto p-6 space-y-4 ${isDark ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
                {chatMessages.length === 0 ? (
                  <div className="text-center py-12">
                    <Zap className="w-12 h-12 text-brand-primary mx-auto mb-4 opacity-50" />
                    <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                      Click a question to get started
                    </p>
                  </div>
                ) : (
                  chatMessages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                          msg.type === 'user'
                            ? 'bg-brand-primary text-white'
                            : isDark ? 'bg-slate-700 text-slate-100' : 'bg-slate-200 text-slate-900'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Suggestions or Input */}
              <div className={`p-6 border-t ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                {showChatSuggestions ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {sampleQuestions.map((qa, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleChatQuestion(qa.a)}
                        className={`p-3 rounded-lg text-left text-sm font-medium transition-all text-xs ${
                          isDark
                            ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                        }`}
                      >
                        {qa.q}
                      </button>
                    ))}
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
                          ? 'bg-slate-800 border-slate-700 text-white'
                          : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                    <button className="px-4 py-2 bg-brand-primary text-white rounded-lg font-semibold hover:bg-blue-700 transition-all">
                      Send
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="text-center mt-8">
              <Link to="/ai-chat" className="text-brand-primary hover:underline font-semibold">
                Open Full Chat →
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* WHAT IS COREFLUX SECTION */}
      <section className={`py-20 md:py-28 px-4 border-b ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <Reveal>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Why CoreFlux?
              </h2>
              <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                A name that explains our revolution
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: 'CORE',
                  icon: Cpu,
                  items: ['CPU Core – Computing power', 'Drive System – The engine', 'Nucleus – The foundation'],
                },
                {
                  title: 'FLUX',
                  icon: Flame,
                  items: ['Heat Flow – Your warmth', 'Energy Flow – Power distributed', 'Data Flow – Intelligence'],
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Reveal key={idx} delay={idx * 0.1}>
                    <div
                      className={`p-8 rounded-2xl border-2 border-brand-primary/50 ${
                        isDark ? 'bg-brand-primary/5' : 'bg-blue-50'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <Icon className="w-8 h-8 text-brand-primary" />
                        <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {item.title}
                        </h3>
                      </div>
                      <ul className="space-y-3">
                        {item.items.map((text, jdx) => (
                          <li
                            key={jdx}
                            className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
                          >
                            ✓ {text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Reveal>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className={`py-20 md:py-28 px-4 border-b ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
        <Reveal>
          <div className="max-w-5xl mx-auto">
            <h2 className={`text-4xl font-bold text-center mb-16 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              How It Works
            </h2>

            <div className="space-y-6">
              {[
                { num: '1', icon: Flame, title: 'Install', desc: 'Professional installation replaces your old system.' },
                { num: '2', icon: Cpu, title: 'Heat & Compute', desc: 'Heats your home while powering German AI.' },
                { num: '3', icon: TrendingUp, title: 'Save', desc: 'Start saving €50-400/month immediately.' },
                { num: '4', icon: Shield, title: 'Own It', desc: '3-5 years: it\'s completely yours.' },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Reveal key={idx} delay={idx * 0.1}>
                    <div
                      className={`p-6 md:p-8 rounded-xl border flex gap-6 items-start transition-all ${
                        isDark
                          ? 'bg-slate-800 border-slate-700 hover:border-brand-primary'
                          : 'bg-white border-slate-200 hover:border-brand-primary'
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-lg ${
                          isDark ? 'bg-brand-primary/20 text-brand-primary' : 'bg-blue-100 text-brand-primary'
                        }`}
                      >
                        {item.num}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className="w-5 h-5 text-brand-primary" />
                          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {item.title}
                          </h3>
                        </div>
                        <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>{item.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Reveal>
      </section>

      {/* BENEFITS GRID */}
      <section className={`py-20 md:py-28 px-4 border-b ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <Reveal>
          <div className="max-w-5xl mx-auto">
            <h2 className={`text-4xl font-bold text-center mb-16 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Why Choose CoreFlux?
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Zap, title: '50% Savings', desc: 'Reduce heating costs dramatically' },
                { icon: Lock, title: '100% Encrypted', desc: 'Military-grade AES-256' },
                { icon: Globe, title: 'German Made', desc: 'EU sovereign infrastructure' },
                { icon: Clock, title: 'Lifetime Support', desc: 'Forever guaranteed' },
                { icon: Shield, title: 'Zero Risk', desc: 'Money-back guarantee' },
                { icon: TrendingUp, title: 'It\'s Yours', desc: 'After 3-5 years' },
                { icon: BarChart3, title: 'Real Savings', desc: '€50-400/month average' },
                { icon: Flame, title: 'Sustainable', desc: '100% recyclable' },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Reveal key={idx} delay={idx * 0.05}>
                    <div
                      className={`p-6 rounded-xl text-center transition-all ${
                        isDark
                          ? 'bg-slate-800 hover:bg-slate-700'
                          : 'bg-slate-50 hover:bg-white border border-slate-200'
                      }`}
                    >
                      <Icon className="w-8 h-8 text-brand-primary mx-auto mb-3" />
                      <h3 className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {item.title}
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {item.desc}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Reveal>
      </section>

      {/* FINAL CTA */}
      <section className={`py-20 md:py-28 px-4 ${isDark ? 'bg-slate-950' : 'bg-gradient-to-r from-blue-50 to-white'}`}>
        <Reveal>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Ready to Start?
            </h2>
            <p className={`text-lg mb-8 max-w-2xl mx-auto ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Join the sustainable heating revolution. No risk, money-back guarantee.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="px-12 py-4 rounded-lg font-bold bg-brand-primary text-white hover:bg-blue-700 transition-all"
              >
                Get Started Free
              </Link>
              <Link
                to="/pricing"
                className={`px-12 py-4 rounded-lg font-bold border-2 border-brand-primary transition-all ${
                  isDark ? 'text-brand-primary hover:bg-slate-800' : 'text-brand-primary hover:bg-white'
                }`}
              >
                View Pricing
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className={`border-t ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} py-12 px-4`}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Core<span className="text-brand-primary">Flux</span>
              </h3>
              <p className={isDark ? 'text-slate-400 text-sm' : 'text-slate-600 text-sm'}>
                Smart heating. Sustainable AI. ♻️
              </p>
            </div>
            <div>
              <h4 className={`font-bold mb-4 text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>Product</h4>
              <Link to="/pricing" className={`block mb-2 text-sm transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
                Pricing
              </Link>
              <Link to="/ai-chat" className={`block text-sm transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
                AI Chat
              </Link>
            </div>
            <div>
              <h4 className={`font-bold mb-4 text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>Company</h4>
              <Link to="/team" className={`block mb-2 text-sm transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
                Team
              </Link>
              <Link to="/impressum" className={`block text-sm transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
                Impressum
              </Link>
            </div>
            <div>
              <h4 className={`font-bold mb-4 text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>Legal</h4>
              <Link to="/privacy" className={`block text-sm transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
                Privacy
              </Link>
            </div>
          </div>
          <div className={`border-t pt-8 text-center text-sm ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'}`}>
            <p>© 2026 CoreFlux GmbH. Built for a sustainable future. 🚀</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
