import React, { useState } from 'react';
import { USERS } from '../utils/mockData';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, LogIn, Eye, EyeOff, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDemoHint, setShowDemoHint] = useState(false);
  const { login } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (login(username, password, USERS)) {
        navigate('/dashboard');
      } else {
        setError('Ungültige Anmeldedaten. Versuche einen der Demo-Accounts.');
      }
      setIsLoading(false);
    }, 500);
  };

  const handleDemoLogin = (user) => {
    setUsername(user);
    setPassword(USERS[user].password);
    setError('');
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors ${
      isDark ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' : 'bg-gradient-to-br from-white via-slate-50 to-white'
    }`}>
      <div className="w-full max-w-md z-10 animate-slide-in-up">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Core<span className="text-brand-primary">Flux</span>
              </h1>
              <p className={`text-xs tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                AI HEATING NETWORK
              </p>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div className={`rounded-2xl p-8 backdrop-blur-sm border transition-all ${
          isDark
            ? 'bg-slate-900/50 border-slate-800 shadow-2xl'
            : 'bg-white border-slate-200 shadow-lg'
        }`}>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-600 dark:text-red-400 text-sm animate-slide-in-down">
                {error}
              </div>
            )}

            {/* Email Input */}
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Benutzername
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-3.5 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                  }`}
                  placeholder="admin, user oder demo"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Passwort
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-3.5 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                  }`}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-3.5 ${isDark ? 'text-slate-500 hover:text-slate-400' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-50"
            >
              <LogIn className="w-5 h-5" />
              {isLoading ? 'Wird angemeldet...' : 'Anmelden'}
            </button>
          </form>

          {/* Demo Hint */}
          <div className="mt-8 pt-8 border-t dark:border-slate-700 border-slate-200">
            <button
              type="button"
              onClick={() => setShowDemoHint(!showDemoHint)}
              className={`w-full text-sm font-semibold mb-3 ${isDark ? 'text-brand-primary hover:text-blue-400' : 'text-brand-primary hover:text-blue-600'}`}
            >
              {showDemoHint ? '▼ Demo-Accounts verbergen' : '▶ Demo-Accounts anzeigen'}
            </button>
            
            {showDemoHint && (
              <div className="space-y-2 animate-slide-in-down">
                {Object.entries(USERS).map(([user, data]) => (
                  <button
                    key={user}
                    onClick={() => handleDemoLogin(user)}
                    disabled={isLoading}
                    className={`w-full text-left p-3 rounded-lg border transition-all text-sm ${
                      isDark
                        ? 'dark:bg-slate-800/50 dark:border-slate-700 dark:hover:border-brand-primary dark:hover:bg-slate-800'
                        : 'bg-slate-50 border-slate-200 hover:border-brand-primary hover:bg-slate-100'
                    }`}
                  >
                    <p className={`font-mono text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {user} / {data.password}
                    </p>
                    <p className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                      {data.role.toUpperCase()} — {data.name}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className={`text-center text-xs mt-8 ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
          Demo-Version • Für Schulprojekte und Präsentationen
        </p>
      </div>
    </div>
  );
};

export default Login;
