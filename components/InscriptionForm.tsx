"use client";

// Formulaire de souscription Coaching Express.
// Portage React de formulaire-coaching-express.html : mêmes champs, mêmes règles, même message WhatsApp.
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Icon from "./Icon";
import { PACKS, SITE, waLink, priceLabel, xof, type PackId } from "@/lib/site";

const SOURCES = ["WhatsApp / statut", "Réseaux sociaux", "Recommandation d'un proche", "Événement / atelier", "Autre"];
const OBJS = ["Recherche d'emploi", "CV & entretien", "Développement personnel", "Entrepreneuriat"];
const OPTIONS = [
  { id: "livre", v: "Livre « Aller au bout de son idée » (offert avec le pack Gold)", l: "Livre « Aller au bout de son idée » (offert avec le pack Gold)" },
  { id: "multi", v: "Paiement en plusieurs fois (à partir du pack Premium)", l: "Paiement en plusieurs fois (à partir du pack Premium)" },
  { id: "entre", v: "Pack Entrepreneur (sur devis)", l: "Pack Entrepreneur : structurer et lancer mon projet (sur devis)" },
  { id: "lead", v: "Pack Leadership (sur devis)", l: "Pack Leadership : développer ma posture de leader (sur devis)" },
  { id: "p1", v: "Parrainage : je viens de la part d'un proche", l: "Offre parrainage : je viens de la part d'un proche" },
  { id: "p2", v: "Parrainage : je souhaite parrainer un proche", l: "Offre parrainage : je souhaite parrainer un proche" },
];
const JOURS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const CRENEAUX = ["Matin (8h-12h)", "Après-midi (12h-17h)", "Soir (17h-21h)"];
const MODES = ["Mobile Money Orange", "Mobile Money MTN", "Mobile Money Moov", "Wave", "Espèces", "Virement bancaire", "Autre"];
const ENGAGEMENTS = [
  "J'ai pris connaissance de l'offre Coaching Express et du contenu du pack choisi.",
  "J'accepte que l'accompagnement se déroule 100 % à distance, sur WhatsApp et en visio.",
  "Je m'engage à répondre honnêtement au diagnostic et à fournir les documents demandés (CV, profil LinkedIn…).",
  "J'autorise Cassandra Touré à utiliser mes informations uniquement pour mon accompagnement ; elles restent confidentielles.",
  "Je comprends que les résultats dépendent aussi de mon implication et de ma mise en action.",
];

type Errors = Partial<Record<"nom" | "prenom" | "wa" | "obj" | "pack" | "eng" | "sig", string>>;

export default function InscriptionForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLElement>(null);
  const [packId, setPackId] = useState<PackId | "">("");
  const [source, setSource] = useState("");
  const [opts, setOpts] = useState<string[]>([]);
  const [mode, setMode] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState("");

  // Pack prérempli depuis /coaching/packs ou le test « Quel pack ? » (?pack=standard)
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("pack");
    if (q && PACKS.some((p) => p.id === q)) setPackId(q as PackId);
  }, []);

  const pack = PACKS.find((p) => p.id === packId);
  const visio = !!pack?.visio;
  const showParrain = opts.includes("p1") || opts.includes("p2");
  const showEcheances = opts.includes("multi");
  const nPay = visio ? 6 : 5;

  function toggleOpt(id: string, on: boolean) {
    setOpts((o) => (on ? [...o, id] : o.filter((x) => x !== id)));
  }

  function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const f = formRef.current!;
    const val = (name: string) => ((f.elements.namedItem(name) as HTMLInputElement | null)?.value ?? "").trim();
    const all = (name: string) =>
      Array.from(f.querySelectorAll<HTMLInputElement>(`input[name="${name}"]:checked`)).map((i) => i.value);

    const e: Errors = {};
    if (!val("nom")) e.nom = "Entrez votre nom.";
    if (!val("prenom")) e.prenom = "Entrez votre prénom.";
    if (!/\d{8,}/.test(val("wa").replace(/\D/g, ""))) e.wa = "Entrez un numéro WhatsApp valide, avec l'indicatif.";
    if (all("objectif").length === 0) e.obj = "Choisissez au moins un objectif.";
    if (!pack) e.pack = "Choisissez un pack.";
    if (f.querySelectorAll(".eng:not(:checked)").length > 0) e.eng = "Cochez tous les engagements pour continuer.";
    if (val("sig").length <= 2) e.sig = "Tapez votre nom complet pour signer.";
    setErrors(e);

    const firstKey = (["nom", "prenom", "wa", "obj", "pack", "eng", "sig"] as const).find((k) => e[k]);
    if (firstKey || !pack) {
      document.getElementById(`w-${firstKey}`)?.scrollIntoView({ block: "center", behavior: "smooth" });
      const input = document.getElementById(`w-${firstKey}`)?.querySelector<HTMLElement>("input");
      input?.focus({ preventScroll: true });
      return;
    }

    const L: string[] = [];
    L.push("Bonjour Cassandra, voici ma souscription Coaching Express.", "");
    L.push("1. COORDONNÉES");
    L.push("Nom : " + val("nom"));
    L.push("Prénom : " + val("prenom"));
    if (val("age")) L.push("Âge : " + val("age"));
    if (val("statut")) L.push("Profession / statut : " + val("statut"));
    if (val("ville")) L.push("Ville / pays : " + val("ville"));
    L.push("WhatsApp : " + val("wa"));
    if (val("email")) L.push("E-mail : " + val("email"));
    if (source) L.push("Connu via : " + (source === "Autre" && val("source-autre") ? val("source-autre") : source));
    L.push("", "2. OBJECTIF", all("objectif").join(", "));
    if (val("phrase")) L.push("En une phrase : " + val("phrase"));
    L.push("", "3. PACK", `${pack.name} (${priceLabel(pack)})`);
    const chosen = all("option");
    if (chosen.length) {
      L.push("", "4. OPTIONS");
      chosen.forEach((o) => L.push("- " + o));
      if (showParrain && val("parrain")) L.push("Parrain / filleul : " + val("parrain"));
      if (showEcheances && val("echeances")) L.push("Échéances souhaitées : " + val("echeances"));
    }
    if (visio) {
      const j = all("jour"), c = all("creneau");
      if (j.length || c.length || val("fuseau") || val("appareil")) {
        L.push("", "5. DISPONIBILITÉS");
        if (j.length) L.push("Jours : " + j.join(", "));
        if (c.length) L.push("Créneaux : " + c.join(", "));
        if (val("fuseau")) L.push("Fuseau / pays : " + val("fuseau"));
        if (val("appareil")) L.push("Appareil visio : " + val("appareil"));
      }
    }
    L.push("", "PAIEMENT");
    const m = mode === "Autre" && val("mode-autre") ? val("mode-autre") : mode;
    if (m) L.push("Mode souhaité : " + m);
    L.push("Montant : " + priceLabel(pack), "");
    L.push("Engagements acceptés. Signé : " + val("sig"));

    setMessage(L.join("\n"));
    setTimeout(() => resultRef.current?.scrollIntoView({ block: "start", behavior: "smooth" }), 50);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied("Message copié");
    } catch {
      setCopied("Sélectionnez le message ci-dessus pour le copier");
    }
    setTimeout(() => setCopied(""), 2400);
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <span className="error" role="alert">
        {errors[k]}
      </span>
    ) : null;

  return (
    <>
      <form ref={formRef} className="form" noValidate onSubmit={onSubmit}>
        <p className="hint">
          Les champs marqués <span className="req">*</span> sont obligatoires. Comptez 3 minutes.
        </p>

        {/* 1. Coordonnées */}
        <section className="form-sec">
          <h2><span className="n">1</span>Vos coordonnées</h2>
          <div className="fgrid">
            <div className={`field${errors.nom ? " bad" : ""}`} id="w-nom">
              <label htmlFor="nom">Nom<span className="req">*</span></label>
              <input type="text" id="nom" name="nom" autoComplete="family-name" aria-invalid={!!errors.nom} />
              {err("nom")}
            </div>
            <div className={`field${errors.prenom ? " bad" : ""}`} id="w-prenom">
              <label htmlFor="prenom">Prénom<span className="req">*</span></label>
              <input type="text" id="prenom" name="prenom" autoComplete="given-name" aria-invalid={!!errors.prenom} />
              {err("prenom")}
            </div>
            <div className="field">
              <label htmlFor="age">Âge</label>
              <input type="number" id="age" name="age" inputMode="numeric" min={14} max={99} />
            </div>
            <div className="field">
              <label htmlFor="statut">Profession / statut</label>
              <input type="text" id="statut" name="statut" placeholder="Étudiant, en recherche d'emploi…" />
            </div>
            <div className="field">
              <label htmlFor="ville">Ville / pays</label>
              <input type="text" id="ville" name="ville" autoComplete="address-level2" />
            </div>
            <div className={`field${errors.wa ? " bad" : ""}`} id="w-wa">
              <label htmlFor="wa">Numéro WhatsApp<span className="req">*</span></label>
              <input type="tel" id="wa" name="wa" inputMode="tel" autoComplete="tel" placeholder="+225 …" aria-invalid={!!errors.wa} />
              {err("wa")}
            </div>
            <div className="field full">
              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" name="email" autoComplete="email" />
            </div>
          </div>
          <fieldset className="mt-s">
            <legend>Comment avez-vous connu Coaching Express ?</legend>
            <div className="opts">
              {SOURCES.map((s) => (
                <label className="opt" key={s}>
                  <input type="radio" name="source" value={s} checked={source === s} onChange={() => setSource(s)} />
                  <span>{s}</span>
                </label>
              ))}
            </div>
            <div className="field mt-s" id="w-source-autre" hidden={source !== "Autre"}>
                <label htmlFor="source-autre">Précisez</label>
                <input type="text" id="source-autre" name="source-autre" />
              </div>
          </fieldset>
        </section>

        {/* 2. Objectif */}
        <section className="form-sec">
          <h2><span className="n">2</span>Votre objectif</h2>
          <fieldset id="w-obj">
            <legend>Pour quel(s) objectif(s) souhaitez-vous être accompagné(e) ?<span className="req">*</span></legend>
            <div className="opts">
              {OBJS.map((o) => (
                <label className="opt" key={o}>
                  <input type="checkbox" name="objectif" value={o} />
                  <span>{o}</span>
                </label>
              ))}
            </div>
            {err("obj")}
          </fieldset>
          <div className="field mt-s">
            <label htmlFor="phrase">Décrivez en une phrase ce que vous voulez atteindre</label>
            <textarea id="phrase" name="phrase" />
          </div>
        </section>

        {/* 3. Pack */}
        <section className="form-sec">
          <h2><span className="n">3</span>Votre pack</h2>
          <p className="hint">
            Choisissez un seul pack. Un doute ? <Link href="/coaching/packs#quel-pack">Faites le test</Link> ou demandez à
            Cassandra sur WhatsApp.
          </p>
          <fieldset id="w-pack">
            <legend className="sr">Pack<span className="req">*</span></legend>
            <div className="pick">
              {PACKS.map((p) => (
                <label key={p.id}>
                  <input type="radio" name="pack" value={p.id} checked={packId === p.id} onChange={() => setPackId(p.id)} />
                  <span className="box">
                    <span className="nm">{p.name}</span>
                    <span className="pr">{priceLabel(p)}</span>
                    <span className="ds">{p.short}</span>
                  </span>
                </label>
              ))}
            </div>
            {err("pack")}
          </fieldset>
          <p className="hint mt-s">
            Tous les packs commencent par le diagnostic approfondi, envoyé après votre inscription. Gold et VIP : prix par mois, sur 3 mois.
          </p>
        </section>

        {/* 4. Options */}
        <section className="form-sec">
          <h2><span className="n">4</span>Options et services complémentaires</h2>
          <p className="hint">Cochez ce qui vous intéresse.</p>
          <div className="checks mt-s">
            {OPTIONS.map((o) => (
              <label className="check" key={o.id}>
                <input type="checkbox" name="option" value={o.v} onChange={(e) => toggleOpt(o.id, e.target.checked)} />
                <span>{o.l}</span>
              </label>
            ))}
          </div>
          <div className="field mt-s" id="w-parrain" hidden={!showParrain}>
              <label htmlFor="parrain">Nom du parrain ou du filleul</label>
              <input type="text" id="parrain" name="parrain" />
            </div>
          <div className="field mt-s" id="w-echeances" hidden={!showEcheances}>
              <label htmlFor="echeances">Échéances souhaitées (paiement en plusieurs fois)</label>
              <input type="text" id="echeances" name="echeances" placeholder="Ex : moitié maintenant, moitié dans 2 semaines" />
            </div>
        </section>

        {/* 5. Disponibilités (packs avec visio) */}
        <section className="form-sec" id="s-dispo" hidden={!visio}>
            <h2><span className="n">5</span>Vos disponibilités</h2>
            <p className="hint">Pour les packs avec séances visio (Premium, Diamond, Gold, VIP).</p>
            <fieldset className="mt-s">
              <legend>Jours préférés</legend>
              <div className="opts">
                {JOURS.map((j) => (
                  <label className="opt" key={j}>
                    <input type="checkbox" name="jour" value={j} />
                    <span>{j}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className="mt-s">
              <legend>Créneaux préférés</legend>
              <div className="opts">
                {CRENEAUX.map((c) => (
                  <label className="opt" key={c}>
                    <input type="checkbox" name="creneau" value={c} />
                    <span>{c}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="fgrid mt-s">
              <div className="field">
                <label htmlFor="fuseau">Fuseau / pays</label>
                <input type="text" id="fuseau" name="fuseau" placeholder="Ex : Abidjan (GMT)" />
              </div>
              <div className="field">
                <label htmlFor="appareil">Appareil pour la visio</label>
                <input type="text" id="appareil" name="appareil" placeholder="Téléphone, ordinateur…" />
              </div>
            </div>
          </section>

        {/* Paiement */}
        <section className="form-sec">
          <h2><span className="n" id="n-pay">{nPay}</span>Paiement</h2>
          <p className="hint">
            Les coordonnées de paiement vous sont communiquées par Cassandra après validation de votre inscription. Vous lui
            enverrez ensuite la capture de votre paiement. <Link href="/paiement">En savoir plus</Link>
          </p>
          <div className="field mt-s">
            <label htmlFor="mode">Mode de paiement souhaité</label>
            <select id="mode" name="mode" value={mode} onChange={(e) => setMode(e.target.value)}>
              <option value="">Choisir</option>
              {MODES.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </div>
          <div className="field mt-s" id="w-mode-autre" hidden={mode !== "Autre"}>
              <label htmlFor="mode-autre">Précisez</label>
              <input type="text" id="mode-autre" name="mode-autre" />
            </div>
          <div className="total" aria-live="polite">
            <span>Montant à payer</span>
            <b id="montant">{pack ? priceLabel(pack) : "0\u00a0XOF"}</b>
          </div>
        </section>

        {/* Engagements */}
        <section className="form-sec">
          <h2><span className="n" id="n-eng">{nPay + 1}</span>Engagements</h2>
          <div className="checks mt-s" id="w-eng">
            {ENGAGEMENTS.map((t) => (
              <label className="check" key={t}>
                <input type="checkbox" className="eng" />
                <span>{t}</span>
              </label>
            ))}
          </div>
          {err("eng")}
          <p className="hint mt-s">
            Vos données sont traitées selon notre <Link href="/mentions-legales#donnees">politique de confidentialité</Link>.
          </p>
          <div className={`field mt-s${errors.sig ? " bad" : ""}`} id="w-sig">
            <label htmlFor="sig">Signature : tapez votre nom complet<span className="req">*</span></label>
            <input type="text" id="sig" name="sig" autoComplete="name" aria-invalid={!!errors.sig} />
            {err("sig")}
          </div>
        </section>

        <button type="submit" className="btn btn-gold btn-block">
          Préparer mon message WhatsApp <Icon name="arrow" />
        </button>
      </form>

      {message && (
        <section ref={resultRef} className="result mt-m" aria-live="polite">
          <h2 className="h-m">Dernière étape</h2>
          <p className="hint mt-s">
            Votre inscription n&apos;est pas encore envoyée. Appuyez sur le bouton vert : WhatsApp s&apos;ouvre avec votre
            message déjà écrit, il reste à l&apos;envoyer.
          </p>
          <pre>{message}</pre>
          <div style={{ display: "grid", gap: 10 }}>
            <a className="btn btn-wa btn-block" href={waLink(message)} target="_blank" rel="noopener">
              <Icon name="whatsapp" /> Ouvrir WhatsApp et envoyer
            </a>
            <button type="button" className="btn btn-ghost btn-block" onClick={copy}>
              <Icon name="copy" /> {copied || "Copier le message"}
            </button>
            <p className="hint">
              Si WhatsApp ne s&apos;ouvre pas, copiez le message et envoyez-le au <b>{SITE.phoneDisplay}</b>.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
