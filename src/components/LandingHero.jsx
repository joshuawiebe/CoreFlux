import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const LandingHero = () => {
  const { isDark } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className={`relative min-h-screen w-full flex items-center ${isDark ? 'bg-slate-950' : 'bg-white'} overflow-hidden`}>
      {/* Subtle Glow */}
      <div className={`absolute top-1/3 right-1/4 w-72 h-72 ${isDark ? 'bg-brand-primary/10' : 'bg-brand-primary/5'} rounded-full blur-3xl pointer-events-none`}></div>

      {/* Content Container */}
      <motion.div
        className="container mx-auto px-6 md:px-12 relative z-10 flex justify-center md:justify-start"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-3xl text-center md:text-left">
          {/* Subtitle Accent */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center md:justify-start gap-3 mb-4"
          >
            <span className={`h-[1px] w-8 ${isDark ? 'bg-brand-primary/50' : 'bg-brand-primary/40'}`}></span>
            <span className={`text-brand-primary text-xs font-black uppercase tracking-[0.4em] ${isDark ? '' : ''}`}>
              Future of Heating
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className={`mb-6 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none uppercase tracking-tighter ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Your Heat
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-600">
              Thinks Along
            </span>
            <br />
            With You
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className={`mb-10 text-lg md:text-xl ${isDark ? 'text-slate-300' : 'text-slate-700'} leading-relaxed max-w-2xl font-light`}
          >
            Smart heating system that becomes yours. Sustainable AI that saves you money. All data encrypted in Germany.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <a
              href="/#chat-section"
              className="group relative px-8 py-4 bg-brand-primary text-white font-black uppercase text-xs tracking-widest rounded-lg overflow-hidden transition-all hover:shadow-xl shadow-lg"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>

            <a
              href="/#benefits-section"
              className={`group relative px-8 py-4 font-black uppercase text-xs tracking-widest rounded-lg border-2 border-brand-primary transition-all ${
                isDark
                  ? 'text-brand-primary hover:bg-slate-800/50'
                  : 'text-brand-primary hover:bg-blue-50'
              }`}
            >
              <span className="relative z-10">Learn More</span>
            </a>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-col sm:flex-row gap-8 justify-center md:justify-start"
          >
            {[
              { num: '50%', label: 'Heating Savings' },
              { num: '€0', label: 'Device Cost' },
              { num: '100%', label: 'Encrypted' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center md:text-left">
                <p className="text-3xl font-black text-brand-primary">{stat.num}</p>
                <p className={`text-sm mt-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingHero;
