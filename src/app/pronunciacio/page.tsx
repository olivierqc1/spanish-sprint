'use client';
// src/app/pronunciacio/page.tsx
// Deux onglets : pratique de prononciation (micro) + guide des sons.

import { useState } from 'react';
import Link from 'next/link';
import PronunciacioCatala from '../../components/PronunciacioCatala';
import SonsCatalans from '../../components/SonsCatalans';

export default function Page() {
  const [tab, setTab] = useState<'practica' | 'sons'>('practica');

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white">
      <div className="max-w-4xl mx-auto px-4 pt-6 flex items-center justify-between">
        <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
          ← Retour
        </Link>

        <div className="bg-slate-800 rounded-lg p-1 flex gap-1">
          <button
            onClick={() => setTab('practica')}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
              tab === 'practica' ? 'bg-yellow-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            🎤 Pratique
          </button>
          <button
            onClick={() => setTab('sons')}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
              tab === 'sons' ? 'bg-yellow-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            🔊 Les sons
          </button>
        </div>
      </div>

      <div className="pt-6">
        {tab === 'practica' ? <PronunciacioCatala /> : <SonsCatalans />}
      </div>
    </main>
  );
}
