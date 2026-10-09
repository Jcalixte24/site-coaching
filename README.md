# Site vitrine Cassandra Touré · Talents & Coaching

Next.js 15 (App Router), CSS pur, aucune dépendance en plus de Next/React. Toutes les pages sont statiques.

## Lancer

```
npm install
npm run dev      # http://localhost:3000
npm run build
```

Variable d'environnement : `NEXT_PUBLIC_SITE_URL` (domaine final, sert au SEO, au sitemap et aux balises canonical).

## Où changer quoi

- **Charte** : bloc `:root` en haut de `app/globals.css` (bleu nuit, doré, polices).
- **Coordonnées, packs, tarifs** : `lib/site.ts`.
- **Témoignages** : `lib/testimonials.ts` (la section de l'accueil reste masquée tant que la liste est vide).

## État (phase 1, lot 1)

Fait : structure, charte, en-tête, menu mobile, bouton WhatsApp flottant, Accueil, Coaching, Packs + test « Quel pack ? »,
Inscription (portage du formulaire HTML, pack prérempli via `?pack=`), Paiement, Entreprises, Demande de recrutement
(estimation en direct), À propos, FAQ, Contact, Mentions légales, Connexion (page d'attente), sitemap, robots, manifest PWA.

Reste à faire :
1. Diagnostic en ligne standard + approfondi (Supabase, table `diagnostics`, sauvegarde auto, reprise). `/coaching/diagnostic` est une page d'attente.
2. Demande de recrutement : enregistrement dans Supabase + notification (pour l'instant : message WhatsApp ou e-mail prérempli).
3. Contenus client : photo, logo, témoignages, réponses FAQ à valider, mentions légales (statut, adresse), durée de conservation des données, domaine.
