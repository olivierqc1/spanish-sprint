// src/app/input/page.tsx
'use client';

import Link from 'next/link';
import ComprehensibleInput from '@/components/ComprehensibleInput';

export default function InputPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-4">
      <div className="max-w-2xl mx-auto space-y-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
            ← Accueil
          </Link>
          <h1 className="text-xl font-black">Input compréhensible</h1>
        </div>
        <ComprehensibleInput />
      </div>
    </main>
  );
}
