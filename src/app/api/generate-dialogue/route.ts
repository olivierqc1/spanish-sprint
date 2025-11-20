// src/app/api/generate-dialogue/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { config } from '/lib/config';

const requestSchema = z.object({
  topic: z.string().min(3).max(100),
  country: z.string(),
  level: z.enum(['A1', 'A2', 'B1', 'B2']),
});

const COUNTRY_EXAMPLES: Record<string, { names: string[], vocab: string[] }> = {
  'Espagne': {
    names: ['Carlos', 'María', 'Javier', 'Ana', 'Pablo', 'Laura'],
    vocab: ['tío', 'vale', 'guay', 'chaval', 'piso', 'móvil'],
  },
  'Mexique': {
    names: ['Juan', 'Sofía', 'Miguel', 'Lucía', 'Diego', 'Fernanda'],
    vocab: ['güey', 'chido', 'ahorita', 'camión', 'platicar', 'celular'],
  },
  'Argentine': {
    names: ['Mateo', 'Valentina', 'Santiago', 'Emma', 'Benjamín', 'Martina'],
    vocab: ['che', 'boludo', 'colectivo', 'subte', 'pibe', 'departamento'],
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = requestSchema.parse(body);
    const { topic, country, level } = validatedData;

    if (!config.openai.apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const countryData = COUNTRY_EXAMPLES[country] || COUNTRY_EXAMPLES['Espagne'];

    const prompt = `Génère un dialogue authentique en espagnol pour le thème "${topic}".

CONTEXTE :
- Pays : ${country}
- Niveau CECRL : ${level}
- Utilise le vocabulaire et les expressions typiques de ${country}
- Adapte la complexité grammaticale au niveau ${level}
- Noms typiques : ${countryData.names.join(', ')}
- Expressions locales à intégrer si possible : ${countryData.vocab.join(', ')}

CONSIGNES :
- 4 à 6 répliques alternant entre 2 personnes
- Utilise des prénoms locaux appropriés
- Rends le dialogue naturel et conversationnel
- ${level === 'A1' ? 'Phrases simples, présent de l\'indicatif' : ''}
- ${level === 'A2' ? 'Présent + passé composé, connecteurs basiques' : ''}
- ${level === 'B1' ? 'Tous les temps, subjonctif si nécessaire' : ''}

RÉPONDS UNIQUEMENT avec ce JSON (PAS de markdown) :
{
  "title": "Titre court en français",
  "lines": [
    {
      "text": "Texte en espagnol",
      "speaker": "Prénom local",
      "gender": "homme" ou "femme"
    }
  ]
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.openai.apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Tu es un expert en didactique des langues, spécialisé dans la création de dialogues pédagogiques en espagnol. Tu réponds TOUJOURS en JSON valide, sans markdown.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `OpenAI API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`
      );
    }

    const data = await response.json();
    let content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No content in OpenAI response');
    }

    // Clean markdown if present
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    // Parse JSON
    const dialogue = JSON.parse(content);

    // Validate structure
    if (!dialogue.title || !Array.isArray(dialogue.lines) || dialogue.lines.length === 0) {
      throw new Error('Invalid dialogue structure');
    }

    return NextResponse.json(dialogue);

  } catch (error) {
    console.error('Error generating dialogue:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON response from AI' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'online',
    message: 'API de génération de dialogues active',
    models: ['gpt-4o-mini'],
  });
}
