"use client";


function pickDrills(point: GrammarPoint, n: number, seenIds: string[]) {
const pool = point.drills.filter(d=> !seenIds.includes(`${point.id}:${d.id}`));
const src = pool.length ? pool : point.drills; // recycle si tout vu
const shuffled = [...src].sort(()=> Math.random()-0.5);
return shuffled.slice(0, Math.min(n, shuffled.length));
}


export default function GrammarExplorer() {
const [level, setLevel] = useState<"A1"|"A2"|"B1">("A1");
const points = useMemo(()=> grammarPoints.filter(g=> g.level===level), [level]);
const [pIndex, setPIndex] = useState(0);
const point = points[pIndex] ?? points[0];


const key = (lvl: string)=> `grammar_seen_${lvl}`;
const [drills, setDrills] = useState<Drill[]>([]);


useEffect(()=>{
const seen: string[] = JSON.parse(localStorage.getItem(key(level))||"[]");
const next = pickDrills(point, 6, seen);
setDrills(next);
const total = point.drills.length;
const seenForPoint = seen.filter(s=> s.startsWith(point.id+":")).length;
if (seenForPoint >= total - 1) {
const remaining = seen.filter(s=> !s.startsWith(point.id+":"));
localStorage.setItem(key(level), JSON.stringify(remaining));
}
}, [level, pIndex, point]);


function refresh() {
const seen: string[] = JSON.parse(localStorage.getItem(key(level))||"[]");
const next = pickDrills(point, 6, seen);
setDrills(next);
const updated = Array.from(new Set([...seen, ...next.map(d=> `${point.id}:${d.id}`)]));
localStorage.setItem(key(level), JSON.stringify(updated));
}


if (!point) return null;


return (
<div className="card vstack">
<div className="hstack" style={{ justifyContent:'space-between', flexWrap:'wrap' }}>
<strong>Grammaire — exercices aléatoires</strong>
<div className="hstack">
<label className="muted">Niveau:</label>
<select value={level} onChange={e=> { setLevel(e.target.value as any); setPIndex(0); }}>
<option>A1</option><option>A2</option><option>B1</option>
</select>
<label className="muted">Point:</label>
<select value={pIndex} onChange={e=> setPIndex(parseInt(e.target.value))}>
{points.map((p, i)=> <option key={p.id} value={i}>{p.topic}</option>)}
</select>
<button className="badge" onClick={refresh}>Nouveau set ↻</button>
</div>
</div>
<div className="muted">{point.topic} — {point.explanation}</div>
<ul>
{drills.map(d=> (
<li key={d.id} className="vstack" style={{ alignItems:'flex-start' }}>
<span>{d.prompt}</span>
{d.answer && <span className="badge">Réponse: {d.answer}</span>}
</li>
))}
</ul>
<div className="muted">Astuce: cache les réponses (ou enlève `answer`) pour t’auto‑corriger.</div>
</div>
);
}

