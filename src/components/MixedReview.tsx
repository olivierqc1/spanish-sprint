"use client";

import { useMemo, useState } from "react";

/**
 * MixedReview — révision entrelacée, tous decks confondus.
 *
 * Pourquoi : réviser un deck entier d'affilée (blocked practice) donne
 * l'impression d'aller vite mais tient mal en mémoire. Mélanger les sujets
 * dans une même séance (interleaving) est plus dur sur le moment et retient
 * nettement mieux. Ce composant force ce mélange.
 *
 * Ce qu'il fait :
 *  - mélange les items de plusieurs decks
 *  - réinjecte les items ratés plus loin dans la file (rappel espacé)
 *  - impose la production : il faut taper avant de voir la réponse
 *  - compare de façon tolérante (accents, apostrophes, variantes avec /)
 *
 * Usage :
 *   import MixedReview from "@/components/MixedReview";
 *   import d1 from "@/data/grammar_quizz/cat_quantificadors.json";
 *   import d2 from "@/data/grammar_quizz/cat_pronoms_febles.json";
 *   <MixedReview decks={[d1, d2]} sessionSize={20} />
 */

type Drill = { prompt: string; answer: string };
type Deck = {
  id: string;
  title: { fr: string; en: string } | string;
  drills: Drill[];
};

type Card = Drill & { deckId: string; deckTitle: string };

type Props = {
  decks: Deck[];
  sessionSize?: number;
  lang?: string;
};

function deckLabel(t: Deck["title"]) {
  return typeof t === "string" ? t : t.fr;
}

/* --- comparaison tolérante --- */
function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[''`´]/g, "'")
    .replace(/[.,!?;:¿¡·]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isCorrect(input: string, answer: string) {
  const given = normalize(input);
  if (!given) return false;
  // « el dormitori / l'habitació » -> chaque variante est acceptée
  return answer
    .split("/")
    .map((v) => normalize(v))
    .some((v) => v === given);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Mélange les decks en évitant deux items consécutifs du même deck. */
function interleave(decks: Deck[], size: number): Card[] {
  const pools = decks.map((d) =>
    shuffle(
      d.drills.map((dr) => ({
        ...dr,
        deckId: d.id,
        deckTitle: deckLabel(d.title),
      }))
    )
  );
  const out: Card[] = [];
  let lastDeck = "";
  while (out.length < size) {
    const available = pools
      .map((p, i) => ({ p, i }))
      .filter(({ p, i }) => p.length > 0 && decks[i].id !== lastDeck);
    const usable =
      available.length > 0
        ? available
        : pools.map((p, i) => ({ p, i })).filter(({ p }) => p.length > 0);
    if (usable.length === 0) break;
    const pick = usable[Math.floor(Math.random() * usable.length)];
    const card = pick.p.shift()!;
    out.push(card);
    lastDeck = card.deckId;
  }
  return out;
}

export default function MixedReview({ decks, sessionSize = 20, lang = "ca-ES" }: Props) {
  const initial = useMemo(
    () => interleave(decks, sessionSize),
    [decks, sessionSize]
  );

  const [queue, setQueue] = useState<Card[]>(initial);
  const [pos, setPos] = useState(0);
  const [input, setInput] = useState("");
  const [state, setState] = useState<"typing" | "right" | "wrong">("typing");
  const [seen, setSeen] = useState(0);
  const [right, setRight] = useState(0);
  const [missed, setMissed] = useState<Card[]>([]);

  const card = queue[pos];
  const finished = pos >= queue.length;

  function speak(text: string) {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(text.split("/")[0].trim());
    u.lang = lang;
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  }

  function submit() {
    if (state !== "typing" || !card) return;
    const ok = isCorrect(input, card.answer);
    setSeen((s) => s + 1);
    if (ok) {
      setRight((r) => r + 1);
      setState("right");
    } else {
      setState("wrong");
      setMissed((m) => [...m, card]);
      // rappel espacé : on réinjecte l'item raté 4 à 7 positions plus loin
      setQueue((q) => {
        const copy = [...q];
        const gap = 4 + Math.floor(Math.random() * 4);
        const target = Math.min(pos + gap, copy.length);
        copy.splice(target, 0, card);
        return copy;
      });
    }
  }

  function next() {
    setInput("");
    setState("typing");
    setPos((p) => p + 1);
  }

  function restart() {
    setQueue(interleave(decks, sessionSize));
    setPos(0);
    setInput("");
    setState("typing");
    setSeen(0);
    setRight(0);
    setMissed([]);
  }

  if (finished) {
    const pct = seen ? Math.round((right / seen) * 100) : 0;
    const uniqueMissed = Array.from(
      new Map(missed.map((m) => [m.prompt, m])).values()
    );
    return (
      <div className="mx-auto max-w-md p-6">
        <p className="text-center text-sm uppercase tracking-widest text-neutral-500">
          Sessió acabada
        </p>
        <p className="mt-2 text-center text-5xl font-semibold tabular-nums">{pct}%</p>
        <p className="mt-1 text-center text-neutral-600">
          {right} / {seen} respostes correctes
        </p>

        {uniqueMissed.length > 0 && (
          <div className="mt-8">
            <p className="text-sm font-medium">A repassar ({uniqueMissed.length})</p>
            <ul className="mt-3 space-y-2">
              {uniqueMissed.map((m, i) => (
                <li key={i} className="rounded-xl border border-neutral-200 p-3 text-sm">
                  <span className="text-neutral-600">{m.prompt}</span>
                  <br />
                  <span className="font-medium">{m.answer}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={restart}
          className="mt-8 w-full rounded-full bg-neutral-900 px-6 py-4 text-white"
        >
          Una altra sessió
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md p-5">
      <div className="flex items-baseline justify-between">
        <span className="text-xs uppercase tracking-widest text-neutral-500">
          {card.deckTitle}
        </span>
        <span className="text-sm tabular-nums text-neutral-500">
          {pos + 1} / {queue.length}
        </span>
      </div>

      <div className="mt-1 h-1 w-full rounded-full bg-neutral-200">
        <div
          className="h-1 rounded-full bg-neutral-900 transition-all"
          style={{ width: `${(pos / queue.length) * 100}%` }}
        />
      </div>

      <div className="mt-8 rounded-2xl border border-neutral-200 p-6">
        <p className="text-2xl leading-snug">
          {card.prompt.replace(/\s*→\s*$/, "")}
        </p>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") (state === "typing" ? submit() : next());
          }}
          disabled={state !== "typing"}
          autoFocus
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          placeholder="Escriu-ho en català"
          className="mt-5 w-full rounded-xl border border-neutral-300 px-4 py-3 text-lg outline-none focus:border-neutral-900 disabled:bg-neutral-50"
        />

        {state === "right" && (
          <p className="mt-4 font-medium text-emerald-700">Correcte</p>
        )}
        {state === "wrong" && (
          <div className="mt-4">
            <p className="font-medium text-red-700">Resposta : {card.answer}</p>
            <p className="mt-1 text-sm text-neutral-600">
              Tornarà a sortir en aquesta mateixa sessió.
            </p>
          </div>
        )}

        {state !== "typing" && (
          <button
            onClick={() => speak(card.answer)}
            className="mt-3 text-sm underline text-neutral-700"
          >
            Escolta la pronúncia
          </button>
        )}
      </div>

      <button
        onClick={state === "typing" ? submit : next}
        className="mt-6 w-full rounded-full bg-neutral-900 px-6 py-4 text-white"
      >
        {state === "typing" ? "Comprova" : "Següent"}
      </button>

      <p className="mt-4 text-center text-sm tabular-nums text-neutral-500">
        {right} / {seen}
      </p>
    </div>
  );
}
