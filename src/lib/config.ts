// src/lib/config.ts
export const config = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  voiceRss: {
    apiKey: process.env.NEXT_PUBLIC_VOICERSS_API_KEY,
  },
} as const;

// Validation au démarrage
export function validateConfig() {
  const required = [
    { name: 'NEXT_PUBLIC_SUPABASE_URL', value: config.supabase.url },
    { name: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', value: config.supabase.anonKey },
  ];

  const missing = required.filter(({ value }) => !value);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.map(m => m.name).join(', ')}`
    );
  }
}
