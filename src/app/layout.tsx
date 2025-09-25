export const metadata = {
  title: "Spanish Sprint",
  description: "Apprendre l'espagnol par niveau avec écoute, lecture, flashcards",
};
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
