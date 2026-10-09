# Site vitrine Cassandra Touré · Talents & Coaching

Site statique en **HTML et CSS**, avec un seul petit script sans framework. Aucune compilation, aucune dépendance :
les fichiers se publient tels quels sur Netlify ou GitHub Pages.

## Structure

```
index.html                    Accueil
coaching/                     Coaching Express (+ packs/, diagnostic/, inscription/)
entreprises/                  Acquisition de talents (+ demande/)
a-propos/ paiement/ faq/ contact/ mentions-legales/ connexion/
assets/css/style.css          Toute la charte et tous les styles
assets/js/main.js             Menu, ouverture, escalier des packs, test « Quel pack ? », formulaires → WhatsApp
assets/icon.svg               Icône
sitemap.xml robots.txt manifest.webmanifest
netlify.toml                  Config Netlify (en-têtes de sécurité, cache)
.github/workflows/pages.yml   Publication automatique sur GitHub Pages
```

Chaque page est un dossier avec son `index.html` : les adresses restent propres (`/coaching/packs/`)
et les liens sont relatifs, donc le site marche à la racine d'un domaine (Netlify) comme dans un sous-dossier (GitHub Pages).

## Voir le site en local

Les liens pointent vers des dossiers : ouvrez le site avec un petit serveur plutôt qu'en double-cliquant.

```
python -m http.server 8000
```

puis http://localhost:8000

## Publier

- **Netlify** : « Add new site » → importer ce dépôt. Pas de commande de build, dossier de publication `.` (déjà dans `netlify.toml`).
- **GitHub Pages** : Settings → Pages → Source : **GitHub Actions**. Chaque push sur `main` publie le site.

## Modifier

- **Charte** (bleu nuit, doré, polices) : bloc `:root` en haut de `assets/css/style.css`.
- **Textes** : directement dans le HTML de chaque page. L'en-tête et le pied de page sont répétés dans chaque page :
  une modification de menu se reporte dans les 13 fichiers.
- **Prix des packs** : dans le HTML (accueil, packs, inscription) et dans la liste `PACKS` en haut de `assets/js/main.js`.
- **Domaine** : les balises `canonical` / `og:url` et `sitemap.xml` pointent vers GitHub Pages ; à remplacer par le domaine final.

## À venir

Diagnostic en ligne avec sauvegarde (phase 1, étape 4) et enregistrement des demandes : ils demanderont un service
de stockage (Supabase ou formulaires Netlify). La version Next.js de départ est conservée sur la branche `nextjs`.
