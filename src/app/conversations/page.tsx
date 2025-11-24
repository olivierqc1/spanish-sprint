'use client';

import { useState, useEffect } from 'react';
import ConversationPractice from '@/components/ConversationPractice';

type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
type Country = 'ALL' | 'spain' | 'mexico' | 'argentina';

export default function ConversationsPage() {
  const [level, setLevel] = useState<Level>('A1');
  const [country, setCountry] = useState<Country>('spain');
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('spanish-sprint-language') as 'fr' | 'en' | null;
    const savedLevel = localStorage.getItem('spanish-sprint-level') as Level | null;
    const savedCountry = localStorage.getItem('spanish-sprint-country') as string | null;

    if (savedLanguage) setLanguage(savedLanguage);
    if (savedLevel && savedLevel !== 'ALL') setLevel(savedLevel);
    
    // Mapper vers les pays acceptés par ConversationPractice
    if (savedCountry) {
      if (savedCountry === 'spain' || savedCountry === 'mexico' || savedCountry === 'argentina') {
        setCountry(savedCountry);
      } else if (savedCountry === 'colombia' || savedCountry === 'peru' || savedCountry === 'venezuela') {
        setCountry('mexico');
      } else if (savedCountry === 'chile' || savedCountry === 'cuba') {
        setCountry('argentina');
      }
    }
  }, []);

  const texts = {
    fr: {
      title: '💬 Conversations',
      level: 'Niveau',
      country: 'Pays',
      back: '← Retour à l\'accueil',
      note: 'Note: Disponible pour Espagne, Mexique et Argentine'
    },
    en: {
      title: '💬 Conversations',
      level: 'Level',
      country: 'Country',
      back: '← Back to home',
      note: 'Note: Available for Spain, Mexico and Argentina'
    }
  };

  const t = texts[language];

  const countries = {
    fr: {
      ALL: '🌍 Tous',
      spain: '🇪🇸 Espagne',
      mexico: '🇲🇽 Mexique',
      argentina: '🇦🇷 Argentine'
    },
    en: {
      ALL: '🌍 All',
      spain: '🇪🇸 Spain',
      mexico: '🇲🇽 Mexico',
      argentina: '🇦🇷 Argentina'
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <a href="/" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
          {t.back}
        </a>

        <h1 className="text-4xl font-bold mb-6 text-center">{t.title}</h1>

        <div className="bg-slate-800 rounded-xl p-4 mb-6 border border-slate-700">
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-wrap gap-4 items-center justify-center">
              <div className="flex items-center gap-2">
                <label className="text-sm text-slate-400">{t.level}:</label>
                <select
                  value={level}
                  onChange={(e) => {
                    const newLevel = e.target.value as Level;
                    setLevel(newLevel);
                    localStorage.setItem('spanish-sprint-level', newLevel);
                  }}
                  className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
                >
                  <option value="A1">A1</option>
                  <option value="A2">A2</option>
                  <option value="B1">B1</option>
                  <option value="B2">B2</option>
                  <option value="C1">C1</option>
                  <option value="C2">C2</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm text-slate-400">{t.country}:</label>
                <select
                  value={country}
                  onChange={(e) => {
                    const newCountry = e.target.value as Country;
                    setCountry(newCountry);
                  }}
                  className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
                >
                  {Object.entries(countries[language]).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
              </div>
            </div>
            <p className="text-xs text-slate-500">{t.note}</p>
          </div>
        </div>

        <ConversationPractice level={level} country={country} />
      </div>
    </div>
  );
}