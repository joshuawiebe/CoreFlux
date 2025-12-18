import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Zap, Check, TrendingUp, Cpu, Clock, Zap as ZapIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const KIMarketplace = () => {
  const { isDark } = useTheme();
  const [selectedTier, setSelectedTier] = useState(null);
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  const kiFakeResponses = [
    "⚡ 23% Effizienzsteigerung erkannt! Empfehlungen aktiviert?",
    "🔥 Deine Heizung läuft optimal (97.3% Effizienz)",
    "💰 Du sparst €47.30 diese Woche im Vergleich zu letzter Woche",
    "📈 Peak-Zeit vorhersage: Mittwoch 14:37 höchste Last",
    "🌍 CO2-Einsparungen: 23km Autofahrt äquivalent!",
    "🎯 Empfehlung: Smart Scheduling aktivieren = +12% Effizienz",
    "📊 Netzwerkauslastung: 67% | Kapazitäts-Upgrade empfohlen",
    "🚀 Advanced AI Forecasting jetzt verfügbar - 50% Rabatt!",
  ];

  const kiTiers = [
    {
      id: 1,
      name: 'Free',
      monthlyPrice: 0,
      annualPrice: 0,
      description: 'Kostenlos starten',
      features: [
        'Basis-Überwachung',
        'Monatliche Reports',
        'App-Zugang',
        'Community Support',
        'Standard Alerts',
      ],
      cta: 'Jetzt starten',
      popular: false,
    },
    {
      id: 2,
      name: 'Starter',
      monthlyPrice: 19,
      annualPrice: 190,
      description: 'Für Einsteiger',
      features: [
        'Echtzeit-Überwachung',
        'Wöchentliche Reports',
        'Smart Scheduling',
        'Email Support',
        'Erweiterte Alerts',
        'Basis-Prognosen',
      ],
      cta: 'Jetzt upgraden',
      popular: false,
    },
    {
      id: 3,
      name: 'Professional',
      monthlyPrice: 49,
      annualPrice: 490,
      description: 'Most Popular',
      features: [
        'Alles aus Starter +',
        'AI-Optimierung',
        'Tägliche Forecasts',
        'Priority Support',
        'Anomalieerkennung',
        'Benutzerdefinierte Regeln',
        'Automatische Optimierung',
        'Integrationen (API)',
      ],
      cta: 'Professional wählen',
      popular: true,
    },
    {
      id: 4,
      name: 'Enterprise',
      monthlyPrice: 199,
      annualPrice: 1990,
      description: 'Für große Systeme',
      features: [
        'Alles aus Professional +',
        'White-Label Option',
        'Dedicated Account Manager',
        'Custom Integrations',
        'Advanced Security',
        'Unbegrenzte Devices',
        'SLA Guarantee (99.9%)',
        'Custom AI Models',
        '24/7 Phone Support',
      ],
      cta: 'Enterprise kontaktieren',
      popular: false,
    },
  ];

  return (
    <div className={`min-h-screen py-20 ${isDark ? 'bg-gradient-to-b from-slate-900 to-slate-950' : 'bg-gradient-to-b from-white to-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            <span className="text-brand-primary">CoreFlux KI</span> - Dein intelligenter Assistent
          </h1>
          <p className={`text-xl max-w-2xl mx-auto mb-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            AI-powered Energieoptimierung, Vorhersagen und Empfehlungen. Spare bis zu 40% bei Heizkosten! 🤖
          </p>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-l-lg font-bold transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-brand-primary text-white'
                  : isDark
                  ? 'dark:bg-slate-800 dark:text-slate-300'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              Monatlich
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-6 py-2 rounded-r-lg font-bold transition-all ${
                billingPeriod === 'annual'
                  ? 'bg-brand-primary text-white'
                  : isDark
                  ? 'dark:bg-slate-800 dark:text-slate-300'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              Jährlich (10% Rabatt)
            </button>
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {kiTiers.map((tier, idx) => {
            const displayPrice = billingPeriod === 'monthly' ? tier.monthlyPrice : tier.annualPrice;
            const pricePerMonth = billingPeriod === 'monthly' ? displayPrice : displayPrice / 12;

            return (
              <div
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={`relative group animate-slide-in-up rounded-2xl backdrop-blur-sm border overflow-hidden cursor-pointer transition-all ${
                  selectedTier === tier.id ? 'ring-2 ring-brand-primary' : ''
                } ${
                  tier.popular ? 'lg:scale-105 ring-2 ring-brand-primary' : ''
                } ${
                  isDark
                    ? 'dark:bg-slate-900/50 dark:border-slate-800 dark:hover:border-brand-primary'
                    : 'bg-white border-slate-200 hover:border-brand-primary'
                }`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-4 py-2 font-bold rounded-bl-lg text-sm">
                    ⭐ BELIEBTEST
                  </div>
                )}

                <div className="p-6">
                  <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {tier.name}
                  </h3>
                  <p className={`text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {tier.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-brand-primary">
                      €{displayPrice === 0 ? '0' : displayPrice}
                    </div>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {tier.monthlyPrice === 0 ? 'kostenlos' : `€${pricePerMonth.toFixed(2)}/Monat`}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <button
                    className={`w-full py-3 rounded-lg font-bold transition-all mb-6 ${
                      tier.popular
                        ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white hover:shadow-lg'
                        : isDark
                        ? 'dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700'
                        : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
                    }`}
                  >
                    {tier.cta}
                  </button>

                  {/* Features */}
                  <div className="space-y-3">
                    {tier.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-brand-primary flex-shrink-0" />
                        <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Features Showcase */}
        <div className={`rounded-2xl backdrop-blur-sm border p-12 mb-16 ${
          isDark
            ? 'dark:bg-slate-900/50 dark:border-slate-800'
            : 'bg-white border-slate-200'
        }`}>
          <h2 className={`text-3xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Was macht unsere KI so smart? 🧠
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '📊',
                title: 'Echtzeit-Analyse',
                desc: 'Überwache deine Heizanlage 24/7 mit detaillierten Statistiken und Alerts',
              },
              {
                icon: '🎯',
                title: 'Smart Predictions',
                desc: 'Vorhersagen für Wettermuster, Energieverbrauch und optimale Heizzeiten',
              },
              {
                icon: '⚡',
                title: 'Auto-Optimierung',
                desc: 'KI passt deine Heizung automatisch an für maximale Effizienz',
              },
              {
                icon: '💾',
                title: 'Anomalieerkennung',
                desc: 'Erkenne Probleme bevor sie teuer werden - Ausfallprävention 24/7',
              },
              {
                icon: '🌍',
                title: 'CO2 Tracking',
                desc: 'Sehe deine Umweltauswirkungen und wie viel du sparst',
              },
              {
                icon: '🔐',
                title: 'Sichere Daten',
                desc: 'Deine Daten sind verschlüsselt und auf deutschen Servern',
              },
            ].map((feature, i) => (
              <div key={i} className={`p-6 rounded-xl border ${
                isDark
                  ? 'dark:bg-slate-800/50 dark:border-slate-700'
                  : 'bg-slate-100 border-slate-300'
              }`}>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {feature.title}
                </h3>
                <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* KI Responses Demo */}
        <div className={`rounded-2xl backdrop-blur-sm border p-8 mb-16 ${
          isDark
            ? 'dark:bg-slate-900/50 dark:border-slate-800'
            : 'bg-white border-slate-200'
        }`}>
          <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            🤖 Was unsere KI dir sagt:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {kiFakeResponses.map((response, i) => (
              <div
                key={i}
                className={`p-4 rounded-lg border ${
                  isDark
                    ? 'dark:bg-slate-800/50 dark:border-slate-700'
                    : 'bg-slate-100 border-slate-300'
                }`}
              >
                <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                  {response}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className={`rounded-2xl backdrop-blur-sm border p-12 ${
          isDark
            ? 'dark:bg-slate-900/50 dark:border-slate-800'
            : 'bg-white border-slate-200'
        }`}>
          <h2 className={`text-3xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Häufig gestellte Fragen ❓
          </h2>

          <div className="space-y-6">
            {[
              {
                q: 'Funktioniert die KI auch ohne Heizung?',
                a: 'Ja! Unsere KI kann für alle Arten von Energiesystemen eingesetzt werden. Heizungen sind ein Use-Case, aber sie funktioniert auch für Solaranlagen, Wärmepumpen und mehr.',
              },
              {
                q: 'Wie viel kann ich mit der KI sparen?',
                a: 'Durchschnittlich 20-40% Einsparungen bei Heizkosten. Mit Smart Scheduling und Auto-Optimierung oft noch mehr.',
              },
              {
                q: 'Muss ich technisch versiert sein?',
                a: 'Nein! Unsere App ist sehr benutzerfreundlich. Einfach Installation, KI kümmert sich um den Rest.',
              },
              {
                q: 'Kann ich jederzeit kündigen?',
                a: 'Ja, monatlich kündbar. Bei Jahresverträgen gibt es eine 30-Tage-Kündigungsfrist.',
              },
              {
                q: 'Wo sind meine Daten?',
                a: 'Alle Daten werden auf deutschen Servern gespeichert und sind vollständig verschlüsselt. DSGVO konform.',
              },
              {
                q: 'Kostet die Integration mit Heizungen extra?',
                a: 'Nein! Heizungskäufer bekommen automatisch 10-50% KI-Rabatt (je nach Modell). Kostenlose Integration.',
              },
            ].map((item, i) => (
              <div key={i} className={`p-6 rounded-lg border ${
                isDark
                  ? 'dark:bg-slate-800/50 dark:border-slate-700'
                  : 'bg-slate-100 border-slate-300'
              }`}>
                <h3 className={`font-bold mb-3 text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {item.q}
                </h3>
                <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className={`mt-16 rounded-2xl backdrop-blur-sm border p-12 text-center bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 ${
          isDark
            ? 'dark:border-slate-800'
            : 'border-slate-200'
        }`}>
          <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Bereit, deine Energie zu optimieren? ⚡
          </h2>
          <p className={`text-lg mb-8 max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Starte kostenlos mit dem Free Plan oder upgraden Sie sofort auf Professional und sparen Sie monatlich!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-lg font-bold hover:shadow-lg transition-all">
              Kostenlos starten
            </button>
            <Link
              to="/heizungen"
              className="px-8 py-4 border-2 border-brand-primary text-brand-primary rounded-lg font-bold hover:bg-brand-primary hover:text-white transition-all"
            >
              Mit Heizung kaufen
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KIMarketplace;
