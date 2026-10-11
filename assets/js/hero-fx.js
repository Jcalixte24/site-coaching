// Cassandra Touré · héros des deux espaces : le titre se disloque au premier défilement, le logo grandit et pivote, les chiffres montent.
(function () {
  "use strict";
  var hero = document.querySelector(".hero-xl");
  if (!hero || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var cue = document.createElement("a");
  cue.className = "hero-cue"; cue.href = "#methode"; cue.setAttribute("aria-label", "Faire défiler");
  cue.innerHTML = "<span>Faites défiler</span><i></i>";
  hero.appendChild(cue);
  var vis = true, h = 1, last = -1, ticking = false;
  var measure = function () { h = Math.max(1, hero.offsetHeight); };
  var update = function () {
    ticking = false;
    var p = Math.min(1, Math.max(0, scrollY / (h * 0.85)));
    if (Math.abs(p - last) < 0.002) return;
    last = p;
    hero.style.setProperty("--hp", p.toFixed(3));
  };
  var onScroll = function () { if (vis && !ticking) { ticking = true; requestAnimationFrame(update); } };
  measure(); addEventListener("resize", measure);
  addEventListener("scroll", onScroll, { passive: true });
  if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; }, { rootMargin: "100px" }).observe(hero);
  update();
})();
