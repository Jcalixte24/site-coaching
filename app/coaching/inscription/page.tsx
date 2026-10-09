import type { Metadata } from "next";
import InscriptionForm from "@/components/InscriptionForm";
import { Banner } from "@/components/ui";

export const metadata: Metadata = {
  title: "Inscription Coaching Express",
  description:
    "Inscrivez-vous au Coaching Express en 3 minutes : choisissez votre pack, envoyez votre inscription à Cassandra sur WhatsApp.",
  alternates: { canonical: "/coaching/inscription" },
};

export default function InscriptionPage() {
  return (
    <>
      <Banner
        crumbs={[
          { href: "/coaching", label: "Coaching Express" },
          { href: "/coaching/inscription", label: "Inscription" },
        ]}
        eyebrow="Coaching Express · Inscription"
        title={<>Formulaire <em>de souscription</em></>}
        lead="Remplissez ce formulaire pour démarrer votre coaching. Il se termine par un message WhatsApp déjà rédigé, à envoyer à Cassandra. Elle vous guide ensuite pour le paiement et le diagnostic."
      />
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="inner narrow">
          <div className="form-shell overlap">
            <InscriptionForm />
          </div>
        </div>
      </section>
    </>
  );
}
