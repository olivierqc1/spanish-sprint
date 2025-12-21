// src/data/readingTexts/index.ts

export * from './types';
export { spainTexts } from './spain';
export { mexicoTexts } from './mexico';
export { argentinaTexts } from './argentina';
export { cubaTexts } from './cuba';
export { venezuelaTexts } from './venezuela';

import { spainTexts } from './spain';
import { mexicoTexts } from './mexico';
import { argentinaTexts } from './argentina';
import { cubaTexts } from './cuba';
import { venezuelaTexts } from './venezuela';

export const allReadingTexts = [
  ...spainTexts,
  ...mexicoTexts,
  ...argentinaTexts,
  ...cubaTexts,
  ...venezuelaTexts
];

export const readingTextsByCountry = {
  spain: spainTexts,
  mexico: mexicoTexts,
  argentina: argentinaTexts,
  cuba: cubaTexts,
  venezuela: venezuelaTexts
};