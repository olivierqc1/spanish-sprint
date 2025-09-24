"use client";
import { useState, useMemo } from "react";
import type { Level } from "./LevelPicker";

export type ReadingItem = {
  id: string;
  level: Exclude<Level, "ALL">;
  country: "Espagne" | "Mexique";
  title: string;
  excerpt: string;
  context: string;
  vocab: string[];
  questions: string[];
  author?: string;
  type?: string;
};

export default function Reading({
  items, level, country
}: {
  items: ReadingItem[];
  level: Level;
  country: "ALL" | "spain" | "mexico";
}) {
  const [idx, setIdx] = useState(0);
  const filtered = useMemo(() => {
    let pool = items;
    if (level !== "ALL") pool = pool.filter(i => i.level === level);
    if (country !== "ALL") pool = pool.filter(i => (country === "spain" ? i.country==="Espagne" : i.country==="Mexique"));
    return pool;
  }, [items, level, country]);
  const cur = filtered[idx] ?? null;

  return (
    <div className="card vstack">
      <div className="hstack" style={{justifyContent:"space-between"}}>
        <strong>Lectures graduées</strong>
        <button onClick={() => setIdx(Math.floor(Math.random()*Math.max(1,filtered.length)))}>Nouveau</button>
      </div>
      {!cur ? <div>Aucun texte pour ce filtre.</div> : (
        <div className="vstack">
          <div className="hstack" style={{justifyContent:"space-between"}}>
            <span className="badge">{cur.country}</span>
            <span className="muted">{cur.level}</span>
          </div>
          <h3 style={{margin:0}}>{cur.title}</h3>
          {cur.author && <div className="muted">{cur.author}</div>}
          <pre style={{whiteSpace:"pre-wrap",background:"#0b1220",padding:12,borderRadius:10}}>{cur.excerpt}</pre>
          <div className="muted">{cur.context}</div>
          {cur.vocab?.length>0 && (
            <div>
              <strong>Vocabulaire</strong>
              <div className="hstack" style={{flexWrap:"wrap"}}>
                {cur.vocab.map((v,i)=><span key={i} className="badge">{v}</span>)}
              </div>
            </div>
          )}
          {cur.questions?.length>0 && (
            <div className="vstack">
              <strong>Questions</strong>
              <ul>{cur.questions.map((q,i)=><li key={i}>{q}</li>)}</ul>
            </div>
          )}
          <div className="hstack" style={{justifyContent:"space-between"}}>
            <button onClick={()=>setIdx(i=>Math.max(0,i-1))}>◀ Précédent</button>
            <span className="muted">{filtered.length? `${idx+1} / ${filtered.length}`:"0 / 0"}</span>
            <button onClick={()=>setIdx(i=>Math.min(filtered.length-1,i+1))}>Suivant ▶</button>
          </div>
        </div>
      )}
    </div>
  );
}
