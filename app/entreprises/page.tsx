import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { Banner, CtaBand, Marquee, Ticks } from "@/components/ui";
import { TALENT, xof } from "@/lib/site";

export const metadata: Metadata = {
  title: "Acquisition de talents et intégration de stagiaires",
  description:
    "Recruter juste. Intégrer vite. Faire performer. Recrutement de stagiaires clé en main à Abidjan : 140 000 XOF HT par profil (tarif nouveau client).",
  alternates: { canonical: "/entreprises" },
};

const ETAPES = [
  { l: "A", t: "Fiches de poste", p: "Missions, prérequis et livrables clairs pour chaque fonction.", g: "Tout le monde parle du même poste." },
  { l: "B", t: "Sourcing & chasse", p: "Recherche active et ciblage multicanal des meilleurs profils.", g: "Des talents que vous n'auriez pas touchés seuls." },
  { l: "C", t: "Présélection & tests", p: "Tri approfondi des CV, études de cas et tests pratiques par métier.", g: "Des compétences vérifiées, pas déclarées." },
  { l: "D", t: "Entretiens & choix final", p: "Pré-qualification, puis appui technique et décisionnel avec vos managers.", g: "Vos managers ne voient que des candidats qualifiés." },
  { l: "E", t: "Onboarding", p: "Fiches d'objectifs sur 3 mois et guide de prise en main du poste.", g: "Des stagiaires autonomes dès le premier jour." },
];

const MODULES = [
  { n: 1, t: "Immersion & team building", p: "1 jour : culture d'entreprise, vision, rôles, cohésion d'équipe.", reco: true, prix: "Sur devis" },
  { n: 2, t: "Pilotage de la performance", p: "Outils de suivi : KPI et tableaux de bord pour les managers.", prix: "Sur devis" },
  { n: 3, t: "Suivi des recrues", p: "Points d'étape à 30 et 90 jours pour ajuster intégration et performance.", reco: true, prix: "Sur devis" },
  { n: 4, t: "Bilan de fin de stage", p: "Appui au bilan qualitatif et quantitatif de fin de parcours.", prix: "Sur devis" },
  { n: 5, t: "Formations sur-mesure", p: "Toute demande spécifique en management ou pilotage RH.", prix: "Selon cahier des charges" },
];

export default function EntreprisesPage() {
  return (
    <>
      <Banner
        crumbs={[{ href: "/entreprises", label: "Entreprises" }]}
        eyebrow="Acquisition de talents & intégration de stagiaires"
        title={<>Recruter juste. Intégrer vite. <em>Faire performer.</em></>}
        lead="Un accompagnement clé en main, de la définition du poste à l'autonomie de vos recrues."
      >
        <div className="btn-row mt-m">
          <Link href="/entreprises/demande" className="btn btn-gold">
            Déposer une demande <Icon name="arrow" />
          </Link>
          <a href="#tarif" className="btn btn-ghost">Voir le tarif</a>
        </div>
      </Banner>

      <Marquee
        variant="navy-m"
        items={["Marketing", "Commercial", "Logistique", "Community management", "Gestion de marque", "Tout profil junior", "Shortlist qualifiée", "Tests par métier"]}
      />

      {/* ---------- 5 étapes ---------- */}
      <section className="sec deco">
        <div className="inner">
          <div className="sec-head rv">
            <p className="eyebrow">Notre réponse</p>
            <h2 className="h-l">
              5 étapes. <em>Un seul interlocuteur.</em>
            </h2>
          </div>
          <ol className="steps five" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {ETAPES.map((e, i) => (
              <li className={`step rv d${i % 4}`} key={e.l}>
                <span className="step-n">{e.l}</span>
                <h3>{e.t}</h3>
                <p>{e.p}</p>
                <p className="gain">{e.g}</p>
              </li>
            ))}
          </ol>
          <div className="mt-l rv">
            <p className="eyebrow">Exemples de profils recrutés</p>
            <ul className="chips">
              {["Marketing", "Commercial", "Logistique", "Community management", "Gestion de marque", "Et tout profil junior"].map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Avec / sans ---------- */}
      <section className="sec warm">
        <div className="inner">
          <div className="sec-head rv">
            <p className="eyebrow">La différence concrète</p>
            <h2 className="h-l">
              Avec ou <em>sans accompagnement ?</em>
            </h2>
          </div>
          <div className="versus">
            <div className="without rv">
              <h3>Sans accompagnement</h3>
              <Ticks
                minus
                items={[
                  "Vos managers trient et relancent eux-mêmes.",
                  "Une évaluation reposant sur l'impression laissée en entretien.",
                  "Une prise de poste à improviser.",
                  "Un suivi qui dépend de la disponibilité de chacun.",
                ]}
              />
            </div>
            <div className="with on-navy rv d1">
              <h3>Avec notre accompagnement</h3>
              <Ticks
                items={[
                  "Une shortlist qualifiée, prête à l'emploi.",
                  "Des tests pratiques et des grilles par métier.",
                  "Fiche d'objectifs 3 mois + guide de prise en main.",
                  "Points d'étape à 30 et 90 jours (module 3, en option).",
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Tarif ---------- */}
      <section className="sec" id="tarif" style={{ scrollMarginTop: 64 }}>
        <div className="inner">
          <div className="sec-head rv">
            <p className="eyebrow">Votre investissement</p>
            <h2 className="h-l">
              Un tarif simple : <em>par profil recruté.</em>
            </h2>
            <p className="lead">
              Le prix ne dépend que du nombre de profils : tout l&apos;accompagnement est inclus, de la fiche de poste à
              l&apos;onboarding.
            </p>
          </div>
          <div className="two-col" style={{ alignItems: "stretch" }}>
            <div className="price-card on-navy rv">
              <p className="eyebrow">Tarif par profil</p>
              <p className="old">{xof(TALENT.price)} HT</p>
              <span className="badge">Remise « Nouveau client » −{TALENT.discount} %</span>
              <p className="now">{xof(TALENT.newClientPrice).replace(" XOF", "")}</p>
              <p className="mb-0">XOF HT par profil · tarif nouveau client</p>
              <p className="muted mt-s mb-0">Exemple : 5 profils = {xof(TALENT.newClientPrice * 5)} HT</p>
            </div>
            <div className="card rv d1">
              <h3 className="h-s">Inclus dans chaque profil</h3>
              <div className="mt-s">
                <Ticks
                  items={[
                    "Fiche de poste détaillée",
                    "Sourcing multicanal et chasse active",
                    "Tri approfondi des CV et lettres",
                    "Études de cas et tests pratiques par métier",
                    "Pré-entretiens et appui au choix final",
                    "Fiche d'objectifs 3 mois + guide de prise en main",
                  ]}
                />
              </div>
            </div>
          </div>

          <div className="card mt-m rv">
            <h3 className="h-s">Modalités de règlement</h3>
            <div className="split" aria-hidden="true">
              <div /><div /><div />
            </div>
            <div className="split-legend">
              <div><b>30 %</b><span>à la validation de l&apos;offre</span></div>
              <div><b>40 %</b><span>aux shortlists et tests validés</span></div>
              <div><b>30 %</b><span>à la remise des livrables</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Modules ---------- */}
      <section className="sec warm">
        <div className="inner">
          <div className="sec-head rv">
            <p className="eyebrow">Pour aller plus loin</p>
            <h2 className="h-l">
              Sécuriser votre <em>retour sur investissement.</em>
            </h2>
            <p className="lead">
              Des modules à la carte pour prolonger l&apos;impact de vos recrutements. Nous recommandons en priorité les
              modules 1 et 3.
            </p>
          </div>
          <div className="grid-3">
            {MODULES.map((m, i) => (
              <article className={`card rv d${i % 3}`} key={m.n}>
                <span className="step-n" style={{ fontSize: "2rem", color: "var(--gold-ink)" }}>{m.n}</span>
                {m.reco && <span className="badge">Recommandé</span>}
                <h3 className="mt-s">{m.t}</h3>
                <p className="muted">{m.p}</p>
                <span className="badge soft">{m.prix}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Démarrer ---------- */}
      <section className="sec navy on-navy">
        <div className="inner">
          <div className="sec-head rv">
            <p className="eyebrow">Démarrons ensemble</p>
            <h2 className="h-l">
              3 étapes pour <em>lancer votre campagne.</em>
            </h2>
          </div>
          <ol className="steps three" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {[
              ["On échange", "Un point de cadrage pour comprendre vos besoins et vos postes."],
              ["Vous validez", "Proposition ajustée à vos priorités et à votre calendrier."],
              ["On lance", "Fiches de poste et sourcing démarrent immédiatement."],
            ].map(([t, p], i) => (
              <li className={`step rv d${i}`} key={t}>
                <span className="step-n">0{i + 1}</span>
                <h3>{t}</h3>
                <p>{p}</p>
              </li>
            ))}
          </ol>
          <div className="btn-row mt-m rv">
            <Link href="/entreprises/demande" className="btn btn-gold">
              Déposer une demande de recrutement <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title={<>Parlons de votre <em>prochain recrutement.</em></>}
        lead="Une offre sur mesure, ajustée à vos postes."
        waText="Bonjour Cassandra, je représente une entreprise et je souhaite recruter des stagiaires."
        secondary={{ href: "/entreprises/demande", label: "Formulaire de demande" }}
      />
    </>
  );
}
