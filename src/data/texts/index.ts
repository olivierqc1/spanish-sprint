import type { ReadingItem } from "./culturalTexts";
import { spainA1, spainA2Enriched, mexicoA1Enriched, mexicoA2Enriched } from "./spainA1";
import { spainA2 } from "./spainA2";
import { spainB1 } from "./spainB1";
import { mexicoA1 } from "./mexicoA1";
import { mexicoA2 } from "./mexicoA2";
import { mexicoB1 } from "./mexicoB1";
import { colombiaA1, colombiaA2, colombiaB1 } from "./colombia";
import { peruA1, peruA2, peruB1 } from "./peru";
import { chileA1, chileA2, chileB1 } from "./chile";
import {
  argentinaA1, argentinaA2, argentinaB1,
  cubaA1, cubaA2, cubaB1,
  venezuelaA1, venezuelaA2, venezuelaB1
} from "./argentinaTexts";

export const allTexts: ReadingItem[] = [
  // Espagne
  ...spainA1,
  ...spainA2Enriched,
  ...spainA2,
  ...spainB1,

  // Mexique
  ...mexicoA1Enriched,
  ...mexicoA1,
  ...mexicoA2Enriched,
  ...mexicoA2,
  ...mexicoB1,

  // Colombie
  ...colombiaA1,
  ...colombiaA2,
  ...colombiaB1,

  // Pérou
  ...peruA1,
  ...peruA2,
  ...peruB1,

  // Chili
  ...chileA1,
  ...chileA2,
  ...chileB1,

  // Argentine
  ...argentinaA1,
  ...argentinaA2,
  ...argentinaB1,

  // Cuba
  ...cubaA1,
  ...cubaA2,
  ...cubaB1,

  // Venezuela
  ...venezuelaA1,
  ...venezuelaA2,
  ...venezuelaB1,
];
