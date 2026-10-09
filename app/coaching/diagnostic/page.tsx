import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { Banner, Ticks } from "@/components/ui";
import { waLink } from "@/lib/site";

// Le diagnostic en ligne (sauvegarde automatique, reprise, enregistrement en base) arrive à l'étape 4 du plan,
// avec Supabase. En attendant, cette page présente les deux diagnostics et renvoie vers WhatsApp.
export const metadata: Metadata = {
  title: "Diagnostic de profil",
  description:
    "Le diagnostic Coaching Express : standard (15 à 20 min, pack Flash) ou approfondi (30 à 45 min, packs Basic à VIP).",
  alternates: { canonical: "/coaching/diagnostic" },
};

export default function DiagnosticPage() {
  return (
    <>
      <Banner
        crumbs={[
          { href: "/coaching", label: "Coaching Express" },
          { href: "/coaching/diagnostic", label: "Diagnostic" },
        ]}
        eyebrow="Votre diagnostic"
        title={<>Savoir où vous en êtes, <em>pour savoir où aller.</em></>}
        lead="Le diagnostic est la première étape de tous les packs. Il est envoyé après votre inscription."
      />

      <section className="sec">
        <div className="inner grid-2">
          <article className="card rv">
            <span className="badge soft">Pack Flash · 15 à 20 min</span>
            <h2 className="h-m mt-s">Diagnostic standard</h2>
            <p className="muted mt-s">7 parties pour faire le point :</p>
            <Ticks
              items={[
                "Qui êtes-vous",
                "Votre objectif",
                "Où en êtes-vous (autoévaluation)",
                "Votre situation et ce qui bloque",
                "Votre méthode aujourd'hui",
                "Forces et regard des autres",
                "Vos attentes",
              ]}
            />
          </article>
          <article className="card rv d1">
            <span className="badge">Packs Basic à VIP · 30 à 45 min</span>
            <h2 className="h-m mt-s">Diagnostic approfondi</h2>
            <p className="muted mt-s">9 parties, dont un module adapté à votre objectif :</p>
            <Ticks
              items={[
                "Profil, compétences, valeurs et motivations",
                "Forces, axes de progression, regard des autres",
                "Objectif et contexte",
                "Module selon votre objectif : emploi, CV et entretien, développement personnel ou entrepreneuriat",
                "Réseau et visibilité",
                "Disponibilité, attentes et engagement",
              ]}
            />
          </article>
        </div>
        <div className="inner mt-m">
          <div className="placeholder-note rv">
            <b>Bientôt en ligne :</b> vous pourrez remplir votre diagnostic directement ici, en plusieurs fois si besoin
            (vos réponses seront sauvegardées). Pour l&apos;instant, Cassandra vous l&apos;envoie sur WhatsApp après
            votre inscription.
          </div>
          <div className="btn-row mt-m rv">
            <Link href="/coaching/inscription" className="btn btn-gold">
              Je m&apos;inscris <Icon name="arrow" />
            </Link>
            <a
              href={waLink("Bonjour Cassandra, je suis inscrit(e) et j'aimerais recevoir mon diagnostic.")}
              className="btn btn-ghost"
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
