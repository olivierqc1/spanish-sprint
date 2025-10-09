// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Fonction pour uploader un audio
export async function uploadAudio(file: File, filename: string) {
  const { data, error } = await supabase.storage
    .from('audios')
    .upload(filename, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) throw error

  // Obtenir l'URL publique
  const { data: { publicUrl } } = supabase.storage
    .from('audios')
    .getPublicUrl(filename)

  return publicUrl
}

// Fonction pour obtenir l'URL d'un audio
export function getAudioUrl(filename: string) {
  const { data: { publicUrl } } = supabase.storage
    .from('audios')
    .getPublicUrl(filename)
  
  return publicUrl
}
