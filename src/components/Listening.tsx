"use client";

import React, { useMemo, useRef, useState } from "react";
import type { AudioItem } from "@/data/audio";

type Props = {
  items: AudioItem[];
  initialLevel?: AudioItem["level"];
};

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[¿?¡!.,;:"]/g, "")
    .trim();
}

export default function Listening({ items, initialLevel = "A1" }: Props) {
  const [level, setLevel] = useState<AudioItem["level"]>(initialLevel);
  const pool = useMemo(() => items.filter(i => i.level === level), [items, level]);

  const [idx, setIdx] = useState(0);
  const cur = pool[idx];

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [dictation, setDictation] = useState("");
  const [result, setResult] = useState<{ qOk: number; qTotal: number; dictPct: number } | null>(null);

  const next = () => {
    if (!pool.length) return;
    setIdx((i) => (i + 1) % pool.length);
    setAnswers([]);
    setDictation("");
    setResult(null);
    audioRef.current?.pause();
    if (audioRef.current) audioRef.current.currentTime = 0;
  };

  const check = () => {
    if (!cur) return;

    // Vérif Q/R
    let ok = 0;
    cur.questions.forEach((qa, i) => {
      const user = normalize(answers[i] || "");
      const isOk = qa.accept.some(acc => normalize(acc) === user || user.includes(normalize(acc)));
      if (isOk) ok++;
    });

    // Vérif dictée (similarité naïve par tokens)
    const goldTokens = normalize(cur.script).split(/\s+/).filter(Boolean);
    const userTokens = normalize(dictation).split(/\s+/).filter(Boolean);
    const goldSet = new Set(goldTokens);
    const correct = userTokens.filter(t => goldSet.has(t)).length;
    const dictPct = goldTokens.length ? Math.round((correct / goldTokens.length) * 100) : 0;

    setResult({ qOk: ok, qTotal: cur.questions.length, dictPct });
  };

  if (!items || !items.length) {
    return <div className="text-sm text-gray-500">Aucun audio disponible.</div>;
  }

  return (
    <div className="card vstack gap-3 p-4 rounded-2xl shadow">
      <div className="hstack items-center justify-between">
        <strong>Écoute & compréhension</strong>
        <div className="hstack gap-2 items-center">
          <label className="text-sm text-gray-400">Niveau</label>
          <select
            className="border rounded px-2 py-1"
            value={level}
            onChange={(e) => {
              setLevel(e.target.value as AudioItem["level"]);
              setIdx(0);
              setAnswers([]);
              setDictation("");
              setResult(null);
              audioRef.current?.pause();
              if (audioRef.current) audioRef.current.currentTime = 0;
            }}
          >
            <option>A1</option><option>A2</option><option>B1</option>
            <option>B2</option><option>C1</option><option>C2</option>
          </select>
          <button className="badge" onClick={next}>Nouvel audio</button>
        </div>
      </div>

      {!cur ? (
        <div className="text-sm text-gray-500">Aucun audio pour {level}.</div>
      ) : (
        <div className="vstack gap-3">
          <div className="text-sm text-gray-400">{cur.level} · {cur.title}</div>

          <audio ref={audioRef} controls src={cur.src} />

          <div className="vstack gap-2">
            <div className="text-sm font-semibold">Questions de compréhension</div>
            {cur.questions.map((qa, i) => (
              <div key={i} className="vstack gap-1">
                <label className="text-sm">{qa.q}</label>
                <input
                  className="border rounded px-2 py-1"
                  placeholder="Ta réponse en espagnol"
                  value={answers[i] || ""}
                  onChange={(e) => {
                    const copy = [...answers];
                    copy[i] = e.target.value;
                    setAnswers(copy);
                  }}
                />
              </div>
            ))}
          </div>

          <div className="vstack gap-1">
            <div className="text-sm font-semibold">Dictée / Transcription</div>
            <textarea
              className="border rounded px-2 py-2"
              placeholder="Transcris ce que tu entends…"
              rows={4}
              value={dictation}
              onChange={(e) => setDictation(e.target.value)}
            />
            <div className="text-xs text-gray-500">
              Astuce : tu peux écouter plusieurs fois et utiliser pause/retour.
            </div>
          </div>

          <div className="hstack gap-2 justify-between">
            <button className="badge" onClick={check}>Corriger</button>
            {result && (
              <div className="text-sm">
                ✅ {result.qOk}/{result.qTotal} bonnes réponses · 📝 Dictée ~{result.dictPct}%
              </div>
            )}
          </div>

          {result && (
            <details>
              <summary className="cursor-pointer text-sm">Voir le script de l’audio</summary>
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  background: "#0f1720",
                  border: "1px solid #1f2937",
                  borderRadius: 12,
                  padding: 12,
                }}
              >
                {cur.script}
              </pre>
            </details>
          )}
        </div>
      )}
    </div>
  );
}
