// src/data/input/index.ts
export type { InputEpisode, InputSeries, InputLang, InputLevel, InputQuestion } from './types';
import { catalanSeries } from './catalan';
import { spanishSeries } from './spanish';
import type { InputLang, InputSeries } from './types';

export const inputSeries: Record<InputLang, InputSeries> = {
  catalan: catalanSeries,
  spanish: spanishSeries,
};
