import type { Metadata, Viewport } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { WaFab } from "@/components/ui";
import { SITE } from "@/lib/site";
import "./globals.css";
import "./motion.css";
import "./signature.css";
import "./corporate.css";

// Polices auto-hébergées par Next (pas d'appel à Google côté visiteur), sous-ensemble latin uniquement.
const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const description =
  "Cassandra Touré, Talents & Coaching à Abidjan : coaching personnalisé pour les candidats (CV, entretien, emploi) et recrutement de stagiaires qualifiés pour les employeurs.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Cassandra Touré · Talents & Coaching à Abidjan",
    template: "%s · Cassandra Touré",
  },
  description,
  applicationName: "Cassandra Touré",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_CI",
    siteName: "Cassandra Touré · Talents & Coaching",
    title: "Cassandra Touré · Talents & Coaching à Abidjan",
    description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: "Cassandra Touré · Talents & Coaching", description },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Cassandra Touré · Talents & Coaching",
  description,
  url: SITE.url,
  email: SITE.email,
  telephone: "+2250719509526",
  areaServed: "CI",
  address: { "@type": "PostalAddress", addressLocality: "Abidjan", addressCountry: "CI" },
};

const HEAD_JS = "document.documentElement.classList.add('js')";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${openSans.variable}`} suppressHydrationWarning>
      <head>
        {/* Active les animations d'apparition seulement si JS tourne : sans JS, tout reste visible. */}
        <script dangerouslySetInnerHTML={{ __html: HEAD_JS }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a className="skip" href="#contenu">
          Aller au contenu
        </a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <WaFab />
        <Reveal />
      </body>
    </html>
  );
}
