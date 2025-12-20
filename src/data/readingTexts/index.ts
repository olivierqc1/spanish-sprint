// src/data/readingTexts/index.ts

export * from './types';
export { spainTexts } from './spain';
export { mexicoTexts } from './mexico';
export { argentinaTexts } from './argentina';
export { colombiaTexts } from './colombia';
export { peruTexts } from './peru';
export { chileTexts } from './chile';
export { cubaTexts } from './cuba';
export { venezuelaTexts } from './venezuela';

import { spainTexts } from './spain';
import { mexicoTexts } from './mexico';
import { argentinaTexts } from './argentina';
import { colombiaTexts } from './colombia';
import { peruTexts } from './peru';
import { chileTexts } from './chile';
import { cubaTexts } from './cuba';
import { venezuelaTexts } from './venezuela';

// Export un tableau combiné de tous les textes
export const allReadingTexts = [
  ...spainTexts,
  ...mexicoTexts,
  ...argentinaTexts,
  ...colombiaTexts,
  ...peruTexts,
  ...chileTexts,
  ...cubaTexts,
  ...venezuelaTexts
];

// Export par pays pour un accès facile
export const readingTextsByCountry = {
  spain: spainTexts,
  mexico: mexicoTexts,
  argentina: argentinaTexts,
  colombia: colombiaTexts,
  peru: peruTexts,
  chile: chileTexts,
  cuba: cubaTexts,
  venezuela: venezuelaTexts
};

// Helper pour obtenir les textes d'un pays spécifique
export const getTextsByCountry = (country: keyof typeof readingTextsByCountry) => {
  return readingTextsByCountry[country];
};

// Helper pour obtenir les textes par niveau
export const getTextsByLevel = (level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2') => {
  return allReadingTexts.filter(text => text.level === level);
};

// Helper pour obtenir les textes par pays ET niveau
export const getTextsByCountryAndLevel = (
  country: keyof typeof readingTextsByCountry, 
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
) => {
  return readingTextsByCountry[country].filter(text => text.level === level);
};