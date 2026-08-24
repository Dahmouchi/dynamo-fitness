"use client";

import { useEffect, useState } from "react";
import {
  X,
  Dumbbell,
  Layers,
  Activity,
  Flame,
  CheckCircle2,
  Play,
  Pause,
  MessageCircle,
  Sparkles,
  Info,
} from "lucide-react";
import type { Exercise } from "@/lib/exercise-api";
import {
  getExerciseImageUrl,
  MUSCLE_TRANSLATIONS,
  EQUIPMENT_TRANSLATIONS,
  LEVEL_TRANSLATIONS,
} from "@/lib/exercise-api";

interface ExerciseDetailsSidebarProps {
  exercise: Exercise | null;
  onClose: () => void;
  isMobile?: boolean;
}

export function ExerciseDetailsSidebar({
  exercise,
  onClose,
  isMobile = false,
}: ExerciseDetailsSidebarProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlayingMotion, setIsPlayingMotion] = useState(true);

  // Reset image index when exercise changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [exercise?.id]);

  // Auto-play 2-frame animation if available
  useEffect(() => {
    if (!exercise || !isPlayingMotion || exercise.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % exercise.images.length);
    }, 1100);

    return () => clearInterval(interval);
  }, [exercise, isPlayingMotion]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!exercise) return null;

  const levelInfo = LEVEL_TRANSLATIONS[exercise.level.toLowerCase()] || {
    label: exercise.level,
    color: "bg-lime/15 text-lime border-lime/30",
  };

  const whatsappMessage = `Bonjour l'équipe Dynamo Fit, j'aimerais avoir des conseils et des ajustements sur l'exercice : ${exercise.name}.`;

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`z-50 flex flex-col border border-zinc-800/90 bg-background/95 backdrop-blur-2xl transition-all duration-300 ${
          isMobile
            ? "fixed inset-x-3 bottom-3 top-16 max-h-[82vh] rounded-2xl"
            : "absolute right-3 xl:right-4 top-20 w-84 lg:w-96 rounded-2xl"
        }`}
        style={
          !isMobile
            ? {
                height: "calc(100vh - 160px)",
                maxHeight: "calc(100vh - 180px)",
              }
            : undefined
        }
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/80 px-4 py-3 bg-card/60 rounded-t-2xl shrink-0">
          <div className="flex items-center gap-2 min-w-0 pr-2">
            <span className="size-2 shrink-0 rounded-full bg-lime shadow-[0_0_8px_var(--color-lime)] animate-pulse" />
            <span className="skew-title text-xs font-black uppercase tracking-wider text-foreground truncate">
              Fiche Exercice
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer la fiche exercice"
            className="rounded-full p-1.5 text-muted-foreground transition hover:bg-secondary hover:text-foreground active:scale-95 cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4">
          {/* Title & Badges */}
          <div>
            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
              <span
                className={`rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${levelInfo.color}`}
              >
                {levelInfo.label}
              </span>
              <span className="rounded-md border border-lime/30 bg-lime/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-lime">
                {exercise.category}
              </span>
            </div>
            <h2 className="skew-title text-lg font-black text-foreground leading-snug">
              {exercise.name}
            </h2>
          </div>

          {/* Exercise Visual Frame / Motion Animation */}
          {exercise.images && exercise.images.length > 0 && (
            <div className="relative overflow-hidden rounded-xl border border-border/80 bg-zinc-950/80 group">
              <div className="relative aspect-4/3 w-full flex items-center justify-center bg-black/40 overflow-hidden">
                <img
                  key={exercise.images[currentImageIndex]}
                  src={getExerciseImageUrl(exercise.images[currentImageIndex])}
                  alt={`${exercise.name} - Étape ${currentImageIndex + 1}`}
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-102"
                />

                {/* Frame Indicator Badges */}
                {exercise.images.length > 1 && (
                  <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 bg-background/80 px-2 py-1 rounded-lg backdrop-blur-md border border-border/60">
                    <button
                      onClick={() => setIsPlayingMotion(!isPlayingMotion)}
                      className="cursor-pointer text-lime hover:text-foreground transition-colors p-0.5"
                      title={
                        isPlayingMotion
                          ? "Mettre en pause l'animation"
                          : "Lancer l'animation"
                      }
                    >
                      {isPlayingMotion ? (
                        <Pause className="size-3" />
                      ) : (
                        <Play className="size-3 fill-current" />
                      )}
                    </button>
                    <span className="text-[10px] font-mono font-bold text-muted-foreground">
                      Mouvement {currentImageIndex + 1}/{exercise.images.length}
                    </span>
                  </div>
                )}
              </div>

              {/* Frame selector pills */}
              {exercise.images.length > 1 && (
                <div className="flex border-t border-border/60 bg-card/40 divide-x divide-border/60">
                  {exercise.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentImageIndex(idx);
                        setIsPlayingMotion(false);
                      }}
                      className={`flex-1 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                        currentImageIndex === idx
                          ? "bg-lime/20 text-lime font-black"
                          : "text-muted-foreground hover:bg-card/80 hover:text-foreground"
                      }`}
                    >
                      {idx === 0 ? "Phase Départ" : "Phase Finale"}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Quick Specifications Grid */}
          <div className="grid grid-cols-2 gap-2">
            {/* Primary Muscle */}
            <div className="rounded-xl border border-border/70 bg-card/50 p-2.5">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                <Flame className="size-3 text-lime" />
                <span>Muscle Ciblé</span>
              </div>
              <p className="mt-1 text-xs font-bold text-lime capitalize">
                {exercise.primaryMuscles
                  .map((m) => MUSCLE_TRANSLATIONS[m.toLowerCase()] || m)
                  .join(", ")}
              </p>
            </div>

            {/* Equipment */}
            <div className="rounded-xl border border-border/70 bg-card/50 p-2.5">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                <Dumbbell className="size-3 text-lime" />
                <span>Équipement</span>
              </div>
              <p className="mt-1 text-xs font-bold text-foreground capitalize">
                {exercise.equipment
                  ? EQUIPMENT_TRANSLATIONS[exercise.equipment.toLowerCase()] ||
                    exercise.equipment
                  : "Poids du corps"}
              </p>
            </div>

            {/* Secondary Muscles */}
            {exercise.secondaryMuscles &&
              exercise.secondaryMuscles.length > 0 && (
                <div className="rounded-xl border border-border/70 bg-card/50 p-2.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    <Layers className="size-3 text-lime" />
                    <span>Secondaires</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground capitalize">
                    {exercise.secondaryMuscles
                      .map((m) => MUSCLE_TRANSLATIONS[m.toLowerCase()] || m)
                      .join(", ")}
                  </p>
                </div>
              )}

            {/* Type / Mechanic */}
            {(exercise.mechanic || exercise.force) && (
              <div className="rounded-xl border border-border/70 bg-card/50 p-2.5">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  <Activity className="size-3 text-lime" />
                  <span>Type</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground capitalize">
                  {[
                    exercise.mechanic === "compound"
                      ? "Polyarticulaire"
                      : exercise.mechanic === "isolation"
                        ? "Isolation"
                        : null,
                    exercise.force === "push"
                      ? "Poussée"
                      : exercise.force === "pull"
                        ? "Tirage"
                        : null,
                  ]
                    .filter(Boolean)
                    .join(" · ") || "Standard"}
                </p>
              </div>
            )}
          </div>

          {/* Instructions Step-by-Step 
          {exercise.instructions && exercise.instructions.length > 0 && (
            <div className="rounded-xl border border-border/80 bg-card/40 p-3.5 space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-lime" />
                <h3 className="skew-title text-xs font-black uppercase tracking-wider text-foreground">
                  Exécution du Mouvement
                </h3>
              </div>
              <ol className="space-y-2 text-xs text-muted-foreground leading-relaxed">
                {exercise.instructions.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="flex size-4.5 shrink-0 items-center justify-center rounded-full bg-lime/15 text-[10px] font-black text-lime">
                      {idx + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}*/}

          {/* Pro Coach Advice Box */}
          <div className="rounded-xl border border-lime/30 bg-lime/10 p-3.5 space-y-2">
            <div className="flex items-center gap-1.5 text-lime">
              <CheckCircle2 className="size-3.5" />
              <span className="text-[11px] font-black uppercase tracking-wider">
                Conseil Coach Dynamo Fit
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-normal">
              Pour l&apos;hypertrophie, visez{" "}
              <strong className="text-foreground">
                3 à 4 séries de 8 à 12 répétitions
              </strong>{" "}
              avec 90s de repos. Maintenez un tempo contrôlé (2s descente, 1s
              montée).
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
