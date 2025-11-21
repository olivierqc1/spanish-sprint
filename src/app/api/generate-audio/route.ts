// src/app/api/generate-audio/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Voix Google Cloud par pays et genre
const GOOGLE_VOICES: Record<string, { homme: string; femme: string }> = {
  "Espagne": {
    homme: "es-ES-Neural2-B",      // Voix masculine espagnole
    femme: "es-ES-Neural2-A"       // Voix féminine espagnole
  },
  "Mexique": {
    homme: "es-US-Neural2-B",      // Voix masculine latino-américaine
    femme: "es-US-Neural2-A"       // Voix féminine latino-américaine
  },
  "Argentine": {
    homme: "es-US-Neural2-C",      // Alternative voix masculine
    femme: "es-US-Neural2-A"
  },
  "Colombie": {
    homme: "es-US-Neural2-B",
    femme: "es-US-Neural2-A"
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, country, gender, filename } = body;

    // Validation
    if (!text || !country || !filename) {
      return NextResponse.json(
        { error: 'Paramètres manquants: text, country, filename requis' },
        { status: 400 }
      );
    }

    if (!process.env.GOOGLE_CLOUD_TTS_API_KEY) {
      return NextResponse.json(
        { error: 'GOOGLE_CLOUD_TTS_API_KEY non configurée' },
        { status: 500 }
      );
    }

    // Sélectionner la voix
    const genderKey = (gender || 'homme') as 'homme' | 'femme';
    const voiceName = GOOGLE_VOICES[country]?.[genderKey] || 'es-ES-Neural2-A';
    const languageCode = voiceName.substring(0, 5); // ex: "es-ES"

    console.log(`Génération audio: ${text.substring(0, 50)}... avec ${voiceName}`);

    // Appeler Google Cloud Text-to-Speech API
    const ttsResponse = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.GOOGLE_CLOUD_TTS_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: { text },
          voice: {
            languageCode: languageCode,
            name: voiceName
          },
          audioConfig: {
            audioEncoding: 'MP3',
            speakingRate: 0.95,    // Légèrement plus lent pour l'apprentissage
            pitch: 0.0,
            volumeGainDb: 0.0
          }
        })
      }
    );

    if (!ttsResponse.ok) {
      const errorText = await ttsResponse.text();
      console.error('Erreur Google TTS:', errorText);
      throw new Error(`Google TTS API error: ${ttsResponse.status} - ${errorText}`);
    }

    const ttsData = await ttsResponse.json();
    
    if (!ttsData.audioContent) {
      throw new Error('Pas de contenu audio dans la réponse Google TTS');
    }

    // Convertir base64 en buffer
    const audioBuffer = Buffer.from(ttsData.audioContent, 'base64');

    console.log(`Audio généré: ${audioBuffer.length} bytes`);

    // Upload sur Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('audios')
      .upload(filename, audioBuffer, {
        contentType: 'audio/mpeg',
        upsert: true,
        cacheControl: '3600'
      });

    if (uploadError) {
      console.error('Erreur upload Supabase:', uploadError);
      throw new Error(`Erreur Supabase: ${uploadError.message}`);
    }

    // Récupérer l'URL publique
    const { data: { publicUrl } } = supabase.storage
      .from('audios')
      .getPublicUrl(filename);

    console.log(`✓ Audio uploadé: ${publicUrl}`);

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      voice: voiceName,
      size: audioBuffer.length
    });

  } catch (error: any) {
    console.error('Erreur génération audio:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Erreur serveur',
        details: error.toString()
      },
      { status: 500 }
    );
  }
}

// GET pour tester que l'API fonctionne
export async function GET() {
  return NextResponse.json({
    status: 'online',
    service: 'Google Cloud Text-to-Speech',
    voices: GOOGLE_VOICES,
    limits: '1 million caractères/mois gratuit',
    configured: !!process.env.GOOGLE_CLOUD_TTS_API_KEY
  });
}