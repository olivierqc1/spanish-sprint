// src/hooks/useGoogleTTS.ts
import { useState, useCallback } from 'react';
import { Conversation, AudioResult, GenerationProgress } from '@/types/audio';
import { uploadAudio } from '@/lib/supabase';
import { notify, handleError } from '@/lib/notifications';
import { GOOGLE_VOICES } from '@/config/voices';

export function useGoogleTTS() {
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState<GenerationProgress>({
    current: 0,
    total: 0,
    status: ''
  });
  const [results, setResults] = useState<AudioResult[]>([]);

  const generateWithGoogleTTS = useCallback(async (
    text: string,
    country: string,
    gender: string,
    apiKey: string
  ): Promise<Blob | null> => {
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

    const byteCharacters = atob(data.audioContent);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: 'audio/mpeg' });
  }, []);

  const generateAudios = useCallback(async (conv: Conversation) => {
    const apiKey = localStorage.getItem('google_cloud_api_key');

    if (!apiKey) {
      notify.error('⚠️ Configure d\'abord ta clé API Google Cloud');
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
            line.gender,
            apiKey
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
        notify.error(
          `⚠️ ${successCount}/${conv.lines.length} audios générés (certains ont échoué)`
        );
      } else {
        notify.error('❌ Échec complet de la génération');
      }
    } catch (error) {
      notify.dismiss(toastId);
      notify.error(handleError(error));
    } finally {
      setGenerating(false);
    }
  }, [generateWithGoogleTTS]);

  const resetResults = useCallback(() => {
    setResults([]);
    setProgress({ current: 0, total: 0, status: '' });
  }, []);

  return {
    generateAudios,
    generating,
    progress,
    results,
    resetResults
  };
}