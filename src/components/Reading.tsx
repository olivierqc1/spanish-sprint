"use client";
const [curId, setCurId] = useState<string | null>(null);


useEffect(()=>{
const seen = JSON.parse(localStorage.getItem(storageKey(level))||"[]");
const pick = sampleWithoutRecent(list, seen, r=> r.id);
setCurId(pick?.id ?? null);
if (seen.length >= list.length - 1) localStorage.setItem(storageKey(level), JSON.stringify([]));
}, [level, list.length]);


const cur = list.find(r=> r.id===curId) ?? list[0];


function next() {
const key = storageKey(level);
const seen = JSON.parse(localStorage.getItem(key)||"[]");
const nxt = sampleWithoutRecent(list, seen, r=> r.id);
if (!nxt) return;
setCurId(nxt.id);
const updated = Array.from(new Set([...seen, nxt.id])).slice(-list.length);
localStorage.setItem(key, JSON.stringify(updated));
}


if (!cur) return null;


return (
<div className="card vstack">
<div className="hstack" style={{ justifyContent:'space-between' }}>
<strong>Lectures graduées</strong>
<div className="hstack">
<label className="muted">Niveau:</label>
<select value={level} onChange={e=> setLevel(e.target.value as any)}>
<option>A1</option><option>A2</option><option>B1</option>
</select>
<button className="badge" onClick={next}>Nouveau texte →</button>
</div>
</div>
<div className="muted">{cur.author} • {cur.type} • {cur.title}</div>
<pre style={{ whiteSpace:'pre-wrap', background:'#0b121a', padding:12, borderRadius:12 }}>{cur.excerpt}</pre>
{cur.glosses && (
<div className="hstack" style={{ flexWrap:'wrap' }}>
{Object.entries(cur.glosses).map(([w, g])=> (
<span key={w} className="badge">{w}: {g}</span>
))}
</div>
)}
{cur.prompts && (
<ul>
{cur.prompts.map((p,i)=> <li key={i} className="muted">{p}</li>)}
</ul>
)}
</div>
);
};
