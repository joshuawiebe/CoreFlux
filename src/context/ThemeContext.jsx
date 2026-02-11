import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // 1. Check localStorage first (user preference)
    const savedTheme = localStorage.getItem('theme-preference');
    if (savedTheme !== null) {
      return savedTheme === 'dark';
    }
    
    // 2. Check system preference
    if (window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    // 3. Default to light mode
    return false;
  });

  // Apply theme to document root
  useEffect(() => {
    const root = document.documentElement;
    
    if (isDark) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [isDark]);

  // Save preference to localStorage when toggled
  useEffect(() => {
    localStorage.setItem('theme-preference', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Listen for system theme changes when no user preference is set
  useEffect(() => {
    if (!window.matchMedia) return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      const hasUserPreference = localStorage.getItem('theme-preference');
      // Only auto-switch if user hasn't manually set preference
      if (!hasUserPreference) {
        setIsDark(e.matches);
      }
    };
    
    // Modern API (addEventListener)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } 
    // Fallback for older browsers
    else {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(prevState => !prevState);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
