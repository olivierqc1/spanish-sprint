// src/components/audio/SetupWizard.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { apiKeySchema } from '@/lib/validations';
import { notify } from '@/lib/notifications';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface SetupWizardProps {
  onComplete: () => void;
}

type ValidationStatus = 'idle' | 'validating' | 'valid' | 'invalid';

export function SetupWizard({ onComplete }: SetupWizardProps) {
  const [step, setStep] = useState(1);
  const [apiKey, setApiKey] = useState('');
  const [apiKeyError, setApiKeyError] = useState('');
  const [validationStatus, setValidationStatus] = useState<ValidationStatus>('idle');

  // Validation en temps réel
  useEffect(() => {
    if (!apiKey) {
      setValidationStatus('idle');
      setApiKeyError('');
      return;
    }

    const timer = setTimeout(() => {
      validateApiKey(apiKey);
    }, 500);

    return () => clearTimeout(timer);
  }, [apiKey]);

  const validateApiKey = async (key: string) => {
    setValidationStatus('validating');
    
    try {
      // Validation du format
      apiKeySchema.parse(key);
      
      // Test de connexion à l'API Google
      const response = await fetch(
        `https://texttospeech.googleapis.com/v1/voices?key=${key}`,
        { method: 'GET' }
      );

      if (response.ok) {
        setValidationStatus('valid');
        setApiKeyError('');
      } else {
        setValidationStatus('invalid');
        setApiKeyError('Clé API invalide ou permissions insuffisantes');
      }
    } catch (error: any) {
      setValidationStatus('invalid');
      setApiKeyError(error.errors?.[0]?.message || 'Format de clé invalide');
    }
  };

  const handleSave = () => {
    if (validationStatus !== 'valid') {
      notify.error('Clé API invalide');
      return;
    }

    localStorage.setItem('google_cloud_api_key', apiKey);
    notify.success('✅ Configuration sauvegardée !');
    onComplete();
  };

  const getInputBorderColor = () => {
    switch (validationStatus) {
      case 'validating': return 'border-blue-500';
      case 'valid': return 'border-green-500';
      case 'invalid': return 'border-red-500';
      default: return 'border-slate-700';
    }
  };

  const getValidationIcon = () => {
    switch (validationStatus) {
      case 'validating': 
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'valid': 
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'invalid': 
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: 
        return null;
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Configuration Google Cloud TTS</h2>
        <div className="flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full transition-colors ${
                s <= step ? 'bg-blue-500' : 'bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <Card variant="primary">
            <h3 className="font-semibold mb-3">📝 Étape 1/3 - Accès Google Cloud</h3>
            <ol className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">1</span>
                <div>
                  <p>Ouvre <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">console.cloud.google.com</a></p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">2</span>
                <p>Connecte-toi avec ton compte Google</p>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">3</span>
                <p>Accepte les conditions d'utilisation si demandé</p>
              </li>
            </ol>
          </Card>

          <div className="bg-blue-950/30 border border-blue-800 rounded-lg p-4">
            <p className="text-sm text-blue-200">
              💡 <strong>Astuce :</strong> Si tu n'as pas de compte Google Cloud, tu peux en créer un gratuitement. 
              Google offre 300$ de crédits pour débuter !
            </p>
          </div>

          <Button onClick={() => setStep(2)} className="w-full" size="lg">
            Suivant : Activer l'API →
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <Card variant="primary">
            <h3 className="font-semibold mb-3">🔌 Étape 2/3 - Activer l'API</h3>
            <ol className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">1</span>
                <p>Dans la barre de recherche en haut, tape <code className="bg-slate-900 px-2 py-1 rounded">Text-to-Speech API</code></p>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">2</span>
                <p>Clique sur le résultat <strong>"Cloud Text-to-Speech API"</strong></p>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">3</span>
                <p>Clique sur le bouton bleu <strong>"ACTIVER"</strong></p>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">4</span>
                <p>Attends 30 secondes que l'activation soit complète ⏳</p>
              </li>
            </ol>
          </Card>

          <div className="bg-yellow-950/30 border border-yellow-800 rounded-lg p-4">
            <p className="text-sm text-yellow-200">
              ⚠️ <strong>Important :</strong> L'activation peut prendre jusqu'à 1 minute. 
              Si tu vois "API enabled", c'est bon !
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setStep(1)} className="flex-1">
              ← Retour
            </Button>
            <Button onClick={() => setStep(3)} className="flex-[2]">
              Suivant : Créer la clé →
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <Card variant="primary">
            <h3 className="font-semibold mb-3">🔑 Étape 3/3 - Créer la clé API</h3>
            <ol className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">1</span>
                <p>Dans le menu de gauche, va dans <strong>"APIs & Services"</strong> → <strong>"Credentials"</strong></p>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">2</span>
                <p>Clique sur <strong>"+ CREATE CREDENTIALS"</strong> en haut</p>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">3</span>
                <p>Sélectionne <strong>"API Key"</strong></p>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">4</span>
                <p>Copie la clé qui apparaît (elle commence par <code>AIza...</code>)</p>
              </li>
            </ol>
          </Card>

          <div>
            <label className="block text-sm mb-2 font-medium">
              Colle ta clé API ici :
            </label>
            <div className="relative">
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className={`
                  w-full px-4 py-3 pr-12 rounded-lg
                  bg-slate-900 text-slate-100
                  border-2 transition-all
                  ${getInputBorderColor()}
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50
                `}
                aria-invalid={validationStatus === 'invalid'}
                aria-describedby={apiKeyError ? 'api-key-error' : undefined}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {getValidationIcon()}
              </div>
            </div>
            
            {validationStatus === 'validating' && (
              <p className="text-blue-400 text-sm mt-2">
                🔍 Validation en cours...
              </p>
            )}
            
            {validationStatus === 'valid' && (
              <p className="text-green-400 text-sm mt-2">
                ✅ Clé API valide !
              </p>
            )}
            
            {apiKeyError && (
              <p id="api-key-error" className="text-red-400 text-sm mt-2">
                ❌ {apiKeyError}
              </p>
            )}
          </div>

          <Card variant="primary" className="text-sm">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔒</span>
              <div>
                <p className="font-semibold mb-1">Sécurité de ta clé API</p>
                <ul className="space-y-1 text-slate-300">
                  <li>• Stockée localement dans ton navigateur uniquement</li>
                  <li>• Jamais envoyée à nos serveurs</li>
                  <li>• Pense à restreindre les permissions dans Google Cloud</li>
                  <li>• Révoque-la si tu penses qu'elle a été compromise</li>
                </ul>
              </div>
            </div>
          </Card>

          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setStep(2)} className="flex-1">
              ← Retour
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={validationStatus !== 'valid'}
              className="flex-[2]"
            >
              💾 Sauvegarder et commencer
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}