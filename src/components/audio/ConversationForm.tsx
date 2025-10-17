// src/components/audio/ConversationForm.tsx
'use client';
import { useState } from 'react';
import { Conversation, ConversationLine } from '@/types/audio';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { notify } from '@/lib/notifications';

interface ConversationFormProps {
  onSave: (conversation: Conversation) => void;
  countries: string[];
}

export function ConversationForm({ onSave, countries }: ConversationFormProps) {
  const [title, setTitle] = useState('');
  const [country, setCountry] = useState(countries[0] || 'Espagne');
  const [level, setLevel] = useState('A1');
  const [lines, setLines] = useState<ConversationLine[]>([
    { text: '', speaker: '', gender: 'homme' }
  ]);

  const addLine = () => {
    setLines([...lines, { text: '', speaker: '', gender: 'homme' }]);
  };

  const updateLine = (index: number, field: keyof ConversationLine, value: string) => {
    const updated = [...lines];
    updated[index] = { ...updated[index], [field]: value };
    setLines(updated);
  };

  const removeLine = (index: number) => {
    if (lines.length > 1) {
      setLines(lines.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      notify.error('Le titre est requis');
      return;
    }

    if (lines.some(line => !line.text.trim() || !line.speaker.trim())) {
      notify.error('Tous les champs doivent être remplis');
      return;
    }

    const conversation: Conversation = {
      id: `manual_${Date.now()}`,
      title,
      country,
      level,
      lines,
    };

    onSave(conversation);
    
    // Reset
    setTitle('');
    setLines([{ text: '', speaker: '', gender: 'homme' }]);
    
    notify.success('✅ Conversation sauvegardée !');
  };

  return (
    <Card>
      <h2 className="text-xl font-bold mb-6">✍️ Ajouter une conversation</h2>

      <div className="space-y-4">
        {/* Titre */}
        <div>
          <label className="block text-sm text-slate-400 mb-2">
            Titre de la conversation
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Au restaurant"
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Pays et Niveau */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Pays</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:border-blue-500 focus:outline-none"
            >
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Niveau</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:border-blue-500 focus:outline-none"
            >
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
            </select>
          </div>
        </div>

        {/* Lignes */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Répliques</h3>
          <div className="space-y-3">
            {lines.map((line, idx) => (
              <Card key={idx} variant="primary" className="relative">
                <div className="flex justify-between items-center mb-3">
                  <strong className="text-blue-400">Réplique {idx + 1}</strong>
                  {lines.length > 1 && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeLine(idx)}
                    >
                      🗑️
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <input
                    type="text"
                    placeholder="Nom (ex: Carlos)"
                    value={line.speaker}
                    onChange={(e) => updateLine(idx, 'speaker', e.target.value)}
                    className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 focus:border-blue-500 focus:outline-none"
                  />
                  <select
                    value={line.gender}
                    onChange={(e) => updateLine(idx, 'gender', e.target.value as 'homme' | 'femme')}
                    className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="homme">♂️ Homme</option>
                    <option value="femme">♀️ Femme</option>
                  </select>
                </div>

                <textarea
                  placeholder="Texte en espagnol..."
                  value={line.text}
                  onChange={(e) => updateLine(idx, 'text', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 focus:border-blue-500 focus:outline-none resize-none"
                />
              </Card>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button variant="secondary" onClick={addLine} className="flex-1">
            ➕ Ajouter une réplique
          </Button>
          <Button variant="primary" onClick={handleSubmit} className="flex-[2]">
            💾 Sauvegarder
          </Button>
        </div>
      </div>
    </Card>
  );
}
