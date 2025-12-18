// src/app/dictee/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
type Country = 'ALL' | 'spain' | 'mexico' | 'argentina' | 'colombia' | 'peru' | 'chile' | 'cuba' | 'venezuela';

// Mots importés depuis les flashcards
const flashcardsWords = {
  A1: {
    spain: ['casa', 'libro', 'mesa', 'silla', 'puerta', 'ventana', 'agua', 'sol', 'luna', 'gato'],
    mexico: ['maíz', 'chile', 'taco', 'pozole', 'mole', 'aguacate', 'nopal', 'frijol', 'tortilla', 'salsa'],
    argentina: ['mate', 'asado', 'empanada', 'dulce de leche', 'bondi', 'pibe', 'boludo', 'che', 'pizza', 'vino'],
    colombia: ['café', 'arepa', 'bandeja paisa', 'aguardiente', 'cumbia', 'salsa', 'parce', 'bacano', 'chévere', 'tinto'],
    peru: ['ceviche', 'pisco', 'llama', 'quinoa', 'papa', 'machu picchu', 'inca', 'causa', 'anticucho', 'lomo saltado'],
    chile: ['pisco', 'empanada', 'completo', 'once', 'cachai', 'po', 'fome', 'cuico', 'weón', 'copete'],
    cuba: ['mojito', 'salsa', 'tabaco', 'ron', 'guagua', 'asere', 'chévere', 'jama', 'yuma', 'cohiba'],
    venezuela: ['arepa', 'pabellón', 'cachapa', 'hallaca', 'chamo', 'chévere', 'vaina', 'rumba', 'pana', 'cotufas']
  },
  A2: {
    spain: ['ordenador', 'móvil', 'coche', 'autobús', 'estación', 'aeropuerto', 'restaurante', 'tienda', 'mercado', 'banco'],
    mexico: ['ciudad', 'centro', 'zócalo', 'metro', 'camión', 'carro', 'computadora', 'celular', 'tianguis', 'colonia'],
    // ... ajouter pour tous les pays
  }
  // Ajouter B1, B2, C1, C2...
};

export default function DicteePage() {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [level, setLevel] = useState<Level>('A1');
  const [country, setCountry] = useState<Country>('spain');
  const [currentWord, setCurrentWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [usedWords, setUsedWords] = useState<string[]>([]);

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
      title: '✍️ Dictée de mots',
      subtitle: 'Écoute et écris le mot correctement',
      level: 'Niveau',
      country: 'Pays',
      yourAnswer: 'Écris ici le mot que tu entends',
      check: 'Vérifier',
      next: 'Mot suivant',
      correct: '✅ Correct !',
      incorrect: '❌ Incorrect',
      correctAnswer: 'Le bon mot était',
      score: 'Score',
      play: '🔊 Écouter',
      back: '← Retour',
      instructions: 'Clique sur 🔊 pour écouter le mot, puis écris-le dans le champ ci-dessous.'
    },
    en: {
      title: '✍️ Word Dictation',
      subtitle: 'Listen and write the word correctly',
      level: 'Level',
      country: 'Country',
      yourAnswer: 'Write the word you hear',
      check: 'Check',
      next: 'Next word',
      correct: '✅ Correct!',
      incorrect: '❌ Incorrect',
      correctAnswer: 'The correct word was',
      score: 'Score',
      play: '🔊 Listen',
      back: '← Back',
      instructions: 'Click 🔊 to listen to the word, then write it in the field below.'
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

  const getRandomWord = () => {
    const words = flashcardsWords[level]?.[country] || flashcardsWords.A1.spain;
    const availableWords = words.filter(w => !usedWords.includes(w));
    
    if (availableWords.length === 0) {
      setUsedWords([]);
      return words[Math.floor(Math.random() * words.length)];
    }
    
    const word = availableWords[Math.floor(Math.random() * availableWords.length)];
    setUsedWords([...usedWords, word]);
    return word;
  };

  const speakWord = () => {
    if (!currentWord) return;
    const utterance = new SpeechSynthesisUtterance(currentWord);
    utterance.lang = 'es-ES';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  const startNewWord = () => {
    const word = getRandomWord();
    setCurrentWord(word);
    setUserInput('');
    setShowResult(false);
    
    // Prononcer automatiquement le nouveau mot
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'es-ES';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }, 300);
  };

  const checkAnswer = () => {
    const isCorrect = userInput.trim().toLowerCase() === currentWord.toLowerCase();
    setShowResult(true);
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
  };

  useEffect(() => {
    startNewWord();
  }, [level, country]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
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

        {/* Score */}
        <div className="bg-slate-800 rounded-xl p-4 mb-6 text-center">
          <span className="text-slate-400">{t.score}: </span>
          <span className="text-green-400 font-bold text-2xl">{score.correct}</span>
          <span className="text-slate-500"> / </span>
          <span className="font-bold text-2xl">{score.total}</span>
        </div>

        {/* Zone de dictée */}
        <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
          <p className="text-center text-slate-400 mb-6">{t.instructions}</p>
          
          {/* Bouton écouter */}
          <div className="flex justify-center mb-6">
            <button
              onClick={speakWord}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-2xl font-bold transition transform hover:scale-105"
            >
              {t.play}
            </button>
          </div>

          {!showResult ? (
            <>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                placeholder={t.yourAnswer}
                className="w-full px-6 py-4 bg-slate-900 border border-slate-700 rounded-lg text-white text-center text-2xl focus:border-blue-500 focus:outline-none mb-4"
                autoFocus
              />
              <button
                onClick={checkAnswer}
                disabled={!userInput.trim()}
                className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition text-xl"
              >
                {t.check}
              </button>
            </>
          ) : (
            <>
              <div className={`p-6 rounded-lg mb-4 text-center ${
                userInput.trim().toLowerCase() === currentWord.toLowerCase()
                  ? 'bg-green-900 bg-opacity-30 border-2 border-green-600'
                  : 'bg-red-900 bg-opacity-30 border-2 border-red-600'
              }`}>
                <div className="text-3xl mb-4">
                  {userInput.trim().toLowerCase() === currentWord.toLowerCase() ? t.correct : t.incorrect}
                </div>
                {userInput.trim().toLowerCase() !== currentWord.toLowerCase() && (
                  <div>
                    <div className="text-slate-400 mb-2">{t.correctAnswer}:</div>
                    <div className="text-3xl font-bold text-green-400">{currentWord}</div>
                    <button
                      onClick={speakWord}
                      className="mt-4 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition"
                    >
                      🔊 Réécouter
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={startNewWord}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition text-xl"
              >
                {t.next} →
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}