'use client';

import { useMemo, useState, useEffect } from 'react';
import { lectures, type Lectura } from '@/data/lectures';
import { useSpeak } from '@/hooks/useSpeak';

const READ_KEY = 'ss_lectura_read_v1';

function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[.,;:!?«»"'’·()]/g, '')
    .trim();
}

function loadRead(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(READ_KEY) || '[]');
  } catch {
    return [];
  }
}
function saveRead(ids: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(READ_KEY, JSON.stringify(ids));
  } catch {
    /* ignore */
  }
}

export default function Lectura() {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<{ word: string; gloss: string } | null>(null);
  const [read, setRead] = useState<string[]>([]);
  const { speak, supported: canSpeak } = useSpeak('ca-ES');

  useEffect(() => {
    setRead(loadRead());
  }, []);

  const text: Lectura = lectures[index];

  const markRead = () => {
    if (read.includes(text.id)) return;
    const next = [...read, text.id];
    setRead(next);
    saveRead(next);
  };

  // Rendu d'un paragraphe : chaque mot présent au glossaire devient cliquable.
  const renderParagraph = (para: string, pIdx: number) => {
    const tokens = para.split(/(\s+)/); // garde les espaces
    return (
      <p key={pIdx} className="text-lg leading-relaxed text-slate-100 mb-3">
        {tokens.map((tok, i) => {
          if (/^\s+$/.test(tok)) return <span key={i}>{tok}</span>;
          const key = norm(tok);
          const gloss = text.glossary[key];
          if (!gloss) return <span key={i}>{tok}</span>;
          return (
            <button
              key={i}
              onClick={() => setPicked({ word: tok.replace(/^[^\wàèéíòóúïüçÀÈÉÍÒÓÚÏÜÇ]+|[^\wàèéíòóúïüçÀÈÉÍÒÓÚÏÜÇ]+$/g, ''), gloss })}
              className="underline decoration-dotted decoration-blue-400 underline-offset-4 text-blue-200 hover:text-blue-100"
            >
              {tok}
            </button>
          );
        })}
      </p>
    );
  };

  const glossaryCount = useMemo(() => Object.keys(text.glossary).length, [text]);

  return (
    <section className="space-y-5">
      {/* Sélecteur de textes */}
      <div className="flex gap-2 flex-wrap">
        {lectures.map((l, i) => (
          <button
            key={l.id}
            onClick={() => {
              setIndex(i);
              setPicked(null);
            }}
            className={`px-3 py-2 rounded-xl text-sm font-semibold transition ${
              i === index ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {read.includes(l.id) ? '✓ ' : ''}
            {l.theme} {l.title}
          </button>
        ))}
      </div>

      {/* Carte du texte */}
      <article className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xl font-black">{text.title}</h2>
          <span className="text-xs font-bold text-slate-400 bg-slate-800 px-2 py-1 rounded-full">
            {text.level}
          </span>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          {glossaryCount} mots cliquables · tape un mot souligné pour la traduction
        </p>

        {text.paragraphs.map((p, i) => (
          <div key={i} className="mb-2">
            {renderParagraph(p, i)}
            {canSpeak && (
              <button
                onClick={() => speak(p, 'ca-ES')}
                className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1"
              >
                🔊 Écouter ce paragraphe
              </button>
            )}
          </div>
        ))}

        {/* Barre de traduction (mot tapé) */}
        {picked && (
          <div className="mt-4 flex items-center justify-between bg-blue-950/40 border border-blue-800 rounded-xl p-3">
            <div>
              <span className="font-bold text-blue-200">{picked.word}</span>
              <span className="text-slate-400 mx-2">→</span>
              <span className="text-slate-100">{picked.gloss}</span>
            </div>
            <div className="flex items-center gap-2">
              {canSpeak && (
                <button onClick={() => speak(picked.word, 'ca-ES')} className="text-blue-300 hover:text-white">
                  🔊
                </button>
              )}
              <button onClick={() => setPicked(null)} className="text-slate-500 hover:text-white text-sm">
                ✕
              </button>
            </div>
          </div>
        )}
      </article>

      {/* Production : résumé */}
      <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
        <p className="text-xs uppercase tracking-wide text-slate-500 font-bold mb-2">✍️ Après la lecture</p>
        <p className="text-sm text-slate-200 mb-4">{text.summaryPrompt}</p>
        <button
          onClick={markRead}
          disabled={read.includes(text.id)}
          className="w-full py-3 rounded-xl font-bold transition bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500"
        >
          {read.includes(text.id) ? '✓ Lu' : 'Marquer comme lu'}
        </button>
      </div>
    </section>
  );
}
