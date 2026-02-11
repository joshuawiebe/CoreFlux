import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LandingHeroV2 from './LandingHeroV2';
import FeaturesSection from './FeaturesSection';
import HowItWorksSection from './HowItWorksSection';
import PricingSection from './PricingSection';
import ProfessionalFooter from './ProfessionalFooter';

const ProfessionalLanding = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="professional-landing"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        {/* Hero Section */}
        <LandingHeroV2 />

        {/* Features Section */}
        <FeaturesSection />

        {/* How It Works Section */}
        <HowItWorksSection />

        {/* Pricing Section */}
        <PricingSection />

        {/* CTA Section before Footer */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="dark:bg-black bg-white py-24 px-6 md:px-12 border-t dark:border-gray-800 border-gray-200"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6 dark:text-white text-black">
              Ready to get started?
            </h2>
            <p className="text-xl dark:text-gray-400 text-gray-600 mb-12">
              Choose your service to begin. Switch between AI and heating control anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/login"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-lg font-semibold dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 bg-gray-200 text-black hover:bg-gray-300 transition-all border-2 dark:border-gray-700 border-gray-400"
              >
                Sign In
              </motion.a>
              <motion.a
                href="/signup"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-lg transition-all"
              >
                Get Started
              </motion.a>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <ProfessionalFooter />
      </motion.div>
    </AnimatePresence>
  );
};

export default ProfessionalLanding;
