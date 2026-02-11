import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { LogOut, BarChart3, Settings, Menu, X, Moon, Sun, Home, MessageCircle } from 'lucide-react';
import darkLogo from '../assets/dark.png';
import lightLogo from '../assets/light.png';
import LanguageSelector from './LanguageSelector';

const ProfessionalNavbar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const publicNavItems = [
    { path: '/', label: 'Home' },
    { path: '/pricing', label: 'Pricing' },
  ];

  const authNavItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/ai-chat', label: 'AI Chat' },
    { path: '/devices', label: 'Devices' },
  ];

  const navItems = isLoggedIn ? authNavItems : publicNavItems;
  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b transition-colors ${
      isDark
        ? 'bg-black/50 border-gray-800/50'
        : 'bg-white/50 border-gray-200/50'
    }`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-3 group">
            <img 
              src={isDark ? darkLogo : lightLogo} 
              alt="CoreFlux" 
              className="h-8 group-hover:scale-105 transition-transform"
            />
            <span className={`font-black hidden sm:inline text-lg ${isDark ? 'text-white' : 'text-black'}`}>
              Core<span className="text-blue-500">Flux</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative font-medium text-sm transition-colors ${
                  isActive(item.path)
                    ? isDark ? 'text-white' : 'text-black'
                    : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
                }`}
              >
                {item.label}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="navbar_underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Menu */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <LanguageSelector />
            
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? 'hover:bg-gray-900'
                  : 'hover:bg-gray-100'
              }`}
              title={isDark ? 'Light Mode' : 'Dark Mode'}
            >
              {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
            </motion.button>

            {isLoggedIn ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className={`px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 transition-all ${
                  isDark
                    ? 'text-gray-400 hover:text-red-400 hover:bg-red-900/10'
                    : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </motion.button>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    isDark
                      ? 'text-white hover:bg-gray-900'
                      : 'text-black hover:bg-gray-100'
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg font-semibold text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors hidden sm:block"
                >
                  Get Started
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
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
            className={`md:hidden border-t ${isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-white/50 border-gray-200'} pb-4`}
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 font-medium text-sm transition-colors ${
                  isActive(item.path)
                    ? isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'
                    : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default ProfessionalNavbar;
