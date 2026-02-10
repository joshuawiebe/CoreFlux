import React, { useState } from 'react';
import { Check, Zap, Cpu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState('heating');

  const heatingFeatures = [
    'Intelligent heating unit (0€)',
    'Pay only electricity costs',
    'AI optimization 24/7',
    'Private API access',
    'Monthly savings: €50-400',
    'GDPR compliant',
    '99.9% uptime',
    'Priority support',
  ];

  const aiFeatures = {
    starter: [
      '10,000 API requests/month',
      'Basic AI models',
      'Email support',
      'Community access',
      '99% uptime SLA',
      'German servers',
    ],
    pro: [
      'Unlimited API requests',
      'Advanced AI models',
      'Priority support',
      'Custom model training',
      '99.99% uptime SLA',
      'German servers',
      'Private hosting',
      'Advanced analytics',
    ],
    enterprise: [
      'Custom infrastructure',
      'Dedicated support team',
      'Custom SLA',
      'On-premise option',
      'Unlimited training',
      'White-label API',
      'Custom integrations',
      'Security audit included',
    ],
  };

  return (
    <div className={`min-h-screen transition-colors ${isDark ? 'bg-slate-950' : 'bg-white'} pt-32 pb-20`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t('pricing.title')}
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Choose the perfect plan for your needs. Both models are scalable and can be combined.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-16">
          <button
            onClick={() => setSelectedTab('heating')}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              selectedTab === 'heating'
                ? 'bg-brand-primary text-white shadow-lg'
                : isDark
                ? 'bg-slate-800 text-slate-300 hover:text-white'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className="w-4 h-4 inline mr-2" />
            {t('pricing.heating')}
          </button>
          <button
            onClick={() => setSelectedTab('ai')}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              selectedTab === 'ai'
                ? 'bg-brand-primary text-white shadow-lg'
                : isDark
                ? 'bg-slate-800 text-slate-300 hover:text-white'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <Cpu className="w-4 h-4 inline mr-2" />
            {t('pricing.ai')}
          </button>
        </div>

        {/* Heating Model */}
        {selectedTab === 'heating' && (
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {/* Heating Description */}
            <div
              className={`p-8 rounded-2xl border-2 border-brand-primary ${
                isDark ? 'bg-brand-primary/10' : 'bg-blue-50'
              }`}
            >
              <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {t('pricing.heating')}
              </h2>
              <p className={`mb-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {t('pricing.heating_desc')}
              </p>
              
              <div className="mb-8">
                <p className={`text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Device Cost:
                </p>
                <div className="text-5xl font-bold text-brand-primary mb-2">
                  {t('pricing.heating_price')}
                </div>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {t('pricing.heating_monthly')}
                </p>
              </div>

              <Link
                to="/login"
                className="w-full px-6 py-3 rounded-lg font-semibold bg-brand-primary text-white hover:shadow-xl transition-all text-center block"
              >
                {t('common.getStarted')}
              </Link>
            </div>

            {/* Features */}
            <div className={`p-8 rounded-2xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {t('pricing.features')}
              </h3>
              <div className="space-y-4">
                {heatingFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AI Services Model */}
        {selectedTab === 'ai' && (
          <div className="max-w-6xl mx-auto">
            <p className={`text-center mb-12 text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {t('pricing.ai_desc')}
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Starter Plan */}
              <div
                className={`rounded-2xl border overflow-hidden transition-all hover:shadow-xl ${
                  isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                }`}
              >
                <div className="p-8">
                  <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {t('pricing.ai_starter')}
                  </h3>
                  <p className={`text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Perfect for testing
                  </p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-brand-primary">
                      €{t('pricing.ai_starter_price')}
                    </span>
                    <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {' '}{t('pricing.per_month')}
                    </span>
                  </div>

                  <button
                    className="w-full px-6 py-3 rounded-lg font-semibold bg-slate-200 text-slate-900 hover:bg-slate-300 transition-all mb-8"
                  >
                    {t('common.getStarted')}
                  </button>

                  <div className="space-y-3">
                    {aiFeatures.starter.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pro Plan (Highlighted) */}
              <div
                className={`rounded-2xl border-2 border-brand-primary overflow-hidden transition-all hover:shadow-2xl relative md:-translate-y-4 ${
                  isDark ? 'bg-slate-800' : 'bg-white'
                }`}
              >
                <div className="absolute top-0 left-0 right-0 bg-brand-primary text-white py-2 text-center font-semibold">
                  🌟 MOST POPULAR
                </div>
                <div className="p-8 pt-14">
                  <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {t('pricing.ai_pro')}
                  </h3>
                  <p className={`text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    For most businesses
                  </p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-brand-primary">
                      €{t('pricing.ai_pro_price')}
                    </span>
                    <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {' '}{t('pricing.per_month')}
                    </span>
                  </div>

                  <button
                    className="w-full px-6 py-3 rounded-lg font-semibold bg-brand-primary text-white hover:shadow-lg transition-all mb-8"
                  >
                    {t('common.getStarted')}
                  </button>

                  <div className="space-y-3">
                    {aiFeatures.pro.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enterprise Plan */}
              <div
                className={`rounded-2xl border overflow-hidden transition-all hover:shadow-xl ${
                  isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                }`}
              >
                <div className="p-8">
                  <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {t('pricing.ai_enterprise')}
                  </h3>
                  <p className={`text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Custom solutions
                  </p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-brand-primary">
                      {t('pricing.ai_enterprise_price')}
                    </span>
                  </div>

                  <button
                    className="w-full px-6 py-3 rounded-lg font-semibold border-2 border-brand-primary text-brand-primary hover:bg-blue-50 dark:hover:bg-slate-700 transition-all mb-8"
                  >
                    {t('common.contactUs')}
                  </button>

                  <div className="space-y-3">
                    {aiFeatures.enterprise.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Comparison */}
        <div className={`mt-20 pt-20 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Which plan is right for you?
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div
              className={`p-8 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
            >
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                🏠 Heating + AI
              </h3>
              <ul className={`space-y-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                <li>✓ Want to reduce heating costs</li>
                <li>✓ Have a home or office</li>
                <li>✓ Want passive income</li>
                <li>✓ Interested in sustainability</li>
              </ul>
            </div>

            <div
              className={`p-8 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
            >
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                🤖 AI Services Only
              </h3>
              <ul className={`space-y-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                <li>✓ Building AI applications</li>
                <li>✓ Need reliable ML APIs</li>
                <li>✓ Privacy is important</li>
                <li>✓ Want to train custom models</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className={`mt-20 pt-20 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Frequently Asked Questions
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                q: 'Can I use both models together?',
                a: 'Yes! Many customers have a heating unit and also subscribe to AI services for development.',
              },
              {
                q: 'What if I change my mind?',
                a: 'Heating contracts are flexible with 30-day cancellation. AI plans can be upgraded or downgraded anytime.',
              },
              {
                q: 'Is there a trial period?',
                a: 'Sign up for our Starter AI plan to test the infrastructure. Heating units have a 14-day trial.',
              },
              {
                q: 'Do you offer discounts?',
                a: 'Yes! Annual billing gets 10% off. volume discounts and partnerships available.',
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
              >
                <h4 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {faq.q}
                </h4>
                <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
