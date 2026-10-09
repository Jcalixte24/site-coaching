// Petits composants partagés : bouton WhatsApp flottant, bandeau de page, appel final, carte pack, listes cochées.
import Link from "next/link";
import type { ReactNode } from "react";
import Icon from "./Icon";
import { waLink, xof, type Pack } from "@/lib/site";

export function WaFab() {
  return (
    <a
      className="wa-fab"
      href={waLink("Bonjour Cassandra, ")}
      target="_blank"
      rel="noopener"
      aria-label="Écrire à Cassandra sur WhatsApp"
    >
      <Icon name="whatsapp" />
      <span>WhatsApp</span>
    </a>
  );
}

type Crumb = { href: string; label: string };

export function Banner({
  crumbs,
  eyebrow,
  title,
  lead,
  ghost,
  children,
}: {
  crumbs: Crumb[];
  ghost?: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="banner on-navy">
      <Fx />
      <span className="ghost-word" aria-hidden="true">
        {ghost ?? crumbs[crumbs.length - 1]?.label}
      </span>
      <div className="inner">
        <nav className="crumbs" aria-label="Fil d'Ariane">
          <Link href="/">Accueil</Link>
          {crumbs.map((c, i) => (
            <span key={c.href} style={{ display: "contents" }}>
              <span aria-hidden="true">/</span>
              {i === crumbs.length - 1 ? (
                <span aria-current="page">{c.label}</span>
              ) : (
                <Link href={c.href}>{c.label}</Link>
              )}
            </span>
          ))}
        </nav>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="h-l">
          <span className="ln">
            <span>{title}</span>
          </span>
        </h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}

export function CtaBand({
  title,
  lead,
  waText = "Bonjour Cassandra, ",
  secondary,
}: {
  title: ReactNode;
  lead: ReactNode;
  waText?: string;
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="sec">
      <div className="inner">
        <div className="cta-band on-navy rv">
          <Fx />
          <p className="eyebrow" style={{ justifyContent: "center" }}>
            Passez à l&apos;action
          </p>
          <h2 className="h-l">{title}</h2>
          <p className="lead">{lead}</p>
          <div className="btn-row">
            <a className="btn btn-wa" href={waLink(waText)} target="_blank" rel="noopener">
              <Icon name="whatsapp" /> Écrire sur WhatsApp
            </a>
            {secondary && (
              <Link className="btn btn-ghost" href={secondary.href}>
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function PackCard({ pack }: { pack: Pack }) {
  return (
    <article className={`pack${pack.featured ? " featured" : ""}`}>
      {pack.featured && <span className="pack-tag">Le plus complet pour démarrer</span>}
      <span className="pack-name">{pack.name}</span>
      <p className="pack-price">
        {xof(pack.price).replace("\u00a0XOF", "")}
        <small>XOF</small>
      </p>
      <p className="pack-want">« {pack.want} »</p>
      <p className="pack-short">{pack.short}</p>
      <Link className="link-arrow" href={`/coaching/packs#${pack.id}`} aria-label={`Voir le pack ${pack.name}`}>
        Voir le pack <Icon name="arrow" />
      </Link>
    </article>
  );
}

export function Ticks({ items, minus }: { items: ReactNode[]; minus?: boolean }) {
  return (
    <ul className={`ticks${minus ? " minus" : ""}`}>
      {items.map((it, i) => (
        <li key={i}>
          <Icon name={minus ? "minus" : "check"} />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

// Fond vivant : halos qui dérivent + motif tissé qui glisse (décor pur, ignoré par les lecteurs d'écran)
export function Fx() {
  return (
    <div className="fx" aria-hidden="true">
      <span className="blob b1" />
      <span className="blob b2" />
      <span className="blob b3" />
      <span className="motif" />
      <span className="shade" />
    </div>
  );
}

// Bandeau défilant : la liste est doublée pour boucler sans saut
export function Marquee({ items, variant = "" }: { items: string[]; variant?: string }) {
  return (
    <div className={`marquee ${variant}`}>
      <p className="sr">{items.join(", ")}</p>
      <div className="marquee-track" aria-hidden="true">
        {[0, 1].map((k) => (
          <ul key={k}>
            {items.concat(items).map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
