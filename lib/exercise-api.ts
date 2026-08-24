export interface Exercise {
  id: string;
  name: string;
  force?: "pull" | "push" | "static" | string | null;
  level: "beginner" | "intermediate" | "expert" | string;
  mechanic?: "compound" | "isolation" | string | null;
  equipment: string | null;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  instructions: string[];
  category: string;
  images: string[];
}

export const MUSCLE_TRANSLATIONS: Record<string, string> = {
  abdominals: "Abdominaux",
  abductors: "Abducteurs",
  adductors: "Adducteurs",
  biceps: "Biceps",
  calves: "Mollets",
  chest: "Pectoraux",
  forearms: "Avant-bras",
  glutes: "Fessiers",
  hamstrings: "Ischio-jambiers",
  lats: "Grand dorsal",
  "lower back": "Bas du dos",
  "middle back": "Milieu du dos",
  neck: "Cou",
  quadriceps: "Quadriceps",
  shoulders: "Épaules",
  traps: "Trapèzes",
  triceps: "Triceps",
};

export const EQUIPMENT_TRANSLATIONS: Record<string, string> = {
  "body only": "Poids du corps",
  barbell: "Barre olympique",
  dumbbell: "Haltères",
  cable: "Poulie",
  machine: "Machine guidée",
  kettlebells: "Kettlebell",
  bands: "Élastique",
  "medicine ball": "Médecine-ball",
  "exercise ball": "Ballon suisse",
  "e-z curl bar": "Barre EZ",
  other: "Autre",
};

export const LEVEL_TRANSLATIONS: Record<string, { label: string; color: string }> = {
  beginner: { label: "Débutant", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  intermediate: { label: "Intermédiaire", color: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
  expert: { label: "Avancé", color: "bg-rose-500/15 text-rose-400 border-rose-500/30" },
};

export function getExerciseImageUrl(imagePath: string): string {
  if (!imagePath) return "/assets/logo_dynamo.png";
  if (imagePath.startsWith("http")) return imagePath;
  return `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${imagePath}`;
}

// Built-in curated fallback in case of network issues
const FALLBACK_EXERCISES: Exercise[] = [
  {
    id: "Barbell_Bench_Press",
    name: "Barbell Bench Press (Développé Couché)",
    force: "push",
    level: "intermediate",
    mechanic: "compound",
    equipment: "barbell",
    primaryMuscles: ["chest"],
    secondaryMuscles: ["shoulders", "triceps"],
    instructions: [
      "Allongez-vous sur le banc plat, les yeux sous la barre.",
      "Saisissez la barre avec une prise légèrement plus large que la largeur des épaules.",
      "Décrochez la barre et descendez-la de manière contrôlée jusqu'au milieu de la poitrine.",
      "Poussez la barre vers le haut en expirant jusqu'à l'extension presque complète des bras.",
      "Gardez les pieds ancrés au sol et les omoplates resserrées tout au long du mouvement."
    ],
    category: "strength",
    images: ["Barbell_Bench_Press_-_Medium_Grip/0.jpg", "Barbell_Bench_Press_-_Medium_Grip/1.jpg"]
  },
  {
    id: "Barbell_Squat",
    name: "Barbell Squat (Squat à la barre)",
    force: "push",
    level: "intermediate",
    mechanic: "compound",
    equipment: "barbell",
    primaryMuscles: ["quadriceps"],
    secondaryMuscles: ["glutes", "hamstrings", "calves", "lower back"],
    instructions: [
      "Placez la barre sur le haut de vos trapèzes, pieds écartés à la largeur des épaules.",
      "Descendez en fléchissant les genoux et en poussant les hanches vers l'arrière.",
      "Descendez jusqu'à ce que vos cuisses soient parallèles au sol.",
      "Poussez sur vos talons pour revenir à la position de départ en maintenant le buste droit."
    ],
    category: "strength",
    images: ["Barbell_Squat/0.jpg", "Barbell_Squat/1.jpg"]
  },
  {
    id: "Dumbbell_Bicep_Curl",
    name: "Dumbbell Bicep Curl (Curl Haltères)",
    force: "pull",
    level: "beginner",
    mechanic: "isolation",
    equipment: "dumbbell",
    primaryMuscles: ["biceps"],
    secondaryMuscles: ["forearms"],
    instructions: [
      "Debout, tenez un haltère dans chaque main, paumes vers l'avant.",
      "Gardez les coudes près du torse et contractez les biceps pour lever les haltères.",
      "Montez jusqu'à contraction maximale au niveau des épaules.",
      "Redescendez lentement et contrôlez la phase excentrique."
    ],
    category: "strength",
    images: ["Dumbbell_Bicep_Curl/0.jpg", "Dumbbell_Bicep_Curl/1.jpg"]
  },
  {
    id: "Lat_Pulldown",
    name: "Lat Pulldown (Tirage Vertical Poitrine)",
    force: "pull",
    level: "beginner",
    mechanic: "compound",
    equipment: "cable",
    primaryMuscles: ["lats"],
    secondaryMuscles: ["biceps", "shoulders", "middle back"],
    instructions: [
      "Asseyez-vous sur la machine de tirage vertical et ajustez le boudin pour vos cuisses.",
      "Saisissez la barre large en prise pronation.",
      "Tirez la barre vers le haut de votre poitrine en serrant les omoplates vers le bas.",
      "Contrôlez le retour vers le haut sans relâcher la tension dans les dorsaux."
    ],
    category: "strength",
    images: ["Wide-Grip_Lat_Pulldown/0.jpg", "Wide-Grip_Lat_Pulldown/1.jpg"]
  },
  {
    id: "Dumbbell_Shoulder_Press",
    name: "Dumbbell Shoulder Press (Développé Épaules)",
    force: "push",
    level: "intermediate",
    mechanic: "compound",
    equipment: "dumbbell",
    primaryMuscles: ["shoulders"],
    secondaryMuscles: ["triceps", "traps"],
    instructions: [
      "Asseyez-vous sur un banc avec dossier à 90°, un haltère dans chaque main au niveau des épaules.",
      "Poussez les haltères vers le haut jusqu'à ce que les bras soient tendus au-dessus de la tête.",
      "Faites une courte pause au sommet, puis redescendez lentement jusqu'au niveau des oreilles."
    ],
    category: "strength",
    images: ["Dumbbell_Shoulder_Press/0.jpg", "Dumbbell_Shoulder_Press/1.jpg"]
  },
  {
    id: "Triceps_Pushdown",
    name: "Cable Triceps Pushdown (Extension Triceps Poulie)",
    force: "push",
    level: "beginner",
    mechanic: "isolation",
    equipment: "cable",
    primaryMuscles: ["triceps"],
    secondaryMuscles: ["forearms"],
    instructions: [
      "Fixez une corde ou une barre à la poulie haute.",
      "Coudes collés aux flancs, poussez la barre ou la corde vers le bas en tendant complètement les bras.",
      "Contractez fort les triceps en bas du mouvement, puis revenez lentement à 90°."
    ],
    category: "strength",
    images: ["Triceps_Pushdown/0.jpg", "Triceps_Pushdown/1.jpg"]
  },
  {
    id: "Leg_Press",
    name: "Leg Press (Presse à Cuisses)",
    force: "push",
    level: "beginner",
    mechanic: "compound",
    equipment: "machine",
    primaryMuscles: ["quadriceps"],
    secondaryMuscles: ["glutes", "hamstrings", "calves"],
    instructions: [
      "Installez-vous sur la presse à cuisses, dos et tête bien calés contre le dossier.",
      "Placez vos pieds au milieu du plateau, écartés à la largeur des épaules.",
      "Déverrouillez la sécurité et fléchissez les genoux pour amener le plateau vers vous à environ 90°.",
      "Poussez avec les talons pour repousser la charge sans verrouiller complètement les genoux."
    ],
    category: "strength",
    images: ["Leg_Press/0.jpg", "Leg_Press/1.jpg"]
  },
  {
    id: "Plank",
    name: "Gainage Planche (Plank)",
    force: "static",
    level: "beginner",
    mechanic: "isolation",
    equipment: "body only",
    primaryMuscles: ["abdominals"],
    secondaryMuscles: ["shoulders", "glutes", "lower back"],
    instructions: [
      "Placez-vous au sol en appui sur les avant-bras et la pointe des pieds.",
      "Alignez les chevilles, le bassin et les épaules en maintenant le dos droit.",
      "Contractez activement les abdominaux et les fessiers sans cambrer le dos.",
      "Maintenez la position pendant 30 à 60 secondes en respirant régulièrement."
    ],
    category: "strength",
    images: ["Plank/0.jpg", "Plank/1.jpg"]
  }
];

let cachedExercises: Exercise[] | null = null;

export async function fetchExercises(): Promise<Exercise[]> {
  if (cachedExercises && cachedExercises.length > 0) {
    return cachedExercises;
  }

  const urls = [
    "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/dist/exercises.json",
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json",
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url, { cache: "force-cache" });
      if (res.ok) {
        const data = (await res.json()) as Exercise[];
        if (Array.isArray(data) && data.length > 0) {
          cachedExercises = data;
          return data;
        }
      }
    } catch {
      // try next URL
    }
  }

  // Fallback if all fetch attempts fail
  cachedExercises = FALLBACK_EXERCISES;
  return FALLBACK_EXERCISES;
}
