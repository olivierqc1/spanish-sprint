import "./global.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spanish Sprint",
  description: "Appli d'apprentissage de l'espagnol",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
