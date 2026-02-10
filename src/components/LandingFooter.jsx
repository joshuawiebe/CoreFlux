import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const LandingFooter = () => {
  const { isDark } = useTheme();

  return (
    <footer className={`border-t ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} py-12`}>
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-8 mb-8"
        >
          <div>
            <h3 className={`font-black text-lg mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Core<span className="text-brand-primary">Flux</span>
            </h3>
            <p className={isDark ? 'text-slate-400 text-sm' : 'text-slate-600 text-sm'}>
              Smart heating. Sustainable AI. ♻️
            </p>
          </div>
          <div>
            <h4 className={`font-black text-sm uppercase tracking-wider mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Product
            </h4>
            <div className="space-y-2">
              <Link to="/pricing" className={`block text-sm transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
                Pricing
              </Link>
              <Link to="/ai-chat" className={`block text-sm transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
                AI Chat
              </Link>
            </div>
          </div>
          <div>
            <h4 className={`font-black text-sm uppercase tracking-wider mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Company
            </h4>
            <div className="space-y-2">
              <Link to="/team" className={`block text-sm transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
                Team
              </Link>
              <Link to="/impressum" className={`block text-sm transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
                Impressum
              </Link>
            </div>
          </div>
          <div>
            <h4 className={`font-black text-sm uppercase tracking-wider mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Legal
            </h4>
            <Link to="/privacy" className={`block text-sm transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
              Privacy
            </Link>
          </div>
        </motion.div>
        <div className={`border-t pt-8 text-center text-sm ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'}`}>
          <p>© 2026 CoreFlux GmbH. Built for a sustainable future. 🚀</p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
