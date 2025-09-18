import { addDays, format } from "date-fns";


export type Block = { label: string; minutes: number; details: string[] };
export type DayPlan = { day: number; date: string; theme: string; blocks: Block[] };


export type Intensity = "light" | "standard" | "intense"; // ~2h, ~4h, ~6-8h


const minutesByIntensity: Record<Intensity, number[]> = {
light: [20, 20, 20, 20, 20],
standard: [35, 45, 35, 35, 30],
intense: [60, 75, 60, 60, 45],
};


export function buildDayPlan(
startDate: Date,
index0: number,
theme: string,
blocksLabels = ["Écoute", "Vocabulaire", "Grammaire", "Speaking", "Révision"],
intensity: Intensity = "standard",
detailsSeed: string[][] = []
): DayPlan {
const d = addDays(startDate, index0);
const minutes = minutesByIntensity[intensity];
const blocks = blocksLabels.map((label, i) => ({
label,
minutes: minutes[i] ?? 30,
details: detailsSeed[i] ?? [],
}));
return { day: index0 + 1, date: format(d, 'yyyy-MM-dd'), theme, blocks };
}
