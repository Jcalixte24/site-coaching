import type { Metadata } from "next";
import Link from "next/link";
import { Banner, CtaBand } from "@/components/ui";

export const metadata: Metadata = {
  title: "Questions fréquentes",
  description: "Coaching 100 % WhatsApp, durée du diagnostic, paiement, confidentialité, parrainage : les réponses à vos questions.",
  alternates: { canonical: "/faq" },
};

// Réponses rédigées à partir des offres et du cahier des charges : À FAIRE VALIDER PAR CASSANDRA avant la mise en ligne.
const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: "Comment se passe un coaching 100 % WhatsApp ?",
    a: "Tout se fait dans un chat que vous utilisez déjà : questionnaire de diagnostic, questions, retours. Vos livrables (CV, plan d'action, fiches) vous sont envoyés en PDF. À partir du pack Premium, des séances individuelles ont lieu en visio, à l'heure qui vous arrange.",
  },
  {
    q: "Combien de temps dure le diagnostic ?",
    a: "Tous les packs commencent par le diagnostic approfondi : comptez 30 à 45 minutes, au calme. Vous pouvez répondre par écrit ou en vocal sur WhatsApp, et en plusieurs fois.",
  },
  {
    q: "Comment payer ?",
    a: (
      <>
        Après validation de votre inscription, Cassandra vous envoie les coordonnées de paiement. Vous payez par Mobile Money
        (Orange, MTN, Moov), Wave, en espèces ou par virement, puis vous envoyez la capture sur WhatsApp.{" "}
        <Link href="/paiement">Voir le détail</Link>.
      </>
    ),
  },
  { q: "Puis-je payer en plusieurs fois ?", a: "Oui, à partir du pack Premium (12 000 XOF). Indiquez les échéances souhaitées dans le formulaire d'inscription." },
  {
    q: "Mes données sont-elles confidentielles ?",
    a: (
      <>
        Oui. Vos informations servent uniquement à votre accompagnement. Votre dossier de coaching reste entre vous et
        votre coach. <Link href="/mentions-legales#donnees">En savoir plus</Link>.
      </>
    ),
  },
  {
    q: "Que se passe-t-il après le diagnostic ?",
    a: "Cassandra analyse vos réponses et vous remet votre fiche diagnostic avec vos 3 priorités. Selon votre pack, vous recevez ensuite votre plan d'action, vos livrables, puis vos séances et votre suivi.",
  },
  { q: "Puis-je changer de pack ?", a: "Oui, vous pouvez monter en gamme à tout moment : ce qui a déjà été fait est conservé. Parlez-en à Cassandra sur WhatsApp." },
  {
    q: "Comment fonctionne le parrainage ?",
    a: "Si un proche vous a recommandé, ou si vous souhaitez parrainer quelqu'un, cochez l'option dans le formulaire et indiquez son nom : l'offre parrainage apporte un avantage à vous deux.",
  },

];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.filter((f) => typeof f.a === "string").map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Banner
        crumbs={[{ href: "/faq", label: "FAQ" }]}
        eyebrow="Questions fréquentes"
        title={<>Vos questions, <em>nos réponses.</em></>}
      />
      <section className="sec">
        <div className="inner narrow faq">
          {FAQ.map((f) => (
            <details key={f.q} className="rv">
              <summary>{f.q}</summary>
              <div>{f.a}</div>
            </details>
          ))}
        </div>
      </section>
      <CtaBand
        title={<>Une autre <em>question ?</em></>}
        lead="Écrivez à Cassandra, elle vous répond sur WhatsApp."
        waText="Bonjour Cassandra, j'ai une question : "
      />
    </>
  );
}
