// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { config, validateConfig } from './config';

// Valider au chargement
validateConfig();

export const supabase = createClient(
  config.supabase.url!,
  config.supabase.anonKey!
);

// Fonction pour uploader un audio
export async function uploadAudio(file: File | Blob, filename: string): Promise<string> {
  const { data, error } = await supabase.storage
    .from('audios')
    .upload(filename, file, {
      contentType: 'audio/mpeg',
      upsert: true
    });

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from('audios')
    .getPublicUrl(filename);

  return publicUrl;
}

// Fonction pour obtenir l'URL d'un audio
export function getAudioUrl(filename: string): string {
  const { data: { publicUrl } } = supabase.storage
    .from('audios')
    .getPublicUrl(filename);
  
  return publicUrl;
}
