export const metadata = { title: "Spanish Sprint", description: "A1→B1 plan generator" };
import "./globals.css";


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="fr">
<body style={{ fontFamily: 'Inter, system-ui, Arial', background:'#0b0f14', color:'#e6edf3' }}>
<div style={{ maxWidth: 980, margin: '0 auto', padding: '24px' }}>
<header style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 24 }}>
<h1 style={{ fontSize: 28, fontWeight: 700 }}>Spanish Sprint ⚡ A1→B1</h1>
<a href="https://vercel.com/" target="_blank" rel="noreferrer" style={{ opacity:.7 }}>Deploy on Vercel</a>
</header>
{children}
<footer style={{ marginTop: 48, opacity:.6, fontSize:13 }}>© {new Date().getFullYear()} — Plan intensif, usage personnel.</footer>
</div>
</body>
</html>
);
}
