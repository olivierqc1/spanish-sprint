"use client";

import { useState, useMemo } from "react";
import { useReviewStore } from "@/store/reviewStore";
import { useProgressStore } from "@/store/progressStore";

export default function Dashboard() {
  const { reviews, reviewState } = useReviewStore();
  const { currentStreak, totalStudyTime, completedLessons } = useProgressStore();

  // Calculer les statistiques
  const totalCards = Object.keys(reviewState).length;
  const masteredCards = Object.values(reviewState).filter(
    (card) => card.repetitions >= 5
  ).length;
  const dueToday = Object.values(reviewState).filter(
    (card) => new Date(card.nextReview) <= new Date()
  ).length;

  const stats = [
    {
      label: "Révisions totales",
      value: reviews,
      icon: "📊",
      color: "#007bff",
    },
    {
      label: "Jours consécutifs",
      value: currentStreak,
      icon: "🔥",
      color: "#fd7e14",
    },
    {
      label: "Cartes maîtrisées",
      value: `${masteredCards}/${totalCards}`,
      icon: "🎯",
      color: "#28a745",
    },
    {
      label: "À réviser aujourd'hui",
      value: dueToday,
      icon: "📅",
      color: "#dc3545",
    },
  ];

  // Calculer la progression
  const progressPercentage = totalCards > 0 ? (masteredCards / totalCards) * 100 : 0;

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>📊 Tableau de bord</h2>

      {/* Statistiques principales */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              padding: "20px",
              backgroundColor: "#f8f9fa",
              borderRadius: "10px",
              border: "2px solid #dee2e6",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "10px" }}>
              {stat.icon}
            </div>
            <div
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: stat.color,
                marginBottom: "5px",
              }}
            >
              {stat.value}
            </div>
            <div style={{ fontSize: "14px", color: "#666" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Barre de progression */}
      <div
        style={{
          marginBottom: "30px",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "10px",
          border: "2px solid #dee2e6",
        }}
      >
        <h3 style={{ marginBottom: "15px" }}>Progression globale</h3>
        <div
          style={{
            width: "100%",
            height: "30px",
            backgroundColor: "#e9ecef",
            borderRadius: "15px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              width: `${progressPercentage}%`,
              height: "100%",
              backgroundColor: "#28a745",
              transition: "width 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {progressPercentage > 10 && `${Math.round(progressPercentage)}%`}
          </div>
        </div>
        <p
          style={{
            marginTop: "10px",
            textAlign: "center",
            color: "#666",
            fontSize: "14px",
          }}
        >
          {masteredCards} cartes maîtrisées sur {totalCards} cartes totales
        </p>
      </div>

      {/* Temps d'étude */}
      <div
        style={{
          marginBottom: "30px",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "10px",
          border: "2px solid #dee2e6",
        }}
      >
        <h3 style={{ marginBottom: "15px" }}>⏱️ Temps d'étude total</h3>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "48px", fontWeight: "bold", color: "#007bff" }}>
            {Math.floor(totalStudyTime / 60)}h {totalStudyTime % 60}m
          </div>
          <p style={{ color: "#666", fontSize: "14px", marginTop: "10px" }}>
            {completedLessons} leçons complétées
          </p>
        </div>
      </div>

      {/* Conseils et motivation */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "#e7f3ff",
          borderRadius: "10px",
          border: "2px solid #b3d9ff",
        }}
      >
        <h3 style={{ marginBottom: "15px" }}>💡 Conseil du jour</h3>
        <p style={{ color: "#004085", lineHeight: "1.6" }}>
          {dueToday > 0
            ? `Vous avez ${dueToday} carte${dueToday > 1 ? "s" : ""} à réviser aujourd'hui. La répétition espacée est la clé de la mémorisation à long terme !`
            : currentStreak > 0
            ? `Excellent ! Vous êtes sur une série de ${currentStreak} jour${currentStreak > 1 ? "s" : ""}. Continuez comme ça !`
            : "Commencez votre apprentissage dès maintenant pour débuter votre série de jours consécutifs !"}
        </p>
      </div>
    </div>
  );
        }
