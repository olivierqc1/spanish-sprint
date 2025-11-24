'use client';

import { useState } from 'react';
import GrammarExplorer from '@/components/GrammarExplorer';
import LevelPicker from '@/components/LevelPicker';
import type { Level, Country } from '@/components/LevelPicker';
import { grammarPoints } from '@/data/grammar';

export default function GrammairePage() {
  const [level, setLevel] = useState<Level>('A1');
  const [country, setCountry] = useState<Country>('ALL');

  // Convertir pour GrammarExplorer (accepte seulement A1, A2, B1)
  const actualLevel: "A1" | "A2" | "B1" = 
    level === 'A1' || level === 'A2' || level === 'B1' 
      ? level 
      : 'A1'; // Par défaut A1 si ALL ou autre niveau

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">📚 Grammaire</h1>
        
        <LevelPicker
          level={level}
          country={country}
          onLevel={setLevel}
          onCountry={setCountry}
          sections={{
            listening: false,
            reading: false,
            flashcards: false,
            orthographe: false,
            dictee: false,
            grammar: true,
            conjugation: false,
            smartReview: false,
            vocabQuiz: false,
            planning: false,
            dashboard: false,
            badges: false
          }}
          onSections={() => {}}
        />

        <div className="mt-8">
          <GrammarExplorer points={grammarPoints} initialLevel={actualLevel} />
        </div>
      </div>
    </div>
  );
}