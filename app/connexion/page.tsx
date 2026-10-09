import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { Banner } from "@/components/ui";

export const metadata: Metadata = {
  title: "Espace client",
  robots: { index: false, follow: false },
};

export default function ConnexionPage() {
  return (
    <>
      <Banner
        crumbs={[{ href: "/connexion", label: "Espace client" }]}
        eyebrow="Espace client"
        title={<>Bientôt <em>disponible.</em></>}
        lead="Votre espace pour suivre votre progression, retrouver vos livrables et échanger avec Cassandra arrive prochainement. En attendant, tout se passe sur WhatsApp."
      >
        <div className="btn-row mt-m">
          <Link href="/" className="btn btn-gold">
            Retour à l&apos;accueil <Icon name="arrow" />
          </Link>
        </div>
      </Banner>
    </>
  );
}
