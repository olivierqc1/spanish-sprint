// src/data/catalan/expressions.ts
// Expressions idiomatiques catalanes — FR et EN

export interface CatalanExpression {
  id: string;
  expression: string;
  literal: { fr: string; en: string };
  meaning: { fr: string; en: string };
  example: { catalan: string; fr: string; en: string };
  level: 'A1' | 'A2' | 'B1';
  category: 'quotidien' | 'emotions' | 'temps' | 'argent' | 'corps' | 'barcelona';
}

export const catalanExpressions: CatalanExpression[] = [

  // ─── QUOTIDIEN ────────────────────────────────────────────────────────────
  {
    id: 'exp-001',
    expression: 'anar al gra',
    literal: { fr: 'aller au grain', en: 'go to the grain' },
    meaning: { fr: 'Aller droit au but, ne pas tourner autour du pot', en: 'Get to the point, cut to the chase' },
    example: { catalan: 'Vinga, ves al gra!', fr: 'Allez, va droit au but!', en: 'Come on, get to the point!' },
    level: 'B1',
    category: 'quotidien',
  },
  {
    id: 'exp-002',
    expression: 'fer bondat',
    literal: { fr: 'faire bonté', en: 'do goodness' },
    meaning: { fr: 'Se bien comporter, être sage (surtout pour les enfants)', en: 'Behave well, be good (especially for children)' },
    example: { catalan: 'Fes bondat mentre sóc fora!', fr: 'Sois sage pendant que je suis dehors!', en: 'Behave while I am away!' },
    level: 'A2',
    category: 'quotidien',
  },
  {
    id: 'exp-003',
    expression: 'no hi ha res a fer',
    literal: { fr: "il n'y a rien à faire", en: 'there is nothing to do' },
    meaning: { fr: "C'est sans espoir, il n'y a pas de solution", en: "It's hopeless, nothing can be done" },
    example: { catalan: "No hi ha res a fer, he perdut el bitllet.", fr: "C'est sans espoir, j'ai perdu le billet.", en: "There is nothing to do, I lost the ticket." },
    level: 'A2',
    category: 'quotidien',
  },
  {
    id: 'exp-004',
    expression: 'quedar bé / quedar malament',
    literal: { fr: 'rester bien / rester mal', en: 'stay well / stay badly' },
    meaning: { fr: 'Faire bonne/mauvaise impression, s\'en sortir bien/mal', en: 'Make a good/bad impression, come out well/badly' },
    example: { catalan: 'Vaig quedar molt bé a la reunió.', fr: "J'ai fait très bonne impression à la réunion.", en: 'I made a very good impression at the meeting.' },
    level: 'A2',
    category: 'quotidien',
  },
  {
    id: 'exp-005',
    expression: 'passar-ho bé',
    literal: { fr: 'passer-le bien', en: 'pass it well' },
    meaning: { fr: "S'amuser, passer un bon moment", en: 'Have a good time, enjoy yourself' },
    example: { catalan: 'Que passeu-ho molt bé a la festa!', fr: 'Amusez-vous bien à la fête!', en: 'Have a great time at the party!' },
    level: 'A1',
    category: 'quotidien',
  },
  {
    id: 'exp-006',
    expression: 'anar a parar',
    literal: { fr: 'aller à arrêter', en: 'go to stop' },
    meaning: { fr: 'Finir quelque part, aboutir', en: 'End up somewhere, come to' },
    example: { catalan: 'On vas a parar amb tot això?', fr: "Où tu veux en venir avec tout ça?", en: 'Where are you going with all this?' },
    level: 'B1',
    category: 'quotidien',
  },
  {
    id: 'exp-007',
    expression: 'donar la llauna',
    literal: { fr: 'donner la boîte de conserve', en: 'give the tin can' },
    meaning: { fr: 'Casser les pieds, embêter quelqu\'un', en: 'To bore or annoy someone, to pester' },
    example: { catalan: "Para de donar la llauna!", fr: 'Arrête de m\'embêter!', en: 'Stop pestering me!' },
    level: 'B1',
    category: 'quotidien',
  },
  {
    id: 'exp-008',
    expression: 'tirar endavant',
    literal: { fr: 'jeter en avant', en: 'throw forward' },
    meaning: { fr: 'Avancer, persévérer, s\'en sortir malgré les difficultés', en: 'Move forward, persevere, carry on despite difficulties' },
    example: { catalan: 'Hem de tirar endavant malgrat tot.', fr: 'Nous devons avancer malgré tout.', en: 'We must carry on despite everything.' },
    level: 'A2',
    category: 'quotidien',
  },

  // ─── ÉMOTIONS ─────────────────────────────────────────────────────────────
  {
    id: 'exp-009',
    expression: 'posar-se les mans al cap',
    literal: { fr: 'se mettre les mains à la tête', en: 'put hands on head' },
    meaning: { fr: 'Être scandalisé, ne pas en revenir', en: 'Be shocked, appalled, cannot believe something' },
    example: { catalan: 'Tothom es va posar les mans al cap quan ho van saber.', fr: 'Tout le monde était scandalisé quand ils l\'ont appris.', en: 'Everyone was shocked when they found out.' },
    level: 'B1',
    category: 'emotions',
  },
  {
    id: 'exp-010',
    expression: 'estar fins al coll',
    literal: { fr: 'être jusqu\'au cou', en: 'be up to the neck' },
    meaning: { fr: 'En avoir jusqu\'au cou, être débordé', en: 'Be up to your neck, be overwhelmed' },
    example: { catalan: 'Estic fins al coll de feina aquesta setmana.', fr: "J'en ai jusqu'au cou de travail cette semaine.", en: 'I am up to my neck in work this week.' },
    level: 'B1',
    category: 'emotions',
  },
  {
    id: 'exp-011',
    expression: 'treure de polleguera',
    literal: { fr: 'sortir de gond', en: 'take off the hinge' },
    meaning: { fr: 'Mettre hors de soi, faire sortir de ses gonds', en: 'Drive someone crazy, make someone lose their temper' },
    example: { catalan: 'Aquesta situació em treu de polleguera.', fr: 'Cette situation me met hors de moi.', en: 'This situation drives me crazy.' },
    level: 'B1',
    category: 'emotions',
  },
  {
    id: 'exp-012',
    expression: 'estar a la lluna',
    literal: { fr: 'être à la lune', en: 'be on the moon' },
    meaning: { fr: 'Être dans la lune, ne pas être attentif', en: 'Be daydreaming, be inattentive' },
    example: { catalan: 'No et distreis, no estiguis a la lluna!', fr: "Ne te distrais pas, ne sois pas dans la lune!", en: "Don't get distracted, don't be daydreaming!" },
    level: 'A2',
    category: 'emotions',
  },
  {
    id: 'exp-013',
    expression: 'perdre els papers',
    literal: { fr: 'perdre les papiers', en: 'lose the papers' },
    meaning: { fr: 'Perdre son calme, craquer, perdre les pédales', en: 'Lose your temper, lose your cool, crack up' },
    example: { catalan: 'Va perdre els papers davant de tothom.', fr: 'Il a perdu son calme devant tout le monde.', en: 'He lost his temper in front of everyone.' },
    level: 'A2',
    category: 'emotions',
  },

  // ─── ARGENT ───────────────────────────────────────────────────────────────
  {
    id: 'exp-014',
    expression: 'costar un ull de la cara',
    literal: { fr: 'coûter un oeil du visage', en: 'cost an eye from the face' },
    meaning: { fr: 'Coûter les yeux de la tête, être très cher', en: 'Cost an arm and a leg, be very expensive' },
    example: { catalan: 'El pis de Barcelona em costa un ull de la cara.', fr: "L'appartement à Barcelone me coûte les yeux de la tête.", en: 'The flat in Barcelona costs me an arm and a leg.' },
    level: 'A2',
    category: 'argent',
  },
  {
    id: 'exp-015',
    expression: 'no tenir ni cinc',
    literal: { fr: 'ne pas avoir même cinq', en: 'not have even five' },
    meaning: { fr: "Ne pas avoir un sou, être fauché", en: "Not have a penny, be broke" },
    example: { catalan: "No tinc ni cinc, he de demanar diners.", fr: "Je n'ai pas un sou, je dois demander de l'argent.", en: "I don't have a penny, I need to borrow money." },
    level: 'A2',
    category: 'argent',
  },
  {
    id: 'exp-016',
    expression: 'fer el salt',
    literal: { fr: 'faire le saut', en: 'make the leap' },
    meaning: { fr: 'Faire le grand saut, prendre une décision importante', en: 'Take the plunge, make a big decision' },
    example: { catalan: 'Finalment vaig fer el salt i vaig llogar el pis.', fr: "Finalement j'ai fait le grand saut et j'ai loué l'appartement.", en: 'I finally took the plunge and rented the flat.' },
    level: 'B1',
    category: 'argent',
  },

  // ─── CORPS ────────────────────────────────────────────────────────────────
  {
    id: 'exp-017',
    expression: 'posar el crit al cel',
    literal: { fr: 'mettre le cri au ciel', en: 'put the cry to the sky' },
    meaning: { fr: 'Pousser les hauts cris, se plaindre violemment', en: 'Hit the roof, scream and shout, make a big fuss' },
    example: { catalan: 'El veí va posar el crit al cel pel soroll.', fr: 'Le voisin a poussé les hauts cris à cause du bruit.', en: 'The neighbor hit the roof because of the noise.' },
    level: 'B1',
    category: 'corps',
  },
  {
    id: 'exp-018',
    expression: 'no tenir pèls a la llengua',
    literal: { fr: 'ne pas avoir de poils sur la langue', en: 'not have hairs on the tongue' },
    meaning: { fr: 'Ne pas avoir sa langue dans sa poche, parler franchement', en: "Not mince your words, speak your mind, be outspoken" },
    example: { catalan: 'La meva àvia no té pèls a la llengua.', fr: "Ma grand-mère n'a pas sa langue dans sa poche.", en: "My grandmother never minces her words." },
    level: 'B1',
    category: 'corps',
  },
  {
    id: 'exp-019',
    expression: 'posar el peu a la galleda',
    literal: { fr: 'mettre le pied dans le seau', en: 'put the foot in the bucket' },
    meaning: { fr: 'Mettre les pieds dans le plat, gaffer', en: 'Put your foot in it, make a blunder' },
    example: { catalan: 'Vaig posar el peu a la galleda amb aquell comentari.', fr: "J'ai mis les pieds dans le plat avec ce commentaire.", en: 'I put my foot in it with that comment.' },
    level: 'B1',
    category: 'corps',
  },
  {
    id: 'exp-020',
    expression: 'tenir molta cara',
    literal: { fr: 'avoir beaucoup de visage', en: 'have a lot of face' },
    meaning: { fr: 'Avoir du culot, avoir du toupet', en: 'Have a lot of nerve, have the cheek to' },
    example: { catalan: 'Tens molta cara de demanar-me això!', fr: "Tu as beaucoup de culot de me demander ça!", en: 'You have a lot of nerve asking me that!' },
    level: 'A2',
    category: 'corps',
  },

  // ─── BARCELONE SPÉCIFIQUE ─────────────────────────────────────────────────
  {
    id: 'exp-021',
    expression: 'anar de cap de setmana',
    literal: { fr: 'aller de week-end', en: 'go for the weekend' },
    meaning: { fr: 'Partir en week-end, sortir de la ville le week-end', en: 'Go away for the weekend, leave the city' },
    example: { catalan: "Aquest cap de setmana anem a l'Empordà.", fr: "Ce week-end nous allons en Empordà.", en: 'This weekend we are going to Empordà.' },
    level: 'A2',
    category: 'barcelona',
  },
  {
    id: 'exp-022',
    expression: 'baixar a la platja',
    literal: { fr: 'descendre à la plage', en: 'go down to the beach' },
    meaning: { fr: 'Aller à la plage (très courant à Barcelone)', en: 'Go to the beach (very common in Barcelona)' },
    example: { catalan: 'Fem una cervesa a la platja?', fr: 'On prend une bière à la plage?', en: 'Shall we have a beer at the beach?' },
    level: 'A1',
    category: 'barcelona',
  },
  {
    id: 'exp-023',
    expression: 'fer una cerveseta',
    literal: { fr: 'faire une petite bière', en: 'do a little beer' },
    meaning: { fr: 'Aller prendre une bière, sortir boire un verre', en: 'Go for a beer, go out for a drink' },
    example: { catalan: 'Sortim a fer una cerveseta després del treball?', fr: 'On sort prendre une bière après le travail?', en: 'Shall we go for a beer after work?' },
    level: 'A1',
    category: 'barcelona',
  },
  {
    id: 'exp-024',
    expression: 'quedar per...',
    literal: { fr: 'rester pour...', en: 'stay for...' },
    meaning: { fr: 'Se donner rendez-vous pour, se retrouver pour', en: 'Meet up to, arrange to meet for' },
    example: { catalan: 'Quedem per dinar demà?', fr: 'On se retrouve pour déjeuner demain?', en: 'Shall we meet for lunch tomorrow?' },
    level: 'A1',
    category: 'barcelona',
  },
  {
    id: 'exp-025',
    expression: 'fer el vermut',
    literal: { fr: 'faire le vermouth', en: 'do the vermouth' },
    meaning: { fr: 'Prendre l\'apéritif (tradition catalane du dimanche midi)', en: 'Have aperitif drinks (Catalan Sunday tradition)' },
    example: { catalan: 'Diumenge fem el vermut a la plaça?', fr: "Dimanche on prend l'apéro sur la place?", en: 'Sunday, shall we have aperitifs at the square?' },
    level: 'A2',
    category: 'barcelona',
  },
];

// Index par catégorie
export const expressionsByCategory = catalanExpressions.reduce((acc, exp) => {
  if (!acc[exp.category]) acc[exp.category] = [];
  acc[exp.category].push(exp);
  return acc;
}, {} as Record<string, CatalanExpression[]>);
