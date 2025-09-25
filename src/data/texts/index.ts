import type { ReadingItem } from "@/components/Reading";
import { spainA1 } from "./spainA1";
import { spainA2 } from "./spainA2";
import { spainB1 } from "./spainB1";
import { mexicoA1 } from "./mexicoA1";
import { mexicoA2 } from "./mexicoA2";
import { mexicoB1 } from "./mexicoB1";

export const allTexts: ReadingItem[] = [
  ...spainA1, ...spainA2, ...spainB1,
  ...mexicoA1, ...mexicoA2, ...mexicoB1,
];
