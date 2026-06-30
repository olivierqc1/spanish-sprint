// src/components/RepasoBadge.tsx
'use client';

import { useEffect, useState } from 'react';
import { countDue } from '@/data/errorLog';

type Props = {
  /** Optionnel : si fourni, le badge devient cliquable et appelle cette fonction. */
  onClick?: () => void;
  language?: 'fr' | 'en';
  /** 'pill' = pastille avec texte ; 'dot' = petit point rouge compact (pour une icône de menu). */
  variant?: 'pill' | 'dot';
};

export default function RepasoBadge({ onClick, language = 'fr', variant = 'pill' }: Props) {
  const [due, setDue] = useState(0);

  useEffect(() => {
    const refresh = () => setDue(countDue());
    refresh();

    // Se met à jour quand on revient sur l'onglet, quand le localStorage change
    // (autres onglets), périodiquement (des fautes deviennent « dues » avec le temps),
    // et sur un événement custom qu'on peut déclencher après une révision.
    const onFocus = () => refresh();
    const onStorage = (e: StorageEvent) => { if (e.key === 'ss_error_log_v1') refresh(); };
    const onCustom = () => refresh();
    window.addEventListener('focus', onFocus);
    window.addEventListener('storage', onStorage);
    window.addEventListener('ss-errors-updated', onCustom);
    const id = window.setInterval(refresh, 30_000);

    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('ss-errors-updated', onCustom);
      window.clearInterval(id);
    };
  }, []);

  const t = language === 'fr'
    ? { due: 'à revoir', upToDate: 'À jour ✓' }
    : { due: 'due', upToDate: 'Up to date ✓' };

  // Variante compacte : juste un point rouge avec le nombre (pour coller sur une icône).
  if (variant === 'dot') {
    if (due === 0) return null;
    return (
      <span
        onClick={onClick}
        className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-red-600 text-white text-xs font-bold ${onClick ? 'cursor-pointer' : ''}`}
      >
        {due > 99 ? '99+' : due}
      </span>
    );
  }

  // Variante pastille : état « à jour » si rien à revoir, sinon compteur rouge.
  if (due === 0) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-400">
        🔁 {t.upToDate}
      </span>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/20 border border-red-600 text-sm font-semibold text-red-300 transition hover:bg-red-600/30 ${onClick ? '' : 'cursor-default'}`}
    >
      🔁 {due} {t.due}
    </button>
  );
}
