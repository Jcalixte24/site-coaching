// Cassandra Touré · script unique du site (sans framework).
// Navigation, apparitions, compteurs, escalier des packs, test « Quel pack ? », formulaires → WhatsApp.
(function () {
  var NUM = "2250719509526";
  var PACKS = [
    { id: "basic", name: "Basic", price: 5000, short: "Diagnostic approfondi, conseils et plan d'action global", visio: false },
    { id: "standard", name: "Standard", price: 7000, short: "Diagnostic + livrables selon votre objectif (CV, LinkedIn, pitch, business model…)", visio: false },
    { id: "premium", name: "Premium", price: 12000, short: "Pack Standard + 2 séances individuelles en visio", visio: true },
    { id: "diamond", name: "Diamond", price: 18000, short: "Pack Premium + suivi d'1 mois sur WhatsApp", visio: true },
    { id: "gold", name: "Gold", price: 25000, monthly: true, short: "Suivi 3 mois + 5 séances visio + 3 ateliers + livre offert", visio: true },
    { id: "vip", name: "VIP", price: 30000, monthly: true, short: "Parcours sur-mesure 3 mois + aide au réseautage", visio: true },
  ];
  var ROOT = document.documentElement.getAttribute("data-root") || "";
  function $(id) { return document.getElementById(id); }
  function xof(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " XOF"; }
  function price(p) { return xof(p.price) + (p.monthly ? "\u00a0/\u00a0mois" : ""); }
  function wa(t) { return "https://wa.me/" + NUM + (t ? "?text=" + encodeURIComponent(t) : ""); }
  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  // ---------- Ouverture : un clic la passe ----------
  var ov = $("ouverture");
  if (ov) ov.addEventListener("click", function () { ov.classList.add("skip"); });

  // ---------- Navigation opaque au défilement ----------
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () { nav.classList.toggle("solid", window.scrollY > 40); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // ---------- Escalier des 6 packs ----------
  document.querySelectorAll(".stairs-wrap").forEach(function (w) {
    var steps = w.querySelectorAll(".stair");
    steps.forEach(function (st) {
      st.addEventListener("click", function () {
        steps.forEach(function (o) { o.setAttribute("aria-pressed", o === st ? "true" : "false"); });
        w.querySelectorAll(".stair-detail").forEach(function (d) { d.hidden = d.getAttribute("data-detail") !== st.getAttribute("data-pack"); });
      });
    });
  });

  // ---------- Sous-menus de navigation ----------
  document.querySelectorAll(".dd").forEach(function (dd) {
    var btn = dd.querySelector(".dd-btn");
    var set = function (on) { dd.classList.toggle("open", on); btn.setAttribute("aria-expanded", on ? "true" : "false"); };
    dd.addEventListener("mouseenter", function () { set(true); });
    dd.addEventListener("mouseleave", function () { set(false); });
    btn.addEventListener("click", function () { set(!dd.classList.contains("open")); });
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") document.querySelectorAll(".dd.open").forEach(function (d) { d.classList.remove("open"); }); });

  // ---------- Carte talent : inclinaison 3D (souris) ----------
  if (matchMedia("(hover: hover)").matches) {
    document.querySelectorAll("[data-tilt]").forEach(function (c) {
      c.addEventListener("mousemove", function (e) {
        var r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        c.style.transform = "rotateY(" + x * 14 + "deg) rotateX(" + -y * 12 + "deg)";
      });
      c.addEventListener("mouseleave", function () { c.style.transform = ""; });
    });
  }

  // ---------- Menu mobile ----------
  var mob = $("mob");
  var burger = document.querySelector(".burger");
  if (mob && burger) {
    burger.addEventListener("click", function () { mob.classList.add("open"); burger.setAttribute("aria-expanded", "true"); });
    mob.querySelector(".mob-close").addEventListener("click", function () { mob.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") mob.classList.remove("open"); });
  }

  // ---------- Apparitions : le contenu est visible au repos, l'animation ne part que si l'élément est hors écran ----------
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var vh = window.innerHeight;
    var obs = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("on"); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll(".rv").forEach(function (el) {
      if (el.getBoundingClientRect().top > vh) { el.classList.add("pv-wait"); obs.observe(el); }
    });
    // Compteurs : « 300+ » défile de 0 à 300 quand il arrive à l'écran
    var cobs = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target, m = el.getAttribute("data-final").match(/^(\d+)(.*)$/), t0 = performance.now();
        cobs.unobserve(el);
        (function step(t) {
          var k = Math.min(1, (t - t0) / 1400);
          el.textContent = Math.round(+m[1] * (1 - Math.pow(1 - k, 3))) + m[2];
          if (k < 1) requestAnimationFrame(step);
        })(t0);
      });
    }, { threshold: 0.3 });
    document.querySelectorAll(".count").forEach(function (el) {
      if (el.getBoundingClientRect().top <= vh || !/^\d/.test(el.textContent)) return;
      el.setAttribute("data-final", el.textContent);
      el.textContent = el.textContent.replace(/^\d+/, "0");
      cobs.observe(el);
    });
  }

  // ---------- Test « Quel pack ? » ----------
  var quiz = $("quel-pack");
  if (quiz) {
    var opts = quiz.querySelectorAll(".quiz-opt");
    var out = quiz.querySelector("[aria-live]");
    opts.forEach(function (b, i) {
      b.addEventListener("click", function () {
        opts.forEach(function (o) { o.setAttribute("aria-pressed", o === b ? "true" : "false"); });
        var p = PACKS[i];
        out.innerHTML =
          '<div class="quiz-result"><div><span class="pack-name">Pack recommandé</span>' +
          '<p class="pack-price">' + p.name + " · " + price(p) + "</p>" +
          '<p class="muted mb-0">' + esc(p.short) + "</p></div>" +
          '<div class="btn-row"><a class="btn btn-gold" href="' + ROOT + "coaching/inscription/?pack=" + p.id + '">S\'inscrire à ce pack →</a>' +
          '<a class="btn btn-ghost" href="#' + p.id + '">Voir le détail</a></div></div>';
      });
    });
  }

  // ---------- Inscription ----------
  var f = $("sig") && $("nom") ? $("sig").form : null;
  if (f) {
    var params = new URLSearchParams(location.search);
    var pre = params.get("pack") || location.hash.slice(1);
    var preIn = f.querySelector('input[name="pack"][value="' + pre + '"]');
    if (preIn) preIn.checked = true;

    var checked = function (n) { return [].slice.call(f.querySelectorAll('input[name="' + n + '"]:checked')); };
    var vals = function (n) { return checked(n).map(function (i) { return i.value; }); };
    var v = function (id) { var e = $(id); return e ? e.value.trim() : ""; };
    var packOf = function () { var c = f.querySelector('input[name="pack"]:checked'); return c ? PACKS.filter(function (p) { return p.id === c.value; })[0] : null; };
    var optOn = function (start) { return checked("option").some(function (i) { return i.value.indexOf(start) === 0; }); };

    var refresh = function () {
      var p = packOf();
      $("montant").textContent = p ? price(p) : xof(0);
      $("s-dispo").hidden = !(p && p.visio);
      $("n-pay").textContent = p && p.visio ? "6" : "5";
      $("n-eng").textContent = p && p.visio ? "7" : "6";
      var s = f.querySelector('input[name="source"]:checked');
      $("w-source-autre").hidden = !(s && s.value === "Autre");
      $("w-parrain").hidden = !optOn("Parrainage");
      $("w-echeances").hidden = !optOn("Paiement en plusieurs");
      $("w-mode-autre").hidden = $("mode").value !== "Autre";
    };
    f.addEventListener("change", refresh);
    refresh();

    f.addEventListener("submit", function (ev) {
      ev.preventDefault();
      f.querySelectorAll(".pv-err").forEach(function (e) { e.remove(); });
      f.querySelectorAll(".bad").forEach(function (e) { e.classList.remove("bad"); });
      var first = null;
      var need = function (ok, wrapId, msg) {
        if (ok) return;
        var w = $(wrapId);
        w.classList.add("bad");
        var s = document.createElement("span");
        s.className = "error pv-err"; s.setAttribute("role", "alert"); s.textContent = msg;
        w.appendChild(s);
        if (!first) first = w;
      };
      var p = packOf();
      need(v("nom"), "w-nom", "Entrez votre nom.");
      need(v("prenom"), "w-prenom", "Entrez votre prénom.");
      need(/\d{8,}/.test(v("wa").replace(/\D/g, "")), "w-wa", "Entrez un numéro WhatsApp valide, avec l'indicatif.");
      need(checked("objectif").length > 0, "w-obj", "Choisissez au moins un objectif.");
      need(!!p, "w-pack", "Choisissez un pack.");
      need(f.querySelectorAll(".eng:not(:checked)").length === 0, "w-eng", "Cochez tous les engagements pour continuer.");
      need(v("sig").length > 2, "w-sig", "Tapez votre nom complet pour signer.");
      if (first) { first.scrollIntoView({ block: "center" }); var i = first.querySelector("input"); if (i) i.focus({ preventScroll: true }); return; }

      var L = ["Bonjour Cassandra, voici ma souscription Coaching Express.", "", "1. COORDONNÉES", "Nom : " + v("nom"), "Prénom : " + v("prenom")];
      if (v("age")) L.push("Âge : " + v("age"));
      if (v("statut")) L.push("Profession / statut : " + v("statut"));
      if (v("ville")) L.push("Ville / pays : " + v("ville"));
      L.push("WhatsApp : " + v("wa"));
      if (v("email")) L.push("E-mail : " + v("email"));
      var s = f.querySelector('input[name="source"]:checked');
      if (s) L.push("Connu via : " + (s.value === "Autre" && v("source-autre") ? v("source-autre") : s.value));
      L.push("", "2. OBJECTIF", vals("objectif").join(", "));
      if (v("phrase")) L.push("En une phrase : " + v("phrase"));
      L.push("", "3. PACK", p.name + " (" + price(p) + ")");
      var o = vals("option");
      if (o.length) {
        L.push("", "4. OPTIONS");
        o.forEach(function (x) { L.push("- " + x); });
        if (!$("w-parrain").hidden && v("parrain")) L.push("Parrain / filleul : " + v("parrain"));
        if (!$("w-echeances").hidden && v("echeances")) L.push("Échéances souhaitées : " + v("echeances"));
      }
      if (p.visio) {
        var j = vals("jour"), c = vals("creneau");
        if (j.length || c.length || v("fuseau") || v("appareil")) {
          L.push("", "5. DISPONIBILITÉS");
          if (j.length) L.push("Jours : " + j.join(", "));
          if (c.length) L.push("Créneaux : " + c.join(", "));
          if (v("fuseau")) L.push("Fuseau / pays : " + v("fuseau"));
          if (v("appareil")) L.push("Appareil visio : " + v("appareil"));
        }
      }
      L.push("", "PAIEMENT");
      var m = $("mode").value === "Autre" && v("mode-autre") ? v("mode-autre") : $("mode").value;
      if (m) L.push("Mode souhaité : " + m);
      L.push("Montant : " + price(p), "", "Engagements acceptés. Signé : " + v("sig"));
      showResult(f, L.join("\n"), "Votre inscription n'est pas encore envoyée. Appuyez sur le bouton vert : WhatsApp s'ouvre avec votre message déjà écrit.", "Ouvrir WhatsApp et envoyer");
    });
  }

  // ---------- Demande de recrutement ----------
  var d = $("entreprise") ? $("entreprise").form : null;
  if (d) {
    var nb = $("nb");
    var tot = d.querySelector(".total");
    var upd = function () {
      var n = parseInt(nb.value, 10) || 0;
      tot.children[0].textContent = "Estimation · " + n + " × " + xof(140000) + " HT";
      tot.children[1].textContent = xof(n * 140000) + " HT";
    };
    nb.addEventListener("input", upd);
    d.addEventListener("submit", function (ev) {
      ev.preventDefault();
      d.querySelectorAll(".pv-err").forEach(function (e) { e.remove(); });
      var g = function (id) { return $(id).value.trim(); };
      var first = null;
      var need = function (ok, wrapId, msg) {
        if (ok) return;
        var s = document.createElement("span");
        s.className = "error pv-err"; s.setAttribute("role", "alert"); s.textContent = msg;
        $(wrapId).appendChild(s);
        if (!first) first = $(wrapId);
      };
      need(g("entreprise"), "d-entreprise", "Entrez le nom de l'entreprise.");
      need(g("nom"), "d-nom", "Entrez le nom du contact.");
      need(/\d{8,}/.test(g("tel").replace(/\D/g, "")), "d-tel", "Entrez un numéro valide, avec l'indicatif.");
      need(g("poste"), "d-poste", "Indiquez le poste à pourvoir.");
      need((parseInt(nb.value, 10) || 0) >= 1, "d-nb", "Indiquez au moins 1 profil.");
      need(d.querySelector('input[name="consent"]').checked, "d-consent", "Cochez la case pour continuer.");
      if (first) { first.scrollIntoView({ block: "center" }); return; }
      var n = parseInt(nb.value, 10);
      var L = ["Bonjour Cassandra, voici une demande de recrutement.", "", "ENTREPRISE : " + g("entreprise") + (g("secteur") ? " (" + g("secteur") + ")" : "")];
      L.push("Contact : " + g("nom") + (g("fonction") ? ", " + g("fonction") : ""), "Téléphone : " + g("tel"));
      if (g("email")) L.push("E-mail : " + g("email"));
      L.push("", "POSTE : " + g("poste"));
      if (g("missions")) L.push("Missions : " + g("missions"));
      if (g("prerequis")) L.push("Prérequis : " + g("prerequis"));
      L.push("Nombre de profils : " + n);
      if (g("debut")) L.push("Début souhaité : " + new Date(g("debut")).toLocaleDateString("fr-FR"));
      if (g("budget")) L.push("Budget : " + g("budget"));
      L.push("Estimation : " + xof(n * 140000) + " HT (tarif nouveau client)");
      if (g("remarque")) L.push("", "Remarque : " + g("remarque"));
      showResult(d, L.join("\n"), "Envoyez votre demande à Cassandra : elle vous recontacte pour un point de cadrage.", "Envoyer sur WhatsApp");
    });
  }

  function showResult(form, msg, hint, label) {
    var old = $("pv-result");
    if (old) old.remove();
    var sec = document.createElement("section");
    sec.id = "pv-result";
    sec.className = "result mt-m";
    sec.innerHTML =
      '<h2 class="h-m">Dernière étape</h2><p class="hint mt-s">' + esc(hint) + "</p><pre></pre>" +
      '<div style="display:grid;gap:10px"><a class="btn btn-wa btn-block" target="_blank" rel="noopener" href="' + wa(msg) + '">' + label + "</a>" +
      '<button type="button" class="btn btn-ghost btn-block">Copier le message</button>' +
      '<p class="hint">Si WhatsApp ne s\'ouvre pas, copiez le message et envoyez-le au <b>+225 07 19 50 95 26</b>.</p></div>';
    sec.querySelector("pre").textContent = msg;
    var btn = sec.querySelector("button");
    btn.addEventListener("click", function () {
      var done = function (t) { btn.textContent = t; setTimeout(function () { btn.textContent = "Copier le message"; }, 2200); };
      var fallback = function () {
        var r = document.createRange(); r.selectNodeContents(sec.querySelector("pre"));
        var s = getSelection(); s.removeAllRanges(); s.addRange(r); done("Message sélectionné : copiez-le");
      };
      try { navigator.clipboard.writeText(msg).then(function () { done("Message copié"); }, fallback); } catch (e) { fallback(); }
    });
    form.parentNode.insertBefore(sec, form.nextSibling);
    sec.scrollIntoView({ block: "start" });
  }
})();
