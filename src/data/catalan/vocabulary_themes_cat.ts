// src/data/catalan/vocabulary_themes.ts
// Vocabulaire thématique catalan — FR et EN

export interface ThemeVocab {
  id: string;
  theme: string;
  icon: string;
  description: { fr: string; en: string };
  words: Array<{
    catalan: string;
    fr: string;
    en: string;
    note?: string;
    level: 'A1' | 'A2' | 'B1';
  }>;
  phrases?: Array<{ catalan: string; fr: string; en: string }>;
}

export const catalanVocabThemes: ThemeVocab[] = [

  // ─── TRANSPORTS BARCELONA ──────────────────────────────────────────────────
  {
    id: 'transports',
    theme: 'Transports de Barcelona',
    icon: '',
    description: {
      fr: 'Vocabulaire essentiel pour se déplacer à Barcelone — métro, bus, train, vélo.',
      en: 'Essential vocabulary for getting around Barcelona — metro, bus, train, bike.',
    },
    words: [
      { catalan: 'el metro', fr: 'le métro', en: 'the metro', level: 'A1' },
      { catalan: "l'autobús", fr: "l'autobus", en: 'the bus', level: 'A1' },
      { catalan: 'el tren', fr: 'le train', en: 'the train', level: 'A1' },
      { catalan: 'el tramvia', fr: 'le tramway', en: 'the tram', level: 'A1' },
      { catalan: 'la bicicleta', fr: 'le vélo', en: 'the bike', level: 'A1' },
      { catalan: 'el patinet', fr: 'la trottinette', en: 'the scooter', level: 'A1' },
      { catalan: 'el taxi', fr: 'le taxi', en: 'the taxi', level: 'A1' },
      { catalan: 'el cotxe', fr: 'la voiture', en: 'the car', level: 'A1' },
      { catalan: "l'estació", fr: 'la gare / la station', en: 'the station', level: 'A1' },
      { catalan: 'la parada', fr: "l'arrêt", en: 'the stop', level: 'A1' },
      { catalan: 'el bitllet', fr: 'le ticket / billet', en: 'the ticket', level: 'A1' },
      { catalan: 'la targeta T-Casual', fr: 'la carte 10 voyages', en: 'the 10-trip card', note: 'Carte la plus utilisée à BCN', level: 'A1' },
      { catalan: 'el validador', fr: 'le validateur', en: 'the validator', level: 'A1' },
      { catalan: 'la línia', fr: 'la ligne', en: 'the line', level: 'A1' },
      { catalan: 'la sortida', fr: 'la sortie', en: 'the exit', level: 'A1' },
      { catalan: "l'entrada", fr: "l'entrée", en: 'the entrance', level: 'A1' },
      { catalan: 'el trasllat', fr: 'la correspondance', en: 'the transfer / connection', level: 'A2' },
      { catalan: 'el Bicing', fr: 'le Bicing (vélos en libre-service)', en: 'the Bicing (bike share)', note: 'Système de vélos partagés de BCN', level: 'A2' },
      { catalan: 'anar a peu', fr: 'aller à pied', en: 'to go on foot', level: 'A1' },
      { catalan: 'pujar al metro', fr: 'prendre le métro', en: 'to take the metro', level: 'A1' },
      { catalan: 'baixar a la propera parada', fr: 'descendre au prochain arrêt', en: 'to get off at the next stop', level: 'A2' },
      { catalan: 'fer transbord', fr: 'prendre une correspondance', en: 'to make a connection / transfer', level: 'A2' },
      { catalan: "l'hora punta", fr: "l'heure de pointe", en: 'rush hour', level: 'A2' },
      { catalan: 'el retard', fr: 'le retard', en: 'the delay', level: 'A2' },
    ],
    phrases: [
      { catalan: 'On és l\'estació de metro més propera?', fr: 'Où est la station de métro la plus proche?', en: 'Where is the nearest metro station?' },
      { catalan: 'Quin autobús va a la Sagrada Família?', fr: 'Quel bus va à la Sagrada Família?', en: 'Which bus goes to Sagrada Família?' },
      { catalan: 'Quantes parades falten?', fr: "Combien d'arrêts reste-t-il?", en: 'How many stops are left?' },
      { catalan: 'He de fer transbord?', fr: 'Dois-je prendre une correspondance?', en: 'Do I need to make a connection?' },
      { catalan: 'Em puc carregar la T-Casual aquí?', fr: 'Puis-je recharger la T-Casual ici?', en: 'Can I top up the T-Casual here?' },
    ],
  },

  // ─── ADMINISTRATION ───────────────────────────────────────────────────────
  {
    id: 'administracio',
    theme: 'Administration et démarches',
    icon: '',
    description: {
      fr: 'Vocabulaire pour les démarches administratives en Catalogne — mairie, résidence, documents.',
      en: 'Vocabulary for administrative procedures in Catalonia — city hall, residence, documents.',
    },
    words: [
      { catalan: "l'ajuntament", fr: 'la mairie', en: 'city hall / town hall', level: 'A2' },
      { catalan: 'la generalitat', fr: 'le gouvernement régional catalan', en: 'Catalan regional government', level: 'A2' },
      { catalan: 'el padró municipal', fr: "le registre de résidence (recensement)", en: 'municipal register / census', note: 'Indispensable pour les résidents', level: 'A2' },
      { catalan: "l'empadronament", fr: "l'inscription au registre de résidence", en: 'registration of residence', level: 'A2' },
      { catalan: 'el permís de residència', fr: 'le permis de résidence (TIE)', en: 'residence permit', level: 'B1' },
      { catalan: 'el NIE', fr: "le numéro d'identité étranger", en: 'foreigner ID number', level: 'B1' },
      { catalan: 'la cita prèvia', fr: 'le rendez-vous préalable', en: 'prior appointment', note: 'À prendre en ligne sur la plupart des services', level: 'A2' },
      { catalan: 'el tràmit', fr: 'la démarche administrative', en: 'administrative procedure', level: 'B1' },
      { catalan: 'el formulari', fr: 'le formulaire', en: 'the form', level: 'A2' },
      { catalan: "l'impost", fr: "l'impôt / la taxe", en: 'the tax', level: 'B1' },
      { catalan: 'el certificat', fr: 'le certificat', en: 'the certificate', level: 'A2' },
      { catalan: 'el document', fr: 'le document', en: 'the document', level: 'A1' },
      { catalan: 'el passaport', fr: 'le passeport', en: 'the passport', level: 'A1' },
      { catalan: 'el DNI', fr: "la carte d'identité", en: 'national ID card', level: 'A1' },
      { catalan: 'signar', fr: 'signer', en: 'to sign', level: 'A2' },
      { catalan: "l'oficina", fr: "le bureau / l'office", en: 'the office', level: 'A1' },
      { catalan: 'la finestreta', fr: 'le guichet', en: 'the counter / window', level: 'A2' },
      { catalan: 'el torn', fr: 'le numéro d\'attente / le tour', en: 'the queue number / turn', level: 'A2' },
      { catalan: 'esperar el torn', fr: 'attendre son tour', en: 'wait your turn', level: 'A2' },
    ],
    phrases: [
      { catalan: 'Vull empadronar-me.', fr: 'Je veux m\'inscrire au registre de résidence.', en: 'I want to register my residence.' },
      { catalan: 'He de demanar una cita prèvia.', fr: 'Je dois prendre un rendez-vous préalable.', en: 'I need to book a prior appointment.' },
      { catalan: 'Quins documents necessito?', fr: 'Quels documents ai-je besoin?', en: 'What documents do I need?' },
      { catalan: 'On puc trobar el formulari?', fr: 'Où puis-je trouver le formulaire?', en: 'Where can I find the form?' },
      { catalan: 'Em podeu ajudar en català o en castellà?', fr: 'Pouvez-vous m\'aider en catalan ou en espagnol?', en: 'Can you help me in Catalan or Spanish?' },
    ],
  },

  // ─── NOURRITURE ET RESTAURANTS ────────────────────────────────────────────
  {
    id: 'menjar',
    theme: 'Nourriture et restaurants',
    icon: '',
    description: {
      fr: 'Vocabulaire pour commander, aller au restaurant et faire les courses en catalan.',
      en: 'Vocabulary for ordering food, going to restaurants and shopping in Catalan.',
    },
    words: [
      // Plats Catalans
      { catalan: 'el pa amb tomàquet', fr: 'le pain à la tomate', en: 'bread with tomato', note: 'Plat emblématique catalan', level: 'A1' },
      { catalan: "l'escalivada", fr: "les légumes grillés", en: 'grilled vegetables', level: 'A2' },
      { catalan: "l'escudella", fr: 'la soupe catalane traditionnelle', en: 'traditional Catalan soup', level: 'A2' },
      { catalan: 'la crema catalana', fr: 'la crème brûlée catalane', en: 'Catalan cream dessert', level: 'A1' },
      { catalan: 'els canelons', fr: 'les cannellonis', en: 'cannelloni', note: 'Plat phare du jour de Sant Esteve (26 déc.)', level: 'A2' },
      { catalan: 'la fideuà', fr: 'la fidéuà (paella aux nouilles)', en: 'fideuà (noodle paella)', level: 'A2' },
      { catalan: 'el botifarra', fr: 'la saucisse catalane', en: 'Catalan sausage', level: 'A2' },
      // Restaurant
      { catalan: 'la carta', fr: 'la carte / le menu', en: 'the menu', level: 'A1' },
      { catalan: 'el menú del dia', fr: 'le menu du jour', en: 'set lunch menu', note: 'Entrée + plat + dessert + boisson, très répandu', level: 'A1' },
      { catalan: 'el compte', fr: "l'addition", en: 'the bill', level: 'A1' },
      { catalan: 'la propina', fr: 'le pourboire', en: 'the tip', level: 'A2' },
      { catalan: 'el/la cambrer/a', fr: 'le serveur / la serveuse', en: 'the waiter / waitress', level: 'A1' },
      { catalan: 'el restaurant', fr: 'le restaurant', en: 'the restaurant', level: 'A1' },
      { catalan: 'el bar', fr: 'le bar / le café', en: 'the bar / café', level: 'A1' },
      { catalan: 'la terrassa', fr: 'la terrasse', en: 'the terrace', level: 'A1' },
      // Marché
      { catalan: 'el mercat', fr: 'le marché', en: 'the market', level: 'A1' },
      { catalan: 'la parada', fr: "l'étal / le stand", en: 'the stall', level: 'A2' },
      { catalan: 'fresc / fresca', fr: 'frais / fraîche', en: 'fresh', level: 'A1' },
      { catalan: 'ecològic', fr: 'biologique / écologique', en: 'organic', level: 'A2' },
      { catalan: "el quilo / l'hectogram", fr: 'le kilo / les 100g', en: 'the kilo / 100g', level: 'A1' },
    ],
    phrases: [
      { catalan: 'Una taula per a dos, si us plau.', fr: 'Une table pour deux, s\'il vous plaît.', en: 'A table for two, please.' },
      { catalan: 'Podem veure la carta?', fr: 'Pouvons-nous voir la carte?', en: 'Can we see the menu?' },
      { catalan: 'El compte, si us plau.', fr: "L'addition, s'il vous plaît.", en: 'The bill, please.' },
      { catalan: 'Que és el menú del dia?', fr: "Qu'est-ce que le menu du jour?", en: "What is today's set menu?" },
      { catalan: 'Tinc al·lèrgia a...', fr: "J'ai une allergie à...", en: 'I am allergic to...' },
      { catalan: 'Podeu posar-ho per emportar?', fr: 'Pouvez-vous le mettre à emporter?', en: 'Can you make it to go?' },
    ],
  },

  // ─── LOGEMENT ─────────────────────────────────────────────────────────────
  {
    id: 'habitatge',
    theme: 'Logement et quartiers',
    icon: '',
    description: {
      fr: 'Vocabulaire pour chercher un appartement et parler de son quartier à Barcelone.',
      en: 'Vocabulary for finding a flat and talking about your neighbourhood in Barcelona.',
    },
    words: [
      { catalan: 'el pis', fr: "l'appartement", en: 'the flat / apartment', note: 'Terme courant à BCN pour appartement', level: 'A1' },
      { catalan: "l'habitació", fr: 'la chambre', en: 'the bedroom / room', level: 'A1' },
      { catalan: 'el bany', fr: 'la salle de bain', en: 'the bathroom', level: 'A1' },
      { catalan: 'la cuina', fr: 'la cuisine', en: 'the kitchen', level: 'A1' },
      { catalan: 'el menjador', fr: 'la salle à manger', en: 'the dining room', level: 'A1' },
      { catalan: 'el balcó', fr: 'le balcon', en: 'the balcony', level: 'A1' },
      { catalan: 'el lloguer', fr: 'le loyer', en: 'the rent', level: 'A1' },
      { catalan: 'les despeses', fr: 'les charges', en: 'the bills / expenses', level: 'A2' },
      { catalan: 'la fiança', fr: 'la caution', en: 'the deposit', level: 'A2' },
      { catalan: "l'anunci", fr: "l'annonce", en: 'the advert', level: 'A2' },
      { catalan: 'el propietari / la propietària', fr: 'le/la propriétaire', en: 'the landlord / landlady', level: 'A2' },
      { catalan: "l'inquilí / l'inquilina", fr: 'le locataire / la locataire', en: 'the tenant (m/f)', level: 'A2' },
      { catalan: 'el contracte', fr: 'le contrat', en: 'the contract', level: 'A2' },
      // Quartiers BCN
      { catalan: 'el barri', fr: 'le quartier', en: 'the neighbourhood', level: 'A1' },
      { catalan: "l'Eixample", fr: "l'Eixample (quartier central)", en: 'Eixample (central neighbourhood)', level: 'A1' },
      { catalan: 'Gràcia', fr: 'Gràcia (quartier bohème)', en: 'Gràcia (bohemian quarter)', level: 'A1' },
      { catalan: 'el Gòtic', fr: 'le Gothique (vieille ville)', en: 'the Gothic Quarter (old town)', level: 'A1' },
      { catalan: 'el Poblenou', fr: 'le Poblenou (ex-industriel, branché)', en: 'Poblenou (former industrial, trendy)', level: 'A2' },
      { catalan: 'Sarrià', fr: 'Sarrià (quartier résidentiel chic)', en: 'Sarrià (upscale residential)', level: 'A2' },
    ],
    phrases: [
      { catalan: "Estic buscant un pis de lloguer.", fr: "Je cherche un appartement à louer.", en: "I am looking for a flat to rent." },
      { catalan: 'Quin és el lloguer mensual?', fr: 'Quel est le loyer mensuel?', en: 'What is the monthly rent?' },
      { catalan: 'Inclou les despeses?', fr: 'Les charges sont incluses?', en: 'Are bills included?' },
      { catalan: 'Quanta fiança cal pagar?', fr: 'Quelle caution faut-il payer?', en: 'How much deposit is required?' },
      { catalan: 'Puc visitar el pis?', fr: "Puis-je visiter l'appartement?", en: 'Can I visit the flat?' },
      { catalan: 'El pis és exterior o interior?', fr: "L'appartement donne sur l'extérieur ou sur la cour?", en: 'Does the flat face the street or the courtyard?' },
    ],
  },

  // ─── SANTÉ ────────────────────────────────────────────────────────────────
  {
    id: 'salut',
    theme: 'Santé',
    icon: '',
    description: {
      fr: 'Vocabulaire médical et de santé — utile pour aller chez le médecin ou à la pharmacie.',
      en: 'Medical and health vocabulary — useful for visiting the doctor or pharmacy.',
    },
    words: [
      { catalan: 'el metge / la metgessa', fr: 'le médecin (m/f)', en: 'the doctor (m/f)', level: 'A1' },
      { catalan: "l'infermer / l'infermera", fr: "l'infirmier / l'infirmière", en: 'the nurse (m/f)', level: 'A2' },
      { catalan: 'la farmàcia', fr: 'la pharmacie', en: 'the pharmacy', level: 'A1' },
      { catalan: "l'hospital", fr: "l'hôpital", en: 'the hospital', level: 'A1' },
      { catalan: 'el CAP', fr: 'le centre médical (centre d\'attention primaire)', en: 'primary care centre', note: 'Centre d\'Atenció Primària — médecin généraliste', level: 'A2' },
      { catalan: 'la recepta', fr: "l'ordonnance", en: 'the prescription', level: 'A2' },
      { catalan: 'el medicament', fr: 'le médicament', en: 'the medication', level: 'A1' },
      { catalan: "l'aspirina", fr: "l'aspirine", en: 'the aspirin', level: 'A1' },
      { catalan: "l'al·lèrgia", fr: "l'allergie", en: 'the allergy', level: 'A2' },
      { catalan: 'tenir febre', fr: 'avoir de la fièvre', en: 'to have a fever', level: 'A1' },
      { catalan: 'tenir mal de cap', fr: 'avoir mal à la tête', en: 'to have a headache', level: 'A1' },
      { catalan: 'tenir mal de panxa', fr: 'avoir mal au ventre', en: 'to have a stomachache', level: 'A1' },
      { catalan: 'tenir mal de coll', fr: 'avoir mal à la gorge', en: 'to have a sore throat', level: 'A1' },
      { catalan: 'estar constipat', fr: 'être enrhumé', en: 'to have a cold', level: 'A1' },
      { catalan: 'la tos', fr: 'la toux', en: 'the cough', level: 'A1' },
      { catalan: 'la ferida', fr: 'la blessure / la plaie', en: 'the wound / injury', level: 'A2' },
    ],
    phrases: [
      { catalan: 'Em trobo malament.', fr: 'Je ne me sens pas bien.', en: "I don't feel well." },
      { catalan: 'Necessito veure un metge.', fr: 'J\'ai besoin de voir un médecin.', en: 'I need to see a doctor.' },
      { catalan: 'On és la farmàcia més propera?', fr: 'Où est la pharmacie la plus proche?', en: 'Where is the nearest pharmacy?' },
      { catalan: "Tinc al·lèrgia a la penicil·lina.", fr: 'J\'ai une allergie à la pénicilline.', en: 'I am allergic to penicillin.' },
      { catalan: "Em pot donar alguna cosa per al mal de cap?", fr: "Pouvez-vous me donner quelque chose pour le mal de tête?", en: "Can you give me something for the headache?" },
    ],
  },

  // ─── VIE QUOTIDIENNE ──────────────────────────────────────────────────────
  {
    id: 'vida-quotidiana',
    theme: 'Vie quotidienne',
    icon: '',
    description: {
      fr: 'Expressions et vocabulaire du quotidien à Barcelone — commerces, loisirs, voisinage.',
      en: 'Everyday expressions and vocabulary in Barcelona — shops, leisure, neighbourhood.',
    },
    words: [
      { catalan: "l'apotecari / la farmàcia", fr: "le pharmacien / la pharmacie", en: 'the pharmacist / pharmacy', level: 'A1' },
      { catalan: 'la botiga', fr: 'la boutique / le magasin', en: 'the shop / store', level: 'A1' },
      { catalan: 'el supermercat', fr: 'le supermarché', en: 'the supermarket', level: 'A1' },
      { catalan: 'la fleca', fr: 'la boulangerie', en: 'the bakery', level: 'A1' },
      { catalan: 'la carnisseria', fr: 'la boucherie', en: 'the butcher', level: 'A2' },
      { catalan: 'la fruiteria', fr: 'le marchand de fruits et légumes', en: 'the greengrocer', level: 'A2' },
      { catalan: "l'estanc", fr: 'le bureau de tabac (vend timbres, tickets...)', en: 'the tobacconist (also sells stamps, tickets...)', note: 'Très utile en Espagne', level: 'A2' },
      { catalan: 'el quiosc', fr: 'le kiosque (journaux)', en: 'the newsstand / kiosk', level: 'A2' },
      { catalan: "l'horari", fr: "l'horaire / les heures d'ouverture", en: 'the schedule / opening hours', level: 'A2' },
      { catalan: 'obert / tancat', fr: 'ouvert / fermé', en: 'open / closed', level: 'A1' },
      { catalan: 'el veí / la veïna', fr: 'le voisin / la voisine', en: 'the neighbour (m/f)', level: 'A1' },
      { catalan: 'la comunitat de veïns', fr: 'la copropriété / le voisinage', en: 'the residents\' community', level: 'A2' },
      { catalan: 'les escombraries', fr: 'les ordures / les poubelles', en: 'the rubbish / trash', level: 'A2' },
      { catalan: "el reciclatge", fr: 'le recyclage', en: 'the recycling', level: 'A2' },
      { catalan: 'el soroll', fr: 'le bruit', en: 'the noise', level: 'A1' },
      { catalan: "l'ascensor", fr: "l'ascenseur", en: 'the elevator / lift', level: 'A1' },
      { catalan: "l'escala", fr: "l'escalier", en: 'the stairs', level: 'A1' },
      { catalan: 'el porter / la portera', fr: 'le gardien / la gardienne', en: 'the concierge (m/f)', level: 'A2' },
    ],
    phrases: [
      { catalan: "A quina hora obre la botiga?", fr: "À quelle heure ouvre le magasin?", en: "What time does the shop open?" },
      { catalan: "On puc reciclar el vidre?", fr: "Où puis-je recycler le verre?", en: "Where can I recycle glass?" },
      { catalan: "El veí del quart fa molt de soroll.", fr: "Le voisin du quatrième fait beaucoup de bruit.", en: "The neighbour on the fourth floor makes a lot of noise." },
      { catalan: "L'ascensor no funciona.", fr: "L'ascenseur ne fonctionne pas.", en: "The lift is not working." },
      { catalan: "On es llencen les escombraries orgàniques?", fr: "Où jette-t-on les ordures organiques?", en: "Where do you put the organic waste?" },
    ],
  },
];
