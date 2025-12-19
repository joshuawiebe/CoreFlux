/**
 * LocalStorage und Cookie Management Utility
 * Speichert und verwaltet persistente App-Daten
 */

// LocalStorage Keys
export const STORAGE_KEYS = {
  USER: 'user',
  THEME_MODE: 'theme-mode',
  LANGUAGE: 'language',
  SCROLL_POSITION: 'scroll-position',
  PREFERENCES: 'preferences',
  DEVICE_SETTINGS: 'device-settings',
};

// LocalStorage Funktionen
export const storage = {
  setUser: (user) => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  },

  getUser: () => {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  },

  setTheme: (theme) => {
    localStorage.setItem(STORAGE_KEYS.THEME_MODE, theme);
  },

  getTheme: () => {
    return localStorage.getItem(STORAGE_KEYS.THEME_MODE) || 'dark';
  },

  setLanguage: (language) => {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
  },

  getLanguage: () => {
    return localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'de';
  },

  setScrollPosition: (position) => {
    localStorage.setItem(STORAGE_KEYS.SCROLL_POSITION, position.toString());
  },

  getScrollPosition: () => {
    const position = localStorage.getItem(STORAGE_KEYS.SCROLL_POSITION);
    return position ? parseInt(position) : 0;
  },

  setPreferences: (preferences) => {
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(preferences));
  },

  getPreferences: () => {
    const prefs = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
    return prefs ? JSON.parse(prefs) : {};
  },

  setDeviceSettings: (settings) => {
    localStorage.setItem(STORAGE_KEYS.DEVICE_SETTINGS, JSON.stringify(settings));
  },

  getDeviceSettings: () => {
    const settings = localStorage.getItem(STORAGE_KEYS.DEVICE_SETTINGS);
    return settings ? JSON.parse(settings) : {};
  },

  clearAll: () => {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  },
};

// Cookie Funktionen
export const cookies = {
  set: (name, value, days = 7) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Strict`;
  },

  get: (name) => {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length);
      }
    }
    return null;
  },

  delete: (name) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  },

  clearAll: () => {
    document.cookie.split(';').forEach((c) => {
      const cookieName = c.split('=')[0].trim();
      cookies.delete(cookieName);
    });
  },
};

// Persistence Manager
export const persistenceManager = {
  // Speichere Login-Session
  saveSession: (user) => {
    storage.setUser(user);
    cookies.set('logged-in', 'true', 7);
    if (user?.username) {
      cookies.set('username', user.username, 7);
    }
  },

  // Lade Login-Session
  loadSession: () => {
    const isLoggedIn = cookies.get('logged-in') === 'true';
    const user = storage.getUser();
    return { isLoggedIn, user };
  },

  // Lösche Session
  clearSession: () => {
    storage.setUser(null);
    storage.setScrollPosition(0);
    cookies.delete('logged-in');
    cookies.delete('username');
  },

  // Speichere Theme und Sprache
  saveAppSettings: (theme, language) => {
    storage.setTheme(theme);
    storage.setLanguage(language);
    cookies.set('theme', theme, 30);
    cookies.set('language', language, 30);
  },

  // Lade App Settings
  loadAppSettings: () => {
    return {
      theme: storage.getTheme(),
      language: storage.getLanguage(),
    };
  },

  // Speichere Benutzer-Präferenzen
  saveUserPreferences: (preferences) => {
    storage.setPreferences({
      ...storage.getPreferences(),
      ...preferences,
    });
  },

  // Lade Benutzer-Präferenzen
  loadUserPreferences: () => {
    return storage.getPreferences();
  },

  // Exportiere alle Daten (für Debug/Export)
  exportAllData: () => {
    return {
      user: storage.getUser(),
      theme: storage.getTheme(),
      language: storage.getLanguage(),
      preferences: storage.getPreferences(),
      deviceSettings: storage.getDeviceSettings(),
      timestamp: new Date().toISOString(),
    };
  },

  // Importiere Daten (für Recovery/Import)
  importData: (data) => {
    if (data.user) storage.setUser(data.user);
    if (data.theme) storage.setTheme(data.theme);
    if (data.language) storage.setLanguage(data.language);
    if (data.preferences) storage.setPreferences(data.preferences);
    if (data.deviceSettings) storage.setDeviceSettings(data.deviceSettings);
  },
};

export default {
  storage,
  cookies,
  persistenceManager,
};
