import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // Lade das gespeicherte Theme aus LocalStorage oder Standard auf true
    const savedTheme = localStorage.getItem('theme-mode');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Fallback: Prüfe OS-Einstellung
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Speichere Theme-Änderungen in LocalStorage
    localStorage.setItem('theme-mode', isDark ? 'dark' : 'light');
    
    // Wende Theme auf document an
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

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
