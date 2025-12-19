import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Impressum = () => {
  const { isDark } = useTheme();
  
  return (
    <div className={`min-h-screen transition-colors pt-24 pb-12 ${
      isDark
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
        : 'bg-gradient-to-br from-white via-blue-50 to-white'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Button */}
        <Link to="/" className={`inline-flex items-center gap-2 hover:text-brand-primary transition-colors ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Startseite
        </Link>

        <h1 className={`text-5xl font-bold mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Impressum
        </h1>

        {/* Company Info */}
        <div className={`rounded-2xl backdrop-blur-sm border p-8 ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
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
              <strong>E-Mail:</strong> info@coreflux.de<br />
              <strong>Website:</strong> www.coreflux.de
            </p>
          </div>
        </div>

        {/* Management */}
        <div className={`rounded-2xl backdrop-blur-sm border p-8 ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-brand-accent' : 'text-brand-accent'}`}>Vertreter</h2>
          <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
            <strong>Geschäftsführer:</strong> Gustav Manfred
          </p>
        </div>

        {/* Registration */}
        <div className={`rounded-2xl backdrop-blur-sm border p-8 ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-green-400' : 'text-green-600'}`}>Registereintrag</h2>
          <div className={isDark ? 'text-slate-300' : 'text-slate-700'}>
            <p>
              <strong>Handelsregister:</strong> HRB 123456<br />
              <strong>Amtsgericht:</strong> München
            </p>
          </div>
        </div>

        {/* VAT ID */}
        <div className={`rounded-2xl backdrop-blur-sm border p-8 ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-brand-primary' : 'text-brand-primary'}`}>Umsatzsteuer-ID</h2>
          <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
            <strong>USt-IdNr.:</strong> DE123456789
          </p>
        </div>

        {/* Disclaimer */}
        <div className={`rounded-2xl backdrop-blur-sm border p-8 ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-brand-accent' : 'text-brand-accent'}`}>Haftungsausschluss</h2>
          <div className={`space-y-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <p>
              Die Inhalte dieser Website werden mit größter Sorgfalt erstellt. Der Anbieter übernimmt jedoch keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte.
            </p>
            <p>
              <strong>Wichtig:</strong> Dies ist eine Demo-Website für ein Schulprojekt. Alle dargestellten Inhalte, Geschäftstätigkeiten und Daten sind fiktiv und dienen nur zu Demonstrationszwecken.
            </p>
          </div>
        </div>

        {/* Liability for Links */}
        <div className={`rounded-2xl backdrop-blur-sm border p-8 ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-brand-primary' : 'text-brand-primary'}`}>Haftung für Links</h2>
          <div className={`space-y-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <p>
              Unsere Website enthält Links zu externen Websites. Für die Inhalte fremder Websites sind wir nicht verantwortlich. Die Verantwortung liegt bei dem Betreiber der externen Website. Wir übernehmen keine Haftung für die Verfügbarkeit oder den Inhalt externer Websites.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className={`rounded-2xl backdrop-blur-sm border p-8 ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-brand-secondary' : 'text-brand-secondary'}`}>Urheberrecht</h2>
          <div className={`space-y-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <p>
              Die auf dieser Website bereitgestellten Inhalte unterliegen dem deutschen Urheberrecht und andere internationale Gesetze zum Schutz geistigen Eigentums. Eine Vervielfältigung, Verbreitung oder anderweitige Nutzung ist ohne vorherige schriftliche Zustimmung untersagt.
            </p>
          </div>
        </div>

        {/* Links */}
        <div className={`rounded-2xl backdrop-blur-sm border p-8 ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-brand-accent' : 'text-brand-accent'}`}>Wichtige Links</h2>
          <div className={`space-y-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <p><Link to="/privacy" className="text-brand-primary hover:underline">Datenschutzerklärung</Link></p>
            <p><Link to="/" className="text-brand-primary hover:underline">Zur Startseite</Link></p>
          </div>
        </div>

        {/* Footer */}
        <div className={`text-center text-sm pt-8 border-t ${isDark ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-600'}`}>
          <p>© 2024 CoreFlux. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </div>
  );
};

export default Impressum;
