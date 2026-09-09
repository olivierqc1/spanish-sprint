// src/data/lectures/index.ts
// Fusionne les morceaux (base1/base2/new1) en un seul tableau, comme avant.
// Rien à changer ailleurs : les imports "@/data/lectures" continuent de marcher.
export type { Lectura } from './types';
import { lecturesBase1 } from './base1';
import { lecturesBase2 } from './base2';
import { lecturesNew1 } from './new1';
import type { Lectura } from './types';

export const lectures: Lectura[] = [...lecturesBase1, ...lecturesBase2, ...lecturesNew1];
