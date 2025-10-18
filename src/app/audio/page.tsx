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
      { text: "Dame dos kilos, por favor. ¿Y los mangos?", speaker: "Cliente", gender: "homme" },
      { text: "Los mangos están a veinte pesos el kilo.", speaker: "Vendedor", gender: "homme" },
    ]
  }
];

const VOICE_CONFIG: Record<string, { homme: string; femme: string; flag: string }> = {
  "Espagne": { homme: "es-ES-Standard-B", femme: "es-ES-Standard-A", flag: "🇪🇸" },
  "Mexique": { homme: "es-MX-Standard-B", femme: "es-MX-Standard-A", flag: "🇲🇽" },
  "Argentine": { homme: "es-ES-Standard-B", femme: "es-ES-Standard-A", flag: "🇦🇷" },
  "Colombie": { homme: "es-CO-Standard-B", femme: "es-CO-Standard-A", flag: "🇨🇴" }
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
            🎙️ Gestionnaire Audio - Spanish Sprint
          </h1>
          <p style={{ color: '#93a2b8' }}>
            Ajoute et génère des audios de conversations facilement
          </p>
        </header>

        <nav style={{ 
          display: 'flex', 
          gap: '10px', 
          marginBottom: '30px',
          borderBottom: '1px solid #1f2a37',
          paddingBottom: '10px'
        }}>
          <button
            onClick={() => setActiveTab('list')}
            style={{
              padding: '12px 24px',
              background: activeTab === 'list' ? '#1e3a5f' : 'transparent',
              border: activeTab === 'list' ? '2px solid #60a5fa' : '1px solid #334155',
              borderRadius: '8px',
              color: '#e5e7eb',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            📋 Mes Conversations ({conversations.length})
          </button>
          <button
            onClick={() => setActiveTab('add')}
            style={{
              padding: '12px 24px',
              background: activeTab === 'add' ? '#1e3a5f' : 'transparent',
              border: activeTab === 'add' ? '2px solid #60a5fa' : '1px solid #334155',
              borderRadius: '8px',
              color: '#e5e7eb',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            ➕ Ajouter
          </button>
          <button
            onClick={() => setActiveTab('generate')}
            style={{
              padding: '12px 24px',
              background: activeTab === 'generate' ? '#1e3a5f' : 'transparent',
              border: activeTab === 'generate' ? '2px solid #60a5fa' : '1px solid #334155',
              borderRadius: '8px',
              color: '#e5e7eb',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            🚀 Générer
          </button>
        </nav>

        {activeTab === 'list' && (
          <div>
            <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>
              📚 Toutes les conversations
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  style={{
                    background: '#0b1220',
                    border: '1px solid #334155',
                    borderRadius: '12px',
                    padding: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onClick={() => setSelectedConv(conv)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontSize: '28px' }}>
                      {VOICE_CONFIG[conv.country]?.flag}
                    </span>
                    <span style={{
                      padding: '4px 10px',
                      background: '#1e3a5f',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: '#60a5fa'
                    }}>
                      {conv.level}
                    </span>
                  </div>
                  <h3 style={{ margin: '10px 0', fontSize: '18px' }}>{conv.title}</h3>
                  <p style={{ color: '#93a2b8', fontSize: '14px', margin: '5px 0' }}>
                    {conv.country}
                  </p>
                  <p style={{ color: '#93a2b8', fontSize: '14px', margin: 0 }}>
                    {conv.lines.length} répliques
                  </p>
                </div>
              ))}
            </div>

            {selectedConv && (
              <div style={{
                marginTop: '30px',
                background: '#0b1220',
                border: '1px solid #334155',
                borderRadius: '12px',
                padding: '30px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '22px', margin: 0 }}>
                    {VOICE_CONFIG[selectedConv.country]?.flag} {selectedConv.title}
                  </h3>
                  <button
                    onClick={() => setSelectedConv(null)}
                    style={{
                      padding: '8px 16px',
                      background: '#334155',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#e5e7eb',
                      cursor: 'pointer'
                    }}
                  >
                    ✕ Fermer
                  </button>
                </div>

                {selectedConv.lines.map((line: any, idx: number) => (
                  <div
                    key={idx}
                    style={{
                      padding: '15px',
                      background: '#1e3a5f',
                      borderRadius: '8px',
                      marginBottom: '10px',
                      borderLeft: '4px solid #60a5fa'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <strong style={{ color: '#60a5fa' }}>
                        {line.speaker || `Speaker ${idx + 1}`}
                      </strong>
                      <span style={{ fontSize: '12px', color: '#93a2b8' }}>
                        {line.gender === 'homme' ? '♂️' : '♀️'}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '16px' }}>{line.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'add' && (
          <div style={{
            background: '#0b1220',
            border: '1px solid #334155',
            borderRadius: '12px',
            padding: '30px'
          }}>
            <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>
              ➕ Nouvelle conversation
            </h2>

            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#93a2b8' }}>
                Titre de la conversation
              </label>
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
                  color: '#e5e7eb',
                  fontSize: '16px'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#93a2b8' }}>
                  Pays
                </label>
                <select
                  value={newConv.country}
                  onChange={(e) => setNewConv({ ...newConv, country: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: '#1e3a5f',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#e5e7eb',
                    fontSize: '16px'
                  }}
                >
                  {Object.keys(VOICE_CONFIG).map(country => (
                    <option key={country} value={country}>
                      {VOICE_CONFIG[country].flag} {country}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#93a2b8' }}>
                  Niveau
                </label>
                <select
                  value={newConv.level}
                  onChange={(e) => setNewConv({ ...newConv, level: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: '#1e3a5f',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#e5e7eb',
                    fontSize: '16px'
                  }}
                >
                  <option value="A1">A1 - Débutant</option>
                  <option value="A2">A2 - Élémentaire</option>
                  <option value="B1">B1 - Intermédiaire</option>
                  <option value="B2">B2 - Avancé</option>
                </select>
              </div>
            </div>

            <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Répliques</h3>
            {newConv.lines.map((line, index) => (
              <div
                key={index}
                style={{
                  background: '#1e3a5f',
                  padding: '20px',
                  borderRadius: '8px',
                  marginBottom: '15px',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <strong style={{ color: '#60a5fa' }}>Réplique {index + 1}</strong>
                  {newConv.lines.length > 1 && (
                    <button
                      onClick={() => removeLine(index)}
                      style={{
                        padding: '4px 12px',
                        background: '#7f1d1d',
                        border: 'none',
                        borderRadius: '6px',
                        color: '#e5e7eb',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      🗑️ Supprimer
                    </button>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#93a2b8', fontSize: '14px' }}>
                      Nom du personnage
                    </label>
                    <input
                      type="text"
                      value={line.speaker}
                      onChange={(e) => updateLine(index, 'speaker', e.target.value)}
                      placeholder="Ex: Carlos"
                      style={{
                        width: '100%',
                        padding: '10px',
                        background: '#0b1220',
                        border: '1px solid #334155',
                        borderRadius: '6px',
                        color: '#e5e7eb'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#93a2b8', fontSize: '14px' }}>
                      Genre
                    </label>
                    <select
                      value={line.gender}
                      onChange={(e) => updateLine(index, 'gender', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        background: '#0b1220',
                        border: '1px solid #334155',
                        borderRadius: '6px',
                        color: '#e5e7eb'
                      }}
                    >
                      <option value="homme">♂️ Homme</option>
                      <option value="femme">♀️ Femme</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#93a2b8', fontSize: '14px' }}>
                    Texte en espagnol
                  </label>
                  <textarea
                    value={line.text}
                    onChange={(e) => updateLine(index, 'text', e.target.value)}
                    placeholder="Hola, ¿cómo estás?"
                    rows={2}
                    style={{
                      width: '100%',
                      padding: '10px',
                      background: '#0b1220',
                      border: '1px solid #334155',
                      borderRadius: '6px',
                      color: '#e5e7eb',
                      fontSize: '16px',
                      resize: 'vertical'
                    }}
                  />
                </div>
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
                  fontSize: '16px',
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
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                💾 Sauvegarder la conversation
              </button>
            </div>
          </div>
        )}

        {activeTab === 'generate' && (
          <div>
            <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>
              🚀 Générer les audios
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
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
                  <div style={{ marginBottom: '15px' }}>
                    <span style={{ fontSize: '28px' }}>
                      {VOICE_CONFIG[
