// src/components/audio/ConversationForm.tsx (VERSION AVEC VALIDATION)
'use client';
import { useState } from 'react';
import { conversationSchema } from '@/lib/validations';
import { Conversation, ConversationLine } from '@/types/audio';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { notify } from '@/lib/notifications';
import { z } from 'zod';

interface ConversationFormProps {
  onSave: (conversation: Conversation) => void;
  countries: string[];
}

export function ConversationForm({ onSave, countries }: ConversationFormProps) {
  const [title, setTitle] = useState('');
  const [country, setCountry] = useState(countries[0] || 'Espagne');
  const [level, setLevel] = useState('A1');
  const [lines, setLines] = useState<ConversationLine[]>([
    { text: '', speaker: '', gender: 'homme' }
  ]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addLine = () => {
    setLines([...lines, { text: '', speaker: '', gender: 'homme' }]);
  };

  const updateLine = (index: number, field: keyof ConversationLine, value: string) => {
    const updated = [...lines];
    updated[index] = { ...updated[index], [field]: value };
    setLines(updated);
    
    // Clear error for this field
    if (errors[`lines.${index}.${field}`]) {
      const newErrors = { ...errors };
      delete newErrors[`lines.${index}.${field}`];
      setErrors(newErrors);
    }
  };

  const removeLine = (index: number) => {
    if (lines.length > 1) {
      setLines(lines.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = () => {
    // Clear previous errors
    setErrors({});

    const conversationData = {
      title,
      country,
      level,
      lines,
    };

    // Validate with Zod
    try {
      conversationSchema.parse(conversationData);
      
      const conversation: Conversation = {
        id: `manual_${Date.now()}`,
        ...conversationData,
      };

      onSave(conversation);
      
      // Reset
      setTitle('');
      setLines([{ text: '', speaker: '', gender: 'homme' }]);
      
      notify.success('✅ Conversation sauvegardée !');
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        
        error.errors.forEach((err) => {
          const path = err.path.join('.');
          newErrors[path] = err.message;
        });
        
        setErrors(newErrors);
        notify.error('⚠️ Veuillez corriger les erreurs dans le formulaire');
      }
    }
  };

  return (
    <Card>
      <h2 className="text-xl font-bold mb-6">✍️ Ajouter une conversation</h2>

      <div className="space-y-4">
        {/* Titre */}
        <div>
          <label className="block text-sm text-slate-400 mb-2">
            Titre de la conversation
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) {
                const newErrors = { ...errors };
                delete newErrors.title;
                setErrors(newErrors);
              }
            }}
            placeholder="Ex: Au restaurant"
            className={`w-full px-4 py-2 bg-slate-900 border rounded-lg text-slate-100 focus:outline-none ${
              errors.title 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-slate-700 focus:border-blue-500'
            }`}
          />
          {errors.title && (
            <p className="text-red-400 text-sm mt-1">❌ {errors.title}</p>
          )}
        </div>

        {/* Pays et Niveau */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Pays</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:border-blue-500 focus:outline-none"
            >
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Niveau</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:border-blue-500 focus:outline-none"
            >
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
            </select>
          </div>
        </div>

        {/* Lignes */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">Répliques</h3>
            {errors.lines && (
              <p className="text-red-400 text-sm">❌ {errors.lines}</p>
            )}
          </div>
          
          <div className="space-y-3">
            {lines.map((line, idx) => (
              <Card key={idx} variant="primary" className="relative">
                <div className="flex justify-between items-center mb-3">
                  <strong className="text-blue-400">Réplique {idx + 1}</strong>
                  {lines.length > 1 && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeLine(idx)}
                    >
                      🗑️
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Nom (ex: Carlos)"
                      value={line.speaker}
                      onChange={(e) => updateLine(idx, 'speaker', e.target.value)}
                      className={`w-full px-3 py-2 bg-slate-950 border rounded-lg text-slate-100 focus:outline-none ${
                        errors[`lines.${idx}.speaker`]
                          ? 'border-red-500'
                          : 'border-slate-700 focus:border-blue-500'
                      }`}
                    />
                    {errors[`lines.${idx}.speaker`] && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors[`lines.${idx}.speaker`]}
                      </p>
                    )}
                  </div>
                  
                  <select
                    value={line.gender}
                    onChange={(e) => updateLine(idx, 'gender', e.target.value as 'homme' | 'femme')}
                    className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="homme">♂️ Homme</option>
                    <option value="femme">♀️ Femme</option>
                  </select>
                </div>

                <div>
                  <textarea
                    placeholder="Texte en espagnol..."
                    value={line.text}
                    onChange={(e) => updateLine(idx, 'text', e.target.value)}
                    rows={2}
                    className={`w-full px-3 py-2 bg-slate-950 border rounded-lg text-slate-100 focus:outline-none resize-none ${
                      errors[`lines.${idx}.text`]
                        ? 'border-red-500'
                        : 'border-slate-700 focus:border-blue-500'
                    }`}
                  />
                  {errors[`lines.${idx}.text`] && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors[`lines.${idx}.text`]}
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button variant="secondary" onClick={addLine} className="flex-1">
            ➕ Ajouter une réplique
          </Button>
          <Button variant="primary" onClick={handleSubmit} className="flex-[2]">
            💾 Sauvegarder
          </Button>
        </div>
      </div>
    </Card>
  );
                        }
