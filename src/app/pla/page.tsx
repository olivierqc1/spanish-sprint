// src/app/pla/page.tsx
'use client';

import Link from 'next/link';
import PlaEstudi from '@/components/PlaEstudi';

export default function PlaPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-4">
      <div className="max-w-2xl mx-auto space-y-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
            ← Accueil
          </Link>
          <h1 className="text-xl font-black">Mon plan</h1>
        </div>
        <PlaEstudi />
      </div>
    </main>
  );
}
