import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { Banner, CtaBand, Ticks } from "@/components/ui";

export const metadata: Metadata = {
  title: "À propos de Cassandra Touré",
  description:
    "Consultante Talent Acquisition & Project Management, 8+ ans d'expérience, 300+ bénéficiaires accompagnés, entre la France et la Côte d'Ivoire.",
  alternates: { canonical: "/a-propos" },
};

const CHIFFRES = [
  { n: "8+", l: "ans d'expérience" },
  { n: "50+", l: "ateliers conçus et animés" },
  { n: "300+", l: "bénéficiaires accompagnés" },
  { n: "200+", l: "jeunes éloignés de l'emploi accompagnés" },
  { n: "92 %", l: "de satisfaction" },
];

const REFS = [
  { org: "ONG Bibliothèques Sans Frontières", d: "Avec le Ministère de la Jeunesse (CI) : 200+ jeunes éloignés de l'emploi accompagnés, 92 % de satisfaction." },
  { org: "COOPERL", d: "Formation de 9 chefs de pôles, 6 ateliers." },
  { org: "Association Cekedubonheur", d: "Coordination et reporting : 50+ activités avec 15+ partenaires." },
  { org: "MYLL Production", d: "5 partenariats, 4 activités pilotées, 20+ événements à 90 %+ de satisfaction." },
  { org: "Cabinet Audeca", d: "3 modules de formation sur mesure conçus, 6 jeunes porteurs de projets coachés." },
];

export default function AProposPage() {
  return (
    <>
      <Banner
        crumbs={[{ href: "/a-propos", label: "À propos" }]}
        eyebrow="Votre consultante"
        title={<>Cassandra Touré, <em>au service des talents.</em></>}
        lead="Talent Acquisition & Project Management Consultant. Elle aligne acteurs, activités et échéances autour de résultats communs, en France et en Côte d'Ivoire."
      />

      <section className="sec">
        <div className="inner two-col">
          {/* Photo à fournir par la cliente : remplacer ce bloc par <Image src="/cassandra.webp" …/> */}
          <div
            className="rv"
            role="img"
            aria-label="Portrait de Cassandra Touré (photo à venir)"
            style={{
              aspectRatio: "4 / 5",
              borderRadius: 24,
              background: "linear-gradient(160deg, var(--navy-2), var(--navy))",
              display: "grid",
              placeItems: "center",
              maxWidth: 440,
              width: "100%",
              justifySelf: "center",
            }}
          >
            <span style={{ fontFamily: "var(--disp)", fontSize: "6rem", color: "var(--gold)", fontStyle: "italic" }}>CT</span>
          </div>
          <div className="rv d1">
            <p className="eyebrow">Son approche</p>
            <h2 className="h-l">
              Une méthode, des outils, <em>un regard extérieur.</em>
            </h2>
            <p className="lead mt-s">
              Après plus de huit ans à concevoir des formations, piloter des projets et accompagner des publics variés,
              Cassandra met cette expérience au service de deux publics : les jeunes qui veulent décrocher leur place, et
              les entreprises qui veulent recruter juste.
            </p>
            <div className="mt-s">
              <Ticks
                items={[
                  "Master Management de Projets Internationaux (ESCD 3A, Lyon)",
                  "Certifiée Coaching & Mentorat (Humanitarian Leadership Academy)",
                  "Certifiée gestion de projet et négociation humanitaire",
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="sec navy on-navy">
        <div className="inner">
          <div className="sec-head rv">
            <p className="eyebrow">En chiffres</p>
            <h2 className="h-l">
              Un parcours <em>qui parle.</em>
            </h2>
          </div>
          <div className="stats rv">
            {CHIFFRES.map((c) => (
              <div className="stat" key={c.l}>
                <b className="count">{c.n}</b>
                <span>{c.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="inner">
          <div className="sec-head rv">
            <p className="eyebrow">Références</p>
            <h2 className="h-l">
              Ils lui ont <em>fait confiance.</em>
            </h2>
          </div>
          <div className="grid-3">
            {REFS.map((r, i) => (
              <article className={`card rv d${i % 3}`} key={r.org}>
                <span className="card-ic"><Icon name="award" /></span>
                <h3>{r.org}</h3>
                <p className="muted">{r.d}</p>
              </article>
            ))}
          </div>
          <div className="btn-row mt-m rv">
            <Link href="/coaching" className="btn btn-navy">
              Coaching jeunes <Icon name="arrow" />
            </Link>
            <Link href="/entreprises" className="btn btn-ghost">
              Offre entreprises
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title={<>Échangeons <em>sur votre projet.</em></>}
        lead="Jeune ou entreprise, le premier contact se fait sur WhatsApp."
      />
    </>
  );
}
