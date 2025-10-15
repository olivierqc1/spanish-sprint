import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Init Supabase (utilise tes variables d'environnement)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://etsbxwlyxeuynhgqujtr.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0c2J4d2x5eGV1eW5oZ3F1anRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MDE0NTEsImV4cCI6MjA3NTQ3NzQ1MX0.26AVDbvdr0HbrpxyUTn5lTss-_6G5t8w5ILd2il1ZJ0'
);

const INITIAL_CONVERSATIONS = [
  {
    id: "conv_es_a1_cafe",
    country: "Espagne",
    level: "A1",
    title: "Au café",
    lines: [
      { text: "Hola María, ¿cómo estás?", speaker: "Carlos", gender: "homme" },
      { text: "Muy bien, gracias. ¿Y tú?", speaker: "María", gender: "femme" },
      { text: "Bien también. ¿Qué vas a tomar?", speaker: "Carlos", gender: "homme" },
      { text: "Un café con leche y un croissant, por favor.", speaker: "María", gender: "femme" },
    ]
  },
  {
    id: "conv_mx_a1_mercado",
    country: "Mexique",
    level: "A1",
    title: "Au marché",
    lines: [
      { text: "Buenos días. ¿Cuánto cuestan los aguacates?", speaker: "Cliente", gender: "homme" },
      { text: "Treinta pesos el kilo, güerito.", speaker: "Vendedor", gender: "homme" },
      { text: "Dame dos kilos, por favor.", speaker: "Cliente", gender: "homme" },
    ]
  }
];

const VOICES = {
  "Espagne": {
    homme: { voice: "es-ES", name: "AlvaroNeural", flag: "🇪🇸" },
    femme: { voice: "es-ES", name: "ElviraNeural", flag: "🇪🇸" }
  },
  "Mexique": {
    homme: { voice: "es-MX", name: "JorgeNeural", flag: "🇲🇽" },
    femme: { voice: "es-MX", name: "DaliaNeural", flag: "🇲🇽" }
  },
  "Argentine": {
    homme: { voice: "es-AR", name: "TomasNeural", flag: "🇦🇷" },
    femme: { voice: "es-AR", name: "ElenaNeural", flag: "🇦🇷" }
  },
  "Colombie": {
    homme: { voice: "es-CO", name: "GonzaloNeural", flag: "🇨🇴" },
    femme: { voice: "es-CO", name: "SalomeNeural", flag: "🇨🇴" }
  }
};

export default function AudioManagerFree() {
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [activeTab, setActiveTab] = useState('list');
  const [selectedConv, setSelectedConv] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0, status: '' });
  const [results, setResults] = useState([]);
  
  // Nouveau formulaire
  const [newConv, setNewConv] = useState({
    title: '',
    country: 'Espagne',
    level: 'A1',
    lines: [{ text: '', speaker: '', gender: 'homme' }]
  });

  // FONCTION PRINCIPALE : Générer les audios GRATUITEMENT
  const generateAudios = async (conv) => {
    setGenerating(true);
    setResults([]);
    setProgress({ current: 0, total: conv.lines.length, status: 'Démarrage...' });

    const generatedResults = [];

    try {
      for (let i = 0; i < conv.lines.length; i++) {
        const line = conv.lines[i];
        const filename = `${conv.id}_${i + 1}.mp3`;
        
        setProgress({
          current: i + 1,
          total: conv.lines.length,
          status: `Génération ${i + 1}/${conv.lines.length}: "${line.text.substring(0, 30)}..."`
        });

        // Générer l'audio avec API gratuite
        const audioBlob = await generateAudioFree(line.text, conv.country, line.gender);
        
        if (audioBlob) {
          // Upload sur Supabase
          const url = await uploadToSupabase(audioBlob, filename);
          
          generatedResults.push({
            text: line.text,
            speaker: line.speaker,
            filename,
            url,
            status: 'success'
          });
        } else {
          generatedResults.push({
            text: line.text,
            speaker: line.speaker,
            filename,
            status: 'failed'
          });
        }
      }

      setResults(generatedResults);
      alert(`✅ ${generatedResults.filter(r => r.status === 'success').length}/${conv.lines.length} audios générés avec succès !`);
      
    } catch (error) {
      console.error('Erreur:', error);
      alert(`❌ Erreur: ${error.message}`);
    } finally {
      setGenerating(false);
    }
  };

  // Générer l'audio avec une API GRATUITE
  const generateAudioFree = async (text, country, gender) => {
    try {
      // Option 1 : VoiceRSS (gratuit, 350 requêtes/jour)
      const voiceCode = country === 'Espagne' ? 'es-es' : 
                        country === 'Mexique' ? 'es-mx' : 
                        country === 'Argentine' ? 'es-ar' : 'es-co';
      
      // Clé API gratuite VoiceRSS (tu peux t'inscrire sur voicerss.org pour la tienne)
      const apiKey = 'demo'; // Remplace par ta clé gratuite de voicerss.org
      
      const url = `https://api.voicerss.org/?key=${apiKey}&hl=${voiceCode}&src=${encodeURIComponent(text)}&c=MP3&f=44khz_16bit_stereo`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Erreur API VoiceRSS');
      }

      return await response.blob();
      
    } catch (error) {
      console.error('Erreur génération audio:', error);
      
      // Fallback : Utiliser Web Speech API et enregistrer
      return await generateWithWebSpeech(text, country, gender);
    }
  };

  // Fallback : Web Speech API (qualité moyenne mais gratuit et illimité)
  const generateWithWebSpeech = async (text, country, gender) => {
    return new Promise((resolve, reject) => {
      if (!('speechSynthesis' in window)) {
        reject(new Error('Synthèse vocale non supportée'));
        return;
      }

      // Créer un contexte audio pour enregistrer
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContext();
      const dest = audioContext.createMediaStreamDestination();
      
      // Configuration de la voix
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = country === 'Mexique' ? 'es-MX' : 'es-ES';
      utterance.rate = 0.9;
      utterance.pitch = gender === 'femme' ? 1.2 : 0.9;

      // MediaRecorder pour capturer l'audio
      const mediaRecorder = new MediaRecorder(dest.stream);
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        resolve(blob);
      };

      utterance.onstart = () => {
        mediaRecorder.start();
      };

      utterance.onend = () => {
        setTimeout(() => {
          mediaRecorder.stop();
        }, 100);
      };

      utterance.onerror = (error) => {
        reject(error);
      };

      window.speechSynthesis.speak(utterance);
    });
  };

  // Upload sur Supabase
  const uploadToSupabase = async (blob, filename) => {
    try {
      const { data, error } = await supabase.storage
        .from('audios')
        .upload(filename, blob, {
          contentType: 'audio/mpeg',
          upsert: true
        });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('audios')
        .getPublicUrl(filename);

      return publicUrl;
    } catch (error) {
      console.error('Erreur upload Supabase:', error);
      return null;
    }
  };

  // Ajouter une ligne
  const addLine = () => {
    setNewConv({
      ...newConv,
      lines: [...newConv.lines, { text: '', speaker: '', gender: 'homme' }]
    });
  };

  // Mettre à jour une ligne
  const updateLine = (index, field, value) => {
    const updatedLines = [...newConv.lines];
    updatedLines[index][field] = value;
    setNewConv({ ...newConv, lines: updatedLines });
  };

  // Supprimer une ligne
  const removeLine = (index) => {
    if (newConv.lines.length > 1) {
      const updatedLines = newConv.lines.filter((_, i) => i !== index);
      setNewConv({ ...newConv, lines: updatedLines });
    }
  };

  // Sauvegarder
  const saveConversation = () => {
    if (!newConv.title || newConv.lines.some(l => !l.text)) {
      alert('⚠️ Remplis tous les champs obligatoires !');
      return;
    }

    const conversation = {
      id: `conv_${Date.now()}`,
      ...newConv
    };

    setConversations([...conversations, conversation]);
    setNewConv({
      title: '',
      country: 'Espagne',
      level: 'A1',
      lines: [{ text: '', speaker: '', gender: 'homme' }]
    });
    setActiveTab('list');
    alert('✅ Conversation sauvegardée !');
  };

  // Télécharger les résultats
  const downloadResults = () => {
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `audios_${selectedConv?.id || 'results'}.json`;
    link.click();
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f1720', color: '#e5e7eb', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '36px', marginBottom: '10px' }}>
            🎙️ Générateur Audio Gratuit
          </h1>
          <p style={{ color: '#93a2b8', fontSize: '14px' }}>
            100% gratuit • VoiceRSS API + Web Speech • Upload automatique Supabase
          </p>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', borderBottom: '1px solid #334155', paddingBottom: '10px' }}>
          {['list', 'add', 'generate'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '12px 24px',
                background: activeTab === tab ? '#1e3a5f' : 'transparent',
                border: activeTab === tab ? '2px solid #60a5fa' : '1px solid #334155',
                borderRadius: '8px',
                color: '#e5e7eb',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              {tab === 'list' ? `📋 Conversations (${conversations.length})` :
               tab === 'add' ? '➕ Ajouter' : '🚀 Générer'}
            </button>
          ))}
        </div>

        {/* LISTE */}
        {activeTab === 'list' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {conversations.map(conv => (
              <div
                key={conv.id}
                onClick={() => setSelectedConv(conv)}
                style={{
                  background: '#0b1220',
                  border: selectedConv?.id === conv.id ? '2px solid #60a5fa' : '1px solid #334155',
                  borderRadius: '12px',
                  padding: '20px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>
                  {VOICES[conv.country]?.homme.flag}
                </div>
                <h3 style={{ margin: '10px 0' }}>{conv.title}</h3>
                <p style={{ color: '#93a2b8', fontSize: '14px' }}>
                  {conv.country} • {conv.level} • {conv.lines.length} répliques
                </p>
              </div>
            ))}
          </div>
        )}

        {/* AJOUTER */}
        {activeTab === 'add' && (
          <div style={{ background: '#0b1220', border: '1px solid #334155', borderRadius: '12px', padding: '30px' }}>
            <h2 style={{ marginBottom: '20px' }}>➕ Nouvelle conversation</h2>
            
            <input
              type="text"
              placeholder="Titre de la conversation"
              value={newConv.title}
              onChange={(e) => setNewConv({ ...newConv, title: e.target.value })}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '20px',
                background: '#1e3a5f',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#e5e7eb',
                fontSize: '16px'
              }}
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
              <select
                value={newConv.country}
                onChange={(e) => setNewConv({ ...newConv, country: e.target.value })}
                style={{
                  padding: '12px',
                  background: '#1e3a5f',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#e5e7eb'
                }}
              >
                {Object.keys(VOICES).map(country => (
                  <option key={country} value={country}>
                    {VOICES[country].homme.flag} {country}
                  </option>
                ))}
              </select>

              <select
                value={newConv.level}
                onChange={(e) => setNewConv({ ...newConv, level: e.target.value })}
                style={{
                  padding: '12px',
                  background: '#1e3a5f',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#e5e7eb'
                }}
              >
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
              </select>
            </div>

            {newConv.lines.map((line, idx) => (
              <div key={idx} style={{ background: '#1e3a5f', padding: '20px', borderRadius: '8px', marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <strong>Réplique {idx + 1}</strong>
                  {newConv.lines.length > 1 && (
                    <button
                      onClick={() => removeLine(idx)}
                      style={{ padding: '4px 12px', background: '#7f1d1d', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer' }}
                    >
                      🗑️
                    </button>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                  <input
                    type="text"
                    placeholder="Nom (ex: Carlos)"
                    value={line.speaker}
                    onChange={(e) => updateLine(idx, 'speaker', e.target.value)}
                    style={{ padding: '10px', background: '#0b1220', border: '1px solid #334155', borderRadius: '6px', color: '#e5e7eb' }}
                  />
                  <select
                    value={line.gender}
                    onChange={(e) => updateLine(idx, 'gender', e.target.value)}
                    style={{ padding: '10px', background: '#0b1220', border: '1px solid #334155', borderRadius: '6px', color: '#e5e7eb' }}
                  >
                    <option value="homme">♂️ Homme</option>
                    <option value="femme">♀️ Femme</option>
                  </select>
                </div>

                <textarea
                  placeholder="Texte en espagnol..."
                  value={line.text}
                  onChange={(e) => updateLine(idx, 'text', e.target.value)}
                  rows={2}
                  style={{ width: '100%', padding: '10px', background: '#0b1220', border: '1px solid #334155', borderRadius: '6px', color: '#e5e7eb', resize: 'vertical' }}
                />
              </div>
            ))}

            <div style={{ display: 'flex', gap: '15px' }}>
              <button onClick={addLine} style={{ flex: 1, padding: '15px', background: '#334155', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
                ➕ Ajouter une réplique
              </button>
              <button onClick={saveConversation} style={{ flex: 2, padding: '15px', background: '#10b981', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
                💾 Sauvegarder
              </button>
            </div>
          </div>
        )}

        {/* GÉNÉRER */}
        {activeTab === 'generate' && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>🚀 Générer les audios</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              {conversations.map(conv => (
                <div key={conv.id} style={{ background: '#0b1220', border: '1px solid #334155', borderRadius: '12px', padding: '20px' }}>
                  <div style={{ marginBottom: '15px' }}>
                    <span style={{ fontSize: '28px' }}>{VOICES[conv.country]?.homme.flag}</span>
                    <h3 style={{ margin: '10px 0' }}>{conv.title}</h3>
                    <p style={{ color: '#93a2b8', fontSize: '14px' }}>
                      {conv.lines.length} répliques • {conv.level}
                    </p>
                  </div>
                  <button
                    onClick={() => { setSelectedConv(conv); generateAudios(conv); }}
                    disabled={generating}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: generating ? '#334155' : '#10b981',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                      cursor: generating ? 'not-allowed' : 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    {generating ? '⏳ En cours...' : '🎙️ Générer'}
                  </button>
                </div>
              ))}
            </div>

            {/* Progression */}
            {generating && (
              <div style={{ padding: '30px', background: '#1e3a5f', borderRadius: '12px', marginBottom: '30px' }}>
                <h3 style={{ marginBottom: '15px' }}>Génération en cours...</h3>
                <p style={{ fontSize: '20px', color: '#60a5fa', margin: '10px 0' }}>
                  {progress.current} / {progress.total}
                </p>
                <p style={{ color: '#93a2b8', fontSize: '14px' }}>{progress.status}</p>
                <div style={{ width: '100%', height: '20px', background: '#0b1220', borderRadius: '10px', overflow: 'hidden', marginTop: '15px' }}>
                  <div style={{
                    width: `${(progress.current / progress.total) * 100}%`,
                    height: '100%',
                    background: '#10b981',
                    transition: 'width 0.3s'
                  }} />
                </div>
              </div>
            )}

            {/* Résultats */}
            {results.length > 0 && (
              <div style={{ background: '#0b1220', border: '1px solid #334155', borderRadius: '12px', padding: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <h3>✅ Résultats ({results.filter(r => r.status === 'success').length}/{results.length})</h3>
                  <button
                    onClick={downloadResults}
                    style={{ padding: '8px 16px', background: '#60a5fa', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer' }}
                  >
                    📥 Télécharger JSON
                  </button>
                </div>
                {results.map((result, idx) => (
                  <
