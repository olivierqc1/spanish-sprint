"use client";
import { useMemo, useState } from "react";
import type { Level } from "./LevelPicker";

export type DicteeItem = {
  id: string;
  level: Exclude<Level, "ALL">;
  country: "Espagne" | "Mexique";
  title: string;
  audio: string;        // URL ou data:audio
  transcript: string;   // texte attendu
};

export default function Dictee({
  items, level, country
}: {
  items: DicteeItem[];
  level: Level;
  country: "ALL" | "spain" | "mexico";
}) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");

  const filtered = useMemo(() => {
    let pool = items;
    if (level !== "ALL") pool = pool.filter(i => i.level === level);
    if (country !== "ALL") pool = pool.filter(i => (country==="spain"? i.country==="Espagne" : i.country==="Mexique"));
    return pool;
  }, [items, level, country]);

  const cur = filtered[idx] ?? null;

  function score(a: string, b: string) {
    const na = a.trim().toLowerCase().replace(/\s+/g," ");
    const nb = b.trim().toLowerCase().replace(/\s+/g," ");
    if (!na && !nb) return 100;
    const la = na.split(" ");
    const lb = nb.split(" ");
    const m = Math.max(la.length, lb.length);
    let ok = 0;
    for (let i=0;i<m;i++) if (la[i] === lb[i]) ok++;
    return Math.round((ok / m) * 100);
  }

  const pct = cur ? score(text, cur.transcript) : 0;

  return (
    <div className="card vstack">
      <div className="hstack" style={{justifyContent:"space-between"}}>
        <strong>Dictée (écoute & écris)</strong>
        <button onClick={()=>{ setIdx(Math.floor(Math.random()*Math.max(1,filtered.length))); setText(""); }}>Nouvelle dictée</button>
      </div>
      {!cur ? <div>Aucune dictée pour ce filtre.</div> : (
        <div className="vstack">
          <div className="hstack" style={{justifyContent:"space-between"}}>
            <h3 style={{margin:0}}>{cur.title}</h3>
            <span className="badge">{cur.country} · {cur.level}</span>
          </div>
          <audio controls style={{width:"100%"}}>
            <source src={cur.audio} type="audio/mpeg" />
          </audio>
          <textarea rows={5} placeholder="Écris ici..." value={text} onChange={e=>setText(e.target.value)} />
          <div className="hstack" style={{justifyContent:"space-between"}}>
            <span className="muted">Score estimé : {pct}% (approx.)</span>
            <details><summary>Voir la correction</summary><pre style={{whiteSpace:"pre-wrap"}}>{cur.transcript}</pre></details>
          </div>
        </div>
      )}
    </div>
  );
}
