// src/components/audio/SetupWizard.tsx
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { apiKeySchema } from '@/lib/validations';
import { notify } from '@/lib/notifications';

interface SetupWizardProps {
  onComplete: () => void;
}

export function SetupWizard({ onComplete }: SetupWizardProps) {
  const [step, setStep] = useState(1);
  const [apiKey, setApiKey] = useState('');
  const [apiKeyError, setApiKeyError] = useState('');

  const validateAndSave = () => {
    setApiKeyError('');

    try {
      apiKeySchema.parse(apiKey);
      localStorage.setItem('google_cloud_api_key', apiKey);
      notify.success('✅ Configuration sauvegardée !');
      onComplete();
    } catch (error: any) {
      const errorMessage = error.errors?.[0]?.message || 'Clé API invalide';
      setApiKeyError(errorMessage);
      notify.error(errorMessage);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Configuration Google Cloud TTS</h2>

      {step === 1 && (
        <div className="space-y-6">
          <Card variant="primary">
            <h3 className="font-semibold mb-3">Étape 1/3 - Accès Google Cloud</h3>
            <ol className="space-y-2 text-sm">
              <li>1. Va sur <code className="bg-slate-900 px-2 py-1 rounded">console.cloud.google.com</code></li>
              <li>2. Connecte-toi avec ton compte Google</li>
              <li>3. Accepte les conditions d'utilisation</li>
            </ol>
          </Card>
          <Button onClick={() => setStep(2)} className="w-full" size="lg">
            Suivant →
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <Card variant="primary">
            <h3 className="font-semibold mb-3">Étape 2/3 - Activer l'API</h3>
            <ol className="space-y-2 text-sm">
              <li>1. Dans la barre de recherche, cherche "Text-to-Speech API"</li>
              <li>2. Clique sur le résultat "Cloud Text-to-Speech API"</li>
              <li>3. Clique sur le bouton "ACTIVER"</li>
              <li>4. Attends 30 secondes que l'activation soit complète</li>
            </ol>
          </Card>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setStep(1)}>
              ← Retour
            </Button>
            <Button onClick={() => setStep(3)} className="flex-1">
              Suivant →
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <Card variant="primary">
            <h3 className="font-semibold mb-3">Étape 3/3 - Créer la clé API</h3>
            <ol className="space-y-2 text-sm">
              <li>1. Dans le menu, va dans "Credentials" (Identifiants)</li>
              <li>2. Clique sur "CREATE CREDENTIALS" → "API Key"</li>
              <li>3. Copie la clé générée</li>
            </ol>
          </Card>

          <div>
            <label className="block text-sm mb-2 font-medium">
              Ta clé API Google Cloud :
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                setApiKeyError('');
              }}
              placeholder="AIzaSy..."
              className={`
                w-full px-4 py-3 rounded-lg
                bg-slate-900 text-slate-100
                border-2 transition-colors
                ${apiKeyError 
                  ? 'border-red-500 focus:border-red-400' 
                  : 'border-slate-700 focus:border-blue-500'
                }
                focus:outline-none
              `}
              aria-invalid={!!apiKeyError}
              aria-describedby={apiKeyError ? 'api-key-error' : undefined}
            />
            {apiKeyError && (
              <p id="api-key-error" className="text-red-400 text-sm mt-2">
                ❌ {apiKeyError}
              </p>
            )}
          </div>

          <Card variant="primary" className="text-sm">
            <p className="font-semibold mb-2">⚠️ Note de sécurité :</p>
            <p className="text-slate-300">
              Ta clé API est stockée localement dans ton navigateur. 
              Ne la partage jamais et révoque-la si tu penses qu'elle a été compromise.
            </p>
          </Card>

          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setStep(2)}>
              ← Retour
            </Button>
            <Button 
              onClick={validateAndSave} 
              disabled={!apiKey.trim()}
              className="flex-1"
            >
              💾 Sauvegarder et continuer
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}