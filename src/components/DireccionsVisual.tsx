"use client";

import { useMemo, useState } from "react";

/**
 * DireccionsVisual — prépositions de lieu et directions, avec schémas.
 *
 * Chaque question montre un dessin SVG (dessiné ici, aucune image externe)
 * et demande de décrire la position ou de donner la direction en catalan.
 *
 * Usage :
 *   import DireccionsVisual from "@/components/DireccionsVisual";
 *   <DireccionsVisual />
 */

const C = {
  line: "#64748b",
  obj: "#34d399",
  ref: "#60a5fa",
  road: "#334155",
  text: "#e2e8f0",
};

/* ---------- petits éléments réutilisables ---------- */

function Taula({ x = 90, y = 110 }: { x?: number; y?: number }) {
  return (
    <g>
      <rect x={x} y={y} width="80" height="8" rx="2" fill={C.ref} />
      <rect x={x + 6} y={y + 8} width="6" height="34" fill={C.ref} />
      <rect x={x + 68} y={y + 8} width="6" height="34" fill={C.ref} />
    </g>
  );
}

function Cadira({ x = 40, y = 100 }: { x?: number; y?: number }) {
  return (
    <g>
      <rect x={x} y={y + 18} width="34" height="7" rx="2" fill={C.obj} />
      <rect x={x} y={y - 8} width="7" height="28" rx="2" fill={C.obj} />
      <rect x={x + 2} y={y + 25} width="5" height="18" fill={C.obj} />
      <rect x={x + 27} y={y + 25} width="5" height="18" fill={C.obj} />
    </g>
  );
}

function Llit({ x = 70, y = 100 }: { x?: number; y?: number }) {
  return (
    <g>
      <rect x={x} y={y} width="110" height="26" rx="4" fill={C.ref} />
      <rect x={x + 4} y={y + 4} width="30" height="18" rx="3" fill="#93c5fd" />
      <rect x={x + 2} y={y + 26} width="6" height="14" fill={C.ref} />
      <rect x={x + 102} y={y + 26} width="6" height="14" fill={C.ref} />
    </g>
  );
}

function Gat({ x = 100, y = 140 }: { x?: number; y?: number }) {
  return (
    <g fill={C.obj}>
      <ellipse cx={x} cy={y} rx="18" ry="9" />
      <circle cx={x + 16} cy={y - 6} r="7" />
      <path d={`M${x + 11} ${y - 11} l3 -6 l4 4 z`} />
      <path d={`M${x + 19} ${y - 12} l1 -6 l4 5 z`} />
      <path d={`M${x - 17} ${y - 2} q -10 -8 -4 -12`} stroke={C.obj} strokeWidth="3" fill="none" />
    </g>
  );
}

function Sofa({ x = 60, y = 105 }: { x?: number; y?: number }) {
  return (
    <g>
      <rect x={x} y={y} width="90" height="30" rx="6" fill={C.ref} />
      <rect x={x - 8} y={y - 10} width="14" height="40" rx="5" fill={C.ref} />
      <rect x={x + 84} y={y - 10} width="14" height="40" rx="5" fill={C.ref} />
    </g>
  );
}

function Llum({ x = 175, y = 80 }: { x?: number; y?: number }) {
  return (
    <g fill={C.obj}>
      <path d={`M${x - 14} ${y + 20} L${x + 14} ${y + 20} L${x + 8} ${y} L${x - 8} ${y} z`} />
      <rect x={x - 2} y={y + 20} width="4" height="34" />
      <ellipse cx={x} cy={y + 56} rx="14" ry="4" />
    </g>
  );
}

function Casa({ x = 40, y = 90, label }: { x?: number; y?: number; label?: string }) {
  return (
    <g>
      <rect x={x} y={y} width="48" height="40" fill={C.ref} rx="2" />
      <path d={`M${x - 6} ${y} L${x + 24} ${y - 22} L${x + 54} ${y} z`} fill="#93c5fd" />
      {label && (
        <text x={x + 24} y={y + 58} textAnchor="middle" fill={C.text} fontSize="13">
          {label}
        </text>
      )}
    </g>
  );
}

/* ---------- les scènes ---------- */

function SceneDreta() {
  return (
    <svg viewBox="0 0 260 180" className="w-full">
      <Taula x={70} y={100} />
      <Cadira x={185} y={95} />
      <text x={110} y={168} fill={C.text} fontSize="13">la taula</text>
      <text x={185} y={168} fill={C.obj} fontSize="13">la cadira</text>
    </svg>
  );
}

function SceneEsquerra() {
  return (
    <svg viewBox="0 0 260 180" className="w-full">
      <Cadira x={35} y={95} />
      <Taula x={110} y={100} />
      <text x={150} y={168} fill={C.text} fontSize="13">la taula</text>
      <text x={30} y={168} fill={C.obj} fontSize="13">la cadira</text>
    </svg>
  );
}

function SceneSota() {
  return (
    <svg viewBox="0 0 260 180" className="w-full">
      <Llit x={65} y={80} />
      <Gat x={120} y={135} />
      <text x={120} y={70} textAnchor="middle" fill={C.text} fontSize="13">el llit</text>
      <text x={120} y={168} textAnchor="middle" fill={C.obj} fontSize="13">el gat</text>
    </svg>
  );
}

function SceneSobre() {
  return (
    <svg viewBox="0 0 260 180" className="w-full">
      <Taula x={80} y={115} />
      <Gat x={120} y={100} />
      <text x={120} y={172} textAnchor="middle" fill={C.text} fontSize="13">la taula</text>
    </svg>
  );
}

function SceneCostat() {
  return (
    <svg viewBox="0 0 260 180" className="w-full">
      <Sofa x={45} y={95} />
      <Llum x={185} y={60} />
      <text x={90} y={168} fill={C.text} fontSize="13">el sofà</text>
      <text x={165} y={168} fill={C.obj} fontSize="13">el llum</text>
    </svg>
  );
}

function SceneDavant() {
  return (
    <svg viewBox="0 0 260 180" className="w-full">
      <Casa x={100} y={40} label="la casa" />
      <Gat x={124} y={135} />
    </svg>
  );
}

function SceneEntre() {
  return (
    <svg viewBox="0 0 260 180" className="w-full">
      <Casa x={15} y={60} label="l'escola" />
      <Casa x={175} y={60} label="el mercat" />
      <Gat x={130} y={105} />
      <text x={130} y={150} textAnchor="middle" fill={C.obj} fontSize="13">el gat</text>
    </svg>
  );
}

function SceneTotRecte() {
  return (
    <svg viewBox="0 0 260 180" className="w-full">
      <rect x={105} y={10} width="50" height="160" fill={C.road} />
      <line x1="130" y1="20" x2="130" y2="160" stroke="#475569" strokeWidth="3" strokeDasharray="10 10" />
      <path d="M130 150 L130 45" stroke={C.obj} strokeWidth="5" fill="none" />
      <path d="M130 32 l-10 16 l20 0 z" fill={C.obj} />
      <circle cx="130" cy="158" r="7" fill="#f59e0b" />
    </svg>
  );
}

function SceneGiraDreta() {
  return (
    <svg viewBox="0 0 260 180" className="w-full">
      <rect x={105} y={70} width="50" height="110" fill={C.road} />
      <rect x={105} y={70} width="150" height="50" fill={C.road} />
      <path d="M130 165 L130 95 L215 95" stroke={C.obj} strokeWidth="5" fill="none" />
      <path d="M228 95 l-16 -10 l0 20 z" fill={C.obj} />
      <circle cx="130" cy="170" r="7" fill="#f59e0b" />
    </svg>
  );
}

function SceneGiraEsquerra() {
  return (
    <svg viewBox="0 0 260 180" className="w-full">
      <rect x={105} y={70} width="50" height="110" fill={C.road} />
      <rect x={5} y={70} width="150" height="50" fill={C.road} />
      <path d="M130 165 L130 95 L45 95" stroke={C.obj} strokeWidth="5" fill="none" />
      <path d="M32 95 l16 -10 l0 20 z" fill={C.obj} />
      <circle cx="130" cy="170" r="7" fill="#f59e0b" />
    </svg>
  );
}

function SceneCantonada() {
  return (
    <svg viewBox="0 0 260 180" className="w-full">
      <rect x={0} y={80} width="260" height="42" fill={C.road} />
      <rect x={110} y={0} width="42" height="180" fill={C.road} />
      <Casa x={165} y={20} />
      <text x={190} y={16} textAnchor="middle" fill={C.obj} fontSize="13">la farmàcia</text>
    </svg>
  );
}

function SceneTravessa() {
  return (
    <svg viewBox="0 0 260 180" className="w-full">
      <rect x={0} y={60} width="260" height="60" fill={C.road} />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={105 + i * 0} y={64 + i * 11} width="50" height="7" fill="#e2e8f0" />
      ))}
      <path d="M130 155 L130 135" stroke={C.obj} strokeWidth="5" />
      <path d="M130 40 L130 55" stroke={C.obj} strokeWidth="5" />
      <path d="M130 28 l-9 15 l18 0 z" fill={C.obj} />
      <circle cx="130" cy="162" r="7" fill="#f59e0b" />
    </svg>
  );
}

/* ---------- questions ---------- */

type Q = {
  scene: () => JSX.Element;
  prompt: string;
  answers: string[];
  hint: string;
};

const QUESTIONS: Q[] = [
  {
    scene: SceneDreta,
    prompt: "On és la cadira?",
    answers: ["a la dreta de la taula", "la cadira és a la dreta de la taula", "és a la dreta de la taula"],
    hint: "à droite de la table",
  },
  {
    scene: SceneEsquerra,
    prompt: "On és la cadira?",
    answers: ["a l'esquerra de la taula", "la cadira és a l'esquerra de la taula", "és a l'esquerra de la taula"],
    hint: "à gauche de la table",
  },
  {
    scene: SceneSota,
    prompt: "On és el gat?",
    answers: ["sota el llit", "el gat és sota el llit", "és sota el llit", "sota del llit"],
    hint: "sous le lit",
  },
  {
    scene: SceneSobre,
    prompt: "On és el gat?",
    answers: ["sobre la taula", "el gat és sobre la taula", "és sobre la taula", "damunt de la taula", "damunt la taula"],
    hint: "sur la table",
  },
  {
    scene: SceneCostat,
    prompt: "On és el llum?",
    answers: ["al costat del sofà", "el llum és al costat del sofà", "és al costat del sofà"],
    hint: "à côté du canapé — attention à de + el",
  },
  {
    scene: SceneDavant,
    prompt: "On és el gat?",
    answers: ["davant de la casa", "el gat és davant de la casa", "és davant de la casa", "davant la casa"],
    hint: "devant la maison",
  },
  {
    scene: SceneEntre,
    prompt: "On és el gat?",
    answers: [
      "entre l'escola i el mercat",
      "el gat és entre l'escola i el mercat",
      "és entre l'escola i el mercat",
      "entre el mercat i l'escola",
    ],
    hint: "entre ... et ...",
  },
  {
    scene: SceneTotRecte,
    prompt: "Quina indicació és? (tu)",
    answers: ["ves tot recte", "tot recte", "ves tot recte!"],
    hint: "va tout droit — jamais « tot dret »",
  },
  {
    scene: SceneGiraDreta,
    prompt: "Quina indicació és? (tu)",
    answers: ["gira a la dreta", "gira a la dreta!"],
    hint: "tourne à droite",
  },
  {
    scene: SceneGiraEsquerra,
    prompt: "Quina indicació és? (tu)",
    answers: ["gira a l'esquerra", "gira a l'esquerra!"],
    hint: "tourne à gauche",
  },
  {
    scene: SceneTravessa,
    prompt: "Quina indicació és? (tu)",
    answers: ["travessa el carrer", "travessa el carrer!"],
    hint: "traverse la rue",
  },
  {
    scene: SceneCantonada,
    prompt: "On és la farmàcia?",
    answers: ["a la cantonada", "la farmàcia és a la cantonada", "és a la cantonada"],
    hint: "au coin de la rue",
  },
  {
    scene: SceneGiraDreta,
    prompt: "La mateixa indicació, però de vostè.",
    answers: ["giri a la dreta", "giri a la dreta!"],
    hint: "vouvoiement : gira → giri",
  },
  {
    scene: SceneTotRecte,
    prompt: "La mateixa indicació, però de vostè.",
    answers: ["vagi tot recte", "vagi tot recte!"],
    hint: "vouvoiement : ves → vagi",
  },
];

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

export default function DireccionsVisual() {
  const items = useMemo(() => QUESTIONS, []);
  const [i, setI] = useState(0);
  const [input, setInput] = useState("");
  const [state, setState] = useState<"typing" | "right" | "wrong">("typing");
  const [score, setScore] = useState({ ok: 0, total: 0 });
  const [showHint, setShowHint] = useState(false);

  const q = items[i];
  const done = i >= items.length;

  function speak(text: string) {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ca-ES";
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  }

  function check() {
    if (state !== "typing") return;
    const ok = q.answers.some((a) => normalize(a) === normalize(input));
    setScore((s) => ({ ok: s.ok + (ok ? 1 : 0), total: s.total + 1 }));
    setState(ok ? "right" : "wrong");
  }

  function next() {
    setInput("");
    setState("typing");
    setShowHint(false);
    setI((v) => v + 1);
  }

  function restart() {
    setI(0);
    setInput("");
    setState("typing");
    setShowHint(false);
    setScore({ ok: 0, total: 0 });
  }

  if (done) {
    const pct = score.total ? Math.round((score.ok / score.total) * 100) : 0;
    return (
      <div className="mx-auto max-w-md p-6 text-center text-white">
        <p className="text-sm uppercase tracking-widest text-slate-400">Acabat</p>
        <p className="mt-3 text-5xl font-black tabular-nums">{pct}%</p>
        <p className="mt-1 text-slate-400">
          {score.ok} / {score.total}
        </p>
        <button
          onClick={restart}
          className="mt-8 w-full rounded-full bg-emerald-600 px-6 py-4 font-bold"
        >
          Torna a començar
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md p-5 text-white">
      <div className="flex items-baseline justify-between">
        <span className="text-xs uppercase tracking-widest text-slate-400">
          Direccions
        </span>
        <span className="text-sm tabular-nums text-slate-400">
          {i + 1} / {items.length}
        </span>
      </div>

      <div className="mt-1 h-1 w-full rounded-full bg-slate-700">
        <div
          className="h-1 rounded-full bg-emerald-500 transition-all"
          style={{ width: `${(i / items.length) * 100}%` }}
        />
      </div>

      <div className="mt-5 rounded-2xl border border-slate-700 bg-slate-800/50 p-4">
        <q.scene />
      </div>

      <p className="mt-5 text-2xl">{q.prompt}</p>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") (state === "typing" ? check() : next());
        }}
        disabled={state !== "typing"}
        autoFocus
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        placeholder="Escriu-ho en català"
        className="mt-4 w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-lg outline-none focus:border-emerald-500 disabled:opacity-60"
      />

      {state === "typing" && (
        <button
          onClick={() => setShowHint(true)}
          className="mt-3 text-sm text-slate-400 underline"
        >
          {showHint ? q.hint : "Indice"}
        </button>
      )}

      {state === "right" && (
        <p className="mt-4 font-medium text-emerald-400">Correcte — {q.answers[0]}</p>
      )}
      {state === "wrong" && (
        <p className="mt-4 font-medium text-red-400">Resposta : {q.answers[0]}</p>
      )}

      {state !== "typing" && (
        <button
          onClick={() => speak(q.answers[0])}
          className="mt-2 text-sm text-slate-300 underline"
        >
          Escolta la pronúncia
        </button>
      )}

      <button
        onClick={state === "typing" ? check : next}
        className="mt-6 w-full rounded-full bg-emerald-600 px-6 py-4 font-bold"
      >
        {state === "typing" ? "Comprova" : "Següent"}
      </button>

      <p className="mt-4 text-center text-sm tabular-nums text-slate-400">
        {score.ok} / {score.total}
      </p>
    </div>
  );
}
