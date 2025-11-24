'use client';

import { useState, useEffect } from 'react';
import Listening from '@/components/Listening';

type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
type Country = 'spain' | 'mexico' | 'argentina' | 'colombia' | 'peru' | 'chile' | 'cuba' | 'venezuela';

export default function AudioPage() {
  const [level, setLevel] = useState<Level>('A1');
  const [country, setCountry] = useState<Country>('spain');
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('spanish-sprint-language') as 'fr' | 'en' | null;
    const savedLevel = localStorage.getItem('spanish-sprint-level') as Level | null;
    const savedCountry = localStorage.getItem('spanish-sprint-country') as Country | null;

    if (savedLanguage) setLanguage(savedLanguage);
    if (savedLevel && savedLevel !== 'ALL') setLevel(savedLevel);
    if (savedCountry && savedCountry !== 'ALL') setCountry(savedCountry);
  }, []);

  const texts = {
    fr: {
      title: '🎧 Audio',
      level: 'Niveau',
      country: 'Pays',
      back: '← Retour à l\'accueil'
    },
    en: {
      title: '🎧 Audio',
      level: 'Level',
      country: 'Country',
      back: '← Back to home'
    }
  };

  const t = texts[language];

  const countries = {
    fr: {
      spain: '🇪🇸 Espagne',
      mexico: '🇲🇽 Mexique',
      argentina: '🇦🇷 Argentine',
      colombia: '🇨🇴 Colombie',
      peru: '🇵🇪 Pérou',
      chile: '🇨🇱 Chili',
      cuba: '🇨🇺 Cuba',
      venezuela: '🇻🇪 Venezuela'
    },
    en: {
      spain: '🇪🇸 Spain',
      mexico: '🇲🇽 Mexico',
      argentina: '🇦🇷 Argentina',
      colombia: '🇨🇴 Colombia',
      peru: '🇵🇪 Peru',
      chile: '🇨🇱 Chile',
      cuba: '🇨🇺 Cuba',
      venezuela: '🇻🇪 Venezuela'
    }
  };

  const audioItems = [
    {
      id: 1,
      title: 'Exemple - Conversation au restaurant',
      audioUrl: '/audios/exemple.mp3',
      transcript: 'Exemple de transcription à venir...',
      level: level,
      country: country
    }
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <a href="/" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
          {t.back}
        </a>

        <h1 className="text-4xl font-bold mb-6 text-center">{t.title}</h1>

        <div className="bg-slate-800 rounded-xl p-4 mb-6 border border-slate-700">
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
                  localStorage.setItem('spanish-sprint-country', newCountry);
                }}
                className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
              >
                {Object.entries(countries[language]).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <Listening items={audioItems} level={level} country={country} />
      </div>
    </div>
  );
}