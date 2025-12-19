import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Privacy = () => {
  const { isDark } = useTheme();
  
  return (
    <div className={`min-h-screen transition-colors pt-24 pb-12 ${
      isDark
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
        : 'bg-gradient-to-br from-white via-blue-50 to-white'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link to="/" className={`inline-flex items-center gap-2 mb-8 hover:text-brand-primary transition-colors ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Startseite
        </Link>

        <h1 className={`text-5xl font-bold mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Datenschutzerklärung
        </h1>

        <div className="space-y-8">
          {/* 1. Verantwortlicher */}
          <section className={`rounded-2xl backdrop-blur-sm border p-8 ${
            isDark
              ? 'bg-slate-900/50 border-slate-800'
              : 'bg-white border-slate-200'
          }`}>
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-brand-primary' : 'text-brand-primary'}`}>
              1. Verantwortlicher für die Datenverarbeitung
            </h2>
            <div className={`space-y-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <p><strong>CoreFlux GmbH</strong></p>
              <p>Innovationsstraße 42<br />80939 München<br />Deutschland</p>
              <p><strong>E-Mail:</strong> datenschutz@coreflux.de<br />
              <strong>Telefon:</strong> +49 (0) 89 1234-5678</p>
            </div>
          </section>

          {/* 2. Erhebung und Verarbeitung */}
          <section className={`rounded-2xl backdrop-blur-sm border p-8 ${
            isDark
              ? 'bg-slate-900/50 border-slate-800'
              : 'bg-white border-slate-200'
          }`}>
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-brand-primary' : 'text-brand-primary'}`}>
              2. Erhebung und Verarbeitung personenbezogener Daten
            </h2>
            <div className={`space-y-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <p>
                <strong>2.1 Daten beim Besuch der Website:</strong><br />
                Bei der Nutzung dieser Website werden automatisch Informationen erfasst:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>IP-Adresse</li>
                <li>Datum und Uhrzeit des Zugriffs</li>
                <li>Aufgerufene Seiten</li>
                <li>Referrer-URL</li>
                <li>Browser- und Geräte-Informationen</li>
              </ul>
              <p>
                <strong>2.2 Daten bei der Registrierung:</strong><br />
                Bei der Registrierung werden folgende Daten erhoben:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>E-Mail-Adresse</li>
                <li>Benutzername</li>
                <li>Passwort (verschlüsselt)</li>
                <li>Name</li>
                <li>Adresse (optional)</li>
              </ul>
            </div>
          </section>

          {/* 3. Speicherung */}
          <section className={`rounded-2xl backdrop-blur-sm border p-8 ${
            isDark
              ? 'bg-slate-900/50 border-slate-800'
              : 'bg-white border-slate-200'
          }`}>
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-brand-secondary' : 'text-brand-secondary'}`}>
              3. Speicherung und Cookies
            </h2>
            <div className={`space-y-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <p>
                Wir speichern Informationen in LocalStorage und Cookies zur Verbesserung der Benutzerfreundlichkeit:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Theme-Mode:</strong> Speicherung Ihrer Dark/Light-Präferenz</li>
                <li><strong>Scroll-Position:</strong> Ihre aktuelle Scroll-Position</li>
                <li><strong>Authentifizierung:</strong> Login-Session-Informationen</li>
                <li><strong>Sprache:</strong> Ihre bevorzugte Sprache</li>
              </ul>
              <p className="mt-4">
                Diese Cookies werden mit einer Verfallsdauer von 7 Tagen gespeichert und sind erforderlich für die Funktionalität der Website.
              </p>
            </div>
          </section>

          {/* 4. Sicherheit */}
          <section className={`rounded-2xl backdrop-blur-sm border p-8 ${
            isDark
              ? 'bg-slate-900/50 border-slate-800'
              : 'bg-white border-slate-200'
          }`}>
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-brand-accent' : 'text-brand-accent'}`}>
              4. Datensicherheit
            </h2>
            <div className={`space-y-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <p>
                Wir setzen branchenweit anerkannte Sicherheitsstandards ein:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>SSL/TLS-Verschlüsselung für alle Datenübertragungen</li>
                <li>Sichere Passwort-Hashing-Algorithmen</li>
                <li>Regelmäßige Sicherheitsüberprüfungen</li>
                <li>Zugriffskontrolle und Authentifizierung</li>
              </ul>
            </div>
          </section>

          {/* 5. Benutzerrechte */}
          <section className={`rounded-2xl backdrop-blur-sm border p-8 ${
            isDark
              ? 'bg-slate-900/50 border-slate-800'
              : 'bg-white border-slate-200'
          }`}>
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-brand-primary' : 'text-brand-primary'}`}>
              5. Ihre Rechte
            </h2>
            <div className={`space-y-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <p>
                Gemäß DSGVO haben Sie folgende Rechte:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Auskunftsrecht:</strong> Sie können jederzeit Informationen über Ihre gespeicherten Daten anfordern</li>
                <li><strong>Berichtigungsrecht:</strong> Sie können fehlerhafte Daten korrigieren</li>
                <li><strong>Löschungsrecht:</strong> Sie können die Löschung Ihrer Daten beantragen</li>
                <li><strong>Widerspruchsrecht:</strong> Sie können der Verarbeitung widersprechen</li>
              </ul>
              <p className="mt-4">
                Bitte kontaktieren Sie uns unter <strong>datenschutz@coreflux.de</strong> um ein Recht auszuüben.
              </p>
            </div>
          </section>

          {/* 6. Datenübermittlung */}
          <section className={`rounded-2xl backdrop-blur-sm border p-8 ${
            isDark
              ? 'bg-slate-900/50 border-slate-800'
              : 'bg-white border-slate-200'
          }`}>
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-brand-secondary' : 'text-brand-secondary'}`}>
              6. Weitergabe an Dritte
            </h2>
            <div className={`${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <p>
                Ihre Daten werden nicht an Dritte weitergegeben, außer wenn dies erforderlich ist für:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Erfüllung gesetzlicher Verpflichtungen</li>
                <li>Betrugsbekämpfung</li>
                <li>Schutz von Sicherheit und Eigentum</li>
              </ul>
            </div>
          </section>

          {/* 7. Kontakt */}
          <section className={`rounded-2xl backdrop-blur-sm border p-8 ${
            isDark
              ? 'bg-slate-900/50 border-slate-800'
              : 'bg-white border-slate-200'
          }`}>
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-brand-accent' : 'text-brand-accent'}`}>
              7. Kontakt und Datenschutzbeauftragter
            </h2>
            <div className={`space-y-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <p>
                Bei Fragen zur Datenschutzerklärung kontaktieren Sie uns bitte:
              </p>
              <p>
                <strong>Datenschutzbeauftragter:</strong><br />
                CoreFlux GmbH<br />
                datenschutz@coreflux.de<br />
                +49 (0) 89 1234-5678
              </p>
            </div>
          </section>

          {/* Last Updated */}
          <div className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
            <p>Letzte Aktualisierung: Dezember 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
