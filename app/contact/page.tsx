import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { Banner } from "@/components/ui";
import { SITE, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez Cassandra Touré sur WhatsApp au +225 07 19 50 95 26 ou par e-mail. Abidjan, Côte d'Ivoire.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Banner
        crumbs={[{ href: "/contact", label: "Contact" }]}
        eyebrow="Contact"
        title={<>Le plus simple : <em>un message WhatsApp.</em></>}
        lead="Cassandra répond personnellement. Jeune ou entreprise, dites-lui en une phrase ce que vous cherchez."
      />
      <section className="sec">
        <div className="inner grid-3">
          <a className="card rv" href={waLink("Bonjour Cassandra, ")} target="_blank" rel="noopener" style={{ textDecoration: "none" }}>
            <span className="card-ic" style={{ background: "#dff3e7", color: "var(--ok)" }}>
              <Icon name="whatsapp" />
            </span>
            <h2 className="h-s">WhatsApp</h2>
            <p className="muted">{SITE.phoneDisplay}</p>
            <span className="link-arrow">Écrire maintenant <Icon name="arrow" /></span>
          </a>
          <a className="card rv d1" href={`mailto:${SITE.email}`} style={{ textDecoration: "none" }}>
            <span className="card-ic"><Icon name="mail" /></span>
            <h2 className="h-s">E-mail</h2>
            <p className="muted" style={{ wordBreak: "break-all" }}>{SITE.email}</p>
            <span className="link-arrow">Envoyer un e-mail <Icon name="arrow" /></span>
          </a>
          <div className="card rv d2">
            <span className="card-ic"><Icon name="pin" /></span>
            <h2 className="h-s">Ville</h2>
            <p className="muted">{SITE.city}. Accompagnement 100 % à distance, partout.</p>
          </div>
        </div>
        <div className="inner mt-m">
          <div className="grid-2">
            <Link href="/coaching/inscription" className="door on-navy rv" style={{ background: "var(--navy)" }}>
              <span className="door-ic"><Icon name="user" /></span>
              <span><b>Je suis un jeune</b><span>Remplir l&apos;inscription Coaching Express</span></span>
              <Icon name="arrow" />
            </Link>
            <Link href="/entreprises/demande" className="door on-navy rv d1" style={{ background: "var(--navy)" }}>
              <span className="door-ic"><Icon name="building" /></span>
              <span><b>Je suis une entreprise</b><span>Déposer une demande de recrutement</span></span>
              <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
