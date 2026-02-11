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

  const signup = async (credentials) => {
    try {
      // Validate required fields
      if (!credentials.email || !credentials.password) {
        throw new Error('Email and password are required');
      }

      // Create new user object with all provided information
      const newUser = {
        id: `user_${Date.now()}`,
        firstName: credentials.firstName || '',
        lastName: credentials.lastName || '',
        email: credentials.email,
        role: credentials.role || 'user',
        company: credentials.company || '',
        dateOfBirth: credentials.dateOfBirth || '',
        phone: credentials.phone || '',
        address: credentials.address || '',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };
      
      // Set user and logged in state
      setUser(newUser);
      setIsLoggedIn(true);
      
      // Persist in LocalStorage
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('user-email', credentials.email);
      localStorage.setItem('auth-token', `token_${Date.now()}`);
      
      // Set cookies for sessions
      setCookie('logged-in', 'true', 30);
      setCookie('user-email', credentials.email, 30);
      setCookie('user-id', newUser.id, 30);
      
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

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
    deleteCookie('user-email');
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
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, signup }}>
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
