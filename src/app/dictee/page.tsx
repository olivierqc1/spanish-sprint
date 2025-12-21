'use client';

import { useState, useEffect } from 'react';
import type { Level, Country } from '@/components/LevelPicker';
import { flashcardsWords } from '@/data/words';

export default function DicteePage() {
  const [level, setLevel] = useState<Level>('A1');
  const [country, setCountry] = useState<Country>('spain');
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [currentWord, setCurrentWord] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [usedWords, setUsedWords] = useState<string[]>([]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('spanish-sprint-language');
    const savedLevel = localStorage.getItem('spanish-sprint-level');
    const savedCountry = localStorage.getItem('spanish-sprint-country');

    if (savedLanguage === 'fr' || savedLanguage === 'en') {
      setLanguage(savedLanguage);
    }
    
    if (savedLevel) {
      const validLevels: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'ALL'];
      if (validLevels.includes(savedLevel as Level)) {
        setLevel(savedLevel as Level);
      }
    }
    
    if (savedCountry) {
      const validCountries: Country[] = ['spain', 'mexico', 'argentina', 'colombia', 'peru', 'chile', 'cuba', 'venezuela', 'ALL'];
      if (validCountries.includes(savedCountry as Country)) {
        setCountry(savedCountry as Country);
      }
    }
  }, []);

  const getRandomWord = () => {
    // FIX: Utilise A1 par défaut si le niveau n'existe pas dans flashcardsWords
    const safeLevel = (level === 'A1' || level === 'A2') ? level : 'A1';
    const words = flashcardsWords[safeLevel]?.[country] || flashcardsWords.A1.spain;
    const availableWords = words.filter(w => !usedWords.includes(w));
    
    if (availableWords.length === 0) {
      setUsedWords([]);
      return words[Math.floor(Math.random() * words.length)];
    }
    
    return availableWords[Math.floor(Math.random() * availableWords.length)];
  };

  const speakWord = (word: string) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'es-ES';
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  const startNewWord = () => {
    const word = getRandomWord();
    setCurrentWord(word);
    setUserAnswer('');
    setShowResult(false);
    setUsedWords([...usedWords, word]);
    speakWord(word);
  };

  useEffect(() => {
    startNewWord();
  }, [level, country]);

  const checkAnswer = () => {
    const isCorrect = userAnswer.trim().toLowerCase() === currentWord.toLowerCase();
    setShowResult(true);
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
  };

  const handleLanguageChange = (lang: 'fr' | 'en') => {
    setLanguage(lang);
    localStorage.setItem('spanish-sprint-language', lang);
  };

  const texts = {
    fr: {
      title: '✍️ Dictée',
      subtitle: 'Écoute et écris les mots',
      level: 'Niveau',
      country: 'Pays',
      back: '← Retour',
      listen: '🔊 Écouter',
      check: 'Vérifier',
      next: 'Suivant',
      score: 'Score',
      correct: 'Correct !',
      incorrect: 'Incorrect',
      answer: 'La réponse était',
      placeholder: 'Écris le mot...',
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
      title: '✍️ Dictation',
      subtitle: 'Listen and write the words',
      level: 'Level',
      country: 'Country',
      back: '← Back',
      listen: '🔊 Listen',
      check: 'Check',
      next: 'Next',
      score: 'Score',
      correct: 'Correct!',
      incorrect: 'Incorrect',
      answer: 'The answer was',
      placeholder: 'Write the word...',
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
                <option value="A1">{t.levels.A1}</option>
                <option value="A2">{t.levels.A2}</option>
                <option value="B1">{t.levels.B1}</option>
                <option value="B2">{t.levels.B2}</option>
                <option value="C1">{t.levels.C1}</option>
                <option value="C2">{t.levels.C2}</option>
                <option value="ALL">{t.levels.ALL}</option>
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

        <div className="bg-slate-800 rounded-xl p-4 text-center mb-6 border border-slate-700">
          <span className="text-slate-400">{t.score}: </span>
          <span className="text-green-400 font-bold text-2xl">{score.correct}</span>
          <span className="text-slate-500"> / </span>
          <span className="font-bold text-2xl">{score.total}</span>
        </div>

        <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 space-y-6">
          <button
            onClick={() => speakWord(currentWord)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-lg text-3xl transition"
          >
            {t.listen}
          </button>

          {!showResult ? (
            <>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                placeholder={t.placeholder}
                className="w-full px-6 py-4 bg-slate-900 border border-slate-700 rounded-lg text-white text-center text-2xl focus:border-blue-500 focus:outline-none"
                autoFocus
              />
              <button
                onClick={checkAnswer}
                disabled={!userAnswer.trim()}
                className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg text-xl transition"
              >
                {t.check}
              </button>
            </>
          ) : (
            <>
              <div className={`p-6 rounded-lg text-center ${
                userAnswer.trim().toLowerCase() === currentWord.toLowerCase()
                  ? 'bg-green-900 bg-opacity-30 border-2 border-green-600'
                  : 'bg-red-900 bg-opacity-30 border-2 border-red-600'
              }`}>
                <div className="text-3xl mb-4">
                  {userAnswer.trim().toLowerCase() === currentWord.toLowerCase() 
                    ? `✅ ${t.correct}`
                    : `❌ ${t.incorrect}`
                  }
                </div>
                {userAnswer.trim().toLowerCase() !== currentWord.toLowerCase() && (
                  <div>
                    <div className="text-slate-400 mb-2">{t.answer}:</div>
                    <div className="text-3xl font-bold text-green-400">{currentWord}</div>
                    <button
                      onClick={() => speakWord(currentWord)}
                      className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition"
                    >
                      🔊 {t.listen}
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={startNewWord}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg text-xl transition"
              >
                {t.next} →
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}