"use client";

import React, { useMemo, useState } from "react";

type Card = {
  id: string;
  front: string; // mot / phrase (ES)
  back: string;  // traduction / explication (FR)
  level?: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  tag?: string;  // thème: verbes, voyage, etc.
};

type FlashcardsProps = {
  cards: Card[];
  initialLevel?: Card["level"] | "ALL";
};

export default function Flashcards({
  cards,
  initialLevel = "ALL",
}: FlashcardsProps) {
  const [level, setLevel] = useState<FlashcardsProps["initialLevel"]>(initialLevel);
  const [i, setI] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [q, setQ] = useState("");

  const pool = useMemo(() => {
    let list = cards ?? [];
    if (level && level !== "ALL") {
      list = list.filter((c) => c.level === level);
    }
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter(
        (c) =>
          c.front.toLowerCase().includes(s) ||
          c.back.toLowerCase().includes(s) ||
          (c.tag ?? "").toLowerCase().includes(s)
      );
    }
    return list;
  }, [cards, level, q]);

  const next = () => {
    if (pool.length === 0) return;
    setI((x) => (x + 1) % pool.length);
    setShowBack(false);
  };

  const prev = () => {
    if (pool.length === 0) return;
    setI((x) => (x - 1 + pool.length) % pool.length);
    setShowBack(false);
  };

  const cur = pool.length > 0 ? pool[i] : undefined;

  if (!cards || cards.length === 0) {
    return <div className="text-sm text-gray-500">Aucune carte pour l’instant.</div>;
  }

  return (
    <div className="card vstack gap-3 p-4 rounded-2xl shadow">
      <div className="hstack items-center justify-between">
        <strong>Flashcards</strong>
        <div className="hstack gap-2 items-center">
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setI(0);
            }}
            placeholder="Recherche…"
            className="border rounded px-2 py-1"
          />
          <select
            value={level ?? "ALL"}
            onChange={(e) => {
              const lv = e.target.value as Card["level"] | "ALL";
              setLevel(lv);
              setI(0);
            }}
            className="border rounded px-2 py-1"
          >
            <option value="ALL">Tous</option>
            <option>A1</option>
            <option>A2</option>
            <option>B1</option>
            <option>B2</option>
            <option>C1</option>
            <option>C2</option>
          </select>
        </div>
      </div>

      {cur ? (
        <div className="vstack gap-3">
          <div
            className="rounded-2xl border"
            style={{ padding: 20, textAlign: "center", minHeight: 120 }}
            onClick={() => setShowBack((v) => !v)}
            role="button"
          >
            <div className="text-sm text-gray-500 mb-2">
              {cur.tag ?? "—"} {cur.level ? `· ${cur.level}` : ""}
            </div>
            <div className="text-xl font-semibold">
              {showBack ? cur.back : cur.front}
            </div>
            <div className="text-xs text-gray-400 mt-2">(cliquer pour retourner)</div>
          </div>

          <div className="hstack gap-2 justify-between">
            <button className="badge" onClick={prev}>◀︎ Précédent</button>
            <span className="text-sm text-gray-500">
              {pool.length > 0 ? `${i + 1} / ${pool.length}` : "0 / 0"}
            </span>
            <button className="badge" onClick={next}>Suivant ▶︎</button>
          </div>
        </div>
      ) : (
        <div className="text-sm text-gray-500">Aucune carte pour ce filtre.</div>
      )}
    </div>
  );
}
