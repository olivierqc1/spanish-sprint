"use client";
import { useMemo, useState, useEffect } from "react";
import type { Level, Country } from "./LevelPicker";
import { recordAnswer } from "@/data/progress";

type WordItem = {
  id: string;
  front: string;
  back: string;
  backEn?: string;
  level: string;
  country: string;
  category: string;
};

// ✅ TYPE EXPORTÉ POUR exercices.ts
export type DicteeItem = {
  id: string;
  level: string;
  country: string;
  title: string;
  audio: string;
  transcript: string;
};

type DicteeExercise = {
  id: string;
  level: Exclude<Level, "ALL">;
  text: string; // Le texte à dicter
  type: 'word' | 'sentence';
};

export default function Dictee({
  words,
  level,
  country
}: {
  words: { A1: WordItem[], A2: WordItem[], B1: WordItem[] };
  level: Level;
  country: Country;
}) {
  const [currentExercise, setCurrentExercise] = useState<DicteeExercise | null>(null);
  const [userText, setUserText] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Phrases contextuelles pour A2/B1
  const sentenceTemplates = {
    A2: [
      "Ayer {verb} en el parque con mis amigos.",
      "Mañana voy a {verb} temprano.",
      "Me gusta {verb} los fines de semana.",
      "No puedo {verb} porque estoy ocupado.",
      "Siempre {verb} después de comer.",
      "¿Quieres {verb} conmigo esta tarde?",
      "Necesito {verb} antes de salir.",
      "Mi hermano prefiere {verb} en casa.",
      "Estoy aprendiendo a {verb} mejor.",
      "Deberías {verb} más a menudo."
    ],
    B1: [
      "Si tuviera tiempo, {verb} todos los días.",
      "Cuando era niño, solía {verb} mucho.",
      "Me gustaría que {verb} más seguido.",
      "Es importante {verb} para mantener la salud.",
      "No es fácil {verb} cuando hace frío.",
      "Espero que puedas {verb} este fin de semana.",
      "Aunque {verb}, no mejoro mucho.",
      "Antes de {verb}, siempre me preparo bien.",
      "Después de {verb}, me siento mejor.",
      "A pesar de que {verb}, no me canso."
    ]
  };

  // Générer un exercice
  const generateExercise = () => {
    let targetLevel: 'A1' | 'A2' | 'B1' = level === 'ALL' ? 'A1' : level as 'A1' | 'A2' | 'B1';
    
    if (level === 'ALL') {
      // Choix aléatoire si ALL
      const levels: Array<'A1' | 'A2' | 'B1'> = ['A1', 'A2', 'B1'];
      targetLevel = levels[Math.floor(Math.random() * levels.length)];
    }

    const levelWords = words[targetLevel];
    
    if (!levelWords || levelWords.length === 0) {
      setCurrentExercise(null);
      return;
    }

    // Pour A1: mots isolés
    if (targetLevel === 'A1') {
      const randomWord = levelWords[Math.floor(Math.random() * levelWords.length)];
      setCurrentExercise({
        id: randomWord.id,
        level: targetLevel,
        text: randomWord.front,
        type: 'word'
      });
    } 
    // Pour A2/B1: phrases complètes
    else {
      const verbs = levelWords.filter(w => w.category === 'verbe');
      if (verbs.length === 0) {
        // Fallback sur mot isolé si pas de verbes
        const randomWord = levelWords[Math.floor(Math.random() * levelWords.length)];
        setCurrentExercise({
          id: randomWord.id,
          level: targetLevel,
          text: randomWord.front,
          type: 'word'
        });
      } else {
        const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
        const templates = sentenceTemplates[targetLevel];
        const template = templates[Math.floor(Math.random() * templates.length)];
        const sentence = template.replace('{verb}', randomVerb.front);
        
        setCurrentExercise({
          id: randomVerb.id,
          level: targetLevel,
          text: sentence,
          type: 'sentence'
        });
      }
    }

    setUserText("");
    setShowResult(false);
    setAudioUrl(null);
  };

  // Générer audio avec Google TTS
  const generateAudio = async () => {
    if (!currentExercise) return;

    try {
      setIsPlaying(true);
      
      // Utiliser l'API Google Cloud Text-to-Speech
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: currentExercise.text,
          languageCode: 'es-ES'
        })
      });

      if (response.ok) {
        const data = await response.json();
        setAudioUrl(data.audioUrl);
        
        // Jouer l'audio
        const audio = new Audio(data.audioUrl);
        audio.onended = () => setIsPlaying(false);
        audio.play();
      } else {
        console.error('TTS API error');
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Audio generation error:', error);
      setIsPlaying(false);
    }
  };

  // Score de similitude
  const calculateScore = (userInput: string, correctText: string): number => {
    const normalize = (str: string) => 
      str.trim().toLowerCase()
         .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Enlever accents
         .replace(/[¿?¡!.,;:]/g, ""); // Enlever ponctuation

    const userNorm = normalize(userInput);
    const correctNorm = normalize(correctText);

    if (!userNorm && !correctNorm) return 100;
    if (!userNorm || !correctNorm) return 0;

    const userWords = userNorm.split(/\s+/);
    const correctWords = correctNorm.split(/\s+/);
    const maxLength = Math.max(userWords.length, correctWords.length);

    let correctCount = 0;
    for (let i = 0; i < maxLength; i++) {
      if (userWords[i] === correctWords[i]) {
        correctCount++;
      }
    }

    return Math.round((correctCount / maxLength) * 100);
  };

  const score = currentExercise ? calculateScore(userText, currentExercise.text) : 0;

  // Générer premier exercice au montage
  useEffect(() => {
    generateExercise();
  }, [level]);

  const checkAnswer = () => {
    setShowResult(true);
    if (currentExercise) recordAnswer(calculateScore(userText, currentExercise.text) >= 80);
  };

  const nextExercise = () => {
    generateExercise();
  };

  if (!currentExercise) {
    return (
      <div className="bg-slate-800 rounded-xl p-12 text-center border border-slate-700">
        <p className="text-slate-400">Aucun mot disponible pour ce niveau.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-blue-300 mb-2">
              🎧 Dictée - Niveau {currentExercise.level}
            </h2>
            <p className="text-slate-400">
              {currentExercise.type === 'word' 
                ? "Écoute le mot et écris-le" 
                : "Écoute la phrase et écris-la"}
            </p>
          </div>
          <button
            onClick={nextExercise}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition"
          >
            Nouvelle dictée ↻
          </button>
        </div>
      </div>

      {/* Audio player */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={generateAudio}
            disabled={isPlaying}
            className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 rounded-full flex items-center justify-center text-6xl transition-all hover:scale-105 active:scale-95"
          >
            {isPlaying ? "⏸️" : "🔊"}
          </button>
          <p className="text-sm text-slate-400">
            Clique pour écouter {currentExercise.type === 'word' ? 'le mot' : 'la phrase'}
          </p>
        </div>
      </div>

      {/* Input area */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 space-y-4">
        <label className="block text-slate-300 mb-2">
          ✍️ Écris ce que tu entends :
        </label>
        <textarea
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
              checkAnswer();
            }
          }}
          placeholder={currentExercise.type === 'word' ? "Écris le mot ici..." : "Écris la phrase ici..."}
          rows={currentExercise.type === 'word' ? 2 : 4}
          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white text-lg focus:border-blue-500 focus:outline-none resize-none"
          autoFocus
        />
        
        {!showResult ? (
          <button
            onClick={checkAnswer}
            disabled={!userText.trim()}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition text-xl"
          >
            Vérifier ✓
          </button>
        ) : (
          <div className="space-y-4">
            {/* Score */}
            <div className={`p-6 rounded-lg text-center border-2 ${
              score >= 90 ? 'bg-green-900 bg-opacity-30 border-green-600' :
              score >= 70 ? 'bg-yellow-900 bg-opacity-30 border-yellow-600' :
              'bg-red-900 bg-opacity-30 border-red-600'
            }`}>
              <div className="text-5xl font-bold mb-2">
                {score}%
              </div>
              <div className="text-lg">
                {score >= 90 ? '🎉 Excellent !' :
                 score >= 70 ? '👍 Bien !' :
                 '💪 Continue !'}
              </div>
            </div>

            {/* Correction */}
            <div className="bg-slate-900 rounded-lg p-4 space-y-3">
              <div>
                <div className="text-sm text-slate-400 mb-1">Ta réponse :</div>
                <div className="text-lg font-mono text-white bg-slate-800 p-3 rounded">
                  {userText || "(vide)"}
                </div>
              </div>
              <div>
                <div className="text-sm text-green-400 mb-1">Réponse correcte :</div>
                <div className="text-lg font-mono text-green-300 bg-slate-800 p-3 rounded">
                  {currentExercise.text}
                </div>
              </div>
            </div>

            {/* Next button */}
            <button
              onClick={nextExercise}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition text-xl"
            >
              Suivant →
            </button>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
        <div className="text-sm text-slate-400">
          💡 <span className="font-semibold">Astuce :</span> Utilise{' '}
          <kbd className="px-2 py-1 bg-slate-900 rounded text-xs">Ctrl</kbd> +{' '}
          <kbd className="px-2 py-1 bg-slate-900 rounded text-xs">Enter</kbd>{' '}
          pour vérifier rapidement
        </div>
      </div>
    </div>
  );
}