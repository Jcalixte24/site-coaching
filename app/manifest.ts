import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cassandra Touré · Talents & Coaching",
    short_name: "C. Touré",
    description: "Coaching Express pour les jeunes et recrutement de stagiaires pour les entreprises.",
    start_url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/`,
    display: "standalone",
    background_color: "#f7f4ec",
    theme_color: "#0e1a36",
    lang: "fr",
    icons: [{ src: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/icon.svg`, sizes: "any", type: "image/svg+xml" }],
  };
}
