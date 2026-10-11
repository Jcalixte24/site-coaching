// Cassandra Touré · motion au défilement (sans bibliothèque).
// Fil de progression, rail des sections, titres mot par mot, textes qui s'allument, étapes et escalier pilotés par le scroll,
// bandeaux sensibles à la vitesse, blocs sombres qui s'ouvrent, parallaxe, curseur doré, boutons magnétiques, cartes inclinables.
// Rien ne s'active si l'appareil demande moins d'animations ; les effets souris sont réservés aux appareils à souris.
(function () {
  "use strict";
  var root = document.documentElement;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  root.classList.add("mo");

  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var clamp = function (x, a, b) { return Math.max(a === undefined ? 0 : a, Math.min(b === undefined ? 1 : b, x)); };
  var vh = innerHeight;

  // ---------- découpe en mots (conserve <em>, <b>…) ----------
  function wrapWords(el, cls, inner) {
    var idx = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.nodeValue.split(/(\s+)/).forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); return; }
            var w = document.createElement("span");
            w.className = cls;
            if (inner) {
              var wi = document.createElement("span");
              wi.className = "wi";
              wi.style.setProperty("--i", idx);
              wi.textContent = p;
              w.appendChild(wi);
            } else {
              w.textContent = p;
            }
            idx++;
            frag.appendChild(w);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1 && !/\b(w|sw)\b/.test(n.className)) {
          walk(n);
        }
      });
    })(el);
    return idx;
  }

  // ---------- fil de progression ----------
  var bar = document.createElement("div");
  bar.className = "sprog";
  bar.setAttribute("aria-hidden", "true");
  bar.innerHTML = "<i></i>";
  document.body.appendChild(bar);

  // ---------- titres mot par mot ----------
  var heads = $$("main h2.h-l, main h2.h-m");
  heads.forEach(function (h) { wrapWords(h, "w", true); });
  if ("IntersectionObserver" in window) {
    var hio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); hio.unobserve(e.target); } });
    }, { threshold: 0.2 });
    heads.forEach(function (h) { hio.observe(h); });
  } else {
    heads.forEach(function (h) { h.classList.add("in"); });
  }

  // ---------- textes qui s'allument ----------
  var scrubs = $$("main .sec-head .lead").filter(function (p) { return p.textContent.length > 40; }).map(function (p) {
    var n = wrapWords(p, "sw", false);
    return { el: p, words: $$(".sw", p), n: n, lit: 0 };
  });

  // ---------- éléments suivis ----------
  var steps = $$("ol.steps").map(function (ol) { return { el: ol, items: $$(".step", ol), p: -1 }; });
  var stairs = $$(".stairs").map(function (el) { return { el: el, items: $$(".stair", el) }; });
  var expands = $$(".sec.navy, .statband");
  expands.forEach(function (e) { e.classList.add("xp"); });
  var heroInners = $$(".hero .inner, .banner .inner");
  var PAR = [];
  [[".ghost-word", 0.2], [".fx .b1", 0.18], [".fx .b2", -0.12], [".fx .b3", 0.28], [".pan-art", -0.07]].forEach(function (d) {
    $$(d[0]).forEach(function (el) { PAR.push({ el: el, k: d[1], ref: el.parentElement }); });
  });
  var logo = document.querySelector(".nav .brand-logo");

  // ---------- rail des sections ----------
  var rail = null, dots = [], sections = [];
  if (fine) {
    sections = $$("main > section").filter(function (s) { return !s.classList.contains("portal") && s.offsetHeight > 240; });
    if (sections.length >= 4) {
      rail = document.createElement("nav");
      rail.className = "srail";
      rail.setAttribute("aria-label", "Sections de la page");
      rail.innerHTML = '<span class="sfill"></span><span class="spin"></span>';
      sections.forEach(function (s, i) {
        var lab = s.querySelector(".eyebrow") ? s.querySelector(".eyebrow").textContent : (s.querySelector("h2") ? s.querySelector("h2").textContent : "Haut de page");
        lab = lab.replace(/^\s*\d+\s*/, "").replace(/\s+/g, " ").trim();
        if (lab.length > 30) lab = lab.slice(0, 28) + "…";
        var b = document.createElement("button");
        b.type = "button";
        b.setAttribute("aria-label", lab);
        b.innerHTML = "<span>" + lab.replace(/</g, "&lt;") + "</span>";
        b.addEventListener("click", function () { s.scrollIntoView({ behavior: "smooth", block: "start" }); });
        rail.appendChild(b);
        dots.push(b);
      });
      document.body.appendChild(rail);
    }
  }
  function layoutRail() {
    if (!rail) return;
    var doc = Math.max(1, root.scrollHeight - vh);
    sections.forEach(function (s, i) {
      var top = s.getBoundingClientRect().top + scrollY;
      dots[i].style.top = clamp(top / doc) * 100 + "%";
    });
  }

  // ---------- bandeaux sensibles à la vitesse ----------
  var marquees = $$(".marquee").map(function (m) {
    var t = m.querySelector(".marquee-track");
    t.style.animation = "none";
    var st = { el: m, t: t, x: 0, half: 0, vis: true, hover: false };
    m.addEventListener("pointerenter", function () { st.hover = true; });
    m.addEventListener("pointerleave", function () { st.hover = false; });
    return st;
  });
  function measure() {
    vh = innerHeight;
    marquees.forEach(function (m) { m.half = m.t.scrollWidth / 2; });
    layoutRail();
  }
  if ("IntersectionObserver" in window) {
    var mio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { marquees.forEach(function (m) { if (m.el === e.target) m.vis = e.isIntersecting; }); });
    });
    marquees.forEach(function (m) { mio.observe(m.el); });
  }

  // ---------- souris : curseur, projecteur, aimant, inclinaison ----------
  var mx = -100, my = -100, cx = -100, cy = -100, ring, dot;
  if (fine) {
    ring = document.createElement("div"); ring.className = "cur";
    dot = document.createElement("div"); dot.className = "cur-dot";
    ring.setAttribute("aria-hidden", "true"); dot.setAttribute("aria-hidden", "true");
    document.body.appendChild(ring); document.body.appendChild(dot);
    addEventListener("pointermove", function (e) {
      mx = e.clientX; my = e.clientY;
      ring.classList.add("on"); dot.classList.add("on");
      var hot = e.target.closest && e.target.closest("a, button, summary, label, .stair, .choice, [role=button], input, select, textarea");
      ring.classList.toggle("hot", !!hot);
      var sp = e.target.closest && e.target.closest(".sec.navy, .cta-band, .statband");
      if (sp) {
        var r = sp.getBoundingClientRect();
        sp.style.setProperty("--mx", e.clientX - r.left + "px");
        sp.style.setProperty("--my", e.clientY - r.top + "px");
      }
      magnet(e);
    }, { passive: true });
    addEventListener("pointerdown", function () { ring.classList.add("down"); });
    addEventListener("pointerup", function () { ring.classList.remove("down"); });
    document.addEventListener("pointerleave", function () { ring.classList.remove("on"); dot.classList.remove("on"); });

    var btns = $$(".btn-gold, .btn-wa, .btn-navy");
    var magnet = function (e) {
      btns.forEach(function (b) {
        var r = b.getBoundingClientRect();
        var dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        var near = Math.abs(dx) < r.width / 2 + 50 && Math.abs(dy) < r.height / 2 + 50;
        b.style.translate = near ? clamp(dx * 0.22, -10, 10) + "px " + clamp(dy * 0.32, -8, 8) + "px" : "";
      });
    };
    $$(".card, .quote, .diag-part, .step").forEach(function (el) {
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transitionDelay = "0s";
        el.style.transform = "perspective(900px) rotateX(" + (-py * 7).toFixed(2) + "deg) rotateY(" + (px * 9).toFixed(2) + "deg) translateY(-4px)";
      });
      el.addEventListener("pointerleave", function () { el.style.transform = ""; });
    });
  }

  // ---------- mise à jour au défilement ----------
  var lastY = -1, prevY = scrollY, vel = 0, prevT = performance.now();

  function onScroll(y) {
    var doc = Math.max(1, root.scrollHeight - vh);
    var sp = clamp(y / doc);
    bar.style.setProperty("--sp", sp.toFixed(4));
    if (rail) {
      rail.style.setProperty("--rp", sp.toFixed(4));
      var best = 0, bd = 1e9;
      sections.forEach(function (s, i) {
        var r = s.getBoundingClientRect();
        var d = Math.abs(r.top + Math.min(r.height, vh) * 0.35 - vh * 0.4);
        if (r.top < vh * 0.45 && r.bottom > vh * 0.2 && d < bd) { bd = d; best = i; }
      });
      dots.forEach(function (b, i) { b.classList.toggle("on", i === best); });
    }
    if (logo) logo.style.transform = "rotateY(" + ((y * 0.2) % 360).toFixed(1) + "deg)";

    // le haut de page s'estompe et recule
    if (y < vh * 1.4) {
      var f = clamp(y / (vh * 0.75));
      heroInners.forEach(function (el) {
        el.style.opacity = (1 - f * 0.9).toFixed(3);
        el.style.translate = "0 " + (y * 0.16).toFixed(1) + "px";
      });
    }
    // parallaxe
    PAR.forEach(function (p) {
      var r = p.ref.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      var off = r.top + r.height / 2 - vh / 2;
      p.el.style.translate = "0 " + (-off * p.k).toFixed(1) + "px";
    });
    // textes qui s'allument
    scrubs.forEach(function (s) {
      var r = s.el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      var p = clamp((vh * 0.9 - r.top) / (vh * 0.5));
      var k = Math.round(p * s.n);
      if (k !== s.lit) {
        s.words.forEach(function (w, i) { w.classList.toggle("lit", i < k); });
        s.lit = k;
      }
    });
    // fil des étapes
    steps.forEach(function (s) {
      var r = s.el.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      var p = clamp((vh * 0.85 - r.top) / (Math.min(r.height, vh * 0.5) + vh * 0.3));
      s.el.style.setProperty("--p", p.toFixed(3));
      s.items.forEach(function (it, i) { it.classList.toggle("act", p >= (i + 0.35) / s.items.length * 0.92); });
    });
    // escalier : chaque marche monte au fil du défilement
    stairs.forEach(function (s) {
      var r = s.el.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      var p = clamp((vh * 0.92 - r.top) / (vh * 0.5));
      s.items.forEach(function (it, i) { it.style.setProperty("--s", clamp(p * 1.8 - i * 0.16).toFixed(3)); });
    });
    // blocs sombres qui s'ouvrent
    expands.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      el.style.setProperty("--e", clamp((vh - r.top) / (vh * 0.45)).toFixed(3));
    });
  }

  function frame(now) {
    requestAnimationFrame(frame);
    if (document.hidden) return;
    var y = scrollY, dt = Math.min(64, now - prevT);
    prevT = now;
    vel += ((y - prevY) - vel) * 0.14;
    prevY = y;
    if (y !== lastY) { lastY = y; onScroll(y); }
    // bandeaux : dérive continue + vitesse du défilement (le sens s'inverse en remontant)
    marquees.forEach(function (m) {
      if (!m.vis || !m.half) return;
      m.x += (m.hover ? 0 : 0.05 * dt) + vel * 1.15;
      m.x = ((m.x % m.half) + m.half) % m.half;
      m.t.style.transform = "translate3d(" + (-m.x).toFixed(1) + "px,0,0)";
    });
    if (ring) {
      cx += (mx - cx) * 0.2; cy += (my - cy) * 0.2;
      ring.style.transform = "translate3d(" + cx.toFixed(1) + "px," + cy.toFixed(1) + "px,0)";
      dot.style.transform = "translate3d(" + mx + "px," + my + "px,0)";
    }
  }

  addEventListener("resize", measure);
  addEventListener("load", measure);
  measure();
  requestAnimationFrame(frame);
})();
