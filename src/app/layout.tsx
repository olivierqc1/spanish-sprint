export const metadata = {
  title: "Spanish Sprint",
  description: "Choisis ton niveau puis pratique : écoute, lecture, flashcards",
};
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
