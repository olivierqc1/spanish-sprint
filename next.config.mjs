// next.config.mjs
/** @type {import('next').NextConfig} */

// ⚠️ IMPORTANT : le basePath.
// - Repo de projet (URL = https://olivierqc1.github.io/spanish-sprint/) → garde '/spanish-sprint'
// - Domaine perso OU repo nommé "olivierqc1.github.io" → mets '' (chaîne vide)
const basePath = '/spanish-sprint';

const nextConfig = {
  output: 'export',            // génère un site 100 % statique dans /out
  reactStrictMode: true,
  images: { unoptimized: true }, // next/image ne peut pas optimiser sans serveur
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,         // aide GitHub Pages à servir les sous-pages (/grammaire/)
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // ⚠️ le bloc headers() de ton ancienne config a été retiré :
  // il ne fonctionne pas avec output:'export' (c'est une feature serveur).
};

export default nextConfig;
