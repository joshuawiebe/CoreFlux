import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Thermometer, Cloud, AlertTriangle, CheckCircle, Flame, Cpu, Lock, TrendingUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const Landing = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();

  return (
    <div className={`min-h-screen transition-colors ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className={`pt-32 pb-20 md:pb-32 px-4 relative overflow-hidden border-b ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-gradient-to-b from-white to-slate-50 border-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="mb-6 inline-block">
              <div className="px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20">
                <p className={`text-sm font-medium ${isDark ? 'text-brand-primary' : 'text-brand-primary'}`}>
                  🔥 {t('common.learnMore')} about CoreFlux
                </p>
              </div>
            </div>

            <h1 className={`text-5xl md:text-6xl font-bold mb-6 leading-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {t('landing.hero_title')}
            </h1>
            
            <p className={`text-lg md:text-xl mb-8 leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {t('landing.hero_subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/login" className="px-8 py-4 rounded-lg font-semibold bg-brand-primary text-white hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group">
                {t('common.getStarted')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/pricing" className={`px-8 py-4 rounded-lg font-semibold border-2 border-brand-primary transition-all flex items-center justify-center gap-2 ${
                isDark ? 'text-brand-primary hover:bg-slate-800' : 'text-brand-primary hover:bg-blue-50'
              }`}>
                {t('landing.learnMore')}
              </Link>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className={`p-4 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                <p className="text-2xl font-bold text-brand-primary">50%</p>
                <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Save on heating</p>
              </div>
              <div className={`p-4 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                <p className="text-2xl font-bold text-green-500">100%</p>
                <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Encrypted data</p>
              </div>
              <div className={`p-4 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                <p className="text-2xl font-bold text-blue-500">€0</p>
                <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Device cost</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CoreFlux Name Explanation */}
      <section className={`py-20 md:py-32 px-4 border-b ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              What Does CoreFlux Mean?
            </h2>
            <p className={`text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Our name reflects our mission: combining computing cores with energy flow
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Core */}
            <div className={`p-8 rounded-xl border-2 border-brand-primary ${isDark ? 'bg-brand-primary/10' : 'bg-blue-50'}`}>
              <Cpu className="w-12 h-12 text-brand-primary mb-4" />
              <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                CORE
              </h3>
              <p className={`mb-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <strong>CPU Core</strong> - The heart of computing power
              </p>
              <p className={`mb-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <strong>Drive System</strong> - The engine that powers everything
              </p>
              <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                <strong>Nucleus</strong> - The core element that brings it all together
              </p>
            </div>

            {/* Flux */}
            <div className={`p-8 rounded-xl border-2 border-brand-accent ${isDark ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
              <Flame className="w-12 h-12 text-brand-accent mb-4" />
              <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                FLUX
              </h3>
              <p className={`mb-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <strong>Heat Flow</strong> - Thermal energy moving through your home
              </p>
              <p className={`mb-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <strong>Energy Flow</strong> - Continuous power distribution
              </p>
              <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                <strong>Data Flow</strong> - Information processing at the core
              </p>
            </div>
          </div>

          <div className={`mt-12 p-8 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <p className={`text-lg text-center ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <strong>CoreFlux</strong> = Your <strong>computing core</strong> + the <strong>heat flow</strong> of sustainable energy
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className={`py-20 md:py-32 px-4 border-b ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {t('landing.problem_title')}
            </h2>
            <p className={`text-lg md:text-xl max-w-2xl mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {t('landing.problem_desc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className={`p-8 rounded-xl border ${isDark ? 'bg-red-900/20 border-red-700/30' : 'bg-red-50 border-red-200'}`}>
              <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
              <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                High Costs
              </h3>
              <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                Traditional heating systems are expensive and energy-inefficient, costing families hundreds per month.
              </p>
            </div>
            <div className={`p-8 rounded-xl border ${isDark ? 'bg-red-900/20 border-red-700/30' : 'bg-red-50 border-red-200'}`}>
              <Cloud className="w-12 h-12 text-red-500 mb-4" />
              <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Wasted Energy
              </h3>
              <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                Data centers waste enormous energy cooling servers. CoreFlux recycles this heat into your home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className={`py-20 md:py-32 px-4 border-b ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {t('landing.solution_title')}
            </h2>
            <p className={`text-lg md:text-xl max-w-2xl mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {t('landing.solution_desc')}
            </p>
          </div>

          <div className={`p-12 rounded-2xl border-2 border-brand-primary/30 ${isDark ? 'bg-brand-primary/5' : 'bg-blue-50/50'}`}>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Cpu className="w-8 h-8 text-brand-primary" />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Processing Power
                </h3>
                <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                  Your heating system runs AI computations 24/7
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Flame className="w-8 h-8 text-brand-primary" />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Waste Heat
                </h3>
                <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                  100% captured and used to heat your home
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-brand-primary" />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Profit
                </h3>
                <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                  Earn money from AI processing services
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Installation & Ownership Section */}
      <section className={`py-20 md:py-32 px-4 border-b ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'}`}>
        <div className="max-w-5xl mx-auto">
          <h2 className={`text-4xl font-bold text-center mb-16 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            How Does Ownership Work?
          </h2>

          <div className="space-y-8">
            <div className={`p-8 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300'}`}>
              <h3 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <span className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold">1</span>
                Installation Costs (Like Other Providers)
              </h3>
              <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                Installation fees apply, similar to any heating provider. You get professional setup and integration into your home's heating system.
              </p>
            </div>

            <div className={`p-8 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300'}`}>
              <h3 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <span className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold">2</span>
                Long-Term Ownership
              </h3>
              <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                After our device has paid for itself through our computing costs (~3-5 years), it becomes fully yours. We keep a discount on our AI services indefinitely—it's just easier than removing working equipment!
              </p>
            </div>

            <div className={`p-8 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300'}`}>
              <h3 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <span className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold">3</span>
                AI Service Discounts
              </h3>
              <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                With any CoreFlux heating system, you get 50% off our AI services. Heating customers get special pricing on our secure German AI infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 md:py-32 px-4 border-b ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
        <div className="max-w-5xl mx-auto">
          <h2 className={`text-4xl font-bold text-center mb-16 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t('landing.features_title')}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Zap,
                title: t('landing.feature_efficiency'),
                desc: t('landing.feature_efficiency_desc'),
              },
              {
                icon: TrendingUp,
                title: t('landing.feature_price'),
                desc: t('landing.feature_price_desc'),
              },
              {
                icon: Lock,
                title: 'Full Data Encryption',
                desc: '🔐 All data on devices is fully encrypted. Used only for computing, never for storage!',
              },
              {
                icon: Cpu,
                title: t('landing.feature_ai'),
                desc: t('landing.feature_ai_desc'),
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className={`p-8 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700 hover:border-brand-primary' : 'bg-slate-50 border-slate-200 hover:border-brand-primary'} transition-all`}>
                  <Icon className="w-12 h-12 text-brand-primary mb-4" />
                  <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {feature.title}
                  </h3>
                  <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Chat CTA Section */}
      <section className={`py-20 md:py-32 px-4 border-b ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-blue-50 border-slate-100'}`}>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            ✨ Chat With Our AI Assistant
          </h2>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-8 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Have questions about CoreFlux? Our AI assistant is here to help with instant answers, fun jokes, and expert guidance on heating, savings, and AI services.
          </p>
          <Link 
            to="/ai-chat" 
            className="inline-block px-12 py-4 rounded-lg font-semibold bg-brand-primary text-white hover:shadow-xl hover:-translate-y-1 transition-all text-lg"
          >
            Open AI Chat →
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 md:py-32 px-4 ${isDark ? 'bg-slate-900' : 'bg-slate-100'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Ready to start?
          </h2>
          <p className={`text-lg mb-8 max-w-2xl mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Join thousands of users saving money while supporting sustainable energy and German AI infrastructure
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login" className="px-8 py-4 rounded-lg font-semibold bg-brand-primary text-white hover:shadow-xl hover:-translate-y-1 transition-all">
              {t('common.getStarted')}
            </Link>
            <Link to="/pricing" className={`px-8 py-4 rounded-lg font-semibold border-2 border-brand-primary transition-all ${
              isDark ? 'text-brand-primary hover:bg-slate-800' : 'text-brand-primary hover:bg-white'
            }`}>
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} py-12`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>CoreFlux</h3>
              <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Your heat thinks along. 🔥</p>
            </div>
            <div>
              <h4 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>Product</h4>
              <Link to="/pricing" className={`block mb-2 ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>Pricing</Link>
              <Link to="/" className={`block ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>AI Chat</Link>
            </div>
            <div>
              <h4 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>Company</h4>
              <Link to="/team" className={`block mb-2 ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>Team</Link>
              <Link to="/impressum" className={`block ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>Impressum</Link>
            </div>
            <div>
              <h4 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>Legal</h4>
              <Link to="/privacy" className={`block ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>Privacy</Link>
            </div>
          </div>
          <div className={`border-t pt-8 ${isDark ? 'border-slate-800' : 'border-slate-200'} text-center ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            <p>© 2026 CoreFlux GmbH. {t('common.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
