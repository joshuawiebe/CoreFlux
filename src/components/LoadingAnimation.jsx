import React from 'react';
import { useTheme } from '../context/ThemeContext';

const LoadingAnimation = () => {
  const { isDark } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Animated Spinner */}
      <div className="relative w-16 h-16">
        {/* Outer ring */}
        <div
          className={`absolute inset-0 rounded-full border-4 border-transparent ${
            isDark ? 'border-t-brand-primary' : 'border-t-brand-primary'
          } animate-spin`}
          style={{ animationDuration: '1s' }}
        />
        {/* Middle ring */}
        <div
          className={`absolute inset-2 rounded-full border-4 border-transparent ${
            isDark ? 'border-b-brand-accent' : 'border-b-brand-accent'
          } animate-spin`}
          style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}
        />
        {/* Inner pulsing dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`w-3 h-3 rounded-full ${
              isDark ? 'bg-brand-primary' : 'bg-brand-primary'
            } animate-pulse`}
          />
        </div>
      </div>

      {/* Loading text with animation */}
      <div className={`text-center ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
        <p className="font-semibold">Wird geladen</p>
        <div className="flex justify-center gap-1 mt-2">
          <span className="inline-block animate-bounce" style={{ animationDelay: '0s' }}>
            .
          </span>
          <span className="inline-block animate-bounce" style={{ animationDelay: '0.1s' }}>
            .
          </span>
          <span className="inline-block animate-bounce" style={{ animationDelay: '0.2s' }}>
            .
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
