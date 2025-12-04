'use client';

import FlashcardsSRS from '@/components/FlashcardsSRS';
import { useState, useEffect } from 'react';
import type { Level, Country } from '@/components/LevelPicker';

export default function FlashcardsSRSPage() {
  const [level, setLevel] = useState<Level>('ALL');
  const [country, setCountry] = useState<Country>('ALL');

  useEffect(() => {
    const savedLevel = localStorage.getItem('spanish-sprint-level');
    const savedCountry = localStorage.getItem('spanish-sprint-country');
    
    if (savedLevel) setLevel(savedLevel as Level);
    if (savedCountry) setCountry(savedCountry as Country);
  }, []);

  return <FlashcardsSRS level={level} country={country} />;
}