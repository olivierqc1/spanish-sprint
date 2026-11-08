# Iberian Sprint — notes pour Claude (lis ça en premier)

App d'apprentissage espagnol + catalan (Next.js 14 App Router, TypeScript, PWA, Vercel).
Dépôt : `olivierqc1/spanish-sprint`. Propriétaire : Olivier (Québécois vivant à Barcelone).

## Comment travailler avec Olivier
- **Réponds en français**, court. Pas de récap des étapes, pas de fichiers déjà livrés qu'il a déjà.
- Il travaille **uniquement depuis son téléphone** (éditeur web GitHub, collage max ~450 lignes).
- **Workflow Git : tu crées une branche, tu commit et tu push toi-même.** Olivier n'a plus qu'à
  fusionner dans GitHub (ou tu ouvres la PR). Ne lui demande PAS de copier-coller des fichiers.
  Ne pousse jamais directement sur `main`.
- Si le push est refusé (403), appelle `add_repo` avec `access: "push"`, puis re-pousse.
- **Vérifie le repo avant de livrer** (clone, `git log`, grep) : ne renvoie pas des fichiers déjà
  présents, ne crée pas de doublons, ne parle pas de fichiers qui n'existent pas.
- Quand il signale un bug dans un exercice, **analyse tout le dossier** (pas seulement l'exemple) et corrige tout.
- Livre le résultat, pas de blabla. Un seul fichier ou une branche suffit.

## Données de vocabulaire (flashcards)
- Catalan : `src/data/words/catalan/` — `A1.ts`, `A2.ts`, `B1.ts`, `A2_notebook.ts` (carnet 1, ids `cat-a2-nb-001..230`),
  `A2_notebook_3.ts` (carnet, ids dès 345). `A2.ts` contient aussi `cat-a2-nb-231..344`.
- Forme d'une carte :
  `{ id: 'cat-a2-nb-345', front: 'el pebre', back: 'le poivre', backEn: 'pepper', level: 'A2', country: 'catalonia', category: 'cuisine' }`
- `front` = catalan, `back` = français. Les cartes sont fusionnées et dédoublonnées dans `src/components/Flashcards.tsx`
  (par `id` et par mot). **Avant d'ajouter un mot, vérifie qu'il n'existe pas déjà.**
- Flashcards : mode par défaut = **français → catalan** (Olivier veut retrouver le mot catalan). Bouton 🔁 pour inverser.
- Les photos de son carnet sont manuscrites : n'ajoute que ce qui est lisible avec certitude et signale le reste.

## Exercices de grammaire
- Fichiers : `src/data/grammar_quizz/<id>.json`, enregistrés dans `src/data/grammar.ts`.
  Le **nom du fichier doit être identique à l'`id`**. Catalan = préfixe `cat_`.
- Forme JSON : `{ "note": {"fr": "...", "en": "..."}, "drills": [ {"prompt": "... ___ ...", "answer": "...", "hint": "..."} ] }`
  (`visual` optionnel).
- Entrée dans `grammar.ts` (exactement ce modèle, `title` et `note` sur une seule ligne) :
  ```
  { id: "cat_xxx", title: { fr: "Catalan — ...", en: "Catalan — ..." }, level: "A2",
    note: { fr: "...", en: "..." }, country: "all", jsonPath: "/data/grammar_quizz/cat_xxx.json" },
  ```
- **Règles strictes des drills** (Olivier a perdu beaucoup de temps sur des exercices mal faits) :
  1. Un seul trou `___`, **une seule réponse acceptée**. Jamais de `/`, ni « a ou b ».
  2. La réponse ne répète pas un mot déjà visible dans la phrase.
  3. Pas de HTML ni de markdown dans `prompt` ou `answer`. Les explications vont dans `hint`.
  4. Pas de piège de ponctuation : la comparaison ignore casse, accents, ponctuation finale.
  5. Notes claires pour un débutant (pas de jargon type « incoatif »).
  6. Vise 25–40 exercices par fichier. Relis chaque réponse (les décalages d'index ont déjà causé des erreurs).
- Les exercices catalans et espagnols ne doivent pas se mélanger (`cat_` + clé localStorage `iberian-sprint-target-language`).

## Pièges techniques connus
- Hooks React avant tout `return` conditionnel.
- Tableaux de conjugaison : vrai `<table>` avec styles inline (le grid Tailwind rend mal sur mobile).
- Composants longs : garde chaque fichier raisonnable pour qu'il tienne en une PR lisible.
- Avant de conclure, vérifie la syntaxe (`tsc`/`transpileModule`) car Olivier ne peut pas déboguer sur téléphone.
