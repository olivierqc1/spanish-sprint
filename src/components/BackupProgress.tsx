// src/components/BackupProgress.tsx
'use client';

import { useRef, useState } from 'react';

export default function BackupProgress({ language = 'fr' }: { language?: 'fr' | 'en' }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const t =
    language === 'fr'
      ? {
          title: 'Sauvegarde de ma progression',
          desc: 'Toute ta progression (série, erreurs, scores) est stockée dans ce navigateur. Exporte-la régulièrement pour ne rien perdre si tu changes d’appareil ou vides ton cache.',
          export: '⬇︎ Exporter',
          import: '⬆︎ Importer',
          exported: 'Sauvegarde téléchargée ✓',
          imported: 'Restauré ✓ — rechargement…',
          confirm: 'Importer cette sauvegarde ? Cela remplacera ta progression actuelle.',
          badFile: 'Fichier invalide.',
          error: 'Erreur pendant l’export.',
        }
      : {
          title: 'Back up my progress',
          desc: 'All your progress (streak, mistakes, scores) is stored in this browser. Export it regularly so you lose nothing if you switch devices or clear your cache.',
          export: '⬇︎ Export',
          import: '⬆︎ Import',
          exported: 'Backup downloaded ✓',
          imported: 'Restored ✓ — reloading…',
          confirm: 'Import this backup? It will replace your current progress.',
          badFile: 'Invalid file.',
          error: 'Error during export.',
        };

  const exportData = () => {
    try {
      const data: Record<string, string> = {};
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k) data[k] = localStorage.getItem(k) ?? '';
      }
      const payload = { _app: 'spanish-sprint', _date: new Date().toISOString(), data };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `spanish-sprint-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setMsg({ text: t.exported, ok: true });
    } catch {
      setMsg({ text: t.error, ok: false });
    }
  };

  const importData = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        const data = parsed?.data ?? parsed;
        if (!data || typeof data !== 'object') throw new Error('bad');
        if (!window.confirm(t.confirm)) return;
        Object.entries(data).forEach(([k, v]) => {
          if (typeof v === 'string') localStorage.setItem(k, v);
        });
        setMsg({ text: t.imported, ok: true });
        setTimeout(() => window.location.reload(), 800);
      } catch {
        setMsg({ text: t.badFile, ok: false });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 max-w-2xl mx-auto">
      <h3 className="text-lg font-bold text-white mb-1">💾 {t.title}</h3>
      <p className="text-sm text-slate-400 mb-4">{t.desc}</p>

      <div className="flex gap-3">
        <button
          onClick={exportData}
          className="flex-1 bg-blue-600 hover:bg-blue-500 px-4 py-2.5 rounded-xl font-semibold transition"
        >
          {t.export}
        </button>
        <button
          onClick={() => fileRef.current?.click()}
          className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2.5 rounded-xl font-semibold transition"
        >
          {t.import}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) importData(f);
            e.target.value = '';
          }}
        />
      </div>

      {msg && (
        <p className={`mt-3 text-sm ${msg.ok ? 'text-emerald-400' : 'text-rose-400'}`}>{msg.text}</p>
      )}
    </div>
  );
}
