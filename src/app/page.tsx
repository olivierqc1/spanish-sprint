"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type UILanguage = 'fr' | 'en';
type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
type Country = 'ALL' | 'spain' | 'mexico' | 'argentina' | 'colombia' | 'peru' | 'chile' | 'cuba' | 'venezuela';
type TargetLanguage = 'spanish' | 'catalan';

export default function Home() {
  const router = useRouter();
  const [uiLanguage, setUiLanguage] = useState<UILanguage>('fr');
  const [level, setLevel] = useState<Level>('A1');
  const [country, setCountry] = useState<Country>('ALL');
  const [targetLanguage, setTargetLanguage] = useState<TargetLanguage>('spanish');

  // Rehydrate from localStorage
  useEffect(() => {
    const savedUI = localStorage.getItem('spanish-sprint-language');
    const savedLevel = localStorage.getItem('spanish-sprint-level');
    const savedCountry = localStorage.getItem('spanish-sprint-country');
    const savedTarget = localStorage.getItem('iberian-sprint-target-language');

    if (savedUI === 'fr' || savedUI === 'en') setUiLanguage(savedUI);
    if (savedLevel) setLevel(savedLevel as Level);
    if (savedCountry) setCountry(savedCountry as Country);
    if (savedTarget === 'spanish' || savedTarget === 'catalan') setTargetLanguage(savedTarget);
  }, []);

  const handleTargetLanguageChange = (lang: TargetLanguage) => {
    setTargetLanguage(lang);
    localStorage.setItem('iberian-sprint-target-language', lang);
    // Reset country when switching to catalan (only catalonia relevant)
    if (lang === 'catalan') {
      setCountry('spain');
      localStorage.setItem('spanish-sprint-country', 'spain');
    }
  };

  const texts = {
    fr: {
      subtitle: 'Espagnol & Catalan — vivez Barcelone pleinement',
      targetLang: 'Je veux apprendre',
      from: 'J\'apprends depuis le',
      selectLevel: 'Ton niveau',
      selectCountry: 'Variante régionale',
      allCountries: '🌍 Toutes les variantes',
      currentSetup: 'Configuration actuelle',
      spanish: '🇪🇸 Espagnol',
      catalan: '🟡 Catalan',
      catalanBadge: 'Nouveau',
      modules: {
        flashcards: { title: 'Flashcards', desc: 'Vocabulaire par pays et niveau' },
        audio: { title: 'Audio', desc: 'Écoute et répète' },
        grammar: { title: 'Grammaire', desc: 'Exercices de grammaire' },
        conjugation: { title: 'Conjugaison', desc: 'Entraîne-toi aux verbes' },
        conversations: { title: 'Conversations', desc: 'Pratique avec l\'IA' },
        audioPro: { title: 'Audio Pro', desc: 'Génère des audios TTS' },
        reading: { title: 'Lecture', desc: 'Textes authentiques' },
        dictee: { title: 'Dictée', desc: 'Écris ce que tu entends' },
      },
      catalanModules: {
        flashcards: { title: 'Flashcards', desc: 'Vocabulaire catalan A1-B1' },
        conjugation: { title: 'Conjugaison', desc: 'Verbes catalans essentiels' },
        grammar: { title: 'Grammaire', desc: 'Articles, ser/estar, négation...' },
        phrases: { title: 'Phrases du quotidien', desc: 'Survie à Barcelone' },
        dictee: { title: 'Dictée', desc: 'Orthographe catalane' },
      },
      comingSoon: 'Bientôt disponible',
      available: 'Disponible',
    },
    en: {
      subtitle: 'Spanish & Catalan — live Barcelona fully',
      targetLang: 'I want to learn',
      from: 'Learning from',
      selectLevel: 'Your level',
      selectCountry: 'Regional variant',
      allCountries: '🌍 All variants',
      currentSetup: 'Current setup',
      spanish: '🇪🇸 Spanish',
      catalan: '🟡 Catalan',
      catalanBadge: 'New',
      modules: {
        flashcards: { title: 'Flashcards', desc: 'Vocabulary by country & level' },
        audio: { title: 'Audio', desc: 'Listen and repeat' },
        grammar: { title: 'Grammar', desc: 'Grammar exercises' },
        conjugation: { title: 'Conjugation', desc: 'Practice verbs' },
        conversations: { title: 'Conversations', desc: 'Practice with AI' },
        audioPro: { title: 'Audio Pro', desc: 'Generate TTS audio' },
        reading: { title: 'Reading', desc: 'Authentic texts' },
        dictee: { title: 'Dictation', desc: 'Write what you hear' },
      },
      catalanModules: {
        flashcards: { title: 'Flashcards', desc: 'Catalan vocabulary A1-B1' },
        conjugation: { title: 'Conjugation', desc: 'Essential Catalan verbs' },
        grammar: { title: 'Grammar', desc: 'Articles, ser/estar, negation...' },
        phrases: { title: 'Daily Phrases', desc: 'Survive in Barcelona' },
        dictee: { title: 'Dictation', desc: 'Catalan spelling' },
      },
      comingSoon: 'Coming soon',
      available: 'Available',
    },
  };

  const countryLabels = {
    fr: {
      ALL: '🌍 Toutes les variantes',
      spain: '🇪🇸 Espagne (castillan)',
      mexico: '🇲🇽 Mexique',
      argentina: '🇦🇷 Argentine',
      colombia: '🇨🇴 Colombie',
      peru: '🇵🇪 Pérou',
      chile: '🇨🇱 Chili',
      cuba: '🇨🇺 Cuba',
      venezuela: '🇻🇪 Venezuela',
    },
    en: {
      ALL: '🌍 All variants',
      spain: '🇪🇸 Spain (castilian)',
      mexico: '🇲🇽 Mexico',
      argentina: '🇦🇷 Argentina',
      colombia: '🇨🇴 Colombia',
      peru: '🇵🇪 Peru',
      chile: '🇨🇱 Chile',
      cuba: '🇨🇺 Cuba',
      venezuela: '🇻🇪 Venezuela',
    },
  };

  const t = texts[uiLanguage];

  const handleModuleClick = (module: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.setItem('spanish-sprint-language', uiLanguage);
    localStorage.setItem('spanish-sprint-level', level);
    localStorage.setItem('spanish-sprint-country', country);
    localStorage.setItem('iberian-sprint-target-language', targetLanguage);
    router.push(`/${module}`);
  };

  const spanishModules = [
    { key: 'flashcards', icon: '🎴', route: 'flashcards', available: true, ...t.modules.flashcards },
    { key: 'dictee', icon: '✍️', route: 'dictee', available: true, ...t.modules.dictee },
    { key: 'reading', icon: '📖', route: 'reading', available: true, ...t.modules.reading },
    { key: 'audio', icon: '🎧', route: 'audio', available: true, ...t.modules.audio },
    { key: 'grammaire', icon: '📚', route: 'grammaire', available: true, ...t.modules.grammar },
    { key: 'conjugaison', icon: '⚡', route: 'conjugaison', available: true, ...t.modules.conjugation },
    { key: 'conversations', icon: '💬', route: 'conversations', available: true, ...t.modules.conversations },
    { key: 'audioPro', icon: '🎙️', route: 'audio-pro', available: true, ...t.modules.audioPro },
  ];

  const catalanModules = [
    { key: 'flashcards', icon: '🎴', route: 'flashcards', available: true, ...t.catalanModules.flashcards },
    { key: 'conjugaison', icon: '⚡', route: 'conjugaison', available: true, ...t.catalanModules.conjugation },
    { key: 'grammaire', icon: '📚', route: 'grammaire', available: true, ...t.catalanModules.grammar },
    { key: 'dictee', icon: '✍️', route: 'dictee', available: true, ...t.catalanModules.dictee },
    { key: 'phrases', icon: '💬', route: 'conversations', available: false, ...t.catalanModules.phrases },
  ];

  const activeModules = targetLanguage === 'spanish' ? spanishModules : catalanModules;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white">
      {/* ── TOP BAR ── */}
      <div className="flex justify-end p-4">
        <div className="bg-slate-800 rounded-lg p-1 flex gap-1">
          <button
            onClick={() => { setUiLanguage('fr'); localStorage.setItem('spanish-sprint-language', 'fr'); }}
            className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all ${
              uiLanguage === 'fr' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            🇫🇷 FR
          </button>
          <button
            onClick={() => { setUiLanguage('en'); localStorage.setItem('spanish-sprint-language', 'en'); }}
            className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all ${
              uiLanguage === 'en' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            🇬🇧 EN
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-16">
        {/* ── HERO ── */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="text-5xl">🏖️</span>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-orange-400 via-yellow-300 to-red-400 bg-clip-text text-transparent">
              Iberian Sprint
            </h1>
          </div>
          <p className="text-slate-400 text-lg">{t.subtitle}</p>
        </div>

        {/* ── TARGET LANGUAGE SELECTOR ── */}
        <div className="mb-8">
          <p className="text-center text-sm text-slate-400 mb-3 font-medium uppercase tracking-widest">
            {t.targetLang}
          </p>
          <div className="flex gap-4 justify-center">
            {/* Spanish */}
            <button
              onClick={() => handleTargetLanguageChange('spanish')}
              className={`
                relative flex flex-col items-center gap-2 px-8 py-5 rounded-2xl border-2
                font-bold text-lg transition-all duration-200
                ${targetLanguage === 'spanish'
                  ? 'bg-red-900/40 border-red-500 text-white shadow-lg shadow-red-900/30 scale-105'
                  : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'
                }
              `}
            >
              <span className="text-4xl">🇪🇸</span>
              <span>{t.spanish}</span>
              <span className="text-xs font-normal text-slate-400">8 pays</span>
            </button>

            {/* Catalan */}
            <button
              onClick={() => handleTargetLanguageChange('catalan')}
              className={`
                relative flex flex-col items-center gap-2 px-8 py-5 rounded-2xl border-2
                font-bold text-lg transition-all duration-200
                ${targetLanguage === 'catalan'
                  ? 'bg-yellow-900/40 border-yellow-500 text-white shadow-lg shadow-yellow-900/30 scale-105'
                  : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'
                }
              `}
            >
              {/* NEW badge */}
              <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {t.catalanBadge}
              </span>
              <span className="text-4xl">🟡</span>
              <span>{t.catalan}</span>
              <span className="text-xs font-normal text-slate-400">Catalunya</span>
            </button>
          </div>
        </div>

        {/* ── CONFIG PANEL ── */}
        <div className={`
          rounded-2xl p-6 mb-8 border transition-colors duration-300
          ${targetLanguage === 'catalan'
            ? 'bg-yellow-950/20 border-yellow-900/50'
            : 'bg-slate-800/60 border-slate-700'
          }
        `}>
          <h2 className="text-base font-bold text-center mb-4 text-slate-300 uppercase tracking-widest text-sm">
            ⚙️ {t.currentSetup}
          </h2>

          <div className={`grid gap-4 ${targetLanguage === 'catalan' ? 'grid-cols-1 max-w-xs mx-auto' : 'grid-cols-1 md:grid-cols-2'}`}>
            {/* Level — always shown */}
            <div>
              <label className="block text-xs text-slate-400 mb-2 font-medium">
                {t.selectLevel}
              </label>
              <select
                value={level}
                onChange={(e) => {
                  setLevel(e.target.value as Level);
                  localStorage.setItem('spanish-sprint-level', e.target.value);
                }}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="A1">A1 — {uiLanguage === 'fr' ? 'Débutant' : 'Beginner'}</option>
                <option value="A2">A2 — {uiLanguage === 'fr' ? 'Élémentaire' : 'Elementary'}</option>
                <option value="B1">B1 — {uiLanguage === 'fr' ? 'Intermédiaire' : 'Intermediate'}</option>
                {targetLanguage === 'spanish' && (
                  <>
                    <option value="B2">B2 — {uiLanguage === 'fr' ? 'Intermédiaire sup.' : 'Upper Intermediate'}</option>
                    <option value="C1">C1 — {uiLanguage === 'fr' ? 'Avancé' : 'Advanced'}</option>
                    <option value="C2">C2 — {uiLanguage === 'fr' ? 'Maîtrise' : 'Mastery'}</option>
                  </>
                )}
              </select>
            </div>

            {/* Country — only for Spanish */}
            {targetLanguage === 'spanish' && (
              <div>
                <label className="block text-xs text-slate-400 mb-2 font-medium">
                  {t.selectCountry}
                </label>
                <select
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value as Country);
                    localStorage.setItem('spanish-sprint-country', e.target.value);
                  }}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="ALL">{countryLabels[uiLanguage].ALL}</option>
                  <optgroup label={uiLanguage === 'fr' ? 'Europe' : 'Europe'}>
                    <option value="spain">{countryLabels[uiLanguage].spain}</option>
                  </optgroup>
                  <optgroup label={uiLanguage === 'fr' ? 'Amérique du Nord' : 'North America'}>
                    <option value="mexico">{countryLabels[uiLanguage].mexico}</option>
                    <option value="cuba">{countryLabels[uiLanguage].cuba}</option>
                  </optgroup>
                  <optgroup label={uiLanguage === 'fr' ? 'Amérique du Sud' : 'South America'}>
                    <option value="argentina">{countryLabels[uiLanguage].argentina}</option>
                    <option value="colombia">{countryLabels[uiLanguage].colombia}</option>
                    <option value="peru">{countryLabels[uiLanguage].peru}</option>
                    <option value="chile">{countryLabels[uiLanguage].chile}</option>
                    <option value="venezuela">{countryLabels[uiLanguage].venezuela}</option>
                  </optgroup>
                </select>
              </div>
            )}
          </div>

          {/* Config summary */}
          <div className="mt-4 p-3 bg-slate-900/70 rounded-xl text-center text-sm">
            <span className="text-slate-400">
              {targetLanguage === 'catalan' ? '🟡 Català' : '🇪🇸 Español'}
            </span>
            <span className="text-slate-600 mx-2">·</span>
            <span className="font-bold text-blue-400">{level}</span>
            {targetLanguage === 'spanish' && (
              <>
                <span className="text-slate-600 mx-2">·</span>
                <span className="font-bold text-purple-400">{countryLabels[uiLanguage][country]}</span>
              </>
            )}
          </div>
        </div>

        {/* ── CATALAN INFO BANNER ── */}
        {targetLanguage === 'catalan' && (
          <div className="mb-8 p-5 rounded-2xl border border-yellow-800/50 bg-yellow-950/20">
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">🏛️</span>
              <div>
                <p className="font-bold text-yellow-300 mb-1">
                  {uiLanguage === 'fr' ? 'Pourquoi apprendre le catalan ?' : 'Why learn Catalan?'}
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {uiLanguage === 'fr'
                    ? 'Parlé par 10 millions de personnes en Catalogne, Valence et les Baléares. Indispensable pour s\'intégrer à Barcelone — administration, commerces, culture locale et relations de voisinage.'
                    : 'Spoken by 10 million people in Catalonia, Valencia and the Balearic Islands. Essential for integrating in Barcelona — administration, shops, local culture and neighbourhood relations.'
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── MODULES GRID ── */}
        <div className={`grid gap-5 ${
          targetLanguage === 'catalan'
            ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        }`}>
          {activeModules.map((mod) => (
            <div key={mod.key} className="relative">
              {mod.available ? (
                <a
                  href={`/${mod.route}`}
                  onClick={handleModuleClick(mod.route)}
                  className={`
                    group flex flex-col p-6 rounded-2xl border transition-all duration-200
                    hover:scale-[1.03] hover:shadow-xl cursor-pointer h-full
                    ${targetLanguage === 'catalan'
                      ? 'bg-yellow-950/10 border-yellow-900/40 hover:border-yellow-600 hover:bg-yellow-950/30 hover:shadow-yellow-900/20'
                      : 'bg-slate-800/50 border-slate-700 hover:border-blue-500 hover:bg-slate-800 hover:shadow-blue-900/20'
                    }
                  `}
                >
                  <div className="text-4xl mb-3">{mod.icon}</div>
                  <h2 className="text-xl font-bold mb-1">{mod.title}</h2>
                  <p className="text-slate-400 text-sm flex-1">{mod.desc}</p>
                  <div className={`
                    mt-3 self-start text-xs font-semibold px-2 py-1 rounded-full
                    ${targetLanguage === 'catalan'
                      ? 'bg-yellow-900/40 text-yellow-400'
                      : 'bg-blue-900/40 text-blue-400'
                    }
                  `}>
                    {t.available} ✓
                  </div>
                </a>
              ) : (
                <div className={`
                  flex flex-col p-6 rounded-2xl border opacity-50 cursor-not-allowed h-full
                  bg-slate-800/30 border-slate-800
                `}>
                  <div className="text-4xl mb-3 grayscale">{mod.icon}</div>
                  <h2 className="text-xl font-bold mb-1 text-slate-400">{mod.title}</h2>
                  <p className="text-slate-500 text-sm flex-1">{mod.desc}</p>
                  <div className="mt-3 self-start text-xs font-semibold px-2 py-1 rounded-full bg-slate-800 text-slate-500">
                    {t.comingSoon} ⏳
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── FOOTER ── */}
        <div className="mt-14 text-center">
          {targetLanguage === 'spanish' ? (
            <>
              <p className="text-slate-500 text-sm mb-2">
                {uiLanguage === 'fr' ? '8 variantes hispanophones' : '8 Spanish-speaking variants'}
              </p>
              <p className="text-2xl tracking-widest">🇪🇸 🇲🇽 🇦🇷 🇨🇴 🇵🇪 🇨🇱 🇨🇺 🇻🇪</p>
            </>
          ) : (
            <>
              <p className="text-slate-500 text-sm mb-2">
                {uiLanguage === 'fr' ? 'La langue de Barcelone, Valencia et les Baléares' : 'The language of Barcelona, Valencia and the Balearic Islands'}
              </p>
              <p className="text-2xl tracking-widest">🏖️ 🌊 🌹 🏛️ 🎭 🍷</p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}