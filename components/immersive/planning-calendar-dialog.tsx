"use client";

import React, { useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Calendar,
  CalendarDays,
  Clock,
  MapPin,
  MoveHorizontal,
  Swords,
  Shield,
  HandFist,
  Flame,
  Target,
  Dumbbell,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { programme } from "./data";

interface PlanningCalendarDialogProps {
  open: boolean;
  onClose: () => void;
}

const categoryMeta: Record<
  string,
  {
    bg: string;
    border: string;
    text: string;
    badgeBg: string;
    cardText: string;
    subText: string;
    timeBg: string;
    label: string;
    icon: LucideIcon;
  }
> = {
  taekwondo: {
    bg: "bg-blue-600 hover:bg-blue-500",
    border: "border-blue-400/50",
    text: "text-blue-400",
    badgeBg: "bg-blue-600 text-white font-bold",
    cardText: "text-white",
    subText: "text-blue-100",
    timeBg: "bg-black/25 text-white",
    label: "Taekwondo",
    icon: Swords,
  },
  jjb: {
    bg: "bg-amber-600 hover:bg-amber-500",
    border: "border-amber-400/50",
    text: "text-amber-300",
    badgeBg: "bg-amber-600 text-white font-bold",
    cardText: "text-white",
    subText: "text-amber-100",
    timeBg: "bg-black/25 text-white",
    label: "JJB",
    icon: Shield,
  },
  mma: {
    bg: "bg-red-600 hover:bg-red-500",
    border: "border-red-400/50",
    text: "text-red-400",
    badgeBg: "bg-red-600 text-white font-bold",
    cardText: "text-white",
    subText: "text-red-100",
    timeBg: "bg-black/25 text-white",
    label: "MMA",
    icon: HandFist,
  },
  kickboxing: {
    bg: "bg-sky-600 hover:bg-sky-500",
    border: "border-sky-400/50",
    text: "text-sky-400",
    badgeBg: "bg-sky-600 text-white font-bold",
    cardText: "text-white",
    subText: "text-sky-100",
    timeBg: "bg-black/25 text-white",
    label: "Kickboxing",
    icon: Flame,
  },
  boxing: {
    bg: "bg-cyan-600 hover:bg-cyan-500",
    border: "border-cyan-400/50",
    text: "text-cyan-400",
    badgeBg: "bg-cyan-600 text-white font-bold",
    cardText: "text-white",
    subText: "text-cyan-100",
    timeBg: "bg-black/25 text-white",
    label: "Boxe",
    icon: Target,
  },
  fitness: {
    bg: "bg-lime hover:bg-lime/90",
    border: "border-lime-400/60",
    text: "text-lime",
    badgeBg: "bg-lime text-lime-foreground font-black",
    cardText: "text-zinc-950",
    subText: "text-zinc-800",
    timeBg: "bg-black/15 text-zinc-950",
    label: "Conditioning",
    icon: Dumbbell,
  },
};

export function PlanningCalendarDialog({
  open,
  onClose,
}: PlanningCalendarDialogProps) {
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Prevent background body scroll when dialog is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const currentDayFrench = useMemo(() => {
    return new Intl.DateTimeFormat("fr-FR", { weekday: "long" })
      .format(new Date())
      .toLowerCase();
  }, []);

  const totalClassesCount = useMemo(() => {
    return programme.reduce((acc, curr) => acc + curr.items.length, 0);
  }, []);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-5 lg:p-6 animate-in fade-in duration-200">
      {/* Fullscreen Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Main Dialog Card - Centered, Big, Max-width up to 1600px */}
      <div className="relative z-10 flex flex-col w-[96vw] max-w-[1600px] h-[94vh] sm:h-[92vh] overflow-hidden rounded-2xl sm:rounded-3xl border border-zinc-800 bg-zinc-950 shadow-[0_30px_90px_rgba(0,0,0,0.95)]">
        {/* Subtle lightweight GPU-friendly radial glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_30%_at_50%_-10%,rgba(190,242,100,0.12),transparent)]" />

        {/* Dialog Header */}
        <div className="relative z-10 shrink-0 border-b border-zinc-800/80 bg-zinc-900/90 p-3.5 sm:p-4 md:p-5 pb-3 sm:pb-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="skew-title text-xl sm:text-2xl md:text-3xl font-black text-white mt-1">
                CALENDRIER DES COURS
              </h2>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="flex size-9 sm:size-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/80 text-zinc-400 transition-colors hover:border-zinc-700 hover:bg-zinc-800 hover:text-white active:scale-95"
              aria-label="Fermer le calendrier"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Discipline Category Filter Chips */}
          <div className="no-scrollbar mt-3 flex items-center gap-1.5 overflow-x-auto pt-1">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`shrink-0 cursor-pointer rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider transition-all duration-150 ${
                selectedCategory === "all"
                  ? "bg-lime text-lime-foreground shadow-[0_0_15px_oklch(0.85_0.2_128/0.35)] scale-105"
                  : "border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-lime/40 hover:text-white"
              }`}
            >
              Tous ({totalClassesCount})
            </button>
            {Object.entries(categoryMeta).map(([catKey, meta]) => {
              const Icon = meta.icon;
              const isSelected = selectedCategory === catKey;
              return (
                <button
                  key={catKey}
                  onClick={() =>
                    setSelectedCategory(isSelected ? "all" : catKey)
                  }
                  className={`flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider transition-all duration-150 ${
                    isSelected
                      ? `${meta.badgeBg} shadow-md scale-105`
                      : "border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:text-white"
                  }`}
                >
                  <Icon className="size-3" />
                  <span>{meta.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Horizontal Scroll Hint (Hidden on Desktop) */}
        <div className="flex shrink-0 items-center justify-between px-4 py-2 border-b border-zinc-800/80 bg-zinc-900/60 text-[11px] text-zinc-400 lg:hidden">
          <span className="flex items-center gap-1.5 font-medium">
            <MoveHorizontal className="size-3.5 text-lime animate-pulse" />
            Glissez horizontalement pour voir toute la semaine
          </span>
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
            7 Jours
          </span>
        </div>

        {/* Calendar Body: GPU accelerated scroll container */}
        <div className="flex-1 overflow-x-auto lg:overflow-x-hidden overflow-y-auto overscroll-contain transform-gpu [will-change:scroll-position] p-3 sm:p-4 lg:p-5 scrollbar-thin">
          <div className="min-w-[960px] lg:min-w-0 w-full grid grid-cols-7 gap-2 sm:gap-2.5 lg:gap-2.5 xl:gap-3.5 items-start">
            {programme.map((dayGroup) => {
              const isToday = dayGroup.day.toLowerCase() === currentDayFrench;

              return (
                <div
                  key={dayGroup.day}
                  className={`flex flex-col rounded-2xl border transition-colors duration-150 ${
                    isToday
                      ? "border-lime/50 bg-zinc-900/80 shadow-[0_0_20px_oklch(0.85_0.2_128/0.12)]"
                      : "border-zinc-800/70 bg-zinc-900/30 hover:border-zinc-700"
                  } p-2 sm:p-2.5 lg:p-2.5 xl:p-3`}
                >
                  {/* Column Header */}
                  <div className="border-b border-zinc-800/80 pb-2 mb-2">
                    <div className="flex items-center justify-between gap-1">
                      <h3
                        className={`text-xs sm:text-sm font-black uppercase tracking-wider ${
                          isToday ? "text-lime" : "text-zinc-200"
                        }`}
                      >
                        {dayGroup.day}
                      </h3>
                      {isToday && (
                        <span className="rounded-full lg:block hidden bg-lime px-1.5 py-0.5 text-[8.5px] font-black uppercase tracking-widest text-lime-foreground shadow-[0_0_8px_oklch(0.85_0.2_128/0.4)]">
                          Aujourd&apos;hui
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 text-[10px] text-zinc-500">
                      <Calendar className="size-3 text-zinc-600" />
                      <span>{dayGroup.items.length} cours</span>
                    </div>
                  </div>

                  {/* Sessions in this day */}
                  <div className="space-y-1.5 sm:space-y-2">
                    {dayGroup.items.map((item, idx) => {
                      const meta = item.category
                        ? categoryMeta[item.category]
                        : null;
                      const Icon = meta?.icon;
                      const isFilteredOut =
                        selectedCategory !== "all" &&
                        item.category !== selectedCategory;

                      return (
                        <div
                          key={item.n + item.t + idx}
                          className={`group relative overflow-hidden rounded-xl border p-2 sm:p-2.5 transition-transform duration-150 shadow-md ${
                            meta
                              ? `${meta.border} ${meta.bg}`
                              : "border-zinc-800 bg-zinc-900"
                          } ${
                            isFilteredOut
                              ? "opacity-20 grayscale hover:opacity-100 hover:grayscale-0"
                              : "hover:scale-[1.02]"
                          }`}
                        >
                          <div className="relative z-10 flex flex-col gap-1 sm:gap-1.5">
                            {/* Time */}
                            <div className="flex items-center justify-between gap-1">
                              <span
                                className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-mono text-[9px] xl:text-[10px] font-bold ${
                                  meta
                                    ? meta.timeBg
                                    : "bg-black/40 text-zinc-200"
                                }`}
                              >
                                <Clock className="size-2.5 opacity-80" />
                                {item.t}
                              </span>
                            </div>

                            {/* Course Title */}
                            <div className="mt-0.5">
                              <h4
                                className={`text-[11px] xl:text-xs font-black leading-snug tracking-tight truncate ${
                                  meta ? meta.cardText : "text-white"
                                }`}
                              >
                                {item.n}
                              </h4>
                            </div>

                            {/* Location & Duration */}
                            <div
                              className={`flex items-center justify-between text-[9px] xl:text-[10px] pt-1 border-t border-black/10 ${
                                meta ? meta.subText : "text-zinc-400"
                              }`}
                            >
                              <span className="flex items-center gap-1 truncate font-medium">
                                <MapPin className="size-2.5 shrink-0 opacity-80" />
                                <span className="truncate">{item.c}</span>
                              </span>
                              <span className="shrink-0 font-bold opacity-90 text-[8.5px] xl:text-[9px]">
                                {item.d}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dialog Footer */}
        <div className="shrink-0 flex items-center justify-between border-t border-zinc-800/80 bg-zinc-900/60 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span className="hidden sm:inline">
              Accès libre selon votre formule d&apos;abonnement ou pack arts
              martiaux
            </span>
            <span className="sm:hidden">Accès selon formule</span>
          </div>

          <button
            onClick={onClose}
            className="cursor-pointer rounded-xl bg-lime px-4 py-1.5 text-xs font-black uppercase tracking-wider text-lime-foreground transition hover:bg-lime/90 active:scale-95 shadow-[0_0_15px_oklch(0.85_0.2_128/0.25)]"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
