"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brand, universOf } from "./Header";
import { SITE, waLink } from "@/lib/site";

// Pied de page propre à chaque univers : le candidat ne voit pas l'offre employeur, et inversement.
const COLS = {
  candidat: {
    fin: "Votre talent, révélé.",
    sub: "Coaching personnalisé · 100 % WhatsApp · Abidjan",
    title: "Espace candidat",
    links: [
      ["/coaching", "Le coaching"],
      ["/coaching/packs", "Les 6 packs"],
      ["/coaching/diagnostic", "Le diagnostic"],
      ["/coaching/inscription", "S'inscrire"],
      ["/paiement", "Comment payer"],
      ["/faq", "Questions fréquentes"],
    ],
  },
  employeur: {
    fin: "Recruter juste.",
    sub: "Recrutement · Intégration · Performance · Abidjan",
    title: "Espace employeur",
    links: [
      ["/entreprises", "Acquisition de talents"],
      ["/entreprises#methode", "La méthode en 5 étapes"],
      ["/entreprises#tarif", "Tarif par profil"],
      ["/entreprises#modules", "Modules à la carte"],
      ["/entreprises/demande", "Demande de recrutement"],
      ["/a-propos", "À propos"],
    ],
  },
  neutre: {
    fin: "Talents & Coaching.",
    sub: "Abidjan, Côte d'Ivoire",
    title: "Les deux espaces",
    links: [
      ["/coaching", "Espace candidat"],
      ["/entreprises", "Espace employeur"],
      ["/a-propos", "À propos"],
    ],
  },
} as const;

export default function Footer() {
  const path = usePathname();
  const u = universOf(path);
  const c = COLS[u];
  // Le portail reste épuré : pas de grand pied de page
  if (path === "/") return null;
  return (
    <footer className="foot">
      <div className="inner">
        <div className="fin">
          <p>{c.fin}</p>
          <p>{c.sub}</p>
        </div>
        <div className="foot-grid">
          <div>
            <Link href="/" className="brand">
              <Brand tag={u === "neutre" ? "Talents & Coaching" : c.title} />
            </Link>
            <p>Consultante Talent Acquisition &amp; Project Management, 8+ ans d&apos;expérience, Abidjan.</p>
          </div>
          <div>
            <h2>{c.title}</h2>
            <ul>
              {c.links.map(([href, label]) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Contact</h2>
            <ul>
              <li><a href={waLink()} target="_blank" rel="noopener">WhatsApp {SITE.phoneDisplay}</a></li>
              <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><Link href="/contact">{SITE.city}</Link></li>
            </ul>
          </div>
          <div>
            <h2>Informations</h2>
            <ul>
              <li><Link href="/a-propos">À propos</Link></li>
              <li><Link href="/mentions-legales">Mentions légales</Link></li>
              <li><Link href="/">Changer d&apos;espace</Link></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} Cassandra Touré</span>
          <Link href="/mentions-legales">Mentions légales et confidentialité</Link>
        </div>
      </div>
    </footer>
  );
}
