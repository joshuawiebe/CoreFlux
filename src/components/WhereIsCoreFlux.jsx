import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Flame } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const WhereIsCoreFlux = () => {
  const { isDark } = useTheme();

  return (
    <section className={`py-24 ${isDark ? 'bg-slate-900' : 'bg-slate-50'} text-white overflow-hidden relative border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Text Content */}
          <div className="lg:w-1/2">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`text-sm font-black ${isDark ? 'text-brand-primary' : 'text-brand-primary'} uppercase tracking-[0.3em] mb-4`}
            >
              Why CoreFlux?
            </motion.h2>
            
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              A Name That <span className={`${isDark ? 'text-brand-primary' : 'text-brand-primary'}`}>Explains</span> Everything
            </motion.h3>

            {/* CORE/FLUX cards */}
            <div className="space-y-4">
              {[
                {
                  title: 'CORE',
                  icon: Cpu,
                  items: ['CPU Core – Computing power', 'Drive System – The engine', 'Nucleus – Heart of innovation'],
                  color: 'from-brand-primary'
                },
                {
                  title: 'FLUX',
                  icon: Flame,
                  items: ['Heat Flow – Your warmth', 'Energy Flow – Power distributed', 'Data Flow – Intelligence flows'],
                  color: 'from-blue-500'
                }
              ].map((block, idx) => {
                const Icon = block.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className={`p-6 rounded-xl border-l-4 ${
                      isDark ? 'bg-slate-800 border-brand-primary' : 'bg-white border-brand-primary'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className="w-6 h-6 text-brand-primary" />
                      <h4 className={`font-black text-xl tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {block.title}
                      </h4>
                    </div>
                    <ul className={`space-y-2 text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      {block.items.map((item, jdx) => (
                        <li key={jdx}>✓ {item}</li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right: Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <div className={`relative rounded-2xl overflow-hidden border ${isDark ? 'border-slate-700' : 'border-slate-200'} shadow-2xl`}>
              <div className={`absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-transparent`}></div>
              <div className={`relative p-12 text-center ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
                <div className="flex justify-center gap-8 mb-8">
                  <div className="text-center">
                    <Cpu className="w-16 h-16 text-brand-primary mx-auto mb-3" />
                    <p className={`font-black uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>Core</p>
                    <p className={`text-sm mt-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Computing</p>
                  </div>
                  <div className={`flex items-center text-4xl font-black ${isDark ? 'text-slate-600' : 'text-slate-300'}`}>
                    +
                  </div>
                  <div className="text-center">
                    <Flame className="w-16 h-16 text-blue-500 mx-auto mb-3" />
                    <p className={`font-black uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>Flux</p>
                    <p className={`text-sm mt-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Heat Energy</p>
                  </div>
                </div>
                <div className={`text-2xl font-black ${isDark ? 'text-brand-primary' : 'text-brand-primary'}`}>
                  = Sustainable Future ♻️
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhereIsCoreFlux;
