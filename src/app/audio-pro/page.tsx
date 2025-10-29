'use client';
import { useState, useEffect } from 'react';
import { uploadAudio } from '@/lib/supabase';
import { notify, handleError } from '@/lib/notifications';
import { apiKeySchema } from '@/lib/validations';
import { useConversations } from '@/hooks/useConversations';
import { Conversation, AudioResult, GenerationProgress, VoiceConfig } from '@/types/audio';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ConversationCard } from '@/components/audio/ConversationCard';
import { ConversationForm } from '@/components/audio/ConversationForm';
import { AIDialogueGenerator } from '@/components/audio/AIDialogueGenerator';
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
      { name: "es-US-Wavenet-B", quality: "WaveNet", flag: "🇲🇽" },
    ],
    femme: [
      { name: "es-US-Standard-A", quality: "Standard", flag: "🇲🇽" },
      { name: "es-US-Neural2-A", quality: "Neural", flag: "🇲🇽" },
      { name: "es-US-Wavenet-A", quality: "WaveNet", flag: "🇲🇽" },
    ]
  },
  "Argentine": {
    homme: [{ name: "es-ES-Neural2-B", quality: "Neural", flag: "🇦🇷" }],
    femme: [{ name: "es-ES-Neural2-A", quality: "Neural", flag: "🇦🇷" }]
  },
  "Colombie": {
    homme: [{ name: "es-US-Neural2-B", quality: "Neural", flag: "🇨🇴" }],
    femme: [{ name: "es-US-Neural2-A", quality: "Neural", flag: "🇨🇴" }]
  }
};

type Tab = 'setup' | 'list' | 'ai' | 'manual' | 'generate';

export default function AudioManagerPro() {
  const [activeTab, setActiveTab] = useState<Tab>('setup');
  const [setupStep, setSetupStep] = useState(1);
  const [apiKey, setApiKey] = useState('');
  const [apiKeyError, setApiKeyError] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  
  const { conversations, addConversation, removeConversation } = useConversations();
  
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState<GenerationProgress>({ 
    current: 0, 
    total: 0, 
    status: '' 
  });
  const [results, setResults] = useState<AudioResult[]>([]);
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);

  useEffect(() => {
    const savedKey = localStorage.getItem('google_cloud_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setIsConfigured(true);
      setActiveTab('list');
    }
  }, []);

  const validateAndSaveApiKey = () => {
    setApiKeyError('');
    
    try {
      apiKeySchema.parse(apiKey);
      localStorage.setItem('google_cloud_api_key', apiKey);
      setIsConfigured(true);
      setActiveTab('list');
      notify.success('✅ Configuration sauvegardée !');
    } catch (error: any) {
      const errorMessage = error.errors?.[0]?.message || 'Clé API invalide';
      setApiKeyError(errorMessage);
      notify.error(errorMessage);
    }
  };

  const resetApiKey = () => {
    if (confirm('⚠️ Êtes-vous sûr de vouloir supprimer la clé API ?')) {
      localStorage.removeItem('google_cloud_api_key');
      setApiKey('');
      setIsConfigured(false);
      setActiveTab('setup');
      notify.success('Clé API supprimée');
    }
  };

  const generateWithGoogleTTS = async (
    text: string, 
    country: string, 
    gender: string
  ): Promise<Blob | null> => {
    try {
      const voiceOptions = GOOGLE_VOICES[country]?.[gender];
      
      if (!voiceOptions || voiceOptions.length === 0) {
        throw new Error(`Voix non disponible pour ${country} (${gender})`);
      }

      const voice = voiceOptions[1] || voiceOptions[0];

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
              pitch: 0,
              volumeGainDb: 0
            }
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error?.message || `Erreur Google TTS: ${response.status}`
        );
      }

      const data = await response.json();
      
      if (!data.audioContent) {
        throw new Error('Pas de contenu audio dans la réponse');
      }

      const audioContent = data.audioContent;
      const byteCharacters = atob(audioContent);
      const byteNumbers = new Array(byteCharacters.length);
      
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      
      const byteArray = new Uint8Array(byteNumbers);
      return new Blob([byteArray], { type: 'audio/mpeg' });

    } catch (error) {
      console.error('Erreur génération TTS:', error);
      throw error;
    }
  };

  const generateAudios = async (conv: Conversation) => {
    if (!apiKey) {
      notify.error('⚠️ Configure d\'abord ta clé API Google Cloud');
      setActiveTab('setup');
      return;
    }

    if (!conv.lines || conv.lines.length === 0) {
      notify.error('⚠️ Aucune réplique à générer');
      return;
    }

    setGenerating(true);
    setResults([]);
    setProgress({ current: 0, total: conv.lines.length, status: 'Démarrage...' });

    const toastId = notify.loading('Génération en cours...');
    const generatedResults: AudioResult[] = [];
    let successCount = 0;

    try {
      for (let i = 0; i < conv.lines.length; i++) {
        const line = conv.lines[i];
        const filename = `${conv.id}_${String(i + 1).padStart(2, '0')}.mp3`;
        
        setProgress({
          current: i + 1,
          total: conv.lines.length,
          status: `Génération ${i + 1}/${conv.lines.length}: "${line.text.substring(0, 40)}..."`
        });

        try {
          const audioBlob = await generateWithGoogleTTS(
            line.text, 
            conv.country, 
            line.gender
          );
          
          if (!audioBlob) {
            throw new Error('Échec de génération audio');
          }

          const url = await uploadAudio(audioBlob, filename);
          
          generatedResults.push({
            text: line.text,
            speaker: line.speaker,
            filename,
            url,
            status: 'success'
          });
          
          successCount++;

        } catch (error) {
          console.error(`Erreur ligne ${i + 1}:`, error);
          generatedResults.push({
            text: line.text,
            speaker: line.speaker,
            filename,
            status: 'failed'
          });
        }
      }

      setResults(generatedResults);
      notify.dismiss(toastId);
      
      if (successCount === conv.lines.length) {
        notify.success(`✅ ${successCount} audios générés avec succès !`);
      } else if (successCount > 0) {
        notify.error(`⚠️ ${successCount}/${conv.lines.length} audios générés (certains ont échoué)`);
      } else {
        notify.error('❌ Échec complet de la génération');
      }
      
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
    link.download = `audios_${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getCountryFlag = (country: string): string => {
    return GOOGLE_VOICES[country]?.homme?.[0]?.flag || '🌍';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-5">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">
            🎙️ Audio Manager PRO
          </h1>
          <p className="text-slate-400">
            Google Cloud TTS • Générateur AI
          </p>
        </div>

        <div className="flex gap-2 mb-8">
          {!isConfigured ? (
            <Button
              variant={activeTab === 'setup' ? 'primary' : 'ghost'}
              onClick={() => setActiveTab('setup')}
            >
              ⚙️ Configuration
            </Button>
          ) : (
            <>
              <Button
                variant={activeTab === 'list' ? 'primary' : 'ghost'}
                onClick={() => setActiveTab('list')}
              >
                📋 Conversations ({conversations.length})
              </Button>
              <Button
                variant={activeTab === 'ai' ? 'primary' : 'ghost'}
                onClick={() => setActiveTab('ai')}
              >
                ✨ AI
              </Button>
              <Button
                variant={activeTab === 'manual' ? 'primary' : 'ghost'}
                onClick={() => setActiveTab('manual')}
              >
                ✍️ Manuel
              </Button>
              <Button
                variant={activeTab === 'generate' ? 'primary' : 'ghost'}
                onClick={() => setActiveTab('generate')}
              >
                🚀 Générer
              </Button>
              <Button
                variant="ghost"
                onClick={resetApiKey}
              >
                🔓 Changer clé
              </Button>
            </>
          )}
        </div>

        {activeTab === 'setup' && (
          <Card>
            <h2 className="text-2xl font-bold mb-6">Configuration</h2>
            
            {setupStep === 1 && (
              <div className="space-y-6">
                <Card variant="primary">
                  <h3 className="font-semibold mb-3">Étape 1/3</h3>
                  <ol className="space-y-2 text-sm">
                    <li>1. Va sur console.cloud.google.com</li>
                    <li>2. Connecte-toi</li>
                    <li>3. Accepte les conditions</li>
                  </ol>
                </Card>
                <Button onClick={() => setSetupStep(2)} className="w-full">
                  Suivant
                </Button>
              </div>
            )}

            {setupStep === 2 && (
              <div className="space-y-6">
                <Card variant="primary">
                  <h3 className="font-semibold mb-3">Étape 2/3</h3>
                  <ol className="space-y-2 text-sm">
                    <li>1. Cherche "Text-to-Speech API"</li>
                    <li>2. Clique sur "ACTIVER"</li>
                    <li>3. Attends 30 secondes</li>
                  </ol>
                </Card>
                <div className="flex gap-3">
                  <Button variant="secondary" onClick={() => setSetupStep(1)}>
                    Retour
                  </Button>
                  <Button onClick={() => setSetupStep(3)}>
                    Suivant
                  </Button>
                </div>
              </div>
            )}

            {setupStep === 3 && (
              <div className="space-y-6">
                <Card variant="primary">
                  <h3 className="font-semibold mb-3">Étape 3/3</h3>
                  <ol className="space-y-2 text-sm">
                    <li>1. Va dans "Credentials"</li>
                    <li>2. "CREATE CREDENTIALS" → "API Key"</li>
                    <li>3. Copie la clé</li>
                  </ol>
                </Card>

                <div>
                  <label className="block text-sm mb-2">Ta clé API :</label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => {
                      setApiKey(e.target.value);
                      setApiKeyError('');
                    }}
                    placeholder="AIzaSy..."
                    className="w-full px-4 py-3 bg-blue-950 border border-blue-700 rounded-lg"
                  />
                  {apiKeyError && (
                    <p className="text-red-400 text-sm mt-2">{apiKeyError}</p>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button variant="secondary" onClick={() => setSetupStep(2)}>
                    Retour
                  </Button>
                  <Button onClick={validateAndSaveApiKey} disabled={!apiKey.trim()}>
                    Sauvegarder
                  </Button>
                </div>
              </div>
            )}
          </Card>
        )}

        {activeTab === 'list' && isConfigured && (
          <div>
            {conversations.length === 0 ? (
              <Card className="text-center py-12">
                <p className="mb-4">Aucune conversation</p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={() => setActiveTab('ai')}>
                    ✨ Générer avec IA
                  </Button>
                  <Button variant="secondary" onClick={() => setActiveTab('manual')}>
                    ✍️ Ajouter
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {conversations.map(conv => (
                  <ConversationCard
                    key={conv.id}
                    conversation={conv}
                    flag={getCountryFlag(conv.country)}
                    onSelect={setSelectedConv}
                    isSelected={selectedConv?.id === conv.id}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'ai' && isConfigured && (
          <AIDialogueGenerator
            countries={Object.keys(GOOGLE_VOICES)}
            onGenerate={(conv) => {
              addConversation(conv);
              setActiveTab('list');
            }}
          />
        )}

        {activeTab === 'manual' && isConfigured && (
          <ConversationForm 
            onSave={(conv) => {
              addConversation(conv);
              setActiveTab('list');
            }}
            countries={Object.keys(GOOGLE_VOICES)}
          />
        )}

        {activeTab === 'generate' && isConfigured && (
          <div>
            {conversations.length === 0 ? (
              <Card className="text-center py-12">
                <p className="mb-4">Aucune conversation</p>
                <Button onClick={() => setActiveTab('list')}>
                  Retour
                </Button>
              </Card>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {conversations.map(conv => (
                    <Card key={conv.id}>
                      <div className="mb-4">
                        <span className="text-3xl">{getCountryFlag(conv.country)}</span>
                        <h3 className="text-lg font-semibold">{conv.title}</h3>
                        <p className="text-sm text-slate-400">
                          {conv.lines.length} répliques
                        </p>
                      </div>
                      <Button
                        onClick={() => generateAudios(conv)}
                        disabled={generating}
                        loading={generating}
                        className="w-full"
                      >
                        🚀 Générer
                      </Button>
                    </Card>
                  ))}
                </div>

                {generating && <AudioProgress progress={progress} />}

                {results.length > 0 && (
                  <Card>
                    <div className="flex justify-between mb-4">
                      <h3 className="text-xl font-bold">
                        Résultats ({results.filter(r => r.status === 'success').length}/{results.length})
                      </h3>
                      <Button onClick={downloadResults} variant="secondary">
                        📥 Télécharger
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {results.map((result, idx) => (
                        <Card 
                          key={idx} 
                          variant={result.status === 'success' ? 'success' : 'danger'}
                        >
                          <strong>{result.speaker}</strong>
                          <p className="text-sm">{result.text}</p>
                        </Card>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
                    }
