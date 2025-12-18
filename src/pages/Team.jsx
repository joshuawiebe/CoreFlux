import React from 'react';
import { TEAM } from '../utils/mockData';
import { useTheme } from '../context/ThemeContext';

const Team = () => {
  const { isDark } = useTheme();
  
  return (
    <div className="space-y-16 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h1 className={`text-5xl font-bold mb-4 ${isDark ? 'text-brand-primary' : 'text-brand-primary'}`}>Unser Team</h1>
        <p className={`text-xl max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Innovative Köpfe arbeiten zusammen, um die Zukunft der dezentralisierten Energiewirtschaft zu gestalten.
        </p>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TEAM.map((member, idx) => (
          <div key={member.id} className={`rounded-2xl backdrop-blur-sm border p-6 group hover:scale-105 transform animate-slide-in-up ${isDark ? 'dark:bg-slate-900/50 dark:border-slate-800' : 'bg-white border-slate-200'}`} style={{animationDelay: `${idx * 100}ms`}}>
            <div className="text-6xl mb-4 text-center">{member.avatar}</div>
            <h3 className={`text-xl font-bold text-center mb-1 ${isDark ? 'text-brand-primary' : 'text-brand-primary'}`}>{member.name}</h3>
            <p className={`text-sm text-center ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{member.role}</p>
            <div className={`mt-4 pt-4 border-t ${isDark ? 'border-slate-700' : 'border-slate-300'}`}>
              <p className={`text-xs text-center ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Mission */}
      <div className={`rounded-2xl backdrop-blur-sm border p-6 ${isDark ? 'dark:bg-slate-900/50 dark:border-slate-800' : 'bg-white border-slate-200'}`}>
        <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-brand-accent' : 'text-brand-accent'}`}>Unsere Mission</h2>
        <p className={`mb-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          CoreFlux wurde gegründet, um Hausbesitzer und Mieterbetriebe in die Lage zu versetzen, ihre bestehende Infrastruktur in ein rentables dezentrales Rechenzentrum zu verwandeln. Wir glauben, dass Energie nicht verschwendet werden sollte, sondern intelligent genutzt werden kann.
        </p>
        <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
          Mit unserer innovativen Technologie kannst du nicht nur dein Zuhause heizen, sondern auch die ungenutzten Ressourcen deines Systems zur Verarbeitung von KI-Anfragen nutzen — alles umweltfreundlich und profitabel.
        </p>
      </div>

      {/* Values */}
      <div>
        <h2 className={`text-3xl font-bold mb-8 text-center ${isDark ? 'text-brand-primary' : 'text-brand-primary'}`}>Unsere Werte</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Innovation', desc: 'Wir erfinden die Zukunft neu' },
            { title: 'Nachhaltigkeit', desc: 'Umweltschutz ist unser Kern' },
            { title: 'Transparenz', desc: 'Offene Kommunikation mit allen' },
          ].map((value, idx) => (
            <div key={idx} className={`rounded-2xl backdrop-blur-sm border p-6 text-center ${isDark ? 'dark:bg-slate-900/50 dark:border-slate-800' : 'bg-white border-slate-200'}`}>
              <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-brand-primary' : 'text-brand-primary'}`}>{value.title}</h3>
              <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
