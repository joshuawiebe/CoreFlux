import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Brain, Lock, TrendingUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const LandingHeroV2 = () => {
  const { isDark } = useTheme();

  return (
    <div className={`relative min-h-screen w-full flex items-center pt-20 pb-40 px-6 md:px-12 ${
      isDark ? 'bg-black' : 'bg-white'
    } overflow-hidden`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl ${
          isDark ? 'bg-blue-600/10' : 'bg-blue-500/5'
        }`} />
        <div className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl ${
          isDark ? 'bg-purple-600/10' : 'bg-purple-500/5'
        }`} />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-6xl mx-auto w-full"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${
            isDark
              ? 'bg-white/5 border-white/10 text-white/70'
              : 'bg-black/5 border-black/10 text-black/70'
          } text-sm font-medium`}>
            <Zap className="w-4 h-4 text-blue-500" />
            Smart Heating Meets Distributed AI
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`text-5xl md:text-7xl font-black text-center mb-6 leading-tight ${
            isDark ? 'text-white' : 'text-black'
          }`}
        >
          Your heating system{' '}
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 bg-clip-text text-transparent">
            thinks with you
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`text-xl text-center mb-12 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          } max-w-2xl mx-auto`}
        >
          Intelligent heating automation powered by distributed AI. Save energy, reduce costs, stay warm. All your data encrypted in Germany.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
        >
          <Link
            to="/login"
            className={`px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
              isDark
                ? 'bg-white text-black hover:bg-gray-100'
                : 'bg-black text-white hover:bg-gray-900'
            }`}
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#features"
            className={`px-8 py-4 rounded-lg font-semibold border transition-all ${
              isDark
                ? 'border-white/20 text-white hover:bg-white/5'
                : 'border-black/20 text-black hover:bg-black/5'
            }`}
          >
            Learn More
          </a>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-20"
        >
          {[
            { icon: Brain, label: 'AI-Powered', desc: 'Smart automation' },
            { icon: Lock, label: 'German Privacy', desc: 'Data secured locally' },
            { icon: TrendingUp, label: 'Save 30%', desc: 'On heating costs' },
            { icon: Zap, label: 'Real-Time', desc: 'Live monitoring' }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + idx * 0.1 }}
              className={`p-4 rounded-lg border ${
                isDark
                  ? 'bg-white/5 border-white/10 hover:bg-white/10'
                  : 'bg-black/5 border-black/10 hover:bg-black/10'
              } transition-all`}
            >
              <feature.icon className="w-6 h-6 mb-3 text-blue-500" />
              <div className="font-semibold mb-1">{feature.label}</div>
              <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                {feature.desc}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial / Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className={`text-center py-8 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}
        >
          <p className={`text-sm mb-4 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
            Trusted by homeowners and businesses across Germany
          </p>
          <div className="flex justify-center gap-3">
            {['⭐⭐⭐⭐⭐', '100+ Users', 'German-Made'].map((stat, idx) => (
              <span key={idx} className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                {stat}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingHeroV2;
