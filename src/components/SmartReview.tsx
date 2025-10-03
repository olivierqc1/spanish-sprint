"use client";
import { useState, useEffect } from "react";
import { useReviewStore } from "@/store/reviewStore";
import type { ReviewQuality } from "@/lib/spacedRepetition";
import type { Card } from "@/components/Flashcards";

type SmartReviewProps = {
  cards: Card[];
  level: "A1" | "A2" | "B1" | "ALL";
  country: "ALL" | "spain" | "mexico";
};

export default function SmartReview({ cards, level, country }: SmartReviewProps) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);

  const {
    reviewCard,
    startSession,
    endSession,
    nextCard,
    previousCard,
    currentSessionCards,
    currentCardIndex,
    getCardReview,
    getDueCards,
    getStats,
  } = useReviewStore();

  // Filtrer les cartes selon niveau et pays
  const filteredCards = cards.filter(card => {
    const levelMatch = level === "ALL" || card.level === level;
    const countryMatch = country === "ALL" || 
      (country === "spain" && card.country === "Espagne") ||
      (country === "mexico" && card.country === "Mexique") ||
      !card.country; // Cartes sans pays spécifique
    return levelMatch && countryMatch;
  });

  const stats = getStats();
  const currentCardId = currentSessionCards[currentCardIndex];
  const currentCard = filteredCards.find(c => c.id === currentCardId);
  const reviewData = currentCardId ? getCardReview(currentCardId) : null;

  const handleStartSession = () => {
    // Initialiser les cartes qui n'ont pas encore de données de révision
    const cardIds = filteredCards.map(c => c.id);
    cardIds.forEach(id => {
      if (!getCardReview(id).totalReviews) {
        // Carte jamais révisée
      }
    });

    // Obtenir les cartes dues
    const dueCardIds = getDueCards(20).map(r => r.cardId);
    
    // Filtrer pour ne garder que celles dans notre pool filtré
    const sessionCards = dueCardIds.filter(id => 
      filteredCards.some(c => c.id === id)
    );

    // Si pas assez de cartes dues, ajouter des nouvelles
    if (sessionCards.length < 10) {
      const newCards = filteredCards
        .filter(c => !getCardReview(c.id).totalReviews)
        .slice(0, 10 - sessionCards.length)
        .map(c => c.id);
      sessionCards.push(...newCards);
    }

    startSession(sessionCards.length > 0 ? sessionCards : filteredCards.map(c => c.id).slice(0, 20));
    setSessionActive(true);
    setShowAnswer(false);
  };

  const handleEndSession = () => {
    endSession();
    setSessionActive(false);
    setShowAnswer(false);
  };

  const handleReview = (quality: ReviewQuality) => {
    if (!currentCardId) return;
    
    reviewCard(currentCardId, quality);
    setShowAnswer(false);

    // Passer à la carte suivante automatiquement
    if (currentCardIndex < currentSessionCards.length - 1) {
      setTimeout(() => nextCard(), 300);
    } else {
      // Fin de session
      handleEndSession();
    }
  };

  const handlePrevious = () => {
    previousCard();
    setShowAnswer(false);
  };

  // Vue statistiques (avant de démarrer session)
  if (!sessionActive) {
    return (
      <div className="card vstack">
        <div className="hstack" style={{ justifyContent: "space-between" }}>
          <strong>🧠 Révision Intelligente</strong>
          <span className="badge">SRS</span>
        </div>

        <div className="card" style={{ background: "#0b1220" }}>
          <h3 style={{ margin: "0 0 12px 0" }}>📊 Statistiques de révision</h3>
          <div className="vstack" style={{ gap: "8px" }}>
            <div className="hstack" style={{ justifyContent: "space-between" }}>
              <span className="muted">Total de cartes</span>
              <strong>{stats.total}</strong>
            </div>
            <div className="hstack" style={{ justifyContent: "space-between" }}>
              <span className="muted">🔴 À réviser aujourd'hui</span>
              <strong style={{ color: "#ef4444" }}>{stats.due}</strong>
            </div>
            <div className="hstack" style={{ justifyContent: "space-between" }}>
              <span className="muted">🆕 Nouvelles cartes</span>
              <strong style={{ color: "#60a5fa" }}>{stats.newCards}</strong>
            </div>
            <div className="hstack" style={{ justifyContent: "space-between" }}>
              <span className="muted">📚 En apprentissage</span>
              <strong style={{ color: "#f59e0b" }}>{stats.learning}</strong>
            </div>
            <div className="hstack" style={{ justifyContent: "space-between" }}>
              <span className="muted">✅ Maîtrisées</span>
              <strong style={{ color: "#10b981" }}>{stats.mature}</strong>
            </div>
            <hr />
            <div className="hstack" style={{ justifyContent: "space-between" }}>
              <span className="muted">Taux de réussite moyen</span>
              <strong>{stats.avgSuccessRate}%</strong>
            </div>
            <div className="hstack" style={{ justifyContent: "space-between" }}>
              <span className="muted">À réviser demain</span>
              <strong>{stats.dueTomorrow}</strong>
            </div>
            <div className="hstack" style={{ justifyContent: "space-between" }}>
              <span className="muted">À réviser cette semaine</span>
              <strong>{stats.dueThisWeek}</strong>
            </div>
          </div>
        </div>

        <div className="card" style={{ background: "#1e3a5f" }}>
          <strong>💡 Comment ça marche ?</strong>
          <p className="muted" style={{ marginTop: "8px", fontSize: "14px" }}>
            Le système de <strong>répétition espacée</strong> (SRS) optimise votre mémorisation :
          </p>
          <ul style={{ fontSize: "14px", marginTop: "8px" }}>
            <li>Les cartes difficiles reviennent plus souvent</li>
            <li>Les cartes faciles espacent leurs révisions</li>
            <li>Révision juste avant l'oubli = mémorisation optimale</li>
          </ul>
        </div>

        <button 
          onClick={handleStartSession}
          style={{ 
            padding: "16px", 
            fontSize: "18px",
            background: stats.due > 0 ? "#ef4444" : "#60a5fa"
          }}
        >
          {stats.due > 0 
            ? `🚀 Commencer la révision (${stats.due} cartes)`
            : "📖 Apprendre de nouvelles cartes"}
        </button>
      </div>
    );
  }

  // Session de révision active
  if (!currentCard) {
    return (
      <div className="card vstack">
        <strong>Session terminée ! 🎉</strong>
        <p className="muted">Bravo ! Tu as terminé ta session de révision.</p>
        <button onClick={handleEndSession}>Retour aux statistiques</button>
      </div>
    );
  }

  const progress = ((currentCardIndex + 1) / currentSessionCards.length) * 100;

  return (
    <div className="card vstack">
      {/* En-tête avec progression */}
      <div className="hstack" style={{ justifyContent: "space-between" }}>
        <strong>🧠 Révision en cours</strong>
        <button onClick={handleEndSession} style={{ padding: "4px 12px" }}>
          ✕ Terminer
        </button>
      </div>

      {/* Barre de progression */}
      <div style={{ width: "100%", background: "#1f2a37", borderRadius: "999px", height: "8px" }}>
        <div 
          style={{ 
            width: `${progress}%`, 
            background: "#60a5fa", 
            height: "100%", 
            borderRadius: "999px",
            transition: "width 0.3s"
          }} 
        />
      </div>
      <div className="muted" style={{ textAlign: "center", fontSize: "12px" }}>
        Carte {currentCardIndex + 1} / {currentSessionCards.length}
      </div>

      {/* Informations de révision */}
      {reviewData && reviewData.totalReviews > 0 && (
        <div className="hstack" style={{ justifyContent: "space-around", fontSize: "12px" }}>
          <div className="badge">
            Révisions: {reviewData.totalReviews}
          </div>
          <div className="badge">
            Réussite: {Math.round(reviewData.successRate)}%
          </div>
          <div className="badge">
            Prochain: {reviewData.interval}j
          </div>
        </div>
      )}

      {/* Carte */}
      <div 
        className="card" 
        onClick={() => setShowAnswer(true)}
        style={{ 
          background: "#0b1220", 
          cursor: showAnswer ? "default" : "pointer",
          minHeight: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center"
        }}
      >
        <div>
          {currentCard.tag && (
            <div className="badge" style={{ marginBottom: "16px" }}>
              {currentCard.tag}
            </div>
          )}
          <h2 style={{ margin: "0", fontSize: "32px" }}>
            {showAnswer ? currentCard.back : currentCard.front}
          </h2>
          {!showAnswer && (
            <p className="muted" style={{ marginTop: "16px" }}>
              (Clique pour voir la réponse)
            </p>
          )}
        </div>
      </div>

      {/* Boutons de révision */}
      {showAnswer ? (
        <div className="vstack">
          <div className="muted" style={{ textAlign: "center", marginBottom: "8px" }}>
            <strong>Comment as-tu trouvé cette carte ?</strong>
          </div>
          <div className="hstack" style={{ gap: "8px", flexWrap: "wrap" }}>
            <button
              onClick={() => handleReview(0)}
              style={{ 
                flex: 1, 
                minWidth: "120px",
                background: "#7f1d1d", 
                border: "1px solid #ef4444" 
              }}
            >
              😰 Oublié
              <div style={{ fontSize: "10px", opacity: 0.7 }}>Revoir bientôt</div>
            </button>
            <button
              onClick={() => handleReview(3)}
              style={{ 
                flex: 1,
                minWidth: "120px", 
                background: "#713f12", 
                border: "1px solid #f59e0b" 
              }}
            >
              🤔 Difficile
              <div style={{ fontSize: "10px", opacity: 0.7 }}>Revoir dans 1j</div>
            </button>
            <button
              onClick={() => handleReview(4)}
              style={{ 
                flex: 1,
                minWidth: "120px",
                background: "#1e3a5f", 
                border: "1px solid #60a5fa" 
              }}
            >
              👍 Bien
              <div style={{ fontSize: "10px", opacity: 0.7 }}>Revoir dans 3-6j</div>
            </button>
            <button
              onClick={() => handleReview(5)}
              style={{ 
                flex: 1,
                minWidth: "120px",
                background: "#064e3b", 
                border: "1px solid #10b981" 
              }}
            >
              ✨ Facile
              <div style={{ fontSize: "10px", opacity: 0.7 }}>Revoir dans 10j+</div>
            </button>
          </div>
        </div>
      ) : (
        <div className="hstack" style={{ justifyContent: "space-between" }}>
          <button 
            onClick={handlePrevious}
            disabled={currentCardIndex === 0}
          >
            ◀ Précédent
          </button>
          <button onClick={() => setShowAnswer(true)}>
            Montrer la réponse
          </button>
        </div>
      )}
    </div>
  );
}
