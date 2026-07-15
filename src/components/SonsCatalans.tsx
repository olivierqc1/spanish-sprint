'use client';
// src/components/SonsCatalans.tsx
// Guide interactif des sons catalans. Les REGLES sont dans src/data/catalanSounds.ts.

import { useState, useCallback } from 'react';
import { catalanSounds } from '@/data/catalanSounds';

export default function SonsCatalans() {
  const [openGroup, setOpenGroup] = useState<string | null>('gu-qu');
  const [playing, setPlaying] = useState<string | null>(null);

  const speak = useCallback((word: string, key: string, slow = false) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(word);
    u.lang = 'ca-ES';
    u.rate = slow ? 0.6 : 0.85;
    const voice = window.speechSynthesis
      .getVoices()
      .find(v => v.lang.toLowerCase().startsWith('ca'));
    if (voice) u.voice = voice;
    u.onstart = () => setPlaying(key);
    u.onend = () => setPlaying(null);
    window.speechSynthesis.speak(u);
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 pb-24">
      <h1 className="text-2xl font-bold mb-1">🔊 Els sons del català</h1>
      <p className="text-sm text-slate-400 mb-6">
        Les règles de prononciation qui piègent les francophones.
        Tape sur un mot pour l&apos;entendre.
      </p>

      <div className="space-y-3">
        {catalanSounds.map(group => {
          const isOpen = openGroup === group.id;
          return (
            <div
              key={group.id}
              className="rounded-2xl border border-yellow-900/40 bg-yellow-950/10 overflow-hidden"
            >
              {/* En-tete du groupe */}
              <button
                onClick={() => setOpenGroup(isOpen ? null : group.id)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className="font-bold text-lg">
                  {group.icon} {group.name}
                </span>
                <span className="text-slate-400 text-xl">{isOpen ? '−' : '+'}</span>
              </button>

              {/* Regles */}
              {isOpen && (
                <div className="px-4 pb-4 space-y-4">
                  {group.rules.map(rule => (
                    <div
                      key={rule.id}
                      className="rounded-xl bg-slate-900/60 border border-slate-700 p-4"
                    >
                      <p className="font-bold text-yellow-300">{rule.title}</p>
                      <p className="text-sm text-slate-400 mb-1">{rule.sound}</p>
                      <p className="text-sm text-slate-300 mb-3">{rule.tip}</p>

                      <div className="flex flex-wrap gap-2">
                        {rule.examples.map(ex => {
                          const key = `${rule.id}-${ex.word}`;
                          return (
                            <button
                              key={key}
                              onClick={() => speak(ex.word, key)}
                              className={`
                                flex flex-col items-start px-3 py-2 rounded-xl border text-left
                                transition-all
                                ${playing === key
                                  ? 'border-yellow-400 bg-yellow-900/40 scale-105'
                                  : 'border-slate-600 bg-slate-800 hover:border-yellow-600'
                                }
                              `}
                            >
                              <span className="font-bold">
                                🔊 {ex.word}
                              </span>
                              <span className="text-xs text-yellow-400/80">
                                [{ex.approx}]
                              </span>
                              <span className="text-xs text-slate-400">{ex.fr}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-xs text-slate-500 mt-8">
        💡 Les prononciations entre [crochets] sont des approximations « à la française »
        (variante de Barcelone / catalan central). Fie-toi surtout au son 🔊.
      </p>
    </div>
  );
}
