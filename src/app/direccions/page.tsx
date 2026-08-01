"use client";
import Link from "next/link";
import DireccionsVisual from "@/components/DireccionsVisual";

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-950">
      <div className="p-4">
        <Link href="/" className="text-blue-400 text-sm font-semibold">← Accueil</Link>
      </div>
      <DireccionsVisual />
    </main>
  );
}