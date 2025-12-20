'use client';

import { useState, useEffect } from 'react';
import Conjugation from '@/components/Conjugation';

export default function ConjugaisonPage() {
  const [level, setLevel] = useState<'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'ALL'>('A1');
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('spanish-sprint-language');
    const savedLevel = localStorage.getItem('spanish-sprint-level');

    if (savedLanguage === 'fr' || savedLanguage === 'en') {
      setLanguage(savedLanguage);
    }
    
    if (savedLevel) {
      const validLevels: Array<'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'ALL'> = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'ALL'];
      if (validLevels.includes(savedLevel as any)) {
        setLevel(savedLevel as any);
      }
    }
  }, []);

  const handleLanguageChange = (lang: 'fr' | 'en') => {
    setLanguage(lang);
    localStorage.setItem('spanish-sprint-language', lang);
  };

  const texts = {
    fr: {
      title: '⚡ Conjugaison',
      subtitle: 'Entraîne-toi aux verbes espagnols avec des phrases contextuelles',
      level: 'Niveau',
      back: '← Retour',
      levels: {
        A1: 'A1 - Débutant',
        A2: 'A2 - Élémentaire',
        B1: 'B1 - Intermédiaire',
        B2: 'B2 - Intermédiaire Supérieur',
        C1: 'C1 - Avancé',
        C2: 'C2 - Maîtrise',
        ALL: 'Tous niveaux'
      }
    },
    en: {
      title: '⚡ Conjugation',
      subtitle: 'Practice Spanish verbs with contextual sentences',
      level: 'Level',
      back: '← Back',
      levels: {
        A1: 'A1 - Beginner',
        A2: 'A2 - Elementary',
        B1: 'B1 - Intermediate',
        B2: 'B2 - Upper Intermediate',
        C1: 'C1 - Advanced',
        C2: 'C2 - Mastery',
        ALL: 'All levels'
      }
    }
  };

  const t = texts[language];

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <a href="/" className="text-blue-400 hover:text-blue-300">
            {t.back}
          </a>
          
          <div className="flex gap-1 bg-gray-900 rounded-lg p-1">
            <button
              onClick={() => handleLanguageChange('fr')}
              className={`px-3 py-1 rounded-md text-sm font-semibold transition ${
                language === 'fr' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              FR
            </button>
            <button
              onClick={() => handleLanguageChange('en')}
              className={`px-3 py-1 rounded-md text-sm font-semibold transition ${
                language === 'en' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-2 text-center">{t.title}</h1>
        <p className="text-center text-slate-400 mb-6">{t.subtitle}</p>

        <div className="bg-slate-800 rounded-xl p-4 mb-6 border border-slate-700">
          <div className="flex items-center justify-center gap-2">
            <label className="text-sm text-slate-400">{t.level}:</label>
            <select
              value={level}
              onChange={(e) => {
                const newLevel = e.target.value as typeof level;
                setLevel(newLevel);
                localStorage.setItem('spanish-sprint-level', newLevel);
              }}
              className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
            >
              <option value="A1">{t.levels.A1}</option>
              <option value="A2">{t.levels.A2}</option>
              <option value="B1">{t.levels.B1}</option>
              <option value="B2">{t.levels.B2}</option>
              <option value="C1">{t.levels.C1}</option>
              <option value="C2">{t.levels.C2}</option>
              <option value="ALL">{t.levels.ALL}</option>
            </select>
          </div>
        </div>

        <Conjugation level={level} country="ALL" />
      </div>
    </div>
  );
}