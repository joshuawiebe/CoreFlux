import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Impressum = () => {
  const { isDark } = useTheme();
  
  return (
    <div className={`max-w-4xl mx-auto space-y-8 animate-fade-in`}>
      <h1 className={`text-4xl font-bold mb-8 ${isDark ? 'text-brand-primary' : 'text-brand-primary'}`}>Impressum</h1>

      <div className={`rounded-2xl backdrop-blur-sm border p-6 ${isDark ? 'dark:bg-slate-900/50 dark:border-slate-800' : 'bg-white border-slate-200'}`}>
        <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-brand-primary' : 'text-brand-primary'}`}>Angaben gemäß § 5 TMG</h2>
        <div className={`space-y-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          <p>
            <strong>CoreFlux GmbH</strong><br />
            Innovationsstraße 42<br />
            80939 München<br />
            Deutschland
          </p>
          <p>
            <strong>Telefon:</strong> +49 (0) 89 1234-5678<br />
            <strong>E-Mail:</strong> info@coreflux.de
          </p>
        </div>
      </div>

      <div className={`rounded-2xl backdrop-blur-sm border p-6 ${isDark ? 'dark:bg-slate-900/50 dark:border-slate-800' : 'bg-white border-slate-200'}`}>
        <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-brand-accent' : 'text-brand-accent'}`}>Vertreter</h2>
        <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
          <strong>Geschäftsführer:</strong> Gustav Manfred
        </p>
      </div>

      <div className={`rounded-2xl backdrop-blur-sm border p-6 ${isDark ? 'dark:bg-slate-900/50 dark:border-slate-800' : 'bg-white border-slate-200'}`}>
        <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-green-400' : 'text-green-600'}`}>Registereintrag</h2>
        <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
          <strong>Handelsregister:</strong> HRB 123456<br />
          <strong>Amtsgericht:</strong> München
        </p>
      </div>

      <div className={`rounded-2xl backdrop-blur-sm border p-6 ${isDark ? 'dark:bg-slate-900/50 dark:border-slate-800' : 'bg-white border-slate-200'}`}>
        <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Umsatzsteuer-ID</h2>
        <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
          <strong>USt-IdNr.:</strong> DE123456789
        </p>
      </div>

      <div className={`rounded-2xl backdrop-blur-sm border p-6 ${isDark ? 'dark:bg-slate-900/50 dark:border-slate-800' : 'bg-white border-slate-200'}`}>
        <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-brand-accent' : 'text-brand-accent'}`}>Haftungsausschluss</h2>
        <p className={`mb-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          Die Inhalte dieser Website werden mit größter Sorgfalt erstellt. Der Anbieter übernimmt jedoch keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte.
        </p>
        <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
          <strong>Hinweis:</strong> Dies ist eine Demo-Website für ein Schulprojekt. Alle Inhalte und Daten sind fiktiv.
        </p>
      </div>

      <p className={`text-center text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
        © 2024 CoreFlux. Alle Rechte vorbehalten.
      </p>
    </div>
  );
};

export default Impressum;
