"use client";

import type { ReactNode } from "react";
import { Box, Calendar, Dumbbell, Info, Ticket, X, Zap } from "lucide-react";
import { MobileBottomSheet } from "./mobile-bottom-sheet";
import type { TabId } from "./types";

interface MobileLayoutProps {
  tab: TabId;
  open: boolean;
  onTabClick: (id: TabId) => void;
  onSubscribe?: () => void;
  onClose: () => void;
  children: ReactNode;
}

export function MobileLayout({
  tab,
  open,
  onTabClick,
  onSubscribe,
  onClose,
  children,
}: MobileLayoutProps) {
  const handleSubClick = () => {
    if (onSubscribe) {
      onSubscribe();
    } else {
      onTabClick("abonnements");
    }
  };

  return (
    <>
      {/* Backdrop overlay when sheet is open */}
      {open && (
        <div
          className="absolute inset-0 z-30 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Bottom sheet*/}
      <MobileBottomSheet open={open} onClose={onClose}>
        <div className="flex items-center justify-between border-b border-border px-4 pb-3 pt-1">
          <div className="flex items-center gap-2.5">
            <span className="skew-title text-base font-black leading-none">
              DYNAMO <span className="text-lime">FIT</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
              Rabat - Salé
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex size-7 items-center justify-center rounded-full bg-secondary/80 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
            aria-label="Fermer"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="hide-scrollbar flex-1 overflow-y-auto p-2">
          {children}
        </div>
      </MobileBottomSheet>

      {/* Enhanced Floating Mobile Barbell Bottom Navigation Bar with Centered Elevated Notch */}
      <nav
        className="animate-slide-in-bottom-dock absolute inset-x-3 z-40 overflow-visible rounded-2xl border border-zinc-700/80 bg-background/90 px-1 pt-2 pb-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.85),0_0_20px_oklch(0.85_0.2_128/0.2)] backdrop-blur-2xl"
        style={{ bottom: "calc(0.5rem + env(safe-area-inset-bottom, 0px))" }}
        aria-label="Navigation mobile principale"
      >
        {/* Center Elevated Notch: S'ABONNER */}
        <div className="absolute -top-11 left-1/2 -translate-x-1/2 flex items-center justify-center">
          {/* Ambient glowing halo */}

          <button
            onClick={handleSubClick}
            aria-label="S'abonner maintenant"
            className=" barbell-subscribe group/sub relative flex cursor-pointer items-center gap-1.5 overflow-hidden rounded-t-xl border-2 border-lime bg-lime px-4 py-2 text-lime-foreground  transition-all duration-300 hover:scale-105 "
          >
            {/* Speed-line streaks sweep across on a loop */}
            <span className="speed-line speed-line-1" />
            <span className="speed-line speed-line-2" />
            <span className="speed-line speed-line-3" />

            <div className="flash-dash relative flex items-center gap-1.5">
              <Zap className="flash-flicker size-3.5 fill-current transition-transform group-hover/sub:rotate-12" />
              <span className="skew-title text-[16px] font-black uppercase tracking-wider whitespace-nowrap text-lime-foreground">
                S&apos;abonner
              </span>
            </div>
          </button>
        </div>

        <div className="relative grid grid-cols-5 items-center">
          {/* Tab 1: Club */}
          <button
            onClick={() => onTabClick("club")}
            className={`group relative flex flex-col items-center gap-1 py-1 text-[9px] font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 ${
              tab === "club" && open
                ? "text-lime"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "club" && open && (
              <span className="absolute -top-1.5 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-lime shadow-[0_0_8px_var(--color-lime)]" />
            )}
            <Box className="size-4.5 transition-transform group-hover:scale-110" />
            <span>Club</span>
          </button>

          {/* Tab 2: Programme */}
          <button
            onClick={() => onTabClick("programme")}
            className={`group relative flex flex-col items-center gap-1 py-1 text-[9px] font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 ${
              tab === "programme" && open
                ? "text-lime"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "programme" && open && (
              <span className="absolute -top-1.5 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-lime shadow-[0_0_8px_var(--color-lime)]" />
            )}
            <Calendar className="size-4.5 transition-transform group-hover:scale-110" />
            <span>Planning</span>
          </button>

          {/* Tab 3: Exercices */}
          <button
            onClick={() => onTabClick("options")}
            className={`group relative flex flex-col items-center gap-1 py-1 text-[9px] font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 ${
              tab === "options" && open
                ? "text-lime"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "options" && open && (
              <span className="absolute -top-1.5 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-lime shadow-[0_0_8px_var(--color-lime)]" />
            )}
            <Dumbbell className="size-4.5 transition-transform group-hover:scale-110" />
            <span>Exercices</span>
          </button>

          {/* Tab 4: Abonnements */}
          <button
            onClick={() => onTabClick("abonnements")}
            className={`group relative flex flex-col items-center gap-1 py-1 text-[9px] font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 ${
              tab === "abonnements" && open
                ? "text-lime"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "abonnements" && open && (
              <span className="absolute -top-1.5 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-lime shadow-[0_0_8px_var(--color-lime)]" />
            )}
            <Ticket className="size-4.5 transition-transform group-hover:scale-110" />
            <span>Tarifs</span>
          </button>

          {/* Tab 5: Infos */}
          <button
            onClick={() => onTabClick("infos")}
            className={`group relative flex flex-col items-center gap-1 py-1 text-[9px] font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 ${
              tab === "infos" && open
                ? "text-lime"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "infos" && open && (
              <span className="absolute -top-1.5 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-lime shadow-[0_0_8px_var(--color-lime)]" />
            )}
            <Info className="size-4.5 transition-transform group-hover:scale-110" />
            <span>Infos</span>
          </button>
        </div>
      </nav>
    </>
  );
}
