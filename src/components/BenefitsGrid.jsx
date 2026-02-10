import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Lock, Globe, Clock, Shield, TrendingUp, BarChart3, Flame } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const BenefitsGrid = () => {
  const { isDark } = useTheme();

  const benefits = [
    { icon: Zap, title: '50% Savings', desc: 'Reduce heating costs dramatically' },
    { icon: Lock, title: '100% Encrypted', desc: 'Military-grade data protection' },
    { icon: Globe, title: 'German Made', desc: 'Secure EU infrastructure only' },
    { icon: Clock, title: 'Lifetime Support', desc: 'Guaranteed support forever' },
    { icon: Shield, title: 'Zero Risk', desc: 'Money-back guarantee included' },
    { icon: TrendingUp, title: 'Own It', desc: 'Device becomes yours in 3-5 years' },
    { icon: BarChart3, title: 'Real Savings', desc: '€50-400/month average savings' },
    { icon: Flame, title: 'Sustainable', desc: '100% recyclable & eco-friendly' },
  ];

  return (
    <section id="benefits-section" className={`py-24 ${isDark ? 'bg-slate-900' : 'bg-slate-50'} overflow-hidden relative border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`text-sm font-black text-brand-primary uppercase tracking-[0.3em] mb-4`}>
            Why Choose Us
          </h2>
          <h3 className={`text-4xl md:text-6xl font-black leading-tight tracking-tighter ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Why CoreFlux?
          </h3>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-xl text-center ${
                  isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:shadow-lg'
                } transition-all border ${isDark ? 'border-slate-700' : 'border-slate-200'}`}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="mb-3"
                >
                  <Icon className="w-8 h-8 text-brand-primary mx-auto" />
                </motion.div>
                <h4 className={`font-black text-lg mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {benefit.title}
                </h4>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {benefit.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsGrid;
