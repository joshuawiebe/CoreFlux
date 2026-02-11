import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import SignupFormPro from '../components/SignupFormPro';

const SignupPagePro = () => {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800' 
        : 'bg-gradient-to-br from-slate-50 via-white to-slate-50'
    }`}>
      {/* Animated background elements */}
      <motion.div
        className={`fixed inset-0 pointer-events-none overflow-hidden ${isDark ? 'opacity-20' : 'opacity-5'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isDark ? 0.2 : 0.05 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl bg-brand-primary"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl bg-brand-accent"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10">
        <SignupFormPro />
      </div>
    </div>
  );
};

export default SignupPagePro;
