import type { Metadata } from "next";
import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import PackStairs from "@/components/PackStairs";
import { CtaBand, Fx, Marquee, Ticks } from "@/components/ui";
import { OBJECTIFS } from "@/lib/site";

// Accueil de l'espace candidat : uniquement le coaching (rien sur l'offre employeur).
export const metadata: Metadata = {
  title: "Espace candidat · Coaching Express",
  description:
    "Coaching personnalisé 100 % WhatsApp pour décrocher un emploi : diagnostic approfondi, CV optimisé ATS, LinkedIn, pitch, simulation d'entretien. 6 packs selon votre objectif.",
  alternates: { canonical: "/coaching" },
};

const BLOCAGES = [
  { q: "J'envoie des CV et personne ne répond.", p: "Un CV et un profil LinkedIn mal positionnés passent inaperçus (et les filtres ATS font le reste)." },
  { q: "Je ne sais pas comment me vendre en entretien.", p: "Sans pitch ni méthode de réponse, même un bon profil se fait oublier." },
  { q: "J'ai une idée, mais par où commencer ?", p: "Sans cadrage ni feuille de route, un projet reste une idée." },
  { q: "Je n'ai pas de réseau.", p: "Beaucoup d'opportunités passent par la visibilité et le réseautage." },
];

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

const TEMPS = [
  ["Vous choisissez", "Votre pack, selon votre objectif et votre budget : de 5 000 à 30 000 XOF."],
  ["Vous faites votre diagnostic", "Le diagnostic approfondi, inclus dans tous les packs, pour analyser votre profil."],
  ["Cassandra construit votre plan", "Recommandations, plan d'action et livrables personnalisés."],
  ["Vous passez à l'action", "Mise en œuvre accompagnée : séances visio et suivi selon votre pack."],
];

export default function EspaceCandidat() {
  return (
    <>
      {/* ---------- Héros ---------- */}
      <section className="hero hero-xl hero-light">
        <Fx />
        <span className="ghost-word" aria-hidden="true">Candidat</span>
        <div className="inner">
          <p className="eyebrow rise">
            <b>01</b> Espace candidat · Coaching Express
          </p>
          <h1 className="mega">
            <span className="ln">
              <span>Un plan, des outils,</span>
            </span>
            <span className="ln indent">
              <span>une coach.</span>
            </span>
            <span className="ln">
              <span>
                <em>Pour décrocher plus vite.</em>
              </span>
            </span>
          </h1>
          <div className="hero-mid">
            <p className="lead rise d2">
              Recherche d&apos;emploi, CV et entretien, développement personnel, entrepreneuriat : un accompagnement
              construit sur <em>votre profil</em>, 100 % sur WhatsApp, sans déplacement.
            </p>
            <div className="pings" aria-hidden="true">
              <div className="ping">
                <i><Icon name="clipboard" /></i>
                <span>Diagnostic reçu<small>Vos 3 priorités sont prêtes</small></span>
              </div>
              <div className="ping">
                <i className="green"><Icon name="file" /></i>
                <span>CV_optimise_ATS.pdf<small>Envoyé sur WhatsApp</small></span>
              </div>
              <div className="ping">
                <i className="blue"><Icon name="video" /></i>
                <span>Séance visio jeudi 18 h<small>Simulation d&apos;entretien</small></span>
              </div>
            </div>
          </div>
          <div className="hero-meta rise d3">
            <div>
              <p className="meta-k">Format</p>
              <p className="meta-v">100 % <em>WhatsApp</em></p>
            </div>
            <div>
              <p className="meta-k">Diagnostic</p>
              <p className="meta-v">Inclus</p>
            </div>
            <div>
              <p className="meta-k">Packs</p>
              <p className="meta-v">6 formules</p>
            </div>
            <div className="hero-cta">
              <Link href="/coaching/packs" className="btn btn-gold">
                Voir les 6 packs <Icon name="arrow" />
              </Link>
              <Link href="/coaching/packs#quel-pack" className="btn btn-ghost">
                Quel pack pour moi ?
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Marquee items={["CV optimisé ATS", "Pitch de 30 secondes", "Simulation d'entretien", "Profil LinkedIn", "Business Model Canvas", "Objectifs SMART", "Plan d'action", "Séances en visio"]} />

      {/* ---------- La coach en chiffres ---------- */}
      <section className="statband" aria-label="Votre coach en chiffres">
        <div className="inner grid">
          <div className="cell"><b className="count">8+</b><span>ans d&apos;expérience</span></div>
          <div className="cell"><b className="count">50+</b><span>ateliers conçus et animés</span></div>
          <div className="cell"><b className="count">300+</b><span>bénéficiaires accompagnés</span></div>
          <div className="cell"><b className="count">92 %</b><span>de satisfaction</span></div>
          <Link href="/a-propos" className="cell"><b>Votre coach →</b><span>Le parcours de Cassandra</span></Link>
        </div>
      </section>

      {/* ---------- Blocages ---------- */}
      <section className="sec deco">
        <div className="inner">
          <div className="sec-head rv">
            <p className="eyebrow"><b>02</b> Votre réalité</p>
            <h2 className="h-l">Ce que vous vivez, <em>on le connaît.</em></h2>
            <p className="lead">Vous avez des compétences et de l&apos;ambition. Ce qui manque, c&apos;est une méthode, des outils et un regard extérieur.</p>
          </div>
          <div className="grid-2">
            {BLOCAGES.map((b, i) => (
              <figure className={`quote rv d${i % 2}`} key={b.q} style={{ margin: 0 }}>
                <q>{b.q}</q>
                <p>{b.p}</p>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Pas un tuto de plus ---------- */}
      <section className="sec warm">
        <div className="inner">
          <div className="sec-head rv">
            <p className="eyebrow"><b>03</b> La vraie plus-value</p>
            <h2 className="h-l">Pas un tuto de plus. <em>Un accompagnement sur VOTRE profil.</em></h2>
          </div>
          <div className="versus">
            <div className="without rv">
              <h3>Seul(e) avec des tutos et modèles</h3>
              <Ticks minus items={["Des conseils génériques, valables pour tout le monde.", "Un CV « modèle » téléchargé, identique à des milliers d'autres.", "Aucun retour : on ne sait jamais ce qui ne va pas.", "La motivation retombe, les objectifs restent flous."]} />
            </div>
            <div className="with on-navy rv d1">
              <h3>Avec Coaching Express</h3>
              <Ticks items={["Un diagnostic de VOTRE profil : forces, axes de progression, positionnement.", "Des livrables sur-mesure : CV optimisé ATS, LinkedIn, pitch, lettre de motivation.", "Des retours personnalisés et des mises en situation (simulation d'entretien).", "Un plan d'action SMART et un suivi pour tenir le cap."]} />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Les 6 packs ---------- */}
      <section className="sec navy on-navy">
        <div className="inner">
          <div className="sec-head rv">
            <p className="eyebrow"><b>04</b> Les packs</p>
            <h2 className="h-l">Montez en gamme, <em>marche par marche.</em></h2>
            <p className="lead">Du diagnostic approfondi au parcours sur-mesure de 3 mois : chaque marche ajoute quelque chose. Choisissez la vôtre.</p>
          </div>
          <PackStairs />
          <p className="mt-m rv">
            <Link href="/coaching/packs#quel-pack" className="link-arrow">
              Un doute ? Faites le test « Quel pack est fait pour vous ? » <Icon name="arrow" />
            </Link>
          </p>
        </div>
      </section>

      {/* ---------- 4 temps ---------- */}
      <section className="sec">
        <div className="inner">
          <div className="sec-head rv">
            <p className="eyebrow"><b>05</b> Comment ça marche</p>
            <h2 className="h-l">4 temps, du premier message <em>à l&apos;action.</em></h2>
          </div>
          <ol className="steps four" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {TEMPS.map(([t, p], i) => (
              <li className={`step rv d${i}`} key={t}>
                <span className="step-n">0{i + 1}</span>
                <h3>{t}</h3>
                <p>{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- WhatsApp ---------- */}
      <section className="sec warm">
        <div className="inner two-col">
          <div>
            <div className="rv">
              <p className="eyebrow"><b>06</b> Express &amp; accessible</p>
              <h2 className="h-l">Tout se gère <em>sur WhatsApp.</em></h2>
              <p className="lead mt-s">Pas de déplacement, pas de rendez-vous compliqué : votre coaching tient dans votre poche.</p>
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
              <span><b>Cassandra Touré</b><small>Coach · en ligne</small></span>
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

      {/* ---------- Objectifs et livrables ---------- */}
      <section className="sec deco">
        <div className="inner">
          <div className="sec-head rv">
            <p className="eyebrow"><b>07</b> Pour atteindre votre objectif</p>
            <h2 className="h-l">4 objectifs, <em>des livrables concrets.</em></h2>
            <p className="lead">À partir du pack Standard, vous repartez avec des outils prêts à l&apos;emploi, construits pour votre objectif.</p>
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

      {/* ---------- Options ---------- */}
      <section className="sec warm">
        <div className="inner">
          <div className="sec-head rv">
            <p className="eyebrow"><b>08</b> Options</p>
            <h2 className="h-l">Allez <em>encore plus loin.</em></h2>
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
        title={<>Votre premier message <em>suffit.</em></>}
        lead="Écrivez à Cassandra sur WhatsApp : vous choisissez ensemble le pack adapté à votre objectif, et on démarre."
        waText="Bonjour Cassandra, je souhaite en savoir plus sur le Coaching Express."
        secondary={{ href: "/coaching/inscription", label: "Remplir l'inscription" }}
      />
    </>
  );
}
