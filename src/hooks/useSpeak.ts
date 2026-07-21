// src/hooks/useSpeak.ts
// Lecture audio d'un texte via la synthèse vocale du navigateur (Web Speech API).
// Aucune dépendance, aucune clé, fonctionne hors-ligne. Catalan par défaut.
'use client';

import { useCallback, useEffect, useState } from 'react';

export function useSpeak(defaultLang: string = 'ca-ES') {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    const ok = typeof window !== 'undefined' && 'speechSynthesis' in window;
    setSupported(ok);
    if (ok) {
      // Les voix se chargent parfois de façon asynchrone : on force le peuplement.
      window.speechSynthesis.getVoices();
      const onVoices = () => window.speechSynthesis.getVoices();
      window.speechSynthesis.addEventListener?.('voiceschanged', onVoices);
      return () => window.speechSynthesis.removeEventListener?.('voiceschanged', onVoices);
    }
  }, []);

  const pickVoice = useCallback((want: string): SpeechSynthesisVoice | null => {
    const voices = window.speechSynthesis.getVoices();
    const w = want.toLowerCase();
    return (
      voices.find((v) => v.lang.toLowerCase() === w) ||
      voices.find((v) => v.lang.toLowerCase().startsWith(w.slice(0, 2))) ||
      voices.find((v) => v.lang.toLowerCase().startsWith('es')) || // repli castillan
      null
    );
  }, []);

  const speak = useCallback(
    (text: string, lang?: string) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
      const synth = window.speechSynthesis;
      synth.cancel(); // coupe toute lecture en cours
      const u = new SpeechSynthesisUtterance(text);
      const target = lang || defaultLang;
      const v = pickVoice(target);
      if (v) u.voice = v;
      u.lang = v?.lang || target;
      u.rate = 0.95; // légèrement ralenti pour l'apprentissage
      u.onstart = () => setSpeaking(true);
      u.onend = () => setSpeaking(false);
      u.onerror = () => setSpeaking(false);
      synth.speak(u);
    },
    [defaultLang, pickVoice]
  );

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  }, []);

  return { speak, stop, speaking, supported };
}
