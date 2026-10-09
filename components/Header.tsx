"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Icon from "./Icon";
import { waLink } from "@/lib/site";

// La navigation suit l'arborescence du site : chaque rubrique ouvre ses propres pages.
type Item = { href: string; label: string; sub?: { href: string; label: string; hint: string }[] };

const NAV: Item[] = [
  { href: "/", label: "Accueil" },
  {
    href: "/coaching",
    label: "Coaching",
    sub: [
      { href: "/coaching", label: "Coaching Express", hint: "L'offre pour les jeunes, 100 % WhatsApp" },
      { href: "/coaching/packs", label: "Les 7 packs", hint: "De 1 000 à 25 000 XOF, et le test « Quel pack ? »" },
      { href: "/coaching/diagnostic", label: "Le diagnostic", hint: "Standard ou approfondi : comment ça se passe" },
      { href: "/coaching/inscription", label: "S'inscrire", hint: "Le formulaire, envoyé sur WhatsApp" },
      { href: "/paiement", label: "Comment payer", hint: "Mobile Money, Wave : la capture suffit" },
    ],
  },
  {
    href: "/entreprises",
    label: "Entreprises",
    sub: [
      { href: "/entreprises", label: "Acquisition de talents", hint: "5 étapes, 140 000 XOF HT par profil" },
      { href: "/entreprises/demande", label: "Demande de recrutement", hint: "Votre besoin et l'estimation en direct" },
    ],
  },
  { href: "/a-propos", label: "À propos" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

// Rubriques rattachées : /paiement fait partie du parcours Coaching
const SECTION_OF: Record<string, string> = { "/paiement": "/coaching" };

export function Brand() {
  return (
    <>
      <span className="brand-mark" aria-hidden="true">CT</span>
      <span className="brand-txt">
        <b>Cassandra Touré</b>
        <span>Talents &amp; Coaching</span>
      </span>
    </>
  );
}

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [drop, setDrop] = useState<string | null>(null);

  useEffect(() => {
    setOpen(false);
    setDrop(null);
  }, [path]);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setDrop(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const section = SECTION_OF[path] ?? path;
  const inSection = (href: string) => (href === "/" ? path === "/" : section.startsWith(href));
  const isPage = (href: string) => path === href || path === href + "/";

  return (
    <>
      <header className={`nav${solid ? " solid" : ""}`}>
        <div className="inner nav-in">
          <Link href="/" className="brand" aria-label="Cassandra Touré, accueil">
            <Brand />
          </Link>
          <nav className="nav-links" aria-label="Navigation principale">
            {NAV.map((l) =>
              l.sub ? (
                <div
                  key={l.href}
                  className={`dd${drop === l.href ? " open" : ""}`}
                  onMouseEnter={() => setDrop(l.href)}
                  onMouseLeave={() => setDrop(null)}
                >
                  <button
                    type="button"
                    className="dd-btn"
                    aria-expanded={drop === l.href}
                    aria-controls={`dd-${l.label}`}
                    aria-current={inSection(l.href) ? "page" : undefined}
                    onClick={() => setDrop(drop === l.href ? null : l.href)}
                  >
                    {l.label}
                    <svg viewBox="0 0 12 8" aria-hidden="true"><path d="M1 1.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
                  </button>
                  <div className="dd-menu" id={`dd-${l.label}`}>
                    {l.sub.map((s) => (
                      <Link key={s.href} href={s.href} aria-current={isPage(s.href) ? "page" : undefined}>
                        <b>{s.label}</b>
                        <small>{s.hint}</small>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={l.href} href={l.href} aria-current={inSection(l.href) ? "page" : undefined}>
                  {l.label}
                </Link>
              )
            )}
            <a className="btn btn-wa" href={waLink()} target="_blank" rel="noopener">
              <Icon name="whatsapp" /> WhatsApp
            </a>
          </nav>
          <button
            className="burger"
            aria-label="Ouvrir le menu"
            aria-expanded={open}
            aria-controls="mob"
            onClick={() => setOpen(true)}
          >
            <Icon name="menu" />
          </button>
        </div>
      </header>

      <div className={`mob${open ? " open" : ""}`} id="mob" role="dialog" aria-modal="true" aria-label="Menu">
        <div className="mob-top">
          <Link href="/" className="brand">
            <Brand />
          </Link>
          <button className="mob-close" aria-label="Fermer le menu" onClick={() => setOpen(false)}>
            <Icon name="close" />
          </button>
        </div>
        <nav aria-label="Navigation mobile">
          {NAV.map((l) => (
            <div key={l.href} className="mob-group">
              <Link href={l.href} aria-current={inSection(l.href) ? "page" : undefined}>
                {l.label}
              </Link>
              {l.sub && (
                <ul>
                  {l.sub
                    .filter((s) => s.href !== l.href)
                    .map((s) => (
                      <li key={s.href}>
                        <Link href={s.href} aria-current={isPage(s.href) ? "page" : undefined}>
                          {s.label}
                        </Link>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
        <a className="btn btn-wa" href={waLink()} target="_blank" rel="noopener">
          <Icon name="whatsapp" /> Écrire sur WhatsApp
        </a>
      </div>
    </>
  );
}
