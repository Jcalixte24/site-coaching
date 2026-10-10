import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { WaFab } from "@/components/ui";
import { SITE } from "@/lib/site";
import "./globals.css";
import "./motion.css";
import "./signature.css";

// Polices auto-hébergées par Next (pas d'appel à Google côté visiteur), sous-ensemble latin uniquement.
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["500", "600"],
  variable: "--font-fraunces",
  display: "swap",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dmsans",
  display: "swap",
});

const description =
  "Coaching Express pour les jeunes (CV, entretien, entrepreneuriat, 100 % WhatsApp, dès 5 000 XOF) et recrutement de stagiaires qualifiés pour les entreprises, à Abidjan.";

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
  themeColor: "#0e1a36",
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

const HEAD_JS =
  "var d=document.documentElement;d.classList.add('js');" +
  "try{if(sessionStorage.getItem('ov')){d.classList.add('ov-vu')}else{sessionStorage.setItem('ov','1');d.classList.add('ov-on')}}" +
  "catch(e){d.classList.add('ov-vu')}";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        {/* Active les animations d'apparition seulement si JS tourne : sans JS, tout reste visible. */}
        {/* « js » active les apparitions ; l'ouverture (portes) ne se joue qu'une fois par visite. */}
        <script dangerouslySetInnerHTML={{ __html: HEAD_JS }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <div id="ouverture" aria-hidden="true">
          <div className="porte g" />
          <div className="porte d" />
          <div className="ov-t">
            <span>Abidjan · Côte d&apos;Ivoire</span>
            <strong>
              Cassandra <em>Touré</em>
            </strong>
            <small>Talents &amp; Coaching</small>
          </div>
        </div>
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
