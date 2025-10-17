// src/types/audio.ts
export type VoiceQuality = 'Standard' | 'Neural' | 'WaveNet';
export type AudioProvider = 'google-tts' | 'edge-tts' | 'web-speech';
export type GenerationStatus = 'idle' | 'generating' | 'success' | 'failed';

export interface VoiceConfig {
  name: string;
  quality: VoiceQuality;
  flag: string;
}

export interface ConversationLine {
  text: string;
  speaker: string;
  gender: 'homme' | 'femme';
}

export interface Conversation {
  id: string;
  title: string;
  country: string;
  level: string;
  lines: ConversationLine[];
}

export interface AudioResult {
  text: string;
  speaker: string;
  filename: string;
  url?: string;
  status: 'success' | 'failed';
}

export interface GenerationProgress {
  current: number;
  total: number;
  status: string;
}
