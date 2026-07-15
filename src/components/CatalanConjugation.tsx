"use client";
// src/components/CatalanConjugation.tsx
// Interface de conjugaison catalane. Les VERBES sont dans src/data/verbs/catalanConjugation.ts.

import { useState } from 'react';
import {
  CAT_PRONOUNS, CAT_GROUPS_FR, CAT_GROUPS_EN, CAT_IRREGULARS, CAT_EXERCISES,
} from '@/data/verbs/catalanConjugation';

export default function CatalanConjugation({ language }: { language: 'fr' | 'en' }) {
  const [catMode, setCatMode] = useState<'theory' | 'irregular' | 'practice'>('theory');
  const [selectedGroup, setSelectedGroup] = useState(0);
  const [selectedTense, setSelectedTense] = useState<
    'present' | 'imperfect' | 'future' | 'periphrastic'
  >('present');
  const [exIdx, setExIdx] = useState(0);
  const [answer, setAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [practiceFilter, setPracticeFilter] = useState('all');

  const filteredExercises = practiceFilter === 'all'
    ? CAT_EXERCISES
    : CAT_EXERCISES.filter(e => e.tense === practiceFilter);

  const ex = filteredExercises[exIdx % Math.max(filteredExercises.length, 1)] ?? CAT_EXERCISES[0];

  const groups = language === 'fr' ? CAT_GROUPS_FR : CAT_GROUPS_EN;
  const group = groups[selectedGroup];

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
    setExIdx(i => (i + 1) % Math.max(filteredExercises.length, 1));
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
            <div className="flex flex-col gap-1 mt-2">
              {group.examples.map((e, i) => (
                <span key={i} style={{
                  background: '#0f172a',
                  borderLeft: `3px solid ${group.color}`,
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontSize: '13px',
                  color: '#e2e8f0',
                }}>
                  {e}
                </span>
              ))}
            </div>
          </div>

          {/* Tableau conjugaison */}
          <table style={{ width: '100%', borderCollapse: 'collapse', borderRadius: '12px', overflow: 'hidden', border: '1px solid #334155' }}>
            <thead>
              <tr style={{ background: group.color }}>
                <th style={{ padding: '12px 16px', color: '#fff', textAlign: 'left', fontWeight: 'bold', width: '45%' }}>
                  {language === 'fr' ? 'Pronom' : 'Pronoun'}
                </th>
                <th style={{ padding: '12px 16px', color: '#fff', textAlign: 'left', fontWeight: 'bold', width: '55%' }}>
                  {group.verb} — {tenseLabel[language][selectedTense]}
                </th>
              </tr>
            </thead>
            <tbody>
              {CAT_PRONOUNS.map((pron, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? '#0f172a' : '#1e293b' }}>
                  <td style={{ padding: '12px 16px', color: '#94a3b8', fontSize: '15px', whiteSpace: 'nowrap' }}>
                    {pron}
                  </td>
                  <td style={{ padding: '12px 16px', fontWeight: 'bold', fontSize: '18px', color: group.color }}>
                    {group.conj[selectedTense][i]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
        <div className="space-y-4">
          <div className="bg-red-950/30 border border-red-800 rounded-xl p-3">
            <p className="text-red-300 text-sm">
              {language === 'fr'
                ? '10 verbes tres frequents, entierement irreguliers.'
                : '10 very frequent and fully irregular verbs.'}
            </p>
          </div>
          {CAT_IRREGULARS.map((v, i) => (
            <div key={i} style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #334155' }}>
              {/* Header verb */}
              <div style={{
                background: '#1e293b',
                padding: '10px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #334155',
              }}>
                <div>
                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#fbbf24' }}>
                    {v.verb}
                  </span>
                  <span style={{ color: '#94a3b8', fontSize: '14px', marginLeft: '8px' }}>
                    {language === 'fr' ? v.fr : v.en}
                  </span>
                </div>
                <span style={{ fontSize: '11px', color: '#fb923c', background: '#1c0a00', padding: '2px 8px', borderRadius: '6px' }}>
                  {v.note}
                </span>
              </div>
              {/* Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {CAT_PRONOUNS.map((pron, j) => (
                    <tr key={j} style={{ background: j % 2 === 0 ? '#0f172a' : '#1e293b' }}>
                      <td style={{ padding: '10px 16px', color: '#94a3b8', fontSize: '14px', whiteSpace: 'nowrap', width: '45%' }}>
                        {pron}
                      </td>
                      <td style={{ padding: '10px 16px', fontWeight: 'bold', fontSize: '17px', color: '#fbbf24' }}>
                        {v.present[j]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      {catMode === 'practice' && (
        <div className="space-y-4">
          {/* Filtre par temps */}
          <div className="flex gap-2 flex-wrap">
            {[
              { key: 'all',       label: language === 'fr' ? 'Tous' : 'All' },
              { key: 'present',   label: language === 'fr' ? 'Présent' : 'Present' },
              { key: 'passe',     label: language === 'fr' ? 'Passé' : 'Past' },
              { key: 'imparfait', label: language === 'fr' ? 'Imparfait' : 'Imperfect' },
              { key: 'futur',     label: language === 'fr' ? 'Futur' : 'Future' },
            ].map(opt => {
              const count = opt.key === 'all'
                ? CAT_EXERCISES.length
                : CAT_EXERCISES.filter(e => e.tense === opt.key).length;
              const active = (practiceFilter === opt.key);
              return (
                <button key={opt.key}
                  onClick={() => { setPracticeFilter(opt.key); setExIdx(0); setAnswer(''); setShowResult(false); }}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: active ? '#f59e0b' : '#1e293b',
                    color: active ? '#fff' : '#94a3b8',
                    fontSize: '13px',
                    fontWeight: active ? 'bold' : 'normal',
                    cursor: 'pointer',
                  }}>
                  {opt.label} <span style={{ opacity: 0.7 }}>({count})</span>
                </button>
              );
            })}
          </div>

          {/* Score */}
          <div style={{
            background: '#1e293b', borderRadius: '12px', padding: '12px 16px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            border: '1px solid #334155',
          }}>
            <span style={{ color: '#94a3b8', fontSize: '14px' }}>Score</span>
            <span>
              <span style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '22px' }}>{score.correct}</span>
              <span style={{ color: '#64748b' }}> / {score.total}</span>
              <span style={{ color: '#64748b', fontSize: '12px', marginLeft: '8px' }}>
                ({filteredExercises.length > 0 ? (exIdx % filteredExercises.length) + 1 : 0}/{filteredExercises.length})
              </span>
            </span>
          </div>

          {filteredExercises.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#94a3b8', padding: '32px' }}>
              {language === 'fr' ? 'Aucun exercice pour ce temps.' : 'No exercises for this tense.'}
            </div>
          ) : (
            <div style={{
              background: '#1e293b', borderRadius: '16px', padding: '20px',
              border: '1px solid #334155', display: 'flex', flexDirection: 'column', gap: '16px',
            }}>
              {/* Contexte */}
              <div style={{
                background: '#422006', border: '1px solid #92400e',
                borderRadius: '10px', padding: '12px 16px',
              }}>
                <p style={{ color: '#fcd34d', fontSize: '11px', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {ex.tense}
                </p>
                <p style={{ color: '#fff', fontSize: '18px', fontStyle: 'italic' }}>
                  "{ex.context}"
                </p>
              </div>

              {/* Verbe à conjuguer */}
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '4px' }}>
                  {language === 'fr' ? 'Conjugue' : 'Conjugate'}
                </p>
                <p style={{ color: '#fbbf24', fontSize: '32px', fontWeight: 'bold' }}>{ex.verb}</p>
                <p style={{ color: '#cbd5e1', fontSize: '20px' }}>({ex.pronoun})</p>
              </div>

              {/* Input */}
              {!showResult ? (
                <>
                  <input type="text" value={answer}
                    onChange={e => setAnswer(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && checkAnswer()}
                    placeholder="..."
                    style={{
                      width: '100%', padding: '14px', borderRadius: '10px',
                      border: '2px solid #334155', background: '#0f172a',
                      color: '#fff', fontSize: '22px', textAlign: 'center',
                      outline: 'none', boxSizing: 'border-box',
                    }}
                    autoFocus
                  />
                  <button onClick={checkAnswer} disabled={!answer.trim()}
                    style={{
                      width: '100%', padding: '14px', borderRadius: '10px', border: 'none',
                      background: answer.trim() ? '#d97706' : '#374151',
                      color: '#fff', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer',
                    }}>
                    {language === 'fr' ? 'Vérifier' : 'Check'}
                  </button>
                </>
              ) : (
                <>
                  <div style={{
                    padding: '16px', borderRadius: '10px', textAlign: 'center',
                    background: answer.trim().toLowerCase() === ex.answer.toLowerCase() ? '#14532d' : '#450a0a',
                    border: `2px solid ${answer.trim().toLowerCase() === ex.answer.toLowerCase() ? '#16a34a' : '#dc2626'}`,
                  }}>
                    <p style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '8px',
                      color: answer.trim().toLowerCase() === ex.answer.toLowerCase() ? '#4ade80' : '#f87171' }}>
                      {answer.trim().toLowerCase() === ex.answer.toLowerCase()
                        ? '✓ Correct!' : '✗ Incorrect'}
                    </p>
                    {answer.trim().toLowerCase() !== ex.answer.toLowerCase() && (
                      <p style={{ color: '#4ade80', fontSize: '24px', fontWeight: 'bold' }}>
                        {ex.answer}
                      </p>
                    )}
                  </div>
                  <button onClick={nextEx}
                    style={{
                      width: '100%', padding: '14px', borderRadius: '10px', border: 'none',
                      background: '#1d4ed8', color: '#fff', fontSize: '18px',
                      fontWeight: 'bold', cursor: 'pointer',
                    }}>
                    {language === 'fr' ? 'Suivant' : 'Next'} →
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
