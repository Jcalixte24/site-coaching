"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Fait défiler un chiffre (« 300+ », « 92 % ») de 0 à sa valeur.
function countUp(el: HTMLElement) {
  const m = (el.dataset.final ?? el.textContent ?? "").match(/^(\d+)(.*)$/);
  if (!m) return;
  const target = +m[1];
  const t0 = performance.now();
  const step = (t: number) => {
    const k = Math.min(1, (t - t0) / 1400);
    el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3))) + m[2];
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// Un seul IntersectionObserver : ajoute .on aux éléments .rv et lance les compteurs .count à leur arrivée à l'écran.
export default function Reveal() {
  const path = usePathname();
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".rv:not(.on)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("on"));
      return;
    }
    const counters = reduce
      ? []
      : Array.from(document.querySelectorAll<HTMLElement>(".count")).filter(
          (el) => el.getBoundingClientRect().top > window.innerHeight
        );
    counters.forEach((el) => {
      el.dataset.final = el.textContent ?? "";
      el.textContent = (el.textContent ?? "").replace(/^\d+/, "0");
    });
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          if (el.classList.contains("count")) countUp(el);
          else el.classList.add("on");
          obs.unobserve(el);
        }),
      { threshold: 0.1, rootMargin: "0px 0px -24px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    counters.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [path]);

  // Un clic passe l'ouverture
  useEffect(() => {
    const ov = document.getElementById("ouverture");
    const skip = () => ov?.classList.add("skip");
    ov?.addEventListener("click", skip);
    return () => ov?.removeEventListener("click", skip);
  }, []);

  // Carte talent : légère inclinaison 3D qui suit la souris (souris uniquement)
  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]"));
    const offs = cards.map((c) => {
      const move = (e: MouseEvent) => {
        const r = c.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        c.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 12}deg)`;
      };
      const leave = () => (c.style.transform = "");
      c.addEventListener("mousemove", move);
      c.addEventListener("mouseleave", leave);
      return () => {
        c.removeEventListener("mousemove", move);
        c.removeEventListener("mouseleave", leave);
      };
    });
    return () => offs.forEach((f) => f());
  }, [path]);
  return null;
}
