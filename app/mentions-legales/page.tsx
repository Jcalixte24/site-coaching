import type { Metadata } from "next";
import { Banner } from "@/components/ui";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales et confidentialité",
  description: "Mentions légales, hébergement et politique de protection des données personnelles.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: true, follow: true },
};

// BROUILLON : les éléments entre crochets sont à obtenir de la cliente (nom ou raison sociale, statut, adresse)
// et le texte « données personnelles » doit être validé par elle avant la mise en ligne.
export default function MentionsPage() {
  return (
    <>
      <Banner
        crumbs={[{ href: "/mentions-legales", label: "Mentions légales" }]}
        eyebrow="Informations légales"
        title={<>Mentions légales <em>et confidentialité</em></>}
      />
      <section className="sec">
        <div className="inner prose">
          <h2>Éditeur du site</h2>
          <p>
            Cassandra Touré, consultante indépendante · [statut juridique à compléter] · [adresse à compléter], Abidjan,
            Côte d&apos;Ivoire.
            <br />
            Contact : {SITE.email} · {SITE.phoneDisplay}
          </p>

          <h2>Hébergement</h2>
          <p>Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.</p>

          <h2 id="donnees">Protection des données personnelles</h2>
          <p>
            Les informations que vous transmettez via les formulaires de ce site (inscription, diagnostic, demande de
            recrutement) servent uniquement à votre accompagnement ou au traitement de votre demande. Elles ne sont ni
            vendues ni cédées.
          </p>
          <h3>Ce que nous collectons</h3>
          <ul>
            <li>Coordonnées : nom, prénom, téléphone WhatsApp, e-mail, ville.</li>
            <li>Informations liées à votre objectif et à votre parcours, que vous choisissez de partager.</li>
            <li>Pour les entreprises : coordonnées du contact et description du poste.</li>
          </ul>
          <h3>Confidentialité du coaching</h3>
          <p>
            Votre dossier de coaching (réponses au diagnostic, échanges, livrables) n&apos;est jamais communiqué à une
            entreprise. Votre profil n&apos;est proposé à un recruteur qu&apos;avec votre accord explicite, et seulement avec
            les informations utiles au poste.
          </p>
          <h3>Vos droits</h3>
          <p>
            Conformément à la loi ivoirienne n° 2013-450 du 19 juin 2013 relative à la protection des données à caractère
            personnel, et au RGPD pour les personnes résidant dans l&apos;Union européenne, vous pouvez accéder à vos
            données, les rectifier, les supprimer ou retirer votre consentement à tout moment, en écrivant à {SITE.email}.
          </p>
          <h3>Durée de conservation</h3>
          <p>[À définir avec la cliente, par exemple : 3 ans après la fin de l&apos;accompagnement.]</p>

          <h2>Cookies</h2>
          <p>Ce site n&apos;utilise pas de cookies publicitaires ni de traceurs tiers.</p>
        </div>
      </section>
    </>
  );
}
