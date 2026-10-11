// Cassandra Touré · accueil immersif : poussière dorée qui réagit au curseur, projecteur, teinte selon le choix survolé.
(function () {
  "use strict";
  var portal = document.querySelector(".portal");
  if (!portal) return;
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var choices = portal.querySelectorAll(".choice[data-side]");
  choices.forEach(function (c) {
    var side = c.getAttribute("data-side") === "-1" ? "c" : "e";
    var on = function () { portal.setAttribute("data-hover", side); };
    var off = function () { portal.removeAttribute("data-hover"); };
    c.addEventListener("pointerenter", on); c.addEventListener("pointerleave", off);
    c.addEventListener("focus", on); c.addEventListener("blur", off);
  });
  if (reduce) return;
  var cv = document.createElement("canvas");
  cv.className = "portal-dust"; cv.setAttribute("aria-hidden", "true");
  portal.insertBefore(cv, portal.firstChild);
  var cx = cv.getContext("2d"), W = 0, H = 0, dpr = Math.min(devicePixelRatio || 1, 2), P = [], mx = -999, my = -999, vis = true;
  function size() {
    var r = portal.getBoundingClientRect(); W = r.width; H = r.height;
    cv.width = W * dpr; cv.height = H * dpr; cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = Math.round(Math.min(70, W / 18));
    while (P.length < n) P.push({ x: Math.random() * W, y: Math.random() * H, r: 0.8 + Math.random() * 2.2, vx: 0, vy: 0, s: 0.15 + Math.random() * 0.5, ph: Math.random() * 6.28, g: Math.random() < 0.7 });
    P.length = n;
  }
  size(); addEventListener("resize", size);
  portal.addEventListener("pointermove", function (e) { var r = portal.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; portal.style.setProperty("--mx", mx + "px"); portal.style.setProperty("--my", my + "px"); });
  portal.addEventListener("pointerleave", function () { mx = my = -999; });
  if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; }).observe(portal);
  var t0 = performance.now();
  (function loop(now) {
    requestAnimationFrame(loop);
    if (!vis || document.hidden) return;
    var t = (now - t0) / 1000, side = portal.getAttribute("data-hover"), pull = side === "c" ? -1 : side === "e" ? 1 : 0;
    cx.clearRect(0, 0, W, H);
    for (var i = 0; i < P.length; i++) {
      var p = P[i];
      p.vx += Math.sin(t * 0.4 + p.ph) * 0.004; p.vy -= p.s * 0.002;
      if (pull) p.vx += pull * 0.02 * p.s;
      var dx = p.x - mx, dy = p.y - my, d2 = dx * dx + dy * dy;
      if (d2 < 14000) { var f = (1 - d2 / 14000) * 0.9; p.vx += dx / Math.sqrt(d2 + 1) * f; p.vy += dy / Math.sqrt(d2 + 1) * f; }
      p.vx *= 0.96; p.vy *= 0.96; p.x += p.vx; p.y += p.vy;
      if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
      if (p.x < -10) p.x = W + 10; else if (p.x > W + 10) p.x = -10;
      var a = 0.25 + 0.45 * (0.5 + 0.5 * Math.sin(t * 1.3 + p.ph));
      cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 6.283);
      cx.fillStyle = p.g ? "rgba(191,154,95," + a.toFixed(2) + ")" : "rgba(160,166,175," + (a * 0.8).toFixed(2) + ")";
      cx.fill();
    }
  })(t0);
})();
