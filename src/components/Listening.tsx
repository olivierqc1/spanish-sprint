"use client";
import { useState, useMemo } from "react";
import type { Level } from "./LevelPicker";

export type AudioItem = {
  id: string;
  level: Exclude<Level, "ALL">;
  country: "Espagne" | "Mexique";
  title: string;
  src: string; // URL ou data:audio
  questions: { q: string }[];
  tip?: string;
};

export default function Listening({
  items, level, country
}: {
  items: AudioItem[];
  level: Level;
  country: "ALL" | "spain" | "mexico";
}) {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const filtered = useMemo(()=>{
    let pool = items;
    if (level!=="ALL") pool = pool.filter(i=>i.level===level);
    if (country!=="ALL") pool = pool.filter(i=>country==="spain"? i.country==="Espagne": i.country==="Mexique");
    return pool;
  },[items, level, country]);
  const cur = filtered[idx] ?? null;

  return (
    <div className="card vstack">
      <div className="hstack" style={{justifyContent:"space-between"}}>
        <strong>Écoute & compréhension</strong>
        <button onClick={()=>setIdx(Math.floor(Math.random()*Math.max(filtered.length,1)))}>Nouvel audio</button>
      </div>
      {!cur ? <div>Aucun audio pour ce filtre.</div> : (
        <div className="vstack">
          <div className="hstack" style={{justifyContent:"space-between"}}>
            <h3 style={{margin:0}}>{cur.title}</h3>
            <span className="badge">{cur.country} · {cur.level}</span>
          </div>
          <audio controls style={{width:"100%"}}>
            <source src={cur.src} type="audio/mpeg" />
          </audio>

          <strong>Questions de compréhension</strong>
          {cur.questions.map((qq,i)=>(
            <input key={i} placeholder="Ta réponse en espagnol"
              value={answers[i] ?? ""} onChange={e=>{
                const a=[...answers]; a[i]=e.target.value; setAnswers(a);
              }} />
          ))}
          <div className="vstack">
            <strong>Dictée / Transcription</strong>
            <textarea rows={5} placeholder="Transcris ce que tu entends..." />
            <div className="muted">{cur.tip ?? "Astuce : écoute en plusieurs passes, utilise pause/retour."}</div>
          </div>
        </div>
      )}
    </div>
  );
}
