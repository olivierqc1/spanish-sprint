"use client";

import { useState, useEffect } from "react";
import { getUserStats } from "@/utils/srs-storage";
import { wordsA1 } from "@/data/words/A1";
import { wordsA2 } from "@/data/words/A2";
import { wordsB1 } from "@/data/words/B1";
import type { UserStats } from "@/types/srs";

export default function StatsPage() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('spanish-sprint-language');
    if (savedLanguage === 'fr' || savedLanguage === 'en') {
      setLanguage(savedLanguage);
    }

    // Charger les stats
    const allCards = [...wordsA1, ...wordsA2, ...wordsB1];
    const allCardIds = allCards.map(c => c.id);
    const userStats = getUserStats(allCardIds);
    setStats(userStats);
  }, []);

  const texts = {
    fr: {
      title: "📊 Statistiques",
      overview: "Vue d'ensemble",
      totalCards: "Total de cartes",
      newCards: "Nouvelles cartes",
      learning: "En apprentissage",
      mastered: "Maîtrisées",
      currentStreak: "Série actuelle",
      days: "jours",
      recentActivity: "Activité récente",
      date: "Date",
      studied: "Étudiées",
      success: "Réussite",
      time: "Temps",
      noData: "Aucune donnée d'étude encore. Commence à étudier pour voir tes statistiques!",
    },
    en: {
      title: "📊 Statistics",
      overview: "Overview",
      totalCards: "Total cards",
      newCards: "New cards",
      learning: "Learning",
      mastered: "Mastered",
      currentStreak: "Current streak",
      days: "days",
      recentActivity: "Recent activity",
      date: "Date",
      studied: "Studied",
      success: "Success",
      time: "Time",
      noData: "No study data yet. Start studying to see your statistics!",
    }
  };

  const t = texts[language];

  if (!stats) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">{t.title}</h1>
        <p className="text-gray-400">{t.noData}</p>
      </div>
    );
  }

  const masteredPercent = Math.round((stats.masteredCards / stats.totalCards) * 100);
  const learningPercent = Math.round((stats.learningCards / stats.totalCards) * 100);
  const newPercent = Math.round((stats.newCards / stats.totalCards) * 100);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">{t.title}</h1>

      {/* Streak */}
      {stats.streak > 0 && (
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-6 mb-8 text-center">
          <div className="text-6xl mb-2">🔥</div>
          <div className="text-4xl font-bold">{stats.streak}</div>
          <div className="text-xl opacity-90">{t.days}</div>
          <div className="text-sm opacity-75 mt-2">{t.currentStreak}</div>
        </div>
      )}

      {/* Overview */}
      <div className="bg-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">{t.overview}</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">{stats.totalCards}</div>
            <div className="text-sm text-gray-400">{t.totalCards}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-400">{stats.newCards}</div>
            <div className="text-sm text-gray-400">{t.newCards}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">{stats.learningCards}</div>
            <div className="text-sm text-gray-400">{t.learning}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">{stats.masteredCards}</div>
            <div className="text-sm text-gray-400">{t.mastered}</div>
          </div>
        </div>

        {/* Progress bars */}
        <div className="mt-6 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-24 text-sm text-gray-400">{t.mastered}</div>
            <div className="flex-1 bg-gray-700 rounded-full h-4">
              <div 
                className="bg-green-500 h-4 rounded-full transition-all"
                style={{ width: `${masteredPercent}%` }}
              />
            </div>
            <div className="w-12 text-sm text-right">{masteredPercent}%</div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-24 text-sm text-gray-400">{t.learning}</div>
            <div className="flex-1 bg-gray-700 rounded-full h-4">
              <div 
                className="bg-yellow-500 h-4 rounded-full transition-all"
                style={{ width: `${learningPercent}%` }}
              />
            </div>
            <div className="w-12 text-sm text-right">{learningPercent}%</div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-24 text-sm text-gray-400">{t.newCards}</div>
            <div className="flex-1 bg-gray-700 rounded-full h-4">
              <div 
                className="bg-gray-500 h-4 rounded-full transition-all"
                style={{ width: `${newPercent}%` }}
              />
            </div>
            <div className="w-12 text-sm text-right">{newPercent}%</div>
          </div>
        </div>
      </div>

      {/* Recent activity */}
      {stats.studySessions.length > 0 && (
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">{t.recentActivity}</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-700">
                  <th className="pb-2">{t.date}</th>
                  <th className="pb-2">{t.studied}</th>
                  <th className="pb-2">{t.success}</th>
                  <th className="pb-2">{t.time}</th>
                </tr>
              </thead>
              <tbody>
                {stats.studySessions.slice(-10).reverse().map((session, i) => {
                  const successRate = Math.round((session.correctAnswers / session.cardsStudied) * 100);
                  return (
                    <tr key={i} className="border-b border-gray-700">
                      <td className="py-3">{new Date(session.date).toLocaleDateString()}</td>
                      <td className="py-3">{session.cardsStudied}</td>
                      <td className="py-3">
                        <span className={successRate >= 80 ? 'text-green-400' : successRate >= 60 ? 'text-yellow-400' : 'text-red-400'}>
                          {successRate}%
                        </span>
                      </td>
                      <td className="py-3">{session.timeSpent} min</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}