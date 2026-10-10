import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import PackQuiz from "@/components/PackQuiz";
import { Banner, CtaBand, Marquee, Ticks } from "@/components/ui";
import { OBJECTIFS, PACKS, priceLabel, xof } from "@/lib/site";

export const metadata: Metadata = {
  title: "Les 6 packs Coaching Express, de 5 000 à 30 000 XOF",
  description:
    "Basic, Standard, Premium, Diamond, Gold, VIP : comparez les packs Coaching Express et trouvez celui qui correspond à votre objectif.",
  alternates: { canonical: "/coaching/packs" },
};

export default function PacksPage() {
  return (
    <>
      <Banner
        crumbs={[
          { href: "/coaching", label: "Coaching Express" },
          { href: "/coaching/packs", label: "Les packs" },
        ]}
        eyebrow="Nos formules"
        title={<>Commencer par se connaître. <em>Finir par agir.</em></>}
        lead="Six packs, du diagnostic approfondi au parcours sur-mesure de 3 mois. Un doute ? Faites le test juste en dessous."
      />

      <Marquee items={PACKS.map((p) => `${p.name} · ${priceLabel(p)}`)} />

      <section className="sec tight deco">
        <div className="inner">
          <div className="rv">
            <PackQuiz />
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 24 }}>
        <div className="inner" style={{ display: "grid", gap: 20 }}>
          {PACKS.map((p) => (
            <article className={`pack-full rv${p.featured ? " featured" : ""}`} id={p.id} key={p.id}>
              <div>
                <span className="pack-name">{p.name}</span>
                <p className="pack-price">{priceLabel(p)}</p>
                <p className="muted mb-0">{p.subtitle}</p>
                <p className="pack-want">« {p.want} »</p>
                <Link href={`/coaching/inscription?pack=${p.id}`} className="btn btn-gold mt-s btn-block">
                  S&apos;inscrire <Icon name="arrow" />
                </Link>
              </div>
              <div>
                <h3>Ce que vous obtenez</h3>
                <Ticks items={p.gets} />
              </div>
              <div>
                <h3>{p.detailTitle}</h3>
                {p.id === "standard" ? (
                  <ul className="ticks">
                    {OBJECTIFS.map((o) => (
                      <li key={o.name}>
                        <Icon name="check" />
                        <span>
                          <b>{o.name} :</b> {o.livrables.join(", ")}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Ticks items={p.details} />
                )}
                <p className="hint mt-s">
                  Diagnostic approfondi
                  {p.visio ? " · séances en visio" : ""}
                  {p.price >= 12000 ? " · paiement en plusieurs fois possible" : ""}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand
        title={<>Votre premier message <em>suffit.</em></>}
        lead="Écrivez à Cassandra : vous choisissez ensemble le pack adapté à votre objectif, et on démarre."
        waText="Bonjour Cassandra, j'hésite entre plusieurs packs Coaching Express. Pouvez-vous m'aider à choisir ?"
        secondary={{ href: "/coaching/inscription", label: "Remplir l'inscription" }}
      />
    </>
  );
}
