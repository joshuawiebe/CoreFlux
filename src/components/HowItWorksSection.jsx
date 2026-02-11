import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Smartphone, Zap, Brain, BarChart3 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const HowItWorksSection = () => {
  const { isDark } = useTheme();

  const steps = [
    {
      number: '01',
      icon: Smartphone,
      title: 'Install & Connect',
      description: 'Hook up the CoreFlux device to your heating system. Mobile app guides you through setup.'
    },
    {
      number: '02',
      icon: Brain,
      title: 'AI Learns',
      description: 'The system learns your routines, preferences, and local weather patterns over 2-3 weeks.'
    },
    {
      number: '03',
      icon: Zap,
      title: 'Smart Automation',
      description: 'AI automatically optimizes heating cycles, reducing energy waste without sacrificing comfort.'
    },
    {
      number: '04',
      icon: BarChart3,
      title: 'Track & Save',
      description: 'Monitor real-time energy usage, predict costs, and see your month-over-month savings.'
    }
  ];

  return (
    <section className={`py-32 px-6 md:px-12 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className={`text-4xl md:text-5xl font-black mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            How CoreFlux Works
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Simple, intelligent, and automated
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Steps */}
          <div className="space-y-8">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-6"
              >
                <div className="flex-shrink-0">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${
                    isDark
                      ? 'bg-blue-500/10 border-blue-500/30'
                      : 'bg-blue-50 border-blue-200'
                  }`}>
                    <step.icon className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                    {step.title}
                  </h3>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Visual representation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`p-8 rounded-xl border ${
              isDark
                ? 'bg-gray-900 border-gray-800'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🔄</div>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Continuous Learning & Optimization
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
