"use client";
import React, { useMemo, useState } from "react";

type Drill = {
  id: string;
  prompt: string;
  answer?: string;
};

type GrammarPoint = {
  id: string;
  title: string;
  level?: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  drills: Drill[];
};

type Props = {
  points?: GrammarPoint[];
  initialLevel?: GrammarPoint["level"];
};

function pickDrills(point: GrammarPoint, n: number, seenIds: string[]) {
  const pool = point.drills.filter(d => !seenIds.includes(`${point.id}:${d.id}`));
  const src = pool.length ? pool : point.drills; // recycle si tout vu
  const shuffled = [...src].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

export default function GrammarExplorer({
  points = [],
  initialLevel = "A1",
}: Props) {
  const [level, setLevel] = useState<GrammarPoint["level"]>(initialLevel);
  const [seen, setSeen] = useState<string[]>([]);

  const pool = useMemo(
    () => points.filter(p => (level ? p.level === level : true)),
    [points, level]
  );

  const cur = pool[0];
  const drills = cur ? pickDrills(cur, 3, seen) : [];

  return (
    <div className="card vstack gap-3 p-4 rounded-2xl shadow">
      <div className="hstack items-center justify-between">
        <strong>Grammaire</strong>
        <select
          value={level ?? "A1"}
          onChange={(e) => setLevel(e.target.value as GrammarPoint["level"])}
          className="border rounded px-2 py-1"
        >
          <option>A1</option><option>A2</option><option>B1</option>
          <option>B2</option><option>C1</option><option>C2</option>
        </select>
      </div>

      {!cur ? (
        <div className="text-sm text-gray-500">Aucun point de grammaire.</div>
      ) : (
        <>
          <div className="text-sm text-gray-600">
            <strong>{cur.title}</strong> {cur.level ? `· ${cur.level}` : ""}
          </div>
          <ul className="list-disc ml-6">
            {drills.map(d => (
              <li key={d.id} className="text-sm">{d.prompt}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
