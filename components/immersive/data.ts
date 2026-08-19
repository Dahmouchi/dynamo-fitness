export type Space = {
  id: string;
  title: string;
  image: string;
  description: string;
  equipment: string[];
  params?: Record<string, string>;
};

export const spaces: Space[] = [
  {
    id: "martial-arts",
    title: "Martial Arts",
    image: "/assets/space-martial.jpg",
    description:
      "Espace dédié aux arts martiaux : boxe, kickboxing, MMA et self-défense encadrés par des coachs certifiés.",
    equipment: ["Ring", "Sacs de frappe", "Tatamis", "Gants & protections"],
    params: {
      ss: "1",
    },
  },
  {
    id: "bodybuilding",
    title: "Bodybuilding 100% Men",
    image: "/assets/space-bodybuilding.jpg",
    description:
      "Zone musculation exclusive hommes : charges lourdes, machines pro et ambiance intense pour se dépasser.",
    equipment: [
      "Charges libres",
      "Machines Hammer",
      "Racks squat",
      "Haltères lourds",
    ],
    params: {
      ss: "112",
    },
  },
  {
    id: "kids",
    title: "Kid's Gymnastics",
    image: "/assets/space-kids.jpg",
    description:
      "Espace gymnastique enfants : parcours motricité, trampoline et cours encadrés pour les 4-12 ans.",
    equipment: ["Trampoline", "Poutre", "Tapis", "Parcours motricité"],
    params: {
      ss: "10",
    },
  },
  {
    id: "yoga-pilates",
    title: "Yoga et Pilates",
    image: "/assets/space-yoga.jpg",
    description:
      "Studio calme et lumineux pour vos séances de yoga, pilates et stretching, avec tapis et accessoires fournis.",
    equipment: ["Tapis yoga", "Blocs & sangles", "Reformer", "Ambiance zen"],
    params: {
      ss: "20",
    },
  },
];

export const programme = [
  {
    day: "Lundi",
    items: [
      { t: "07:00", n: "HIIT Express", c: "Studio 1", d: "30 min" },
      { t: "12:30", n: "Cycling Ride", c: "Studio 2", d: "45 min" },
      { t: "19:00", n: "Cross Training", c: "Plateau", d: "60 min" },
    ],
  },
  {
    day: "Mardi",
    items: [
      { t: "08:00", n: "Body Sculpt", c: "Studio 1", d: "45 min" },
      { t: "18:30", n: "Boxing Fit", c: "Ring", d: "50 min" },
    ],
  },
  {
    day: "Mercredi",
    items: [
      { t: "07:30", n: "Yoga Flow", c: "Studio 2", d: "60 min" },
      { t: "19:30", n: "Full Body", c: "Plateau", d: "55 min" },
    ],
  },
  {
    day: "Jeudi",
    items: [
      { t: "12:15", n: "Abdos Fessiers", c: "Studio 1", d: "30 min" },
      { t: "20:00", n: "Cycling Night", c: "Studio 2", d: "45 min" },
    ],
  },
  {
    day: "Vendredi",
    items: [
      { t: "07:00", n: "Cardio Burn", c: "Studio 1", d: "40 min" },
      { t: "18:00", n: "Cross Challenge", c: "Plateau", d: "60 min" },
    ],
  },
];

export const options = [
  {
    name: "Coaching personnel",
    price: "45 €/séance",
    desc: "Séance individuelle avec un coach diplômé, bilan et plan d'entraînement.",
  },
  {
    name: "Espace Wellness",
    price: "9,90 €/mois",
    desc: "Sauna, hammam et zone de récupération avec pistolet massant.",
  },
  {
    name: "Multi-clubs",
    price: "5 €/mois",
    desc: "Accès illimité aux 280 clubs du réseau en France.",
  },
  {
    name: "Bilan InBody",
    price: "Offert",
    desc: "Analyse de composition corporelle tous les 30 jours.",
  },
];

export const plans = [
  {
    name: "Essential",
    price: "19,95",
    period: "/mois",
    features: [
      "Accès illimité au club",
      "Application mobile",
      "Sans engagement",
    ],
    featured: false,
  },
  {
    name: "Premium",
    price: "29,95",
    period: "/mois",
    features: [
      "Accès illimité 280 clubs",
      "Cours collectifs illimités",
      "Espace Wellness inclus",
      "1 coaching offert",
    ],
    featured: true,
  },
  {
    name: "Black",
    price: "39,95",
    period: "/mois",
    features: [
      "Tout Premium inclus",
      "4 coachings / mois",
      "Invité gratuit",
      "Programme nutrition",
    ],
    featured: false,
  },
];

export const hours = [
  { d: "Lundi — Vendredi", h: "10:00 — 01:00" },
  { d: "Samedi", h: "10:00 — 18:00" },
  { d: "Dimanche", h: "10:00 — 18:00" },
];
