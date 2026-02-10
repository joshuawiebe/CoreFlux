import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Cpu, TrendingUp, Shield } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const HowItWorks = () => {
  const { isDark } = useTheme();

  const steps = [
    { num: '01', icon: Flame, title: 'Install CoreFlux', desc: 'Professional installation replaces your old heating system with our revolutionary AI-powered device.' },
    { num: '02', icon: Cpu, title: 'Heat & Compute', desc: 'Your system heats your home while simultaneously running AI computations for German infrastructure.' },
    { num: '03', icon: TrendingUp, title: 'Save Immediately', desc: 'Start saving €50-400/month instantly. 50% off AI services included with every device.' },
    { num: '04', icon: Shield, title: 'Own It Forever', desc: 'After 3-5 years, the device is completely yours. Enjoy decades of free heat and AI discounts.' },
  ];

  return (
    <section className={`py-24 ${isDark ? 'bg-slate-950' : 'bg-white'} overflow-hidden relative border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
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
            Process
          </h2>
          <h3 className={`text-4xl md:text-6xl font-black leading-tight tracking-tighter ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            How It Works
          </h3>
        </motion.div>

        {/* Timeline Steps */}
        <div className="max-w-4xl mx-auto">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="mb-8 last:mb-0"
              >
                <div className={`p-8 rounded-xl border-l-4 border-brand-primary flex gap-6 items-start ${
                  isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-50 hover:bg-white'
                } transition-all`}>
                  {/* Step Number & Icon */}
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center font-black text-2xl ${
                      isDark ? 'bg-brand-primary/20 text-brand-primary' : 'bg-brand-primary/10 text-brand-primary'
                    }`}>
                      {step.num}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <div className="flex items-start gap-3 mb-2">
                      <Icon className="w-6 h-6 text-brand-primary mt-0.5 flex-shrink-0" />
                      <h4 className={`font-black text-xl leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {step.title}
                      </h4>
                    </div>
                    <p className={`text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      {step.desc}
                    </p>
                  </div>

                  {/* Connector Line */}
                  {idx < steps.length - 1 && (
                    <div className={`absolute left-[3rem] top-full w-0.5 h-8 ${isDark ? 'bg-slate-700' : 'bg-slate-200'} ml-8`}></div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
