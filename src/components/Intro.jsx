import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Intro = ({ onComplete }) => {
  const text = 'CoreFlux';

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{
        y: '-100%',
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      {/* Background glow effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.15, 0.1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 bg-radial-gradient from-brand-primary/20 via-transparent to-transparent pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 150, 255, 0.2), transparent)',
        }}
      />

      {/* Logo with glow */}
      <div className="relative mb-8">
        <motion.div
          className="absolute -inset-4 bg-brand-primary/30 blur-3xl rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
        <motion.div
          className="relative w-20 h-20 flex items-center justify-center z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'backOut' }}
        >
          <div className="text-4xl font-bold text-brand-primary">⚡</div>
        </motion.div>
      </div>

      {/* Typewriter text */}
      <div className="relative overflow-hidden flex h-20 items-center">
        <div className="flex">
          {text.split('').map((char, index) => (
            <motion.span
              key={index}
              className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase inline-block"
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08 + 0.8,
                ease: 'easeOut',
              }}
            >
              {char === 'F' ? (
                <span className="text-brand-primary">{char}</span>
              ) : (
                char
              )}
            </motion.span>
          ))}
        </div>

        {/* Progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-brand-primary"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.2, ease: 'easeInOut' }}
        />
      </div>

      {/* Tagline */}
      <motion.p
        className="mt-8 text-slate-400 text-sm tracking-widest uppercase font-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        Your Heat Thinks Along
      </motion.p>
    </motion.div>
  );
};

export default Intro;
