// Cassandra Touré · le logo qui se décompose (sans bibliothèque).
// Le logo est découpé en six pièces : anneau, escalier, deux échelons, deux branches de lauriers.
// - hero / banner : les pièces arrivent de loin et s'assemblent ; elles se séparent doucement quand on quitte le haut de la page ;
// - seq : séquence au défilement où chaque pièce porte une partie du discours, puis tout se recolle ;
// - cta : les pièces se recollent à l'arrivée de l'appel final (flash doré) ;
// - un clic sur un logo de séquence ou d'appel final l'éclate puis le remet en place.
(function () {
  "use strict";
  var MARK = "<svg viewBox=\"-120 -120 440 440\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\"><defs><linearGradient id=\"{p}or\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#9C7642\"/><stop offset=\".38\" stop-color=\"#D9BE8C\"/><stop offset=\".52\" stop-color=\"#F0DDB2\"/><stop offset=\".72\" stop-color=\"#BF9A5F\"/><stop offset=\"1\" stop-color=\"#8C6937\"/></linearGradient><linearGradient id=\"{p}ar\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#9DA2AA\"/><stop offset=\".45\" stop-color=\"#FFFFFF\"/><stop offset=\".7\" stop-color=\"#DADDE2\"/><stop offset=\"1\" stop-color=\"#A9AEB5\"/></linearGradient><radialGradient id=\"{p}gl\"><stop offset=\"0\" stop-color=\"#F0DDB2\" stop-opacity=\".9\"/><stop offset=\"1\" stop-color=\"#C3A06A\" stop-opacity=\"0\"/></radialGradient></defs><circle class=\"dglow\" cx=\"100\" cy=\"126\" r=\"150\" fill=\"url(#{p}gl)\"/><g class=\"dp d-ring\"><path d=\"M48.8 115.2A58 58 0 1 1 151.2 115.2\" fill=\"none\" stroke=\"url(#{p}or)\" stroke-width=\"16\"/></g><g class=\"dp d-tri\"><path fill=\"url(#{p}or)\" fill-rule=\"evenodd\" d=\"M56 142H144L100 230ZM75 154L100 204L125 154Z\"/></g><g class=\"dp d-r1\"><rect x=\"79\" y=\"165\" width=\"42\" height=\"8\" fill=\"url(#{p}or)\"/></g><g class=\"dp d-r2\"><rect x=\"88\" y=\"183\" width=\"24\" height=\"8\" fill=\"url(#{p}or)\"/></g><g class=\"dp d-ll\"><path d=\"M92.0 144.0L85.8 142.8L79.5 140.3L73.2 136.9L67.0 132.8L60.8 128.0L54.5 122.5L48.2 116.5L42.0 110.0\" fill=\"none\" stroke=\"url(#{p}ar)\" stroke-width=\"1.6\"/><path d=\"M85.8 142.8C85.2 149.7 79.1 153.0 73.5 152.0C74.1 146.4 79.0 141.4 85.8 142.8ZM85.8 142.8C79.4 142.5 76.1 137.0 76.9 131.8C82.1 132.2 86.8 136.5 85.8 142.8ZM79.5 140.3C77.8 146.7 71.5 148.7 66.4 146.8C67.9 141.6 73.4 137.8 79.5 140.3ZM79.5 140.3C73.6 138.9 71.5 133.2 73.1 128.5C77.9 129.7 81.6 134.6 79.5 140.3ZM73.2 136.9C70.9 142.8 64.7 144.0 60.2 141.6C62.2 136.9 67.7 133.9 73.2 136.9ZM73.2 136.9C67.8 135.0 66.5 129.3 68.5 125.0C73.0 126.7 75.9 131.8 73.2 136.9ZM67.0 132.8C64.3 138.1 58.3 138.7 54.2 136.1C56.5 131.8 62.0 129.4 67.0 132.8ZM67.0 132.8C62.0 130.5 61.2 125.0 63.6 121.1C67.6 123.1 69.9 128.1 67.0 132.8ZM60.8 128.0C57.8 132.8 52.1 133.0 48.5 130.2C50.9 126.3 56.3 124.5 60.8 128.0ZM60.8 128.0C56.2 125.4 55.8 120.2 58.3 116.7C62.0 118.9 63.8 123.8 60.8 128.0ZM54.5 122.5C51.5 127.0 46.1 126.8 42.8 124.0C45.3 120.4 50.5 119.0 54.5 122.5ZM54.5 122.5C50.3 119.9 50.3 115.0 52.8 111.8C56.1 114.0 57.6 118.7 54.5 122.5ZM48.2 116.5C45.2 120.5 40.2 120.2 37.2 117.3C39.7 114.1 44.7 113.0 48.2 116.5ZM48.2 116.5C44.5 113.9 44.7 109.2 47.2 106.4C50.2 108.6 51.4 113.1 48.2 116.5ZM42.0 110.0C39.0 113.6 34.3 113.1 31.6 110.3C34.1 107.4 38.8 106.6 42.0 110.0ZM42.0 110.0C38.6 107.3 38.9 103.0 41.4 100.5C44.1 102.7 45.1 106.9 42.0 110.0ZM42.0 110.0C36.6 110.2 33.5 105.7 33.7 101.3C38.1 101.3 42.4 104.6 42.0 110.0Z\" fill=\"url(#{p}ar)\"/></g><g class=\"dp d-lr\"><path d=\"M108.0 144.0L114.2 142.8L120.5 140.3L126.8 136.9L133.0 132.8L139.2 128.0L145.5 122.5L151.8 116.5L158.0 110.0\" fill=\"none\" stroke=\"url(#{p}ar)\" stroke-width=\"1.6\"/><path d=\"M114.2 142.8C112.1 136.2 116.6 130.8 122.1 129.7C123.7 135.1 121.1 141.5 114.2 142.8ZM114.2 142.8C120.3 140.6 125.3 144.5 126.6 149.6C121.6 151.2 115.6 149.0 114.2 142.8ZM120.5 140.3C117.4 134.5 120.6 128.7 125.6 126.6C128.0 131.4 126.7 137.9 120.5 140.3ZM120.5 140.3C125.8 137.2 131.2 140.0 133.2 144.5C128.9 146.9 122.9 145.9 120.5 140.3ZM126.8 136.9C123.1 131.8 125.5 125.9 130.0 123.4C132.9 127.7 132.3 134.0 126.8 136.9ZM126.8 136.9C131.4 133.4 136.8 135.4 139.3 139.5C135.4 142.3 129.6 142.0 126.8 136.9ZM133.0 132.8C129.1 128.2 130.9 122.5 135.0 119.7C138.0 123.5 138.0 129.5 133.0 132.8ZM133.0 132.8C137.1 129.1 142.4 130.5 145.1 134.2C141.7 137.1 136.2 137.3 133.0 132.8ZM139.2 128.0C135.3 123.9 136.6 118.4 140.2 115.5C143.4 118.9 143.8 124.6 139.2 128.0ZM139.2 128.0C142.9 124.2 148.0 125.2 150.7 128.5C147.7 131.5 142.5 132.0 139.2 128.0ZM145.5 122.5C141.6 118.9 142.4 113.6 145.7 110.7C148.9 113.8 149.6 119.1 145.5 122.5ZM145.5 122.5C148.7 118.8 153.6 119.5 156.4 122.4C153.7 125.4 148.8 126.2 145.5 122.5ZM151.8 116.5C147.9 113.3 148.5 108.3 151.4 105.4C154.5 108.1 155.4 113.1 151.8 116.5ZM151.8 116.5C154.6 112.9 159.2 113.3 161.9 115.9C159.6 118.8 155.0 119.8 151.8 116.5ZM158.0 110.0C154.2 107.2 154.6 102.4 157.2 99.6C160.2 102.0 161.3 106.6 158.0 110.0ZM158.0 110.0C160.5 106.5 164.8 106.6 167.5 108.9C165.4 111.8 161.2 112.9 158.0 110.0ZM158.0 110.0C157.6 104.6 161.9 101.3 166.3 101.3C166.5 105.7 163.4 110.2 158.0 110.0Z\" fill=\"url(#{p}ar)\"/></g><g class=\"dlabs\"><g class=\"dlab l-ring\"><path d=\"M118 -2H186\" stroke=\"#C3A06A\" stroke-width=\"1.5\"/><circle cx=\"118\" cy=\"-2\" r=\"3.5\" fill=\"#C3A06A\"/><text x=\"194\" y=\"3\">Le talent</text></g><g class=\"dlab l-tri\"><path d=\"M122 258H178\" stroke=\"#C3A06A\" stroke-width=\"1.5\"/><circle cx=\"122\" cy=\"258\" r=\"3.5\" fill=\"#C3A06A\"/><text x=\"186\" y=\"263\">La progression</text></g><g class=\"dlab l-lau\"><path d=\"M-62 150H-120\" stroke=\"#C3A06A\" stroke-width=\"1.5\"/><circle cx=\"-62\" cy=\"150\" r=\"3.5\" fill=\"#C3A06A\"/><text x=\"-112\" y=\"118\">L'excellence</text></g></g></svg>";
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var clamp = function (x, a, b) { return Math.max(a === undefined ? 0 : a, Math.min(b === undefined ? 1 : b, x)); };
  var smooth = function (x) { x = clamp(x); return x * x * (3 - 2 * x); };
  var easeOut = function (x) { x = clamp(x); return 1 - Math.pow(1 - x, 3); };
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  var NAMES = ["ring", "tri", "r1", "r2", "ll", "lr"];
  var SCAT = { ring: [0, -190, 55], tri: [0, 190, -26], r1: [230, 80, 42], r2: [-230, 110, -36], ll: [-260, -60, -75], lr: [260, -80, 75] };
  var EXPL = { ring: [0, -96, 14], tri: [0, 74, 0], r1: [136, 38, 0], r2: [-136, 64, 0], ll: [-156, 28, -24], lr: [156, -18, 24] };
  var uid = 0, logos = [], vh = innerHeight;

  function build(el) {
    var p = "dl" + uid++;
    el.innerHTML = MARK.replace(/\{p\}/g, p);
    el.setAttribute("aria-hidden", "true");
    var svg = el.firstChild, parts = {};
    NAMES.forEach(function (n) { parts[n] = svg.querySelector(".d-" + n); });
    return { el: el, svg: svg, parts: parts, mode: el.getAttribute("data-mode"), vis: true, a: 0, t0: 0, burst: -1, rnd: null, snapped: false, sec: null };
  }

  function put(node, x, y, r, s, o) {
    node.style.transform = "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px) rotate(" + r.toFixed(1) + "deg) scale(" + s.toFixed(3) + ")";
    node.style.opacity = o.toFixed(3);
  }

  // image fixe : tout est assemblé
  function assembled(L) { NAMES.forEach(function (n) { put(L.parts[n], 0, 0, 0, 1, 1); }); }

  // courbe par morceaux : [[p, valeur], ...]
  function curve(k, p) {
    if (p <= k[0][0]) return k[0][1];
    for (var i = 1; i < k.length; i++) {
      if (p <= k[i][0]) return lerp(k[i - 1][1], k[i][1], smooth((p - k[i - 1][0]) / (k[i][0] - k[i - 1][0])));
    }
    return k[k.length - 1][1];
  }
  var KF = {
    ring: [[0, 0], [.1, 0], [.28, 1], [.8, 1], [.94, 0]],
    tri: [[0, 0], [.36, 0], [.52, 1], [.8, 1], [.94, 0]],
    r1: [[0, 0], [.38, 0], [.56, 1], [.8, 1], [.94, 0]],
    r2: [[0, 0], [.4, 0], [.6, 1], [.8, 1], [.94, 0]],
    ll: [[0, 0], [.6, 0], [.76, 1], [.82, 1], [.94, 0]],
    lr: [[0, 0], [.62, 0], [.78, 1], [.82, 1], [.94, 0]]
  };
  var FOCUS = { ring: [.16, .4], tri: [.4, .64], r1: [.4, .64], r2: [.4, .64], ll: [.64, .86], lr: [.64, .86] };
  var BEATS = [0, .14, .4, .64, .86];

  function windowW(p, a, b) { var f = .05; return smooth((p - a) / f) * (1 - smooth((p - b) / f)); }

  function frame(L, now) {
    var m = L.mode, st = {}, i, n;
    if (m === "seq") {
      var r = L.sec.getBoundingClientRect();
      var p = clamp(-r.top / Math.max(1, r.height - vh));
      var anyFocus = 0;
      NAMES.forEach(function (nm) { anyFocus = Math.max(anyFocus, windowW(p, FOCUS[nm][0], FOCUS[nm][1])); });
      NAMES.forEach(function (nm) {
        var ex = curve(KF[nm], p), e = EXPL[nm];
        var fw = windowW(p, FOCUS[nm][0], FOCUS[nm][1]);
        st[nm] = [e[0] * ex, e[1] * ex, e[2] * ex, 1 + (nm === "ring" ? .1 : .04) * ex * (0.6 + 0.4 * fw), 1 - .58 * anyFocus * (1 - fw)];
      });
      var beat = 0;
      for (i = 0; i < BEATS.length; i++) if (p >= BEATS[i]) beat = i;
      if (L.beat !== beat) {
        L.beat = beat;
        L.svg.setAttribute("data-beat", beat);
        $$(".beat", L.sec).forEach(function (b, k) { b.classList.toggle("on", k === beat); });
        $$(".seq-dots li", L.sec).forEach(function (d, k) { d.classList.toggle("on", k === beat); });
        if (beat === 4 && !L.snapped) { L.snapped = true; L.el.classList.add("snap"); setTimeout(function () { L.el.classList.remove("snap"); }, 1200); }
        if (beat < 4) L.snapped = false;
      }
      L.sec.style.setProperty("--sp", p.toFixed(3));
      L.svg.querySelector(".dglow").style.opacity = (0.15 + 0.5 * anyFocus).toFixed(2);
    } else {
      var a, e = 0;
      if (m === "cta") {
        var rr = L.el.getBoundingClientRect();
        a = clamp((vh * 0.92 - rr.top) / (vh * 0.5));
        if (a >= 0.99 && !L.snapped) { L.snapped = true; L.el.classList.add("snap"); setTimeout(function () { L.el.classList.remove("snap"); }, 1200); }
        if (a < 0.4) L.snapped = false;
      } else {
        if (!L.t0) L.t0 = now;
        a = clamp((now - L.t0) / 1900);
        e = clamp(scrollY / (vh * 0.9)) * 0.85;
      }
      var k = 1 - easeOut(a);
      NAMES.forEach(function (nm) {
        var s = SCAT[nm], x = EXPL[nm];
        st[nm] = [s[0] * k + x[0] * e, s[1] * k + x[1] * e, s[2] * k + x[2] * e, lerp(.55, 1, easeOut(a)), clamp(a * 2.2)];
      });
    }
    // éclatement au clic
    if (L.burst >= 0) {
      var tt = (now - L.burst) / 1000;
      if (tt > 1.3) { L.burst = -1; }
      else {
        var amp = (1 - easeOut(tt / 1.25)) * (1 + .18 * Math.sin(tt * 17));
        NAMES.forEach(function (nm) {
          var s = SCAT[nm], q = L.rnd[nm];
          st[nm][0] += s[0] * q * amp; st[nm][1] += s[1] * q * amp; st[nm][2] += s[2] * q * amp;
        });
      }
    }
    NAMES.forEach(function (nm) { var v = st[nm]; put(L.parts[nm], v[0], v[1], v[2], v[3], v[4]); });
  }

  function init() {
    $$(".dlogo[data-mode]").forEach(function (el) {
      var L = build(el);
      logos.push(L);
      if (L.mode === "seq") L.sec = el.closest(".seq");
      if (reduce) { assembled(L); return; }
      if (L.mode === "seq" || L.mode === "cta") {
        el.style.cursor = "pointer";
        el.addEventListener("click", function () {
          L.rnd = {};
          NAMES.forEach(function (n) { L.rnd[n] = (Math.random() < .5 ? -1 : 1) * (0.6 + Math.random() * .7); });
          L.burst = performance.now();
        });
      }
    });
    if (reduce) return;
    $$(".seq").forEach(function (s) { s.classList.add("seq-live"); });
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { logos.forEach(function (L) { if (L.el === e.target || (L.sec && L.sec === e.target)) L.vis = e.isIntersecting; }); });
      }, { rootMargin: "120px 0px" });
      logos.forEach(function (L) { io.observe(L.mode === "seq" ? L.sec : L.el); });
    }
    addEventListener("resize", function () { vh = innerHeight; });
    function loop(now) {
      requestAnimationFrame(loop);
      if (document.hidden) return;
      logos.forEach(function (L) { if (L.vis) frame(L, now); });
    }
    requestAnimationFrame(loop);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
