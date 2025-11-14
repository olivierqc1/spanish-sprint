// src/config/voices.ts
import { VoiceConfig } from '@/types/audio';

export const GOOGLE_VOICES: Record<string, Record<string, VoiceConfig[]>> = {
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