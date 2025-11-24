'use client';

import { useState } from 'react';
import ConversationPractice from '@/components/ConversationPractice';
import LevelPicker from '@/components/LevelPicker';
import type { Level, Country } from '@/components/LevelPicker';

export default function ConversationsPage() {
  const [level, setLevel] = useState<Level>('A1');
  const [country, setCountry] = useState<Country>('ALL');

  // Convertir Level pour ConversationPractice (pas de "ALL" accepté)
  const actualLevel: "A1" | "A2" | "B1" | "B2" | "C1" | "C2" = 
    level === 'ALL' ? 'A1' : level;
  
  // Convertir Country pour ConversationPractice (que 4 pays acceptés)
  const actualCountry: "ALL" | "spain" | "mexico" | "argentina" = 
    country === 'ALL' || country === 'spain' || country === 'mexico' || country === 'argentina'
      ? country
      : country === 'colombia' || country === 'venezuela' || country === 'peru'
      ? 'mexico'  // Pays proches d'Amérique latine
      : 'argentina'; // chile, cuba → argentina

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">💬 Conversations</h1>
        
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
            grammar: false,
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
          <ConversationPractice level={actualLevel} country={actualCountry} />
        </div>
      </div>
    </div>
  );
}