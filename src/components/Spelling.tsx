"use client";

import { useMemo, useState } from "react";

type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

type SpellItem = { id: string; level: Level; prompt: string; answer: string };

// Mini-banque (tu pourras en rajouter des dizaines)
const BANK: SpellItem[] = [
  // A1
  { id: "a1-1", level: "A1", prompt: "Écris correctement (mot): 'caza' (maison)", answer: "casa" },
  { id: "a1-2", level: "A1", prompt: "Écris correctement (mot): 'amas' (aimer, 1ps)", answer: "amas" }, // exemple simple
  { id: "a1-3", level: "A1", prompt: "Transcris: 'Buenos días'", answer: "buenos dias" },
  // A2
  { id: "a2-1", level: "A2", prompt: "Transcris: 'Ayer fui al mercado'", answer: "ayer fui al mercado" },
  { id: "a2-2", level: "A2", prompt: "Transcris: '¿Cuánto cuesta?'", answer: "cuanto cuesta" },
  // B1
  { id: "b1-1", level: "B1", prompt: "Transcris: 'Cuando era pequeño, vivía en Sevilla'", answer: "cuando era pequeno vivia en sevilla" },
];

function norm(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[¿?¡!.,;:"]/g, "")
    .trim();
}

export default function Spelling({ level }: { level: Level }) {
  const pool = useMemo(() => BANK.filter(b => b.level === level), [level]);
  const [i, setI] = useState(0);
  const [val, setVal] = useState("");
  const [result, setResult] = useState<"ok" | "ko" | null>(null);

  const cur = pool[i];

  const check = () => {
    if (!cur) return;
    setResult(norm(val) === norm(cur.answer) ? "ok" : "ko");
  };

  const next = () => {
    if (!pool.length) return;
    setI((x) => (x + 1) % pool.length);
    setVal("");
    setResult(null);
  };

  if (!cur) return <div className="text-sm text-gray-500">Aucun exercice pour {level}.</div>;

  return (
    <div className="card vstack gap-3 p-4 rounded-2xl shadow">
      <strong>Orthographe / Dictée courte · {level}</strong>
      <div className="text-sm">{cur.prompt}</div>
      <input
        className="border rounded px-2 py-1"
        placeholder="Écris ici…"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
      <div className="hstack gap-2 justify-between">
        <button className="badge" onClick={check}>Corriger</button>
        <button className="badge" onClick={next}>Suivant</button>
      </div>
      {result && (
        <div className="text-sm">
          {result === "ok" ? "✅ Correct !" : `❌ Réponse attendue: ${cur.answer}`}
        </div>
      )}
    </div>
  );
}
