"use client";
import { useState, useMemo } from "react";
import type { Level } from "./LevelPicker";

export type ReadingItem = {
  id: string;
  level: Exclude<Level, "ALL">;
  country: "Espagne" | "Mexique" | "Argentine" | "Colombie" | "Pérou" | "Chili" | "Cuba" | "Venezuela";
  title: string;
  excerpt: string;
  context: string;
  vocab: string[];
  questions: string[];
  author?: string;
  type?: string;
};

const countryMapping: Record<string, string[]> = {
  "spain": ["Espagne"],
  "mexico": ["Mexique"],
  "argentina": ["Argentine"],
  "colombia": ["Colombie"],
  "peru": ["Pérou"],
  "chile": ["Chili"],
  "cuba": ["Cuba"],
  "venezuela": ["Venezuela"],
};

export default function Reading({
  items, level, country
}: {
  items: ReadingItem[];
  level: Level;
  country: "ALL" | "spain" | "mexico" | "argentina" | "colombia" | "peru" | "chile" | "cuba" | "venezuela";
}) {
  const [idx, setIdx] = useState(0);
  
  const filtered = useMemo(() => {
    let pool = items;
    
    if (level !== "ALL") {
      pool = pool.filter(i => i.level === level);
    }
    
    if (country !== "ALL") {
      const allowedCountries = countryMapping[country] || [];
      pool = pool.filter(i => allowedCountries.includes(i.country));
    }
    
    return pool;
  }, [items, level, country]);
  
  const cur = filtered[idx] ?? null;

  const countryEmoji: Record<string, string> = {
    "Espagne": "🇪🇸",
    "Mexique": "🇲🇽",
    "Argentine": "🇦🇷",
    "Colombie": "🇨🇴",
    "Pérou": "🇵🇪",
    "Chili": "🇨🇱",
    "Cuba": "🇨🇺",
    "Venezuela": "🇻🇪",
  };

  return (
    <div className="card vstack">
      <div className="hstack" style={{justifyContent:"space-between"}}>
        <strong>📖 Lectures culturelles</strong>
        <button onClick={() => setIdx(Math.floor(Math.random()*Math.max(1,filtered.length)))}>
          🎲 Texte aléatoire
        </button>
      </div>
      
      {filtered.length === 0 ? (
        <div className="card" style={{ background: "#1f2a37", textAlign: "center", padding: "40px" }}>
          <div className="muted">
            Aucun texte disponible pour ce filtre.
            <br />
            <small>Essaie un autre niveau ou un autre pays !</small>
          </div>
        </div>
      ) : !cur ? (
        <div>Erreur de chargement.</div>
      ) : (
        <div className="vstack">
          <div className="hstack" style={{justifyContent:"space-between", flexWrap: "wrap", gap: "8px"}}>
            <div className="hstack" style={{ gap: "8px" }}>
              <span className="badge" style={{ fontSize: "16px" }}>
                {countryEmoji[cur.country]} {cur.country}
              </span>
              <span className="badge">{cur.level}</span>
              {cur.type && <span className="badge" style={{ background: "#1e3a5f" }}>{cur.type}</span>}
            </div>
            <span className="muted">{idx + 1} / {filtered.length}</span>
          </div>

          <h3 style={{margin:"8px 0"}}>{cur.title}</h3>
          {cur.author && (
            <div className="muted" style={{ fontSize: "14px", marginBottom: "8px" }}>
              {cur.author}
            </div>
          )}

          <div className="card" style={{ background: "#0b1220" }}>
            <div className="muted" style={{ fontSize: "12px", marginBottom: "8px" }}>
              📌 Contexte : {cur.context}
            </div>
          </div>

          <pre style={{
            whiteSpace:"pre-wrap",
            background:"#0b1220",
            padding: "20px",
            borderRadius: "10px",
            fontSize: "16px",
            lineHeight: "1.6"
          }}>
            {cur.excerpt}
          </pre>

          {cur.vocab?.length > 0 && (
            <div>
              <strong>📚 Vocabulaire clé</strong>
              <div className="hstack" style={{flexWrap:"wrap", gap: "8px", marginTop: "8px"}}>
                {cur.vocab.map((v, i) => (
                  <span key={i} className="badge" style={{ background: "#1e3a5f" }}>
                    {v}
                  </span>
                ))}
              </div>
            </div>
          )}

          {cur.questions?.length > 0 && (
            <div className="vstack">
              <strong>❓ Questions de compréhension</strong>
              <div className="vstack" style={{ gap: "8px" }}>
                {cur.questions.map((q, i) => (
                  <div key={i} className="card" style={{ background: "#1f2a37" }}>
                    <strong>{i + 1}.</strong> {q}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="hstack" style={{justifyContent:"space-between", marginTop: "16px"}}>
            <button 
              onClick={() => setIdx(i => Math.max(0, i - 1))}
              disabled={idx === 0}
            >
              ◀ Précédent
            </button>
            <button 
              onClick={() => setIdx(i => Math.min(filtered.length - 1, i + 1))}
              disabled={idx === filtered.length - 1}
            >
              Suivant ▶
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
