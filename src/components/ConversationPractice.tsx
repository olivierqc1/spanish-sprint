"use client";

type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
type Country = "ALL" | "spain" | "mexico" | "argentina";

interface ConversationPracticeProps {
  level: Level;
  country: Country;
}

export default function ConversationPractice({
  level,
  country,
}: ConversationPracticeProps) {
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
          Niveau sélectionné: <strong>{level}</strong>
        </p>
        <p style={{ fontSize: "18px", marginBottom: "20px" }}>
          Pays:{" "}
          <strong>
            {country === "ALL"
              ? "🌍 Tous les pays"
              : country === "spain"
              ? "🇪🇸 Espagne"
              : country === "mexico"
              ? "🇲🇽 Mexique"
              : "🇦🇷 Argentine"}
          </strong>
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
