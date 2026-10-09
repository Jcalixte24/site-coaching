import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import PackStairs from "@/components/PackStairs";
import { CtaBand, Fx, Marquee } from "@/components/ui";
import { TESTIMONIALS } from "@/lib/testimonials";

const BLOCAGES = [
  {
    q: "J'envoie des CV et personne ne répond.",
    p: "Un CV et un profil LinkedIn mal positionnés passent inaperçus (et les filtres ATS font le reste).",
  },
  {
    q: "Je ne sais pas comment me vendre en entretien.",
    p: "Sans pitch ni méthode de réponse, même un bon profil se fait oublier.",
  },
  { q: "J'ai une idée, mais par où commencer ?", p: "Sans cadrage ni feuille de route, un projet reste une idée." },
  { q: "Je n'ai pas de réseau.", p: "Beaucoup d'opportunités passent par la visibilité et le réseautage." },
];

const ENJEUX: { ic: IconName; t: string; p: string }[] = [
  {
    ic: "clock",
    t: "Du temps managers absorbé",
    p: "Tri des CV, premiers entretiens, relances : des heures prises sur le cœur d'activité.",
  },
  {
    ic: "target",
    t: "Un risque d'erreur de casting",
    p: "Un profil mal évalué coûte du temps, de l'énergie et de la motivation à l'équipe.",
  },
  {
    ic: "compass",
    t: "Une prise de poste floue",
    p: "Sans objectifs clairs ni parcours, l'autonomie des stagiaires tarde à venir.",
  },
];

const TEMPS = [
  { t: "Vous choisissez", p: "Votre pack, selon votre objectif et votre budget : de 1 000 à 25 000 XOF." },
  { t: "Vous faites votre diagnostic", p: "Un questionnaire pour analyser votre profil, vos forces et ce qui bloque." },
  { t: "Cassandra construit votre plan", p: "Recommandations, plan d'action et livrables personnalisés." },
  { t: "Vous passez à l'action", p: "Mise en œuvre accompagnée : séances visio et suivi selon votre pack." },
];

const d = (s: string) => ({ "--d": s }) as React.CSSProperties;

export default function Home() {
  return (
    <>
      {/* ---------- Héros ---------- */}
      <section className="hero hero-xl on-navy">
        <Fx />
        <span className="ghost-word" aria-hidden="true">Talents</span>
        <div className="inner">
          <p className="eyebrow rise">
            <b>CI</b> Talents &amp; Coaching · Abidjan
          </p>
          <h1 className="mega">
            <span className="ln">
              <span>Le talent</span>
            </span>
            <span className="ln indent">
              <span>se prépare.</span>
            </span>
            <span className="ln">
              <span>
                <em>Puis il se recrute.</em>
              </span>
            </span>
          </h1>

          <div className="hero-mid">
            <p className="lead rise d2">
              Cassandra Touré coache les jeunes jusqu&apos;à devenir des <em>candidats qualifiés</em>, et aide les
              entreprises à recruter et intégrer des stagiaires prêts à contribuer.
            </p>
            {/* Le parcours en trois notifications : diagnostic → livrables → recrutement */}
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
                <i className="blue"><Icon name="briefcase" /></i>
                <span>3 profils en shortlist<small>Tests validés</small></span>
              </div>
            </div>
          </div>

          <div className="hero-meta rise d3">
            <div>
              <p className="meta-k">Basée à</p>
              <p className="meta-v">Abidjan, CI</p>
            </div>
            <div>
              <p className="meta-k">Format</p>
              <p className="meta-v">100 % <em>WhatsApp</em></p>
            </div>
            <div>
              <p className="meta-k">Coaching dès</p>
              <p className="meta-v">1&nbsp;000&nbsp;XOF</p>
            </div>
            <div className="hero-cta">
              <Link href="/coaching" className="btn btn-gold">
                Je suis un jeune <Icon name="arrow" />
              </Link>
              <Link href="/entreprises" className="btn btn-ghost">
                Je suis une entreprise
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Marquee
        items={[
          "CV optimisé ATS",
          "Pitch de 30 secondes",
          "Simulation d'entretien",
          "Profil LinkedIn",
          "Business Model Canvas",
          "Objectifs SMART",
          "Shortlist qualifiée",
          "Onboarding sur 3 mois",
        ]}
      />

      {/* ---------- Chiffres ---------- */}
      <section className="statband" aria-label="Cassandra Touré en chiffres">
        <div className="inner grid">
          <div className="cell">
            <b className="count">8+</b>
            <span>ans d&apos;expérience</span>
          </div>
          <div className="cell">
            <b className="count">50+</b>
            <span>ateliers conçus et animés</span>
          </div>
          <div className="cell">
            <b className="count">300+</b>
            <span>bénéficiaires accompagnés</span>
          </div>
          <div className="cell">
            <b className="count">92 %</b>
            <span>de satisfaction</span>
          </div>
          <Link href="/a-propos" className="cell">
            <b>Son parcours →</b>
            <span>BSF, COOPERL, Audeca…</span>
          </Link>
        </div>
      </section>

      {/* ---------- Deux entrées ---------- */}
      <section className="sec warm">
        <div className="inner">
          <div className="sec-head rv">
            <p className="eyebrow">
              <b>01</b> Deux publics, un même cercle
            </p>
            <h2 className="h-l">
              Le coaching forme les talents. <em>Les entreprises les recrutent.</em>
            </h2>
          </div>
          <div className="duo">
            <Link href="/coaching" className="pan jeune rv">
              <div>
                <span className="pan-k">Je suis un jeune</span>
                <h3>Coaching Express</h3>
                <p>Diagnostic, CV optimisé, pitch, simulation d&apos;entretien. 7 packs de 1&nbsp;000 à 25&nbsp;000&nbsp;XOF.</p>
              </div>
              <span className="pan-in">Choisir mon pack <i /></span>
              {/* Une courbe qui monte, marche après marche */}
              <svg className="pan-art" viewBox="0 0 160 160" aria-hidden="true">
                <path className="draw" pathLength={1} d="M10 140 H50 V105 H90 V70 H130 V30" />
                <circle className="pop" cx="130" cy="30" r="9" fill="currentColor" style={d("0.3s")} />
              </svg>
            </Link>
            <Link href="/entreprises" className="pan entreprise rv d1">
              <div>
                <span className="pan-k">Je suis une entreprise</span>
                <h3>Acquisition de talents</h3>
                <p>
                  Fiches de poste, sourcing, tests, entretiens, onboarding. 140&nbsp;000&nbsp;XOF HT par profil, tarif nouveau
                  client.
                </p>
              </div>
              <span className="pan-in">Recruter avec Cassandra <i /></span>
              {/* Trois profils en shortlist, le dernier retenu */}
              <svg className="pan-art" viewBox="0 0 160 160" aria-hidden="true" style={{ color: "var(--gold)" }}>
                <rect className="draw" pathLength={1} x="6" y="20" width="120" height="30" rx="8" />
                <rect className="draw" pathLength={1} x="16" y="62" width="120" height="30" rx="8" style={d("0.2s")} />
                <rect className="draw" pathLength={1} x="26" y="104" width="120" height="30" rx="8" style={d("0.4s")} />
                <g className="pop" style={d("0.5s")}>
                  <circle cx="140" cy="119" r="14" fill="currentColor" />
                  <path d="M133 119 l5 5 9-10" fill="none" stroke="#0e1a36" strokeWidth="3" strokeLinecap="round" />
                </g>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Blocages des jeunes ---------- */}
      <section className="sec deco">
        <div className="inner">
          <div className="sec-head rv">
            <p className="eyebrow">
              <b>02</b> Côté jeunes
            </p>
            <h2 className="h-l">
              Ce que vous vivez, <em>on le connaît.</em>
            </h2>
            <p className="lead">
              Vous avez des compétences et de l&apos;ambition. Ce qui manque, c&apos;est une méthode, des outils et un
              regard extérieur.
            </p>
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

      {/* ---------- Les 7 packs ---------- */}
      <section className="sec navy on-navy">
        <div className="inner">
          <div className="sec-head rv">
            <p className="eyebrow">
              <b>03</b> Coaching Express
            </p>
            <h2 className="h-l">
              Montez en gamme, <em>marche par marche.</em>
            </h2>
            <p className="lead">
              Du simple diagnostic au parcours sur-mesure : chaque marche ajoute quelque chose. Choisissez la vôtre.
            </p>
          </div>
          <PackStairs />
          <p className="mt-m rv">
            <Link href="/coaching/packs#quel-pack" className="link-arrow">
              Un doute ? Faites le test « Quel pack est fait pour vous ? » <Icon name="arrow" />
            </Link>
          </p>
        </div>
      </section>

      {/* ---------- Comment ça marche ---------- */}
      <section className="sec warm">
        <div className="inner">
          <div className="sec-head rv">
            <p className="eyebrow">
              <b>04</b> Comment ça marche
            </p>
            <h2 className="h-l">
              4 temps, du premier message <em>à l&apos;action.</em>
            </h2>
          </div>
          <ol className="steps four" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {TEMPS.map((s, i) => (
              <li className={`step rv d${i % 4}`} key={s.t}>
                <span className="step-n">0{i + 1}</span>
                <h3>{s.t}</h3>
                <p>{s.p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Enjeux entreprises ---------- */}
      <section className="sec deco">
        <div className="inner">
          <div className="sec-head rv">
            <p className="eyebrow">
              <b>05</b> Côté entreprises
            </p>
            <h2 className="h-l">
              Recruter des stagiaires, ça paraît simple. <em>Le faire bien, c&apos;est une autre histoire.</em>
            </h2>
          </div>
          <div className="grid-3">
            {ENJEUX.map((e, i) => (
              <article className={`card rv d${i}`} key={e.t}>
                <span className="card-ic"><Icon name={e.ic} /></span>
                <h3>{e.t}</h3>
                <p className="muted">{e.p}</p>
              </article>
            ))}
          </div>
          <div className="mt-m rv btn-row">
            <Link href="/entreprises" className="btn btn-navy">
              Découvrir l&apos;offre entreprises <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- La passerelle : la carte talent ---------- */}
      <section className="sec warm">
        <div className="inner two-col">
          <div className="rv">
            <p className="eyebrow">
              <b>06</b> L&apos;idée centrale
            </p>
            <h2 className="h-l">
              Votre profil devient <em>une carte talent.</em>
            </h2>
            <p className="lead mt-s">
              Un jeune coaché repart avec un CV solide, un pitch rodé et des compétences vérifiées. S&apos;il le souhaite,
              son profil est proposé aux entreprises qui recrutent.
            </p>
            <ul className="ticks mt-s">
              <li>
                <Icon name="shield" />
                <span><b>Rien sans votre accord :</b> votre profil n&apos;est jamais montré sans votre consentement explicite.</span>
              </li>
              <li>
                <Icon name="lock" />
                <span><b>Dossier confidentiel :</b> une entreprise ne voit jamais vos réponses au diagnostic.</span>
              </li>
            </ul>
          </div>
          <div className="pass-wrap rv d1">
            <div className="pass" data-tilt="">
              <div className="pass-main">
                <span className="pass-stamp">Vérifié</span>
                <p className="pass-k">Profil talent · exemple</p>
                <p className="pass-title">
                  Votre <em>profil</em>
                </p>
                <dl>
                  <div><dt>Objectif</dt><dd>Recherche d&apos;emploi</dd></div>
                  <div><dt>Pack</dt><dd>Standard</dd></div>
                  <div><dt>Livrables</dt><dd><Icon name="check" /> CV ATS, pitch</dd></div>
                  <div><dt>Tests</dt><dd><Icon name="check" /> Validés</dd></div>
                  <div><dt>Visibilité</dt><dd><Icon name="shield" /> Avec accord</dd></div>
                  <div><dt>Ville</dt><dd>Abidjan</dd></div>
                </dl>
              </div>
              <div className="pass-stub" aria-hidden="true">
                <span className="adm">Talent</span>
                <span className="bar" />
              </div>
            </div>
            <p className="pass-note">Exemple : à quoi ressemble un profil prêt à être présenté.</p>
          </div>
        </div>
      </section>

      {/* ---------- Témoignages (affichés seulement quand la cliente les aura fournis) ---------- */}
      {TESTIMONIALS.length > 0 && (
        <section className="sec">
          <div className="inner">
            <div className="sec-head rv">
              <p className="eyebrow">Ils en parlent</p>
              <h2 className="h-l">
                Des parcours <em>qui avancent.</em>
              </h2>
            </div>
            <div className="grid-3">
              {TESTIMONIALS.map((t) => (
                <figure className="quote rv" key={t.name} style={{ margin: 0 }}>
                  <q>{t.text}</q>
                  <p><b>{t.name}</b>, {t.role}</p>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title={<>Votre premier message <em>suffit.</em></>}
        lead="Écrivez à Cassandra sur WhatsApp : vous choisissez ensemble le pack adapté à votre objectif, et on démarre."
        secondary={{ href: "/coaching/inscription", label: "Remplir l'inscription" }}
      />
    </>
  );
}
