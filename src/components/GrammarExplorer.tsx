"use client";
import React, { useMemo, useState } from "react";
import type { GrammarPoint } from "@/data/grammar";

type Props = {
  points?: GrammarPoint[];
  initialLevel?: GrammarPoint["level"];
};

export default function GrammarExplorer({
  points = [],
  initialLevel = "A1",
}: Props) {
  const [level, setLevel] = useState<GrammarPoint["level"]>(initialLevel);

  const pool = useMemo(
    () => points.filter(p => (level ? p.level === level : true)),
    [points, level]
  );

  return (
    <div className="card vstack gap-3 p-4 rounded-2xl shadow">
      <div className="hstack items-center justify-between">
        <strong>Grammaire</strong>
        <select
          value={level ?? "A1"}
          onChange={(e) => setLevel(e.target.value as GrammarPoint["level"])}
          className="border rounded px-2 py-1"
        >
          <option>A1</option>
          <option>A2</option>
          <option>B1</option>
        </select>
      </div>

      {pool.length === 0 ? (
        <div className="text-sm text-gray-500">Aucun point de grammaire pour ce niveau.</div>
      ) : (
        <div className="vstack gap-2">
          {pool.map(point => (
            <div key={point.id} className="card" style={{ background: "#0f1720", padding: "12px" }}>
              <div className="hstack" style={{ justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <strong style={{ fontSize: "14px" }}>{point.title}</strong>
                  {point.note && (
                    <div className="muted" style={{ fontSize: "12px", marginTop: "4px" }}>
                      {point.note}
                    </div>
                  )}
                </div>
                <span className="badge" style={{ background: "#1e3a5f" }}>{point.level}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}