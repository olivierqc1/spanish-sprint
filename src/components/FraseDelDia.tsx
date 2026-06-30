// src/components/FraseDelDia.tsx
'use client';

import { useEffect, useState } from 'react';

type Frase = {
  es: string;
  fr: string;       // traduction
  truco: string;    // le piège / point de grammaire
};

// Phrases B2 : chacune cache une structure piège (subjonctif, périphrase,
// collocation, contraste de passés...). Contenu original.
const FRASES: Frase[] = [
  { es: 'Aunque llueva, saldré a correr.', fr: "Même s'il pleut, je sortirai courir.", truco: 'aunque + subjonctif = hypothèse (fait non avéré)' },
  { es: 'No creo que valga la pena.', fr: 'Je ne crois pas que ça en vaille la peine.', truco: 'opinion niée → subjonctif (valga, pas vale)' },
  { es: 'Llevo dos horas esperando el tren.', fr: "Ça fait deux heures que j'attends le train.", truco: 'llevar + durée + gérondif = depuis' },
  { es: 'Cuando llegué, la reunión ya había empezado.', fr: 'Quand je suis arrivé, la réunion avait déjà commencé.', truco: 'pluscuamperfecto = le passé du passé' },
  { es: 'Si tuviera más tiempo, estudiaría catalán.', fr: "Si j'avais plus de temps, j'étudierais le catalan.", truco: 'si + subjonctif imparfait + conditionnel' },
  { es: 'Acabo de mudarme a Barcelona.', fr: 'Je viens de déménager à Barcelone.', truco: 'acabar de + infinitif = venir de' },
  { es: 'Aquel día conocí a mi pareja.', fr: 'Ce jour-là, j’ai rencontré ma compagne.', truco: 'conocer à l’indefinido = faire connaissance' },
  { es: 'En España se cena muy tarde.', fr: 'En Espagne, on dîne très tard.', truco: 'se impersonnel = on / les gens (toujours singulier)' },
  { es: 'Me pidió que le echara una mano.', fr: 'Il m’a demandé de lui donner un coup de main.', truco: 'influence au passé → subjonctif imparfait + echar una mano' },
  { es: 'Tienes que tener en cuenta el presupuesto.', fr: 'Tu dois tenir compte du budget.', truco: 'collocation : tener en cuenta' },
  { es: 'Es caro; sin embargo, lo compré.', fr: 'C’est cher ; cependant, je l’ai acheté.', truco: 'sin embargo = connecteur d’opposition (registre soutenu)' },
  { es: 'Ojalá pudiera ir contigo.', fr: 'Si seulement je pouvais venir avec toi.', truco: 'ojalá + subjonctif imparfait = souhait peu probable' },
  { es: 'El proyecto se llevó a cabo en un mes.', fr: 'Le projet a été mené à bien en un mois.', truco: 'collocation : llevar a cabo + passive réfléchie' },
  { es: 'No sabía que vivías aquí.', fr: 'Je ne savais pas que tu habitais ici.', truco: 'no sabía que + indicatif (info ignorée, pas subjonctif)' },
];

function fraseDelDia(): Frase {
  // Indice déterministe basé sur le jour de l'année → même phrase toute la journée.
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86400000);
  return FRASES[dayOfYear % FRASES.length];
}

export default function FraseDelDia() {
  // On choisit la phrase après le montage pour éviter tout décalage d'hydratation.
  const [frase, setFrase] = useState<Frase | null>(null);
  const [hablando, setHablando] = useState(false);

  useEffect(() => {
    setFrase(fraseDelDia());
  }, []);

  const escuchar = () => {
    if (!frase || typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(frase.es);
    u.lang = 'es-ES';
    u.rate = 0.95;
    u.onstart = () => setHablando(true);
    u.onend = () => setHablando(false);
    window.speechSynthesis.speak(u);
  };

  if (!frase) return null;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-purple-300">
          Frase del día
        </span>
        <button
          onClick={escuchar}
          aria-label="Escuchar"
          className="text-sm px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 transition text-white"
        >
          {hablando ? '🔊 ...' : '🔊 Escuchar'}
        </button>
      </div>

      <p className="text-lg font-medium text-white leading-relaxed">{frase.es}</p>
      <p className="text-sm text-slate-400 mt-1 italic">{frase.fr}</p>

      <div className="mt-3 text-xs text-emerald-300 bg-emerald-950/40 border border-emerald-900 rounded-lg px-3 py-2">
        💡 {frase.truco}
      </div>
    </div>
  );
}
