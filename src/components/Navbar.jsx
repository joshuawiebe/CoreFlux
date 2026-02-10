import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { LogOut, BarChart3, Settings, Users, Shield, Menu, X, Moon, Sun, Home, Zap } from 'lucide-react';
import lightLogo from '../assets/light.png';
import darkLogo from '../assets/dark.png';
import LanguageSelector from './LanguageSelector';
import SettingsModal from './SettingsModal';

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const publicNavItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/pricing', label: 'Pricing', icon: Zap },
  ];

  const authNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/ai-chat', label: 'AI Chat', icon: Zap },
    { path: '/devices', label: 'Devices', icon: Shield },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  const adminNavItems = user?.role === 'admin' ? [
    { path: '/admin', label: 'Admin', icon: Users },
  ] : [];

  const navItems = isLoggedIn ? [...authNavItems, ...adminNavItems] : publicNavItems;
  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-sm border-b transition-colors ${
      isDark
        ? 'bg-slate-900 border-slate-800'
        : 'bg-white border-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-2 group">
            <img 
              src={isDark ? darkLogo : lightLogo} 
              alt="CoreFlux Logo" 
              className="h-8 group-hover:scale-110 transition-transform"
            />
            <span className={`font-bold hidden sm:inline text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Core<span className="text-brand-primary">Flux</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 font-medium text-sm ${
                    isActive(item.path)
                      ? `bg-brand-primary text-white`
                      : isDark
                      ? `text-slate-400 hover:text-white hover:bg-slate-800`
                      : `text-slate-600 hover:text-slate-900 hover:bg-slate-100`
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right Menu */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Selector */}
            <LanguageSelector />
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
              title={isDark ? 'Light Mode' : 'Dark Mode'}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {isLoggedIn ? (
              <>
                {/* User Badge */}
                <div className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  isDark
                    ? 'bg-slate-800 text-slate-300'
                    : 'bg-slate-200 text-slate-700'
                }`}>
                  {user?.name}
                </div>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Login & Signup Buttons */}
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg font-medium border-2 border-brand-primary text-brand-primary hover:bg-blue-50 dark:hover:bg-slate-800 transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg font-medium bg-brand-primary text-white hover:shadow-lg transition-all"
                >
                  Signup
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              className={isDark ? 'text-white' : 'text-slate-900'}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className={`md:hidden pb-4 space-y-2 border-t ${
            isDark ? 'border-slate-800' : 'border-slate-200'
          }`}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg transition-all flex items-center gap-2 font-medium ${
                    isActive(item.path)
                      ? `bg-brand-primary text-white`
                      : isDark
                      ? `text-slate-400 hover:text-white hover:bg-slate-800`
                      : `text-slate-600 hover:text-slate-900 hover:bg-slate-100`
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
            {isLoggedIn ? (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full mt-4 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <div className="space-y-2 mt-4">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 rounded-lg font-medium border-2 border-brand-primary text-brand-primary hover:bg-blue-50 dark:hover:bg-slate-800 transition-all text-center"
                >
                  Login
                </Link>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 rounded-lg font-medium bg-brand-primary text-white hover:shadow-lg transition-all text-center"
                >
                  Signup                </Link>
              </div>
            )}
          </div>
        )}

        {/* Settings Modal */}
        <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
      </div>
    </nav>
  );
};

export default Navbar;