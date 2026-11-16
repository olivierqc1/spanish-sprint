// src/data/frequency/index.ts
// Les 2 000 mots les plus fréquents, par langue, du plus au moins fréquent.
export type { FreqWord } from './types';
import { esFreq1 } from './es_1';
import { esFreq2 } from './es_2';
import { esFreq3 } from './es_3';
import { esFreq4 } from './es_4';
import { esFreq5 } from './es_5';
import { esFreq6 } from './es_6';
import { esFreq7 } from './es_7';
import { esFreq8 } from './es_8';
import { caFreq1 } from './ca_1';
import { caFreq2 } from './ca_2';
import { caFreq3 } from './ca_3';
import { caFreq4 } from './ca_4';
import { caFreq5 } from './ca_5';
import { caFreq6 } from './ca_6';
import { caFreq7 } from './ca_7';
import { caFreq8 } from './ca_8';
import type { FreqWord } from './types';

export const frequencyLists: Record<'catalan' | 'spanish', FreqWord[]> = {
  catalan: [...caFreq1, ...caFreq2, ...caFreq3, ...caFreq4, ...caFreq5, ...caFreq6, ...caFreq7, ...caFreq8],
  spanish: [...esFreq1, ...esFreq2, ...esFreq3, ...esFreq4, ...esFreq5, ...esFreq6, ...esFreq7, ...esFreq8],
};
