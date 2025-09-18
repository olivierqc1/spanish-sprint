"use client";

import React, { useMemo, useState } from "react";

type ReadingItem = {
  id: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  title?: string;
  author?: string;
  type?: string; // ex: conte, poésie, article
  text: string;
  glosses?: Record<string, string>; // { "palabra": "traduction" }
  prompts?: string[]; // questions de compréhension / discussion
};

type ReadingProps = {
  items: ReadingItem[];
  initialLevel?: ReadingItem["level"];
};

export default function Reading({ items, initialLevel = "A1" }: ReadingProps) {
  const [level, setLevel] = useState<ReadingItem["level"]>(initialLevel);
  const pool = useMemo(
    () => items.filter((r) => r.level === level),
    [items, level]
  );

  const [idx, setIdx] = useState(0);

  const next = () => {
    if (pool.length === 0) return;
    setIdx((i) => (i + 1) % pool.length);
  };

  // élément courant sécurisé
  const cur = pool.length > 0 ? pool[idx] : undefined;
  if (!items || items.length === 0) {
    return <div className="text-sm text-gray-500">Aucune lecture disponible.</div>;
  }

  return (
    <div className="card vstack gap-3 p-4 rounded-2xl shadow">
      <div className="hstack items-center justify-between">
        <strong>Lectures graduées</strong>
        <div className="hstack gap-2 items-center">
          <label className="text-sm text-gray-500">Niveau&nbsp;</label>
          <select
            value={level}
            onChange={(e) => {
              const lv = e.target.value as ReadingItem["level"];
              setLevel(lv);
              setIdx(0);
            }}
            className="border rounded px-2 py-1"
          >
            <option>A1</option>
            <option>A2</option>
            <option>B1</option>
            <option>B2</option>
            <option>C1</option>
            <option>C2</option>
          </select>
          <button className="badge" onClick={next}>Nouveau</button>
        </div>
      </div>

      {cur ? (
        <div className="vstack gap-3">
          <div className="text-sm text-gray-600">
            <div className="font-semibold">{cur.title ?? "Texte"}</div>
            <div className="muted">
              {cur.author && <span>{cur.author}</span>}
              {cur.type && <span> · {cur.type}</span>}
              <span> · {cur.level}</span>
            </div>
          </div>

          <pre
            style={{
              whiteSpace: "pre-wrap",
              background: "#fafafa",
              border: "1px solid #eee",
              borderRadius: 12,
              padding: 12,
            }}
          >
            {cur.text}
          </pre>

          {cur.glosses && Object.keys(cur.glosses).length > 0 && (
            <div className="hstack gap-2 flex-wrap">
              {Object.entries(cur.glosses).map(([w, gl]) => (
                <span
                  key={w}
                  className="badge"
                  title={gl}
                  style={{
                    display: "inline-block",
                    border: "1px solid #e5e7eb",
                    borderRadius: 999,
                    padding: "4px 10px",
                    fontSize: 12,
                  }}
                >
                  {w}
                </span>
              ))}
            </div>
          )}

          {cur.prompts && cur.prompts.length > 0 && (
            <div>
              <div className="text-sm font-semibold mb-1">Prompts</div>
              <ul className="list-disc ml-6">
                {cur.prompts.map((p, i) => (
                  <li key={i} className="text-sm">{p}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="text-sm text-gray-500">
          Aucun texte pour le niveau {level}.
        </div>
      )}
    </div>
  );
}
