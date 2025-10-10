#!/usr/bin/env python3
"""
Script pour générer automatiquement les audios des conversations
avec Edge-TTS et les uploader sur Supabase

Installation:
pip install edge-tts supabase python-dotenv

Usage:
python generate_conversations.py
"""

import asyncio
import edge_tts
import os
import json
from pathlib import Path
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

# Configuration
SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Voix par pays et genre
VOICES = {
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
}

# Conversations à générer
CONVERSATIONS = [
    {
        "id": "conv_es_a1_cafe",
        "country": "Espagne",
        "lines": [
            {"speaker": "A", "gender": "homme", "text": "Hola María, ¿cómo estás?", "filename": "conv_es_a1_cafe_01.mp3"},
            {"speaker": "B", "gender": "femme", "text": "Muy bien, gracias. ¿Y tú?", "filename": "conv_es_a1_cafe_02.mp3"},
            {"speaker": "A", "gender": "homme", "text": "Bien también. ¿Qué vas a tomar?", "filename": "conv_es_a1_cafe_03.mp3"},
            {"speaker": "B", "gender": "femme", "text": "Un café con leche y un croissant, por favor.", "filename": "conv_es_a1_cafe_04.mp3"},
            {"speaker": "A", "gender": "homme", "text": "Para mí, un zumo de naranja.", "filename": "conv_es_a1_cafe_05.mp3"},
        ]
    },
    {
        "id": "conv_mx_a1_mercado",
        "country": "Mexique",
        "lines": [
            {"speaker": "A", "gender": "homme", "text": "Buenos días. ¿Cuánto cuestan los aguacates?", "filename": "conv_mx_a1_mercado_01.mp3"},
            {"speaker": "B", "gender": "homme", "text": "Treinta pesos el kilo, güerito.", "filename": "conv_mx_a1_mercado_02.mp3"},
            {"speaker": "A", "gender": "homme", "text": "Dame dos kilos, por favor. ¿Y los mangos?", "filename": "conv_mx_a1_mercado_03.mp3"},
            {"speaker": "B", "gender": "homme", "text": "Los mangos están a veinte pesos el kilo.", "filename": "conv_mx_a1_mercado_04.mp3"},
            {"speaker": "A", "gender": "homme", "text": "Perfecto, un kilo de mangos también.", "filename": "conv_mx_a1_mercado_05.mp3"},
        ]
    },
    {
        "id": "conv_es_a2_hotel",
        "country": "Espagne",
        "lines": [
            {"speaker": "A", "gender": "femme", "text": "Hotel Sol y Mar, buenas tardes.", "filename": "conv_es_a2_hotel_01.mp3"},
            {"speaker": "B", "gender": "homme", "text": "Buenas tardes. Quería reservar una habitación para el fin de semana.", "filename": "conv_es_a2_hotel_02.mp3"},
            {"speaker": "A", "gender": "femme", "text": "Perfecto. ¿Para cuántas personas?", "filename": "conv_es_a2_hotel_03.mp3"},
            {"speaker": "B", "gender": "homme", "text": "Para dos personas. Una habitación doble con vistas al mar, si es posible.", "filename": "conv_es_a2_hotel_04.mp3"},
            {"speaker": "A", "gender": "femme", "text": "Sí, tenemos disponibilidad. ¿Cuántas noches?", "filename": "conv_es_a2_hotel_05.mp3"},
            {"speaker": "B", "gender": "homme", "text": "Dos noches, del viernes al domingo.", "filename": "conv_es_a2_hotel_06.mp3"},
        ]
    }
]

async def generate_audio(text: str, voice: str, output_path: str):
    """Génère un fichier audio avec Edge-TTS"""
    try:
        communicate = edge_tts.Communicate(text, voice)
        await communicate.save(output_path)
        print(f"  ✅ Généré: {output_path}")
        return True
    except Exception as e:
        print(f"  ❌ Erreur génération: {e}")
        return False

async def upload_to_supabase(file_path: str, filename: str):
    """Upload le fichier vers Supabase Storage"""
    try:
        with open(file_path, 'rb') as f:
            data = supabase.storage.from_('audios').upload(
                filename, 
                f.read(),
                {"content-type": "audio/mpeg", "upsert": "true"}
            )
        
        # Obtenir l'URL publique
        url = supabase.storage.from_('audios').get_public_url(filename)
        print(f"  📤 Uploadé: {filename}")
        return url
    except Exception as e:
        print(f"  ⚠️ Erreur upload: {e}")
        return None

async def process_conversation(conversation: dict):
    """Traite une conversation complète"""
    print(f"\n{'='*60}")
    print(f"🎭 Conversation: {conversation['id']}")
    print(f"🌍 Pays: {conversation['country']}")
    print(f"{'='*60}")
    
    temp_dir = Path("temp_audios")
    temp_dir.mkdir(exist_ok=True)
    
    country_voices = VOICES[conversation['country']]
    results = []
    
    for line in conversation['lines']:
        print(f"\n🎙️ Ligne {line['filename']}:")
        print(f"   Speaker: {line['speaker']} ({line['gender']})")
        print(f"   Texte: {line['text']}")
        
        # Sélectionner la voix appropriée
        voice = country_voices[line['gender']]
        
        # Générer l'audio
        temp_path = temp_dir / line['filename']
        success = await generate_audio(line['text'], voice, str(temp_path))
        
        if success:
            # Upload vers Supabase
            url = await upload_to_supabase(str(temp_path), line['filename'])
            results.append({
                "filename": line['filename'],
                "url": url,
                "text": line['text']
            })
            
            # Supprimer le fichier temporaire
            temp_path.unlink()
    
    # Nettoyer
    if temp_dir.exists():
        try:
            temp_dir.rmdir()
        except:
            pass
    
    return results

async def main():
    """Point d'entrée principal"""
    print("🚀 Génération automatique des conversations")
    print(f"📦 Nombre de conversations: {len(CONVERSATIONS)}\n")
    
    all_results = {}
    
    for conv in CONVERSATIONS:
        results = await process_conversation(conv)
        all_results[conv['id']] = results
    
    # Sauvegarder les URLs générées
    output_file = Path("generated_urls.json")
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(all_results, f, indent=2, ensure_ascii=False)
    
    print(f"\n{'='*60}")
    print("✨ Génération terminée!")
    print(f"📄 URLs sauvegardées dans: {output_file}")
    print(f"{'='*60}")

if __name__ == "__main__":
    asyncio.run(main())
