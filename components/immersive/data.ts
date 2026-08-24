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
    id: "bodybuilding",
    title: "Musculation",
    image: "/assets/gym.jpg",
    description:
      "Zone musculation : charges lourdes, machines pro Hammer Strength et ambiance intense.",
    equipment: [
      "Charges libres",
      "Machines Hammer",
      "Racks squat",
      "Haltères lourds",
    ],
    params: {
      ss: "9",
      sr: "-0.2, 0.8",
      qs: "1",
    },
  },
  {
    id: "cardio",
    title: "Cardio",
    image: "/assets/gym.jpg",
    description: "Zone Cardio : Machines pro et ambiance intense.",
    equipment: ["Tapis de course", "Racks squat", "Haltères lourds"],
    params: {
      ss: "6",
      sr: "0.5, 2.5",
      qs: "1",
    },
  },
  {
    id: "yoga-pilates",
    title: "Yoga & Pilates Studio",
    image: "/assets/apprendre-yoga.jpeg",
    description:
      "Studio calme et lumineux pour vos séances de yoga, pilates et stretching, avec tapis et accessoires fournis.",
    equipment: ["Tapis yoga", "Blocs & sangles", "Reformer", "Ambiance zen"],
    params: {
      ss: "68",
      sr: "0.2, -2.2",
      qs: "1",
    },
  },
  {
    id: "kickboxing-ring",
    title: "Ring de Kickboxing",
    image: "/assets/kick.webp",
    description:
      "Ring de combat officiel pour entraînements intensifs, sparring, perfectionnement technique et préparation physique.",
    equipment: [
      "Ring surélevé",
      "Coins de ring",
      "Chronomètre round",
      "Sol amortissant",
    ],
    params: {
      ss: "60",
      sr: "-0.2, 0.9",
      qs: "1",
    },
  },
  {
    id: "kickboxing-materiel",
    title: "Espace Matériel Kickboxing",
    image: "/assets/kick2.jpg",
    description:
      "Zone d'équipement complet : rangée de sacs de frappe lourds, paos, boucliers de frappe et racks de protections.",
    equipment: [
      "Sacs de frappe lourds",
      "Paos & Boucliers",
      "Cibles murales",
      "Gants & Bandes",
    ],
    params: {
      ss: "56",
      sr: "0,-1.2",
      qs: "1",
    },
  },
  {
    id: "martial-arts-kids",
    title: "MMA, Taekwondo, Aïkido & Kids",
    image: "/assets/mma.webp",
    description:
      "Espace polyvalent dédié aux arts martiaux et aux jeunes : cage MMA, Dojang Taekwondo, Tatami Aïkido et parcours motricité / gymnastique enfants.",
    equipment: [
      "Section cage & tatamis",
      "Dojang Taekwondo",
      "Tatami Aïkido",
      "Gymnastique enfants",
    ],
    params: {
      ss: "39",
      sr: "-0.9,1.2",
      qs: "1",
    },
  },
];

export const programme = [
  {
    day: "Lundi",
    items: [
      {
        t: "18:00 - 19:00",
        n: "Taekwondo Kids",
        c: "Dojo & Tatami",
        d: "60 min",
        category: "taekwondo" as const,
      },
      {
        t: "19:00 - 20:00",
        n: "Taekwondo",
        c: "Dojo & Tatami",
        d: "60 min",
        category: "taekwondo" as const,
      },
      {
        t: "20:00 - 21:00",
        n: "Brazilian Jiu-Jitsu",
        c: "Dojo & Tatami",
        d: "60 min",
        category: "jjb" as const,
      },
      {
        t: "21:00 - 22:00",
        n: "MMA Kids",
        c: "Cage & Ring",
        d: "60 min",
        category: "mma" as const,
      },
      {
        t: "22:00 - 23:00",
        n: "MMA",
        c: "Cage & Ring",
        d: "60 min",
        category: "mma" as const,
      },
      {
        t: "23:00 - 00:00",
        n: "Condition Physique",
        c: "Plateau & Dojo",
        d: "60 min",
        category: "fitness" as const,
      },
    ],
  },
  {
    day: "Mardi",
    items: [
      {
        t: "17:30 - 18:30",
        n: "Kickboxing Kids",
        c: "Espace Combat",
        d: "60 min",
        category: "kickboxing" as const,
      },
      {
        t: "18:30 - 19:30",
        n: "Kickboxing Juniors",
        c: "Espace Combat",
        d: "60 min",
        category: "kickboxing" as const,
      },
      {
        t: "19:30 - 20:30",
        n: "Kickboxing",
        c: "Espace Combat",
        d: "60 min",
        category: "kickboxing" as const,
      },
      {
        t: "21:00 - 22:00",
        n: "Boxe Anglaise",
        c: "Ring de Boxe",
        d: "60 min",
        category: "boxing" as const,
      },
    ],
  },
  {
    day: "Mercredi",
    items: [
      {
        t: "18:00 - 19:00",
        n: "Taekwondo Kids",
        c: "Dojo & Tatami",
        d: "60 min",
        category: "taekwondo" as const,
      },
      {
        t: "19:00 - 20:00",
        n: "Taekwondo",
        c: "Dojo & Tatami",
        d: "60 min",
        category: "taekwondo" as const,
      },
      {
        t: "20:00 - 21:00",
        n: "Brazilian Jiu-Jitsu",
        c: "Dojo & Tatami",
        d: "60 min",
        category: "jjb" as const,
      },
      {
        t: "21:00 - 22:00",
        n: "MMA Kids",
        c: "Cage & Ring",
        d: "60 min",
        category: "mma" as const,
      },
      {
        t: "22:00 - 23:00",
        n: "MMA",
        c: "Cage & Ring",
        d: "60 min",
        category: "mma" as const,
      },
      {
        t: "23:00 - 00:00",
        n: "Condition Physique",
        c: "Plateau & Dojo",
        d: "60 min",
        category: "fitness" as const,
      },
    ],
  },
  {
    day: "Jeudi",
    items: [
      {
        t: "17:30 - 18:30",
        n: "Kickboxing Kids",
        c: "Espace Combat",
        d: "60 min",
        category: "kickboxing" as const,
      },
      {
        t: "18:30 - 19:30",
        n: "Kickboxing Juniors",
        c: "Espace Combat",
        d: "60 min",
        category: "kickboxing" as const,
      },
      {
        t: "19:30 - 20:30",
        n: "Kickboxing",
        c: "Espace Combat",
        d: "60 min",
        category: "kickboxing" as const,
      },
      {
        t: "21:00 - 22:00",
        n: "Boxe Anglaise",
        c: "Ring de Boxe",
        d: "60 min",
        category: "boxing" as const,
      },
    ],
  },
  {
    day: "Vendredi",
    items: [
      {
        t: "18:00 - 19:00",
        n: "Taekwondo Kids",
        c: "Dojo & Tatami",
        d: "60 min",
        category: "taekwondo" as const,
      },
      {
        t: "19:00 - 20:00",
        n: "Taekwondo",
        c: "Dojo & Tatami",
        d: "60 min",
        category: "taekwondo" as const,
      },
      {
        t: "20:00 - 21:00",
        n: "Brazilian Jiu-Jitsu",
        c: "Dojo & Tatami",
        d: "60 min",
        category: "jjb" as const,
      },
      {
        t: "21:00 - 22:00",
        n: "MMA Kids",
        c: "Cage & Ring",
        d: "60 min",
        category: "mma" as const,
      },
      {
        t: "22:00 - 23:00",
        n: "MMA",
        c: "Cage & Ring",
        d: "60 min",
        category: "mma" as const,
      },
      {
        t: "23:00 - 00:00",
        n: "Condition Physique",
        c: "Plateau & Dojo",
        d: "60 min",
        category: "fitness" as const,
      },
    ],
  },
  {
    day: "Samedi",
    items: [
      {
        t: "16:00 - 17:30",
        n: "Boxe Anglaise",
        c: "Ring de Boxe",
        d: "90 min",
        category: "boxing" as const,
      },
    ],
  },
  {
    day: "Dimanche",
    items: [
      {
        t: "11:00 - 12:00",
        n: "Kickboxing Kids",
        c: "Espace Combat",
        d: "60 min",
        category: "kickboxing" as const,
      },
      {
        t: "12:00 - 13:00",
        n: "Kickboxing Juniors",
        c: "Espace Combat",
        d: "60 min",
        category: "kickboxing" as const,
      },
      {
        t: "13:00 - 15:00",
        n: "Kickboxing",
        c: "Ring & Espace Combat",
        d: "120 min",
        category: "kickboxing" as const,
      },
    ],
  },
];

export const options = [
  {
    name: "Coaching Personnel",
    price: "150 DH / séance",
    desc: "Séance individuelle avec un coach certifié, bilan morphologique et suivi personnalisé.",
  },
  {
    name: "Pack Arts Martiaux & Boxe",
    price: "Inclus",
    desc: "Accès au ring, cours de Kickboxing, MMA, Taekwondo et sacs de frappe.",
  },
  {
    name: "Vestiaires & Douches",
    price: "Inclus",
    desc: "Casiers sécurisés, vestiaires spacieux et douches chaudes quotidiennes.",
  },
  {
    name: "Bilan InBody & Suivi",
    price: "Offert",
    desc: "Analyse de composition corporelle et suivi de votre progression.",
  },
];

export interface PlanRate {
  label: string;
  price: string;
  period: string;
  note?: string;
}

export interface Plan {
  id: string;
  name: string;
  subtitle?: string;
  price: string;
  period: string;
  badge?: string;
  insuranceNote?: string;
  tag?: string;
  rates?: PlanRate[];
  features: string[];
  featured?: boolean;
}

export const plans: Plan[] = [
  {
    id: "muscu-cardio",
    name: "Musculation & Cardio",
    subtitle: "Accès libre aux plateaux machines & charges lourdes",
    price: "300",
    period: "DHS / mois",
    badge: "Formule Club",
    rates: [
      { label: "1 Mois", price: "300", period: "DHS / mois" },
      { label: "3 Mois", price: "750", period: "DHS / 3 mois", note: "250 DH/mois" },
      { label: "6 Mois", price: "1400", period: "DHS / 6 mois", note: "233 DH/mois" },
      { label: "12 Mois", price: "2500", period: "DHS / 12 mois", note: "208 DH/mois - Meilleur Tarif" },
    ],
    features: [
      "Plateau Musculation & charges libres Hammer Strength",
      "Espace Cardio-Training haute performance",
      "Formules au choix : 1, 3, 6 ou 12 mois",
      "Vestiaires & douches inclus",
    ],
    featured: true,
  },
  {
    id: "arts-martiaux",
    name: "Arts Martiaux",
    subtitle: "MMA, Boxe Anglaise, Kickboxing...",
    price: "200",
    period: "DHS / mois",
    badge: "Combat",
    tag: "Une discipline au choix",
    insuranceNote: "+ 100 DHS frais d'assurance (à payer uniquement le premier mois)",
    features: [
      "1 discipline au choix : MMA, Boxe, Kickboxing...",
      "Accès au ring de combat officiel & sacs de frappe",
      "Coaching technique & sparring encadré",
      "Tous niveaux acceptés, du débutant au confirmé",
    ],
    featured: false,
  },
  {
    id: "femmes",
    name: "Cours Collectifs 100% Femmes",
    subtitle: "Séances exclusives réservées aux femmes",
    price: "200",
    period: "DHS / mois",
    badge: "100% Femmes",
    insuranceNote: "+ 100 DHS frais d'assurance (à payer uniquement le premier mois)",
    features: [
      "Espace & séances 100% réservés aux femmes",
      "Fitness dynamique, renforcement & cardio",
      "Coachs professionnelles & ambiance conviviale",
      "Programmes variés et adaptés à vos objectifs",
    ],
    featured: false,
  },
  {
    id: "gym-ballet",
    name: "Gymnastique ou Ballet",
    subtitle: "Gymnastique artistique ou danse classique",
    price: "350",
    period: "DHS / mois",
    badge: "Kids & Adultes",
    insuranceNote: "+ 150 DHS d'assurance (à payer uniquement le premier mois)",
    features: [
      "Discipline au choix : Gymnastique ou Ballet",
      "Développement de la souplesse, grâce et motricité",
      "Encadrement pédagogique qualifié et attentionné",
      "Idéal pour enfants, ados et adultes",
    ],
    featured: false,
  },
  {
    id: "yoga-pilates",
    name: "Yoga & Pilates",
    subtitle: "Renforcement profond, mobilité & sérénité",
    price: "350",
    period: "DHS / mois",
    badge: "Zen & Posture",
    insuranceNote: "+ 150 DHS d'assurance (à payer uniquement le premier mois)",
    features: [
      "Séances de Yoga postural et Pilates",
      "Studio zen calme, tapis et accessoires fournis",
      "Renforcement du tronc, respiration & décompression",
      "Amélioration de la flexibilité et réduction du stress",
    ],
    featured: false,
  },
  {
    id: "yoga-aerien",
    name: "Yoga Aérien",
    subtitle: "Pratique en suspension dans des hamacs",
    price: "500",
    period: "DHS / mois",
    badge: "Exclusivité",
    tag: "Ou 180 DHS / séance",
    features: [
      "Séances en apesanteur avec hamacs sécurisés",
      "Décompression vertébrale & étirements profonds",
      "Disponible en abonnement mensuel (500 DHS)",
      "Possibilité de paiement à la séance (180 DHS)",
    ],
    featured: false,
  },
];

export const hours = [
  { d: "Lundi — Vendredi", h: "10:00 — 01:00" },
  { d: "Samedi", h: "10:00 — 18:00" },
  { d: "Dimanche", h: "10:00 — 18:00" },
];
