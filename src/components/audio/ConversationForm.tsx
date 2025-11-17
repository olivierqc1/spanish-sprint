// src/components/audio/ConversationForm.tsx
'use client';

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { conversationSchema } from '@/lib/validations';
import { Conversation, ConversationLine } from '@/types/audio';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { notify } from '@/lib/notifications';
import { GripVertical, Trash2, Plus, Save } from 'lucide-react';
import { z } from 'zod';

interface ConversationFormProps {
  onSave: (conversation: Conversation) => void;
  countries: string[];
  initialData?: Conversation;
}

export function ConversationForm({ onSave, countries, initialData }: ConversationFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [country, setCountry] = useState(initialData?.country || countries[0] || 'Espagne');
  const [level, setLevel] = useState(initialData?.level || 'A1');
  const [lines, setLines] = useState<ConversationLine[]>(
    initialData?.lines || [{ text: '', speaker: '', gender: 'homme' }]
  );
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

  const duplicateLine = (index: number) => {
    const newLine = { ...lines[index] };
    const updated = [...lines];
    updated.splice(index + 1, 0, newLine);
    setLines(updated);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(lines);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setLines(items);
  };

  const handleSubmit = () => {
    setErrors({});

    const conversationData = {
      title,
      country,
      level,
      lines,
    };

    try {
      conversationSchema.parse(conversationData);
      
      const conversation: Conversation = {
        id: initialData?.id || `manual_${Date.now()}`,
        ...conversationData,
      };

      onSave(conversation);
      
      if (!initialData) {
        // Reset form
        setTitle('');
        setLines([{ text: '', speaker: '', gender: 'homme' }]);
      }
      
      notify.success(initialData ? '✅ Conversation mise à jour !' : '✅ Conversation créée !');
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        
        error.errors.forEach((err) => {
          const path = err.path.join('.');
          newErrors[path] = err.message;
        });
        
        setErrors(newErrors);
        notify.error('⚠️ Corrige les erreurs dans le formulaire');
      }
    }
  };

  const getCharacterCount = (text: string) => {
    return text.length;
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          {initialData ? '✏️ Modifier la conversation' : '✍️ Nouvelle conversation'}
        </h2>
        <Badge variant="default">{lines.length} réplique{lines.length > 1 ? 's' : ''}</Badge>
      </div>

      <div className="space-y-6">
        {/* Métadonnées */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-3">
            <label className="block text-sm text-slate-400 mb-2">
              Titre de la conversation *
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
              placeholder="Ex: Commander au restaurant"
              className={`
                w-full px-4 py-3 rounded-lg
                bg-slate-900 text-slate-100
                border-2 transition-colors
                ${errors.title ? 'border-red-500' : 'border-slate-700 focus:border-blue-500'}
                focus:outline-none
              `}
            />
            {errors.title && (
              <p className="text-red-400 text-sm mt-1">❌ {errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Pays *</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-900 border-2 border-slate-700 text-slate-100 focus:border-blue-500 focus:outline-none"
            >
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Niveau *</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-900 border-2 border-slate-700 text-slate-100 focus:border-blue-500 focus:outline-none"
            >
              <option value="A1">A1 - Débutant</option>
              <option value="A2">A2 - Élémentaire</option>
              <option value="B1">B1 - Intermédiaire</option>
              <option value="B2">B2 - Avancé</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Statistiques</label>
            <div className="flex gap-2">
              <Badge variant="default">
                {lines.reduce((acc, line) => acc + getWordCount(line.text), 0)} mots
              </Badge>
              <Badge variant="default">
                {lines.reduce((acc, line) => acc + getCharacterCount(line.text), 0)} chars
              </Badge>
            </div>
          </div>
        </div>

        {/* Répliques avec Drag & Drop */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Répliques</h3>
            {errors.lines && (
              <p className="text-red-400 text-sm">❌ {errors.lines}</p>
            )}
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="lines">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-3"
                >
                  {lines.map((line, idx) => (
                    <Draggable key={idx} draggableId={`line-${idx}`} index={idx}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <Card
                            variant="primary"
                            className={`relative ${
                              snapshot.isDragging ? 'shadow-2xl scale-105' : ''
                            } transition-all`}
                          >
                            {/* Drag Handle */}
                            <div
                              {...provided.dragHandleProps}
                              className="absolute left-2 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
                            >
                              <GripVertical className="w-5 h-5 text-slate-500" />
                            </div>

                            <div className="pl-8">
                              {/* Header */}
                              <div className="flex justify-between items-center mb-3">
                                <div className="flex items-center gap-2">
                                  <strong className="text-blue-400">Réplique {idx + 1}</strong>
                                  <Badge variant="default">
                                    {getWordCount(line.text)} mots
                                  </Badge>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => duplicateLine(idx)}
                                    title="Dupliquer"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </Button>
                                  {lines.length > 1 && (
                                    <Button
                                      variant="danger"
                                      size="sm"
                                      onClick={() => removeLine(idx)}
                                      title="Supprimer"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  )}
                                </div>
                              </div>

                              {/* Inputs */}
                              <div className="grid grid-cols-2 gap-3 mb-3">
                                <div>
                                  <input
                                    type="text"
                                    placeholder="Nom (ex: Carlos)"
                                    value={line.speaker}
                                    onChange={(e) => updateLine(idx, 'speaker', e.target.value)}
                                    className={`
                                      w-full px-3 py-2 rounded-lg
                                      bg-slate-950 text-slate-100
                                      border-2 transition-colors
                                      ${errors[`lines.${idx}.speaker`]
                                        ? 'border-red-500'
                                        : 'border-slate-700 focus:border-blue-500'
                                      }
                                      focus:outline-none
                                    `}
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
                                  className="px-3 py-2 rounded-lg bg-slate-950 border-2 border-slate-700 text-slate-100 focus:border-blue-500 focus:outline-none"
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
                                  className={`
                                    w-full px-3 py-2 rounded-lg
                                    bg-slate-950 text-slate-100
                                    border-2 transition-colors resize-none
                                    ${errors[`lines.${idx}.text`]
                                      ? 'border-red-500'
                                      : 'border-slate-700 focus:border-blue-500'
                                    }
                                    focus:outline-none
                                  `}
                                />
                                {errors[`lines.${idx}.text`] && (
                                  <p className="text-red-400 text-xs mt-1">
                                    {errors[`lines.${idx}.text`]}
                                  </p>
                                )}
                              </div>
                            </div>
                          </Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-slate-700">
          <Button
            variant="secondary"
            onClick={addLine}
            className="flex-1"
            disabled={lines.length >= 20}
          >
            <Plus className="w-5 h-5 mr-2" />
            Ajouter une réplique
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            className="flex-[2]"
          >
            <Save className="w-5 h-5 mr-2" />
            {initialData ? 'Mettre à jour' : 'Créer la conversation'}
          </Button>
        </div>

        {/* Tips */}
        <Card variant="primary" className="text-sm">
          <p className="font-semibold mb-2">💡 Conseils :</p>
          <ul className="space-y-1 text-slate-300">
            <li>• Glisse-dépose les répliques pour les réorganiser</li>
            <li>• Maximum 20 répliques par conversation</li>
            <li>• Utilise des noms typiques du pays choisi</li>
            <li>• Adapte la complexité au niveau CECRL sélectionné</li>
          </ul>
        </Card>
      </div>
    </Card>
  );
}