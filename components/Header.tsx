"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Icon from "./Icon";
import { waLink } from "@/lib/site";

// Deux univers séparés : un candidat ne voit que l'espace candidat, un employeur que l'espace employeur.
// Le logo ramène toujours au portail « Qui êtes-vous ? ».
export type Univers = "candidat" | "employeur" | "neutre";

export function universOf(path: string): Univers {
  if (path.startsWith("/entreprises")) return "employeur";
  if (["/coaching", "/paiement", "/faq"].some((p) => path.startsWith(p))) return "candidat";
  return "neutre";
}

type L = { href: string; label: string };
const NAV: Record<Univers, { links: L[]; cta: L; tag: string }> = {
  candidat: {
    tag: "Espace candidat",
    links: [
      { href: "/coaching", label: "Coaching" },
      { href: "/coaching/packs", label: "Les packs" },
      { href: "/coaching/diagnostic", label: "Diagnostic" },
      { href: "/paiement", label: "Paiement" },
      { href: "/faq", label: "FAQ" },
    ],
    cta: { href: "/coaching/inscription", label: "S'inscrire" },
  },
  employeur: {
    tag: "Espace employeur",
    links: [
      { href: "/entreprises", label: "L'offre" },
      { href: "/entreprises#methode", label: "Méthode" },
      { href: "/entreprises#tarif", label: "Tarif" },
      { href: "/entreprises#modules", label: "Modules" },
      { href: "/a-propos", label: "À propos" },
    ],
    cta: { href: "/entreprises/demande", label: "Faire une demande" },
  },
  neutre: {
    tag: "Talents & Coaching",
    links: [
      { href: "/coaching", label: "Espace candidat" },
      { href: "/entreprises", label: "Espace employeur" },
      { href: "/a-propos", label: "À propos" },
      { href: "/contact", label: "Contact" },
    ],
    cta: { href: "/contact", label: "Nous écrire" },
  },
};

export function Brand({ tag = "Talents & Coaching" }: { tag?: string }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="brand-logo" src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/logo.svg`} alt="" width={30} height={40} />
      <span className="brand-txt">
        <b>Cassandra Touré</b>
        <span>{tag}</span>
      </span>
    </>
  );
}

export default function Header() {
  const path = usePathname();
  const u = universOf(path);
  const { links, cta, tag } = NAV[u];
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => !href.includes("#") && (path === href || path === href + "/");

  return (
    <>
      <header className={`nav${solid ? " solid" : ""}`} data-univers={u}>
        <div className="inner nav-in">
          <Link href="/" className="brand" aria-label="Cassandra Touré, retour à l'accueil">
            <Brand tag={tag} />
          </Link>
          <nav className="nav-links" aria-label="Navigation principale">
            {links.map((l) => (
              <Link key={l.href} href={l.href} aria-current={isActive(l.href) ? "page" : undefined}>
                {l.label}
              </Link>
            ))}
            <Link className="btn btn-gold" href={cta.href}>
              {cta.label}
            </Link>
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
            <Brand tag={tag} />
          </Link>
          <button className="mob-close" aria-label="Fermer le menu" onClick={() => setOpen(false)}>
            <Icon name="close" />
          </button>
        </div>
        <nav aria-label="Navigation mobile">
          {links.map((l) => (
            <Link key={l.href} href={l.href} aria-current={isActive(l.href) ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
          <Link href="/contact" aria-current={isActive("/contact") ? "page" : undefined}>
            Contact
          </Link>
        </nav>
        <Link className="btn btn-gold" href={cta.href}>
          {cta.label}
        </Link>
        <a className="btn btn-wa" href={waLink()} target="_blank" rel="noopener" style={{ marginTop: 12, width: "100%" }}>
          <Icon name="whatsapp" /> Écrire sur WhatsApp
        </a>
      </div>
    </>
  );
}
