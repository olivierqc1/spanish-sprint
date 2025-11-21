'use client';

import { useState } from 'react';

export default function TestAudio() {
  const [text, setText] = useState('Hola, ¿cómo estás?');
  const [country, setCountry] = useState('Espagne');
  const [gender, setGender] = useState('femme');
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [error, setError] = useState('');

  const generateAudio = async () => {
    setLoading(true);
    setError('');
    setAudioUrl('');

    try {
      const filename = `test-${Date.now()}.mp3`;
      
      const response = await fetch('/api/generate-audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, country, gender, filename })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur de génération');
      }

      setAudioUrl(data.url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6">🎵 Test Génération Audio</h1>

        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-2">Texte en espagnol</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full border rounded-lg p-3 h-24"
              placeholder="Écris quelque chose en espagnol..."
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Pays</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border rounded-lg p-3"
            >
              <option>Espagne</option>
              <option>Mexique</option>
              <option>Argentine</option>
              <option>Colombie</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2">Voix</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border rounded-lg p-3"
            >
              <option value="femme">Féminine</option>
              <option value="homme">Masculine</option>
            </select>
          </div>

          <button
            onClick={generateAudio}
            disabled={loading || !text}
            className="w-full bg-blue-600 text-white rounded-lg p-3 font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? '⏳ Génération en cours...' : '🎙️ Générer l\'audio'}
          </button>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              ❌ {error}
            </div>
          )}

          {audioUrl && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded space-y-3">
              <p className="font-medium">✅ Audio généré avec succès !</p>
              <audio controls className="w-full" src={audioUrl}>
                Ton navigateur ne supporte pas l'audio.
              </audio>
              
                href={audioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                🔗 Ouvrir le lien direct
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}