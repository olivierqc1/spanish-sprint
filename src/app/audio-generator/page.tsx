import { useState } from 'react';

// Données des conversations à générer
const CONVERSATIONS = [
  {
    id: "conv_es_a1_cafe",
    country: "Espagne",
    level: "A1",
    title: "Au café",
    lines: [
      { speaker: "A", gender: "homme", text: "Hola María, ¿cómo estás?" },
      { speaker: "B", gender: "femme", text: "Muy bien, gracias. ¿Y tú?" },
      { speaker: "A", gender: "homme", text: "Bien también. ¿Qué vas a tomar?" },
      { speaker: "B", gender: "femme", text: "Un café con leche y un croissant, por favor." },
      { speaker: "A", gender: "homme", text: "Para mí, un zumo de naranja." },
    ]
  },
  {
    id: "conv_mx_a1_mercado",
    country: "Mexique",
    level: "A1",
    title: "Au marché",
    lines: [
      { speaker: "A", gender: "homme", text: "Buenos días. ¿Cuánto cuestan los aguacates?" },
      { speaker: "B", gender: "homme", text: "Treinta pesos el kilo, güerito." },
      { speaker: "A", gender: "homme", text: "Dame dos kilos, por favor. ¿Y los mangos?" },
      { speaker: "B", gender: "homme", text: "Los mangos están a veinte pesos el kilo." },
      { speaker: "A", gender: "homme", text: "Perfecto, un kilo de mangos también." },
    ]
  },
  {
    id: "conv_es_a2_hotel",
    country: "Espagne",
    level: "A2",
    title: "Réservation d'hôtel",
    lines: [
      { speaker: "A", gender: "femme", text: "Hotel Sol y Mar, buenas tardes." },
      { speaker: "B", gender: "homme", text: "Buenas tardes. Quería reservar una habitación para el fin de semana." },
      { speaker: "A", gender: "femme", text: "Perfecto. ¿Para cuántas personas?" },
      { speaker: "B", gender: "homme", text: "Para dos personas. Una habitación doble con vistas al mar, si es posible." },
    ]
  },
];

// Voix disponibles par pays
const VOICES = {
  "Espagne": {
    "homme": "es-ES-AlvaroNeural",
    "femme": "es-ES-ElviraNeural"
  },
  "Mexique": {
    "homme": "es-MX-JorgeNeural",
    "femme": "es-MX-DaliaNeural"
  },
  "Argentine": {
    "homme": "es-AR-TomasNeural",
    "femme": "es-AR-ElenaNeural"
  },
  "Colombie": {
    "homme": "es-CO-GonzaloNeural",
    "femme": "es-CO-SalomeNeural"
  }
};

export default function AudioGenerator() {
  const [selectedConv, setSelectedConv] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  // Fonction pour générer les audios
  const generateAudios = async (conversation) => {
    setGenerating(true);
    setError(null);
    setResults([]);
    setProgress({ current: 0, total: conversation.lines.length });

    try {
      const generatedFiles = [];

      for (let i = 0; i < conversation.lines.length; i++) {
        const line = conversation.lines[i];
        setProgress({ current: i + 1, total: conversation.lines.length });

        // Générer l'audio avec Web Speech API (alternative simple)
        const audio = await generateAudioSimple(line.text, conversation.country, line.gender);
        
        generatedFiles.push({
          text: line.text,
          speaker: line.speaker,
          audio: audio
        });
      }

      setResults(generatedFiles);
      alert(`✅ ${generatedFiles.length} audios générés avec succès !`);
    } catch (err) {
      setError(err.message);
      alert(`❌ Erreur : ${err.message}`);
    } finally {
      setGenerating(false);
    }
  };

  // Génération audio simple avec Web Speech API
  const generateAudioSimple = async (text, country, gender) => {
    return new Promise((resolve, reject) => {
      if (!('speechSynthesis' in window)) {
        reject(new Error('Votre navigateur ne supporte pas la synthèse vocale'));
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Configurer la voix
      const voices = window.speechSynthesis.getVoices();
      const spanishVoice = voices.find(v => v.lang.startsWith('es'));
      if (spanishVoice) utterance.voice = spanishVoice;
      
      utterance.lang = 'es-ES';
      utterance.rate = 0.9;
      utterance.pitch = gender === 'femme' ? 1.2 : 0.9;

      utterance.onend = () => resolve({ success: true });
      utterance.onerror = (err) => reject(err);

      window.speechSynthesis.speak(utterance);
    });
  };

  // Télécharger tous les résultats
  const downloadAllResults = () => {
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `results_${selectedConv?.id}.json`;
    link.click();
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '30px', textAlign: 'center' }}>
        🎙️ Générateur d'Audios de Conversations
      </h1>

      {/* Sélection de conversation */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>
          1️⃣ Choisir une conversation
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {CONVERSATIONS.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setSelectedConv(conv)}
              style={{
                padding: '20px',
                border: selectedConv?.id === conv.id ? '3px solid #007bff' : '2px solid #ddd',
                borderRadius: '12px',
                cursor: 'pointer',
                backgroundColor: selectedConv?.id === conv.id ? '#e7f3ff' : '#fff',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '24px' }}>
                  {conv.country === 'Espagne' ? '🇪🇸' : conv.country === 'Mexique' ? '🇲🇽' : '🌍'}
                </span>
                <span style={{ 
                  padding: '4px 12px', 
                  backgroundColor: '#007bff', 
                  color: 'white', 
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {conv.level}
                </span>
              </div>
              <h3 style={{ margin: '10px 0', fontSize: '18px' }}>{conv.title}</h3>
              <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                {conv.country} • {conv.lines.length} répliques
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Aperçu de la conversation sélectionnée */}
      {selectedConv && (
        <div style={{ marginBottom: '40px', padding: '30px', backgroundColor: '#f8f9fa', borderRadius: '12px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>
            2️⃣ Aperçu : {selectedConv.title}
          </h2>
          <div style={{ marginBottom: '20px' }}>
            {selectedConv.lines.map((line, idx) => (
              <div
                key={idx}
                style={{
                  padding: '15px',
                  backgroundColor: line.speaker === 'A' ? '#e3f2fd' : '#fff3e0',
                  borderRadius: '8px',
                  marginBottom: '10px',
                  borderLeft: `4px solid ${line.speaker === 'A' ? '#2196f3' : '#ff9800'}`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <strong style={{ color: line.speaker === 'A' ? '#1976d2' : '#f57c00' }}>
                    {line.speaker === 'A' ? '👤 Speaker A' : '👤 Speaker B'}
                  </strong>
                  <span style={{ fontSize: '12px', color: '#666' }}>
                    {line.gender === 'homme' ? '♂️ Homme' : '♀️ Femme'}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '16px' }}>{line.text}</p>
              </div>
            ))}
          </div>

          {/* Bouton de génération */}
          <button
            onClick={() => generateAudios(selectedConv)}
            disabled={generating}
            style={{
              width: '100%',
              padding: '20px',
              fontSize: '18px',
              fontWeight: 'bold',
              backgroundColor: generating ? '#ccc' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: generating ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {generating ? (
              <>
                ⏳ Génération en cours... {progress.current}/{progress.total}
              </>
            ) : (
              <>
                🚀 Générer les audios ({selectedConv.lines.length} fichiers)
              </>
            )}
          </button>
        </div>
      )}

      {/* Erreur */}
      {error && (
        <div style={{ padding: '20px', backgroundColor: '#f8d7da', borderRadius: '8px', marginBottom: '20px' }}>
          <strong style={{ color: '#721c24' }}>❌ Erreur :</strong>
          <p style={{ margin: '10px 0 0 0', color: '#721c24' }}>{error}</p>
        </div>
      )}

      {/* Résultats */}
      {results.length > 0 && (
        <div style={{ marginTop: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '20px', margin: 0 }}>
              3️⃣ Résultats ({results.length} audios générés)
            </h2>
            <button
              onClick={downloadAllResults}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              📥 Télécharger JSON
            </button>
          </div>

          <div style={{ backgroundColor: '#f8f9fa', borderRadius: '12px', padding: '20px' }}>
            {results.map((result, idx) => (
              <div
                key={idx}
                style={{
                  padding: '15px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  marginBottom: '10px',
                  border: '1px solid #ddd',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>{result.speaker}</strong>
                    <p style={{ margin: '5px 0 0 0', color: '#666' }}>{result.text}</p>
                  </div>
                  <span style={{ fontSize: '24px' }}>✅</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Guide d'utilisation */}
      <div style={{ marginTop: '60px', padding: '30px', backgroundColor: '#e7f3ff', borderRadius: '12px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>💡 Comment ça marche ?</h2>
        <ol style={{ lineHeight: '2', fontSize: '16px' }}>
          <li><strong>Choisir</strong> une conversation dans la liste ci-dessus</li>
          <li><strong>Vérifier</strong> l'aperçu des répliques</li>
          <li><strong>Cliquer</strong> sur "Générer les audios"</li>
          <li><strong>Attendre</strong> quelques secondes (les audios sont lus automatiquement)</li>
          <li><strong>Télécharger</strong> le fichier JSON avec les résultats</li>
        </ol>
        
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fff3cd', borderRadius: '8px' }}>
          <p style={{ margin: 0, fontSize: '14px' }}>
            ⚠️ <strong>Note :</strong> Cette version utilise la synthèse vocale de votre navigateur.
            Pour une meilleure qualité, vous pouvez utiliser le script Python avec Edge-TTS.
          </p>
        </div>
      </div>
    </div>
  );
}
