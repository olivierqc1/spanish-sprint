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
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Spanish Sprint"
  },
  themeColor: "#3b82f6",
  openGraph: {
    title: "Spanish Sprint",
    description: "Apprends l'espagnol de manière immersive",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Spanish Sprint" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className="bg-slate-950 text-slate-100">
        <ThemeProvider>
          <LanguageProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </LanguageProvider>
        </ThemeProvider>
        <script dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                  .then((reg) => console.log('Service Worker enregistré'))
                  .catch((err) => console.log('Erreur Service Worker:', err));
              });
            }
          `
        }} />
      </body>
    </html>
  );
}