// src/components/audio/AIDialogueGenerator.tsx
'use client';
import { useState } from 'react';
import { Conversation } from '@/types/audio';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { notify, handleError } from '@/lib/notifications';

interface AIDialogueGeneratorProps {
  countries: string[];
  onGenerate: (conversation: Conversation) => void;
}

export function AIDialogueGenerator({ countries, onGenerate }: AIDialogueGeneratorProps) {
  const [topic, setTopic] = useState('');
  const [country, setCountry] = useState(countries[0] || 'Espagne');
  const [level, setLevel] = useState('A1');
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      notify.error('⚠️ Entre un thème !');
      return;
    }

    setGenerating(true);
    const toastId = notify.loading('Génération du dialogue avec l\'IA...');

    try {
      const response = await fetch('/api/generate-dialogue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, country, level }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur API');
      }

      const dialogue = await response.json();

      const newConversation: Conversation = {
        id: `ai_${Date.now()}`,
        title: dialogue.title || topic,
        country,
        level,
        lines: dialogue.lines || [],
      };

      onGenerate(newConversation);
      setTopic('');
      
      notify.dismiss(toastId);
      notify.success('✅ Dialogue généré avec succès !');

    } catch (error) {
      notify.dismiss(toastId);
      notify.error(handleError(error));
    } finally {
      setGenerating(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-6 text-center">
        ✨ Générer un dialogue avec l'IA
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-slate-400 mb-2">
            Thème du dialogue
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Ex: Commander au restaurant, Acheter des vêtements..."
            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:border-blue-500 focus:outline-none"
          />
          <p className="text-xs text-slate-500 mt-2">
            💡 Sois spécifique pour de meilleurs résultats
          </p>
        </div>

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
              <option value="A1">A1 - Débutant</option>
              <option value="A2">A2 - Élémentaire</option>
              <option value="B1">B1 - Intermédiaire</option>
              <option value="B2">B2 - Avancé</option>
            </select>
          </div>
        </div>

        <Button
          variant="primary"
          onClick={handleGenerate}
          disabled={generating || !topic.trim()}
          loading={generating}
          className="w-full"
        >
          ✨ Générer avec l'IA
        </Button>

        <Card variant="primary" className="text-sm">
          <p className="font-semibold mb-2">💡 Exemples de thèmes :</p>
          <ul className="space-y-1 text-slate-300">
            <li>• Commander au café</li>
            <li>• Demander son chemin</li>
            <li>• Réserver un hôtel</li>
            <li>• Faire les courses au marché</li>
            <li>• Chez le médecin</li>
          </ul>
        </Card>
      </div>
    </Card>
  );
}
