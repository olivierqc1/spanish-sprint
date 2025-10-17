// src/app/audio-pro/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { supabase, uploadAudio } from '@/lib/supabase';
import { notify, handleError } from '@/lib/notifications';
import { Conversation, AudioResult, GenerationProgress, VoiceConfig } from '@/types/audio';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ConversationCard } from '@/components/audio/ConversationCard';
import { ConversationForm } from '@/components/audio/ConversationForm';
import { AudioProgress } from '@/components/audio/AudioProgress';
import { Toaster } from 'react-hot-toast';

const GOOGLE_VOICES: Record<string, Record<string, VoiceConfig[]>> = {
  "Espagne": {
    homme: [
      { name: "es-ES-Standard-B", quality: "Standard", flag: "🇪🇸" },
      { name: "es-ES-Neural2-B", quality: "Neural", flag: "🇪🇸" },
      { name: "es-ES-Wavenet-B", quality: "WaveNet", flag: "🇪🇸" },
    ],
    femme: [
      { name: "es-ES-Standard-A", quality: "Standard", flag: "🇪🇸" },
      { name: "es-ES-Neural2-A", quality: "Neural", flag: "🇪🇸" },
      { name: "es-ES-Wavenet-A", quality: "WaveNet", flag: "🇪🇸" },
    ]
  },
  "Mexique": {
    homme: [
      { name: "es-US-Standard-B", quality: "Standard", flag: "🇲🇽" },
      { name: "es-US-Neural2-B", quality: "Neural", flag: "🇲🇽" },
    ],
    femme: [
      { name: "es-US-Standard-A", quality: "Standard", flag: "🇲🇽" },
      { name: "es-US-Neural2-A", quality: "Neural", flag: "🇲🇽" },
    ]
  },
};

type Tab = 'setup' | 'list' | 'ai' | 'manual' | 'generate';

export default function AudioManagerPro() {
  const [activeTab, setActiveTab] = useState<Tab>('setup');
  const [setupStep, setSetupStep] = useState(1);
  const [apiKey, setApiKey] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "demo_es_cafe",
      title: "Au café (Demo)",
      country: "Espagne",
      level: "A1",
      lines: [
        { text: "Hola, ¿cómo estás?", speaker: "Carlos", gender: "homme" },
        { text: "Muy bien, gracias.", speaker: "María", gender: "femme" },
      ]
    }
  ]);

  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState<GenerationProgress>({ 
    current: 0, 
    total: 0, 
    status: '' 
  });
  const [results, setResults] = useState<AudioResult[]>([]);

  useEffect(() => {
    const savedKey = localStorage.getItem('google_cloud_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setIsConfigured(true);
      setActiveTab('list');
    }
  }, []);

  const saveApiKey = () => {
    if (!apiKey.trim()) {
      notify.error('⚠️ Entre ta clé API Google Cloud');
      return;
    }
    
    localStorage.setItem('google_cloud_api_key', apiKey);
    setIsConfigured(true);
    setActiveTab('list');
    notify.success('✅ Configuration sauvegardée !');
  };

  const generateWithGoogleTTS = async (
    text: string, 
    country: string, 
    gender: string
  ): Promise<Blob | null> => {
    try {
      const voice = GOOGLE_VOICES[country]?.[gender]?.[1]; // Neural voice
      
      if (!voice) {
        throw new Error('Voix non trouvée');
      }

      const response = await fetch(
        `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input: { text },
            voice: {
              languageCode: voice.name.split('-').slice(0, 2).join('-'),
              name: voice.name
            },
            audioConfig: {
              audioEncoding: 'MP3',
              speakingRate: 0.9,
              pitch: 0
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error('Erreur Google Cloud TTS');
      }

      const data = await response.json();
      const audioContent = data.audioContent;
      const byteCharacters = atob(audioContent);
      const byteNumbers = new Array(byteCharacters.length);
      
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      
      const byteArray = new Uint8Array(byteNumbers);
      return new Blob([byteArray], { type: 'audio/mpeg' });

    } catch (error) {
      console.error('Erreur génération:', error);
      notify.error(handleError(error));
      return null;
    }
  };

  const generateAudios = async (conv: Conversation) => {
    if (!apiKey) {
      notify.error('⚠️ Configure d\'abord ta clé API Google Cloud');
      setActiveTab('setup');
      return;
    }

    setGenerating(true);
    setResults([]);
    setProgress({ current: 0, total: conv.lines.length, status: 'Démarrage...' });

    const toastId = notify.loading('Génération en cours...');
    const generatedResults: AudioResult[] = [];

    try {
      for (let i = 0; i < conv.lines.length; i++) {
        const line = conv.lines[i];
        const filename = `${conv.id}_${i + 1}.mp3`;
        
        setProgress({
          current: i + 1,
          total: conv.lines.length,
          status: `Génération ${i + 1}/${conv.lines.length}: "${line.text.substring(0, 30)}..."`
        });

        const audioBlob = await generateWithGoogleTTS(line.text, conv.country, line.gender);
        
        if (audioBlob) {
          const url = await uploadAudio(audioBlob, filename);
          
          generatedResults.push({
            text: line.text,
            speaker: line.speaker,
            filename,
            url,
            status: 'success'
          });
        } else {
          generatedResults.push({
            text: line.text,
            speaker: line.speaker,
            filename,
            status: 'failed'
          });
        }
      }

      setResults(generatedResults);
      const successCount = generatedResults.filter(r => r.status === 'success').length;
      
      notify.dismiss(toastId);
      notify.success(`✅ ${successCount}/${conv.lines.length} audios générés !`);
      
    } catch (error) {
      notify.dismiss(toastId);
      notify.error(handleError(error));
    } finally {
      setGenerating(false);
    }
  };

  const downloadResults = () => {
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `audios_pro_${Date.now()}.json`;
    link.click();
  };

  const addConversation = (conversation: Conversation) => {
    setConversations([...conversations, conversation]);
    setActiveTab('list');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-5">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">🎙️ Audio Manager PRO</h1>
          <p className="text-slate-400">
            Google Cloud TTS • Générateur AI • Qualité professionnelle
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-slate-800 pb-2 overflow-x-auto">
          {!isConfigured && (
            <Button
              variant={activeTab === 'setup' ? 'primary' : 'ghost'}
              onClick={() => setActiveTab('setup')}
            >
              ⚙️ Configuration
            </Button>
          )}
          {isConfigured && (
            <>
              <Button
                variant={activeTab === 'list' ? 'primary' : 'ghost'}
                onClick={() => setActiveTab('list')}
              >
                📋 Conversations ({conversations.length})
              </Button>
              <Button
                variant={activeTab === 'manual' ? 'primary' : 'ghost'}
                onClick={() => setActiveTab('manual')}
              >
                ✍️ Ajouter
              </Button>
              <Button
                variant={activeTab === 'generate' ? 'primary' : 'ghost'}
                onClick={() => setActiveTab('generate')}
              >
                🚀 Générer
              </Button>
            </>
          )}
        </div>

        {/* Content */}
        {activeTab === 'setup' && (
          <Card className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">
              ⚙️ Configuration Google Cloud TTS
            </h2>
            
            {setupStep === 3 && (
              <div className="space-y-6">
                <Card variant="primary">
                  <h3 className="font-semibold mb-3">📝 Créer une clé API</h3>
                  <ol className="space-y-2 text-sm">
                    <li>1. Va dans "APIs & Services" → "Credentials"</li>
                    <li>2. Clique sur "CREATE CREDENTIALS" → "API Key"</li>
                    <li>3. Copie la clé (commence par AIza...)</li>
                  </ol>
                </Card>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Ta clé API Google Cloud :
                  </label>
                  <input
                    type="text"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full px-4 py-3 bg-blue-950 border border-blue-700 rounded-lg text-slate-100 font-mono focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="secondary"
                    onClick={() => setSetupStep(2)}
                    className="flex-1"
                  >
                    ← Retour
                  </Button>
                  <Button
                    variant="primary"
                    onClick={saveApiKey}
                    className="flex-[2]"
                  >
                    💾 Sauvegarder
                  </Button>
                </div>
              </div>
            )}
            
            {setupStep < 3 && (
              <div className="text-center py-8">
                <Button onClick={() => setSetupStep(3)}>
                  Passer aux étapes précédentes →
                </Button>
              </div>
            )}
          </Card>
        )}

        {activeTab === 'list' && isConfigured && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {conversations.map(conv => (
              <ConversationCard
                key={conv.id}
                conversation={conv}
                flag={GOOGLE_VOICES[conv.country]?.homme[0]?.flag}
              />
            ))}
          </div>
        )}

        {activeTab === 'manual' && isConfigured && (
          <div className="max-w-3xl mx-auto">
            <ConversationForm
              onSave={addConversation}
              countries={Object.keys(GOOGLE_VOICES)}
            />
          </div>
        )}

        {activeTab === 'generate' && isConfigured && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">🚀 Générer les audios</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {conversations.map(conv => (
                <Card key={conv.id}>
                  <div className="mb-4">
                    <span className="text-3xl">
                      {GOOGLE_VOICES[conv.country]?.homme[0]?.flag}
                    </span>
                    <h3 className="text-lg font-semibold mt-2">{conv.title}</h3>
                    <p className="text-sm text-slate-400">
                      {conv.lines.length} répliques • {conv.level}
                    </p>
                  </div>
                  <Button
                    variant="primary"
                    onClick={() => generateAudios(conv)}
                    disabled={generating}
                    loading={generating}
                    className="w-full"
                  >
                    🎙️ Générer
                  </Button>
                </Card>
              ))}
            </div>

            {generating && <AudioProgress progress={progress} />}

            {results.length > 0 && (
              <Card>
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-xl font-bold">
                    ✅ Résultats ({results.filter(r => r.status === 'success').length}/{results.length})
                  </h3>
                  <Button onClick={downloadResults} size="sm">
                    📥 Télécharger JSON
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {results.map((result, idx) => (
                    <Card
                      key={idx}
                      variant={result.status === 'success' ? 'success' : 'danger'}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <strong>{result.speaker}</strong>
                          <p className="text-sm text-slate-300 mt-1">{result.text}</p>
                          <small className="text-xs text-slate-500">{result.filename}</small>
                        </div>
                        {result.status === 'success' && result.url && (
                          <div className="flex gap-2">
                            <audio controls src={result.url} className="h-10" />
                            
                              href={result.url}
                              download
                              className="px-3 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              📥
                            </a>
                          </div>
                        )}
                        {result.status === 'failed' && (
                          <span className="text-red-400">❌ Échec</span>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
                    }
