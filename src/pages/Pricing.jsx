import React, { useState } from 'react';
import { Check, AlertCircle, Zap, Lock, Flame, TrendingUp, Shield, Clock, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Pricing = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState('heating');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className={`min-h-screen transition-colors ${isDark ? 'bg-slate-950' : 'bg-white'} pt-32 pb-20`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Simple. Transparent.
            <br />
            <span className="bg-gradient-to-r from-brand-primary to-blue-600 bg-clip-text text-transparent">
              Incredible.
            </span>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            The device is free. Installation costs money (like any provider). AI service is included with 50% discount. And after a few years, you own it completely.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="flex justify-center gap-4 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {[
            { id: 'heating', label: 'Heating System', icon: Flame },
            { id: 'ai', label: 'AI Services', icon: Zap },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  selectedTab === tab.id
                    ? 'bg-brand-primary text-white shadow-lg'
                    : isDark
                    ? 'bg-slate-800 text-slate-300 hover:text-white'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Heating Pricing */}
        {selectedTab === 'heating' && (
          <motion.div
            className="space-y-8 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Main Pricing Card */}
            <motion.div
              variants={itemVariants}
              className={`p-8 md:p-12 rounded-2xl border-2 border-brand-primary relative overflow-hidden ${
                isDark ? 'bg-slate-900' : 'bg-blue-50'
              }`}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand-primary/10 rounded-full -mr-20 -mt-20" />
              
              <div className="relative z-10">
                <motion.div className="flex items-center gap-2 mb-4" whileHover={{ x: 5 }}>
                  <Flame className="w-6 h-6 text-brand-primary" />
                  <span className="text-sm font-bold text-brand-primary">INCLUDES 50% AI DISCOUNT</span>
                </motion.div>

                <h2 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Complete Heating System
                </h2>
                <p className={`text-lg mb-8 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Heat your home for decades & own the device eventually.
                </p>

                {/* Pricing Breakdown */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {[
                    { label: 'Device Cost', value: '€0', desc: 'No upfront device cost. We cover it.' },
                    { label: 'Installation', value: '€500-1,500', desc: 'Professional setup (standard industry pricing)' },
                    { label: 'Monthly', value: '€50-150', desc: 'Electricity only (no subscription)', highlight: true },
                    { label: 'Your Savings', value: '€50-400', desc: 'Monthly heating cost reduction', highlight: true },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      variants={itemVariants}
                      whileHover={{ y: -5 }}
                      className={`p-6 rounded-lg transition-all ${item.highlight ? (isDark ? 'bg-brand-primary/20 border border-brand-primary/30' : 'bg-blue-100 border border-brand-primary/30') : (isDark ? 'bg-slate-800' : 'bg-white')}`}
                    >
                      <p className={`text-sm font-semibold mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {item.label}
                      </p>
                      <p className={`text-4xl font-bold ${item.highlight || item.value === '€0' ? 'text-brand-primary' : 'text-green-500'} mb-2`}>
                        {item.value}
                      </p>
                      <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <motion.div variants={itemVariants}>
                    <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      What's Included
                    </h3>
                    {[
                      'AI-optimized heating 24/7',
                      'Real-time temperature control',
                      'Mobile app monitoring',
                      '99.9% uptime guarantee',
                      'Priority maintenance support',
                      'All software updates forever',
                    ].map((feature, idx) => (
                      <motion.div key={idx} className="flex gap-3 mb-3" whileHover={{ x: 5 }}>
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{feature}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Security & Privacy
                    </h3>
                    {[
                      '🔐 Military-grade encryption (AES-256)',
                      'Zero data storage on your device',
                      'German-only infrastructure (EU-compliant)',
                      'GDPR fully compliant',
                      'Annual security audits',
                      'Your data, your control - always',
                    ].map((feature, idx) => (
                      <motion.div key={idx} className="flex gap-3 mb-3" whileHover={{ x: 5 }}>
                        <Lock className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{feature}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Ownership Timeline */}
            <motion.div
              variants={itemVariants}
              className={`p-8 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
            >
              <h3 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <Clock className="w-6 h-6 text-brand-primary" />
                Your Device Ownership Timeline
              </h3>

              <div className="space-y-5">
                {[
                  {
                    period: 'Year 1-3',
                    title: 'Device is ours – you save on heating',
                    desc: 'We use the device\'s computing power for German AI infrastructure. You enjoy 50% off all AI services.',
                  },
                  {
                    period: 'Year 3-5',
                    title: 'Device pays for itself',
                    desc: 'Through combined savings and AI usage, the device ROI is achieved. We keep providing 50% AI discounts.',
                  },
                  {
                    period: 'Year 5+',
                    title: 'The device is completely yours ✓',
                    desc: 'You own the heating system outright. Keep enjoying 50% AI discounts for life. The heat is free forever!',
                  },
                ].map((timeline, idx) => (
                  <motion.div
                    key={idx}
                    className="flex gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 }}
                  >
                    <motion.div
                      className={`w-24 h-24 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-lg ${
                        isDark ? 'bg-slate-700 text-brand-primary' : 'bg-blue-100 text-brand-primary border border-brand-primary/30'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {timeline.period}
                    </motion.div>
                    <div>
                      <p className={`font-bold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {timeline.title}
                      </p>
                      <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                        {timeline.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div variants={itemVariants} className="text-center">
              <Link to="/login" className="inline-block px-12 py-4 rounded-lg font-semibold bg-brand-primary text-white hover:shadow-lg transition-all flex items-center gap-2 group">
                Get Started Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        )}

        {/* AI Services Pricing */}
        {selectedTab === 'ai' && (
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Intro */}
            <motion.div variants={itemVariants} className={`p-8 rounded-xl border-2 border-brand-primary ${isDark ? 'bg-slate-900' : 'bg-blue-50'}`}>
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-brand-primary" />
                <span className="font-bold text-brand-primary uppercase">Standalone or Bundled</span>
              </div>
              <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Secure German AI Infrastructure
              </h2>
              <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                💡 <strong>Heating Customers:</strong> Get 50% off everything! The device includes AI service at half price.
                <br/>
                🤖 <strong>Everyone Else:</strong> Access our secure German infrastructure for data-privacy conscious AI projects.
              </p>
            </motion.div>

            {/* AI Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Starter',
                  price: '€29/mo',
                  discount: '€14.50 (heating)',
                  features: [
                    '10,000 API calls/month',
                    'Basic AI models',
                    'German servers only',
                    'Email support',
                    'GDPR compliant',
                  ],
                },
                {
                  name: 'Pro',
                  price: '€99/mo',
                  discount: '€49.50 (heating)',
                  features: [
                    'Unlimited API calls',
                    'Advanced AI models',
                    'Priority support',
                    'Custom model training',
                    '99.99% uptime SLA',
                    'Private hosting',
                  ],
                  highlighted: true,
                },
                {
                  name: 'Enterprise',
                  price: 'Custom',
                  discount: '50% off (heating)',
                  features: [
                    'Custom infrastructure',
                    'Dedicated team',
                    'Custom SLA',
                    'On-premise option',
                    'Unlimited training',
                    'White-label solution',
                  ],
                },
              ].map((plan, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className={`p-8 rounded-xl border-2 transition-all ${
                    plan.highlighted
                      ? isDark
                        ? 'bg-brand-primary/10 border-brand-primary'
                        : 'bg-blue-50 border-brand-primary shadow-lg'
                      : isDark
                      ? 'bg-slate-800 border-slate-700'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  {plan.highlighted && (
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="bg-brand-primary text-white px-3 py-1 rounded-full text-xs font-bold inline-block mb-4"
                    >
                      MOST POPULAR
                    </motion.div>
                  )}

                  <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-3xl font-bold text-brand-primary mb-2`}>{plan.price}</p>
                  <p className={`text-sm mb-6 font-semibold text-green-500`}>{plan.discount}</p>

                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, fidx) => (
                      <motion.div key={fidx} className="flex gap-2" whileHover={{ x: 5 }}>
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/login"
                      className={`block w-full text-center py-3 rounded-lg font-semibold transition-all ${
                        plan.highlighted
                          ? 'bg-brand-primary text-white hover:shadow-lg'
                          : isDark
                          ? 'bg-slate-700 text-white hover:bg-slate-600'
                          : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                      }`}
                    >
                      Start Free Trial
                    </Link>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* FAQ */}
            <motion.div variants={itemVariants} className={`p-8 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Frequently Asked Questions
              </h3>
              <div className="space-y-6">
                {[
                  { q: '🔗 Can I combine both heating + AI?', a: 'Yes! Get a heating system + AI services. Heating customers automatically get 50% off all AI pricing.' },
                  { q: '📝 Any contracts?', a: 'No long-term AI contracts. Cancel anytime. Heating systems include a 5-year operational guarantee.' },
                  { q: '🔐 How is my data protected?', a: '100% encrypted (AES-256). All processing in Germany only. GDPR certified. Your data never leaves EU.' },
                  { q: '⬆️ Can I upgrade/downgrade?', a: 'Yes, anytime. Changes take effect next billing cycle. Scale up or down as needed!' },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <p className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {item.q}
                    </p>
                    <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>{item.a}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          className={`mt-16 p-8 rounded-xl text-center border-2 border-brand-primary ${
            isDark ? 'bg-slate-900' : 'bg-blue-50'
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Still have questions?
          </h3>
          <p className={`mb-6 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Chat with our AI assistant for instant answers about pricing, installation, and everything CoreFlux.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/ai-chat" className="px-8 py-3 rounded-lg font-semibold bg-brand-primary text-white hover:shadow-lg transition-all inline-block">
              Open AI Chat
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;
