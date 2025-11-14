// src/components/audio/GenerationPanel.tsx
import React from 'react';
import { Conversation, AudioResult, GenerationProgress } from '@/types/audio';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AudioProgress } from './AudioProgress';

interface GenerationPanelProps {
  conversations: Conversation[];
  generating: boolean;
  progress: GenerationProgress;
  results: AudioResult[];
  onGenerate: (conv: Conversation) => void;
  onNavigateToList: () => void;
  getCountryFlag: (country: string) => string;
}

export const GenerationPanel = React.memo(({
  conversations,
  generating,
  progress,
  results,
  onGenerate,
  onNavigateToList,
  getCountryFlag
}: GenerationPanelProps) => {
  const downloadResults = () => {
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `audios_${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (conversations.length === 0) {
    return (
      <Card className="text-center py-12">
        <p className="text-lg mb-6 text-slate-300">
          Aucune conversation à générer
        </p>
        <Button onClick={onNavigateToList}>
          ← Retour à la liste
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Liste des conversations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {conversations.map(conv => (
          <Card key={conv.id}>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">
                  {getCountryFlag(conv.country)}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{conv.title}</h3>
                  <p className="text-sm text-slate-400">
                    {conv.lines.length} réplique{conv.lines.length > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => onGenerate(conv)}
                disabled={generating}
                loading={generating}
                className="w-full"
              >
                🚀 Générer les audios
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Progress */}
      {generating && <AudioProgress progress={progress} />}

      {/* Résultats */}
      {results.length > 0 && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">
              Résultats ({results.filter(r => r.status === 'success').length}/{results.length})
            </h3>
            <Button onClick={downloadResults} variant="secondary">
              📥 Télécharger JSON
            </Button>
          </div>
          <div className="space-y-2">
            {results.map((result, idx) => (
              <Card
                key={idx}
                variant={result.status === 'success' ? 'success' : 'danger'}
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <strong className="block mb-1">{result.speaker}</strong>
                    <p className="text-sm text-slate-300">{result.text}</p>
                  </div>
                  <span className="text-2xl ml-4">
                    {result.status === 'success' ? '✅' : '❌'}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
});

GenerationPanel.displayName = 'GenerationPanel';