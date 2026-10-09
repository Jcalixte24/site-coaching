import Link from "next/link";
import { Brand } from "./Header";
import { SITE, waLink } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="foot">
      <div className="inner">
        <div className="fin">
          <p>Votre talent, visible.</p>
          <p>Coaching · Recrutement · Abidjan</p>
        </div>
        <div className="foot-grid">
          <div>
            <Link href="/" className="brand">
              <Brand />
            </Link>
            <p>Coaching de jeunes talents et recrutement de stagiaires qualifiés, depuis Abidjan.</p>
          </div>
          <div>
            <h2>Jeunes</h2>
            <ul>
              <li><Link href="/coaching">Coaching Express</Link></li>
              <li><Link href="/coaching/packs">Les 7 packs</Link></li>
              <li><Link href="/coaching/inscription">S&apos;inscrire</Link></li>
              <li><Link href="/paiement">Comment payer</Link></li>
            </ul>
          </div>
          <div>
            <h2>Entreprises</h2>
            <ul>
              <li><Link href="/entreprises">Acquisition de talents</Link></li>
              <li><Link href="/entreprises/demande">Demande de recrutement</Link></li>
              <li><Link href="/a-propos">À propos</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h2>Contact</h2>
            <ul>
              <li><a href={waLink()} target="_blank" rel="noopener">WhatsApp {SITE.phoneDisplay}</a></li>
              <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><Link href="/contact">{SITE.city}</Link></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} Cassandra Touré</span>
          <Link href="/mentions-legales">Mentions légales et confidentialité</Link>
        </div>
      </div>
    </footer>
  );
}
