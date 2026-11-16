"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import GrammarDrill from "./GrammarDrill";
import { grammarPoints } from "@/data/grammar";
import { getAllProgress } from "@/utils/srs-storage";
import { isDueForReview } from "@/utils/srs-algorithm";
import { frequencyLists } from "@/data/frequency";

type Drill = {
  prompt: string;
  answer: string;
  hint?: string | { fr: string; en: string };
  srsId?: string;
  label?: string;
};

const MAX_SESSION = 30;

export default function GrammarRepas() {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [loading, setLoading] = useState(true);
  const [dueDrills, setDueDrills] = useState<Drill[]>([]);
  const [sessionKey, setSessionKey] = useState(0); // force un remount de GrammarDrill après une session

  useEffect(() => {
    const savedLanguage = localStorage.getItem('spanish-sprint-language');
    if (savedLanguage === 'fr' || savedLanguage === 'en') setLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    loadDueDrills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionKey]);

  const loadDueDrills = async () => {
    setLoading(true);
    try {
      const allProgress = getAllProgress();

      // Regroupe les cardId dus par quizId : "grammar:<quizId>:<index>"
      const dueByQuiz = new Map<string, number[]>();
      Object.values(allProgress).forEach((progress) => {
        if (!progress.cardId.startsWith('grammar:')) return;
        if (!isDueForReview(progress)) return;

        const rest = progress.cardId.slice('grammar:'.length);
        const sep = rest.lastIndexOf(':');
        if (sep === -1) return;
        const quizId = rest.slice(0, sep);
        const index = parseInt(rest.slice(sep + 1), 10);
        if (Number.isNaN(index)) return;

        if (!dueByQuiz.has(quizId)) dueByQuiz.set(quizId, []);
        dueByQuiz.get(quizId)!.push(index);
      });

      const results: Drill[] = [];

      for (const [quizId, indices] of dueByQuiz.entries()) {
        try {
          const data = await import(`@/data/grammar_quizz/${quizId}.json`);
          const point = grammarPoints.find((p) => p.id === quizId);
          const label = point ? (point.title[language] ?? point.title.fr) : quizId;

          indices.forEach((index) => {
            const original = data?.drills?.[index];
            if (!original) return;
            results.push({
              prompt: original.prompt,
              label,
              answer: original.answer,
              hint: original.hint,
              srsId: `grammar:${quizId}:${index}`,
            });
          });
        } catch {
          // Fichier de leçon introuvable/renommé : on saute, sans planter la révision.
        }
      }

      // Mots fréquents ratés au test (cartes "freq:<langue>:<rang>")
      Object.values(allProgress).forEach((progress) => {
        if (!progress.cardId.startsWith('freq:')) return;
        if (!isDueForReview(progress)) return;
        const [, lang, rankStr] = progress.cardId.split(':');
        if (lang !== 'catalan' && lang !== 'spanish') return;
        const entry = frequencyLists[lang][parseInt(rankStr, 10) - 1];
        if (!entry) return;
        const [word, fr] = entry;
        const answer = word.split(',')[0].trim();
        const meaning = fr.split(' ;')[0];
        const label = lang === 'catalan' ? 'Mot fréquent · Català' : 'Mot fréquent · Español';
        results.push({
          prompt: `« ${meaning} » → ___`,
          label,
          answer,
          hint: `Mot n°${rankStr} de la liste de fréquence.`,
          srsId: progress.cardId,
        });
      });

      // Mélange + plafond de session
      const shuffled = results.sort(() => Math.random() - 0.5).slice(0, MAX_SESSION);
      setDueDrills(shuffled);
    } finally {
      setLoading(false);
    }
  };

  const texts = {
    fr: {
      title: '🔁 Repàs espaiat',
      subtitle: (n: number) => `${n} question${n > 1 ? 's' : ''} à réviser aujourd'hui`,
      empty: "🎉 Rien à réviser pour l'instant ! Fais quelques leçons de grammaire ou un test de mots fréquents, puis reviens dans un jour ou deux.",
      back: '← Retour',
      loading: 'Chargement…',
      again: 'Encore une session',
    },
    en: {
      title: '🔁 Spaced review',
      subtitle: (n: number) => `${n} question${n > 1 ? 's' : ''} due today`,
      empty: "🎉 Nothing due right now! Do a few grammar lessons or a frequent-words test, then come back in a day or two.",
      back: '← Back',
      loading: 'Loading…',
      again: 'Another session',
    },
  };
  const t = texts[language];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p className="text-slate-400">{t.loading}</p>
      </div>
    );
  }

  if (dueDrills.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-2xl mx-auto text-center">
          <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm font-semibold">{t.back}</Link>
          <h1 className="text-3xl font-bold mt-6 mb-4">{t.title}</h1>
          <p className="text-xl text-gray-400">{t.empty}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-2xl mx-auto mb-4">
        <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm font-semibold">{t.back}</Link>
        <h1 className="text-2xl font-bold mt-3">{t.title}</h1>
        <p className="text-slate-400 text-sm">{t.subtitle(dueDrills.length)}</p>
      </div>
      <GrammarDrill
        key={sessionKey}
        title={t.title}
        drills={dueDrills}
        language={language}
        onClose={() => setSessionKey((k) => k + 1)}
      />
    </div>
  );
}
