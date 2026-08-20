"use client";

import React from "react";

interface DumbbellHeaderProps {
  className?: string;
  onClick?: () => void;
}

export function DumbbellHeader({
  className = "",
  onClick,
}: DumbbellHeaderProps) {
  return (
    <header
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`group relative flex items-center justify-center select-none ${
        onClick
          ? "cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-hidden"
          : ""
      } ${className}`}
      aria-label="Dynamo Fit Header - Voir l'offre"
      title={onClick ? "Cliquez pour voir l'offre spéciale" : undefined}
    >
      {/* Background ambient glow behind the entire dumbbell */}
      <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-lime/10 blur-xl transition-opacity duration-500 group-hover:bg-lime/30" />

      {/* Barbell / Dumbbell Structure */}
      <div className="relative flex items-center">
        {/* ================= LEFT WEIGHT PLATES ================= */}
        <div className="relative z-10 flex items-center justify-end">
          {/* Steel End Cap / Bar Tip */}
          <div className="relative h-4 w-2.5 rounded-l-sm border border-zinc-500 bg-linear-to-b from-zinc-300 via-zinc-500 to-zinc-700 shadow-md">
            <div className="absolute inset-y-0 right-0 w-px bg-zinc-800" />
          </div>

          {/* Outer Plate (Smallest) */}
          <div className="relative h-14 w-2.5 rounded-sm border border-zinc-600 bg-linear-to-b from-zinc-700 via-zinc-800 to-zinc-950 shadow-md lg:h-16 lg:w-3">
            <div className="absolute inset-y-1.5 left-1/2 w-px -translate-x-1/2 bg-zinc-500/40" />
          </div>

          {/* Spacer Ring */}
          <div className="h-5 w-1 bg-zinc-600" />

          {/* Middle Plate */}
          <div className="relative h-18 w-3 rounded-sm border border-zinc-500 bg-linear-to-b from-zinc-600 via-zinc-800 to-black shadow-lg lg:h-20 lg:w-3.5">
            <div className="absolute inset-y-2 left-1/2 w-px -translate-x-1/2 bg-zinc-400/40" />
            <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-lime/30" />
          </div>

          {/* Spacer Ring */}
          <div className="h-6 w-1 bg-zinc-700" />

          {/* Heavy Inner Bumper Plate (Tallest) */}
          <div className="relative h-22 w-3.5 rounded-md border-y border-l border-zinc-400/80 border-r-zinc-800 bg-linear-to-b from-zinc-700 via-zinc-900 to-black shadow-[0_0_15px_rgba(0,0,0,0.8)] lg:h-24 lg:w-4">
            <div className="absolute inset-y-2.5 left-1/2 w-px -translate-x-1/2 bg-zinc-400/50" />
            <div className="absolute left-0 top-1/2 h-1.5 w-full -translate-y-1/2 bg-lime/60 shadow-[0_0_6px_var(--color-lime)]" />
          </div>

          {/* Left Collar / Clamp */}
          <div className="relative h-10 w-2.5 rounded-sm border border-lime/50 bg-linear-to-b from-zinc-400 via-lime/30 to-zinc-800 shadow-md">
            <div className="absolute left-1/2 top-1 size-1 -translate-x-1/2 rounded-full bg-lime" />
            <div className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-lime" />
          </div>

          {/* Bar Sleeve connecting into center bar */}
          <div className="h-6 w-2 border-y border-zinc-500 bg-linear-to-b from-zinc-300 via-zinc-500 to-zinc-700" />
        </div>

        {/* ================= CENTRAL BAR (FOREGROUND CONTENT CONTAINER) ================= */}
        <div className="relative z-20 -mx-0.5 flex min-w-65 flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-zinc-700/80 bg-background/95 px-6 py-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.65)] backdrop-blur-2xl transition-all duration-300 group-hover:border-lime/60 group-hover:shadow-[0_0_25px_oklch(0.85_0.2_128/0.25)] lg:min-w-75 lg:px-8 lg:py-3">
          {/* Metallic Bar Knurling / Grip Top Accent */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-0.75 bg-linear-to-r from-zinc-500 via-lime to-zinc-500 opacity-80" />

          {/* Subtle knurling grid pattern background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%), repeating-linear-gradient(-45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)`,
              backgroundSize: "6px 6px",
            }}
          />

          {/* Metallic steel bar center line indicator */}
          <div className="pointer-events-none absolute inset-x-3 top-1/2 h-px -translate-y-1/2 bg-linear-to-r from-transparent via-lime/20 to-transparent" />

          {/* Foreground Content */}
          <div className="relative z-10 flex flex-col items-center gap-0.5 text-center">
            <span className="skew-title  text-2xl font-black leading-none tracking-widest transition-transform duration-300 group-hover:scale-[1.02] lg:text-3xl">
              DYNAMO{" "}
              <span className="text-lime drop-shadow-[0_0_12px_rgba(180,245,0,0.45)]">
                FIT
              </span>
            </span>

            <span className="text-[8px] font-semibold uppercase tracking-[0.28em] text-muted-foreground lg:text-[9px]">
              Salle de sport / centre de remise en forme
            </span>

            <span className="skew-title text-xs font-bold text-lime tracking-wide lg:text-sm">
              Rabat - Salé
            </span>
          </div>

          {/* Metallic Bar Knurling / Grip Bottom Accent */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0.75 bg-linear-to-r from-zinc-500 via-lime to-zinc-500 opacity-80" />
        </div>

        {/* ================= RIGHT WEIGHT PLATES ================= */}
        <div className="relative z-10 flex items-center justify-start">
          {/* Bar Sleeve connecting into center bar */}
          <div className="h-6 w-2 border-y border-zinc-500 bg-linear-to-b from-zinc-300 via-zinc-500 to-zinc-700" />

          {/* Right Collar / Clamp */}
          <div className="relative h-10 w-2.5 rounded-sm border border-lime/50 bg-linear-to-b from-zinc-400 via-lime/30 to-zinc-800 shadow-md">
            <div className="absolute left-1/2 top-1 size-1 -translate-x-1/2 rounded-full bg-lime" />
            <div className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-lime" />
          </div>

          {/* Heavy Inner Bumper Plate (Tallest) */}
          <div className="relative h-22 w-3.5 rounded-md border-y border-r border-zinc-400/80 border-l-zinc-800 bg-linear-to-b from-zinc-700 via-zinc-900 to-black shadow-[0_0_15px_rgba(0,0,0,0.8)] lg:h-24 lg:w-4">
            <div className="absolute inset-y-2.5 left-1/2 w-px -translate-x-1/2 bg-zinc-400/50" />
            <div className="absolute left-0 top-1/2 h-1.5 w-full -translate-y-1/2 bg-lime/60 shadow-[0_0_6px_var(--color-lime)]" />
          </div>

          {/* Spacer Ring */}
          <div className="h-6 w-1 bg-zinc-700" />

          {/* Middle Plate */}
          <div className="relative h-18 w-3 rounded-sm border border-zinc-500 bg-linear-to-b from-zinc-600 via-zinc-800 to-black shadow-lg lg:h-20 lg:w-3.5">
            <div className="absolute inset-y-2 left-1/2 w-px -translate-x-1/2 bg-zinc-400/40" />
            <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-lime/30" />
          </div>

          {/* Spacer Ring */}
          <div className="h-5 w-1 bg-zinc-600" />

          {/* Outer Plate (Smallest) */}
          <div className="relative h-14 w-2.5 rounded-sm border border-zinc-600 bg-linear-to-b from-zinc-700 via-zinc-800 to-zinc-950 shadow-md lg:h-16 lg:w-3">
            <div className="absolute inset-y-1.5 left-1/2 w-px -translate-x-1/2 bg-zinc-500/40" />
          </div>

          {/* Steel End Cap / Bar Tip */}
          <div className="relative h-4 w-2.5 rounded-r-sm border border-zinc-500 bg-linear-to-b from-zinc-300 via-zinc-500 to-zinc-700 shadow-md">
            <div className="absolute inset-y-0 left-0 w-px bg-zinc-800" />
          </div>
        </div>
      </div>
    </header>
  );
}
