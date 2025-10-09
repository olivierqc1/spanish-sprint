"use client";
import { useMemo } from "react";
import { useReviewStore } from "@/store/reviewStore";
import { useProgressStore } from "@/state/progress";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const { reviews } = useReviewStore();
  const { currentStreak, totalStudyTime, completedLessons } = useProgressStore();

  // Statistiques SRS
  const srsStats = useMemo(() => {
    const allReviews = Object.values(reviews);
    const now = new Date();
    
    const newCards = allReviews.filter(r => r.totalReviews === 0).length;
    const learning = allReviews.filter(r => r.repetitions > 0 && r.repetitions < 3).length;
    const young = allReviews.filter(r => r.repetitions >= 3 && r.repetitions < 6).length;
    const mature = allReviews.filter(r => r.repetitions >= 6).length;
    
    const avgSuccessRate = allReviews.length > 0
      ? allReviews.reduce((sum, r) => sum + r.successRate, 0) / allReviews.length
      : 0;

    // Progression sur 7 derniers jours
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const reviewsThisDay = allReviews.filter(r => 
        r.lastReviewed.toISOString().split('T')[0] === dateStr
      );
      
      last7Days.push({
        date: dateStr.slice(5), // MM-DD
        cartes: reviewsThisDay.length,
        taux: reviewsThisDay.length > 0 
          ? Math.round(reviewsThisDay.reduce((sum, r) => sum + r.successRate, 0) / reviewsThisDay.length)
          : 0
      });
    }

    return {
      total: allReviews.length,
      newCards,
      learning,
      young,
      mature,
      avgSuccessRate: Math.round(avgSuccessRate),
      last7Days
    };
  }, [reviews]);

  // Données pour le diagramme en camembert
  const pieData = [
    { name: "Nouvelles", value: srsStats.newCards, color: "#60a5fa" },
    { name: "En apprentissage", value: srsStats.learning, color: "#f59e0b" },
    { name: "Jeunes", value: srsStats.young, color: "#34d399" },
    { name: "Maîtrisées", value: srsStats.mature, color: "#10b981" },
  ].filter(d => d.value > 0);

  // Temps par jour (simulé pour démo - à remplacer par vraies données)
  const timeData = useMemo(() => {
    const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
    return days.map(day => ({
      day,
      minutes: Math.floor(Math.random() * 60) + 10 // À remplacer par vraies données
    }));
  }, []);

  return (
    <div className="vstack" style={{ gap: "24px" }}>
      {/* EN-TÊTE STATISTIQUES */}
      <div className="card">
        <h2 style={{ margin: "0 0 16px 0" }}>📊 Tableau de bord</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "16px" }}>
          
          <div className="card" style={{ background: "#1e3a5f", textAlign: "center" }}>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#60a5fa" }}>
              {currentStreak}
            </div>
            <div className="muted">🔥 Jours consécutifs</div>
          </div>

          <div className="card" style={{ background: "#064e3b", textAlign: "center" }}>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#10b981" }}>
              {Math.floor(totalStudyTime / 60)}h{totalStudyTime % 60}m
            </div>
            <div className="muted">⏱️ Temps total</div>
          </div>

          <div className="card" style={{ background: "#713f12", textAlign: "center" }}>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#f59e0b" }}>
              {srsStats.total}
            </div>
            <div className="muted">🎴 Cartes totales</div>
          </div>

          <div className="card" style={{ background: "#1e3a5f", textAlign: "center" }}>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#60a5fa" }}>
              {srsStats.avgSuccessRate}%
            </div>
            <div className="muted">✨ Taux de réussite</div>
          </div>

        </div>
      </div>

      {/* GRAPHIQUES */}
      <div className="section">
        
        {/* Graphique d'activité */}
        <div className="card vstack">
          <h3 style={{ margin: "0 0 16px 0" }}>📈 Activité des 7 derniers jours</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={srsStats.last7Days}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#93a2b8" />
              <YAxis stroke="#93a2b8" />
              <Tooltip 
                contentStyle={{ background: "#0f1720", border: "1px solid #334155", borderRadius: "8px" }}
                labelStyle={{ color: "#e5e7eb" }}
              />
              <Legend />
              <Line type="monotone" dataKey="cartes" stroke="#60a5fa" strokeWidth={2} name="Cartes révisées" />
              <Line type="monotone" dataKey="taux" stroke="#10b981" strokeWidth={2} name="Taux de réussite %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Répartition des cartes */}
        <div className="card vstack">
          <h3 style={{ margin: "0 0 16px 0" }}>🎯 Répartition des cartes</h3>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ background: "#0f1720", border: "1px solid #334155", borderRadius: "8px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="muted" style={{ textAlign: "center", padding: "40px" }}>
              Commence à réviser pour voir tes statistiques !
            </div>
          )}
        </div>

      </div>

      {/* Temps d'étude par jour */}
      <div className="card vstack">
        <h3 style={{ margin: "0 0 16px 0" }}>⏰ Temps d'étude cette semaine</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={timeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="day" stroke="#93a2b8" />
            <YAxis stroke="#93a2b8" />
            <Tooltip 
              contentStyle={{ background: "#0f1720", border: "1px solid #334155", borderRadius: "8px" }}
              labelStyle={{ color: "#e5e7eb" }}
            />
            <Bar dataKey="minutes" fill="#60a5fa" name="Minutes" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* DÉTAILS PROGRESSION */}
      <div className="card vstack">
        <h3 style={{ margin: "0 0 16px 0" }}>🎓 Détails de progression</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
          
          <div className="hstack" style={{ justifyContent: "space-between" }}>
            <span className="muted">🆕 Nouvelles cartes</span>
            <strong style={{ color: "#60a5fa" }}>{srsStats.newCards}</strong>
          </div>

          <div className="hstack" style={{ justifyContent: "space-between" }}>
            <span className="muted">📚 En apprentissage</span>
            <strong style={{ color: "#f59e0b" }}>{srsStats.learning}</strong>
          </div>

          <div className="hstack" style={{ justifyContent: "space-between" }}>
            <span className="muted">🌱 Cartes jeunes</span>
            <strong style={{ color: "#34d399" }}>{srsStats.young}</strong>
          </div>

          <div className="hstack" style={{ justifyContent: "space-between" }}>
            <span className="muted">✅ Maîtrisées</span>
            <strong style={{ color: "#10b981" }}>{srsStats.mature}</strong>
          </div>

          <div className="hstack" style={{ justifyContent: "space-between" }}>
            <span className="muted">📖 Leçons complétées</span>
            <strong>{completedLessons.size}</strong>
          </div>

          <div className="hstack" style={{ justifyContent: "space-between" }}>
            <span className="muted">💯 Moyenne générale</span>
            <strong>{srsStats.avgSuccessRate}%</strong>
          </div>

        </div>
      </div>

      {/* CONSEILS */}
      <div className="card" style={{ background: "#1e3a5f" }}>
        <h3 style={{ margin: "0 0 12px 0" }}>💡 Conseils personnalisés</h3>
        <div className="vstack" style={{ gap: "8px", fontSize: "14px" }}>
          {srsStats.newCards > 20 && (
            <div>📘 Tu as {srsStats.newCards} nouvelles cartes - commence par en apprendre 10 par jour !</div>
          )}
          {currentStreak === 0 && (
            <div>🔥 Commence ta série aujourd'hui ! La régularité est la clé de la réussite.</div>
          )}
          {currentStreak >= 7 && (
            <div>🎉 Excellent ! {currentStreak} jours consécutifs - Continue comme ça !</div>
          )}
          {srsStats.avgSuccessRate < 70 && srsStats.total > 10 && (
            <div>💪 Ton taux de réussite est de {srsStats.avgSuccessRate}% - révise plus souvent les cartes difficiles !</div>
          )}
          {srsStats.mature > 50 && (
            <div>✨ Bravo ! Tu maîtrises déjà {srsStats.mature} cartes - tu progresses rapidement !</div>
          )}
        </div>
      </div>

    </div>
  );
                                        }
