"use client";
import { useMemo, useState } from "react";
import type { DayPlan, Intensity } from "@/lib/scheduler";
import { buildDayPlan } from "@/lib/scheduler";
import { week1 } from "@/data/curriculum";


const intensities: { key: Intensity; label: string }[] = [
{ key: "light", label: "Léger (~2h)" },
{ key: "standard", label: "Standard (~4h)" },
{ key: "intense", label: "Intense (6–8h)" },
];


export default function DailyPlan() {
const [start, setStart] = useState<string>(()=> new Date().toISOString().slice(0,10));
const [dayIndex, setDayIndex] = useState(0);
const [intensity, setIntensity] = useState<Intensity>("standard");


const lesson = week1[dayIndex] ?? week1[0];


const plan: DayPlan = useMemo(()=> buildDayPlan(
new Date(start), dayIndex, lesson.theme, ["Écoute","Vocabulaire","Grammaire","Speaking","Révision"], intensity, lesson.details
), [start, dayIndex, intensity]);


return (
<div className="card vstack">
<div className="hstack" style={{ justifyContent:'space-between', flexWrap:'wrap', gap: 8 }}>
<strong>Plan quotidien — Semaine 1</strong>
<div className="hstack">
<label className="muted">Début:</label>
<input type="date" value={start} onChange={e=> setStart(e.target.value)} />
<label className="muted">Jour:</label>
<select value={dayIndex} onChange={e=> setDayIndex(parseInt(e.target.value))}>
{week1.map((_, i)=> <option key={i} value={i}>{i+1}</option>)}
</select>
<label className="muted">Intensité:</label>
<select value={intensity} onChange={e=> setIntensity(e.target.value as Intensity)}>
{intensities.map(i=> <option key={i.key} value={i.key}>{i.label}</option>)}
</select>
</div>
</div>


<div className="muted">{plan.date} — {plan.theme}</div>
<hr />
<div className="vstack">
{plan.blocks.map((b, i)=> (
<div key={i} className="card" style={{ background:'#0b121a' }}>
<div className="hstack" style={{ justifyContent:'space-between' }}>
<strong>{b.label}</strong>
<span className="badge">{b.minutes} min</span>
</div>
<ul>
{b.details.map((d, j)=> <li key={j} className="muted">{d}</li>)}
</ul>
</div>
))}
</div>
</div>
);
}
