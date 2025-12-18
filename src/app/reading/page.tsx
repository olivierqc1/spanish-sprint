// src/app/reading/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { allReadingTexts as readingTexts, type ReadingText } from "@/data/readingTexts";

type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
type Country = 'ALL' | 'spain' | 'mexico' | 'argentina' | 'colombia' | 'peru' | 'chile' | 'cuba' | 'venezuela';

export default function ReadingPage() {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [level, setLevel] = useState<Level>('A1');
  const [country, setCountry] = useState<Country>('ALL');
  const [selectedText, setSelectedText] = useState<ReadingText | null>(null);
  const [showContext, setShowContext] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('spanish-sprint-language');
    const savedLevel = localStorage.getItem('spanish-sprint-level');
    const savedCountry = localStorage.getItem('spanish-sprint-country');
    
    if (savedLang === 'fr' || savedLang === 'en') setLanguage(savedLang);
    if (savedLevel) setLevel(savedLevel as Level);
    if (savedCountry && savedCountry !== 'ALL') setCountry(savedCountry as Country);
  }, []);

  const texts = {
    fr: {
      title: '📖 Lecture',
      subtitle: 'Lis des textes authentiques par pays et niveau',
      level: 'Niveau',
      country: 'Pays',
      noTexts: 'Aucun texte disponible pour ce niveau/pays.',
      back: '← Retour',
      backToList: '← Retour à la liste',
      context: 'Contexte',
      vocabulary: 'Vocabulaire clé',
      questions: 'Questions de compréhension',
      author: 'Auteur',
      type: 'Type',
      showContext: '💡 Afficher le contexte',
      hideContext: '💡 Masquer le contexte',
      types: {
        story: 'Histoire',
        article: 'Article',
        dialogue: 'Dialogue',
        poem: 'Poème',
        news: 'Actualités',
        literature: 'Littérature'
      }
    },
    en: {
      title: '📖 Reading',
      subtitle: 'Read authentic texts by country and level',
      level: 'Level',
      country: 'Country',
      noTexts: 'No texts available for this level/country.',
      back: '← Back',
      backToList: '← Back to list',
      context: 'Context',
      vocabulary: 'Key vocabulary',
      questions: 'Comprehension questions',
      author: 'Author',
      type: 'Type',
      showContext: '💡 Show context',
      hideContext: '💡 Hide context',
      types: {
        story: 'Story',
        article: 'Article',
        dialogue: 'Dialogue',
        poem: 'Poem',
        news: 'News',
        literature: 'Literature'
      }
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

  const filtered = useMemo(() => {
    let pool = readingTexts;
    if (level) pool = pool.filter(t => t.level === level);
    if (country !== 'ALL') pool = pool.filter(t => t.country === country);
    return pool;
  }, [level, country]);

  const textsByCountry = useMemo(() => {
    const grouped: Record<string, ReadingText[]> = {};
    filtered.forEach(text => {
      if (!grouped[text.country]) grouped[text.country] = [];
      grouped[text.country].push(text);
    });
    return grouped;
  }, [filtered]);

  // Vue détaillée d'un texte
  if (selectedText) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <button 
              onClick={() => setSelectedText(null)}
              className="text-slate-400 hover:text-white transition"
            >
              {t.backToList}
            </button>
            <div className="bg-slate-800 rounded-lg p-1 flex gap-1">
              <button
                onClick={() => setLanguage('fr')}
                className={`px-4 py-2 rounded-md transition ${
                  language === 'fr' ? 'bg-blue-600 text-white' : 'text-slate-400'
                }`}
              >
                🇫🇷 FR
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 rounded-md transition ${
                  language === 'en' ? 'bg-blue-600 text-white' : 'text-slate-400'
                }`}
              >
                🇬🇧 EN
              </button>
            </div>
          </div>

          {/* Métadonnées */}
          <div className="bg-slate-800 rounded-xl p-6 mb-6 border border-slate-700">
            <div className="flex gap-3 mb-4 flex-wrap">
              <span className="px-3 py-1 bg-blue-600 rounded-full text-sm font-bold">
                {selectedText.level}
              </span>
              <span className="px-3 py-1 bg-purple-600 rounded-full text-sm font-bold">
                {countries[language][selectedText.country]}
              </span>
              <span className="px-3 py-1 bg-green-600 rounded-full text-sm">
                {t.types[selectedText.type]}
              </span>
              {selectedText.author && (
                <span className="px-3 py-1 bg-slate-700 rounded-full text-sm">
                  {selectedText.author}
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold">{selectedText.title}</h1>
          </div>

          {/* Bouton contexte */}
          <div className="mb-6 text-center">
            <button
              onClick={() => setShowContext(!showContext)}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition"
            >
              {showContext ? t.hideContext : t.showContext}
            </button>
          </div>

          {/* Contexte */}
          {showContext && (
            <div className="bg-slate-800 rounded-xl p-6 mb-6 border-l-4 border-purple-500">
              <h3 className="text-lg font-bold mb-3 text-purple-300">{t.context}</h3>
              <p className="text-slate-300 leading-relaxed">{selectedText.context[language]}</p>
            </div>
          )}

          {/* Texte principal */}
          <div className="bg-slate-800 rounded-xl p-8 mb-6 border border-slate-700">
            <p className="text-xl leading-loose text-slate-100" style={{ lineHeight: '2' }}>
              {selectedText.excerpt}
            </p>
          </div>

          {/* Vocabulaire */}
          {selectedText.vocab && selectedText.vocab.length > 0 && (
            <div className="bg-slate-800 rounded-xl p-6 mb-6 border-l-4 border-green-500">
              <h3 className="text-lg font-bold mb-4 text-green-300">{t.vocabulary}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedText.vocab.map((word, i) => (
                  <div key={i} className="bg-slate-900 p-3 rounded-lg">
                    <span className="text-slate-300">{word}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Questions */}
          {selectedText.questions && selectedText.questions[language].length > 0 && (
            <div className="bg-slate-800 rounded-xl p-6 border-l-4 border-yellow-500">
              <h3 className="text-lg font-bold mb-4 text-yellow-300">{t.questions}</h3>
              <ol className="list-decimal list-inside space-y-3">
                {selectedText.questions[language].map((q, i) => (
                  <li key={i} className="text-slate-300">{q}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </main>
    );
  }

  // Vue liste
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="text-slate-400 hover:text-white transition">
            {t.back}
          </Link>
          <div className="bg-slate-800 rounded-lg p-1 flex gap-1">
            <button
              onClick={() => setLanguage('fr')}
              className={`px-4 py-2 rounded-md transition ${
                language === 'fr' ? 'bg-blue-600 text-white' : 'text-slate-400'
              }`}
            >
              🇫🇷 FR
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 rounded-md transition ${
                language === 'en' ? 'bg-blue-600 text-white' : 'text-slate-400'
              }`}
            >
              🇬🇧 EN
            </button>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-2 text-center">{t.title}</h1>
        <p className="text-center text-slate-400 mb-8">{t.subtitle}</p>

        {/* Filtres */}
        <div className="bg-slate-800 rounded-xl p-6 mb-8 border border-slate-700">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">{t.level}</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as Level)}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white"
              >
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
                <option value="C2">C2</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-slate-400 mb-2">{t.country}</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value as Country)}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white"
              >
                {Object.entries(countries[language]).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Liste des textes */}
        {filtered.length === 0 ? (
          <div className="bg-slate-800 rounded-xl p-12 text-center border border-slate-700">
            <p className="text-slate-400 text-lg">{t.noTexts}</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(textsByCountry).map(([countryKey, texts]) => (
              <div key={countryKey}>
                <h2 className="text-2xl font-bold mb-4 text-blue-300">
                  {countries[language][countryKey as Country]}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {texts.map(text => (
                    <div
                      key={text.id}
                      onClick={() => setSelectedText(text)}
                      className="bg-slate-800 hover:bg-slate-750 rounded-xl p-6 border border-slate-700 cursor-pointer transition-all hover:scale-105"
                    >
                      <div className="flex gap-2 mb-3">
                        <span className="px-2 py-1 bg-blue-600 rounded text-xs font-bold">
                          {text.level}
                        </span>
                        <span className="px-2 py-1 bg-green-600 rounded text-xs">
                          {t.types[text.type]}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{text.title}</h3>
                      {text.author && (
                        <p className="text-sm text-slate-400 mb-3">— {text.author}</p>
                      )}
                      <p className="text-slate-300 text-sm line-clamp-3">
                        {text.excerpt.substring(0, 120)}...
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}