import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import LandingHero from '../components/LandingHero';
import EmbeddedChat from '../components/EmbeddedChat';
import WhereIsCoreFlux from '../components/WhereIsCoreFlux';
import HowItWorks from '../components/HowItWorks';
import BenefitsGrid from '../components/BenefitsGrid';
import LandingFooter from '../components/LandingFooter';
import Intro from '../components/Intro';
import Reveal from '../components/Reveal';

const LandingNew = () => {
  const [introActive, setIntroActive] = useState(true);

  return (
    <AnimatePresence mode="wait">
      {introActive ? (
        <Intro key="intro" onComplete={() => setIntroActive(false)} />
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full bg-white dark:bg-slate-950"
        >
          {/* Hero Section */}
          <LandingHero />

          {/* Main Content Wrapper */}
          <div className="relative w-full overflow-x-hidden">
            {/* CoreFlux Explanation */}
            <Reveal delay={0.2}>
              <WhereIsCoreFlux />
            </Reveal>

            {/* How It Works */}
            <Reveal>
              <HowItWorks />
            </Reveal>

            {/* Benefits */}
            <Reveal>
              <BenefitsGrid />
            </Reveal>

            {/* Final CTA Section */}
            <Reveal>
              <section className="py-24 px-6 md:px-12 text-center border-b dark:border-slate-800 border-slate-200">
                <div className="container mx-auto">
                  <h2 className="text-4xl md:text-6xl font-black mb-6 dark:text-white text-slate-900">
                    Ready to Join the<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-600">
                      Sustainable Revolution?
                    </span>
                  </h2>
                  <p className="text-lg mb-8 max-w-2xl mx-auto dark:text-slate-300 text-slate-700">
                    Start saving money today while powering the future of sustainable AI. No risk, money-back guarantee.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="/login"
                      className="px-12 py-4 rounded-lg font-black uppercase tracking-widest bg-brand-primary text-white hover:shadow-xl transition-all"
                    >
                      Get Started Free
                    </a>
                    <a
                      href="/pricing"
                      className="px-12 py-4 rounded-lg font-black uppercase tracking-widest border-2 border-brand-primary text-brand-primary hover:bg-blue-50 dark:hover:bg-slate-800 transition-all"
                    >
                      View Pricing
                    </a>
                  </div>
                </div>
              </section>
            </Reveal>

            {/* Footer */}
            <Reveal>
              <LandingFooter />
            </Reveal>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LandingNew;
