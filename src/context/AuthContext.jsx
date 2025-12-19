import { useState, useContext, createContext, useEffect } from 'react';

const AuthContext = createContext();

// Cookie-Funktionen
const setCookie = (name, value, days = 7) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Strict`;
};

const getCookie = (name) => {
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length);
    }
  }
  return null;
};

const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Lade User aus LocalStorage beim Start
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return !!savedUser;
  });

  useEffect(() => {
    // Speichere Scroll-Position
    const handleScroll = () => {
      if (isLoggedIn) {
        localStorage.setItem('scroll-position', window.scrollY);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoggedIn]);

  const login = (username, password, users) => {
    if (users[username] && users[username].password === password) {
      const newUser = {
        username,
        role: users[username].role,
        name: users[username].name,
      };
      setUser(newUser);
      setIsLoggedIn(true);
      
      // Speichere in LocalStorage und Cookie
      localStorage.setItem('user', JSON.stringify(newUser));
      setCookie('logged-in', 'true', 7);
      setCookie('username', username, 7);
      
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    
    // Lösche aus LocalStorage und Cookies
    localStorage.removeItem('user');
    localStorage.removeItem('scroll-position');
    deleteCookie('logged-in');
    deleteCookie('username');
  };

  // Stelle Scroll-Position wieder her, wenn User angemeldet ist
  useEffect(() => {
    if (isLoggedIn) {
      const savedScrollPosition = localStorage.getItem('scroll-position');
      if (savedScrollPosition) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedScrollPosition));
        }, 100);
      }
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
