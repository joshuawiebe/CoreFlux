// Professional Page Layout Template
// Use this pattern for all pages in CoreFlux

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const ProfessionalPageTemplate = ({
  title,
  subtitle,
  backLink = '/dashboard',
  children,
  icon: Icon,
}) => {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-white'}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`border-b ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}
      >
        <div className="max-w-6xl mx-auto px-6 py-6 md:py-8">
          <div className="flex items-center gap-4">
            <Link
              to={backLink}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
              {Icon && <Icon className="w-8 h-8" />}
              <div>
                <h1 className={`text-3xl md:text-4xl font-black ${isDark ? 'text-white' : 'text-black'}`}>
                  {title}
                </h1>
                {subtitle && (
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default ProfessionalPageTemplate;

/*
USAGE EXAMPLE:

import ProfessionalPageTemplate from '../components/ProfessionalPageTemplate';
import { Users } from 'lucide-react';

const TeamPage = () => {
  return (
    <ProfessionalPageTemplate
      title="Team"
      subtitle="Meet the people behind CoreFlux"
      backLink="/dashboard"
      icon={Users}
    >
      {/* Your page content here */}
    </ProfessionalPageTemplate>
  );
};

export default TeamPage;
*/
