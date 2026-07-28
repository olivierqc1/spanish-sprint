"use client";

import { useEffect, useRef, useState } from "react";

/**
 * SpeakingDrill — practica oral sense parella.
 *
 * Consigne en francais -> tu la DIS en catalan -> le navigateur transcrit et compare.
 * Aucune cle API, aucun backend : tout se passe dans le navigateur.
 *
 * Chrome / Edge Android + desktop : OK.  Safari iOS : reconnaissance non supportee,
 * le composant bascule automatiquement en mode "ecoute et auto-evaluation".
 *
 * Usage :
 *   import drills from "@/data/grammar_quizz/cat_vocab_menjar_compres.json";
 *   <SpeakingDrill items={drills.drills} title={drills.title} />
 */

type Item = { prompt: string; answer: string; hint?: string };

type Props = {
  items: Item[];
  title?: string;
  lang?: string; // "ca-ES" par defaut
};

/* --- comparaison tolerante : accents, apostrophes, ponctuation, articles --- */
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

function stripArticles(s: string) {
  return s.replace(/^(el|la|els|les|l'|un|una|uns|unes)\s*/i, "").trim();
}

function isMatch(said: string, expected: string) {
  const a = normalize(said);
  const b = normalize(expected);
  if (a === b) return true;
  if (stripArticles(a) === stripArticles(b)) return true;
  // tolere un mot parasite autour ("es diu la clau")
  return a.includes(b) || b.includes(a);
}

export default function SpeakingDrill({ items, title, lang = "ca-ES" }: Props) {
  const [i, setI] = useState(0);
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState("");
  const [verdict, setVerdict] = useState<null | "ok" | "no">(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState({ ok: 0, total: 0 });
  const [supported, setSupported] = useState(true);
  const recRef = useRef<any>(null);

  const item = items[i];
  const done = i >= items.length;

  useEffect(() => {
    const SR =
      typeof window !== "undefined" &&
      ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
    if (!SR) {
      setSupported(false);
      return;
    }
    const rec = new SR();
    rec.lang = lang;
    rec.interimResults = false;
    rec.maxAlternatives = 3;
    rec.onresult = (e: any) => {
      const alts: string[] = Array.from(e.results[0]).map((r: any) => r.transcript);
      const hit = alts.find((t) => isMatch(t, items[iRef.current].answer));
      setHeard(hit || alts[0] || "");
      setVerdict(hit ? "ok" : "no");
      setScore((s) => ({ ok: s.ok + (hit ? 1 : 0), total: s.total + 1 }));
      setListening(false);
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    recRef.current = rec;
  }, [lang, items]);

  // garde l'index a jour dans le callback de reconnaissance
  const iRef = useRef(0);
  useEffect(() => {
    iRef.current = i;
  }, [i]);

  function listen() {
    if (!recRef.current || listening) return;
    setHeard("");
    setVerdict(null);
    setRevealed(false);
    setListening(true);
    try {
      recRef.current.start();
    } catch {
      setListening(false);
    }
  }

  function speak(text: string) {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  }

  function next() {
    setHeard("");
    setVerdict(null);
    setRevealed(false);
    setI((v) => v + 1);
  }

  function restart() {
    setI(0);
    setScore({ ok: 0, total: 0 });
    setHeard("");
    setVerdict(null);
    setRevealed(false);
  }

  if (done) {
    const pct = score.total ? Math.round((score.ok / score.total) * 100) : 0;
    return (
      <div className="mx-auto max-w-md p-6 text-center">
        <p className="text-sm uppercase tracking-widest text-neutral-500">Acabat</p>
        <p className="mt-3 text-5xl font-semibold tabular-nums">{pct}%</p>
        <p className="mt-1 text-neutral-600">
          {score.ok} / {score.total} ben dits
        </p>
        <button
          onClick={restart}
          className="mt-6 rounded-full bg-neutral-900 px-6 py-3 text-white"
        >
          Torna a començar
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md p-5">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-medium">{title ?? "Practica oral"}</h2>
        <span className="text-sm tabular-nums text-neutral-500">
          {i + 1} / {items.length}
        </span>
      </div>

      <div className="mt-6 rounded-2xl border border-neutral-200 p-6">
        <p className="text-xs uppercase tracking-widest text-neutral-500">Digues-ho en català</p>
        <p className="mt-2 text-2xl leading-snug">{item.prompt.replace(/\s*→\s*$/, "")}</p>

        {heard && (
          <p className="mt-4 text-sm text-neutral-600">
            Has dit : <span className="italic">{heard}</span>
          </p>
        )}

        {verdict === "ok" && (
          <p className="mt-3 font-medium text-emerald-700">Correcte — {item.answer}</p>
        )}
        {verdict === "no" && !revealed && (
          <button
            onClick={() => setRevealed(true)}
            className="mt-3 text-sm underline text-neutral-700"
          >
            Veure la resposta
          </button>
        )}
        {(revealed || verdict === "ok") && (
          <button
            onClick={() => speak(item.answer)}
            className="mt-3 block text-sm underline text-neutral-700"
          >
            Escolta : {item.answer}
          </button>
        )}
      </div>

      {supported ? (
        <button
          onClick={listen}
          disabled={listening}
          className={`mt-6 w-full rounded-full px-6 py-4 text-white transition ${
            listening ? "bg-red-600 animate-pulse" : "bg-neutral-900"
          }`}
        >
          {listening ? "Escoltant..." : "Parla"}
        </button>
      ) : (
        <div className="mt-6 space-y-3">
          <p className="text-sm text-neutral-600">
            El teu navegador no reconeix la veu. Digues-ho en veu alta, després comprova.
          </p>
          <button
            onClick={() => setRevealed(true)}
            className="w-full rounded-full bg-neutral-900 px-6 py-4 text-white"
          >
            Comprova
          </button>
        </div>
      )}

      <div className="mt-3 flex gap-3">
        <button
          onClick={next}
          className="flex-1 rounded-full border border-neutral-300 px-4 py-3"
        >
          Següent
        </button>
        <button
          onClick={() => speak(item.answer)}
          className="rounded-full border border-neutral-300 px-4 py-3"
          aria-label="Escoltar la resposta"
        >
          Escolta
        </button>
      </div>

      <p className="mt-4 text-center text-sm tabular-nums text-neutral-500">
        {score.ok} / {score.total}
      </p>
    </div>
  );
}
