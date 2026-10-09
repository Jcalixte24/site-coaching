import type { Metadata } from "next";
import DemandeForm from "@/components/DemandeForm";
import { Banner } from "@/components/ui";

export const metadata: Metadata = {
  title: "Demande de recrutement",
  description: "Décrivez votre besoin en quelques minutes et obtenez une estimation immédiate du coût de recrutement de vos stagiaires.",
  alternates: { canonical: "/entreprises/demande" },
};

export default function DemandePage() {
  return (
    <>
      <Banner
        crumbs={[
          { href: "/entreprises", label: "Entreprises" },
          { href: "/entreprises/demande", label: "Demande" },
        ]}
        eyebrow="Demande de recrutement"
        title={<>Décrivez votre besoin, <em>on s&apos;occupe du reste.</em></>}
        lead="Quelques minutes suffisent. Vous voyez l'estimation en direct, puis Cassandra vous recontacte pour un point de cadrage."
      />
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="inner narrow">
          <div className="form-shell overlap">
            <DemandeForm />
          </div>
        </div>
      </section>
    </>
  );
}
