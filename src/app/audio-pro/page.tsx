"use client";
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://etsbxwlyxeuynhgqujtr.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0c2J4d2x5eGV1eW5oZ3F1anRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MDE0NTEsImV4cCI6MjA3NTQ3NzQ1MX0.26AVDbvdr0HbrpxyUTn5lTss-_6G5t8w5ILd2il1ZJ0'
);

const GOOGLE_VOICES: any = {
  "Espagne": {
    homme: [
      { name: "es-ES-Standard-B", quality: "Standard", flag: "🇪🇸" },
      { name: "es-ES-Neural2-B", quality: "Neural (Meilleur)", flag: "🇪🇸" },
      { name: "es-ES-Wavenet-B", quality: "WaveNet", flag: "🇪🇸" },
    ],
    femme: [
      { name: "es-ES-Standard-A", quality: "Standard", flag: "🇪🇸" },
      { name: "es-ES-Neural2-A", quality: "Neural (Meilleur)", flag: "🇪🇸" },
      { name: "es-ES-Wavenet-A", quality: "WaveNet", flag: "🇪🇸" },
    ]
  },
  "Mexique": {
    homme: [
      { name: "es-US-Standard-B", quality: "Standard", flag: "🇲🇽" },
      { name: "es-US-Neural2-B", quality: "Neural (Meilleur)", flag: "🇲🇽" },
      { name: "es-US-Wavenet-B", quality: "WaveNet", flag: "🇲🇽" },
    ],
    femme: [
      { name: "es-US-Standard-A", quality: "Standard", flag: "🇲🇽" },
      { name: "es-US-Neural2-A", quality: "Neural (Meilleur)", flag: "🇲🇽" },
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

export default function AudioManagerPro() {
  const [activeTab, setActiveTab] = useState('setup');
  const [setupStep, setSetupStep] = useState(1);
  const [apiKey, setApiKey] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  
  const [conversations, setConversations] = useState([
    {
      id: "demo_es_cafe",
      title: "Au café (Demo)",
      country: "Espagne",
      level: "A1",
      lines: [
        { text: "Hola, ¿cómo estás?", speaker: "Carlos", gender: "homme" },
        { text: "Muy bien, gracias.", speaker: "María", gender: "femme" },
      ]
    }
  ]);

  const [newConv, setNewConv] = useState({
    title: '',
    country: 'Espagne',
    level: 'A1',
    lines: [{ text: '', speaker: '', gender: 'homme' }]
  });

  const [aiTopic, setAiTopic] = useState('');
  const [aiCountry, setAiCountry] = useState('Espagne');
  const [aiLevel, setAiLevel] = useState('A1');
  const [generatingAI, setGeneratingAI] = useState(false);

  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0, status: '' });
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const savedKey = localStorage.getItem('google_cloud_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setIsConfigured(true);
    }
  }, []);

  const saveApiKey = () => {
    if (!apiKey) {
      alert('⚠️ Entre ta clé API Google Cloud');
      return;
    }
    localStorage.setItem('google_cloud_api_key', apiKey);
    setIsConfigured(true);
    setActiveTab('list');
    alert('✅ Configuration sauvegardée !');
  };

  const generateWithAI = async () => {
    if (!aiTopic) {
      alert('⚠️ Entre un thème !');
      return;
    }

    setGeneratingAI(true);

    try {
      const response = await fetch('/api/generate-dialogue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: aiTopic,
          country: aiCountry,
          level: aiLevel
        })
      });

      if (!response.ok) throw new Error('Erreur API');

      const dialogue = await response.json();
      
      const newConversation = {
        id: `ai_${Date.now()}`,
        title: dialogue.title || aiTopic,
        country: aiCountry,
        level: aiLevel,
        lines: dialogue.lines || []
      };

      setConversations([...conversations, newConversation]);
      setAiTopic('');
      alert('✅ Dialogue généré avec succès !');
      setActiveTab('list');

    } catch (error) {
      console.error('Erreur:', error);
      alert(`❌ Erreur: ${error}`);
    } finally {
      setGeneratingAI(false);
    }
  };

  const generateAudios = async (conv: any) => {
    if (!apiKey) {
      alert('⚠️ Configure d\'abord ta clé API Google Cloud');
      setActiveTab('setup');
      return;
    }

    setGenerating(true);
    setResults([]);
    setProgress({ current: 0, total: conv.lines.length, status: 'Démarrage...' });

    const generatedResults: any[] = [];

    try {
      for (let i = 0; i < conv.lines.length; i++) {
        const line = conv.lines[i];
        const filename = `${conv.id}_${i + 1}.mp3`;
        
        setProgress({
          current: i + 1,
          total: conv.lines.length,
          status: `Génération ${i + 1}/${conv.lines.length}: "${line.text.substring(0, 30)}..."`
        });

        const audioBlob = await generateWithGoogleTTS(line.text, conv.country, line.gender);
        
        if (audioBlob) {
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
      const successCount = generatedResults.filter(r => r.status === 'success').length;
      alert(`✅ ${successCount}/${conv.lines.length} audios générés !`);
      
    } catch (error) {
      console.error('Erreur:', error);
      alert(`❌ Erreur: ${error}`);
    } finally {
      setGenerating(false);
    }
  };

  const generateWithGoogleTTS = async (text: string, country: string, gender: string) => {
    try {
      const voice = GOOGLE_VOICES[country]?.[gender]?.[1];
      
      if (!voice) {
        throw new Error('Voix non trouvée');
      }

      const response = await fetch(
        `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input: { text },
            voice: {
              languageCode: voice.name.split('-').slice(0, 2).join('-'),
              name: voice.name
            },
            audioConfig: {
              audioEncoding: 'MP3',
              speakingRate: 0.9,
              pitch: 0
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error('Erreur Google Cloud TTS');
      }

      const data = await response.json();
      
      const audioContent = data.audioContent;
      const byteCharacters = atob(audioContent);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      return new Blob([byteArray], { type: 'audio/mpeg' });

    } catch (error) {
      console.error('Erreur génération:', error);
      return null;
    }
  };

  const uploadToSupabase = async (blob: Blob, filename: string) => {
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
      console.error('Erreur upload:', error);
      return null;
    }
  };

  const addLine = () => {
    setNewConv({
      ...newConv,
      lines: [...newConv.lines, { text: '', speaker: '', gender: 'homme' }]
    });
  };

  const updateLine = (index: number, field: string, value: string) => {
    const updatedLines = [...newConv.lines];
    (updatedLines[index] as any)[field] = value;
    setNewConv({ ...newConv, lines: updatedLines });
  };

  const removeLine = (index: number) => {
    if (newConv.lines.length > 1) {
      setNewConv({
        ...newConv,
        lines: newConv.lines.filter((_, i) => i !== index)
      });
    }
  };

  const saveConversation = () => {
    if (!newConv.title || newConv.lines.some(l => !l.text)) {
      alert('⚠️ Remplis tous les champs !');
      return;
    }

    const conversation = {
      id: `manual_${Date.now()}`,
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

  const downloadResults = () => {
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `audios_pro_${Date.now()}.json`;
    link.click();
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f1720', color: '#e5e7eb', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '36px', marginBottom: '10px' }}>🎙️ Audio Manager PRO</h1>
          <p style={{ color: '#93a2b8', fontSize: '14px' }}>
            Google Cloud TTS • Générateur AI • Qualité professionnelle
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', borderBottom: '1px solid #334155', paddingBottom: '10px', flexWrap: 'wrap' }}>
          {!isConfigured && (
            <button onClick={() => setActiveTab('setup')} style={{
              padding: '12px 24px',
              background: activeTab === 'setup' ? '#1e3a5f' : 'transparent',
              border: activeTab === 'setup' ? '2px solid #60a5fa' : '1px solid #334155',
              borderRadius: '8px',
              color: '#e5e7eb',
              cursor: 'pointer'
            }}>⚙️ Configuration</button>
          )}
          {isConfigured && (
            <>
              <button onClick={() => setActiveTab('list')} style={{
                padding: '12px 24px',
                background: activeTab === 'list' ? '#1e3a5f' : 'transparent',
                border: activeTab === 'list' ? '2px solid #60a5fa' : '1px solid #334155',
                borderRadius: '8px',
                color: '#e5e7eb',
                cursor: 'pointer'
              }}>📋 Conversations ({conversations.length})</button>
              <button onClick={() => setActiveTab('ai')} style={{
                padding: '12px 24px',
                background: activeTab === 'ai' ? '#1e3a5f' : 'transparent',
                border: activeTab === 'ai' ? '2px solid #60a5fa' : '1px solid #334155',
                borderRadius: '8px',
                color: '#e5e7eb',
                cursor: 'pointer'
              }}>✨ Générer avec AI</button>
              <button onClick={() => setActiveTab('manual')} style={{
                padding: '12px 24px',
                background: activeTab === 'manual' ? '#1e3a5f' : 'transparent',
                border: activeTab === 'manual' ? '2px solid #60a5fa' : '1px solid #334155',
                borderRadius: '8px',
                color: '#e5e7eb',
                cursor: 'pointer'
              }}>✍️ Ajouter manuellement</button>
              <button onClick={() => setActiveTab('generate')} style={{
                padding: '12px 24px',
                background: activeTab === 'generate' ? '#1e3a5f' : 'transparent',
                border: activeTab === 'generate' ? '2px solid #60a5fa' : '1px solid #334155',
                borderRadius: '8px',
                color: '#e5e7eb',
                cursor: 'pointer'
              }}>🚀 Générer audios</button>
            </>
          )}
        </div>

        {activeTab === 'setup' && (
          <div style={{ background: '#0b1220', border: '1px solid #334155', borderRadius: '12px', padding: '40px' }}>
            <h2 style={{ marginBottom: '30px', textAlign: 'center' }}>⚙️ Configuration Google Cloud TTS</h2>
            
            {setupStep === 1 && (
              <div>
                <h3 style={{ marginBottom: '20px' }}>Étape 1/3 : Créer un compte Google Cloud (GRATUIT)</h3>
                <div style={{ background: '#1e3a5f', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                  <ol style={{ lineHeight: '2' }}>
                    <li>Va sur <a href="https://console.cloud.google.com" target="_blank" style={{ color: '#60a5fa' }}>console.cloud.google.com</a></li>
                    <li>Connecte-toi avec ton compte Google</li>
                    <li>Accepte les conditions (gratuit)</li>
                  </ol>
                </div>
                <button onClick={() => setSetupStep(2)} style={{ width: '100%', padding: '15px', background: '#10b981', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
                  ✅ Compte créé → Étape suivante
                </button>
              </div>
            )}

            {setupStep === 2 && (
              <div>
                <h3 style={{ marginBottom: '20px' }}>Étape 2/3 : Activer l&apos;API Text-to-Speech</h3>
                <div style={{ background: '#1e3a5f', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                  <ol style={{ lineHeight: '2' }}>
                    <li>Dans Google Cloud Console, cherche &quot;Text-to-Speech API&quot;</li>
                    <li>Clique sur &quot;ACTIVER&quot;</li>
                    <li>Attends 30 secondes</li>
                  </ol>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => setSetupStep(1)} style={{ flex: 1, padding: '15px', background: '#334155', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer' }}>← Retour</button>
                  <button onClick={() => setSetupStep(3)} style={{ flex: 2, padding: '15px', background: '#10b981', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>✅ API activée → Suivant</button>
                </div>
              </div>
            )}

            {setupStep === 3 && (
              <div>
                <h3 style={{ marginBottom: '20px' }}>Étape 3/3 : Créer une clé API</h3>
                <div style={{ background: '#1e3a5f', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                  <ol style={{ lineHeight: '2' }}>
                    <li>Va dans &quot;APIs & Services&quot; → &quot;Credentials&quot;</li>
                    <li>Clique sur &quot;CREATE CREDENTIALS&quot; → &quot;API Key&quot;</li>
                    <li>Copie la clé (commence par AIza...)</li>
                  </ol>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '10px', color: '#93a2b8' }}>Ta clé API Google Cloud :</label>
                  <input
                    type="text"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="AIzaSy..."
                    style={{
                      width: '100%',
                      padding: '15px',
                      background: '#1e3a5f',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#e5e7eb',
                      fontSize: '16px',
                      fontFamily: 'monospace'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => setSetupStep(2)} style={{ flex: 1, padding: '15px', background: '#334155', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer' }}>← Retour</button>
                  <button onClick={saveApiKey} style={{ flex: 2, padding: '15px', background: '#10b981', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>💾 Sauvegarder</button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'list' && isConfigured && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {conversations.map(conv => (
              <div key={conv.id} style={{ background: '#0b1220', border: '1px solid #334155', borderRadius: '12px', padding: '20px' }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{GOOGLE_VOICES[conv.country]?.homme[0].flag}</div>
                <h3 style={{ margin: '10px 0' }}>{conv.title}</h3>
                <p style={{ color: '#93a2b8', fontSize: '14px' }}>
                  {conv.country} • {conv.level} • {conv.lines.length} répliques
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'ai' && isConfigured && (
          <div style={{ background: '#0b1220', border: '1px solid #334155', borderRadius: '12px', padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '30px', textAlign: 'center' }}>✨ Générer un dialogue avec AI</h2>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '10px', color: '#93a2b8' }}>Thème du dialogue :</label>
              <input
                type="text"
                value={aiTopic}
                onChange={(e) => setAiTopic(e.target.value)}
                placeholder="Ex: Commander au restaurant..."
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#1e3a5f',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#e5e7eb',
                  fontSize: '16px'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '10px', color: '#93a2b8' }}>Pays :</label>
                <select
                  value={aiCountry}
                  onChange={(e) => setAiCountry(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: '#1e3a5f',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#e5e7eb'
                  }}
                >
                  {Object.keys(GOOGLE_VOICES).map(country => (
                    <option key={country} value={country}>{GOOGLE_VOICES[country].homme[0].flag} {country}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '10px', color: '#93a2b8' }}>Niveau :</label>
                <select
                  value={aiLevel}
                  onChange={(e) => setAiLevel(e.target.value)}
                  style={{
                    width
