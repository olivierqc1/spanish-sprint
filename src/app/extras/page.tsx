// src/app/extras/page.tsx
'use client';

import Link from 'next/link';
import BackupProgress from '@/components/BackupProgress';
import SesionPuntosDebiles from '@/components/SesionPuntosDebiles';
import RepasoErrores from '@/components/RepasoErrores';
import DictadoAudio from '@/components/DictadoAudio';


export default function ExtrasPage() {
  const language: 'fr' | 'en' = 'fr';

  return (
    <main className="min-h-screen bg-slate-950 text-white p-4">
      <div className="max-w-2xl mx-auto space-y-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
            ← Accueil
          </Link>
          <h1 className="text-xl font-black">Extras</h1>
        </div>

        <SesionPuntosDebiles language={language} />
        <RepasoErrores language={language} />
        <BackupProgress language={language} />
      </div>
    </main>
  );
}
