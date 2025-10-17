// src/components/audio/ConversationQuickNav.tsx
import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Conversation } from '@/types/audio';

export function ConversationQuickNav({
  conversations,
  onSelect,
}: {
  conversations: Conversation[];
  onSelect: (conv: Conversation) => void;
}) {
  const [search, setSearch] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('ALL');
  const [filterCountry, setFilterCountry] = useState<string>('ALL');

  const filtered = useMemo(() => {
    return conversations.filter(conv => {
      const matchSearch = conv.title.toLowerCase().includes(search.toLowerCase());
      const matchLevel = filterLevel === 'ALL' || conv.level === filterLevel;
      const matchCountry = filterCountry === 'ALL' || conv.country === filterCountry;
      return matchSearch && matchLevel && matchCountry;
    });
  }, [conversations, search, filterLevel, filterCountry]);

  return (
    <Card className="mb-6">
      <div className="space-y-4">
        {/* Recherche */}
        <input
          type="text"
          placeholder="🔍 Rechercher une conversation..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg"
        />

        {/* Filtres */}
        <div className="flex gap-3">
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg"
          >
            <option value="ALL">Tous niveaux</option>
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
          </select>

          <select
            value={filterCountry}
            onChange={(e) => setFilterCountry(e.target.value)}
            className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg"
          >
            <option value="ALL">Tous pays</option>
            <option value="Espagne">🇪🇸 Espagne</option>
            <option value="Mexique">🇲🇽 Mexique</option>
            <option value="Argentine">🇦🇷 Argentine</option>
          </select>
        </div>

        {/* Résultats */}
        {filtered.length > 0 ? (
          <div className="max-h-64 overflow-y-auto space-y-2">
            {filtered.map(conv => (
              <button
                key={conv.id}
                onClick={() => onSelect(conv)}
                className="w-full text-left px-4 py-3 bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{conv.title}</span>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-blue-600 text-xs rounded">
                      {conv.level}
                    </span>
                    <span className="text-sm text-slate-400">
                      {conv.country}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mt-1">
                  {conv.lines.length} répliques
                </p>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-500 py-4">
            Aucune conversation trouvée
          </p>
        )}
      </div>
    </Card>
  );
}
