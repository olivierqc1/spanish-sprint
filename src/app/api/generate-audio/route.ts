// Fichier : src/app/api/generate-audio/route.ts
// Cette API génère des MP3 GRATUITS avec Edge-TTS

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Configuration Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Voix disponibles par pays
const VOICES: Record<string, { homme: string; femme: string }> = {
  "Espagne": {
    homme: "es-ES-AlvaroNeural",
    femme: "es-ES-ElviraNeural"
  },
  "Mexique": {
    homme: "es-MX-JorgeNeural",
    femme: "es-MX-DaliaNeural"
  },
  "Argentine": {
    homme: "es-AR-TomasNeural",
    femme: "es-AR-ElenaNeural"
  },
  "Colombie": {
    homme: "es-CO-GonzaloNeural",
    femme: "es-CO-SalomeNeural"
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, country, gender, filename } = body;

    // Validation
    if (!text || !country || !gender || !filename) {
      return NextResponse.json(
        { error: 'Paramètres manquants' },
        { status: 400 }
      );
    }

    // Sélectionner la voix
    const voice = VOICES[country]?.[gender];
    if (!voice) {
      return NextResponse.json(
        { error: 'Voix non trouvée' },
        { status: 400 }
      );
    }

    // Générer l'audio avec Edge-TTS via commande
    // Note : Cette approche nécessite edge-tts installé sur le serveur
    // Pour Vercel/déploiement cloud, on utilisera une alternative
    
    // ALTERNATIVE GRATUITE : Utiliser Google Cloud TTS (gratuit jusqu'à 1M caractères/mois)
    // Ou bien : utiliser une API tierce gratuite comme ttsmaker.com API
    
    // Pour l'instant, on va créer une solution qui fonctionne localement
    // et on ajoutera le déploiement après

    const response = await generateWithEdgeTTS(text, voice);
    
    if (!response) {
      throw new Error('Échec de génération audio');
    }

    // Upload sur Supabase
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('audios')
      .upload(filename, response, {
        contentType: 'audio/mpeg',
        upsert: true
      });

    if (uploadError) {
      throw uploadError;
    }

    // Récupérer l'URL publique
    const { data: { publicUrl } } = supabase.storage
      .from('audios')
      .getPublicUrl(filename);

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename
    });

  } catch (error: any) {
    console.error('Erreur génération audio:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// Fonction pour générer l'audio avec Edge-TTS
async function generateWithEdgeTTS(text: string, voice: string): Promise<Buffer | null> {
  try {
    // Utiliser l'API Web Speech de Microsoft Edge (gratuit)
    // Via fetch vers un service edge-tts-proxy ou directement
    
    // Option 1 : Utiliser un service proxy gratuit
    const response = await fetch('https://edge-tts-proxy.vercel.app/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voice })
    });

    if (!response.ok) {
      throw new Error('Échec de génération TTS');
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);

  } catch (error) {
    console.error('Erreur Edge-TTS:', error);
    
    // Option 2 (fallback) : Utiliser une autre API gratuite
    return await generateWithFallbackAPI(text, voice);
  }
}

// API alternative gratuite (fallback)
async function generateWithFallbackAPI(text: string, voice: string): Promise<Buffer | null> {
  try {
    // Utiliser TTSMaker API (gratuit, 10k caractères/semaine)
    // Ou bien voicerss.org (gratuit avec limite)
    
    // Pour l'instant, retourner null pour forcer l'utilisateur à installer localement
    // ou utiliser une solution cloud
    
    console.log('Fallback API appelée pour:', { text, voice });
    return null;
    
  } catch (error) {
    console.error('Erreur Fallback API:', error);
    return null;
  }
}

// GET endpoint pour tester
export async function GET() {
  return NextResponse.json({
    status: 'online',
    message: 'API de génération audio active',
    voices: VOICES
  });
}
