// src/app/layout.tsx
import { Toaster } from 'react-hot-toast';
import "./global.css";

export const metadata = {
  title: "Spanish Sprint",
  description: "Apprendre l'espagnol par niveau avec écoute, lecture, flashcards",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
