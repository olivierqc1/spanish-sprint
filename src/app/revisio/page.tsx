"use client";

// src/app/revisio/page.tsx
// Révision entrelacée : mélange plusieurs decks dans une même séance.

import { useState } from "react";
import Link from "next/link";
import MixedReview from "@/components/MixedReview";

import d1 from "@/data/grammar_quizz/cat_alta_frequencia_gramatical.json";
import d2 from "@/data/grammar_quizz/cat_alta_frequencia_verbs.json";
import d3 from "@/data/grammar_quizz/cat_quantificadors.json";
import d4 from "@/data/grammar_quizz/cat_pronoms_febles.json";
import d5 from "@/data/grammar_quizz/cat_connectors_basics.json";
import d6 from "@/data/grammar_quizz/cat_menjar_fora.json";
import d7 from "@/data/grammar_quizz/cat_quedar_plans.json";
import d8 from "@/data/grammar_quizz/cat_salut_cos.json";

const ALL = [d1, d2, d3, d4, d5, d6, d7, d8] as any[];

export default function RevisioPage() {
  const [started, setStarted] = useState(false);
  const [picked, setPicked] = useState<number[]>([0, 1, 2, 3]);

  function toggle(i: number) {
    setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));
  }

  const decks = picked.map((i) => ALL[i]);
  const totalItems = decks.reduce((n, d) => n + d.drills.length, 0);

  if (started && decks.length > 0) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
        <div className="flex justify-end p-4">
          <button
            onClick={() => setStarted(false)}
            className="text-slate-400 text-sm"
          >
            Sortir
          </button>
        </div>
        <MixedReview decks={decks} sessionSize={20} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white">
      <div className="mx-auto max-w-md px-6 py-8">
        <Link href="/" className="text-slate-400 text-sm">
          ← Inici
        </Link>

        <h1 className="mt-6 text-3xl font-black">Repàs barrejat</h1>
        <p className="mt-2 text-slate-400 text-sm">
          Barreja diversos temes en una mateixa sessió. És més difícil que
          repassar un sol tema seguit, i per això es recorda molt millor.
        </p>

        <p className="mt-8 text-xs uppercase tracking-widest text-slate-400">
          Tria els temes
        </p>

        <div className="mt-3 space-y-2">
          {ALL.map((d, i) => {
            const on = picked.includes(i);
            const label =
              typeof d.title === "string" ? d.title : d.title.fr;
            return (
              <button
                key={d.id}
                onClick={() => toggle(i)}
                className={`w-full rounded-xl border p-3 text-left text-sm transition ${
                  on
                    ? "border-emerald-500 bg-emerald-900/30"
                    : "border-slate-700 bg-slate-800/40 text-slate-400"
                }`}
              >
                <span className="mr-2">{on ? "✓" : "○"}</span>
                {label}
                <span className="float-right text-xs text-slate-500">
                  {d.drills.length}
                </span>
              </button>
            );
          })}
        </div>

        <button
          disabled={decks.length === 0}
          onClick={() => setStarted(true)}
          className="mt-8 w-full rounded-full bg-emerald-600 px-6 py-4 font-bold text-white disabled:opacity-40"
        >
          Començar · 20 preguntes
        </button>

        <p className="mt-3 text-center text-xs text-slate-500">
          {decks.length} temes · {totalItems} preguntes disponibles
        </p>
      </div>
    </main>
  );
}
