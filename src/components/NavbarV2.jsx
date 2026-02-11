import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { LogOut, Settings, Menu, X, Moon, Sun, Home, MessageCircle, User, BarChart3, Zap } from 'lucide-react';
import darkLogo from '../assets/dark.png';
import lightLogo from '../assets/light.png';
import LanguageSelector from './LanguageSelector';

const ProfessionalNavbar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const publicNavItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/pricing', label: 'Pricing', icon: BarChart3 },
  ];

  const authNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/ai-chat', label: 'AI Chat', icon: MessageCircle },
    { path: '/devices', label: 'Devices', icon: Zap },
  ];

  const navItems = isLoggedIn ? authNavItems : publicNavItems;
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowUserMenu(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b transition-colors duration-300 ${
      isDark
        ? 'bg-slate-900/80 border-slate-800'
        : 'bg-white/80 border-slate-200'
    }`}>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-2 group flex-shrink-0">
            <img 
              src={isDark ? darkLogo : lightLogo} 
              alt="CoreFlux" 
              className="h-8 group-hover:scale-105 transition-transform"
            />
            <span className={`font-black hidden sm:inline text-lg ${isDark ? 'text-white' : 'text-black'}`}>
              Core<span className="text-brand-primary">Flux</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
                  isActive(item.path)
                    ? isDark 
                      ? 'text-white bg-slate-800' 
                      : 'text-slate-900 bg-slate-100'
                    : isDark 
                      ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Menu */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Language Selector */}
            <LanguageSelector />
            
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors hidden sm:inline-flex ${
                isDark
                  ? 'hover:bg-slate-800 text-yellow-400'
                  : 'hover:bg-slate-100 text-slate-700'
              }`}
              title={isDark ? 'Light Mode' : 'Dark Mode'}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>

            {isLoggedIn ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`px-3 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 transition-all ${
                    isDark
                      ? 'text-slate-300 hover:bg-slate-800 bg-slate-700/50'
                      : 'text-slate-700 hover:bg-slate-100 bg-slate-200/50'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{user?.firstName || 'Account'}</span>
                </motion.button>

                {/* User Menu Dropdown */}
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border ${
                      isDark
                        ? 'bg-slate-800 border-slate-700'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <Link
                      to="/settings"
                      className={`block px-4 py-2 text-sm rounded-t-lg transition-colors flex items-center gap-2 ${
                        isDark
                          ? 'hover:bg-slate-700 text-slate-300 hover:text-white'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className={`w-full text-left px-4 py-2 text-sm rounded-b-lg transition-colors flex items-center gap-2 ${
                        isDark
                          ? 'hover:bg-red-900/20 text-red-400 hover:text-red-300'
                          : 'hover:bg-red-50 text-red-600 hover:text-red-700'
                      }`}
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/login"
                  className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
                    isDark
                      ? 'text-slate-300 hover:bg-slate-800'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-lg font-semibold text-sm bg-gradient-to-r from-brand-primary to-brand-accent text-white hover:shadow-lg transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isDark
                  ? 'hover:bg-slate-800'
                  : 'hover:bg-slate-100'
              }`}
            >
              {mobileMenuOpen ? (
                <X className={`w-5 h-5 ${isDark ? 'text-white' : 'text-slate-900'}`} />
              ) : (
                <Menu className={`w-5 h-5 ${isDark ? 'text-white' : 'text-slate-900'}`} />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`lg:hidden mt-4 pt-4 border-t ${
              isDark
                ? 'border-slate-800'
                : 'border-slate-200'
            }`}
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 font-medium text-sm transition-colors rounded-lg flex items-center gap-2 mb-2 ${
                  isActive(item.path)
                    ? isDark 
                      ? 'bg-slate-800 text-white' 
                      : 'bg-slate-100 text-slate-900'
                    : isDark 
                      ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}

            {/* Mobile Auth Section */}
            <div className="mt-4 pt-4 border-t" style={{ borderColor: isDark ? 'rgb(30, 41, 59)' : 'rgb(226, 232, 240)' }}>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className={`w-full px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 justify-center ${
                    isDark
                      ? 'text-red-400 hover:bg-red-900/20'
                      : 'text-red-600 hover:bg-red-50'
                  }`}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block w-full px-4 py-2 rounded-lg font-semibold text-sm text-center transition-all mb-2 ${
                      isDark
                        ? 'text-slate-300 hover:bg-slate-800'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full px-4 py-2 rounded-lg font-semibold text-sm bg-gradient-to-r from-brand-primary to-brand-accent text-white text-center hover:shadow-lg transition-all"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default ProfessionalNavbar;
