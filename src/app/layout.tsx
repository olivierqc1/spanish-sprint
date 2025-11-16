// src/app/layout.tsx
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ToastProvider } from '@/contexts/ToastContext';
import { LanguageProvider } from '../../i18n/LanguageContext';
import "./global.css";

export const metadata = {
  title: "Spanish Sprint - Apprends l'espagnol efficacement",
  description: "Plateforme d'apprentissage de l'espagnol par niveau avec écoute, lecture, flashcards et révision espacée",
  keywords: ["espagnol", "apprentissage", "langue", "CECRL", "flashcards", "audio"],
  authors: [{ name: "Spanish Sprint Team" }],
  openGraph: {
    title: "Spanish Sprint",
    description: "Apprends l'espagnol de manière immersive",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="bg-slate-950 text-slate-100">
        <ThemeProvider>
          <LanguageProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 