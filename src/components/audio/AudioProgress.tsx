// src/components/audio/AudioProgress.tsx
import { GenerationProgress } from '@/types/audio';
import { Card } from '@/components/ui/Card';

interface AudioProgressProps {
  progress: GenerationProgress;
}

export function AudioProgress({ progress }: AudioProgressProps) {
  const percentage = progress.total > 0 
    ? (progress.current / progress.total) * 100 
    : 0;

  return (
    <Card variant="primary">
      <h3 className="text-lg font-semibold mb-3">Génération en cours...</h3>
      
      <p className="text-2xl text-blue-400 font-bold mb-2">
        {progress.current} / {progress.total}
      </p>
      
      <p className="text-sm text-slate-400 mb-4">{progress.status}</p>
      
      <div className="w-full h-5 bg-slate-900 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </Card>
  );
}
