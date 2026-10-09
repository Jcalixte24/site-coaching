"use client";

// Demande de recrutement (entreprises), avec estimation en direct.
// Phase actuelle : la demande part en message WhatsApp prérempli (texte court, sous la limite wa.me).
// Étape 5 du plan : enregistrement dans Supabase (table demandes_recrutement) + notification courte.
import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import Icon from "./Icon";
import { SITE, TALENT, waLink, xof } from "@/lib/site";

type Errors = Partial<Record<"entreprise" | "nom" | "tel" | "poste" | "nb" | "consent", string>>;

export default function DemandeForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLElement>(null);
  const [nb, setNb] = useState(1);
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState("");

  const estimate = Math.max(0, nb) * TALENT.newClientPrice;

  function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const f = formRef.current!;
    const val = (n: string) => ((f.elements.namedItem(n) as HTMLInputElement | null)?.value ?? "").trim();
    const consent = (f.elements.namedItem("consent") as HTMLInputElement).checked;

    const e: Errors = {};
    if (!val("entreprise")) e.entreprise = "Entrez le nom de l'entreprise.";
    if (!val("nom")) e.nom = "Entrez le nom du contact.";
    if (!/\d{8,}/.test(val("tel").replace(/\D/g, ""))) e.tel = "Entrez un numéro valide, avec l'indicatif.";
    if (!val("poste")) e.poste = "Indiquez le poste à pourvoir.";
    if (!(nb >= 1)) e.nb = "Indiquez au moins 1 profil.";
    if (!consent) e.consent = "Cochez la case pour continuer.";
    setErrors(e);
    const first = (["entreprise", "nom", "tel", "poste", "nb", "consent"] as const).find((k) => e[k]);
    if (first) {
      const w = document.getElementById(`d-${first}`);
      w?.scrollIntoView({ block: "center", behavior: "smooth" });
      w?.querySelector<HTMLElement>("input")?.focus({ preventScroll: true });
      return;
    }

    const L = ["Bonjour Cassandra, voici une demande de recrutement.", ""];
    L.push("ENTREPRISE : " + val("entreprise") + (val("secteur") ? ` (${val("secteur")})` : ""));
    L.push("Contact : " + val("nom") + (val("fonction") ? `, ${val("fonction")}` : ""));
    L.push("Téléphone : " + val("tel"));
    if (val("email")) L.push("E-mail : " + val("email"));
    L.push("", "POSTE : " + val("poste"));
    if (val("missions")) L.push("Missions : " + val("missions"));
    if (val("prerequis")) L.push("Prérequis : " + val("prerequis"));
    L.push("Nombre de profils : " + nb);
    if (val("debut")) L.push("Début souhaité : " + new Date(val("debut")).toLocaleDateString("fr-FR"));
    if (val("budget")) L.push("Budget : " + val("budget"));
    L.push("Estimation : " + xof(estimate) + " HT (tarif nouveau client)");
    if (val("remarque")) L.push("", "Remarque : " + val("remarque"));

    setMessage(L.join("\n"));
    setTimeout(() => resultRef.current?.scrollIntoView({ block: "start", behavior: "smooth" }), 50);
  }

  const err = (k: keyof Errors) =>
    errors[k] ? <span className="error" role="alert">{errors[k]}</span> : null;
  const cls = (k: keyof Errors, extra = "") => `field${extra}${errors[k] ? " bad" : ""}`;

  return (
    <>
      <form ref={formRef} className="form" noValidate onSubmit={onSubmit}>
        <p className="hint">
          Les champs marqués <span className="req">*</span> sont obligatoires.
        </p>

        <section className="form-sec">
          <h2><span className="n">1</span>Votre entreprise</h2>
          <div className="fgrid mt-s">
            <div className={cls("entreprise")} id="d-entreprise">
              <label htmlFor="entreprise">Entreprise<span className="req">*</span></label>
              <input type="text" id="entreprise" name="entreprise" autoComplete="organization" />
              {err("entreprise")}
            </div>
            <div className="field">
              <label htmlFor="secteur">Secteur</label>
              <input type="text" id="secteur" name="secteur" placeholder="Distribution, services…" />
            </div>
            <div className={cls("nom")} id="d-nom">
              <label htmlFor="nom">Nom du contact<span className="req">*</span></label>
              <input type="text" id="nom" name="nom" autoComplete="name" />
              {err("nom")}
            </div>
            <div className="field">
              <label htmlFor="fonction">Fonction</label>
              <input type="text" id="fonction" name="fonction" autoComplete="organization-title" placeholder="DRH, manager…" />
            </div>
            <div className={cls("tel")} id="d-tel">
              <label htmlFor="tel">Téléphone<span className="req">*</span></label>
              <input type="tel" id="tel" name="tel" inputMode="tel" autoComplete="tel" placeholder="+225 …" />
              {err("tel")}
            </div>
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" name="email" autoComplete="email" />
            </div>
          </div>
        </section>

        <section className="form-sec">
          <h2><span className="n">2</span>Le poste</h2>
          <div className="fgrid mt-s">
            <div className={cls("poste", " full")} id="d-poste">
              <label htmlFor="poste">Poste à pourvoir<span className="req">*</span></label>
              <input type="text" id="poste" name="poste" placeholder="Stagiaire marketing, commercial…" />
              {err("poste")}
            </div>
            <div className="field full">
              <label htmlFor="missions">Missions principales</label>
              <textarea id="missions" name="missions" />
            </div>
            <div className="field full">
              <label htmlFor="prerequis">Prérequis (formation, compétences, outils)</label>
              <textarea id="prerequis" name="prerequis" />
            </div>
            <div className={cls("nb")} id="d-nb">
              <label htmlFor="nb">Nombre de profils<span className="req">*</span></label>
              <input
                type="number"
                id="nb"
                name="nb"
                inputMode="numeric"
                min={1}
                max={50}
                value={Number.isNaN(nb) ? "" : nb}
                onChange={(e) => setNb(parseInt(e.target.value, 10))}
              />
              {err("nb")}
            </div>
            <div className="field">
              <label htmlFor="debut">Date de début souhaitée</label>
              <input type="date" id="debut" name="debut" />
            </div>
            <div className="field full">
              <label htmlFor="budget">Budget prévu</label>
              <input type="text" id="budget" name="budget" placeholder="Facultatif" />
            </div>
            <div className="field full">
              <label htmlFor="remarque">Remarque</label>
              <textarea id="remarque" name="remarque" />
            </div>
          </div>
          <div className="total" aria-live="polite">
            <span>
              Estimation · {nb >= 1 ? nb : 0} × {xof(TALENT.newClientPrice)} HT
            </span>
            <b>{xof(estimate)} HT</b>
          </div>
          <p className="hint mt-s">
            Tarif nouveau client (−{TALENT.discount} % sur {xof(TALENT.price)} HT par profil). Paiement en 3 fois : 30 % /
            40 % / 30 %. Modules à la carte sur devis.
          </p>
        </section>

        <div className={cls("consent")} id="d-consent">
          <label className="check">
            <input type="checkbox" name="consent" />
            <span>
              J&apos;accepte que ces informations soient utilisées pour traiter ma demande, selon la{" "}
              <Link href="/mentions-legales#donnees">politique de confidentialité</Link>.
            </span>
          </label>
          {err("consent")}
        </div>

        <button type="submit" className="btn btn-gold btn-block">
          Préparer ma demande <Icon name="arrow" />
        </button>
      </form>

      {message && (
        <section ref={resultRef} className="result mt-m" aria-live="polite">
          <h2 className="h-m">Dernière étape</h2>
          <p className="hint mt-s">Envoyez votre demande à Cassandra : elle vous recontacte pour un point de cadrage.</p>
          <pre>{message}</pre>
          <div style={{ display: "grid", gap: 10 }}>
            <a className="btn btn-wa btn-block" href={waLink(message)} target="_blank" rel="noopener">
              <Icon name="whatsapp" /> Envoyer sur WhatsApp
            </a>
            <a
              className="btn btn-ghost btn-block"
              href={`mailto:${SITE.email}?subject=${encodeURIComponent("Demande de recrutement")}&body=${encodeURIComponent(message)}`}
            >
              <Icon name="mail" /> Envoyer par e-mail
            </a>
          </div>
        </section>
      )}
    </>
  );
}
