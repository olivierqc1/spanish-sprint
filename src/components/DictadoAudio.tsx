// src/components/DictadoAudio.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { recordAnswer } from '@/data/progress';

type Frase = { es: string; fr: string };

const FRASES: Frase[] = [
  { es: 'Ayer quedé con Laura para tomar un café en Gràcia.', fr: "Hier j'ai retrouvé Laura pour prendre un café à Gràcia." },
  { es: 'El tren hacia Girona sale a las nueve y cuarto.', fr: 'Le train pour Gérone part à neuf heures et quart.' },
  { es: 'Necesito pedir cita previa en la oficina de extranjería.', fr: 'Je dois prendre rendez-vous au bureau des étrangers.' },
  { es: 'Hace dos años que vivo cerca de la Sagrada Família.', fr: 'Ça fait deux ans que je vis près de la Sagrada Família.' },
  { es: 'Si tuviera más tiempo, correría por la montaña cada mañana.', fr: "Si j'avais plus de temps, je courrais en montagne chaque matin." },
  { es: 'El alquiler subió más de cien euros este año.', fr: 'Le loyer a augmenté de plus de cent euros cette année.' },
  { es: 'No creo que llegue a tiempo por el atasco.', fr: "Je ne crois pas qu'il arrive à temps à cause du bouchon." },
  { es: 'Me gustaría reservar una mesa para cuatro personas el viernes.', fr: 'Je voudrais réserver une table pour quatre personnes vendredi.' },
  { es: 'Cuando termine el máster, buscaré trabajo en gestión de activos.', fr: "Quand je finirai le master, je chercherai un travail en gestion d'actifs." },
  { es: 'El médico me dijo que descansara al menos una semana.', fr: "Le médecin m'a dit de me reposer au moins une semaine." },
  { es: 'Compré los billetes por internet para ahorrar tiempo.', fr: 'J’ai acheté les billets sur internet pour gagner du temps.' },
  { es: 'En verano la gente cena muy tarde, sobre las diez.', fr: 'En été les gens dînent très tard, vers dix heures.' },
  { es: 'Aunque llueva mañana, iremos igualmente de excursión.', fr: "Même s'il pleut demain, on ira quand même en randonnée." },
  { es: 'Tienes que rellenar este formulario antes del jueves.', fr: 'Tu dois remplir ce formulaire avant jeudi.' },
  { es: 'La factura de la luz ha vuelto a subir este trimestre.', fr: "La facture d'électricité a encore augmenté ce trimestre." },
  { es: 'Llevo tres meses estudiando catalán en el CPNL.', fr: 'Ça fait trois mois que j’étudie le catalan au CPNL.' },
  { es: 'Me preguntó si podía ayudarle a mudarse el sábado.', fr: "Il m'a demandé si je pouvais l'aider à déménager samedi." },
  { es: 'El vino del Priorat es más intenso que el del Penedès.', fr: 'Le vin du Priorat est plus intense que celui du Penedès.' },
];

const norm = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[.,!?;:¿¡"()]/g, '').trim().replace(/\s+/g, ' ');

export default function DictadoAudio({ language = 'fr' }: { language?: 'fr' | 'en' }) {
  const [i, setI] = useState(0);
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{ pct: number } | null>(null);
  const [slow, setSlow] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [voiceState, setVoiceState] = useState<'loading' | 'ok' | 'none' | 'unsupported'>('loading');
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  const frase = FRASES[i];

  // Charge les voix (asynchrone sur mobile) et repère une voix espagnole.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setVoiceState('unsupported');
      return;
    }
    const pick = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return false;
      const es = voices.find((v) => v.lang && v.lang.toLowerCase().startsWith('es'));
      voiceRef.current = es || null;
      setVoiceState(es ? 'ok' : 'none');
      return true;
    };
    if (!pick()) {
      window.speechSynthesis.onvoiceschanged = () => pick();
      // filet de sécurité : retente après un court délai
      setTimeout(pick, 700);
    }
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, []);

  const t = language === 'fr'
    ? { title: 'Dictée audio', desc: 'Écoute la phrase et écris ce que tu entends.', listen: 'Écouter', stop: 'Arrêter', slow: 'Lent', check: 'Vérifier', next: 'Suivante →', placeholder: 'Écris ce que tu entends…', correct: 'Phrase correcte', loading: 'Chargement de la voix…', none: '⚠️ Aucune voix espagnole sur cet appareil. Va dans Réglages → Langues → Synthèse vocale et installe l’espagnol (es-ES).', unsupported: '⚠️ Ce navigateur ne supporte pas la synthèse vocale.' }
    : { title: 'Audio dictation', desc: 'Listen and type what you hear.', listen: 'Listen', stop: 'Stop', slow: 'Slow', check: 'Check', next: 'Next →', placeholder: 'Type what you hear…', correct: 'Correct sentence', loading: 'Loading voice…', none: '⚠️ No Spanish voice on this device. Go to Settings → Languages → Text-to-speech and install Spanish (es-ES).', unsupported: '⚠️ This browser does not support speech synthesis.' };

  const speak = () => {
    if (voiceState === 'unsupported' || voiceState === 'none') return;
    window.speechSynthesis.cancel();
    if (speaking) { setSpeaking(false); return; }
    const u = new SpeechSynthesisUtterance(frase.es);
    u.lang = 'es-ES';
    if (voiceRef.current) u.voice = voiceRef.current;
    u.rate = slow ? 0.7 : 0.95;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(u);
    // correctif Android : relance si le moteur se met en pause
    setTimeout(() => { try { window.speechSynthesis.resume(); } catch {} }, 250);
  };

  const check = () => {
    const cw = norm(frase.es).split(' ');
    const uw = norm(input).split(' ');
    let ok = 0;
    cw.forEach((w, idx) => { if (uw[idx] === w) ok++; });
    const pct = Math.round((ok / cw.length) * 100);
    setResult({ pct });
    recordAnswer(pct >= 80);
  };

  const next = () => {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
    setResult(null);
    setInput('');
    setI((i + 1) % FRASES.length);
  };

  const pctColor = (p: number) => (p >= 80 ? '#34d399' : p >= 50 ? '#fbbf24' : '#fb7185');
  const audioBlocked = voiceState === 'none' || voiceState === 'unsupported';

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-lg font-bold text-white">🎧 {t.title}</h3>
        <span className="text-xs text-slate-500">{i + 1} / {FRASES.length}</span>
      </div>
      <p className="text-sm text-slate-400 mb-4">{t.desc}</p>

      {audioBlocked && (
        <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-300 text-sm">
          {voiceState === 'unsupported' ? t.unsupported : t.none}
        </div>
      )}

      <div className="flex items-center gap-2 mb-4">
        <button onClick={speak} disabled={audioBlocked || voiceState === 'loading'}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 px-5 py-2.5 rounded-xl font-bold transition">
          {voiceState === 'loading' ? t.loading : speaking ? `⏸ ${t.stop}` : `▶️ ${t.listen}`}
        </button>
        <button onClick={() => setSlow(!slow)} disabled={audioBlocked}
          className={`px-3 py-2.5 rounded-xl text-sm font-semibold transition border disabled:opacity-40 ${slow ? 'bg-blue-600/20 border-blue-600 text-blue-300' : 'bg-slate-800 border-slate-700 text-slate-300'}`}>
          🐢 {t.slow}
        </button>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t.placeholder}
        rows={2}
        disabled={!!result}
        className="w-full bg-slate-950 border-2 border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 disabled:opacity-60 resize-none"
      />

      {result && (
        <div className="mt-3 p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-black" style={{ color: pctColor(result.pct) }}>{result.pct}%</span>
          </div>
          <p className="text-sm text-slate-400">{t.correct} :</p>
          <p className="text-white font-medium">{frase.es}</p>
          <p className="text-sm text-slate-500 italic mt-1">{frase.fr}</p>
        </div>
      )}

      <div className="mt-4">
        {!result ? (
          <button onClick={check} disabled={!input.trim()}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 px-6 py-3 rounded-xl font-bold transition">
            {t.check}
          </button>
        ) : (
          <button onClick={next} className="w-full bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-bold transition">
            {t.next}
          </button>
        )}
      </div>
    </div>
  );
}
