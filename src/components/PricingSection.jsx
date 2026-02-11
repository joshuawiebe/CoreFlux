import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const PricingSection = () => {
  const { isDark } = useTheme();

  const plans = [
    {
      name: 'Starter',
      price: '29',
      description: 'Perfect for single heating systems',
      features: [
        'One heating system',
        'Basic AI automation',
        'Mobile app access',
        'Email support',
        'Monthly reports'
      ],
      cta: 'Get Started',
      highlighted: false
    },
    {
      name: 'Professional',
      price: '79',
      description: 'For homes and small businesses',
      features: [
        'Up to 5 heating systems',
        'Advanced AI with learning',
        'Real-time mobile alerts',
        'Priority email support',
        'Advanced analytics',
        'Custom schedules',
        'Integration API'
      ],
      cta: 'Get Started',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large deployments',
      features: [
        'Unlimited systems',
        'White-label options',
        'Phone & email support',
        'API access',
        'Custom integrations',
        'Dedicated account manager',
        'On-premise deployment'
      ],
      cta: 'Contact Sales',
      highlighted: false
    }
  ];

  return (
    <section className={`py-32 px-6 md:px-12 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className={`text-4xl md:text-5xl font-black mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            Simple, Transparent Pricing
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Start free, upgrade when you need more
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`p-8 rounded-xl border transition-all ${
                plan.highlighted
                  ? isDark
                    ? 'bg-blue-500/10 border-blue-500/50 ring-2 ring-blue-500/20'
                    : 'bg-blue-50 border-blue-200 ring-2 ring-blue-100'
                  : isDark
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
              }`}
            >
              {plan.highlighted && (
                <div className="mb-4 inline-block px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                {plan.name}
              </h3>
              <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {plan.description}
              </p>
              <div className="mb-8">
                <span className={`text-5xl font-black ${isDark ? 'text-white' : 'text-black'}`}>
                  €{plan.price}
                </span>
                {plan.price !== 'Custom' && <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>/month</span>}
              </div>
              <Link
                to="/login"
                className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 mb-8 transition-all ${
                  plan.highlighted
                    ? isDark
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                    : isDark
                    ? 'border border-gray-700 text-white hover:bg-gray-800'
                    : 'border border-gray-300 text-black hover:bg-gray-100'
                }`}
              >
                {plan.cta} <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="space-y-4">
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
