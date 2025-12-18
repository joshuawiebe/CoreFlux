import React, { useState } from 'react';
import { Check, TrendingUp, Zap, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Starter',
      description: 'Perfekt für erste Schritte',
      price: billingCycle === 'monthly' ? 29 : 290,
      features: [
        'Bis zu 5 Heizgeräte',
        'Basis-Dashboard',
        'Email Support',
        'Echtzeit-Überwachung',
        'Monatliche Reports',
        '99.5% Uptime Garantie',
      ],
      color: 'blue',
      highlighted: false,
    },
    {
      name: 'Professional',
      description: 'Für wachsende Netzwerke',
      price: billingCycle === 'monthly' ? 79 : 790,
      features: [
        'Bis zu 50 Heizgeräte',
        'Erweiterte Analysen',
        'Priority Support',
        'AI-Optimierung',
        'Wöchentliche Reports',
        '99.9% Uptime Garantie',
        'API-Zugriff',
        'Custom Alerts',
      ],
      color: 'purple',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      description: 'Für großflächige Deployment',
      price: 'Custom',
      features: [
        'Unbegrenzte Geräte',
        'Dedicated Account Manager',
        ' 24/7 Phone Support',
        'Custom Integration',
        'Tägliche Reports',
        '99.99% Uptime SLA',
        'White Label Option',
        'On-Premise Option',
      ],
      color: 'pink',
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 dark:text-white text-slate-900">
            Transparente Preise
          </h1>
          <p className="text-xl dark:text-slate-400 text-slate-600 mb-8">
            Wähle den perfekten Plan für dein dezentrales Heiznetzwerk
          </p>

          {/* Billing Toggle */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'dark:bg-brand-primary dark:text-white bg-brand-primary text-white'
                  : 'dark:bg-slate-800 dark:text-slate-400 bg-slate-200 text-slate-600'
              }`}
            >
              Monatlich
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                billingCycle === 'annual'
                  ? 'dark:bg-brand-primary dark:text-white bg-brand-primary text-white'
                  : 'dark:bg-slate-800 dark:text-slate-400 bg-slate-200 text-slate-600'
              }`}
            >
              Jährlich <span className="text-sm ml-2">-15%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative group animate-slide-in-up transition-all duration-300 ${
                plan.highlighted ? 'md:scale-105' : ''
              }`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {plan.highlighted && (
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-2xl opacity-50 group-hover:opacity-100 blur transition-all"></div>
              )}
              <div
                className={`relative p-8 rounded-2xl backdrop-blur-sm border transition-all h-full ${
                  plan.highlighted
                    ? 'dark:bg-slate-900 dark:border-brand-primary bg-white border-brand-primary'
                    : 'dark:bg-slate-900/50 dark:border-slate-800 bg-white border-slate-200'
                } hover:shadow-2xl`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-4 py-1 rounded-full text-sm font-bold">
                      Beliebteste Wahl
                    </span>
                  </div>
                )}

                <h3 className="text-2xl font-bold dark:text-white text-slate-900 mb-2">
                  {plan.name}
                </h3>
                <p className="dark:text-slate-400 text-slate-600 mb-6">{plan.description}</p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold dark:text-white text-slate-900">
                      {typeof plan.price === 'number' ? '€' : ''}{plan.price}
                    </span>
                    {typeof plan.price === 'number' && (
                      <span className="dark:text-slate-400 text-slate-600">/{billingCycle === 'monthly' ? 'Monat' : 'Jahr'}</span>
                    )}
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all mb-8 ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white hover:shadow-lg'
                      : 'dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 bg-slate-200 text-slate-900 hover:bg-slate-300'
                  }`}
                >
                  Jetzt Starten <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
                      <span className="dark:text-slate-300 text-slate-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center dark:text-white text-slate-900 mb-12">
            Häufig gestellte Fragen
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'Kann ich den Plan jederzeit wechseln?',
                a: 'Ja, du kannst deinen Plan jederzeit upgraden oder downgraden. Die Änderung wird im nächsten Abrechnungszyklus wirksam.',
              },
              {
                q: 'Gibt es eine kostenlose Testversion?',
                a: 'Ja, du erhältst 30 Tage kostenlos mit vollen Features. Keine Kreditkarte erforderlich!',
              },
              {
                q: 'Was passiert, wenn ich mein Abonnement kündige?',
                a: 'Du behältst bis zum Ende des aktuellen Abrechnungszeitraums Zugriff. Deine Daten bleiben 30 Tage erhalten.',
              },
              {
                q: 'Bietet ihr Rabatte für Jahresabonnements?',
                a: 'Ja! Bei Jahresabos sparst du 15% im Vergleich zu Monatsplänen.',
              },
            ].map((item, idx) => (
              <div key={idx} className="dark:bg-slate-900/50 dark:border-slate-800 bg-slate-50 border-slate-200 border rounded-lg p-6">
                <h3 className="font-semibold dark:text-white text-slate-900 mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-brand-primary" />
                  {item.q}
                </h3>
                <p className="dark:text-slate-400 text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
