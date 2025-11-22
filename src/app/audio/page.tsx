'use client';

import { useState } from 'react';
import Listening from '@/components/Listening';
import LevelPicker from '@/components/LevelPicker';
import type { Level, Country } from '@/components/LevelPicker';

export default function AudioPage() {
  const [level, setLevel] = useState<Level>('A1');
  const [country, setCountry] = useState<Country>('ALL');

  const audioItems = [
    {
      id: 1,
      title: 'Exemple - Conversation au restaurant',
      audioUrl: '/audios/exemple.mp3',
      transcript: 'Exemple de transcription à venir...',
      level: 'A1' as Level,
      country: 'spain' as Country
    }
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">🎧 Audio</h1>
        
        <LevelPicker
          level={level}
          country={country}
          onLevel={setLevel}
          onCountry={setCountry}
          sections={[]}
          onSections={() => {}}
        />

        <div className="mt-8">
          <Listening items={audioItems} level={level} country={country} />
        </div>
      </div>
    </div>
  );
}