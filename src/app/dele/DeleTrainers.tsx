'use client';

// src/app/dele/DeleTrainers.tsx
// Mode DELE B2 — partie 1 sur 2 : données, utilitaires, écrit et oral.

import { useEffect, useRef, useState } from 'react';

// ───────────────────────── Données ─────────────────────────

export const DEFAULT_EXAM_DATE = '2027-05-22'; // convocatoria de mai (à confirmer quand le calendrier 2027 sort)

export type Block = { time: string; label: string; kind: 'es' | 'cat' | 'class' | 'free' };

// 0 = dimanche … 6 = samedi (Date.getDay)
export const WEEK: { day: string; blocks: Block[] }[] = [
  { day: 'Dimanche', blocks: [{ time: '—', label: 'Repos ou 20 min de révision légère', kind: 'free' }] },
  { day: 'Lundi', blocks: [
    { time: 'Matin', label: '30 min de subjonctif (parcours ci-dessous)', kind: 'es' },
    { time: 'Après-midi', label: '30 min de révision de catalan', kind: 'cat' },
  ] },
  { day: 'Mardi', blocks: [
    { time: '12:15–14:15', label: 'EOI — expresión oral y escrita', kind: 'class' },
    { time: '16:30–18:30', label: 'CPNL — catalan', kind: 'class' },
    { time: 'Soir', label: '10 min : relire tes notes', kind: 'free' },
  ] },
  { day: 'Mercredi', blocks: [
    { time: 'Matin', label: '45 min de rédaction DELE (onglet Écrit)', kind: 'es' },
    { time: 'Avant 17 h', label: '30 min de devoirs de catalan', kind: 'cat' },
    { time: '18:30–20:30', label: 'Cours de cuisine japonaise', kind: 'class' },
  ] },
  { day: 'Jeudi', blocks: [
    { time: 'Matin', label: '25 min de grammaire espagnole', kind: 'es' },
    { time: '16:30–18:30', label: 'CPNL — catalan', kind: 'class' },
  ] },
  { day: 'Vendredi', blocks: [
    { time: '12:15–14:15', label: 'EOI — expresión oral y escrita', kind: 'class' },
    { time: 'Après-midi', label: '20 min de catalan', kind: 'cat' },
  ] },
  { day: 'Samedi', blocks: [{ time: 'Libre', label: 'Espagnol passif : podcast, série, El País', kind: 'es' }] },
];

export const KIND_STYLE: Record<Block['kind'], string> = {
  es: 'border-l-blue-500',
  cat: 'border-l-amber-500',
  class: 'border-l-emerald-500',
  free: 'border-l-slate-600',
};

// Parcours subjonctif : modules existants de l'app, dans l'ordre conseillé.
export const PATH: { group: string; ids: string[] }[] = [
  { group: 'Les bases', ids: ['subjuntivo_presente', 'subjuntivo_deseos_sentimientos', 'verbos_emociones_subj', 'subjuntivo_valoracion'] },
  { group: 'Indicatif ou subjonctif ?', ids: ['opinion_indicativo_subjuntivo_b2', 'temporales_subjuntivo_b2', 'relativas_subjuntivo_b2', 'aunque_y_eso_que'] },
  { group: 'Passé et hypothèses', ids: ['subjuntivo_perfecto', 'perfecto_subjuntivo_b2', 'subjuntivo_imperfecto', 'oraciones_condicionales', 'condicionales_b2', 'condicional_irreal_pasado_b2'] },
  { group: 'Vocabulaire B2', ids: ['conectores_argumentacion_b2', 'marcadores_discurso', 'colocaciones_b2'] },
  { group: 'Révision finale', ids: ['examen_b2_repaso'] },
];

export type Prompt = { id: string; tarea: 1 | 2; text: string };

export const WRITING: Prompt[] = [
  { id: 'w1', tarea: 1, text: 'Tu edificio lleva tres meses de obras que empiezan a las 7 h. Escribe un correo a la administración de la finca: explica el problema, cómo te afecta y qué soluciones propones.' },
  { id: 'w2', tarea: 1, text: 'Compraste un portátil por internet y llegó con la pantalla rota. Escribe una reclamación a la tienda: cuenta lo ocurrido, qué has intentado y qué exiges.' },
  { id: 'w3', tarea: 1, text: 'Un amigo quiere mudarse a Barcelona y te pide consejo. Escríbele un correo sobre barrios, precios y cómo buscar piso, con recomendaciones concretas.' },
  { id: 'w4', tarea: 2, text: 'Artículo de opinión para una revista: «¿Debería limitarse la llegada de cruceros a Barcelona?». Presenta argumentos a favor y en contra y da tu opinión.' },
  { id: 'w5', tarea: 2, text: 'Entrada de blog: el teletrabajo, ¿ventaja o trampa? Compara tu experiencia con la de otras personas y saca una conclusión.' },
  { id: 'w6', tarea: 2, text: 'Informe para tu ayuntamiento: resultados de una encuesta vecinal sobre el uso de la bicicleta. Describe los datos principales y propón dos medidas.' },
];

export const ORAL: { tarea: 1 | 2 | 3; title: string; text: string; minutes: number }[] = [
  { tarea: 1, minutes: 7, title: 'Propuestas — vivienda', text: 'Tema: el precio del alquiler en las grandes ciudades. Propuestas: limitar los pisos turísticos; construir vivienda pública; bajar los impuestos a los propietarios que alquilan barato; ayudas directas a jóvenes; fomentar el trabajo en pueblos. Comenta al menos cuatro: ventajas, inconvenientes, cuál te parece mejor y por qué.' },
  { tarea: 1, minutes: 7, title: 'Propuestas — idiomas', text: 'Tema: cómo mejorar el aprendizaje de idiomas de los adultos. Propuestas: clases gratuitas en centros cívicos; intercambios con nativos; más cine en versión original; bonificar a las empresas que forman a sus empleados; certificados más baratos.' },
  { tarea: 2, minutes: 6, title: 'Situación — en la oficina', text: 'Imagina la foto: una oficina moderna, una persona joven delante del ordenador con cara de preocupación, dos compañeros hablando detrás con papeles en la mano. Describe la escena, imagina qué ha pasado, qué va a ocurrir y cómo se sienten. Después relaciónalo con tu experiencia.' },
  { tarea: 2, minutes: 6, title: 'Situación — en el mercado', text: 'Imagina la foto: un mercado lleno de gente un sábado, un cliente discute con un vendedor de fruta, una mujer mayor observa. Describe, imagina el diálogo y el desenlace, y cuenta una situación parecida que hayas vivido.' },
  { tarea: 3, minutes: 4, title: 'Encuesta — ocio', text: 'Encuesta: «¿En qué gastas tu tiempo libre?» Respuestas: 38 % pantallas, 24 % deporte, 18 % amigos y familia, 12 % cultura, 8 % otros. Da tu propia respuesta, compárala con los datos y comenta qué te sorprende.' },
  { tarea: 3, minutes: 4, title: 'Encuesta — trabajo', text: 'Encuesta: «¿Qué valoras más en un empleo?» Respuestas: 35 % sueldo, 27 % horario flexible, 20 % buen ambiente, 18 % posibilidades de ascenso. Responde tú, compara y justifica.' },
];

// ───────────────────────── Utilitaires ─────────────────────────

export function readLS(key: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
}
export function writeLS(key: string, value: string) {
  try { localStorage.setItem(key, value); } catch { /* quota plein */ }
}
export function daysUntil(iso: string): number {
  const target = new Date(iso + 'T09:00:00');
  return Math.ceil((target.getTime() - Date.now()) / 86_400_000);
}
export function fmt(sec: number): string {
  const m = Math.floor(Math.abs(sec) / 60);
  const s = Math.abs(sec) % 60;
  return `${sec < 0 ? '-' : ''}${m}:${String(s).padStart(2, '0')}`;
}
export function countWords(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

// Chrono simple (compte à rebours, passe en négatif si dépassé)
export function useCountdown(initialSec: number) {
  const [left, setLeft] = useState(initialSec);
  const [running, setRunning] = useState(false);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (!running) return;
    ref.current = setInterval(() => setLeft((l) => l - 1), 1000);
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [running]);
  const reset = (sec = initialSec) => { setRunning(false); setLeft(sec); };
  return { left, running, start: () => setRunning(true), pause: () => setRunning(false), reset };
}

// ───────────────────────── Écrit ─────────────────────────

const WRITING_MIN = 150;
const WRITING_MAX = 180;
const WRITING_SECONDS = 40 * 60; // 80 min pour les 2 tareas → 40 min chacune

export function WritingTrainer() {
  const [promptId, setPromptId] = useState(WRITING[0].id);
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const timer = useCountdown(WRITING_SECONDS);
  const prompt = WRITING.find((p) => p.id === promptId)!;

  useEffect(() => { setText(readLS(`ss-dele-draft-${promptId}`, '')); timer.reset(); setCopied(false); }, [promptId]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { writeLS(`ss-dele-draft-${promptId}`, text); }, [text, promptId]);

  const words = countWords(text);
  const wordColor = words < WRITING_MIN ? 'text-slate-400' : words <= WRITING_MAX ? 'text-emerald-400' : 'text-amber-400';

  const copyForCorrection = async () => {
    const payload = `Corrige ce texte du DELE B2 (tarea ${prompt.tarea}). Consigne : ${prompt.text}\n\nMon texte :\n${text}`;
    try { await navigator.clipboard.writeText(payload); setCopied(true); } catch { setCopied(false); }
  };

  return (
    <section>
      <label className="block text-sm text-slate-400 mb-1" htmlFor="w-prompt">Sujet</label>
      <select
        id="w-prompt"
        value={promptId}
        onChange={(e) => setPromptId(e.target.value)}
        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm mb-3"
      >
        {WRITING.map((p) => (
          <option key={p.id} value={p.id}>Tarea {p.tarea} — {p.text.slice(0, 60)}…</option>
        ))}
      </select>

      <p className="bg-slate-900 rounded-lg p-4 text-sm leading-relaxed mb-4">{prompt.text}</p>

      <div className="flex items-center gap-3 mb-3">
        <span className={`text-3xl font-black tabular-nums ${timer.left < 0 ? 'text-red-400' : ''}`}>{fmt(timer.left)}</span>
        {timer.running
          ? <button onClick={timer.pause} className="px-4 py-2 rounded-lg bg-slate-700 font-semibold text-sm">Pause</button>
          : <button onClick={timer.start} className="px-4 py-2 rounded-lg bg-blue-600 font-semibold text-sm">Démarrer</button>}
        <button onClick={() => timer.reset()} className="px-3 py-2 rounded-lg text-slate-400 text-sm">Réinitialiser</button>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={12}
        placeholder="Escribe aquí…"
        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm leading-relaxed focus:border-blue-500 focus:outline-none"
      />
      <div className="flex items-center justify-between mt-2">
        <span className={`text-sm font-semibold ${wordColor}`}>{words} mots (objectif {WRITING_MIN}–{WRITING_MAX})</span>
        <button
          onClick={copyForCorrection}
          disabled={!text.trim()}
          className="px-3 py-2 rounded-lg bg-emerald-700 disabled:opacity-40 text-sm font-semibold"
        >{copied ? 'Copié ✓' : 'Copier pour correction'}</button>
      </div>
      <p className="text-slate-500 text-xs mt-3">
        Ton brouillon est sauvegardé automatiquement. « Copier pour correction » prépare le texte avec la consigne,
        à coller dans Claude ou à montrer à ta prof de l’EOI.
      </p>
    </section>
  );
}

// ───────────────────────── Oral ─────────────────────────

const PREP_SECONDS = 20 * 60; // préparation des tareas 1 et 2

export function OralTrainer() {
  const [idx, setIdx] = useState(0);
  const item = ORAL[idx];
  const prep = useCountdown(PREP_SECONDS);
  const talk = useCountdown(item.minutes * 60);

  useEffect(() => { prep.reset(); talk.reset(item.minutes * 60); }, [idx]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section>
      <div className="flex flex-wrap gap-2 mb-4">
        {ORAL.map((o, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`px-3 py-2 rounded-lg text-xs font-semibold ${i === idx ? 'bg-blue-600' : 'bg-slate-900 text-slate-300'}`}
          >T{o.tarea} · {o.title.split(' — ')[1]}</button>
        ))}
      </div>

      <h2 className="font-bold text-lg mb-2">Tarea {item.tarea} — {item.title.split(' — ')[0]}</h2>
      <p className="bg-slate-900 rounded-lg p-4 text-sm leading-relaxed mb-5">{item.text}</p>

      {item.tarea !== 3 && (
        <TimerRow label="Préparation (20 min, notes permises)" t={prep} />
      )}
      <TimerRow label={`Prise de parole (environ ${item.minutes} min)`} t={talk} />

      <p className="text-slate-500 text-xs mt-4">
        Astuce : enregistre-toi avec le dictaphone du téléphone, puis réécoute en notant tes erreurs de subjonctif
        et les connecteurs que tu aurais pu utiliser.
      </p>
    </section>
  );
}

function TimerRow({ label, t }: { label: string; t: ReturnType<typeof useCountdown> }) {
  return (
    <div className="bg-slate-900 rounded-lg p-4 mb-3">
      <p className="text-sm text-slate-400 mb-2">{label}</p>
      <div className="flex items-center gap-3">
        <span className={`text-3xl font-black tabular-nums ${t.left < 0 ? 'text-red-400' : ''}`}>{fmt(t.left)}</span>
        {t.running
          ? <button onClick={t.pause} className="px-4 py-2 rounded-lg bg-slate-700 font-semibold text-sm">Pause</button>
          : <button onClick={t.start} className="px-4 py-2 rounded-lg bg-blue-600 font-semibold text-sm">Démarrer</button>}
        <button onClick={() => t.reset()} className="px-3 py-2 rounded-lg text-slate-400 text-sm">Réinitialiser</button>
      </div>
    </div>
  );
}
