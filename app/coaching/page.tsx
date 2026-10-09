import type { Metadata } from "next";
import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import { Banner, CtaBand, Marquee, Ticks } from "@/components/ui";
import { OBJECTIFS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Coaching Express : CV, entretien, emploi, entrepreneuriat",
  description:
    "Un plan, des outils, un coach. Coaching Express 100 % WhatsApp pour les jeunes : diagnostic, CV optimisé ATS, LinkedIn, pitch, business model. Dès 1 000 XOF.",
  alternates: { canonical: "/coaching" },
};

const WA_POINTS: { ic: IconName; t: string; p: string }[] = [
  { ic: "chat", t: "Échanges simples et rapides", p: "Questionnaire, questions, retours : tout passe par un chat que vous utilisez déjà." },
  { ic: "file", t: "Livrables envoyés directement", p: "CV, plan d'action, fiches : reçus en PDF, prêts à l'emploi." },
  { ic: "video", t: "Séances en visio", p: "Les séances individuelles se calent à l'heure qui vous arrange." },
  { ic: "zap", t: "Un format express", p: "Un accompagnement court et ciblé, pour avancer vite sans vous disperser." },
];

const OBJ_ICONS: IconName[] = ["briefcase", "mic", "sprout", "rocket"];

const OPTIONS: { ic: IconName; t: string; s: string; p: string }[] = [
  { ic: "book", t: "Livre « Aller au bout de son idée »", s: "Offert avec Gold", p: "Pour passer de l'idée à l'action." },
  { ic: "gift", t: "Offre parrainage", s: "Parrainez un proche", p: "Un avantage pour vous deux." },
  { ic: "wallet", t: "Paiement en plusieurs fois", s: "À partir du pack Premium", p: "Étalez votre investissement." },
  { ic: "rocket", t: "Pack Entrepreneur", s: "Sur devis", p: "Structurer et lancer votre projet." },
  { ic: "award", t: "Pack Leadership", s: "Sur devis", p: "Développer votre posture de leader." },
];

export default function CoachingPage() {
  return (
    <>
      <Banner
        crumbs={[{ href: "/coaching", label: "Coaching Express" }]}
        eyebrow="Coaching Express · 100 % WhatsApp"
        title={<>Un plan, des outils, un coach. <em>Pour atteindre votre objectif plus vite.</em></>}
        lead="Sans déplacement : votre coaching tient dans votre poche. De 1 000 à 25 000 XOF selon votre besoin."
      >
        <div className="btn-row mt-m">
          <Link href="/coaching/packs" className="btn btn-gold">
            Voir les 7 packs <Icon name="arrow" />
          </Link>
          <Link href="/coaching/packs#quel-pack" className="btn btn-ghost">
            Quel pack pour moi ?
          </Link>
        </div>
      </Banner>

      <Marquee items={["Recherche d'emploi", "CV & entretien", "Développement personnel", "Entrepreneuriat", "100 % WhatsApp", "Séances en visio", "Livrables en PDF"]} />

      {/* ---------- Pas un tuto de plus ---------- */}
      <section className="sec deco">
        <div className="inner">
          <div className="sec-head rv">
            <p className="eyebrow">La vraie plus-value</p>
            <h2 className="h-l">
              Pas un tuto de plus. <em>Un accompagnement sur VOTRE profil.</em>
            </h2>
          </div>
          <div className="versus">
            <div className="without rv">
              <h3>Seul(e) avec des tutos et modèles</h3>
              <Ticks
                minus
                items={[
                  "Des conseils génériques, valables pour tout le monde.",
                  "Un CV « modèle » téléchargé, identique à des milliers d'autres.",
                  "Aucun retour : on ne sait jamais ce qui ne va pas.",
                  "La motivation retombe, les objectifs restent flous.",
                ]}
              />
            </div>
            <div className="with on-navy rv d1">
              <h3>Avec Coaching Express</h3>
              <Ticks
                items={[
                  "Un diagnostic de VOTRE profil : forces, axes de progression, positionnement.",
                  "Des livrables sur-mesure : CV optimisé ATS, LinkedIn, pitch, lettre de motivation.",
                  "Des retours personnalisés et des mises en situation (simulation d'entretien).",
                  "Un plan d'action SMART et un suivi pour tenir le cap.",
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Tout se gère sur WhatsApp ---------- */}
      <section className="sec warm">
        <div className="inner two-col">
          <div>
            <div className="rv">
              <p className="eyebrow">Express &amp; accessible</p>
              <h2 className="h-l">
                Tout se gère <em>sur WhatsApp.</em>
              </h2>
              <p className="lead mt-s">Pas de déplacement, pas de rendez-vous compliqué.</p>
            </div>
            <div className="grid-2 mt-m">
              {WA_POINTS.map((w, i) => (
                <div className={`rv d${i % 2}`} key={w.t}>
                  <span className="card-ic"><Icon name={w.ic} /></span>
                  <h3 className="h-s" style={{ marginBottom: 6 }}>{w.t}</h3>
                  <p className="muted mb-0">{w.p}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="phone rv d2" aria-label="Exemple de conversation WhatsApp avec Cassandra" role="img">
            <div className="phone-head">
              <span className="brand-mark" aria-hidden="true">CT</span>
              <span>
                <b>Cassandra Touré</b>
                <small>Coach · en ligne</small>
              </span>
            </div>
            <div className="phone-body" aria-hidden="true">
              <div className="bub in" style={{ "--i": 0 } as React.CSSProperties}>Bienvenue ! Voici votre questionnaire de diagnostic.</div>
              <div className="bub out" style={{ "--i": 1 } as React.CSSProperties}>Envoyé, merci !</div>
              <div className="bub in" style={{ "--i": 2 } as React.CSSProperties}>Votre plan d&apos;action et votre CV sont prêts : je vous les envoie en PDF.</div>
              <div className="bub in file" style={{ "--i": 3 } as React.CSSProperties}><Icon name="file" /> CV_optimise_ATS.pdf</div>
              <div className="bub out" style={{ "--i": 4 } as React.CSSProperties}>Super ! On cale la séance visio jeudi ?</div>
              <div className="bub in" style={{ "--i": 5 } as React.CSSProperties}>Parfait, à jeudi !</div>
              <div className="typing" style={{ "--i": 6 } as React.CSSProperties}><span /><span /><span /></div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 4 objectifs ---------- */}
      <section className="sec">
        <div className="inner">
          <div className="sec-head rv">
            <p className="eyebrow">Pour atteindre votre objectif</p>
            <h2 className="h-l">
              4 objectifs, <em>des livrables concrets.</em>
            </h2>
            <p className="lead">
              À partir du pack Standard, vous repartez avec des outils prêts à l&apos;emploi, construits pour votre objectif.
            </p>
          </div>
          <div className="grid-4">
            {OBJECTIFS.map((o, i) => (
              <article className={`card rv d${i % 4}`} key={o.name}>
                <span className="card-ic"><Icon name={OBJ_ICONS[i]} /></span>
                <h3>{o.name}</h3>
                <Ticks items={o.livrables} />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 4 temps ---------- */}
      <section className="sec navy on-navy">
        <div className="inner">
          <div className="sec-head rv">
            <p className="eyebrow">Comment ça marche</p>
            <h2 className="h-l">
              4 temps, du premier message <em>à l&apos;action.</em>
            </h2>
          </div>
          <ol className="steps four" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {[
              ["Vous choisissez", "Votre pack, selon votre objectif et votre budget : de 1 000 à 25 000 XOF."],
              ["Vous faites votre diagnostic", "Un questionnaire pour analyser votre profil. Standard pour Flash, approfondi de Basic à VIP."],
              ["Cassandra construit votre plan", "Recommandations, plan d'action et livrables personnalisés."],
              ["Vous passez à l'action", "Mise en œuvre accompagnée : séances visio et suivi selon votre pack."],
            ].map(([t, p], i) => (
              <li className={`step rv d${i}`} key={t}>
                <span className="step-n">0{i + 1}</span>
                <h3>{t}</h3>
                <p>{p}</p>
              </li>
            ))}
          </ol>
          <div className="btn-row mt-m rv">
            <Link href="/coaching/inscription" className="btn btn-gold">
              Je m&apos;inscris <Icon name="arrow" />
            </Link>
            <Link href="/paiement" className="btn btn-ghost">
              Comment payer ?
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Options ---------- */}
      <section className="sec">
        <div className="inner">
          <div className="sec-head rv">
            <p className="eyebrow">Options</p>
            <h2 className="h-l">
              Allez <em>encore plus loin.</em>
            </h2>
            <p className="lead">Des options pour compléter votre parcours selon votre projet.</p>
          </div>
          <div className="grid-3">
            {OPTIONS.map((o, i) => (
              <article className={`card rv d${i % 3}`} key={o.t}>
                <span className="card-ic"><Icon name={o.ic} /></span>
                <span className="badge soft">{o.s}</span>
                <h3 className="mt-s">{o.t}</h3>
                <p className="muted">{o.p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={<>Prêt(e) à <em>avancer ?</em></>}
        lead="Choisissez votre pack ou écrivez à Cassandra : elle vous aide à choisir sur WhatsApp."
        waText="Bonjour Cassandra, je souhaite en savoir plus sur le Coaching Express."
        secondary={{ href: "/coaching/packs", label: "Voir les packs" }}
      />
    </>
  );
}
