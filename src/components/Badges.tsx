"use client";

import { useState, useEffect } from "react";
import { useReviewStore } from "@/store/reviewStore";
import { useProgressStore } from "@/store/progressStore";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number;
  unlocked: boolean;
}

type BadgeCategory = "reviews" | "streak" | "studyTime" | "lessons";

export default function Badges() {
  const { reviews } = useReviewStore();
  const { currentStreak, totalStudyTime, completedLessons } = useProgressStore();
  const [showUnlockedAnimation, setShowUnlockedAnimation] = useState<string | null>(null);

  const allBadges: Record<BadgeCategory, Badge[]> = {
    reviews: [
      { id: "review1", name: "Première révision", description: "Complétez votre première révision", icon: "🌱", requirement: 1, unlocked: reviews >= 1 },
      { id: "review10", name: "Apprenti", description: "Complétez 10 révisions", icon: "📚", requirement: 10, unlocked: reviews >= 10 },
      { id: "review50", name: "Étudiant dédié", description: "Complétez 50 révisions", icon: "🎓", requirement: 50, unlocked: reviews >= 50 },
      { id: "review100", name: "Expert", description: "Complétez 100 révisions", icon: "🏆", requirement: 100, unlocked: reviews >= 100 },
      { id: "review500", name: "Maître", description: "Complétez 500 révisions", icon: "👑", requirement: 500, unlocked: reviews >= 500 },
    ],
    streak: [
      { id: "streak3", name: "Régularité", description: "Étudiez 3 jours consécutifs", icon: "🔥", requirement: 3, unlocked: currentStreak >= 3 },
      { id: "streak7", name: "Semaine parfaite", description: "Étudiez 7 jours consécutifs", icon: "⭐", requirement: 7, unlocked: currentStreak >= 7 },
      { id: "streak30", name: "Mois de dévouement", description: "Étudiez 30 jours consécutifs", icon: "💎", requirement: 30, unlocked: currentStreak >= 30 },
      { id: "streak100", name: "Légende", description: "Étudiez 100 jours consécutifs", icon: "🌟", requirement: 100, unlocked: currentStreak >= 100 },
    ],
    studyTime: [
      { id: "time1", name: "Premier pas", description: "Étudiez pendant 1 heure au total", icon: "⏰", requirement: 60, unlocked: totalStudyTime >= 60 },
      { id: "time10", name: "Marathonien", description: "Étudiez pendant 10 heures au total", icon: "🏃", requirement: 600, unlocked: totalStudyTime >= 600 },
      { id: "time50", name: "Ultra marathonien", description: "Étudiez pendant 50 heures au total", icon: "🚀", requirement: 3000, unlocked: totalStudyTime >= 3000 },
      { id: "time100", name: "Champion", description: "Étudiez pendant 100 heures au total", icon: "🥇", requirement: 6000, unlocked: totalStudyTime >= 6000 },
    ],
    lessons: [
      { id: "lesson1", name: "Première leçon", description: "Complétez votre première leçon", icon: "📖", requirement: 1, unlocked: completedLessons >= 1 },
      { id: "lesson10", name: "Lecteur assidu", description: "Complétez 10 leçons", icon: "📕", requirement: 10, unlocked: completedLessons >= 10 },
      { id: "lesson50", name: "Bibliophile", description: "Complétez 50 leçons", icon: "📚", requirement: 50, unlocked: completedLessons >= 50 },
      { id: "lesson100", name: "Érudit", description: "Complétez 100 leçons", icon: "🎖️", requirement: 100, unlocked: completedLessons >= 100 },
    ],
  };

  // Détection des nouveaux badges débloqués
  useEffect(() => {
    Object.values(allBadges).flat().forEach((badge) => {
      const wasUnlocked = localStorage.getItem(`badge_${badge.id}`);
      if (badge.unlocked && !wasUnlocked) {
        localStorage.setItem(`badge_${badge.id}`, "true");
        setShowUnlockedAnimation(badge.id);
        setTimeout(() => setShowUnlockedAnimation(null), 3000);
      }
    });
  }, [reviews, currentStreak, totalStudyTime, completedLessons]);

  const totalBadges = Object.values(allBadges).flat().length;
  const unlockedBadges = Object.values(allBadges).flat().filter((b) => b.unlocked).length;

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>🏅 Badges et Réalisations</h2>

      {/* Animation de déblocage */}
      {showUnlockedAnimation && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 123, 255, 0.95)",
            color: "white",
            padding: "30px",
            borderRadius: "15px",
            textAlign: "center",
            zIndex: 1000,
            animation: "fadeIn 0.5s ease",
            boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
          }}
        >
          <h3 style={{ fontSize: "32px", margin: "0 0 10px 0" }}>🎉 Nouveau badge débloqué !</h3>
          <p style={{ fontSize: "48px", margin: "10px 0" }}>
            {Object.values(allBadges).flat().find((b) => b.id === showUnlockedAnimation)?.icon}
          </p>
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            {Object.values(allBadges).flat().find((b) => b.id === showUnlockedAnimation)?.name}
          </p>
        </div>
      )}

      {/* Statistiques globales */}
      <div
        style={{
          marginBottom: "30px",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "10px",
          border: "1px solid #dee2e6",
        }}
      >
        <h3 style={{ marginBottom: "15px" }}>📊 Vos statistiques</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "32px", color: "#007bff" }}>{reviews}</div>
            <div style={{ fontSize: "14px", color: "#666" }}>Révisions totales</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "32px", color: "#fd7e14" }}>{currentStreak}</div>
            <div style={{ fontSize: "14px", color: "#666" }}>Jours consécutifs</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "32px", color: "#28a745" }}>{Math.floor(totalStudyTime / 60)}h {totalStudyTime % 60}m</div>
            <div style={{ fontSize: "14px", color: "#666" }}>Temps d'étude</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "32px", color: "#6f42c1" }}>{completedLessons}</div>
            <div style={{ fontSize: "14px", color: "#666" }}>Leçons complétées</div>
          </div>
        </div>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <p style={{ fontSize: "18px", fontWeight: "bold", color: "#007bff" }}>
            {unlockedBadges} / {totalBadges} badges débloqués ({Math.round((unlockedBadges / totalBadges) * 100)}%)
          </p>
          <div
            style={{
              width: "100%",
              height: "20px",
              backgroundColor: "#e9ecef",
              borderRadius: "10px",
              overflow: "hidden",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                width: `${(unlockedBadges / totalBadges) * 100}%`,
                height: "100%",
                backgroundColor: "#007bff",
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>
      </div>

      {/* Catégories de badges */}
      {Object.entries(allBadges).map(([category, badges]) => (
        <div key={category} style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px", textTransform: "capitalize" }}>
            {category === "reviews"
              ? "🎯 Révisions"
              : category === "streak"
              ? "🔥 Régularité"
              : category === "studyTime"
              ? "⏱️ Temps d'étude"
              : "📚 Leçons"}
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "15px",
            }}
          >
            {badges.map((badge) => (
              <div
                key={badge.id}
                style={{
                  padding: "20px",
                  border: badge.unlocked ? "2px solid #28a745" : "2px solid #dee2e6",
                  borderRadius: "10px",
                  backgroundColor: badge.unlocked ? "#d4edda" : "#f8f9fa",
                  textAlign: "center",
                  opacity: badge.unlocked ? 1 : 0.5,
                  transition: "all 0.3s ease",
                }}
              >
                <div style={{ fontSize: "48px", marginBottom: "10px" }}>{badge.icon}</div>
                <h4 style={{ margin: "0 0 5px 0", fontSize: "16px" }}>{badge.name}</h4>
                <p style={{ margin: "0 0 10px 0", fontSize: "12px", color: "#666" }}>
                  {badge.description}
                </p>
                <div
                  style={{
                    fontSize: "12px",
                    color: badge.unlocked ? "#28a745" : "#6c757d",
                    fontWeight: "bold",
                  }}
                >
                  {badge.unlocked ? "✅ Débloqué" : `🔒 ${badge.requirement} requis`}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
            }
