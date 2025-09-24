"use client";
import React, { useMemo, useRef, useState } from "react";
import type { AudioItem } from "@/data/audio";
import { useProgress } from "@/state/progress";

type Props = { items: AudioItem[]; initialLevel?: AudioItem["level"] };

function normalize(s: string) {
  return s.toLowerCase().normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[¿?¡!.,;:"]/g, "")
    .trim();
}

function diffHtml(gold: string, user: string){
  const g = normalize(gold).split(/\s+/).filter(Boolean);
  const u = normalize(user).split(/\s+/).filter(Boolean);
  const gset = new Set(g);
  return u.map(tok => gset.has(tok) ? tok : `<mark>${tok}</mark>`).join(" ");
}

export default function Listening({ items, initialLevel = "A1" }: Props) {
  const { addPoints, record } = useProgress();
  const [level, setLevel] = useState<AudioItem["level"]>(initialLevel);
  const pool = useMemo(() => items.filter(i => i.level === level), [items, level]);

  const [idx, setIdx] = useState(0);
  const cur = pool[idx];

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [dictation, setDictation] = useState("");
  const [result, setResult] = useState<{ qOk: number; qTotal: number; dictPct: number; html: string } | null>(null);

  const next = () => {
    if (!pool.length) return;
    setIdx((i) => (i + 1) % pool.length);
    setAnswers([]); setDictation(""); setResult(null);
    audioRef.current?.pause(); if (audioRef.current) audioRef.current.currentTime = 0;
  };

  const check = () => {
    if (!cur) return;
    let ok = 0;
    cur.questions.forEach((qa, i) => {
      const user = normalize(answers[i] || "");
      const hit = qa.accept.some(acc => normalize(acc)===user || user.includes(normalize(acc)));
      if (hit) ok++;
    });
    const g = normalize(cur.script).split(/\s+/).filter(Boolean);
    const u = normalize(dictation).split(/\s+/).filter(Boolean);
    const gset = new Set(g);
    const correct = u.filter(t => gset.has(t)).length;
    const dictPct = g.length ? Math.round((correct/g.length)*100) : 0;
    const html = diffHtml(cur.script, dictation);
    setResult({ qOk: ok, qTotal: cur.questions.length, dictPct, html });

    const pct = Math.round(((ok/cur.questions.length)*0.6 + (dictPct/100)*0.4)*100);
    addPoints("listening", Math.max(1, Math.round(pct/10)));
    record("listening", { correct: ok, total: cur.questions.length, pct, when: Date.now() });
  };

  if (!items || !items.length) return <div className="text-sm muted">Aucun audio disponible.</div>;

  return (
    <div className="card vstack gap-3 p-4 rounded-2xl shadow">
      <div className="hstack items-center justify-between">
        <strong>Écoute & compréhension</strong>
        <div className="hstack gap-2 items-center">
          <label className="text-sm muted">Niveau</label>
          <select
            className="border rounded px-2 py-1"
            value={level}
            onChange={(e) => {
              setLevel(e.target.value as AudioItem["level"]);
              setIdx(0); setAnswers([]); setDictation(""); setResult(null);
              audioRef.current?.pause(); if (audioRef.current) audioRef.current.currentTime = 0;
            }}
          >
            <option>A1</option><option>A2</option><option>B1</option><option>B2</option><option>C1</option><option>C2</option>
          </select>
          <button className="badge" onClick={next}>Nouvel audio</button>
        </div>
      </div>

      {!cur ? (
        <div className="text-sm muted">Aucun audio pour {level}.</div>
      ) : (
        <div className="vstack gap-3">
          <div className="text-sm muted">{cur.level} · {cur.title}</div>
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
                    const copy = [...answers]; copy[i] = e.target.value; setAnswers(copy);
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
            <div className="text-xs muted">Astuce : écoute plusieurs fois et utilise pause/retour.</div>
          </div>

          <div className="hstack gap-2 justify-between">
            <button className="badge" onClick={check}>Corriger</button>
            {result && (
              <div className="text-sm">
                ✅ {result.qOk}/{result.qTotal} bonnes · 📝 Dictée ~{result.dictPct}%
              </div>
            )}
          </div>

          {result && (
            <details open>
              <summary className="cursor-pointer text-sm">Surlignage des différences</summary>
              <div
                className="border rounded p-3"
                dangerouslySetInnerHTML={{ __html: result.html }}
              />
              <div className="muted text-xs mt-1">Les mots en <mark>surbrillance</mark> ne correspondent pas au script.</div>
            </details>
          )}

          <details>
            <summary className="cursor-pointer text-sm">Voir le script</summary>
            <pre style={{whiteSpace:"pre-wrap"}}>{cur.script}</pre>
          </details>
        </div>
      )}
    </div>
  );
}
