"use client";

import { useState } from 'react';

export default function Home() {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');

  const texts = {
    fr: {
      title: '🇪🇸 Spanish Sprint',
      subtitle: 'Apprends l\'espagnol de 8 pays différents 🇪🇸 🇲🇽 🇦🇷 🇨🇴 🇵🇪 🇨🇱 🇨🇺 🇻🇪',
      from: 'J\'apprends depuis le',
      flashcards: { title: 'Flashcards', desc: 'Apprends du vocabulaire par pays' },
      audio: { title: 'Audio', desc: 'Écoute et répète' },
      grammar: { title: 'Grammaire', desc: 'Exercices de grammaire' },
      conjugation: { title: 'Conjugaison', desc: 'Entraîne-toi aux verbes' },
      conversations: { title: 'Conversations', desc: 'Pratique avec l\'IA' },
      audioPro: { title: 'Audio Pro', desc: 'Génère des audios' }
    },
    en: {
      title: '🇪🇸 Spanish Sprint',
      subtitle: 'Learn Spanish from 8 different countries 🇪🇸 🇲🇽 🇦🇷 🇨🇴 🇵🇪 🇨🇱 🇨🇺 🇻🇪',
      from: 'Learning from',
      flashcards: { title: 'Flashcards', desc: 'Learn vocabulary by country' },
      audio: { title: 'Audio', desc: 'Listen and repeat' },
      grammar: { title: 'Grammar', desc: 'Grammar exercises' },
      conjugation: { title: 'Conjugation', desc: 'Practice verbs' },
      conversations: { title: 'Conversations', desc: 'Practice with AI' },
      audioPro: { title: 'Audio Pro', desc: 'Generate audios' }
    }
  };

  const t = texts[language];

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Flashcards */}
          <a 
            href="/flashcards" 
            className="bg-slate-800 hover:bg-slate-700 p-8 rounded-xl border border-slate-700 transition-all hover:scale-105"
          >
            <div className="text-4xl mb-4">🎴</div>
            <h2 className="text-2xl font-bold mb-2">{t.flashcards.title}</h2>
            <p className="text-slate-400">{t.flashcards.desc}</p>
          </a>

          {/* Audio */}
          <a 
            href="/audio" 
            className="bg-slate-800 hover:bg-slate-700 p-8 rounded-xl border border-slate-700 transition-all hover:scale-105"
          >
            <div className="text-4xl mb-4">🎧</div>
            <h2 className="text-2xl font-bold mb-2">{t.audio.title}</h2>
            <p className="text-slate-400">{t.audio.desc}</p>
          </a>

          {/* Grammaire */}
          <a 
            href="/grammaire" 
            className="bg-slate-800 hover:bg-slate-700 p-8 rounded-xl border border-slate-700 transition-all hover:scale-105"
          >
            <div className="text-4xl mb-4">📚</div>
            <h2 className="text-2xl font-bold mb-2">{t.grammar.title}</h2>
            <p className="text-slate-400">{t.grammar.desc}</p>
          </a>

          {/* Conjugaison */}
          <a 
            href="/conjugaison" 
            className="bg-slate-800 hover:bg-slate-700 p-8 rounded-xl border border-slate-700 transition-all hover:scale-105"
          >
            <div className="text-4xl mb-4">✍️</div>
            <h2 className="text-2xl font-bold mb-2">{t.conjugation.title}</h2>
            <p className="text-slate-400">{t.conjugation.desc}</p>
          </a>

          {/* Conversations */}
          <a 
            href="/conversations" 
            className="bg-slate-800 hover:bg-slate-700 p-8 rounded-xl border border-slate-700 transition-all hover:scale-105"
          >
            <div className="text-4xl mb-4">💬</div>
            <h2 className="text-2xl font-bold mb-2">{t.conversations.title}</h2>
            <p className="text-slate-400">{t.conversations.desc}</p>
          </a>

          {/* Audio Pro */}
          <a 
            href="/audio-pro" 
            className="bg-slate-800 hover:bg-slate-700 p-8 rounded-xl border border-slate-700 transition-all hover:scale-105"
          >
            <div className="text-4xl mb-4">🎙️</div>
            <h2 className="text-2xl font-bold mb-2">{t.audioPro.title}</h2>
            <p className="text-slate-400">{t.audioPro.desc}</p>
          </a>
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-400">{t.subtitle}</p>
        </div>
      </div>
    </main>
  );
}