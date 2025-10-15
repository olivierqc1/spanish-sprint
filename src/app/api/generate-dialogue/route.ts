// Fichier : src/app/api/generate-dialogue/route.ts
// Cette API génère automatiquement des dialogues avec OpenAI/Claude

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { topic, country, level } = await request.json();

    // Validation
    if (!topic || !country || !level) {
      return NextResponse.json(
        { error: 'Paramètres manquants' },
        { status: 400 }
      );
    }

    // Prompt pour générer un dialogue naturel
    const prompt = `Génère un dialogue en espagnol authentique pour le thème "${topic}".

Contexte :
- Pays : ${country}
- Niveau CECRL : ${level}
- Utilise le vocabulaire et les expressions typiques de ${country}
- Adapte la complexité au niveau ${level}

Génère un dialogue avec 4-6 répliques alternant entre 2 personnes.

Réponds UNIQUEMENT avec ce format JSON (sans markdown) :
{
  "title": "Titre du dialogue en français",
  "lines": [
    {
      "text": "Texte en espagnol",
      "speaker": "Prénom local approprié",
      "gender": "homme" ou "femme"
    }
  ]
}

Exemple pour "Au café" en Espagne niveau A1 :
{
  "title": "Commander au café",
  "lines": [
    { "text": "Hola, buenos días", "speaker": "Carlos", "gender": "homme" },
    { "text": "Buenos días, ¿qué desea?", "speaker": "María", "gender": "femme" },
    { "text": "Un café con leche, por favor", "speaker": "Carlos", "gender": "homme" },
    { "text": "Aquí tiene. Son dos euros", "speaker": "María", "gender": "femme" }
  ]
}`;

    // Utiliser OpenAI ou Claude (selon ce que tu as)
    // Option 1 : OpenAI
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Tu es un expert en didactique des langues, spécialisé dans l\'enseignement de l\'espagnol. Tu crées des dialogues authentiques et pédagogiques.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7
      })
    });

    if (!openaiResponse.ok) {
      throw new Error('Erreur OpenAI API');
    }

    const openaiData = await openaiResponse.json();
    let content = openaiData.choices[0].message.content;

    // Nettoyer les backticks markdown si présents
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    // Parser le JSON
    const dialogue = JSON.parse(content);

    return NextResponse.json(dialogue);

  } catch (error: any) {
    console.error('Erreur génération dialogue:', error);
    
    // Fallback : générer un dialogue simple
    return NextResponse.json({
      title: `Dialogue : ${request.json().then(d => d.topic)}`,
      lines: [
        {
          text: "Hola, ¿cómo estás?",
          speaker: "Speaker A",
          gender: "homme"
        },
        {
          text: "Muy bien, gracias. ¿Y tú?",
          speaker: "Speaker B",
          gender: "femme"
        }
      ]
    });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'online',
    message: 'API de génération de dialogues active'
  });
}
