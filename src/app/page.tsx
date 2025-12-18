"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Language = 'fr' | 'en';
type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
type Country = 'ALL' | 'spain' | 'mexico' | 'argentina' | 'colombia' | 'peru' | 'chile' | 'cuba' | 'venezuela';

export default function Home() {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>('fr');
  const [level, setLevel] = useState<Level>('A1');
  const [country, setCountry] = useState<Country>('ALL');

  const texts = {
    fr: {
      title: '🇪🇸 Spanish Sprint',
      subtitle: 'Apprends l\'espagnol de 8 pays différents',
      from: 'J\'apprends depuis le',
      selectLevel: 'Choisis ton niveau',
      selectCountry: 'Choisis ton pays',
      allCountries: '🌍 Tous les pays',
      flashcards: { title: 'Flashcards', desc: 'Apprends du vocabulaire par pays' },
      audio: { title: 'Audio', desc: 'Écoute et répète' },
      grammar: { title: 'Grammaire', desc: 'Exercices de grammaire' },
      conjugation: { title: 'Conjugaison', desc: 'Entraîne-toi aux verbes' },
      conversations: { title: 'Conversations', desc: 'Pratique avec l\'IA' },
      audioPro: { title: 'Audio Pro', desc: 'Génère des audios' },
      reading: { title: 'Lecture', desc: 'Lis des textes par pays' },
      dictee: { title: 'Dictée', desc: 'Écris les mots que tu entends' }
    },
    en: {
      title: '🇪🇸 Spanish Sprint',
      subtitle: 'Learn Spanish from 8 different countries',
      from: 'Learning from',
      selectLevel: 'Choose your level',
      selectCountry: 'Choose your country',
      allCountries: '🌍 All countries',
      flashcards: { title: 'Flashcards', desc: 'Learn vocabulary by country' },
      audio: { title: 'Audio', desc: 'Listen and repeat' },
      grammar: { title: 'Grammar', desc: 'Grammar exercises' },
      conjugation: { title: 'Conjugation', desc: 'Practice verbs' },
      conversations: { title: 'Conversations', desc: 'Practice with AI' },
      audioPro: { title: 'Audio Pro', desc: 'Generate audios' },
      reading: { title: 'Reading', desc: 'Read texts by country' },
      dictee: { title: 'Dictation', desc: 'Write words you hear' }
    }
  };

  const t = texts[language];

  const countries = {
    fr: {
      ALL: '🌍 Tous les pays',
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
      ALL: '🌍 All countries',
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

  const handleModuleClick = (module: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    // Stocker les préférences dans localStorage
    localStorage.setItem('spanish-sprint-language', language);
    localStorage.setItem('spanish-sprint-level', level);
    localStorage.setItem('spanish-sprint-country', country);
    // Naviguer vers le module
    router.push(`/${module}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Language Selector */}
        <div className="flex justify-end mb-6">
          <div className="bg-slate-800 rounded-lg p-1 flex gap-1">
            <button
              onClick={() => setLanguage('fr')}
              className={`px-4 py-2 rounded-md transition-all ${
                language === 'fr' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🇫🇷 Français
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 rounded-md transition-all ${
                language === 'en' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🇬🇧 English
            </button>
          </div>
        </div>

        <h1 className="text-5xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {t.title}
        </h1>
        
        <p className="text-center text-slate-400 mb-8">
          {t.from} <strong className={language === 'fr' ? 'text-blue-400' : 'text-green-400'}>
            {language === 'fr' ? 'Français' : 'English'}
          </strong> → <strong className="text-yellow-400">Español</strong>
        </p>

        {/* Configuration Panel */}
        <div className="bg-slate-800 rounded-xl p-6 mb-8 border border-slate-700">
          <h2 className="text-xl font-bold mb-4 text-center">⚙️ Configuration</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Level Selector */}
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                {t.selectLevel}
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as Level)}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="A1">A1 - {language === 'fr' ? 'Débutant' : 'Beginner'}</option>
                <option value="A2">A2 - {language === 'fr' ? 'Élémentaire' : 'Elementary'}</option>
                <option value="B1">B1 - {language === 'fr' ? 'Intermédiaire' : 'Intermediate'}</option>
                <option value="B2">B2 - {language === 'fr' ? 'Intermédiaire Supérieur' : 'Upper Intermediate'}</option>
                <option value="C1">C1 - {language === 'fr' ? 'Avancé' : 'Advanced'}</option>
                <option value="C2">C2 - {language === 'fr' ? 'Maîtrise' : 'Mastery'}</option>
              </select>
            </div>

            {/* Country Selector */}
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                {t.selectCountry}
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value as Country)}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="ALL">{countries[language].ALL}</option>
                <optgroup label={language === 'fr' ? 'Europe' : 'Europe'}>
                  <option value="spain">{countries[language].spain}</option>
                </optgroup>
                <optgroup label={language === 'fr' ? 'Amérique du Nord' : 'North America'}>
                  <option value="mexico">{countries[language].mexico}</option>
                  <option value="cuba">{countries[language].cuba}</option>
                </optgroup>
                <optgroup label={language === 'fr' ? 'Amérique du Sud' : 'South America'}>
                  <option value="argentina">{countries[language].argentina}</option>
                  <option value="colombia">{countries[language].colombia}</option>
                  <option value="peru">{countries[language].peru}</option>
                  <option value="chile">{countries[language].chile}</option>
                  <option value="venezuela">{countries[language].venezuela}</option>
                </optgroup>
              </select>
            </div>
          </div>

          {/* Current Selection Display */}
          <div className="mt-4 p-3 bg-slate-900 rounded-lg text-center">
            <span className="text-slate-400">{language === 'fr' ? 'Configuration actuelle : ' : 'Current setup: '}</span>
            <span className="font-bold text-blue-400">{level}</span>
            <span className="text-slate-400"> • </span>
            <span className="font-bold text-purple-400">{countries[language][country]}</span>
          </div>
        </div>
        
        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Flashcards */}
          <a 
            href="/flashcards"
            onClick={handleModuleClick('flashcards')}
            className="bg-slate-800 hover:bg-slate-700 p-8 rounded-xl border border-slate-700 transition-all hover:scale-105 cursor-pointer"
          >
            <div className="text-4xl mb-4">🎴</div>
            <h2 className="text-2xl font-bold mb-2">{t.flashcards.title}</h2>
            <p className="text-slate-400">{t.flashcards.desc}</p>
          </a>

          {/* Dictée */}
          <a 
            href="/dictee"
            onClick={handleModuleClick('dictee')}
            className="bg-slate-800 hover:bg-slate-700 p-8 rounded-xl border border-slate-700 transition-all hover:scale-105 cursor-pointer"
          >
            <div className="text-4xl mb-4">✍️</div>
            <h2 className="text-2xl font-bold mb-2">{t.dictee.title}</h2>
            <p className="text-slate-400">{t.dictee.desc}</p>
          </a>

          {/* Reading */}
          <a 
            href="/reading"
            onClick={handleModuleClick('reading')}
            className="bg-slate-800 hover:bg-slate-700 p-8 rounded-xl border border-slate-700 transition-all hover:scale-105 cursor-pointer"
          >
            <div className="text-4xl mb-4">📖</div>
            <h2 className="text-2xl font-bold mb-2">{t.reading.title}</h2>
            <p className="text-slate-400">{t.reading.desc}</p>
          </a>

          {/* Audio */}
          <a 
            href="/audio"
            onClick={handleModuleClick('audio')}
            className="bg-slate-800 hover:bg-slate-700 p-8 rounded-xl border border-slate-700 transition-all hover:scale-105 cursor-pointer"
          >
            <div className="text-4xl mb-4">🎧</div>
            <h2 className="text-2xl font-bold mb-2">{t.audio.title}</h2>
            <p className="text-slate-400">{t.audio.desc}</p>
          </a>

          {/* Grammaire */}
          <a 
            href="/grammaire"
            onClick={handleModuleClick('grammaire')}
            className="bg-slate-800 hover:bg-slate-700 p-8 rounded-xl border border-slate-700 transition-all hover:scale-105 cursor-pointer"
          >
            <div className="text-4xl mb-4">📚</div>
            <h2 className="text-2xl font-bold mb-2">{t.grammar.title}</h2>
            <p className="text-slate-400">{t.grammar.desc}</p>
          </a>

          {/* Conjugaison */}
          <a 
            href="/conjugaison"
            onClick={handleModuleClick('conjugaison')}
            className="bg-slate-800 hover:bg-slate-700 p-8 rounded-xl border border-slate-700 transition-all hover:scale-105 cursor-pointer"
          >
            <div className="text-4xl mb-4">⚡</div>
            <h2 className="text-2xl font-bold mb-2">{t.conjugation.title}</h2>
            <p className="text-slate-400">{t.conjugation.desc}</p>
          </a>

          {/* Conversations */}
          <a 
            href="/conversations"
            onClick={handleModuleClick('conversations')}
            className="bg-slate-800 hover:bg-slate-700 p-8 rounded-xl border border-slate-700 transition-all hover:scale-105 cursor-pointer"
          >
            <div className="text-4xl mb-4">💬</div>
            <h2 className="text-2xl font-bold mb-2">{t.conversations.title}</h2>
            <p className="text-slate-400">{t.conversations.desc}</p>
          </a>

          {/* Audio Pro */}
          <a 
            href="/audio-pro"
            onClick={handleModuleClick('audio-pro')}
            className="bg-slate-800 hover:bg-slate-700 p-8 rounded-xl border border-slate-700 transition-all hover:scale-105 cursor-pointer"
          >
            <div className="text-4xl mb-4">🎙️</div>
            <h2 className="text-2xl font-bold mb-2">{t.audioPro.title}</h2>
            <p className="text-slate-400">{t.audioPro.desc}</p>
          </a>
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-400">{t.subtitle}</p>
          <p className="text-slate-500 mt-2">🇪🇸 🇲🇽 🇦🇷 🇨🇴 🇵🇪 🇨🇱 🇨🇺 🇻🇪</p>
        </div>
      </div>
    </main>
  );
}