// src/data/words/catalan/A2_phrases.ts
// Phrases catalanes à pratiquer (prononciation). Même forme que les cartes de mots :
// front = catalan (ce qu'on prononce), back = français.
// POUR AJOUTER DES PHRASES : ajoute un objet dans le bon bloc de catégorie.

import { CatalanCard } from './A2_notebook';

export const catalanPhraseCards: CatalanCard[] = [

  // ─── QUOTIDIEN (café, métro, magasins) ────────────────────────────
  { id: 'cat-ph-001', front: 'Un cafè amb llet, si us plau.', back: "Un café au lait, s'il vous plaît.", level: 'A2', country: 'catalonia', category: 'frases-quotidien' },
  { id: 'cat-ph-002', front: 'Quant costa això?', back: 'Combien ça coûte?', level: 'A2', country: 'catalonia', category: 'frases-quotidien' },
  { id: 'cat-ph-003', front: 'On és la parada de metro més propera?', back: 'Où est la station de métro la plus proche?', level: 'A2', country: 'catalonia', category: 'frases-quotidien' },
  { id: 'cat-ph-004', front: 'Perdoni, que parla català?', back: 'Excusez-moi, parlez-vous catalan?', level: 'A2', country: 'catalonia', category: 'frases-quotidien' },
  { id: 'cat-ph-005', front: 'Que em pot fer un descompte?', back: 'Pouvez-vous me faire un rabais?', level: 'A2', country: 'catalonia', category: 'frases-quotidien' },
  { id: 'cat-ph-006', front: 'Voldria pagar amb targeta.', back: 'Je voudrais payer par carte.', level: 'A2', country: 'catalonia', category: 'frases-quotidien' },
  { id: 'cat-ph-007', front: 'A quina hora tanqueu?', back: 'À quelle heure fermez-vous?', level: 'A2', country: 'catalonia', category: 'frases-quotidien' },
  { id: 'cat-ph-008', front: 'Em pots ajudar, si us plau?', back: "Peux-tu m'aider, s'il te plaît?", level: 'A2', country: 'catalonia', category: 'frases-quotidien' },
  { id: 'cat-ph-009', front: 'No ho entenc, ho pots repetir?', back: 'Je ne comprends pas, peux-tu répéter?', level: 'A2', country: 'catalonia', category: 'frases-quotidien' },
  { id: 'cat-ph-010', front: 'Estic buscant la Sagrada Família.', back: 'Je cherche la Sagrada Família.', level: 'A2', country: 'catalonia', category: 'frases-quotidien' },

  // ─── AVEC LE VOCAB (roba, casa, verbs) ────────────────────────────
  { id: 'cat-ph-011', front: "M'he emprovat una samarreta i uns texans.", back: "J'ai essayé un t-shirt et des jeans.", level: 'A2', country: 'catalonia', category: 'frases-vocab' },
  { id: 'cat-ph-012', front: 'La rentadora és al safareig.', back: 'La laveuse est dans la salle de lavage.', level: 'A2', country: 'catalonia', category: 'frases-vocab' },
  { id: 'cat-ph-013', front: 'He posat les sabates a sota del llit.', back: 'J\'ai mis les souliers sous le lit.', level: 'A2', country: 'catalonia', category: 'frases-vocab' },
  { id: 'cat-ph-014', front: 'El menjador té un balcó assolellat.', back: 'La salle à manger a un balcon ensoleillé.', level: 'A2', country: 'catalonia', category: 'frases-vocab' },
  { id: 'cat-ph-015', front: "Avui m'he llevat d'hora per anar a córrer.", back: 'Aujourd\'hui je me suis levé tôt pour aller courir.', level: 'A2', country: 'catalonia', category: 'frases-vocab' },
  { id: 'cat-ph-016', front: 'Fa fred, agafa la bufanda i els guants.', back: 'Il fait froid, prends l\'écharpe et les gants.', level: 'A2', country: 'catalonia', category: 'frases-vocab' },
  { id: 'cat-ph-017', front: 'Hem de buidar la nevera abans de marxar.', back: 'On doit vider le frigo avant de partir.', level: 'A2', country: 'catalonia', category: 'frases-vocab' },
  { id: 'cat-ph-018', front: 'La caputxa de la meva gavardina és trencada.', back: 'La capuche de mon imperméable est brisée.', level: 'A2', country: 'catalonia', category: 'frases-vocab' },

  // ─── VIRELANGUES / SONS DIFFICILES ────────────────────────────────
  { id: 'cat-ph-019', front: 'Setze jutges d\'un jutjat mengen fetge.', back: '(virelangue classique du son J/TG) « Seize juges d\'un tribunal mangent du foie ».', level: 'A2', country: 'catalonia', category: 'frases-virelangues' },
  { id: 'cat-ph-020', front: 'En Pinxo va dir a en Panxo.', back: '(son X = « ch ») « Pinxo a dit à Panxo ».', level: 'A2', country: 'catalonia', category: 'frases-virelangues' },
  { id: 'cat-ph-021', front: 'La guineu i el pingüí juguen amb aigua.', back: '(sons GU / GÜ) « Le renard et le pingouin jouent avec de l\'eau ».', level: 'A2', country: 'catalonia', category: 'frases-virelangues' },
  { id: 'cat-ph-022', front: 'Un plat pla ple de pans.', back: '(son PL) « Une assiette plate pleine de pains ».', level: 'A2', country: 'catalonia', category: 'frases-virelangues' },
  { id: 'cat-ph-023', front: 'El gall i la gallina reguen l\'all.', back: '(son LL mouillé) « Le coq et la poule arrosent l\'ail ».', level: 'A2', country: 'catalonia', category: 'frases-virelangues' },
  { id: 'cat-ph-024', front: 'Quinze cranc frescos.', back: '(sons QU/CR) « Quinze crabes frais ».', level: 'A2', country: 'catalonia', category: 'frases-virelangues' },
];
