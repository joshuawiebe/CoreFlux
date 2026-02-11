import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, TrendingUp, Shield, Smartphone, BarChart3, CheckCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const FeaturesSection = () => {
  const { isDark } = useTheme();

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Heating Control',
      description: 'Distributed AI learns your patterns and optimizes heating in real-time. No cloud, no surveillance.'
    },
    {
      icon: TrendingUp,
      title: 'Save Up to 30% Energy',
      description: 'Smart automation reduces unnecessary heating cycles and adapts to weather conditions.'
    },
    {
      icon: Shield,
      title: 'German Privacy Standard',
      description: 'All data stays in Germany. End-to-end encryption. No third-party tracking.'
    },
    {
      icon: Smartphone,
      title: 'Mobile Control & Monitoring',
      description: 'Control your heating from anywhere. Real-time alerts and detailed analytics.'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Understand your heating patterns with detailed reports and cost breakdowns.'
    },
    {
      icon: Zap,
      title: 'Instant Integration',
      description: 'Works with most heating systems. Easy setup in under 30 minutes.'
    }
  ];

  return (
    <section id="features" className={`py-32 px-6 md:px-12 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className={`text-4xl md:text-5xl font-black mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            Everything You Need
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Professional heating automation with privacy-first design
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`p-8 rounded-xl border transition-all hover:shadow-lg ${
                isDark
                  ? 'bg-gray-800 border-gray-700 hover:border-blue-500/50'
                  : 'bg-white border-gray-200 hover:border-blue-500/50'
              }`}
            >
              <feature.icon className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-black'}`}>
                {feature.title}
              </h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
