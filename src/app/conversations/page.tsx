'use client';

import { useState } from 'react';
import ConversationPractice from '@/components/ConversationPractice';
import LevelPicker from '@/components/LevelPicker';
import type { Level, Country } from '@/components/LevelPicker';

export default function ConversationsPage() {
  const [level, setLevel] = useState<Level>('A1');
  const [country, setCountry] = useState<Country>('ALL');

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">💬 Conversations</h1>
        
        <LevelPicker
          level={level}
          country={country}
          onLevelChange={setLevel}
          onCountryChange={setCountry}
        />

        <div className="mt-8">
          <ConversationPractice level={level} country={country} />
        </div>
      </div>
    </div>
  );
}