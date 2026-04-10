"use client";

import { useState, useEffect } from 'react';

type Props = {
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'ALL';
  country: string;
};

const CAT_PRONOUNS = ['jo','tu','ell/ella','nosaltres','vosaltres','ells/elles'];

const P_AR = {
  present:      ['parlo','parles','parla','parlem','parleu','parlen'],
  imperfect:    ['parlava','parlaves','parlava','parlàvem','parlàveu','parlaven'],
  future:       ['parlare','parlaras','parlara','parlarem','parlareu','parlaran'],
  periphrastic: ['vaig parlar','vas parlar','va parlar','vam parlar','vau parlar','van parlar'],
};
const P_ER = {
  present:      ['bec','beus','beu','bevem','beveu','beuen'],
  imperfect:    ['bevia','bevies','bevia','beviem','bevieu','bevien'],
  future:       ['beure','beuràs','beura','beurem','beureu','beuran'],
  periphrastic: ['vaig beure','vas beure','va beure','vam beure','vau beure','van beure'],
};
const P_IR = {
  present:      ['llegeixo','llegeixes','llegeix','llegim','llegiu','llegeixen'],
  imperfect:    ['llegia','llegies','llegia','llegiem','llegieu','llegien'],
  future:       ['llegire','llegiras','llegira','llegirem','llegireu','llegiran'],
  periphrastic: ['vaig llegir','vas llegir','va llegir','vam llegir','vau llegir','van llegir'],
};

const CAT_GROUPS_FR = [
  {
    name: 'Groupe 1 - verbes en -AR', color: '#3b82f6',
    desc: 'Present : -o/-es/-a/-em/-eu/-en',
    examples: ['parlar (parler)','treballar (travailler)','comprar (acheter)','estudiar (etudier)'],
    verb: 'parlar', conj: P_AR,
  },
  {
    name: 'Groupe 2 - verbes en -RE / -ER', color: '#10b981',
    desc: 'Present : -o/-s/rien (3e sg)/-em/-eu/-en',
    examples: ['beure (boire)','viure (vivre)','vendre (vendre)','correr (courir)'],
    verb: 'beure', conj: P_ER,
  },
  {
    name: 'Groupe 3 - verbes en -IR', color: '#f59e0b',
    desc: 'PUR (dormir) vs INCOATIF (llegir) : infixe -eix-',
    examples: ['dormir - pur','sortir - pur','llegir (lire) - incoatif','servir - incoatif'],
    verb: 'llegir', conj: P_IR,
  },
];
const CAT_GROUPS_EN = [
  {
    name: 'Group 1 - -AR verbs', color: '#3b82f6',
    desc: 'Present: -o/-es/-a/-em/-eu/-en',
    examples: ['parlar (to speak)','treballar (to work)','comprar (to buy)','estudiar (to study)'],
    verb: 'parlar', conj: P_AR,
  },
  {
    name: 'Group 2 - -RE / -ER verbs', color: '#10b981',
    desc: 'Present: -o/-s/nothing (3rd sg)/-em/-eu/-en',
    examples: ['beure (to drink)','viure (to live)','vendre (to sell)','correr (to run)'],
    verb: 'beure', conj: P_ER,
  },
  {
    name: 'Group 3 - -IR verbs', color: '#f59e0b',
    desc: 'PURE (dormir) vs INCHOATIVE (llegir): -eix- infix',
    examples: ['dormir - pure','sortir - pure','llegir (to read) - inchoative','servir - inchoative'],
    verb: 'llegir', conj: P_IR,
  },
];

const CAT_IRREGULARS = [
  { verb: 'ser',   fr: 'etre (identite)',  en: 'to be (identity)',
    present: ['soc','ets','es','som','sou','son'],             note: 'Irregulier complet' },
  { verb: 'estar', fr: 'etre (etat)',      en: 'to be (state)',
    present: ['estic','estas','esta','estem','esteu','estan'], note: 'Irregulier sing.' },
  { verb: 'tenir', fr: 'avoir',            en: 'to have',
    present: ['tinc','tens','te','tenim','teniu','tenen'],     note: 'tinc / te' },
  { verb: 'anar',  fr: 'aller',            en: 'to go',
    present: ['vaig','vas','va','anem','aneu','van'],          note: 'Base passe periphr.' },
  { verb: 'fer',   fr: 'faire',            en: 'to do/make',
    present: ['faig','fas','fa','fem','feu','fan'],            note: 'faig (1sg)' },
  { verb: 'voler', fr: 'vouloir',          en: 'to want',
    present: ['vull','vols','vol','volem','voleu','volen'],    note: 'vull (1sg)' },
  { verb: 'poder', fr: 'pouvoir',          en: 'can',
    present: ['puc','pots','pot','podem','podeu','poden'],     note: 'puc (1sg)' },
  { verb: 'saber', fr: 'savoir',           en: 'to know',
    present: ['se','saps','sap','sabem','sabeu','saben'],      note: 'se (1sg)' },
  { verb: 'venir', fr: 'venir',            en: 'to come',
    present: ['vinc','vens','ve','venim','veniu','venen'],     note: 'vinc (1sg)' },
  { verb: 'dir',   fr: 'dire',             en: 'to say',
    present: ['dic','dius','diu','diem','dieu','diuen'],       note: 'dic (1sg)' },
];

const CAT_EXERCISES = [
  { pronoun: 'jo',         verb: 'parlar',
    tense: 'present',   answer: 'parlo',      context: 'Jo ___ catala cada dia.' },
  { pronoun: 'tu',         verb: 'tenir',
    tense: 'present',   answer: 'tens',       context: 'Tu ___ un gat.' },
  { pronoun: 'ell/ella',   verb: 'ser',
    tense: 'present',   answer: 'es',         context: 'Ella ___ de Barcelona.' },
  { pronoun: 'nosaltres',  verb: 'anar',
    tense: 'present',   answer: 'anem',       context: 'Nosaltres ___ al mercat.' },
  { pronoun: 'vosaltres',  verb: 'fer',
    tense: 'present',   answer: 'feu',        context: 'Vosaltres ___ molt be.' },
  { pronoun: 'ells/elles', verb: 'voler',
    tense: 'present',   answer: 'volen',      context: 'Ells ___ aprendre catala.' },
  { pronoun: 'jo',         verb: 'anar',
    tense: 'passe',     answer: 'vaig anar',  context: 'Ahir, jo ___ a la platja.' },
  { pronoun: 'tu',         verb: 'menjar',
    tense: 'passe',     answer: 'vas menjar', context: 'Ahir, tu ___ pa.' },
  { pronoun: 'ell/ella',   verb: 'fer',
    tense: 'passe',     answer: 'va fer',     context: 'Ahir, ell ___ els deures.' },
  { pronoun: 'nosaltres',  verb: 'parlar',
    tense: 'passe',     answer: 'vam parlar', context: 'Ahir, nosaltres ___ molt.' },
  { pronoun: 'jo',         verb: 'treballar',
    tense: 'imparfait', answer: 'treballava', context: 'Abans, jo ___ a Madrid.' },
  { pronoun: 'tu',         verb: 'ser',
    tense: 'imparfait', answer: 'eres',       context: 'De petit, tu ___ timid.' },
  { pronoun: 'jo',         verb: 'parlar',
    tense: 'futur',     answer: 'parlare',    context: 'Dema, jo ___ amb ell.' },
  { pronoun: 'tu',         verb: 'tenir',
    tense: 'futur',     answer: 'tindras',    context: 'Dema, tu ___ temps.' },
  { pronoun: 'ell/ella',   verb: 'fer',
    tense: 'futur',     answer: 'fara',       context: 'Dema, ella ___ una paella.' },
];

function CatalanSection({ language }: { language: 'fr' | 'en' }) {
  const [catMode, setCatMode] = useState<'theory' | 'irregular' | 'practice'>('theory');
  const [selectedGroup, setSelectedGroup] = useState(0);
  const [selectedTense, setSelectedTense] = useState<
    'present' | 'imperfect' | 'future' | 'periphrastic'
  >('present');
  const [exIdx, setExIdx] = useState(0);
  const [answer, setAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const groups = language === 'fr' ? CAT_GROUPS_FR : CAT_GROUPS_EN;
  const group = groups[selectedGroup];
  const ex = CAT_EXERCISES[exIdx];

  const tenseLabel = {
    fr: { present: 'Present', imperfect: 'Imparfait', future: 'Futur', periphrastic: 'Passe' },
    en: { present: 'Present', imperfect: 'Imperfect', future: 'Future', periphrastic: 'Past' },
  };

  const checkAnswer = () => {
    const ok = answer.trim().toLowerCase() === ex.answer.toLowerCase();
    setShowResult(true);
    setScore(p => ({ correct: p.correct + (ok ? 1 : 0), total: p.total + 1 }));
  };
  const nextEx = () => {
    setExIdx(i => (i + 1) % CAT_EXERCISES.length);
    setAnswer('');
    setShowResult(false);
  };

  return (
    <div className="space-y-4">
      <div className="bg-yellow-900/20 border border-yellow-700 rounded-xl p-4 text-center">
        <p className="text-yellow-300 font-bold text-lg">Conjugacio catalana</p>
        <p className="text-slate-400 text-sm mt-1">
          {language === 'fr' ? '3 groupes verbaux + irreguliers' : '3 verb groups + irregulars'}
        </p>
      </div>
      <div className="flex gap-2 flex-wrap">
        {[
          { key: 'theory',    label: language === 'fr' ? 'Groupes' : 'Groups' },
          { key: 'irregular', label: language === 'fr' ? 'Irreguliers' : 'Irregulars' },
          { key: 'practice',  label: language === 'fr' ? 'Pratique' : 'Practice' },
        ].map(tab => (
          <button key={tab.key} onClick={() => setCatMode(tab.key as typeof catMode)}
            className={`px-4 py-2 rounded-lg font-semibold transition text-sm ${
              catMode === tab.key
                ? 'bg-yellow-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {catMode === 'theory' && (
        <div className="space-y-4">
          {/* Sélecteur groupe */}
          <div className="flex gap-2">
            {groups.map((g, i) => (
              <button key={i} onClick={() => setSelectedGroup(i)}
                className="px-3 py-2 rounded-lg text-sm font-bold transition flex-1"
                style={{
                  background: selectedGroup === i ? g.color : '#1e293b',
                  color: 'white',
                  border: `2px solid ${g.color}`,
                }}>
                {i === 0 ? '-AR' : i === 1 ? '-RE/-ER' : '-IR'}
              </button>
            ))}
          </div>

          {/* Sélecteur temps */}
          <div className="flex gap-2">
            {(['present','imperfect','future','periphrastic'] as const).map(t => (
              <button key={t} onClick={() => setSelectedTense(t)}
                className="px-2 py-2 rounded-lg text-xs font-bold transition flex-1"
                style={{
                  background: selectedTense === t ? group.color : '#0f172a',
                  color: 'white',
                  border: `1px solid ${selectedTense === t ? group.color : '#334155'}`,
                }}>
                {tenseLabel[language][t]}
              </button>
            ))}
          </div>

          {/* Info groupe */}
          <div className="rounded-xl p-4 border"
            style={{ background: group.color + '18', borderColor: group.color + '55' }}>
            <h3 className="font-bold text-base mb-1" style={{ color: group.color }}>
              {group.name}
            </h3>
            <p className="text-slate-300 text-sm mb-2">{group.desc}</p>
            <div className="flex flex-wrap gap-1">
              {group.examples.map((e, i) => (
                <span key={i} className="px-2 py-0.5 bg-slate-900 rounded text-xs text-slate-300">
                  {e}
                </span>
              ))}
            </div>
          </div>

          {/* Tableau conjugaison */}
          <div className="rounded-xl overflow-hidden border border-slate-700">
            <div className="grid grid-cols-2 text-xs font-bold uppercase tracking-wide"
              style={{ background: group.color }}>
              <div className="px-4 py-2 text-white">
                {language === 'fr' ? 'Pronom' : 'Pronoun'}
              </div>
              <div className="px-4 py-2 text-white">
                {group.verb} — {tenseLabel[language][selectedTense]}
              </div>
            </div>
            {CAT_PRONOUNS.map((pron, i) => (
              <div key={i}
                className={`grid grid-cols-2 border-b border-slate-700 last:border-b-0 ${
                  i % 2 === 0 ? 'bg-slate-900' : 'bg-slate-800'
                }`}>
                <div className="px-4 py-3 text-slate-400 text-sm">{pron}</div>
                <div className="px-4 py-3 font-bold text-base"
                  style={{ color: group.color }}>
                  {group.conj[selectedTense][i]}
                </div>
              </div>
            ))}
          </div>

          {selectedTense === 'periphrastic' && (
            <div className="p-3 bg-blue-950/30 border border-blue-800 rounded-lg">
              <p className="text-blue-300 text-xs">
                {language === 'fr'
                  ? 'Passe periphr. = anar (present) + infinitif. LE temps du passe oral.'
                  : 'Periphrastic past = anar (present) + infinitive. THE spoken past tense.'}
              </p>
            </div>
          )}
        </div>
      )}

      {catMode === 'irregular' && (
        <div className="space-y-3">
          <div className="bg-red-950/30 border border-red-800 rounded-xl p-3">
            <p className="text-red-300 text-sm">
              {language === 'fr'
                ? '10 verbes tres frequents, entierement irreguliers.'
                : '10 very frequent and fully irregular verbs.'}
            </p>
          </div>
          {CAT_IRREGULARS.map((v, i) => (
            <div key={i} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="text-lg font-bold text-yellow-400">{v.verb}</span>
                  <span className="text-slate-400 text-sm ml-2">
                    {language === 'fr' ? v.fr : v.en}
                  </span>
                </div>
                <span className="text-xs text-orange-400">{v.note}</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                {CAT_PRONOUNS.map((pron, j) => (
                  <div key={j} className="flex justify-between p-1 bg-slate-900 rounded text-sm">
                    <span className="text-slate-400">{pron}</span>
                    <span className="font-mono text-yellow-300">{v.present[j]}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {catMode === 'practice' && (
        <div className="space-y-4">
          <div className="bg-slate-800 rounded-xl p-3 text-center border border-slate-700">
            <span className="text-slate-400">Score: </span>
            <span className="text-green-400 font-bold text-xl">{score.correct}</span>
            <span className="text-slate-500"> / {score.total}</span>
            <span className="text-slate-500 ml-2 text-sm">
              ({exIdx + 1}/{CAT_EXERCISES.length})
            </span>
          </div>
          <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 space-y-4">
            <div className="bg-yellow-950/30 border border-yellow-800 rounded-lg p-3">
              <p className="text-white text-lg font-semibold italic">"{ex.context}"</p>
            </div>
            <div className="text-center">
              <p className="text-slate-400 text-sm mb-1">
                {language === 'fr' ? 'Conjugue' : 'Conjugate'}
              </p>
              <p className="text-3xl font-bold text-yellow-400">{ex.verb}</p>
              <p className="text-xl text-slate-300">({ex.pronoun})</p>
              <p className="text-xs text-slate-500 mt-1">{ex.tense}</p>
            </div>
            {!showResult ? (
              <>
                <input type="text" value={answer}
                  onChange={e => setAnswer(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && checkAnswer()}
                  placeholder="..."
                  className="w-full px-6 py-4 bg-slate-900 border border-slate-700 rounded-lg text-white text-center text-2xl focus:outline-none"
                  autoFocus
                />
                <button onClick={checkAnswer} disabled={!answer.trim()}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 text-white font-bold py-4 rounded-lg transition text-xl">
                  {language === 'fr' ? 'Verifier' : 'Check'}
                </button>
              </>
            ) : (
              <>
                <div className={`p-5 rounded-lg text-center ${
                  answer.trim().toLowerCase() === ex.answer.toLowerCase()
                    ? 'bg-green-900/30 border-2 border-green-600'
                    : 'bg-red-900/30 border-2 border-red-600'
                }`}>
                  <div className="text-2xl mb-2">
                    {answer.trim().toLowerCase() === ex.answer.toLowerCase()
                      ? 'Correct!' : 'Incorrect'}
                  </div>
                  {answer.trim().toLowerCase() !== ex.answer.toLowerCase() && (
                    <p className="text-2xl font-bold text-green-400">{ex.answer}</p>
                  )}
                </div>
                <button onClick={nextEx}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition text-xl">
                  {language === 'fr' ? 'Suivant' : 'Next'} →
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// =============================================================================

// SPANISH DATA
// =============================================================================

const ALL_TENSES = [
  'presente','preterito_perfecto','imperativo','imperfecto',
  'futuro','preterito','condicional','pluscuamperfecto','subjuntivo_presente',
];
const TENSES_BY_LEVEL: Record<string, string[]> = {
  A1:  ['presente','preterito_perfecto','imperativo'],
  A2:  ['presente','preterito_perfecto','imperativo','imperfecto','futuro'],
  B1:  ['presente','preterito_perfecto','imperativo','imperfecto','futuro','preterito','condicional'],
  B2:  ALL_TENSES,
  C1:  ALL_TENSES,
  C2:  ALL_TENSES,
  ALL: ALL_TENSES,
};

const CTX_PRESENTE = [
  'Cada dia, yo ___','Ahora, tu ___','El ___ siempre',
  'Nosotros ___ juntos','Vosotros ___ bien','Ellos ___ mucho',
];
const CTX_PRET_PERF = [
  'Hoy, yo ___','Esta semana, tu ___','Este mes, el ___',
  'Este anio, nosotros ___','Ultimamente, vosotros ___','Recientemente, ellos ___',
];
const CTX_IMPERATIVO = [
  'Hazlo tu: ___','Digale usted: ___','Hagamos: ___',
  'Hablad vosotros: ___','Hablen ustedes: ___','Ven aqui tu: ___',
];
const CTX_PRETERITO = [
  'Ayer, yo ___','La semana pasada, tu ___','Hace dos dias, el ___',
  'El mes pasado, nosotros ___','Ese dia, vosotros ___','Anteayer, ellos ___',
];
const CTX_IMPERFECTO = [
  'De nino, yo ___','Antes, tu ___ siempre','En esa epoca, el ___',
  'Cada verano, nosotros ___','Los sabados, vosotros ___','De joven, ellos ___',
];
const CTX_FUTURO = [
  'Manana, yo ___','La semana que viene, tu ___','El mes proximo, el ___',
  'En un mes, nosotros ___','Pronto, vosotros ___','Algun dia, ellos ___',
];
const CTX_CONDICIONAL = [
  'En tu lugar, yo ___','Si pudieras, tu ___','El dijo que ___',
  'Con tiempo, nosotros ___','En esa situacion, vosotros ___','Con dinero, ellos ___',
];
const CTX_PLUSCUAM = [
  'Antes, yo ya ___','Cuando llegaste, tu ya ___','Cuando llegue, el ya ___',
  'Antes de salir, nosotros ya ___','Cuando llame, vosotros ya ___','Antes, ellos ya ___',
];
const CTX_SUBJUNTIVO = [
  'Espero que yo ___','Quiero que tu ___','Es importante que el ___',
  'Ojala nosotros ___','Dudo que vosotros ___','No creo que ellos ___',
];
const CTX: Record<string, string[]> = {
  presente:            CTX_PRESENTE,
  preterito_perfecto:  CTX_PRET_PERF,
  imperativo:          CTX_IMPERATIVO,
  preterito:           CTX_PRETERITO,
  imperfecto:          CTX_IMPERFECTO,
  futuro:              CTX_FUTURO,
  condicional:         CTX_CONDICIONAL,
  pluscuamperfecto:    CTX_PLUSCUAM,
  subjuntivo_presente: CTX_SUBJUNTIVO,
};

type ConjugationExercise = {
  id: number; verb: string; pronoun: number;
  tense: string; contextPhrase: string; answer: string;
};

const C1 = ['hablo','hablas','habla','hablamos','habláis','hablan'];
const C2 = ['como','comes','come','comemos','coméis','comen'];
const C3 = ['vivo','vives','vive','vivimos','vivís','viven'];
const C4 = ['soy','eres','es','somos','sois','son'];
const C5 = ['estoy','estás','está','estamos','estáis','están'];
const C6 = ['tengo','tienes','tiene','tenemos','tenéis','tienen'];
const C7 = ['hago','haces','hace','hacemos','hacéis','hacen'];
const C8 = ['voy','vas','va','vamos','vais','van'];
const C9 = ['vengo','vienes','viene','venimos','venís','vienen'];
const C10 = ['digo','dices','dice','decimos','decís','dicen'];

const PP1 = ['he hablado','has hablado','ha hablado','hemos hablado','habéis hablado','han hablado'];
const PP2 = ['he comido','has comido','ha comido','hemos comido','habéis comido','han comido'];
const PP3 = ['he vivido','has vivido','ha vivido','hemos vivido','habéis vivido','han vivido'];
const PP4 = ['he hecho','has hecho','ha hecho','hemos hecho','habéis hecho','han hecho'];
const PP5 = ['he visto','has visto','ha visto','hemos visto','habéis visto','han visto'];
const PP6 = ['he dicho','has dicho','ha dicho','hemos dicho','habéis dicho','han dicho'];
const PP7 = ['he puesto','has puesto','ha puesto','hemos puesto','habéis puesto','han puesto'];
const PP8 = ['he escrito','has escrito','ha escrito','hemos escrito','habéis escrito','han escrito'];

const PQ1a = ['habia hablado','habias hablado','habia hablado'];
const PQ1b = ['habiamos hablado','habiais hablado','habian hablado'];
const PQ1 = [...PQ1a, ...PQ1b];
const PQ2a = ['habia comido','habias comido','habia comido'];
const PQ2b = ['habiamos comido','habiais comido','habian comido'];
const PQ2 = [...PQ2a, ...PQ2b];
const PQ3a = ['habia vivido','habias vivido','habia vivido'];
const PQ3b = ['habiamos vivido','habiais vivido','habian vivido'];
const PQ3 = [...PQ3a, ...PQ3b];
const PQ4a = ['habia hecho','habias hecho','habia hecho'];
const PQ4b = ['habiamos hecho','habiais hecho','habian hecho'];
const PQ4 = [...PQ4a, ...PQ4b];
const PQ5a = ['habia visto','habias visto','habia visto'];
const PQ5b = ['habiamos visto','habiais visto','habian visto'];
const PQ5 = [...PQ5a, ...PQ5b];
const PQ6a = ['habia escrito','habias escrito','habia escrito'];
const PQ6b = ['habiamos escrito','habiais escrito','habian escrito'];
const PQ6 = [...PQ6a, ...PQ6b];


const verbsByTense: Record<string, Array<{ verb: string; conjugations: string[] }>> = {
  presente: [
    { verb: 'hablar', conjugations: C1 },
    { verb: 'comer',  conjugations: C2 },
    { verb: 'vivir',  conjugations: C3 },
    { verb: 'ser',    conjugations: C4 },
    { verb: 'estar',  conjugations: C5 },
    { verb: 'tener',  conjugations: C6 },
    { verb: 'hacer',  conjugations: C7 },
    { verb: 'ir',     conjugations: C8 },
    { verb: 'venir',  conjugations: C9 },
    { verb: 'decir',  conjugations: C10 },
  ],
  preterito_perfecto: [
    { verb: 'hablar',   conjugations: PP1 },
    { verb: 'comer',    conjugations: PP2 },
    { verb: 'vivir',    conjugations: PP3 },
    { verb: 'hacer',    conjugations: PP4 },
    { verb: 'ver',      conjugations: PP5 },
    { verb: 'decir',    conjugations: PP6 },
    { verb: 'poner',    conjugations: PP7 },
    { verb: 'escribir', conjugations: PP8 },
  ],
  imperativo: [
    { verb: 'hablar', conjugations: ['habla','hable','hablemos','hablad','hablen'] },
    { verb: 'comer',  conjugations: ['come','coma','comamos','comed','coman'] },
    { verb: 'vivir',  conjugations: ['vive','viva','vivamos','vivid','vivan'] },
    { verb: 'ser',    conjugations: ['se','sea','seamos','sed','sean'] },
    { verb: 'estar',  conjugations: ['esta','este','estemos','estad','esten'] },
    { verb: 'ir',     conjugations: ['ve','vaya','vamos','id','vayan'] },
    { verb: 'tener',  conjugations: ['ten','tenga','tengamos','tened','tengan'] },
    { verb: 'hacer',  conjugations: ['haz','haga','hagamos','haced','hagan'] },
  ],
  preterito: [
    { verb: 'hablar', conjugations: ['hable','hablaste','habló','hablamos','hablasteis','hablaron'] },
    { verb: 'comer',  conjugations: ['comi','comiste','comio','comimos','comisteis','comieron'] },
    { verb: 'vivir',  conjugations: ['vivi','viviste','vivio','vivimos','vivisteis','vivieron'] },
    { verb: 'ser',    conjugations: ['fui','fuiste','fue','fuimos','fuisteis','fueron'] },
    { verb: 'hacer',  conjugations: ['hice','hiciste','hizo','hicimos','hicisteis','hicieron'] },
    { verb: 'tener',  conjugations: ['tuve','tuviste','tuvo','tuvimos','tuvisteis','tuvieron'] },
    { verb: 'estar',  conjugations: ['estuve','estuviste','estuvo','estuvimos','estuvisteis','estuvieron'] },
  ],
  imperfecto: [
    { verb: 'hablar', conjugations: ['hablaba','hablabas','hablaba','hablábamos','hablabais','hablaban'] },
    { verb: 'comer',  conjugations: ['comia','comias','comia','comiamos','comiais','comian'] },
    { verb: 'vivir',  conjugations: ['vivia','vivias','vivia','viviamos','viviais','vivian'] },
    { verb: 'ser',    conjugations: ['era','eras','era','éramos','erais','eran'] },
    { verb: 'ir',     conjugations: ['iba','ibas','iba','ibamos','ibais','iban'] },
    { verb: 'ver',    conjugations: ['veia','veias','veia','veiamos','veiais','veian'] },
  ],
  futuro: [
    { verb: 'hablar', conjugations: ['hablare','hablaras','hablara','hablaremos','hablareis','hablaran'] },
    { verb: 'comer',  conjugations: ['comere','comeras','comera','comeremos','comereis','comeran'] },
    { verb: 'vivir',  conjugations: ['vivire','viviras','vivira','viviremos','vivireis','viviran'] },
    { verb: 'tener',  conjugations: ['tendre','tendras','tendra','tendremos','tendreis','tendran'] },
    { verb: 'poder',  conjugations: ['podre','podras','podra','podremos','podreis','podran'] },
    { verb: 'hacer',  conjugations: ['hare','haras','hara','haremos','hareis','haran'] },
    { verb: 'salir',  conjugations: ['saldre','saldras','saldra','saldremos','saldreis','saldran'] },
    { verb: 'venir',  conjugations: ['vendre','vendras','vendra','vendremos','vendreis','vendran'] },
  ],
  condicional: [
    { verb: 'hablar',
      conjugations: ['hablaria','hablarias','hablaria','hablariamos','hablariais','hablarian'] },
    { verb: 'comer',
      conjugations: ['comeria','comerias','comeria','comeriamos','comeriais','comerian'] },
    { verb: 'vivir',
      conjugations: ['viviria','vivirias','viviria','viviriamos','viviriais','vivirian'] },
    { verb: 'tener',
      conjugations: ['tendria','tendrias','tendria','tendriamos','tendriais','tendrian'] },
    { verb: 'poder',
      conjugations: ['podria','podrias','podria','podriamos','podriais','podrian'] },
    { verb: 'hacer',
      conjugations: ['haria','harias','haria','hariamos','hariais','harian'] },
  ],
  pluscuamperfecto: [
    { verb: 'hablar',   conjugations: PQ1 },
    { verb: 'comer',    conjugations: PQ2 },
    { verb: 'vivir',    conjugations: PQ3 },
    { verb: 'hacer',    conjugations: PQ4 },
    { verb: 'ver',      conjugations: PQ5 },
    { verb: 'escribir', conjugations: PQ6 },
  ],
  subjuntivo_presente: [
    { verb: 'hablar', conjugations: ['hable','hables','hable','hablemos','hableis','hablen'] },
    { verb: 'comer',  conjugations: ['coma','comas','coma','comamos','comais','coman'] },
    { verb: 'vivir',  conjugations: ['viva','vivas','viva','vivamos','vivais','vivan'] },
    { verb: 'ser',    conjugations: ['sea','seas','sea','seamos','seais','sean'] },
    { verb: 'estar',  conjugations: ['este','estes','este','estemos','esteis','esten'] },
    { verb: 'tener',  conjugations: ['tenga','tengas','tenga','tengamos','tengais','tengan'] },
    { verb: 'hacer',  conjugations: ['haga','hagas','haga','hagamos','hagais','hagan'] },
    { verb: 'ir',     conjugations: ['vaya','vayas','vaya','vayamos','vayais','vayan'] },
  ],
};

export default function Conjugation({ level }: Props) {
  const [mode, setMode] = useState<'theory' | 'practice'>('practice');
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [targetLanguage, setTargetLanguage] = useState<'spanish' | 'catalan'>('spanish');
  const [selectedTense, setSelectedTense] = useState('presente');
  const [currentExercise, setCurrentExercise] = useState<ConjugationExercise | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const availableTenses = TENSES_BY_LEVEL[level] || TENSES_BY_LEVEL.A1;

  useEffect(() => {
    const saved = localStorage.getItem('spanish-sprint-language');
    if (saved === 'fr' || saved === 'en') setLanguage(saved as 'fr' | 'en');
    const target = localStorage.getItem('iberian-sprint-target-language');
    if (target === 'catalan') setTargetLanguage('catalan');
  }, []);

  useEffect(() => {
    if (!availableTenses.includes(selectedTense)) setSelectedTense('presente');
  }, [level, availableTenses, selectedTense]);

  const generateExercise = () => {
    const verbs = verbsByTense[selectedTense] || verbsByTense.presente;
    const verb = verbs[Math.floor(Math.random() * verbs.length)];
    const isImp = selectedTense === 'imperativo';
    const idx = Math.floor(Math.random() * (isImp ? 5 : 6));
    const ctxArr = CTX[selectedTense] || CTX_PRESENTE;
    setCurrentExercise({
      id: Date.now(), verb: verb.verb, pronoun: idx,
      tense: selectedTense, contextPhrase: ctxArr[idx],
      answer: verb.conjugations[idx],
    });
    setUserAnswer('');
    setShowResult(false);
  };

  // useEffect AVANT le return conditionnel catalan
  useEffect(() => {
    if (mode === 'practice' && targetLanguage === 'spanish') generateExercise();
  }, [mode, selectedTense, targetLanguage]);

  // Return conditionnel APRES tous les hooks
  if (targetLanguage === 'catalan') return <CatalanSection language={language} />;

  const pronouns = ['yo','tu','el/ella','nosotros','vosotros','ellos/ellas'];
  const imperativePronouns = ['tu','usted','nosotros','vosotros','ustedes'];

  const tenses = {
    fr: {
      presente: 'Present', preterito_perfecto: 'Passe compose',
      imperativo: 'Imperatif', preterito: 'Passe simple',
      imperfecto: 'Imparfait', futuro: 'Futur',
      condicional: 'Conditionnel', pluscuamperfecto: 'Plus-que-parfait',
      subjuntivo_presente: 'Subjonctif',
    },
    en: {
      presente: 'Present', preterito_perfecto: 'Present Perfect',
      imperativo: 'Imperative', preterito: 'Preterite',
      imperfecto: 'Imperfect', futuro: 'Future',
      condicional: 'Conditional', pluscuamperfecto: 'Past Perfect',
      subjuntivo_presente: 'Subjunctive',
    },
  };

  const checkAnswer = () => {
    if (!currentExercise) return;
    const ok = userAnswer.trim().toLowerCase() === currentExercise.answer.toLowerCase();
    setShowResult(true);
    setScore(p => ({ correct: p.correct + (ok ? 1 : 0), total: p.total + 1 }));
  };

  const t = language === 'fr'
    ? { theory: 'Theorie', practice: 'Pratique', score: 'Score',
        hint: 'Phrase :', conjugate: 'Conjugue', check: 'Verifier',
        next: 'Suivant', correct: 'Correct !', incorrect: 'Incorrect',
        answer: 'Bonne reponse', select: 'Choisis un temps' }
    : { theory: 'Theory', practice: 'Practice', score: 'Score',
        hint: 'Context:', conjugate: 'Conjugate', check: 'Check',
        next: 'Next', correct: 'Correct!', incorrect: 'Incorrect',
        answer: 'Correct answer', select: 'Choose a tense' };

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-2">
        <button onClick={() => setMode('theory')}
          className={`px-6 py-3 rounded-lg font-bold transition ${
            mode === 'theory' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}>{t.theory}</button>
        <button onClick={() => setMode('practice')}
          className={`px-6 py-3 rounded-lg font-bold transition ${
            mode === 'practice' ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}>{t.practice}</button>
      </div>

      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <label className="block text-sm text-slate-400 mb-2">{t.select}</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {Object.entries(tenses[language])
            .filter(([key]) => availableTenses.includes(key))
            .map(([key, value]) => (
              <button key={key} onClick={() => setSelectedTense(key)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  selectedTense === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
                }`}>{value}</button>
            ))}
        </div>
      </div>

      {mode === 'practice' ? (
        <>
          <div className="bg-slate-800 rounded-xl p-4 text-center border border-slate-700">
            <span className="text-slate-400">{t.score}: </span>
            <span className="text-green-400 font-bold text-2xl">{score.correct}</span>
            <span className="text-slate-500"> / </span>
            <span className="font-bold text-2xl">{score.total}</span>
          </div>
          {currentExercise && (
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 space-y-4">
              <div className="bg-purple-900 bg-opacity-30 border border-purple-600 rounded-lg p-4">
                <div className="text-sm text-purple-300 mb-1">{t.hint}</div>
                <div className="text-lg font-semibold text-white italic">
                  "{currentExercise.contextPhrase}"
                </div>
              </div>
              <div className="text-center">
                <div className="text-slate-400 mb-2">{t.conjugate}</div>
                <div className="text-4xl font-bold text-blue-400 mb-1">{currentExercise.verb}</div>
                <div className="text-2xl text-slate-300">
                  ({selectedTense === 'imperativo'
                    ? imperativePronouns[currentExercise.pronoun]
                    : pronouns[currentExercise.pronoun]})
                </div>
              </div>
              {!showResult ? (
                <>
                  <input type="text" value={userAnswer}
                    onChange={e => setUserAnswer(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && checkAnswer()}
                    placeholder="..."
                    className="w-full px-6 py-4 bg-slate-900 border border-slate-700 rounded-lg text-white text-center text-2xl focus:outline-none"
                    autoFocus />
                  <button onClick={checkAnswer} disabled={!userAnswer.trim()}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold py-4 rounded-lg transition text-xl">
                    {t.check}
                  </button>
                </>
              ) : (
                <>
                  <div className={`p-6 rounded-lg text-center ${
                    userAnswer.trim().toLowerCase() === currentExercise.answer.toLowerCase()
                      ? 'bg-green-900 bg-opacity-30 border-2 border-green-600'
                      : 'bg-red-900 bg-opacity-30 border-2 border-red-600'
                  }`}>
                    <div className="text-3xl mb-4">
                      {userAnswer.trim().toLowerCase() === currentExercise.answer.toLowerCase()
                        ? t.correct : t.incorrect}
                    </div>
                    {userAnswer.trim().toLowerCase() !== currentExercise.answer.toLowerCase() && (
                      <div>
                        <div className="text-slate-400 mb-2">{t.answer}:</div>
                        <div className="text-3xl font-bold text-green-400">
                          {currentExercise.answer}
                        </div>
                      </div>
                    )}
                  </div>
                  <button onClick={generateExercise}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition text-xl">
                    {t.next} →
                  </button>
                </>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 max-h-96 overflow-y-auto space-y-4">
          {verbsByTense[selectedTense]?.map((verb, idx) => (
            <div key={idx} className="bg-slate-900 rounded-lg p-4">
              <h4 className="text-xl font-bold text-white mb-3 capitalize">{verb.verb}</h4>
              <div className="grid grid-cols-2 gap-2">
                {(selectedTense === 'imperativo' ? imperativePronouns : pronouns).map((p, i) => (
                  <div key={i} className="flex justify-between items-center p-2 bg-slate-800 rounded">
                    <span className="text-slate-400">{p}</span>
                    <span className="font-mono text-green-400">{verb.conjugations[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
