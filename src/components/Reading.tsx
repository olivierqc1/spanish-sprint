"use client";

type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
type Country = "ALL" | "spain" | "mexico" | "argentina";

interface TextItem {
  id: number;
  title: string;
  text: string;
  level: Level;
  country: Country;
}

interface ReadingProps {
  items: TextItem[];
  level: Level;
  country: Country;
}

export default function Reading({ items, level, country }: ReadingProps) {
  const filteredItems = items.filter((item) => {
    const levelMatch = item.level === level;
    const countryMatch = country === "ALL" || item.country === country;
    return levelMatch && countryMatch;
  });

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Exercices de lecture</h2>
      {filteredItems.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>
          Aucun exercice disponible pour ce niveau et ce pays.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h3 style={{ marginBottom: "10px" }}>{item.title}</h3>
              <div style={{ marginBottom: "15px" }}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 8px",
                    backgroundColor: "#007bff",
                    color: "white",
                    borderRadius: "4px",
                    fontSize: "12px",
                    marginRight: "8px",
                  }}
                >
                  {item.level}
                </span>
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 8px",
                    backgroundColor: "#28a745",
                    color: "white",
                    borderRadius: "4px",
                    fontSize: "12px",
                  }}
                >
                  {item.country === "spain"
                    ? "🇪🇸 Espagne"
                    : item.country === "mexico"
                    ? "🇲🇽 Mexique"
                    : item.country === "argentina"
                    ? "🇦🇷 Argentine"
                    : "🌍 Tous"}
                </span>
              </div>
              <p
                style={{
                  lineHeight: "1.6",
                  fontSize: "16px",
                  margin: 0,
                }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
