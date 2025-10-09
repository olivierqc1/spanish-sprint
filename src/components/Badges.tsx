"use client";
import { useEffect, useMemo, useState } from "react";
import { useReviewStore } from "@/store/reviewStore";
import { useProgressStore } from "@/state/progress";

type Badge = {
  id: string;
  icon: string;
  title: string;
  description: string;
  category: "streak" | "cards" | "study" | "mastery" | "special";
  requirement: number;
  unlocked: boolean;
  progress: number;
  rarity: "common" | "rare" | "epic" | "legendary";
};

export default function Badges() {
  const { reviews } = useReviewStore();
  const { currentStreak, totalStudyTime, completedLessons } = useProgressStore();
  const [showUnlockedAnimation, setShowUnlockedAnimation] = useState<string | null>(null);

  // Calculer les statistiques
  const stats = useMemo(() => {
    const allReviews = Object.values(reviews);
    const mature = allReviews.filter(r => r.repetitions >= 6).length;
    const totalReviews = allReviews.reduce((sum, r) => sum + r.totalReviews, 0);
    const perfectCards = allReviews.filter(r => r.successRate === 100 && r.totalReviews >= 5).length;
    
    return {
      mature,
      totalReviews,
      perfectCards,
      totalCards: allReviews.length,
      hoursStudied: Math.floor(totalStudyTime / 60)
    };
  }, [reviews, totalStudyTime]);

  // Définir tous les badges
  const badges = useMemo((): Badge[] => {
    const allBadges: Omit<Badge, "unlocked" | "progress">[] = [
      // STREAK
      { id: "streak_3", icon: "🔥", title: "Première flamme", description: "3 jours consécutifs", category: "streak", requirement: 3, rarity: "common" },
      { id: "streak_7", icon: "🔥", title: "Une semaine !", description: "7 jours consécutifs", category: "streak", requirement: 7, rarity: "rare" },
      { id: "streak_30", icon: "🔥", title: "Mois entier", description: "30 jours consécutifs", category: "streak", requirement: 30, rarity: "epic" },
      { id: "streak_100", icon: "🔥", title: "Centurion", description: "100 jours consécutifs", category: "streak", requirement: 100, rarity: "legendary" },

      // CARTES
      { id: "cards_10", icon: "🎴", title: "Collectionneur", description: "10 cartes maîtrisées", category: "cards", requirement: 10, rarity: "common" },
      { id: "cards_50", icon: "🎴", title: "Expert", description: "50 cartes maîtrisées", category: "cards", requirement: 50, rarity: "rare" },
      { id: "cards_100", icon: "🎴", title: "Maître", description: "100 cartes maîtrisées", category: "cards", requirement: 100, rarity: "epic" },
      { id: "cards_200", icon: "🎴", title: "Grand Maître", description: "200 cartes maîtrisées", category: "cards", requirement: 200, rarity: "legendary" },

      // RÉVISIONS
      { id: "reviews_100", icon: "📚", title: "Débutant studieux", description: "100 révisions totales", category: "study", requirement: 100, rarity: "common" },
      { id: "reviews_500", icon: "📚", title: "Étudiant dévoué", description: "500 révisions totales", category: "study", requirement: 500, rarity: "rare" },
      { id: "reviews_1000", icon: "📚", title: "Marathonien", description: "1000 révisions totales", category: "study", requirement: 1000, rarity: "epic" },
      { id: "reviews_5000", icon: "📚", title: "Légende", description: "5000 révisions totales", category: "study", requirement: 5000, rarity: "legendary" },

      // TEMPS D'ÉTUDE
      { id: "time_10", icon: "⏰", title: "Première décennie", description: "10 heures d'étude", category: "study", requirement: 10, rarity: "common" },
      { id: "time_50", icon: "⏰", title: "Semi-siècle", description: "50 heures d'étude", category: "study", requirement: 50, rarity: "rare" },
      { id: "time_100", icon: "⏰", title: "Centenaire", description: "100 heures d'étude", category: "study", requirement: 100, rarity: "epic" },

      // MAÎTRISE
      { id: "perfect_10", icon: "✨", title: "Perfectionniste", description: "10 cartes avec 100% de réussite", category: "mastery", requirement: 10, rarity: "rare" },
      { id: "perfect_50", icon: "✨", title: "Perfection incarnée", description: "50 cartes avec 100% de réussite", category: "mastery", requirement: 50, rarity: "epic" },

      // SPÉCIAUX
      { id: "first_review", icon: "🌟", title: "Premiers pas", description: "Première session de révision", category: "special", requirement: 1, rarity: "common" },
      { id: "night_owl", icon: "🦉", title: "Oiseau de nuit", description: "Étudier après minuit", category: "special", requirement: 1, rarity: "rare" },
      { id: "early_bird", icon: "🐦", title: "Lève-tôt", description: "Étudier avant 6h du matin", category: "special", requirement: 1, rarity: "rare" },
    ];

    // Calculer l'état de déverrouillage
    return allBadges.map(badge => {
      let current = 0;
      let unlocked = false;

      switch (badge.id) {
        // STREAK
        case "streak_3":
        case "streak_7":
        case "streak_30":
        case "streak_100":
          current = currentStreak;
          unlocked = currentStreak >= badge.requirement;
          break;

        // CARTES
        case "cards_10":
        case "cards_50":
        case "cards_100":
        case "cards_200":
          current = stats.mature;
          unlocked = stats.mature >= badge.requirement;
          break;

        // RÉVISIONS
        case "reviews_100":
        case "reviews_500":
        case "reviews_1000":
        case "reviews_5000":
          current = stats.totalReviews;
          unlocked = stats.totalReviews >= badge.requirement;
          break;

        // TEMPS
        case "time_10":
        case "time_50":
        case "time_100":
          current = stats.hoursStudied;
          unlocked = stats.hoursStudied >= badge.requirement;
          break;

        // MAÎTRISE
        case "perfect_10":
        case "perfect_50":
          current = stats.perfectCards;
          unlocked = stats.perfectCards >= badge.requirement;
          break;

        // SPÉCIAUX
        case "first_review":
          current = stats.totalReviews > 0 ? 1 : 0;
          unlocked = stats.totalReviews > 0;
          break;

        default:
          unlocked = false;
      }

      return {
        ...badge,
        unlocked,
        progress: Math.min(100, (current / badge.requirement) * 100)
      };
    });
  }, [currentStreak, stats]);

  // Compter les badges déverrouillés
  const unlockedCount = badges.filter(b => b.unlocked).length;
  const totalBadges = badges.length;

  // Grouper par catégorie
  const badgesByCategory = useMemo(() => {
    const categories: Record<string, Badge[]> = {};
    badges.forEach(badge => {
      if (!categories[badge.category]) {
        categories[badge.category] = [];
      }
      categories[badge.category].push(badge);
    });
    return categories;
  }, [badges]);

  const categoryNames = {
    streak: "🔥 Séries",
    cards: "🎴 Collection",
    study: "📚 Étude",
    mastery: "✨ Maîtrise",
    special: "🌟 Spéciaux"
  };

  const rarityColors = {
    common: "#93a2b8",
    rare: "#60a5fa",
    epic: "#a78bfa",
    legendary: "#fbbf24"
  };

  return (
    <div className="vstack">
      <div className="card">
        <h2 style={{ margin: "0 0 16px 0" }}>🏆 Badges & Achievements</h2>
        
        {/* Progression globale */}
        <div className="card" style={{ background: "#1e3a5f", marginBottom: "16px" }}>
          <div className="hstack" style={{ justifyContent: "space-between", marginBottom: "8px" }}>
            <strong>Progression totale</strong>
            <strong>{unlockedCount} / {totalBadges}</strong>
          </div>
          <div style={{ width: "100%", background: "#0f1720", borderRadius: "999px", height: "12px" }}>
            <div 
              style={{ 
                width: `${(unlockedCount / totalBadges) * 100}%`, 
                background: "linear-gradient(90deg, #60a5fa, #10b981)", 
                height: "100%", 
                borderRadius: "999px",
                transition: "width 0.5s"
              }} 
            />
          </div>
        </div>

        {/* Badges par catégorie */}
        {Object.entries(badgesByCategory).map(([category, categoryBadges]) => (
          <div key={category} style={{ marginBottom: "24px" }}>
            <h3 style={{ margin: "0 0 12px 0" }}>
              {categoryNames[category as keyof typeof categoryNames]}
            </h3>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", 
              gap: "12px" 
            }}>
              {categoryBadges.map(badge => (
                <div
                  key={badge.id}
                  className="card"
                  style={{
                    background: badge.unlocked ? "#064e3b" : "#1f2a37",
                    border: `2px solid ${badge.unlocked ? rarityColors[badge.rarity] : "#334155"}`,
                    opacity: badge.unlocked ? 1 : 0.6,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    position: "relative"
                  }}
                  title={`${badge.progress.toFixed(0)}% complété`}
                >
                  <div style={{ fontSize: "32px", textAlign: "center", marginBottom: "8px" }}>
                    {badge.icon}
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <strong style={{ fontSize: "14px" }}>{badge.title}</strong>
                    <div className="muted" style={{ fontSize: "12px", marginTop: "4px" }}>
                      {badge.description}
                    </div>
                  </div>

                  {!badge.unlocked && (
                    <div style={{ marginTop: "8px" }}>
                      <div style={{ width: "100%", background: "#0f1720", borderRadius: "999px", height: "4px" }}>
                        <div 
                          style={{ 
                            width: `${badge.progress}%`, 
                            background: rarityColors[badge.rarity], 
                            height: "100%", 
                            borderRadius: "999px",
                            transition: "width 0.5s"
                          }} 
                        />
                      </div>
                      <div className="muted" style={{ fontSize: "10px", textAlign: "center", marginTop: "4px" }}>
                        {badge.progress.toFixed(0)}%
                      </div>
                    </div>
                  )}

                  {badge.unlocked && (
                    <div style={{ 
                      position: "absolute", 
                      top: "8px", 
                      right: "8px", 
                      fontSize: "20px" 
                    }}>
                      ✅
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Légende raretés */}
        <div className="card" style={{ background: "#0b1220", marginTop: "16px" }}>
          <strong style={{ display: "block", marginBottom: "8px" }}>Raretés :</strong>
          <div className="hstack" style={{ gap: "16px", flexWrap: "wrap", fontSize: "12px" }}>
            <div className="hstack">
              <div style={{ width: "12px", height: "12px", borderRadius: "2px", background: rarityColors.common }} />
              <span className="muted" style={{ marginLeft: "4px" }}>Commun</span>
            </div>
            <div className="hstack">
              <div style={{ width: "12px", height: "12px", borderRadius: "2px", background: rarityColors.rare }} />
              <span className="muted" style={{ marginLeft: "4px" }}>Rare</span>
            </div>
            <div className="hstack">
              <div style={{ width: "12px", height: "12px", borderRadius: "2px", background: rarityColors.epic }} />
              <span className="muted" style={{ marginLeft: "4px" }}>Épique</span>
            </div>
            <div className="hstack">
              <div style={{ width: "12px", height: "12px", borderRadius: "2px", background: rarityColors.legendary }} />
              <span className="muted" style={{ marginLeft: "4px" }}>Légendaire</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
