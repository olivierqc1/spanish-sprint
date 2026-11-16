// src/data/frequency/index.ts
// Les 500 mots les plus fréquents, par langue, du plus au moins fréquent.
export type { FreqWord } from './types';
import { esFreq1 } from './es_1';
import { esFreq2 } from './es_2';
import { caFreq1 } from './ca_1';
import { caFreq2 } from './ca_2';
import type { FreqWord } from './types';

export const frequencyLists: Record<'catalan' | 'spanish', FreqWord[]> = {
  catalan: [...caFreq1, ...caFreq2],
  spanish: [...esFreq1, ...esFreq2],
};
