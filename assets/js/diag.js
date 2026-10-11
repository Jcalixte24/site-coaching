// Cassandra Touré · questionnaire « Diagnostic approfondi » en ligne (page à lien privé, envoyée après le paiement).
// Les réponses sont enregistrées sur l'appareil pendant la saisie, puis envoyées à Cassandra par WhatsApp (message numéroté comme le PDF).
(function () {
  "use strict";
  var NUM = "2250719509526", KEY = "ct-diag-v1";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };

  var SCALE_CT = ["Communication orale et écrite", "Travail en équipe", "Organisation et gestion du temps", "Résolution de problèmes", "Leadership / capacité à entraîner les autres", "Adaptabilité et apprentissage rapide", "Gestion du stress et de la pression", "Créativité et esprit d'initiative"];
  var SCALE_OUT = ["Mon CV passe les filtres ATS et attire l'œil des recruteurs", "Je rédige des lettres de motivation personnalisées et percutantes", "Mon profil LinkedIn attire des recruteurs / clients", "Je me présente avec impact en 30 secondes (pitch)", "Je structure mes réponses avec la méthode STAR", "Je me suis déjà entraîné(e) en simulation avec un retour d'expert", "Je dispose d'une feuille de route avec des jalons précis", "Je sais comment développer mon réseau de façon ciblée", "Mon projet est cadré (problème, cible, offre, business model)"];
  var SCALE_ENT = ["Je me présente clairement (« Parlez-moi de vous »)", "Je valorise mes réalisations avec des exemples concrets", "Je gère bien mon stress le jour J", "Je sais répondre à « Quels sont vos défauts ? »", "Je sais parler de mes prétentions salariales", "Je pose des questions pertinentes au recruteur"];
  var VALEURS = ["Autonomie", "Sécurité / stabilité", "Réussite / ambition", "Équilibre vie pro-perso", "Impact / utilité sociale", "Apprentissage", "Créativité", "Reconnaissance", "Indépendance financière", "Honnêteté / intégrité", "Esprit d'équipe", "Liberté / flexibilité"];

  // t = ligne courte · a = zone de texte · c = cases (plusieurs) · r = un seul choix · s = échelle 1-5 · g = groupe de lignes courtes
  var PARTS = [
    { n: 1, t: "Votre profil et votre situation", q: [
      { id: "1.0", t: "g", l: "Vos coordonnées", f: ["Nom et prénom", "Âge", "Ville / pays", "Numéro WhatsApp", "E-mail", "Pack choisi"] },
      { id: "1.1", t: "c", l: "Votre situation actuelle", o: ["Étudiant(e)", "Jeune diplômé(e)", "Salarié(e)", "En recherche d'emploi", "Indépendant(e) / entrepreneur", "En reconversion"], other: 1 },
      { id: "1.2", t: "a", l: "Formation : diplômes, établissements, années" },
      { id: "1.3", t: "a", l: "Outils et logiciels maîtrisés (Word, Excel, outils métier, réseaux sociaux…)" } ] },
    { n: 2, t: "Vos compétences", q: [
      { id: "2.1", t: "a", l: "Ce que vous savez faire concrètement" },
      { id: "2.2", t: "s", l: "Évaluez-vous honnêtement (1 = pas du tout · 5 = tout à fait)", rows: SCALE_CT },
      { id: "2.3", t: "a", l: "Réalisation 1 : contexte · ce que vous avez fait · résultat obtenu" },
      { id: "2.4", t: "a", l: "Réalisation 2" },
      { id: "2.5", t: "a", l: "Réalisation 3 (facultatif)" },
      { id: "2.6", t: "a", l: "Les compétences que vous aimeriez développer ou qui vous manquent pour votre objectif" } ] },
    { n: 3, t: "Vos valeurs et vos motivations", q: [
      { id: "3.1", t: "c", l: "Choisissez vos 5 valeurs les plus importantes", o: VALEURS, other: 1, max: 5 },
      { id: "3.2", t: "a", l: "Qu'est-ce qui vous motive le plus dans votre travail ou vos projets ?" },
      { id: "3.3", t: "a", l: "Qu'est-ce qui vous démotive ou vous épuise ?" },
      { id: "3.4", t: "a", l: "Décrivez votre environnement de travail idéal (équipe, rythme, culture, lieu)" },
      { id: "3.5", t: "a", l: "Où vous voyez-vous dans 3 à 5 ans ?" } ] },
    { n: 4, t: "Forces, axes de progression et regard des autres", q: [
      { id: "4.1", t: "a", l: "Vos 3 principales forces" },
      { id: "4.2", t: "a", l: "Vos 3 principaux axes de progression" },
      { id: "4.3", t: "a", l: "Demandez à 2 ou 3 proches ou collègues : « Quelles sont mes 3 qualités principales et que devrais-je améliorer ? » Notez leurs réponses." },
      { id: "4.4", t: "a", l: "Un retour (positif ou négatif) qui vous a marqué récemment, et ce que vous en avez retenu" },
      { id: "4.5", t: "r", l: "Savez-vous précisément ce qui vous différencie des autres candidats / concurrents ?", o: ["Oui, je peux le dire en une phrase", "Vaguement", "Non"] },
      { id: "4.6", t: "a", l: "Votre valeur ajoutée à un recruteur ou à un client, en 2 phrases" } ] },
    { n: 5, t: "Votre objectif et votre contexte", q: [
      { id: "5.1", t: "r", l: "Votre objectif principal", o: ["Recherche d'emploi", "CV & entretien", "Développement personnel", "Entrepreneuriat", "Leadership (sur devis)"], goal: 1 },
      { id: "5.2", t: "a", l: "Formulez votre objectif de façon précise : quoi, combien, pour quand ?", h: "Exemple : « Décrocher 3 entretiens et un CDI en gestion de projet d'ici 4 mois »" },
      { id: "5.3", t: "a", l: "Comment saurez-vous que vous avez réussi ? (indicateurs concrets)" },
      { id: "5.4", t: "r", l: "Depuis combien de temps êtes-vous dans cette situation (sans avoir atteint votre objectif) ?", o: ["Moins de 3 mois", "3 à 6 mois", "6 à 12 mois", "1 à 2 ans", "Plus de 2 ans"] },
      { id: "5.5", t: "a", l: "Selon vous, pourquoi n'avez-vous pas encore atteint votre objectif ?" },
      { id: "5.6", t: "a", l: "Selon vous, qu'est-ce qui vous freine le plus aujourd'hui ?", h: "Manque de temps, de méthode, de confiance, de réseau, de moyens, d'informations… dites-le avec vos mots." },
      { id: "5.7", t: "a", l: "Les 3 principaux obstacles qui vous séparent de cet objectif" },
      { id: "5.8", t: "c", l: "Ce qui vous freine le plus", o: ["J'envoie des CV et personne ne répond", "Je ne sais pas me vendre en entretien", "J'ai une idée mais ne sais pas par où commencer", "Je n'ai pas de réseau", "Manque de confiance en moi", "Manque de temps ou d'organisation", "Ma motivation retombe vite", "Manque de moyens financiers"], other: 1 },
      { id: "5.9", t: "a", l: "Ce que vous avez déjà essayé et les résultats obtenus" },
      { id: "5.10", t: "a", l: "Vos atouts et ressources (compétences, contacts, économies, soutien de l'entourage…)" },
      { id: "5.11", t: "r", l: "Avez-vous un plan d'action écrit, avec des étapes et des dates ?", o: ["Oui, détaillé", "Oui, mais flou", "Non, tout est dans ma tête", "Non, aucun plan"] },
      { id: "5.12", t: "a", l: "Combien d'heures par semaine consacrez-vous réellement à votre objectif ? Que faites-vous concrètement ?" },
      { id: "5.13", t: "r", l: "Mesurez-vous vos progrès (candidatures, réponses, clients, étapes franchies) ?", o: ["Oui, régulièrement", "De temps en temps", "Non"] },
      { id: "5.14", t: "r", l: "Votre CV, votre profil ou votre dossier a-t-il déjà été relu par un professionnel ?", o: ["Oui", "Par un proche seulement", "Jamais"] },
      { id: "5.15", t: "r", l: "Avez-vous déjà été accompagné(e) (coach, mentor, formation, bilan de compétences) ?", o: ["Non, jamais", "Oui, et cela m'a aidé", "Oui, mais cela n'a pas suffi"] },
      { id: "5.16", t: "s", l: "Votre maîtrise des outils clés (1 = pas du tout · 5 = maîtrisé)", rows: SCALE_OUT, h: "Laissez vide les lignes qui ne vous concernent pas." },
      { id: "5.17", t: "c", l: "Domaines les plus urgents à travailler (3 maximum)", o: ["Clarté de mon objectif", "CV / dossier", "Profil LinkedIn", "Pitch de présentation", "Préparation aux entretiens", "Réseau et visibilité", "Confiance en moi", "Organisation et régularité", "Business model / projet", "Leadership / posture"], max: 3 },
      { id: "5.18", t: "a", l: "Si rien ne change dans les 6 prochains mois, quelles en seraient les conséquences pour vous ?", h: "Financières, professionnelles, personnelles, sur le moral…" },
      { id: "5.19", t: "a", l: "Si vous aviez un coach à vos côtés, sur quoi aimeriez-vous être aidé(e) en priorité ?" },
      { id: "5.20", t: "a", l: "Qu'êtes-vous prêt(e) à changer ou à faire différemment pour atteindre votre objectif ?" } ] },
    { n: 6, t: "Module selon votre objectif", intro: "Remplissez uniquement le module qui correspond à votre objectif (celui de la question 5.1 s'ouvre tout seul). Laissez les autres vides.", mods: [
      { k: "A", t: "Recherche d'emploi", goal: "Recherche d'emploi", q: [
        { id: "6.1", t: "a", l: "Poste(s), secteur(s) et type(s) d'entreprise visés" },
        { id: "6.2", t: "c", l: "Type de contrat recherché", o: ["CDI", "CDD", "Stage / alternance", "Freelance / mission", "Peu importe"] },
        { id: "6.3", t: "c", l: "Mobilité", o: ["Abidjan uniquement", "Côte d'Ivoire", "Sous-région", "International"] },
        { id: "6.3b", t: "g", l: "Votre recherche en chiffres", f: ["Durée de recherche", "Candidatures / mois", "Réponses reçues", "Entretiens obtenus"] },
        { id: "6.4", t: "c", l: "Canaux utilisés", o: ["LinkedIn", "Sites d'emploi", "Candidatures spontanées", "Réseau / cooptation", "Cabinets de recrutement", "Groupes WhatsApp / Facebook"], other: 1 },
        { id: "6.5", t: "c", l: "État de vos supports (cochez ce que vous avez déjà)", o: ["CV à jour", "CV adapté à chaque offre", "Lettre de motivation type", "Profil LinkedIn complet", "Pitch de 30 secondes", "Je connais les filtres ATS"] },
        { id: "6.6", t: "a", l: "Une offre d'emploi qui vous intéresse (lien ou intitulé). Pourquoi ce poste ?" } ] },
      { k: "B", t: "CV & entretien", goal: "CV & entretien", q: [
        { id: "6.7", t: "a", l: "Combien d'entretiens avez-vous passés ces 12 derniers mois ? Quels retours avez-vous reçus ?" },
        { id: "6.8", t: "a", l: "Les questions d'entretien qui vous mettent le plus en difficulté" },
        { id: "6.9", t: "s", l: "Aisance en entretien (1 = pas du tout · 5 = tout à fait)", rows: SCALE_ENT },
        { id: "6.10", t: "r", l: "Connaissez-vous la méthode STAR (Situation, Tâche, Action, Résultat) ?", o: ["Oui, je l'utilise", "Je connais de nom", "Non"] } ] },
      { k: "C", t: "Développement personnel", goal: "Développement personnel", q: [
        { id: "6.11", t: "c", l: "Domaines à développer", o: ["Confiance en soi", "Gestion du stress", "Organisation / productivité", "Prise de parole", "Clarté sur mon projet de vie", "Habitudes et discipline", "Gestion des émotions", "Équilibre vie pro-perso"], other: 1 },
        { id: "6.12", t: "a", l: "Une situation récente où vous avez manqué de confiance. Que s'est-il passé ?" },
        { id: "6.13", t: "a", l: "Les pensées ou croyances qui vous freinent (« je ne suis pas capable de… »)" },
        { id: "6.14", t: "a", l: "Votre routine actuelle (réveil, travail, sport, repos) et les habitudes que vous voulez installer" },
        { id: "6.15", t: "a", l: "Vos 3 objectifs personnels pour les 3 prochains mois" } ] },
      { k: "D", t: "Entrepreneuriat", goal: "Entrepreneuriat", q: [
        { id: "6.16", t: "a", l: "Décrivez votre idée ou votre projet en quelques lignes" },
        { id: "6.17", t: "a", l: "Quel problème résolvez-vous ? Pour quelle cible précise ?" },
        { id: "6.18", t: "a", l: "Votre offre (produit / service) : pourquoi les clients vous choisiraient-ils ?" },
        { id: "6.19", t: "r", l: "Stade d'avancement", o: ["Simple idée", "Étude / recherche en cours", "Prototype / test", "Premiers clients", "Activité lancée"] },
        { id: "6.19b", t: "g", l: "Votre projet en détail", f: ["Concurrents connus", "Budget disponible", "Équipe / associés", "Premier client visé"] },
        { id: "6.20", t: "a", l: "Vos plus grandes peurs ou doutes par rapport à ce projet" } ] },
      { k: "E", t: "Leadership (sur devis)", goal: "Leadership (sur devis)", q: [
        { id: "6.21", t: "a", l: "Rôle de leader actuel ou visé (équipe, taille, secteur)" },
        { id: "6.22", t: "a", l: "Une situation de management ou de leadership qui vous a posé difficulté" },
        { id: "6.23", t: "a", l: "Le style de leader que vous voulez incarner et l'impact souhaité" } ] } ] },
    { n: 7, t: "Réseau et visibilité", intro: "Particulièrement utile pour le parcours VIP (cartographie des cibles et plan de réseautage), utile à tous.", q: [
      { id: "7.1", t: "r", l: "Votre réseau professionnel actuel", o: ["Très limité", "Quelques contacts utiles", "Réseau solide dans mon secteur"] },
      { id: "7.1b", t: "g", l: "Vos réseaux", f: ["Lien de votre profil LinkedIn", "Nombre de relations / abonnés", "Autres réseaux utilisés"] },
      { id: "7.2", t: "a", l: "Entreprises, recruteurs ou partenaires que vous aimeriez approcher (citez-en 5 à 10)" },
      { id: "7.3", t: "a", l: "Personnes de votre entourage qui pourraient vous mettre en relation" },
      { id: "7.4", t: "c", l: "À l'aise pour…", o: ["Écrire à un inconnu sur LinkedIn", "Demander une recommandation", "Participer à des événements pros", "Publier du contenu"] } ] },
    { n: 8, t: "Disponibilité et mode d'accompagnement", q: [
      { id: "8.0", t: "g", l: "Vos disponibilités", f: ["Heures / semaine", "Jours préférés", "Créneaux préférés", "Appareil utilisé"] },
      { id: "8.1", t: "r", l: "Vous préférez échanger par", o: ["Messages écrits", "Messages vocaux", "Appels / visio", "Mix des trois"] },
      { id: "8.2", t: "r", l: "Connexion pour les séances en visio", o: ["Très bonne", "Moyenne (coupures)", "Données mobiles seulement"] },
      { id: "8.3", t: "a", l: "Y a-t-il des contraintes dont je dois tenir compte (horaires, famille, santé, budget…) ?" } ] },
    { n: 9, t: "Vos attentes et votre engagement", q: [
      { id: "9.1", t: "a", l: "Qu'attendez-vous de votre coach ? Qu'attendez-vous de vous-même ?" },
      { id: "9.2", t: "g", l: "Votre engagement", f: ["Niveau d'engagement de 1 à 10", "Pourquoi ce chiffre ?"] },
      { id: "9.3", t: "a", l: "Y a-t-il autre chose que vous souhaitez me dire ?" } ] }
  ];

  var root = $("#diag-root");
  if (!root) return;

  function fieldHtml(q) {
    var id = q.id, h = q.h ? '<p class="hint">' + esc(q.h) + "</p>" : "", head;
    var lab = '<span class="dq-n">' + esc(q.id.replace(/[a-z]$/, "").replace(/\.0$/, "")) + "</span> " + esc(q.l);
    if (q.t === "g") {
      return '<fieldset class="dq" data-id="' + id + '"><legend>' + esc(q.l) + '</legend><div class="dq-grid">' + q.f.map(function (f, i) {
        return '<label class="field"><span>' + esc(f) + '</span><input type="text" data-k="' + id + "." + i + '" data-l="' + esc(f) + '" autocomplete="off"></label>';
      }).join("") + "</div></fieldset>";
    }
    if (q.t === "a") return '<div class="dq field"><label for="f' + id + '">' + lab + "</label>" + h + '<textarea id="f' + id + '" rows="3" data-k="' + id + '" data-l="' + esc(q.l) + '"></textarea></div>';
    if (q.t === "c" || q.t === "r") {
      var type = q.t === "c" ? "checkbox" : "radio";
      var opts = q.o.map(function (o) {
        return '<label class="opt-m"><input type="' + type + '" name="q' + id + '" value="' + esc(o) + '"' + (q.goal ? ' data-goal="1"' : "") + "><span>" + esc(o) + "</span></label>";
      }).join("");
      if (q.other) opts += '<label class="field dq-other"><span>Autre :</span><input type="text" data-other="' + id + '" autocomplete="off"></label>';
      return '<fieldset class="dq" data-id="' + id + '"' + (q.max ? ' data-max="' + q.max + '"' : "") + '><legend>' + lab + (q.max ? " <small>(" + q.max + " maximum)</small>" : "") + "</legend>" + h + '<div class="dq-opts">' + opts + "</div></fieldset>";
    }
    if (q.t === "s") {
      var th = '<tr><th></th>' + [1, 2, 3, 4, 5].map(function (n) { return "<th>" + n + "</th>"; }).join("") + "</tr>";
      var rows = q.rows.map(function (r, i) {
        return "<tr><td>" + esc(r) + "</td>" + [1, 2, 3, 4, 5].map(function (n) {
          return '<td><input type="radio" name="q' + id + "." + i + '" value="' + n + '" aria-label="' + esc(r) + " : " + n + '"></td>';
        }).join("") + "</tr>";
      }).join("");
      return '<fieldset class="dq" data-id="' + id + '" data-scale="1"><legend>' + lab + "</legend>" + h + '<div class="dq-scale"><table>' + th + rows + "</table></div></fieldset>";
    }
    return "";
  }

  var html = "";
  PARTS.forEach(function (p) {
    html += '<section class="dpart" id="p' + p.n + '"><h2 class="dpart-h"><span class="step-n">' + String(p.n).padStart(2, "0") + "</span>" + esc(p.t) + "</h2>";
    if (p.intro) html += '<p class="hint">' + esc(p.intro) + "</p>";
    if (p.mods) {
      p.mods.forEach(function (m) {
        html += '<details class="dmod" data-goal="' + esc(m.goal) + '"><summary>' + m.k + " · " + esc(m.t) + "</summary>" + m.q.map(fieldHtml).join("") + "</details>";
      });
    } else html += p.q.map(fieldHtml).join("");
    html += "</section>";
  });
  root.innerHTML = html;

  // ---- progression et enregistrement sur l'appareil ----
  var bar = $("#diag-bar"), saved = $("#diag-saved");
  function collect() {
    var d = {};
    root.querySelectorAll("[data-k]").forEach(function (el) { if (el.value.trim()) d[el.getAttribute("data-k")] = el.value; });
    root.querySelectorAll("[data-other]").forEach(function (el) { if (el.value.trim()) d["o" + el.getAttribute("data-other")] = el.value; });
    root.querySelectorAll("input[type=checkbox]:checked, input[type=radio]:checked").forEach(function (el) {
      (d["c:" + el.name] = d["c:" + el.name] || []).push(el.value);
    });
    return d;
  }
  function progress() {
    var d = collect(), done = {};
    Object.keys(d).forEach(function (k) { done[k.replace(/^[co]:?/, "").replace(/^q/, "").split(".").slice(0, 2).join(".")] = 1; });
    var n = Object.keys(done).length;
    var pct = Math.min(100, Math.round((n / 55) * 100));
    if (bar) { bar.style.width = pct + "%"; bar.parentNode.setAttribute("aria-valuenow", pct); }
    var lab = $("#diag-pct");
    if (lab) lab.textContent = n ? pct + " %" : "0 %";
  }
  var t;
  function save() {
    progress();
    clearTimeout(t);
    t = setTimeout(function () {
      try { localStorage.setItem(KEY, JSON.stringify(collect())); if (saved) saved.textContent = "Enregistré sur cet appareil"; } catch (e) {}
    }, 400);
  }
  function restore() {
    var d = {};
    try { d = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) {}
    root.querySelectorAll("[data-k]").forEach(function (el) { if (d[el.getAttribute("data-k")]) el.value = d[el.getAttribute("data-k")]; });
    root.querySelectorAll("[data-other]").forEach(function (el) { if (d["o" + el.getAttribute("data-other")]) el.value = d["o" + el.getAttribute("data-other")]; });
    root.querySelectorAll("input[type=checkbox], input[type=radio]").forEach(function (el) {
      var v = d["c:" + el.name]; if (v && v.indexOf(el.value) >= 0) el.checked = true;
    });
    if (Object.keys(d).length && saved) saved.textContent = "Vos réponses précédentes ont été retrouvées";
  }
  restore();
  function openGoalModule() {
    var g = root.querySelector('input[data-goal="1"]:checked');
    root.querySelectorAll(".dmod").forEach(function (m) { if (g && m.getAttribute("data-goal") === g.value) m.open = true; });
  }
  openGoalModule(); progress();
  root.addEventListener("input", save);
  root.addEventListener("change", function (e) {
    var fs = e.target.closest("fieldset[data-max]");
    if (fs && e.target.type === "checkbox" && fs.querySelectorAll("input:checked").length > +fs.getAttribute("data-max")) { e.target.checked = false; }
    if (e.target.getAttribute("data-goal")) openGoalModule();
    save();
  });

  // ---- message final ----
  function build() {
    var L = ["DIAGNOSTIC APPROFONDI", ""], d = collect(), any = 0;
    PARTS.forEach(function (p) {
      var lines = [];
      var qs = p.mods ? p.mods.reduce(function (a, m) { return a.concat(m.q); }, []) : p.q;
      qs.forEach(function (q) {
        var nm = q.id.replace(/[a-z]$/, "");
        if (q.t === "g") {
          q.f.forEach(function (f, i) { var v = d[q.id + "." + i]; if (v) lines.push((q.id.replace(/\.0$/, "").replace(/[a-z]$/, "") + " " + f + " : " + v.trim())); });
        } else if (q.t === "a") { if (d[q.id]) lines.push(nm + " : " + d[q.id].trim()); }
        else if (q.t === "c" || q.t === "r") {
          var v = (d["c:q" + q.id] || []).slice(); if (d["o" + q.id]) v.push("Autre : " + d["o" + q.id].trim());
          if (v.length) lines.push(nm + " : " + v.join(", "));
        } else if (q.t === "s") {
          var s = q.rows.map(function (r, i) { var a = d["c:q" + q.id + "." + i]; return a ? r + " " + a[0] + "/5" : ""; }).filter(Boolean);
          if (s.length) lines.push(nm + " :\n  " + s.join("\n  "));
        }
      });
      if (lines.length) { any += lines.length; L.push("— " + p.n + ". " + p.t.toUpperCase()); L = L.concat(lines, [""]); }
    });
    return { text: L.join("\n").trim(), any: any };
  }
  var out = $("#diag-out");
  $("#diag-send").addEventListener("click", function () {
    var r = build();
    if (!r.any) { out.innerHTML = '<p class="hint err">Remplissez au moins quelques réponses avant d\'envoyer.</p>'; return; }
    var msg = r.text, long = encodeURIComponent(msg).length > 3800;
    var short = msg;
    if (long) {
      var cut = msg.slice(0, 1500); cut = cut.slice(0, cut.lastIndexOf("\n"));
      short = cut + "\n\n(… suite dans le message collé juste après : mes réponses complètes)";
    }
    out.innerHTML = '<div class="result"><h3>Dernière étape</h3>' +
      (long ? '<p class="hint">Vos réponses sont longues : <b>1.</b> copiez-les, <b>2.</b> ouvrez WhatsApp, <b>3.</b> collez-les dans la conversation avec Cassandra.</p>'
            : '<p class="hint">Ouvrez WhatsApp : vos réponses sont déjà écrites, appuyez simplement sur envoyer.</p>') +
      '<pre></pre><div style="display:grid;gap:10px"><button type="button" class="btn btn-gold btn-block" id="diag-copy">Copier mes réponses</button>' +
      '<a class="btn btn-wa btn-block" target="_blank" rel="noopener" href="https://wa.me/' + NUM + "?text=" + encodeURIComponent(long ? "Bonjour Cassandra, voici mon diagnostic approfondi (je colle mes réponses juste après)." : short) + '">Ouvrir WhatsApp</a>' +
      '<p class="hint">Pensez aussi à envoyer votre CV, le lien de votre profil LinkedIn et, si possible, une offre d\'emploi qui vous intéresse.</p></div></div>';
    var pre = out.querySelector("pre"); pre.textContent = msg;
    var b = $("#diag-copy");
    b.addEventListener("click", function () {
      var ok = function (x) { b.textContent = x; setTimeout(function () { b.textContent = "Copier mes réponses"; }, 2200); };
      var fb = function () { var rg = document.createRange(); rg.selectNodeContents(pre); var s = getSelection(); s.removeAllRanges(); s.addRange(rg); ok("Texte sélectionné : copiez-le"); };
      try { navigator.clipboard.writeText(msg).then(function () { ok("Réponses copiées"); }, fb); } catch (e) { fb(); }
    });
    out.scrollIntoView({ block: "start", behavior: "smooth" });
  });
  $("#diag-clear").addEventListener("click", function () {
    if (!confirm("Effacer toutes vos réponses sur cet appareil ?")) return;
    try { localStorage.removeItem(KEY); } catch (e) {}
    location.reload();
  });
})();
