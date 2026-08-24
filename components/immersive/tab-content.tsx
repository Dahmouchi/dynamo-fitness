import { useState, useEffect, useRef, useMemo } from "react";
import {
  ChevronRight,
  Clock,
  MapPin,
  Maximize2,
  Phone,
  Calendar,
  Swords,
  Shield,
  HandFist,
  Flame,
  Target,
  Dumbbell,
  Search,
  Sparkles,
  Loader2,
  HelpCircle,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { spaces, programme, options, plans, hours } from "./data";
import { SectionTitle, Panel, Pill } from "./ui";
import type { TabId } from "./types";
import {
  fetchExercises,
  getExerciseImageUrl,
  MUSCLE_TRANSLATIONS,
  EQUIPMENT_TRANSLATIONS,
  LEVEL_TRANSLATIONS,
  type Exercise,
} from "@/lib/exercise-api";

interface TabContentProps {
  tab: TabId;
  onScan: (params?: Record<string, string>, title?: string) => void;
  onResetView: () => void;
  onSelectExercise?: (exercise: Exercise) => void;
  selectedExercise?: Exercise | null;
}

const categoryStyles: Record<
  string,
  { bg: string; text: string; border: string; label: string; icon: LucideIcon }
> = {
  taekwondo: {
    bg: "bg-blue-500/15",
    text: "text-blue-400",
    border: "border-blue-500/30",
    label: "Taekwondo",
    icon: Swords,
  },
  jjb: {
    bg: "bg-amber-500/15",
    text: "text-amber-300",
    border: "border-amber-500/30",
    label: "JJB",
    icon: Shield,
  },
  mma: {
    bg: "bg-red-500/15",
    text: "text-red-400",
    border: "border-red-500/30",
    label: "MMA",
    icon: HandFist,
  },
  kickboxing: {
    bg: "bg-sky-500/15",
    text: "text-sky-400",
    border: "border-sky-500/30",
    label: "Kickboxing",
    icon: Flame,
  },
  boxing: {
    bg: "bg-cyan-500/15",
    text: "text-cyan-400",
    border: "border-cyan-500/30",
    label: "Boxe",
    icon: Target,
  },
  fitness: {
    bg: "bg-lime/15",
    text: "text-lime",
    border: "border-lime/30",
    label: "Conditioning",
    icon: Dumbbell,
  },
};

export function TabContent({
  tab,
  onScan,
  onResetView,
  onSelectExercise,
  selectedExercise,
}: TabContentProps) {
  const [selectedDay, setSelectedDay] = useState<string>("all");
  const [selectedRates, setSelectedRates] = useState<Record<string, number>>(
    {},
  );
  const [optionSubView, setOptionSubView] = useState<"exercises" | "services">(
    "exercises",
  );
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loadingExercises, setLoadingExercises] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMuscle, setSelectedMuscle] = useState("all");
  const [selectedEquipment, setSelectedEquipment] = useState("all");
  const [visibleCount, setVisibleCount] = useState(30);
  const topRef = useRef<HTMLDivElement>(null);

  // Reset pagination when filter criteria change
  useEffect(() => {
    setVisibleCount(30);
  }, [searchTerm, selectedMuscle, selectedEquipment]);

  // Fetch exercises when options tab is opened or initially
  useEffect(() => {
    let isMounted = true;
    if (tab === "options" && exercises.length === 0) {
      setLoadingExercises(true);
      fetchExercises()
        .then((data) => {
          if (isMounted) {
            setExercises(data);
            setLoadingExercises(false);
          }
        })
        .catch(() => {
          if (isMounted) setLoadingExercises(false);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [tab, exercises.length]);

  // Filtered exercises computation
  const filteredExercises = useMemo(() => {
    return exercises.filter((ex) => {
      // Muscle filter
      if (selectedMuscle !== "all") {
        const matchesPrimary = ex.primaryMuscles.some(
          (m) => m.toLowerCase() === selectedMuscle.toLowerCase(),
        );
        const matchesSecondary = ex.secondaryMuscles?.some(
          (m) => m.toLowerCase() === selectedMuscle.toLowerCase(),
        );
        if (!matchesPrimary && !matchesSecondary) return false;
      }

      // Equipment filter
      if (selectedEquipment !== "all") {
        if (
          !ex.equipment ||
          ex.equipment.toLowerCase() !== selectedEquipment.toLowerCase()
        ) {
          return false;
        }
      }

      // Search term filter
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesName = ex.name.toLowerCase().includes(term);
        const matchesMuscle = ex.primaryMuscles.some((m) => {
          const fr = MUSCLE_TRANSLATIONS[m.toLowerCase()] || "";
          return (
            m.toLowerCase().includes(term) || fr.toLowerCase().includes(term)
          );
        });
        const matchesCategory = ex.category?.toLowerCase().includes(term);
        if (!matchesName && !matchesMuscle && !matchesCategory) return false;
      }

      return true;
    });
  }, [exercises, selectedMuscle, selectedEquipment, searchTerm]);

  // Scroll to top of the panel whenever the active tab changes
  useEffect(() => {
    const el = topRef.current;
    if (!el) return;
    // Find the closest scrollable parent (overflow-y-auto container)
    let scrollParent: HTMLElement | null = el.parentElement;
    while (scrollParent) {
      const style = getComputedStyle(scrollParent);
      if (style.overflowY === "auto" || style.overflowY === "scroll") {
        scrollParent.scrollTo({ top: 0 });
        break;
      }
      scrollParent = scrollParent.parentElement;
    }
  }, [tab]);

  const filteredProgramme =
    selectedDay === "all"
      ? programme
      : programme.filter(
          (d) => d.day.toLowerCase() === selectedDay.toLowerCase(),
        );

  return (
    <>
      <div ref={topRef} />
      {tab === "club" && (
        <Panel>
          <SectionTitle title="Le club" subtitle="Découvrez nos espaces" />
          <div className="space-y-3">
            {spaces.map((s) => (
              <button
                key={s.id}
                onClick={() => onScan(s.params, s.title)}
                className="group relative block cursor-pointer w-full overflow-hidden rounded-xl border border-border text-left transition hover:border-lime/60"
              >
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="absolute inset-0 h-full w-full object-cover opacity-45 transition duration-500 group-hover:scale-105 group-hover:opacity-60"
                />
                <div className="relative bg-linear-to-r from-background/95 via-background/70 to-transparent p-4 md:p-5">
                  <h3 className="skew-title text-lg md:text-xl">{s.title}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-lime md:text-[11px]">
                    Visite 3D
                  </span>
                  <p className="mt-2 max-w-[16rem] text-xs text-muted-foreground md:mt-3 md:text-sm">
                    {s.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1 md:mt-3 md:gap-1.5">
                    {s.equipment.slice(0, 3).map((e) => (
                      <Pill key={e}>{e}</Pill>
                    ))}
                  </div>
                  <span className="absolute bottom-3 right-3 flex size-8 items-center justify-center rounded-full bg-lime text-lime-foreground transition group-hover:translate-x-1 md:bottom-4 md:right-4 md:size-10">
                    <ChevronRight className="size-4 md:size-5" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </Panel>
      )}

      {tab === "programme" && (
        <Panel>
          <SectionTitle
            title="Arts Martiaux"
            subtitle="Planning hebdomadaire"
          />

          {/* Day Filter Chips */}
          <div className="no-scrollbar -mx-1 mb-5 flex gap-1.5 overflow-x-auto px-1 pb-1 pt-0.5">
            <button
              onClick={() => setSelectedDay("all")}
              className={`shrink-0 cursor-pointer rounded-full px-3 py-1 text-[11px] font-bold tracking-wide uppercase transition-all duration-200 ${
                selectedDay === "all"
                  ? "bg-lime text-lime-foreground shadow-[0_0_16px_oklch(0.85_0.2_128/0.35)] scale-105"
                  : "border border-border/60 bg-card/40 text-muted-foreground hover:border-lime/40 hover:text-foreground hover:bg-card/70"
              }`}
            >
              Tous
            </button>
            {programme.map((d) => {
              const isToday =
                d.day.toLowerCase() ===
                new Intl.DateTimeFormat("fr-FR", { weekday: "long" })
                  .format(new Date())
                  .toLowerCase();
              return (
                <button
                  key={d.day}
                  onClick={() => setSelectedDay(d.day)}
                  className={`relative shrink-0 cursor-pointer rounded-full px-3 py-1 text-[11px] font-bold tracking-wide uppercase transition-all duration-200 ${
                    selectedDay === d.day
                      ? "bg-lime text-lime-foreground shadow-[0_0_16px_oklch(0.85_0.2_128/0.35)] scale-105"
                      : "border border-border/60 bg-card/40 text-muted-foreground hover:border-lime/40 hover:text-foreground hover:bg-card/70"
                  }`}
                >
                  {d.day.slice(0, 3)}
                  {isToday && selectedDay !== d.day && (
                    <span className="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-lime animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Schedule Grid */}
          <div className="space-y-6">
            {filteredProgramme.map((day, dayIdx) => (
              <div
                key={day.day}
                className="animate-in fade-in-0 slide-in-from-bottom-2"
                style={{
                  animationDelay: `${dayIdx * 60}ms`,
                  animationFillMode: "backwards",
                }}
              >
                {/* Day Header */}
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-lime/10 text-lime">
                    <Calendar className="size-3.5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-black uppercase tracking-[0.15em] text-foreground">
                      {day.day}
                    </h3>
                  </div>
                  <span className="rounded-full bg-lime/10 px-2.5 py-0.5 text-[10px] font-bold text-lime tabular-nums">
                    {day.items.length} cours
                  </span>
                </div>

                {/* Session Cards */}
                <div className="space-y-1.5">
                  {day.items.map((it, idx) => {
                    const style =
                      it.category && categoryStyles[it.category]
                        ? categoryStyles[it.category]
                        : null;
                    return (
                      <div
                        key={it.n + it.t + day.day}
                        className="group relative overflow-hidden rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border hover:bg-card/80 hover:shadow-lg"
                        style={{
                          animationDelay: `${dayIdx * 60 + idx * 40}ms`,
                          animationFillMode: "backwards",
                        }}
                      >
                        {/* Left Category Accent Bar */}
                        {style && (
                          <div
                            className={`absolute left-0 top-0 h-full w-0.75 ${style.bg.replace("/15", "")} opacity-80`}
                            style={{
                              background: `var(--tw-gradient-from, currentColor)`,
                            }}
                          />
                        )}

                        <div className="flex items-center gap-3 px-3.5 py-2.5 pl-4">
                          {/* Category Icon
                          {style && (
                            <div
                              className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${style.bg} ${style.text}`}
                            >
                              <style.icon
                                className="size-4"
                                strokeWidth={2.5}
                              />
                            </div>
                          )} */}

                          {/* Info Block */}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <p className="truncate text-[13px] font-bold text-foreground">
                                {it.n}
                              </p>
                              {style && (
                                <span
                                  className={`hidden shrink-0 rounded-md px-1.5 py-px text-[8px] font-extrabold uppercase tracking-wider sm:inline-block ${style.bg} ${style.text}`}
                                >
                                  {style.label}
                                </span>
                              )}
                            </div>
                            <div className="mt-0.5 flex items-center gap-1.5 text-[10px] text-muted-foreground">
                              <Clock className="size-2.5 opacity-50" />
                              <span className="font-mono font-semibold">
                                {it.t}
                              </span>
                              <span className="opacity-30">·</span>
                              <span>{it.c}</span>
                              <span className="opacity-30">·</span>
                              <span>{it.d}</span>
                            </div>
                          </div>

                          {/* Mobile Category Badge */}
                          {style && (
                            <span
                              className={`shrink-0 rounded-md px-1.5 py-0.5 text-[8px] font-extrabold uppercase tracking-wider sm:hidden ${style.bg} ${style.text}`}
                            >
                              {style.label}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Legend Strip */}
          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border/40 pt-4">
            <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">
              Disciplines
            </span>
            {Object.entries(categoryStyles).map(([key, s]) => (
              <span
                key={key}
                className={`flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[9px] font-bold ${s.bg} ${s.text}`}
              >
                <s.icon className="size-3" strokeWidth={2.5} />
                {s.label}
              </span>
            ))}
          </div>
        </Panel>
      )}

      {tab === "options" && (
        <Panel>
          <SectionTitle
            title="Exercices & Options"
            subtitle="Explorez les mouvements et services"
          />

          {/* Sub-view switcher between Gym Exercises & Club Services */}
          <div className="mb-4 flex rounded-xl border border-border/80 bg-card/40 p-1">
            <button
              onClick={() => setOptionSubView("exercises")}
              className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-bold transition-all cursor-pointer ${
                optionSubView === "exercises"
                  ? "bg-lime text-lime-foreground shadow-[0_0_12px_var(--color-lime)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Dumbbell className="size-3.5" />
              <span>Exercices Gym</span>
            </button>
            <button
              onClick={() => setOptionSubView("services")}
              className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-bold transition-all cursor-pointer ${
                optionSubView === "services"
                  ? "bg-lime text-lime-foreground shadow-[0_0_12px_var(--color-lime)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Sparkles className="size-3.5" />
              <span>Options Club</span>
            </button>
          </div>

          {optionSubView === "exercises" ? (
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Rechercher un exercice (ex: Bench, Squat, Curl)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-border/80 bg-card/60 py-2.5 pl-9 pr-9 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:border-lime focus:outline-hidden focus:ring-1 focus:ring-lime"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>

              {/* Muscle Group Filter Chips */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Groupe Musculaire
                  </span>
                  <span className="text-[10px] font-mono text-lime">
                    {filteredExercises.length} exercices
                  </span>
                </div>
                <div className="no-scrollbar flex gap-1.5 overflow-x-auto pb-1">
                  {[
                    { id: "all", label: "Tous" },
                    { id: "chest", label: "Pectoraux" },
                    { id: "lats", label: "Dos" },
                    { id: "biceps", label: "Biceps" },
                    { id: "triceps", label: "Triceps" },
                    { id: "shoulders", label: "Épaules" },
                    { id: "quadriceps", label: "Quadriceps" },
                    { id: "hamstrings", label: "Ischios" },
                    { id: "abdominals", label: "Abdos" },
                    { id: "glutes", label: "Fessiers" },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMuscle(m.id)}
                      className={`shrink-0 cursor-pointer rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-all ${
                        selectedMuscle === m.id
                          ? "bg-lime text-lime-foreground shadow-[0_0_10px_var(--color-lime)] scale-102"
                          : "border border-border/70 bg-card/50 text-muted-foreground hover:border-lime/40 hover:text-foreground"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Equipment Filter Chips */}
              <div className="no-scrollbar flex gap-1.5 overflow-x-auto pb-1">
                {[
                  { id: "all", label: "Tout matériel" },
                  { id: "barbell", label: "Barre" },
                  { id: "dumbbell", label: "Haltères" },
                  { id: "cable", label: "Poulie" },
                  { id: "machine", label: "Machine" },
                  { id: "body only", label: "Poids du corps" },
                ].map((eq) => (
                  <button
                    key={eq.id}
                    onClick={() => setSelectedEquipment(eq.id)}
                    className={`shrink-0 cursor-pointer rounded-lg px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider transition-all ${
                      selectedEquipment === eq.id
                        ? "border border-lime/60 bg-lime/20 text-lime"
                        : "border border-border/60 bg-card/30 text-muted-foreground hover:border-border hover:text-foreground"
                    }`}
                  >
                    {eq.label}
                  </button>
                ))}
              </div>

              {/* Exercises List */}
              {loadingExercises ? (
                <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
                  <Loader2 className="size-6 animate-spin text-lime mb-2" />
                  <p className="text-xs">Chargement des exercices...</p>
                </div>
              ) : filteredExercises.length === 0 ? (
                <div className="rounded-xl border border-border/80 bg-card/40 p-6 text-center text-muted-foreground">
                  <HelpCircle className="size-8 mx-auto mb-2 opacity-50 text-lime" />
                  <p className="text-sm font-bold text-foreground">
                    Aucun exercice trouvé
                  </p>
                  <p className="mt-1 text-xs">
                    Essayez de modifier votre recherche ou vos filtres.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedMuscle("all");
                      setSelectedEquipment("all");
                    }}
                    className="mt-3 text-[11px] font-bold text-lime hover:underline cursor-pointer"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {filteredExercises.slice(0, visibleCount).map((ex) => {
                    const isSelected = selectedExercise?.id === ex.id;
                    const primaryMuscle = ex.primaryMuscles[0]
                      ? MUSCLE_TRANSLATIONS[
                          ex.primaryMuscles[0].toLowerCase()
                        ] || ex.primaryMuscles[0]
                      : null;
                    const equipmentLabel = ex.equipment
                      ? EQUIPMENT_TRANSLATIONS[ex.equipment.toLowerCase()] ||
                        ex.equipment
                      : "Poids du corps";

                    return (
                      <div
                        key={ex.id}
                        onClick={() => onSelectExercise?.(ex)}
                        className={`group relative flex cursor-pointer items-center gap-3 overflow-hidden rounded-xl border p-2.5 transition-all duration-300 hover:scale-[1.01] ${
                          isSelected
                            ? "border-lime bg-lime/10 shadow-[0_0_15px_oklch(0.85_0.2_128/0.25)]"
                            : "border-border/80 bg-card/60 hover:border-lime/50 hover:bg-card/90"
                        }`}
                      >
                        {/* Thumbnail */}
                        <div className="relative size-14 shrink-0 overflow-hidden rounded-lg border border-border/60 bg-black/40">
                          {ex.images && ex.images[0] ? (
                            <img
                              src={getExerciseImageUrl(ex.images[0])}
                              alt={ex.name}
                              loading="lazy"
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                              <Dumbbell className="size-6 text-lime/60" />
                            </div>
                          )}
                          {isSelected && (
                            <span className="absolute inset-0 bg-lime/20 border border-lime rounded-lg animate-pulse" />
                          )}
                        </div>

                        {/* Info */}
                        <div className="min-w-0 flex-1">
                          <h4 className="truncate text-xs sm:text-sm font-bold text-foreground group-hover:text-lime transition-colors">
                            {ex.name}
                          </h4>
                          <div className="mt-1 flex flex-wrap items-center gap-1.5">
                            {primaryMuscle && (
                              <span className="rounded bg-lime/15 px-1.5 py-0.5 text-[9px] font-bold text-lime">
                                {primaryMuscle}
                              </span>
                            )}
                            <span className="text-[9px] text-muted-foreground">
                              {equipmentLabel}
                            </span>
                            <span className="opacity-30">·</span>
                            <span className="text-[9px] capitalize text-muted-foreground">
                              {LEVEL_TRANSLATIONS[ex.level.toLowerCase()]
                                ?.label || ex.level}
                            </span>
                          </div>
                        </div>

                        {/* Open Details Action Indicator */}
                        <div className="flex shrink-0 items-center gap-1 text-[10px] font-bold text-lime opacity-80 group-hover:opacity-100 pr-1">
                          <span className="hidden sm:inline">Détails</span>
                          <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    );
                  })}

                  {/* Show More Pagination Button */}
                  {visibleCount < filteredExercises.length ? (
                    <button
                      type="button"
                      onClick={() => setVisibleCount((prev) => prev + 30)}
                      className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-lime/40 bg-lime/10 py-2.5 text-xs font-bold uppercase tracking-wider text-lime transition-all hover:bg-lime hover:text-lime-foreground hover:shadow-[0_0_15px_oklch(0.85_0.2_128/0.25)] active:scale-[0.98]"
                    >
                      <span>Afficher plus (+30)</span>
                      <span className="font-mono text-[11px] opacity-75">
                        ({Math.min(visibleCount, filteredExercises.length)} / {filteredExercises.length})
                      </span>
                    </button>
                  ) : filteredExercises.length > 30 ? (
                    <p className="text-center text-[10px] text-muted-foreground pt-2">
                      Tous les exercices ont été affichés ({filteredExercises.length} au total).
                    </p>
                  ) : null}
                </div>
              )}
            </div>
          ) : (
            /* Services & Options Club */
            <div className="space-y-3">
              {options.map((o) => (
                <div
                  key={o.name}
                  className="rounded-xl border border-border bg-card/60 p-3.5 md:p-4"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="skew-title text-sm md:text-base">
                      {o.name}
                    </h3>
                    <span className="whitespace-nowrap text-xs font-bold text-lime md:text-sm">
                      {o.price}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground md:mt-2 md:text-sm">
                    {o.desc}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Panel>
      )}

      {tab === "abonnements" && (
        <Panel>
          <SectionTitle title="Abonnements & Tarifs" subtitle="" />
          <div className="space-y-4">
            {plans.map((p) => {
              const activeRateIdx = selectedRates[p.id] ?? 0;
              const activeRate = p.rates ? p.rates[activeRateIdx] : null;
              const displayPrice = activeRate ? activeRate.price : p.price;
              const displayPeriod = activeRate ? activeRate.period : p.period;
              const whatsappMessage = activeRate
                ? `Bonjour, je souhaite m'inscrire à l'offre Dynamo Fit : ${p.name} - ${activeRate.label} (${displayPrice} ${displayPeriod}).`
                : `Bonjour, je souhaite m'inscrire à l'offre Dynamo Fit : ${p.name} (${displayPrice} ${displayPeriod}).`;

              return (
                <div
                  key={p.id}
                  className={`relative rounded-xl border p-4 md:p-5 transition-all ${
                    p.featured
                      ? "border-lime bg-lime/10 shadow-[0_0_40px_oklch(0.95_0.24_118/0.15)]"
                      : "border-border bg-card/60"
                  }`}
                >
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="skew-title text-lg md:text-xl font-bold text-foreground">
                        {p.name}
                      </h3>
                      {p.subtitle && (
                        <p className="mt-0.5 text-xs text-muted-foreground font-medium">
                          {p.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Multi-rate Selector (e.g. Musculation & Cardio 1, 3, 6, 12 mois) */}
                  {p.rates && (
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {p.rates.map((r, idx) => (
                        <button
                          key={r.label}
                          type="button"
                          onClick={() =>
                            setSelectedRates((prev) => ({
                              ...prev,
                              [p.id]: idx,
                            }))
                          }
                          className={`cursor-pointer rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all ${
                            activeRateIdx === idx
                              ? "bg-lime text-lime-foreground shadow-[0_0_10px_var(--color-lime)] scale-102"
                              : "border border-border/80 bg-background/60 text-muted-foreground hover:border-lime/50 hover:text-foreground"
                          }`}
                        >
                          {r.label} · {r.price} DH
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Price Display */}
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="skew-title text-3xl font-black text-lime md:text-4xl">
                      {displayPrice}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground md:text-sm">
                      {displayPeriod}
                    </span>
                    {activeRate?.note && (
                      <span className="rounded bg-lime/20 px-2 py-0.5 text-[10px] font-black text-lime">
                        {activeRate.note}
                      </span>
                    )}
                  </div>

                  {/* Tagline / Option note */}
                  {p.tag && (
                    <p className="mt-1 text-[11px] font-semibold text-lime/90">
                      ✦ {p.tag}
                    </p>
                  )}

                  {/* Insurance Note */}
                  {p.insuranceNote && (
                    <div className="mt-2 rounded-lg border border-lime/30 bg-lime/10 px-2.5 py-1.5 text-[11px] font-medium text-lime">
                      {p.insuranceNote}
                    </div>
                  )}

                  {/* Features List */}
                  <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground md:mt-3.5 md:text-sm">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span className="text-lime font-bold">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <a
                    href={`https://wa.me/212610307060?text=${encodeURIComponent(whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="skew-title mt-4 flex w-full items-center justify-center rounded-lg bg-lime py-2.5 text-center text-sm font-black text-lime-foreground transition hover:brightness-110 active:scale-[0.98] md:py-3 md:text-base"
                  >
                    S&apos;inscrire via WhatsApp
                  </a>
                </div>
              );
            })}
          </div>
        </Panel>
      )}

      {tab === "infos" && (
        <Panel>
          <SectionTitle title="Infos" subtitle="Club & accès" />
          <div className="space-y-3 text-sm md:space-y-4">
            {/* Subtitle */}
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground md:text-sm">
              Salle de sport / centre de remise en forme
            </p>
            {/* Address */}
            <div className="flex gap-3 rounded-xl border border-border bg-card/60 p-3.5 md:p-4">
              <MapPin className="mt-0.5 size-4 shrink-0 text-lime" />
              <p className="text-xs md:text-sm">Zone Industriel — Salé</p>
            </div>
            {/* Google Maps */}
            <div className="overflow-hidden rounded-xl border border-border bg-card/60">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.3005100039622!2d-6.7905193247633395!3d34.061810017225866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda769007ea34f43%3A0x58061bfa4ad19bbf!2sDynamo%20Fit!5e0!3m2!1sfr!2sma!4v1787142995778!5m2!1sfr!2sma"
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="block"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            {/* Hours */}
            <div className="rounded-xl border border-border bg-card/60 p-3.5 md:p-4">
              <h3 className="mb-2.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-lime md:mb-3">
                <Clock className="size-3.5" /> Horaires
              </h3>
              <ul className="space-y-1.5 md:space-y-2">
                {hours.map((h) => (
                  <li
                    key={h.d}
                    className="flex justify-between text-xs text-muted-foreground md:text-sm"
                  >
                    <span>{h.d}</span>
                    <span className="font-mono text-foreground">{h.h}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Phone */}
            <div className="flex gap-3 rounded-xl border border-border bg-card/60 p-3.5 md:p-4">
              <Phone className="mt-0.5 size-4 shrink-0 text-lime" />
              <p className="text-xs md:text-sm">06-10-30-70-60</p>
            </div>
            {/* Service pills */}
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              <Pill>Kickboxing</Pill>
              <Pill>MMA</Pill>
              <Pill>Taekwondo</Pill>
              <Pill>Aïkido</Pill>
              <Pill>Kid&apos;s Gymnastics</Pill>
              <Pill>Bodybuilding 100% Men</Pill>
              <Pill>Yoga & Pilates</Pill>
              <Pill>Parking gratuit</Pill>
              <Pill>Vestiaires & douches</Pill>
            </div>
            <button
              onClick={onResetView}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-lime/40 py-2 text-[10px] font-bold uppercase tracking-widest text-lime transition hover:bg-lime hover:text-lime-foreground md:py-2.5 md:text-xs"
            >
              <Maximize2 className="size-3.5 md:size-4" /> Relancer la visite
            </button>
          </div>
        </Panel>
      )}
    </>
  );
}
