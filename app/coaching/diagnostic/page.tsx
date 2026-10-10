import type { Metadata } from "next";
import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import { Banner, Ticks } from "@/components/ui";
import { waLink } from "@/lib/site";

// Contenu repris du « Diagnostic Approfondi » (offre Coaching Express V4 : inclus dans tous les packs, de Basic à VIP).
// Le questionnaire en ligne (sauvegarde, reprise) viendra avec un service de stockage ; d'ici là il est envoyé sur WhatsApp.
export const metadata: Metadata = {
  title: "Le diagnostic approfondi",
  description:
    "Inclus dans tous les packs Coaching Express : 9 parties, 30 à 45 minutes, par écrit ou en vocal sur WhatsApp. Vous recevez votre fiche diagnostic et votre plan d'action priorisé.",
  alternates: { canonical: "/coaching/diagnostic" },
};

const FAITS: { ic: IconName; t: string; p: string }[] = [
  { ic: "clock", t: "30 à 45 minutes", p: "Au calme, en une ou plusieurs fois." },
  { ic: "clipboard", t: "9 parties", p: "Dont un module adapté à votre objectif." },
  { ic: "mic", t: "Écrit ou vocal", p: "Sur WhatsApp, en reprenant le numéro de chaque question (« 3.2 : … »)." },
  { ic: "lock", t: "Confidentiel", p: "Vos réponses restent entre vous et votre coach." },
];

const PARTIES: { t: string; p: string; pour?: string }[] = [
  {
    t: "Votre profil et votre situation",
    p: "Situation actuelle (étudiant, jeune diplômé, en recherche, en reconversion…), formation, outils et logiciels maîtrisés.",
  },
  {
    t: "Vos compétences",
    p: "Ce que vous savez faire concrètement, autoévaluation de 1 à 5 sur les compétences transversales, 2 ou 3 réalisations, ce qui vous manque.",
  },
  {
    t: "Vos valeurs et vos motivations",
    p: "Vos 5 valeurs les plus importantes, ce qui vous motive ou vous épuise, votre environnement idéal, où vous vous voyez dans 3 à 5 ans.",
  },
  {
    t: "Forces, axes de progression et regard des autres",
    p: "Vos 3 forces et 3 axes de progression, l'avis de 2 ou 3 proches (à compléter plus tard si besoin), ce qui vous différencie.",
  },
  {
    t: "Votre objectif et votre contexte",
    p: "Votre objectif formulé précisément (quoi, combien, pour quand), ce qui bloque, ce que vous avez déjà essayé, votre méthode aujourd'hui.",
  },
  {
    t: "Le module de votre objectif",
    p: "Vous ne remplissez que le vôtre :",
    pour: "Selon votre objectif",
  },
  {
    t: "Réseau et visibilité",
    p: "Votre réseau actuel, votre profil LinkedIn, 5 à 10 entreprises ou recruteurs que vous aimeriez approcher.",
    pour: "Utile à tous, surtout pour VIP",
  },
  {
    t: "Disponibilité et mode d'accompagnement",
    p: "Heures par semaine, jours préférés, qualité de connexion pour la visio, contraintes à prendre en compte.",
  },
  {
    t: "Vos attentes et votre engagement",
    p: "Ce que vous attendez de votre coach et de vous-même, votre niveau d'engagement de 1 à 10.",
  },
];

const MODULES = [
  ["A", "Recherche d'emploi"],
  ["B", "CV & entretien"],
  ["C", "Développement personnel"],
  ["D", "Entrepreneuriat"],
  ["E", "Leadership (sur devis)"],
];

export default function DiagnosticPage() {
  return (
    <>
      <Banner
        crumbs={[
          { href: "/coaching", label: "Coaching Express" },
          { href: "/coaching/diagnostic", label: "Diagnostic" },
        ]}
        eyebrow="Diagnostic approfondi · tous les packs"
        title={<>Savoir où vous en êtes, <em>pour savoir où aller.</em></>}
        lead="C'est la première étape de chaque pack, de Basic à VIP. Une analyse complète de votre profil pour construire un plan d'action sur-mesure."
      >
        <div className="btn-row mt-m">
          <Link href="/coaching/inscription" className="btn btn-gold">
            Je m&apos;inscris <Icon name="arrow" />
          </Link>
          <Link href="/coaching/packs" className="btn btn-ghost">
            Voir les packs
          </Link>
        </div>
      </Banner>

      {/* ---------- En bref ---------- */}
      <section className="statband" aria-label="Le diagnostic en bref">
        <div className="inner grid diag-facts">
          {FAITS.map((f) => (
            <div className="cell" key={f.t}>
              <b className="diag-fact">
                <Icon name={f.ic} /> {f.t}
              </b>
              <span>{f.p}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Les 9 parties ---------- */}
      <section className="sec warm">
        <div className="inner">
          <div className="sec-head rv">
            <p className="eyebrow">
              <b>9</b> Le questionnaire
            </p>
            <h2 className="h-l">
              Neuf parties, <em>dans cet ordre.</em>
            </h2>
            <p className="lead">
              Parties 1 à 5, 8 et 9 : pour tout le monde. Partie 6 : seulement le module de votre objectif. Partie 7 :
              utile à tous, surtout pour le parcours VIP.
            </p>
          </div>
          <ol className="diag-parts">
            {PARTIES.map((p, i) => (
              <li className={`diag-part rv d${i % 3}`} key={p.t}>
                <span className="step-n">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>
                    {p.t}
                    {p.pour && <span className="badge soft">{p.pour}</span>}
                  </h3>
                  <p>{p.p}</p>
                  {i === 5 && (
                    <ul className="chips mt-s">
                      {MODULES.map(([l, n]) => (
                        <li key={l}>
                          <b>{l}</b> · {n}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Documents + après ---------- */}
      <section className="sec deco">
        <div className="inner grid-2">
          <article className="card rv">
            <span className="card-ic"><Icon name="file" /></span>
            <h2 className="h-s">À envoyer avec le questionnaire</h2>
            <p className="muted">Par WhatsApp, selon votre objectif :</p>
            <Ticks
              items={[
                "Votre CV actuel (PDF ou Word) et le lien de votre profil LinkedIn",
                "Une offre d'emploi visée (recherche d'emploi)",
                "Votre note de projet ou business plan s'il existe (entrepreneuriat)",
                "Toute lettre de motivation existante",
              ]}
            />
          </article>
          <article className="card rv d1">
            <span className="card-ic"><Icon name="target" /></span>
            <h2 className="h-s">Ce que vous recevez ensuite</h2>
            <Ticks
              items={[
                "Votre fiche diagnostic de profil (PDF) : forces, compétences, axes de progression",
                "Votre plan d'action priorisé",
                "Des recommandations ciblées : CV, LinkedIn, entretien, réseau",
                "Selon votre pack : livrables, séances en visio et suivi",
              ]}
            />
          </article>
        </div>
        <div className="inner mt-m">
          <div className="placeholder-note rv">
            <b>Bientôt en ligne :</b> vous pourrez remplir le diagnostic directement ici, en plusieurs fois, avec vos réponses
            sauvegardées. Pour l&apos;instant, Cassandra vous l&apos;envoie sur WhatsApp juste après votre inscription.
          </div>
          <div className="btn-row mt-m rv">
            <Link href="/coaching/inscription" className="btn btn-gold">
              Je m&apos;inscris <Icon name="arrow" />
            </Link>
            <a
              href={waLink("Bonjour Cassandra, je suis inscrit(e) et j'aimerais recevoir mon diagnostic approfondi.")}
              className="btn btn-wa"
              target="_blank"
              rel="noopener"
            >
              <Icon name="whatsapp" /> Recevoir mon diagnostic
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
