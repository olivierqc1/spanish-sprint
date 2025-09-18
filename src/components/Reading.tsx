"use client";
import { useEffect, useMemo, useState } from "react";
import { readings } from "@/data/texts";


function sampleWithoutRecent<T>(pool: T[], seen: string[], key: (x: T)=> string): T | null {
const filtered = pool.filter(x => !seen.includes(key(x)));
if (!pool.length) return null;
if (filtered.length === 0) return pool[Math.floor(Math.random()*pool.length)];
return filtered[Math.floor(Math.random()*filtered.length)];
}


export default function Reading() {
const [level, setLevel] = useState<"A1"|"A2"|"B1">("A1");
const list = useMemo(()=> readings.filter(r=> r.level===level), [level]);


const storageKey = (lvl: string)=> `reading_seen_${lvl}`;
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
}