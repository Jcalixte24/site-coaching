// Transforme l'export statique Next (out/) en aperçu autonome (preview/dist/) :
// liens relatifs, CSS et polices locales, scripts Next retirés, remplacés par preview.js.
// Usage : PREVIEW_EXPORT=1 npx next build && node preview/build-preview.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "out");
const DIST = path.join(ROOT, "preview", "dist");

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(path.join(DIST, "assets", "media"), { recursive: true });

// CSS : un seul fichier, URLs de polices relatives
const cssDir = path.join(OUT, "_next", "static", "css");
let css = fs.readdirSync(cssDir).map((f) => fs.readFileSync(path.join(cssDir, f), "utf8")).join("\n");
css = css.replace(/\/_next\/static\/media\//g, "media/");
css += `
/* Aperçu : apparition seulement pour ce qui est hors écran au chargement */
.pv-wait{opacity:0;transform:translateY(18px);transition:opacity .6s var(--ease),transform .6s var(--ease)}
.pv-wait.on{opacity:1;transform:none}
`;
fs.writeFileSync(path.join(DIST, "assets", "site.css"), css);
for (const f of fs.readdirSync(path.join(OUT, "_next", "static", "media"))) {
  fs.copyFileSync(path.join(OUT, "_next", "static", "media", f), path.join(DIST, "assets", "media", f));
}
fs.copyFileSync(path.join(OUT, "icon.svg"), path.join(DIST, "assets", "icon.svg"));
fs.copyFileSync(path.join(ROOT, "preview", "preview.js"), path.join(DIST, "assets", "preview.js"));

function rel(prefix, href) {
  const m = href.match(/^([^?#]*)([?#].*)?$/);
  let p = m[1].replace(/^\/+|\/+$/g, "");
  const tail = m[2] || "";
  return prefix + (p ? p + "/" : "") + "index.html" + tail;
}

const pages = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === "_next" || e.name === "404") continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else if (e.name === "index.html") pages.push(full);
  }
})(OUT);

for (const file of pages) {
  const relDir = path.relative(OUT, path.dirname(file));
  const depth = relDir ? relDir.split(path.sep).length : 0;
  const prefix = "../".repeat(depth);
  let html = fs.readFileSync(file, "utf8");

  // Scripts Next (hydratation, flight data) retirés ; JSON-LD conservé
  html = html.replace(/<script\b(?![^>]*application\/ld\+json)[^>]*>[\s\S]*?<\/script>/g, "");
  html = html.replace(/<link[^>]*rel="(?:preload|modulepreload)"[^>]*>/g, "");
  html = html.replace(/<link[^>]*rel="manifest"[^>]*>/g, "");
  html = html.replace(/<link rel="stylesheet" href="\/_next\/[^"]*"[^>]*>/g, "");
  html = html.replace(/<link rel="icon"[^>]*>/g, "");
  // Ouverture jouée une seule fois par visite (même logique que app/layout.tsx)
  html = html.replace(
    "</head>",
    `<script>var d=document.documentElement;try{if(sessionStorage.getItem('ov')){d.classList.add('ov-vu')}else{sessionStorage.setItem('ov','1');d.classList.add('ov-on')}}catch(e){d.classList.add('ov-vu')}</script></head>`
  );
  html = html.replace("</head>", `<link rel="stylesheet" href="${prefix}assets/site.css"><link rel="icon" href="${prefix}assets/icon.svg"></head>`);
  // Liens internes absolus → relatifs
  html = html.replace(/href="(\/(?!\/)[^"]*)"/g, (_, h) => `href="${rel(prefix, h)}"`);
  html = html.replace("<html ", `<html data-root="${prefix}" `);
  html = html.replace("</body>", `<script src="${prefix}assets/preview.js"></script></body>`);

  const dest = path.join(DIST, relDir, "index.html");
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, html);
}
console.log(`${pages.length} pages → ${DIST}`);
