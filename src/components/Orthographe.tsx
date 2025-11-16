"use client";
import { useMemo, useState } from "react";
import type { Level, Country } from "./LevelPicker";

export type OrthoItem = {
  id: string;
  level: Exclude<Level, "ALL">;
  country?: "Espagne" | "Mexique";
  prompt: string;          // phrase trouée
  answer: string;          // réponse attendue
  hint?: string;
};

export default function Orthographe({
  bank, level, country
}: {
  bank: OrthoItem[];
  level: Level;
  country: Country;
}) {
  const [idx, setIdx] = useState(0);
  const [val, setVal] = useState("");

  const filtered = useMemo(() => {
    let pool = bank;
    if (level !== "ALL") pool = pool.filter(i => i.level === level);
    if (country !== "ALL") pool = pool.filter(i => (country==="spain"? i.country!=="Mexique" : i.country==="Mexique"));
    return pool;
  }, [bank, level, country]);

  const cur = filtered[idx] ?? null;
  const correct = cur && val.trim().toLowerCase() === cur.answer.trim().toLowerCase();

  return (
    <div className="card vstack">
      <div className="hstack" style={{justifyContent:"space-between"}}>
        <strong>Orthographe (complète la phrase)</strong>
        <button onClick={()=>{ setIdx(Math.floor(Math.random()*Math.max(1,filtered.length))); setVal(""); }}>Nouveau</button>
      </div>
      {!cur ? <div>Aucun exercice pour ce filtre.</div> : (
        <div className="vstack">
          <div className="muted">Niveau {cur.level}{cur.country?` · ${cur.country}`:""}</div>
          <div><strong>{cur.prompt}</strong></div>
          <input placeholder="Ta réponse" value={val} onChange={e=>setVal(e.target.value)} />
          <div className="hstack" style={{justifyContent:"space-between"}}>
            <span className="muted">{cur.hint ?? "Astuce : pense à l'accentuation."}</span>
            <button onClick={()=>setVal(cur.answer)}>Voir la réponse</button>
          </div>
          {val && (
            <div className="badge">{correct ? "✅ Correct" : "❌ Incorrect"}</div>
          )}
        </div>
      )}
    </div>
  );
}