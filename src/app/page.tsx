// src/app/page.tsx
// VERSION CORRIGÉE - Import commenté temporairement

"use client";

// TEMPORAIREMENT COMMENTÉ jusqu'à ce que grammar.ts soit bien configuré
// import { grammarPoints } from '@/data/grammar';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          🇪🇸 Spanish Sprint
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Flashcards */}
          <a 
            href="/flashcards" 
            className="bg-slate-800 hover:bg-slate-700 p-8 rounded-xl border border-slate-700 transition-all hover:scale-105"
          >
            <div className="text-4xl mb-4">🎴</div>
            <h2 className="text-2xl font-bold mb-2">Flashcards</h2>
            <p className="text-slate-400">Apprends du vocabulaire par pays</p>
          </a>

          {/* Audio */}
          <a 
            href="/audio" 
            className="bg-slate-800 hover:bg-slate-700 p-8 rounded-xl border border-slate-700 transition-all hover:scale-105"
          >
            <div className="text-4xl mb-4">🎧</div>
            <h2 className="text-2xl font-bold mb-2">Audio</h2>
            <p className="text-slate-400">Écoute et répète</p>
          </a>

          {/* Grammaire */}
          <a 
            href="/grammar" 
            className="bg-slate-800 hover:bg-slate-700 p-8 rounded-xl border border-slate-700 transition-all hover:scale-105"
          >
            <div className="text-4xl mb-4">📚</div>
            <h2 className="text-2xl font-bold mb-2">Grammaire</h2>
            <p className="text-slate-400">Exercices de grammaire</p>
          </a>

          {/* Conjugaison */}
          <a 
            href="/conjugation" 
            className="bg-slate-800 hover:bg-slate-700 p-8 rounded-xl border border-slate-700 transition-all hover:scale-105"
          >
            <div className="text-4xl mb-4">✍️</div>
            <h2 className="text-2xl font-bold mb-2">Conjugaison</h2>
            <p className="text-slate-400">Entraîne-toi aux verbes</p>
          </a>

          {/* Conversations */}
          <a 
            href="/conversations" 
            className="bg-slate-800 hover:bg-slate-700 p-8 rounded-xl border border-slate-700 transition-all hover:scale-105"
          >
            <div className="text-4xl mb-4">💬</div>
            <h2 className="text-2xl font-bold mb-2">Conversations</h2>
            <p className="text-slate-400">Pratique avec l'IA</p>
          </a>

          {/* Audio Pro */}
          <a 
            href="/audio-pro" 
            className="bg-slate-800 hover:bg-slate-700 p-8 rounded-xl border border-slate-700 transition-all hover:scale-105"
          >
            <div className="text-4xl mb-4">🎙️</div>
            <h2 className="text-2xl font-bold mb-2">Audio Pro</h2>
            <p className="text-slate-400">Génère des audios</p>
          </a>
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-400">
            Apprends l'espagnol de 4 pays différents 🇪🇸 🇲🇽 🇦🇷 🇨🇴
          </p>
        </div>
      </div>
    </main>
  );
}