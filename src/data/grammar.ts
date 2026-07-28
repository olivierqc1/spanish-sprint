// ===== grammar.ts — PARTIE 1 / 18  (lignes 1-111) =====
// src/data/grammar.ts
export type GrammarPoint = {
  id: string;
  title: { fr: string; en: string };
  level: string;
  note: { fr: string; en: string };
  country: string;
  jsonPath: string;
};

export const grammarPoints: GrammarPoint[] = [
  {
    id: "cat_pronoms_febles",
    title: { fr: "Catalan : pronoms febles (en, hi, ho, el/la, li)", en: "Catalan: weak pronouns (en, hi, ho, el/la, li)" },
    level: "A2",
    note: { fr: "en, hi, ho et les pronoms COD/COI : la base pour comprendre les reponses.", en: "en, hi, ho and object pronouns: essential to understand replies." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_pronoms_febles.json"
  },
  {
    id: "cat_connectors_basics",
    title: { fr: "Catalan : connecteurs de base", en: "Catalan: basic connectors" },
    level: "A2",
    note: { fr: "però, doncs, llavors, per això, tot i que : enchainer ses phrases.", en: "però, doncs, llavors, per això, tot i que: linking sentences." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_connectors_basics.json"
  },
  {
    id: "cat_chunks_funcionals",
    title: { fr: "Catalan : phrases de survie", en: "Catalan: survival phrases" },
    level: "A2",
    note: { fr: "Com es diu, què vol dir, pots repetir : les blocs a ressortir sans reflechir.", en: "Com es diu, què vol dir, pots repetir: ready-made phrases." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_chunks_funcionals.json"
  },
  {
    id: "cat_present_verbs_frequents",
    title: { fr: "Catalan : present des verbes quotidiens", en: "Catalan: present of everyday verbs" },
    level: "A1",
    note: { fr: "ser, estar, tenir, fer, anar, voler, poder, hi ha, agradar.", en: "ser, estar, tenir, fer, anar, voler, poder, hi ha, agradar." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_present_verbs_frequents.json"
  },
  {
    id: "cat_vocab_survival",
    title: { fr: "Catalan : vocabulaire de survie", en: "Catalan: survival vocabulary" },
    level: "A1",
    note: { fr: "Manger, maison, travail, ville, temps : le vocabulaire du quotidien.", en: "Food, home, work, city, time: everyday vocabulary." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_vocab_survival.json"
  },
  {
    id: "cat_condicional_haver_de",
    title: { fr: "Catalan : conditionnel (de Hauriem de au conditionnel)", en: "Catalan: conditional (from Hauriem de)" },
    level: "A2",
    note: { fr: "Transformer Hauriem de + infinitif en conditionnel regulier.", en: "Turning Hauriem de + infinitive into the regular conditional." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_condicional_haver_de.json"
  },
  {
    id: "cat_condicional_irregulars",
    title: { fr: "Catalan : conditionnel, verbes irreguliers", en: "Catalan: conditional, irregular verbs" },
    level: "A2",
    note: { fr: "faria, tindria, vindria, podria, voldria : le radical du futur.", en: "faria, tindria, vindria, podria, voldria: the future stem." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_condicional_irregulars.json"
  },
{
  id: "cat_subjuntiu_present",
  title: { fr: "Catalan : le subjonctif présent", en: "Catalan: present subjunctive" },
  level: "B1",
  note: { fr: "Vull que vinguis. sigui, tingui, faci, vagi, pugui, sàpiga.",
          en: "Vull que vinguis. sigui, tingui, faci, vagi, pugui." },
  country: "catalonia",
  jsonPath: "/data/grammar_quizz/cat_subjuntiu_present.json"
},
{
  id: "cat_plusquamperfet",
  title: { fr: "Catalan : le plus-que-parfait (havia parlat)", en: "Catalan: pluperfect" },
  level: "B1",
  note: { fr: "Quan vaig arribar, el tren ja havia sortit.",
          en: "Quan vaig arribar, el tren ja havia sortit." },
  country: "catalonia",
  jsonPath: "/data/grammar_quizz/cat_plusquamperfet.json"
},
{
  id: "cat_relatius",
  title: { fr: "Catalan : les propositions relatives (que, qui, què, on)",
           en: "Catalan: relative clauses" },
  level: "B1",
  note: { fr: "que · amb qui (personnes) · de què (choses) · on (lieu).",
          en: "que · amb qui (people) · de què (things) · on (place)." },
  country: "catalonia",
  jsonPath: "/data/grammar_quizz/cat_relatius.json"
},
{
  id: "cat_passiva",
  title: { fr: "Catalan : la voix passive et le SE passif",
           en: "Catalan: passive voice and passive SE" },
  level: "B1",
  note: { fr: "va ser escrita per... · es venen pisos · es viu bé.",
          en: "va ser escrita per... · es venen pisos · es viu bé." },
  country: "catalonia",
  jsonPath: "/data/grammar_quizz/cat_passiva.json"
},
{
  id: "cat_participis_irregulars",
  title: {
    fr: "Catalan : participes irréguliers au perfet",
    en: "Catalan: irregular participles in the perfet"
  },


// ===== grammar.ts — PARTIE 2 / 18  (lignes 112-223) =====
  level: "A2",
  note: {
    fr: "fet, dit, vist, obert, pres, après + le groupe en -gut.",
    en: "fet, dit, vist, obert, pres, après + the -gut group."
  },
  country: "catalonia",
  jsonPath: "/data/grammar_quizz/cat_participis_irregulars.json"
},
{
  id: "cat_gerundi",
  title: {
    fr: "Catalan : le gérondif et les actions en cours",
    en: "Catalan: the gerund and ongoing actions"
  },
  level: "A2-B1",
  note: {
    fr: "parlant, dormint, fent... estar/anar/continuar + gerundi.",
    en: "parlant, dormint, fent... estar/anar/continuar + gerund."
  },
  country: "catalonia",
  jsonPath: "/data/grammar_quizz/cat_gerundi.json"
},
{
  id: "cat_pronoms_cod",
  title: {
    fr: "Catalan : pronoms COD (el / la / els / les / ho / en)",
    en: "Catalan: direct object pronouns"
  },
  level: "A2",
  note: {
    fr: "El compro, la veig, els llegeixo, les compro, ho sé, en vull.",
    en: "El compro, la veig, els llegeixo, ho sé, en vull."
  },
  country: "catalonia",
  jsonPath: "/data/grammar_quizz/cat_pronoms_cod.json"
},
{
  id: "cat_pronoms_coi",
  title: {
    fr: "Catalan : pronoms COI (li / els / em / et / ens / us)",
    en: "Catalan: indirect object pronouns"
  },
  level: "A2",
  note: {
    fr: "li = à lui ET à elle. Le COI ne distingue pas le genre.",
    en: "li = to him AND to her. The COI has no gender."
  },
  country: "catalonia",
  jsonPath: "/data/grammar_quizz/cat_pronoms_coi.json"
},
{
  id: "cat_perfet_perifrastic",
  title: {
    fr: "Catalan : perfet vs perifràstic (avui he anat / ahir vaig anar)",
    en: "Catalan: perfet vs perifràstic"
  },
  level: "A2",
  note: {
    fr: "Quel passé choisir selon le moment : avui he anat / ahir vaig anar.",
    en: "Which past to use: avui he anat / ahir vaig anar."
  },
  country: "catalonia",
  jsonPath: "/data/grammar_quizz/cat_perfet_perifrastic.json"
},
{
  id: "cat_pronoms_combinats",
  title: {
    fr: "Catalan : combinaisons de pronoms febles (l'hi, els hi, me'l)",
    en: "Catalan: weak pronoun combinations"
  },
  level: "B1",
  note: {
    fr: "Deux pronoms ensemble : l'hi dono, me'l dónes, te la porto.",
    en: "Two pronouns together: l'hi dono, me'l dónes, te la porto."
  },
  country: "catalonia",
  jsonPath: "/data/grammar_quizz/cat_pronoms_combinats.json"
},
{
  id: "cat_futur_condicional",
  title: {
    fr: "Catalan : futur vs conditionnel (usage et hypothèses)",
    en: "Catalan: future vs conditional (uses and hypotheses)"
  },
  level: "A2-B1",
  note: {
    fr: "Quand choisir : demà aniré (futur) vs voldria un cafè (condicional).",
    en: "When to choose: demà aniré vs voldria un cafè."
  },
  country: "catalonia",
  jsonPath: "/data/grammar_quizz/cat_futur_condicional.json"
},
{
  id: "cat_pronominals_perfet",
  title: {
    fr: "Catalan : verbes pronominaux au perfet",
    en: "Catalan: pronominal verbs in the perfet"
  },
  level: "A2",
  note: {
    fr: "m'he llevat, s'ha adormit, ens hem descuidat : le pronom avant haver.",
    en: "m'he llevat, s'ha adormit: pronoun before haver."
  },
  country: "catalonia",
  jsonPath: "/data/grammar_quizz/cat_pronominals_perfet.json"
},
{
  id: "catala_preterit_perfet",
  title: {
    fr: "Catalan – Le pretèrit perfet (he pintat)",
    en: "Catalan – The pretèrit perfet (he pintat)"
  },


// ===== grammar.ts — PARTIE 3 / 18  (lignes 224-333) =====
  level: "A2",
  note: {
    fr: "he/has/ha + participe : quand et comment.",
    en: "he/has/ha + participle: when and how."
  },
  country: "catalonia",
  jsonPath: "/data/grammar_quizz/catala_preterit_perfet.json"
},
{
  id: "catala_casa_meva_llocs",
  title: {
    fr: "Catalan – 'a casa', 'casa meva' et lieux sans article",
    en: "Catalan – 'a casa', 'casa meva' and article-less places"
  },
  level: "A2",
  note: {
    fr: "Pourquoi on dit 'a casa' et pas 'la meva casa'.",
    en: "Why Catalan says 'a casa', not 'la meva casa'."
  },
  country: "catalonia",
  jsonPath: "/data/grammar_quizz/catala_casa_meva_llocs.json"
},
{
    id: "cat_imperatiu",
    title: { fr: "Catalan : l'impératif", en: "Catalan: the imperative" },
    level: "A1-A2",
    note: { fr: "Ordres et conseils : parla, menja, fes, vine, digues, ves.", en: "Orders and advice: parla, menja, fes, vine, digues, ves." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_imperatiu.json"
  },
  {
    id: "cat_present_perfet",
    title: { fr: "Catalan : le passé composé (present perfet)", en: "Catalan: present perfect" },
    level: "A1-A2",
    note: { fr: "haver + participe : he parlat, has fet, ha vist. Le passé du jour.", en: "haver + participle: he parlat, has fet, ha vist." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_present_perfet.json"
  },
  {
    id: "cat_preposicions",
    title: { fr: "Catalan : les prépositions", en: "Catalan: prepositions" },
    level: "A1-A2",
    note: { fr: "a, de, amb, per, cap a, sense, fins a : emplois et pièges.", en: "a, de, amb, per, cap a, sense, fins a." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_preposicions.json"
  },
  {
    id: "cat_adverbis_lloc",
    title: { fr: "Catalan : adverbes de lieu", en: "Catalan: place adverbs" },
    level: "A1-A2",
    note: { fr: "aquí, allà, a dalt, a baix, sota, sobre, a prop : situer dans l'espace.", en: "aquí, allà, a dalt, a baix, sota, sobre, a prop." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_adverbis_lloc.json"
  },
  {
    id: "cat_ser_estar_haverhi",
    title: { fr: "Catalan : ser, estar et haver-hi", en: "Catalan: ser, estar and haver-hi" },
    level: "A1-A2",
    note: { fr: "ser (identité + lieu), estar (état), hi ha (il y a). Diffère de l'espagnol.", en: "ser (identity + place), estar (state), hi ha (there is). Differs from Spanish." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_ser_estar_haverhi.json"
  },
  {
    id: "cat_numeros_hores",
    title: { fr: "Catalan : nombres et heure", en: "Catalan: numbers and time" },
    level: "A1-A2",
    note: { fr: "Écrire les nombres (dotze, setze, vint-i-u) et dire l'heure.", en: "Writing numbers and telling time." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_numeros_hores.json"
  },
  {
    id: "presente_regulares",
    title: { fr: "Présent – verbes réguliers (-ar, -er, -ir)", en: "Present tense – regular verbs (-ar, -er, -ir)" },
    level: "A1",
    note: { fr: "Conjugaison des verbes réguliers au présent.", en: "Conjugation of regular verbs in the present tense." },
    country: "all",
    jsonPath: "/data/grammar_quizz/presente_regulares.json"
  },
  {
    id: "presente_irregulares",
    title: { fr: "Présent – verbes irréguliers (tener, ser, ir, hacer, venir, decir...)", en: "Present tense – irregular verbs (tener, ser, ir, hacer, venir, decir...)" },
    level: "A1",
    note: { fr: "Conjugaison des principaux verbes irréguliers au présent.", en: "Conjugation of main irregular verbs in the present tense." },
    country: "all",
    jsonPath: "/data/grammar_quizz/presente_irregulares.json"
  },
  {
    id: "ser_estar",
    title: { fr: "SER vs ESTAR – Les différences complètes", en: "SER vs ESTAR – Complete differences" },
    level: "A1-A2",
    note: { fr: "Comprendre quand utiliser SER ou ESTAR.", en: "Understanding when to use SER or ESTAR." },
    country: "all",
    jsonPath: "/data/grammar_quizz/ser_estar.json"
  },
  {
    id: "hay_estar",
    title: { fr: "HAY vs ESTAR", en: "HAY vs ESTAR" },
    level: "A1-A2",
    note: { fr: "Différence entre HAY (il y a) et ESTAR (être situé).", en: "Difference between HAY (there is/are) and ESTAR (to be located)." },
    country: "all",
    jsonPath: "/data/grammar_quizz/hay_estar.json"
  },
  {
    id: "gustar",
    title: { fr: "GUSTAR et verbes similaires", en: "GUSTAR and similar verbs" },
    level: "A1-A2",
    note: { fr: "Structure du verbe GUSTAR (plaire) et verbes similaires.", en: "Structure of the verb GUSTAR (to like) and similar verbs." },
    country: "all",
    jsonPath: "/data/grammar_quizz/gustar.json"
  },

// ===== grammar.ts — PARTIE 4 / 18  (lignes 334-445) =====
  {
    id: "articulos_definidos",
    title: { fr: "Articles définis (el, la, los, las)", en: "Definite articles (el, la, los, las)" },
    level: "A1",
    note: { fr: "Usage des articles définis en espagnol.", en: "Usage of definite articles in Spanish." },
    country: "all",
    jsonPath: "/data/grammar_quizz/articulos_definidos.json"
  },
  {
    id: "articulos_indefinidos",
    title: { fr: "Articles indéfinis (un, una, unos, unas)", en: "Indefinite articles (un, una, unos, unas)" },
    level: "A1",
    note: { fr: "Usage des articles indéfinis en espagnol.", en: "Usage of indefinite articles in Spanish." },
    country: "all",
    jsonPath: "/data/grammar_quizz/articulos_indefinidos.json"
  },
  {
    id: "genero_sustantivos",
    title: { fr: "Genre des noms (el / la)", en: "Gender of nouns (el / la)" },
    level: "A1",
    note: { fr: "Règles pour déterminer le genre des noms.", en: "Rules for determining the gender of nouns." },
    country: "all",
    jsonPath: "/data/grammar_quizz/genero_sustantivos.json"
  },
  {
    id: "plural",
    title: { fr: "Pluriel des noms", en: "Plural of nouns" },
    level: "A1",
    note: { fr: "Formation du pluriel en espagnol.", en: "Formation of the plural in Spanish." },
    country: "all",
    jsonPath: "/data/grammar_quizz/plural.json"
  },
  {
    id: "acuerdo_adjetivos",
    title: { fr: "Accord des adjectifs", en: "Agreement of adjectives" },
    level: "A1",
    note: { fr: "Accord des adjectifs en genre et en nombre.", en: "Agreement of adjectives in gender and number." },
    country: "all",
    jsonPath: "/data/grammar_quizz/acuerdo_adjetivos.json"
  },
  {
    id: "demostrativos",
    title: { fr: "Les démonstratifs (este, ese, aquel)", en: "Demonstratives (este, ese, aquel)" },
    level: "A1",
    note: { fr: "Adjectifs et pronoms démonstratifs.", en: "Demonstrative adjectives and pronouns." },
    country: "all",
    jsonPath: "/data/grammar_quizz/demostrativos.json"
  },
  {
    id: "posesivos",
    title: { fr: "Les adjectifs et pronoms possessifs", en: "Possessive adjectives and pronouns" },
    level: "A1-A2",
    note: { fr: "Adjectifs possessifs (mi, tu, su) et pronoms possessifs.", en: "Possessive adjectives (mi, tu, su) and possessive pronouns." },
    country: "all",
    jsonPath: "/data/grammar_quizz/posesivos.json"
  },
  {
    id: "pronombres_posesivos",
    title: { fr: "Pronoms possessifs (mío, tuyo, suyo...)", en: "Possessive pronouns (mío, tuyo, suyo...)" },
    level: "A2",
    note: { fr: "Utilisation des pronoms possessifs détachés.", en: "Use of standalone possessive pronouns." },
    country: "all",
    jsonPath: "/data/grammar_quizz/pronombres_posesivos.json"
  },
  {
    id: "pronombres",
    title: { fr: "Pronoms personnels sujets", en: "Subject personal pronouns" },
    level: "A1",
    note: { fr: "Pronoms personnels sujets (yo, tú, él...).", en: "Subject personal pronouns (yo, tú, él...)." },
    country: "all",
    jsonPath: "/data/grammar_quizz/pronombres.json"
  },
  {
    id: "pronombres_complemento",
    title: { fr: "Pronoms compléments (COD et COI)", en: "Object pronouns (direct and indirect)" },
    level: "A2",
    note: { fr: "Pronoms compléments d'objet direct et indirect.", en: "Direct and indirect object pronouns." },
    country: "all",
    jsonPath: "/data/grammar_quizz/pronombres_complemento.json"
  },
  {
    id: "pronombres_relativos",
    title: { fr: "Pronoms relatifs (que, quien, donde, cual)", en: "Relative pronouns (que, quien, donde, cual)" },
    level: "A2-B1",
    note: { fr: "Pronoms relatifs pour relier deux propositions.", en: "Relative pronouns to connect two clauses." },
    country: "all",
    jsonPath: "/data/grammar_quizz/pronombres_relativos.json"
  },
  {
    id: "preposiciones_a_en_de",
    title: { fr: "Prépositions A, EN, DE", en: "Prepositions A, EN, DE" },
    level: "A1-A2",
    note: { fr: "Utilisation des prépositions principales.", en: "Use of main prepositions." },
    country: "all",
    jsonPath: "/data/grammar_quizz/preposiciones_a_en_de.json"
  },
  {
    id: "preposicion_de",
    title: { fr: "Préposition DE (possession, origine, matière, contenu)", en: "Preposition DE (possession, origin, material, content)" },
    level: "A1",
    note: { fr: "Les différents usages de la préposition DE.", en: "Different uses of the preposition DE." },
    country: "all",
    jsonPath: "/data/grammar_quizz/preposicion_de.json"
  },
  {
    id: "preposiciones_lugar",
    title: { fr: "Les prépositions de lieu", en: "Prepositions of place" },
    level: "A1-A2",
    note: { fr: "Prépositions pour indiquer la position.", en: "Prepositions to indicate position." },
    country: "all",
    jsonPath: "/data/grammar_quizz/preposiciones_lugar.json"
  },
