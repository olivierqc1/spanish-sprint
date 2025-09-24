"use client";
import { useMemo, useState } from "react";
import type { Level } from "./LevelPicker";

export type Card = {
  id: string;
  front: string;
  back: string;
  level?: Exclude<Level, "ALL">;    // optionnel = évite les erreurs TS
  tag?: string;
  country?: "Espagne" | "Mexique";
};

export default function Flashcards({
  cards, level, country
}: {
  cards: Card[];
  level: Level;
  country: "ALL" | "spain" | "mexico";
}) {
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);

  const filtered = useMemo(() => {
    let pool = cards;
    if (level !== "ALL") pool = pool.filter(c => c.level === level);
    if (country !== "ALL") pool = pool.filter(c => (country==="spain"? c.country==="Espagne" : c.country==="Mexique"));
    return pool.filter(c => (c.front + " " + c.back + " " + (c.tag ?? "")).toLowerCase().includes(q.toLowerCase()));
  }, [cards, q, level, country]);

  const cur = filtered[idx] ?? null;

  return (
    <div className="card vstack">
      <div className="hstack" style={{justifyContent:"space-between"}}>
        <strong>Flashcards</strong>
        <input placeholder="Recherche..." value={q} onChange={e=>{setQ(e.target.value); setIdx(0);}} />
      </div>
      {!cur ? <div className="muted">Aucune carte pour ce filtre.</div> : (
        <Flip front={cur.front} back={cur.back} tag={cur.tag} idx={idx} total={filtered.length}
          onPrev={()=>setIdx(i=>Math.max(0,i-1))} onNext={()=>setIdx(i=>Math.min(filtered.length-1,i+1))} />
      )}
    </div>
  );
}

function Flip({
  front, back, tag, idx, total, onPrev, onNext
}: {
  front:string; back:string; tag?:string; idx:number; total:number;
  onPrev:()=>void; onNext:()=>void;
}) {
  const [showBack, setShowBack] = useState(false);
  return (
    <div className="vstack" onClick={()=>setShowBack(s=>!s)} style={{cursor:"pointer"}}>
      <div className="hstack" style={{justifyContent:"space-between"}}>
        <span className="badge">{tag ?? "vocabulaire"}</span>
        <span className="muted">{idx+1} / {total}</span>
      </div>
      <h2 style={{textAlign:"center",margin:"12px 0"}}>{showBack? back : front}</h2>
      <div className="hstack" style={{justifyContent:"space-between"}}>
        <button onClick={(e)=>{e.stopPropagation(); setShowBack(false); onPrev();}}>◀ Précédent</button>
        <button onClick={(e)=>{e.stopPropagation(); setShowBack(false); onNext();}}>Suivant ▶</button>
      </div>
      <div className="muted" style={{textAlign:"center"}}>(cliquer pour retourner)</div>
    </div>
  );
}
