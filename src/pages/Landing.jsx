import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Cpu, Leaf, BarChart3, Rocket, Shield, TrendingUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Landing = () => {
  const { isDark } = useTheme();
  
  // Blitz SVG Component
  const LightningBolt = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
  
  return (
    <div className={`min-h-screen transition-colors ${
      isDark
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
        : 'bg-gradient-to-br from-white via-blue-50 to-white'
    }`}>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-32 relative overflow-hidden bg-white dark:bg-slate-900">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-40 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-20">
          <div className="mb-8 animate-bounce">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-2xl">
              <LightningBolt className="text-white w-12 h-12" />
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight text-slate-900 dark:text-white">
            Dezentrales
            <br />
            <span className="text-blue-600 dark:text-blue-400">
              KI-Heizwerk
            </span>
          </h1>
          
          <p className={`text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-900'
          }`}>
            Nutze deine Heizungsanlage als verteiltes Rechenzentrum. Verdiene Geld mit ungenutzter Rechenleistung, während du dein Zuhause heizt.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/login" className="px-8 py-4 rounded-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2 group">
              Jetzt Starten
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#features" className="px-8 py-4 rounded-lg font-semibold border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
              Mehr erfahren
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 text-sm text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>SSL verschlüsselt</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>99.7% Uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>48K+ Geräte</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Warum CoreFlux?
          </h2>
          <p className={`text-center mb-16 text-lg ${isDark ? 'text-slate-400' : 'text-slate-800'}`}>
            Die beste Lösung für dezentrales KI-Computing
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'Energieeffizient', desc: 'Nutze die bereits vorhandene Wärme optimal' },
              { icon: Leaf, title: 'Nachhaltig', desc: 'Reduziere deinen CO2-Fußabdruck deutlich' },
              { icon: Cpu, title: 'Dezentralisiert', desc: 'Keine zentralen Server nötig' },
              { icon: BarChart3, title: 'Transparent', desc: 'Echtzeit-Statistiken und volle Kontrolle' },
              { icon: Rocket, title: 'Skalierbar', desc: 'Von 1 bis 1000+ Geräte' },
              { icon: TrendingUp, title: 'Rentabel', desc: 'Verdiene kontinuierlich mit deiner Heizung' },
            ].map((item, idx) => (
              <div 
                key={idx} 
                className={`rounded-2xl backdrop-blur-sm border p-8 group hover:scale-105 hover:shadow-2xl transform transition-all duration-300 ${
                  isDark
                    ? 'bg-slate-900/50 border-slate-800 hover:border-brand-primary'
                    : 'bg-white/50 border-slate-200 hover:border-brand-primary'
                }`}
              >
                <div className="mb-4 p-3 w-fit rounded-lg bg-gradient-to-br from-brand-primary to-brand-accent">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {item.title}
                </h3>
                <p className={isDark ? 'text-slate-400' : 'text-slate-800'}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={`py-24 px-4 ${isDark ? 'bg-slate-800/30' : 'bg-blue-50/50'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-16 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            So funktioniert's
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Hardware anschließen', desc: 'Verbinde deine Raspberry Pis mit der Heizung' },
              { step: '2', title: 'Netzwerk verbinden', desc: 'Stelle eine LAN-Verbindung her' },
              { step: '3', title: 'KI-Anfragen erhalten', desc: 'Das Cluster verarbeitet automatisch Anfragen' },
              { step: '4', title: 'Verdiene Geld', desc: 'Erhalte regelmäßige Zahlungen' },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className={`rounded-2xl backdrop-blur-sm border p-6 text-center h-full ${
                  isDark
                    ? 'bg-slate-900/50 border-slate-800'
                    : 'bg-white border-slate-200'
                }`}>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary to-brand-accent text-white font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {item.title}
                  </h3>
                  <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                    {item.desc}
                  </p>
                </div>
                {idx < 3 && (
                  <ArrowRight className={`hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 ${
                    isDark ? 'text-brand-primary' : 'text-brand-primary'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: '1,247', label: 'Aktive Netzwerke' },
              { number: '48.3K', label: 'Geräte Online' },
              { number: '€2.4M', label: 'Verdiente Prämien' },
              { number: '99.7%', label: 'System-Uptime' },
            ].map((stat, idx) => (
              <div 
                key={idx} 
                className={`rounded-2xl backdrop-blur-sm border p-8 text-center ${
                  isDark
                    ? 'bg-slate-900/50 border-slate-800'
                    : 'bg-white border-slate-200'
                }`}
              >
                <p className="text-4xl font-bold text-brand-primary mb-2">
                  {stat.number}
                </p>
                <p className={isDark ? 'text-slate-400' : 'text-slate-800'}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-24 px-4 ${
        isDark
          ? 'bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 border-t border-brand-primary/20'
          : 'bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 border-t border-brand-primary/20'
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Bist du bereit?
          </h2>
          <p className={`text-xl mb-8 max-w-2xl mx-auto ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
            Trete der CoreFlux-Community bei und starte dein dezentrales KI-Heizwerk heute.
          </p>
          <Link 
            to="/login" 
            className="px-8 py-4 rounded-lg font-semibold bg-gradient-to-r from-brand-primary to-brand-secondary text-white hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-2 group"
          >
            Jetzt kostenlos registrieren
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                CoreFlux
              </h4>
              <p className={isDark ? 'text-slate-400 text-sm' : 'text-slate-600 text-sm'}>
                Die Zukunft des dezentralen KI-Computing
              </p>
            </div>
            <div>
              <h4 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Links
              </h4>
              <ul className={`space-y-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <li><Link to="/" className="hover:text-brand-primary transition-colors">Home</Link></li>
                <li><Link to="/pricing" className="hover:text-brand-primary transition-colors">Pricing</Link></li>
                <li><Link to="/dashboard" className="hover:text-brand-primary transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Legal
              </h4>
              <ul className={`space-y-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <li><Link to="/impressum" className="hover:text-brand-primary transition-colors">Impressum</Link></li>
                <li><Link to="/privacy" className="hover:text-brand-primary transition-colors">Datenschutz</Link></li>
              </ul>
            </div>
          </div>
          
          <div className={`border-t pt-8 text-center text-sm ${isDark ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-600'}`}>
            <p>© 2024 CoreFlux. Alle Rechte vorbehalten. Demo-Version für Schulprojekte</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
