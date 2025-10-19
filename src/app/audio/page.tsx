"use client";
import { useState } from 'react';

const INITIAL_CONVERSATIONS = [
  {
    id: "conv_es_a1_cafe",
    country: "Espagne",
    level: "A1",
    title: "Au café",
    lines: [
      { text: "Hola María, ¿cómo estás?", speaker: "Carlos", gender: "homme" },
      { text: "Muy bien, gracias. ¿Y tú?", speaker: "María", gender: "femme" },
    ]
  }
];

const VOICE_CONFIG: Record<string, { homme: string; femme: string; flag: string }> = {
  "Espagne": { homme: "es-ES-Standard-B", femme: "es-ES-Standard-A", flag: "🇪🇸" },
  "Mexique": { homme: "es-MX-Standard-B", femme: "es-MX-Standard-A", flag: "🇲🇽" },
};

export default function AudioManager() {
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [activeTab, setActiveTab] = useState('list');
  const [selectedConv, setSelectedConv] = useState<any>(null);
  const [generating, setGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState({ current: 0, total: 0 });
  
  const [newConv, setNewConv] = useState({
    title: '',
    country: 'Espagne',
    level: 'A1',
    lines: [{ text: '', speaker: '', gender: 'homme' }]
  });

  const addLine = () => {
    setNewConv({
      ...newConv,
      lines: [...newConv.lines, { text: '', speaker: '', gender: 'homme' }]
    });
  };

  const updateLine = (index: number, field: string, value: string) => {
    const updatedLines = [...newConv.lines];
    updatedLines[index] = { ...updatedLines[index], [field]: value };
    setNewConv({ ...newConv, lines: updatedLines });
  };

  const removeLine = (index: number) => {
    const updatedLines = newConv.lines.filter((_, i) => i !== index);
    setNewConv({ ...newConv, lines: updatedLines });
  };

  const saveNewConversation = () => {
    if (!newConv.title || newConv.lines.some(l => !l.text)) {
      alert('⚠️ Remplis tous les champs !');
      return;
    }

    const conversation = {
      id: `conv_${Date.now()}`,
      country: newConv.country,
      level: newConv.level,
      title: newConv.title,
      lines: newConv.lines
    };

    setConversations([...conversations, conversation]);
    setNewConv({
      title: '',
      country: 'Espagne',
      level: 'A1',
      lines: [{ text: '', speaker: '', gender: 'homme' }]
    });
    setActiveTab('list');
    alert('✅ Conversation ajoutée !');
  };

  const generateAudios = async (conv: any) => {
    setGenerating(true);
    setGenerationProgress({ current: 0, total: conv.lines.length });

    try {
      const results = [];
      
      for (let i = 0; i < conv.lines.length; i++) {
        const line = conv.lines[i];
        setGenerationProgress({ current: i + 1, total: conv.lines.length });

        await new Promise(resolve => setTimeout(resolve, 1000));
        await speakText(line.text, conv.country, line.gender);

        results.push({
          text: line.text,
          speaker: line.speaker,
          filename: `${conv.id}_${i + 1}.mp3`,
          status: 'generated'
        });
      }

      alert(`✅ ${results.length} audios générés !`);
      console.log('Résultats:', results);
      
    } catch (error: any) {
      alert(`❌ Erreur: ${error.message}`);
    } finally {
      setGenerating(false);
    }
  };

  const speakText = (text: string, country: string, gender: string) => {
    return new Promise<void>((resolve, reject) => {
      if (!('speechSynthesis' in window)) {
        reject(new Error('Synthèse vocale non supportée'));
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = country === 'Mexique' ? 'es-MX' : 'es-ES';
      utterance.rate = 0.9;
      utterance.pitch = gender === 'femme' ? 1.2 : 0.9;

      utterance.onend = () => resolve();
      utterance.onerror = () => reject(new Error('Erreur de synthèse vocale'));

      window.speechSynthesis.speak(utterance);
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f1720', color: '#e5e7eb', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <header style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '36px', marginBottom: '10px' }}>
            🎙️ Gestionnaire Audio
          </h1>
          <p style={{ color: '#93a2b8' }}>
            Ajoute et génère des audios facilement
          </p>
        </header>

        <nav style={{ 
          display: 'flex', 
          gap: '10px', 
          marginBottom: '30px'
        }}>
          <button
            onClick={() => setActiveTab('list')}
            style={{
              padding: '12px 24px',
              background: activeTab === 'list' ? '#1e3a5f' : 'transparent',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#e5e7eb',
              cursor: 'pointer'
            }}
          >
            📋 Conversations ({conversations.length})
          </button>
          <button
            onClick={() => setActiveTab('add')}
            style={{
              padding: '12px 24px',
              background: activeTab === 'add' ? '#1e3a5f' : 'transparent',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#e5e7eb',
              cursor: 'pointer'
            }}
          >
            ➕ Ajouter
          </button>
          <button
            onClick={() => setActiveTab('generate')}
            style={{
              padding: '12px 24px',
              background: activeTab === 'generate' ? '#1e3a5f' : 'transparent',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#e5e7eb',
              cursor: 'pointer'
            }}
          >
            🚀 Générer
          </button>
        </nav>

        {activeTab === 'list' && (
          <div>
            <h2>📚 Toutes les conversations</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  style={{
                    background: '#0b1220',
                    border: '1px solid #334155',
                    borderRadius: '12px',
                    padding: '20px',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedConv(conv)}
                >
                  <span style={{ fontSize: '28px' }}>{VOICE_CONFIG[conv.country]?.flag}</span>
                  <h3>{conv.title}</h3>
                  <p style={{ color: '#93a2b8' }}>{conv.country} • {conv.level}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'add' && (
          <div style={{ background: '#0b1220', border: '1px solid #334155', borderRadius: '12px', padding: '30px' }}>
            <h2>➕ Nouvelle conversation</h2>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>Titre</label>
              <input
                type="text"
                value={newConv.title}
                onChange={(e) => setNewConv({ ...newConv, title: e.target.value })}
                placeholder="Ex: Au restaurant"
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#1e3a5f',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#e5e7eb'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px' }}>Pays</label>
                <select
                  value={newConv.country}
                  onChange={(e) => setNewConv({ ...newConv, country: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: '#1e3a5f',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#e5e7eb'
                  }}
                >
                  {Object.keys(VOICE_CONFIG).map(country => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px' }}>Niveau</label>
                <select
                  value={newConv.level}
                  onChange={(e) => setNewConv({ ...newConv, level: e.target.value })}
                  style={{
                    width: '100%',
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
            </div>

            <h3>Répliques</h3>
            {newConv.lines.map((line, index) => (
              <div key={index} style={{ background: '#1e3a5f', padding: '20px', borderRadius: '8px', marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <strong>Réplique {index + 1}</strong>
                  {newConv.lines.length > 1 && (
                    <button
                      onClick={() => removeLine(index)}
                      style={{
                        padding: '4px 12px',
                        background: '#7f1d1d',
                        border: 'none',
                        borderRadius: '6px',
                        color: '#e5e7eb',
                        cursor: 'pointer'
                      }}
                    >
                      Supprimer
                    </button>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                  <input
                    type="text"
                    value={line.speaker}
                    onChange={(e) => updateLine(index, 'speaker', e.target.value)}
                    placeholder="Nom"
                    style={{
                      padding: '10px',
                      background: '#0b1220',
                      border: '1px solid #334155',
                      borderRadius: '6px',
                      color: '#e5e7eb'
                    }}
                  />

                  <select
                    value={line.gender}
                    onChange={(e) => updateLine(index, 'gender', e.target.value)}
                    style={{
                      padding: '10px',
                      background: '#0b1220',
                      border: '1px solid #334155',
                      borderRadius: '6px',
                      color: '#e5e7eb'
                    }}
                  >
                    <option value="homme">Homme</option>
                    <option value="femme">Femme</option>
                  </select>
                </div>

                <textarea
                  value={line.text}
                  onChange={(e) => updateLine(index, 'text', e.target.value)}
                  placeholder="Texte en espagnol"
                  rows={2}
                  style={{
                    width: '100%',
                    padding: '10px',
                    background: '#0b1220',
                    border: '1px solid #334155',
                    borderRadius: '6px',
                    color: '#e5e7eb',
                    resize: 'vertical'
                  }}
                />
              </div>
            ))}

            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              <button
                onClick={addLine}
                style={{
                  flex: 1,
                  padding: '15px',
                  background: '#334155',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#e5e7eb',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                ➕ Ajouter une réplique
              </button>

              <button
                onClick={saveNewConversation}
                style={{
                  flex: 2,
                  padding: '15px',
                  background: '#10b981',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                💾 Sauvegarder
              </button>
            </div>
          </div>
        )}

        {activeTab === 'generate' && (
          <div>
            <h2>🚀 Générer les audios</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  style={{
                    background: '#0b1220',
                    border: '1px solid #334155',
                    borderRadius: '12px',
                    padding: '20px'
                  }}
                >
                  <span style={{ fontSize: '28px' }}>{VOICE_CONFIG[conv.country]?.flag}</span>
                  <h3>{conv.title}</h3>
                  <p style={{ color: '#93a2b8' }}>{conv.country} • {conv.lines.length} répliques</p>

                  <button
                    onClick={() => generateAudios(conv)}
                    disabled={generating}
                    style={{
                      width: '100%',
                      padding: '12px',
                      marginTop: '15px',
                      background: generating ? '#334155' : '#10b981',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                      cursor: generating ? 'not-allowed' : 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    {generating ? '⏳ En cours...' : '🚀 Générer'}
                  </button>
                </div>
              ))}
            </div>

            {generating && (
              <div style={{ marginTop: '30px', padding: '30px', background: '#0b1220', borderRadius: '12px' }}>
                <h3>⏳ Génération en cours...</h3>
                <p style={{ fontSize: '18px', color: '#60a5fa' }}>
                  {generationProgress.current} / {generationProgress.total}
                </p>
                <div style={{ width: '100%', height: '20px', background: '#1e3a5f', borderRadius: '10px', overflow: 'hidden', marginTop: '15px' }}>
                  <div style={{
                    width: `${(generationProgress.current / generationProgress.total) * 100}%`,
                    height: '100%',
                    background: '#10b981',
                    transition: 'width 0.3s'
                  }} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
            }
