import type { NextConfig } from "next";

// Trois modes :
// - par défaut : serveur Next (Vercel), avec en-têtes de sécurité ;
// - PREVIEW_EXPORT=1 : export statique pour l'aperçu artifact (out/) ;
// - GITHUB_PAGES=1 : export statique servi sous /site-coaching (GitHub Pages).
const isPages = process.env.GITHUB_PAGES === "1";
const isExport = isPages || process.env.PREVIEW_EXPORT === "1";
const basePath = isPages ? "/site-coaching" : "";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  outputFileTracingRoot: __dirname,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  ...(isExport
    ? { output: "export", trailingSlash: true, basePath, images: { unoptimized: true } }
    : {
        async headers() {
          return [
            {
              source: "/(.*)",
              headers: [
                { key: "X-Content-Type-Options", value: "nosniff" },
                { key: "X-Frame-Options", value: "DENY" },
                { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
              ],
            },
          ];
        },
      }),
};

export default nextConfig;
