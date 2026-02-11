import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Mail, Github, Linkedin } from 'lucide-react';

const ProfessionalFooter = () => {
  const { isDark } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`border-t ${isDark ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className={`text-xl font-black mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
              CoreFlux
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
              Intelligent heating automation powered by distributed AI.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Product</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/pricing" className={`text-sm transition-colors ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
                  Pricing
                </Link>
              </li>
              <li>
                <a href="#features" className={`text-sm transition-colors ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
                  Features
                </a>
              </li>
              <li>
                <a href="/ai-chat" className={`text-sm transition-colors ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
                  AI Chat
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Company</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/team" className={`text-sm transition-colors ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
                  Team
                </Link>
              </li>
              <li>
                <a href="mailto:hello@coreflux.dev" className={`text-sm transition-colors ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className={`text-sm transition-colors ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/impressum" className={`text-sm transition-colors ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
                  Impressum
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Connect</h4>
            <div className="flex gap-3">
              <a
                href="mailto:hello@coreflux.dev"
                className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                <Mail className="w-5 h-5 text-gray-500" />
              </a>
              <a
                href="#"
                className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                <Github className="w-5 h-5 text-gray-500" />
              </a>
              <a
                href="#"
                className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                <Linkedin className="w-5 h-5 text-gray-500" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={`border-t ${isDark ? 'border-gray-800' : 'border-gray-200'} pt-8`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={`text-sm ${isDark ? 'text-gray-600' : 'text-gray-600'}`}>
              © {currentYear} CoreFlux. All rights reserved. Made in Germany.
            </p>
            <div className={`text-sm ${isDark ? 'text-gray-600' : 'text-gray-600'}`}>
              Status: <span className="text-green-500 font-semibold">All Systems Operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ProfessionalFooter;
