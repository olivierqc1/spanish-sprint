"use client";

type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "ALL";
type Country = "ALL" | "spain" | "mexico" | "argentina" | "colombia" | "peru" | "chile" | "cuba" | "venezuela";

interface ConversationPracticeProps {
  level: Level;
  country: Country;
}

export default function ConversationPractice({
  level,
  country,
}: ConversationPracticeProps) {
  const levelDisplay = level === "ALL" ? "🌍 Tous les niveaux" : level;
  
  const countryDisplay = 
    country === "ALL" ? "🌍 Tous les pays" :
    country === "spain" ? "🇪🇸 Espagne" :
    country === "mexico" ? "🇲🇽 Mexique" :
    country === "argentina" ? "🇦🇷 Argentine" :
    country === "colombia" ? "🇨🇴 Colombie" :
    country === "peru" ? "🇵🇪 Pérou" :
    country === "chile" ? "🇨🇱 Chili" :
    country === "cuba" ? "🇨🇺 Cuba" :
    country === "venezuela" ? "🇻🇪 Venezuela" :
    country;

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Pratique de conversation</h2>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "30px",
          backgroundColor: "#f9f9f9",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "18px", marginBottom: "10px" }}>
          Niveau sélectionné: <strong>{levelDisplay}</strong>
        </p>
        <p style={{ fontSize: "18px", marginBottom: "20px" }}>
          Pays: <strong>{countryDisplay}</strong>
        </p>
        <p style={{ color: "#666", fontSize: "16px" }}>
          La fonctionnalité de conversation interactive arrive bientôt ! 🚀
        </p>
        <p style={{ color: "#666", fontSize: "14px", marginTop: "15px" }}>
          Vous pourrez pratiquer des dialogues réels adaptés à votre niveau et
          au dialecte de votre choix.
        </p>
      </div>
    </div>
  );
}