// src/app/pronunciacio/page.tsx
import Link from 'next/link';
import PronunciacioCatala from '../../components/PronunciacioCatala';

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white">
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
          ← Retour
        </Link>
      </div>
      <PronunciacioCatala />
    </main>
  );
}