"use client";
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Flag } from '@/components/ui/Flag';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

// Types
interface ConversationLine {
  speaker: string;
  gender: 'homme' | 'femme';
  text: string;
}

interface Conversation {
  id: string;
  country: string;
  level: string;
  title: string;
  lines: ConversationLine[];
}

interface AudioResult {
  text: string;
  speaker: string;
  audio: { success: boolean };
}

// Données des conversations
const CONVERSATIONS: Conversation[] = [
  {
    id: "conv_es_a1_cafe",
    country: "Espagne",
    level: "A1",
    title: "Au café",
    lines: [
      { speaker: "Carlos", gender: "homme", text: "Hola María, ¿cómo estás?" },
      { speaker: "María", gender: "femme", text: "Muy bien, gracias. ¿Y tú?" },
      { speaker: "Carlos", gender: "homme", text: "Bien también. ¿Qué vas a tomar?" },
      { speaker: "María", gender: "femme", text: "Un café con leche y un croissant, por favor." },
      { speaker: "Carlos", gender: "homme", text: "Para mí, un zumo de naranja." },
    ]
  },
  {
    id: "conv_mx_a1_mercado",
    country: "Mexique",
    level: "A1",
    title: "Au marché",
    lines: [
      { speaker: "Cliente", gender: "homme", text: "Buenos días. ¿Cuánto cuestan los aguacates?" },
      { speaker: "Vendedor", gender: "homme", text: "Treinta pesos el kilo, güerito." },
      { speaker: "Cliente", gender: "homme", text: "Dame dos kilos, por favor. ¿Y los mangos?" },
      { speaker: "Vendedor", gender: "homme", text: "Los mangos están a veinte pesos el kilo." },
      { speaker: "Cliente", gender: "homme", text: "Perfecto, un kilo de mangos también." },
    ]
  },
  {
    id: "conv_es_a2_hotel",
    country: "Espagne",
    level: "A2",
    title: "Réservation d'hôtel",
    lines: [
      { speaker: "Recepcionista", gender: "femme", text: "Hotel Sol y Mar, buenas tardes." },
      { speaker: "Cliente", gender: "homme", text: "Buenas tardes. Quería reservar una habitación para el fin de semana." },
      { speaker: "Recepcionista", gender: "femme", text: "Perfecto. ¿Para cuántas personas?" },
      { speaker: "Cliente", gender: "homme", text: "Para dos personas. Una habitación doble con vistas al mar, si es posible." },
    ]
  },
];

export default function AudioGenerator() {
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [results, setResults] = useState<AudioResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const generateAudios = async (conversation: Conversation) => {
    setGenerating(true);
    setError(null);
    setResults([]);
    setProgress({ current: 0, total: conversation.lines.length });

    try {
      const generatedFiles: AudioResult[] = [];

      for (let i = 0; i < conversation.lines.length; i++) {
        const line = conversation.lines[i];
        setProgress({ current: i + 1, total: conversation.lines.length });

        const audio = await generateAudioSimple(line.text, conversation.country, line.gender);
        
        generatedFiles.push({
          text: line.text,
          speaker: line.speaker,
          audio: audio
        });
      }

      setResults(generatedFiles);
      alert(`✅ ${generatedFiles.length} audios générés avec succès !`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
      alert(`❌ Erreur : ${errorMessage}`);
    } finally {
      setGenerating(false);
    }
  };

  const generateAudioSimple = async (text: string, country: string, gender: string) => {
    return new Promise<{ success: boolean }>((resolve, reject) => {
      if (!('speechSynthesis' in window)) {
        reject(new Error('Votre navigateur ne supporte pas la synthèse vocale'));
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      
      const voices = window.speechSynthesis.getVoices();
      const spanishVoice = voices.find(v => v.lang.startsWith('es'));
      if (spanishVoice) utterance.voice = spanishVoice;
      
      utterance.lang = 'es-ES';
      utterance.rate = 0.9;
      utterance.pitch = gender === 'femme' ? 1.2 : 0.9;

      utterance.onend = () => resolve({ success: true });
      utterance.onerror = (err) => reject(err);

      window.speechSynthesis.speak(utterance);
    });
  };

  const downloadAllResults = () => {
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `results_${selectedConv?.id}.json`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-5 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              🎙️ Générateur d'Audios
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Synthèse vocale pour vos conversations en espagnol
            </p>
          </div>
          <ThemeToggle />
        </div>

        {/* Sélection de conversation */}
        <Card className="mb-8">
          <h2 className="text-xl font-bold mb-4">1️⃣ Choisir une conversation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CONVERSATIONS.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConv(conv)}
                className={`
                  text-left p-5 rounded-xl border-2 transition-all
                  ${selectedConv?.id === conv.id 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30' 
                    : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700'
                  }
                `}
              >
                <div className="flex justify-between items-start mb-3">
                  <Flag country={conv.country} size="lg" />
                  <Badge variant="primary">{conv.level}</Badge>
                </div>
                <h3 className="font-semibold mb-2">{conv.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {conv.country} • {conv.lines.length} répliques
                </p>
              </button>
            ))}
          </div>
        </Card>

        {/* Aperçu de la conversation */}
        {selectedConv && (
          <Card className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                2️⃣ Aperçu : {selectedConv.title}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedConv(null)}
              >
                ✕
              </Button>
            </div>

            <div className="space-y-3 mb-6">
              {selectedConv.lines.map((line, idx) => (
                <Card key={idx} variant="primary" className="text-sm">
                  <div className="flex justify-between items-start mb-2">
                    <strong className="text-blue-600 dark:text-blue-400">{line.speaker}</strong>
                    <Badge variant="default">
                      {line.gender === 'homme' ? '♂️' : '♀️'}
                    </Badge>
                  </div>
                  <p className="text-slate-700 dark:text-slate-200">{line.text}</p>
                </Card>
              ))}
            </div>

            <Button
              onClick={() => generateAudios(selectedConv)}
              disabled={generating}
              loading={generating}
              className="w-full"
              size="lg"
            >
              {generating 
                ? `⏳ Génération... ${progress.current}/${progress.total}` 
                : `🚀 Générer les audios (${selectedConv.lines.length} fichiers)`
              }
            </Button>
          </Card>
        )}

        {/* Barre de progression */}
        {generating && (
          <Card variant="primary" className="mb-8">
            <h3 className="text-lg font-semibold mb-3">⏳ Génération en cours...</h3>
            <p className="text-2xl text-blue-400 font-bold mb-2">
              {progress.current} / {progress.total}
            </p>
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${(progress.current / progress.total) * 100}%` }}
              />
            </div>
          </Card>
        )}

        {/* Erreur */}
        {error && (
          <Card variant="danger" className="mb-8">
            <strong className="block mb-2">❌ Erreur :</strong>
            <p>{error}</p>
          </Card>
        )}

        {/* Résultats */}
        {results.length > 0 && (
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                3️⃣ Résultats ({results.length} audios)
              </h2>
              <Button onClick={downloadAllResults} variant="secondary">
                📥 Télécharger JSON
              </Button>
            </div>

            <div className="space-y-3">
              {results.map((result, idx) => (
                <Card key={idx} variant="success">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <strong className="block mb-1">{result.speaker}</strong>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{result.text}</p>
                    </div>
                    <span className="text-2xl ml-4">✅</span>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        )}

        {/* Guide */}
        <Card variant="primary" className="mt-8">
          <h2 className="text-xl font-bold mb-4">💡 Comment ça marche ?</h2>
          <ol className="space-y-2 text-slate-300">
            <li><strong>1.</strong> Choisir une conversation</li>
            <li><strong>2.</strong> Vérifier l'aperçu</li>
            <li><strong>3.</strong> Cliquer sur "Générer"</li>
            <li><strong>4.</strong> Attendre la synthèse vocale</li>
            <li><strong>5.</strong> Télécharger les résultats</li>
          </ol>
        </Card>
      </div>
    </div>
  );
              }
