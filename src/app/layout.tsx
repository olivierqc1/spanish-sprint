// src/app/layout.tsx
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import "./global.css";

export const metadata = {
  title: "Spanish Sprint",
  description: "Apprendre l'espagnol par niveau avec écoute, lecture, flashcards",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="bg-slate-950 text-slate-100 dark:bg-slate-950 dark:text-slate-100">
        <ThemeProvider>
          <Toaster position="top-right" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
