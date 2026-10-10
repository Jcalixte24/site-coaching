// Données du site : coordonnées, packs, offre entreprises.
// Source : Offre Coaching Express V2, Offre Générale Acquisition Talents (dossier sources/).

export const SITE = {
  name: "Cassandra Touré",
  tagline: "Talents & Coaching",
  // Domaine définitif à confirmer avec la cliente ; GitHub Pages en attendant.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://jcalixte24.github.io/site-coaching",
  city: "Abidjan, Côte d'Ivoire",
  email: "macassandra.toure@gmail.com",
  phoneDisplay: "+225 07 19 50 95 26",
  phoneIntl: "2250719509526",
};

export function waLink(text?: string) {
  const base = `https://wa.me/${SITE.phoneIntl}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

// Prix affiché d'un pack : « 25 000 XOF / mois » pour les parcours mensuels
export function priceLabel(p: { price: number; monthly?: boolean }) {
  return xof(p.price) + (p.monthly ? "\u00a0/\u00a0mois" : "");
}

export function xof(n: number) {
  // Espaces insécables : un prix ne se coupe jamais en fin de ligne.
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0") + "\u00a0XOF";
}

export type PackId = "basic" | "standard" | "premium" | "diamond" | "gold" | "vip";

export type Pack = {
  id: PackId;
  name: string;
  price: number;
  subtitle: string;
  want: string; // phrase « Je veux… »
  short: string; // résumé une ligne (formulaire)
  plus: string; // ce que la marche ajoute par rapport à la précédente (escalier des packs)
  gets: string[]; // ce que vous obtenez
  detailTitle: "Vos livrables" | "En pratique";
  details: string[];
  visio: boolean;
  monthly?: boolean; // prix par mois (Gold, VIP : parcours de 3 mois)
  diagnostic: "approfondi";
  featured?: boolean;
};

export const PACKS: Pack[] = [
  {
    id: "basic",
    plus: "Diagnostic approfondi + plan d'action",
    name: "Basic",
    price: 5000,
    subtitle: "Voir clair et savoir quoi faire",
    want: "Je veux un plan clair pour avancer.",
    short: "Diagnostic approfondi, conseils et plan d'action global",
    gets: [
      "Diagnostic de profil approfondi : forces, compétences, valeurs, axes de progression",
      "Conseils et recommandations personnalisés",
      "Plan d'action global, étape par étape",
    ],
    detailTitle: "Vos livrables",
    details: [
      "Fiche diagnostic de profil (PDF)",
      "Plan d'action global priorisé",
      "Recommandations ciblées : CV, LinkedIn, entretien, réseau",
    ],
    visio: false,
    diagnostic: "approfondi",
  },
  {
    id: "standard",
    plus: "+ Livrables sur-mesure",
    name: "Standard",
    price: 7000,
    subtitle: "Avoir les outils pour agir",
    want: "Je veux mes outils : CV, LinkedIn, pitch, business model…",
    short: "Diagnostic + livrables selon votre objectif (CV, LinkedIn, pitch, business model…)",
    gets: [
      "Diagnostic de profil",
      "Accompagnement personnalisé : un plan construit pour VOTRE objectif",
      "Outils concrets, remis sous forme de livrables",
    ],
    detailTitle: "Vos livrables",
    details: [
      "Emploi : CV optimisé ATS, lettre, LinkedIn, pitch 30 s",
      "CV & entretien : trame de réponses, méthode STAR",
      "Développement perso : plan, objectifs SMART",
      "Entrepreneuriat : Business Model Canvas, feuille de route",
    ],
    visio: false,
    diagnostic: "approfondi",
    featured: true,
  },
  {
    id: "premium",
    plus: "+ 2 séances visio",
    name: "Premium",
    price: 12000,
    subtitle: "Être accompagné pas à pas",
    want: "Je veux être coaché en direct et m'entraîner.",
    short: "Pack Standard + 2 séances individuelles en visio",
    gets: [
      "Tout le pack Standard",
      "2 séances individuelles en visio",
      "Accompagnement à la prise en main et à la mise en œuvre de vos outils",
    ],
    detailTitle: "En pratique",
    details: [
      "Séance 1 : cadrage, priorités, validation du plan",
      "Séance 2 : mise en situation (simulation d'entretien, répétition du pitch) et feedback",
      "Livrables ajustés après vos retours",
    ],
    visio: true,
    diagnostic: "approfondi",
  },
  {
    id: "diamond",
    plus: "+ Suivi sur 1 mois",
    name: "Diamond",
    price: 18000,
    subtitle: "Tenir dans la durée",
    want: "Je veux un suivi pour ne pas lâcher.",
    short: "Pack Premium + suivi d'1 mois sur WhatsApp",
    gets: ["Tout le pack Premium", "Suivi sur 1 mois"],
    detailTitle: "En pratique",
    details: [
      "Points d'avancement réguliers sur WhatsApp",
      "Ajustement de votre plan d'action",
      "Retours sur vos candidatures ou vos avancées",
      "Bilan de fin de mois et prochaines étapes",
    ],
    visio: true,
    diagnostic: "approfondi",
  },
  {
    id: "gold",
    plus: "+ 3 mois, 5 séances, 3 ateliers",
    name: "Gold",
    price: 25000,
    subtitle: "Un suivi sur 3 mois",
    want: "Je veux une transformation complète : séances, ateliers, suivi 3 mois.",
    short: "Suivi 3 mois + 5 séances visio + 3 ateliers + livre offert",
    gets: ["Suivi sur 3 mois", "5 séances individuelles en visio", "3 ateliers interactifs", "Livre offert"],
    detailTitle: "En pratique",
    details: [
      "Ateliers : CV & LinkedIn, entretien, pitch (selon votre objectif)",
      "Livre offert : « Aller au bout de son idée »",
    ],
    visio: true,
    monthly: true,
    diagnostic: "approfondi",
  },
  {
    id: "vip",
    plus: "+ Sur-mesure et réseau",
    name: "VIP",
    price: 30000,
    subtitle: "Le parcours sur-mesure",
    want: "Je veux un parcours 100 % sur-mesure et un réseau.",
    short: "Parcours sur-mesure 3 mois + aide au réseautage",
    gets: ["Parcours personnalisé sur 3 mois", "Aide au réseautage et au développement"],
    detailTitle: "En pratique",
    details: [
      "Cartographie de vos cibles : entreprises, recruteurs, partenaires",
      "Messages de prise de contact et pitch de réseautage",
      "Plan de développement de votre réseau et de votre visibilité",
    ],
    visio: true,
    monthly: true,
    diagnostic: "approfondi",
  },
];

export const OBJECTIFS = [
  {
    name: "Recherche d'emploi",
    livrables: [
      "CV optimisé ATS",
      "Lettre de motivation personnalisée",
      "Profil LinkedIn optimisé",
      "Pitch de présentation (30 secondes)",
    ],
  },
  {
    name: "CV & entretien",
    livrables: [
      "Trame de réponses aux questions clés",
      "Méthode STAR pour structurer vos réponses",
      "« Parlez-moi de vous » : votre pitch",
      "Questions à poser au recruteur",
    ],
  },
  {
    name: "Développement personnel",
    livrables: [
      "Plan de développement personnel",
      "Objectifs SMART",
      "Tableau de suivi de vos habitudes",
      "Travail sur la confiance en soi",
    ],
  },
  {
    name: "Entrepreneuriat",
    livrables: [
      "Fiche de cadrage : problème, cible, offre",
      "Business Model Canvas",
      "Pitch de votre projet",
      "Feuille de route de lancement",
    ],
  },
];

export const STATS = [
  { n: "8+", l: "ans d'expérience" },
  { n: "50+", l: "ateliers conçus et animés" },
  { n: "300+", l: "bénéficiaires accompagnés" },
];

export const TALENT = {
  price: 200000,
  newClientPrice: 140000,
  discount: 30,
};
