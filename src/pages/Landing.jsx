import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Cpu, Leaf, BarChart3, Rocket } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Landing = () => {
  const { isDark } = useTheme();
  
  return (
    <div className={`min-h-screen transition-colors ${
      isDark
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
        : 'bg-gradient-to-br from-white via-slate-50 to-white'
    }`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b ${
        isDark ? 'border-slate-800' : 'border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            <span className="text-brand-primary">Core</span>
            <span className="text-brand-accent">Flux</span>
          </h1>
          <Link to="/login" className="px-6 py-2 rounded-lg font-semibold border-2 border-brand-primary text-brand-primary hover:bg-blue-50 dark:hover:bg-slate-800 transition-all">
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Background Animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-40 left-1/4 w-96 h-96 bg-brand-primary opacity-5 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-brand-secondary opacity-5 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          </div>

          <div className="relative z-10 animate-slide-in-up">
            <h2 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">
                Dezentrales KI-Heizwerk
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Nutze deine Heizungsanlage als verteiltes Rechenzentrum. Verdiene Geld mit ungenutzter Rechenleistung, während du dein Zuhause heizt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login" className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-brand-primary to-brand-secondary text-white hover:shadow-lg transition-all flex items-center justify-center gap-2">
                Jetzt Starten
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="px-6 py-2 rounded-lg font-semibold border-2 border-brand-primary text-brand-primary hover:bg-blue-50 dark:hover:bg-slate-800 transition-all">
                Mehr erfahren
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-16 text-brand-primary">
            Warum CoreFlux?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: 'Energieeffizient', desc: 'Nutze die bereits vorhandene Wärme optimal' },
              { icon: Leaf, title: 'Nachhaltig', desc: 'Reduziere deinen CO2-Fußabdruck' },
              { icon: Cpu, title: 'Dezentralisiert', desc: 'Keine zentralen Server nötig' },
              { icon: BarChart3, title: 'Transparent', desc: 'Echtzeit-Statistiken und Kontrolle' },
              { icon: Rocket, title: 'Skalierbar', desc: 'Von 1 bis 1000+ Geräte' },
              { icon: Zap, title: 'Rentabel', desc: 'Verdiene mit deiner Heizung' },
            ].map((item, idx) => (
              <div key={idx} className="rounded-2xl backdrop-blur-sm border dark:bg-slate-900/50 dark:border-slate-800 bg-white border-slate-200 p-6 group hover:scale-105 transform animate-slide-in-up" style={{animationDelay: `${idx * 100}ms`}}>
                <item.icon className="w-12 h-12 text-brand-primary mb-4" />
                <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-dark-bg bg-opacity-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-16 text-brand-accent">
            So funktioniert's
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Hardware anschließen', desc: 'Verbinde deine Raspberry Pis mit der Heizung' },
              { step: '2', title: 'Netzwerk verbinden', desc: 'Stelle eine LAN-Verbindung her' },
              { step: '3', title: 'KI-Anfragen erhalten', desc: 'Das Cluster verarbeitet automatisch Anfragen' },
              { step: '4', title: 'Verdiene Geld', desc: 'Erhalte regelmäßige Zahlungen' },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="rounded-2xl backdrop-blur-sm border dark:bg-slate-900/50 dark:border-slate-800 bg-white border-slate-200 p-6 text-center">
                  <div className="text-4xl font-bold text-brand-primary mb-4">{item.step}</div>
                  <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
                {idx < 3 && (
                  <ArrowRight className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-brand-primary" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { number: '1,247', label: 'Aktive Netzwerke' },
              { number: '48.3K', label: 'Geräte Online' },
              { number: '€2.4M', label: 'Verdiente Prämien' },
              { number: '99.7%', label: 'System-Uptime' },
            ].map((stat, idx) => (
              <div key={idx} className="rounded-2xl backdrop-blur-sm border dark:bg-slate-900/50 dark:border-slate-800 bg-white border-slate-200 p-6 text-center">
                <p className="text-4xl font-bold text-brand-primary mb-2">{stat.number}</p>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-brand-primary to-brand-secondary bg-opacity-5 border-t border-brand-primary border-opacity-20">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6 text-brand-primary">
            Bist du bereit?
          </h3>
          <p className="text-xl text-gray-300 mb-8">
            Trete der CoreFlux-Community bei und starte dein dezentrales KI-Heizwerk heute.
          </p>
          <Link to="/login" className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-brand-primary to-brand-secondary text-white hover:shadow-lg transition-all inline-flex items-center gap-2">
            Jetzt kostenlos registrieren
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-700">
        <div className="max-w-6xl mx-auto text-center text-gray-400 text-sm">
          <p>© 2024 CoreFlux. Alle Rechte vorbehalten. | Demo-Version für Schulprojekte</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
