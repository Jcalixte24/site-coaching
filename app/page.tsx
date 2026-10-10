import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { SITE, waLink } from "@/lib/site";

// Portail : pas de bavardage, deux portes. On choisit qui l'on est, on entre dans son univers.
// Le logo s'affiche tout de suite en SVG animé ; s'il le peut (WebGL, bonne connexion, mouvement autorisé),
// portal.js le remplace par sa version 3D en or et argent, et l'anneau devient la porte d'entrée.
const LOGO = fs.readFileSync(path.join(process.cwd(), "public", "logo.svg"), "utf8");
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Portail() {
  return (
    <section className="portal" aria-labelledby="qui">
      <div className="portal-head inner">
        <p className="eyebrow rise">Cassandra Touré · Talents &amp; Coaching · Abidjan</p>
        <h1 id="qui" className="rise d1">
          Qui êtes-<em>vous</em> ?
        </h1>
      </div>

      <div className="portal-mid inner">
        <div className="portal-stage" aria-hidden="true">
          <div className="pin-svg" dangerouslySetInnerHTML={{ __html: LOGO }} />
          <canvas id="pin3d" suppressHydrationWarning />
          <span className="pin-shadow" />
        </div>
        <div className="portal-choices">
          <Link href="/coaching" className="choice choice-c rise d2" data-side="-1">
            <span className="k">Espace candidat</span>
            <b>Je cherche un emploi</b>
            <span>Coaching personnalisé : CV, entretien, plan d&apos;action, 100 % WhatsApp.</span>
            <span className="go">
              Entrer <i />
            </span>
          </Link>
          <Link href="/entreprises" className="choice choice-e rise d3" data-side="1">
            <span className="k">Espace employeur</span>
            <b>Je recrute</b>
            <span>Stagiaires et jeunes talents qualifiés, recrutés et intégrés pour vous.</span>
            <span className="go">
              Entrer <i />
            </span>
          </Link>
        </div>
      </div>

      <div className="portal-foot inner">
        <a href={waLink()} target="_blank" rel="noopener">WhatsApp {SITE.phoneDisplay}</a>
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        <Link href="/a-propos">À propos</Link>
      </div>
      <div id="portal-fade" aria-hidden="true" />
      <script type="module" src={`${BASE}/portal.js`} data-keep="" />
    </section>
  );
}
