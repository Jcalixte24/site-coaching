import type { Metadata } from "next";
import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import { Banner, CtaBand } from "@/components/ui";

export const metadata: Metadata = {
  title: "Comment payer votre pack",
  description:
    "Mobile Money, Wave, espèces ou virement : payez votre pack Coaching Express simplement, puis envoyez la capture de votre paiement sur WhatsApp.",
  alternates: { canonical: "/paiement" },
};

const STEPS: { ic: IconName; t: string; p: string }[] = [
  { ic: "clipboard", t: "Vous vous inscrivez", p: "Remplissez le formulaire d'inscription et envoyez-le à Cassandra sur WhatsApp." },
  { ic: "chat", t: "Cassandra valide", p: "Elle confirme votre pack et vous envoie les coordonnées de paiement, en privé." },
  { ic: "wallet", t: "Vous payez", p: "Par Mobile Money (Orange, MTN, Moov), Wave, en espèces ou par virement." },
  { ic: "camera", t: "Vous envoyez la preuve", p: "Une capture d'écran du paiement, sur WhatsApp. Cassandra vérifie et active votre pack." },
];

export default function PaiementPage() {
  return (
    <>
      <Banner
        crumbs={[{ href: "/paiement", label: "Paiement" }]}
        eyebrow="Paiement"
        title={<>Payer, c&apos;est <em>simple.</em></>}
        lead="Aucun paiement en ligne, aucune carte bancaire : vous payez avec le moyen que vous utilisez déjà, et vous envoyez la capture."
      />

      <section className="sec">
        <div className="inner">
          <ol className="steps four" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {STEPS.map((s, i) => (
              <li className={`step rv d${i}`} key={s.t}>
                <span className="step-n">0{i + 1}</span>
                <span className="card-ic"><Icon name={s.ic} /></span>
                <h3>{s.t}</h3>
                <p>{s.p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec warm">
        <div className="inner grid-3">
          <article className="card rv">
            <span className="card-ic"><Icon name="shield" /></span>
            <h3>Pour votre sécurité</h3>
            <p className="muted">
              Les numéros de paiement ne sont jamais affichés sur le site. Ils vous sont envoyés directement par Cassandra,
              après validation de votre inscription. Méfiez-vous de tout autre numéro.
            </p>
          </article>
          <article className="card rv d1">
            <span className="card-ic"><Icon name="clock" /></span>
            <h3>Le suivi de votre paiement</h3>
            <p className="muted">
              Après réception de votre capture, votre paiement passe de « en attente » à « validé », et votre pack démarre.
              En cas de problème, Cassandra vous recontacte.
            </p>
          </article>
          <article className="card rv d2">
            <span className="card-ic"><Icon name="wallet" /></span>
            <h3>Payer en plusieurs fois</h3>
            <p className="muted">
              Possible à partir du pack Premium (10 000 XOF). Indiquez les échéances souhaitées dans le formulaire
              d&apos;inscription.
            </p>
          </article>
        </div>
        <div className="inner mt-m rv">
          <Link href="/coaching/inscription" className="btn btn-gold">
            Je m&apos;inscris <Icon name="arrow" />
          </Link>
        </div>
      </section>

      <CtaBand
        title={<>Une question <em>sur le paiement ?</em></>}
        lead="Écrivez à Cassandra : elle vous répond sur WhatsApp."
        waText="Bonjour Cassandra, j'ai une question sur le paiement de mon pack."
      />
    </>
  );
}
