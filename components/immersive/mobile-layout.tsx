"use client";

import type { ReactNode } from "react";
import { Box, Calendar, Info, Ticket, X, Zap } from "lucide-react";
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
        <div className="hide-scrollbar flex-1 overflow-y-auto p-4">
          {children}
        </div>
      </MobileBottomSheet>

      {/* Enhanced Floating Mobile Barbell Bottom Navigation Bar */}
      <nav
        className="absolute inset-x-3 bottom-2 z-40 overflow-visible rounded-2xl border border-zinc-700/80 bg-background/90 px-2 py-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.85),0_0_20px_oklch(0.85_0.2_128/0.2)] backdrop-blur-2xl"
        style={{ marginBottom: "env(safe-area-inset-bottom, 0px)" }}
        aria-label="Navigation mobile principale"
      >
        {/* Metallic Bar Knurling / Grip Top Accent */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-linear-to-r from-zinc-600 via-lime/70 to-zinc-600 opacity-90" />

        {/* Central connecting rod line */}
        <div className="pointer-events-none absolute inset-x-3 top-1/2 h-px -translate-y-1/2 bg-linear-to-r from-transparent via-lime/20 to-transparent" />

        <div className="relative flex items-center justify-between">
          {/* Tab 1: Club */}
          <button
            onClick={() => onTabClick("club")}
            className={`group relative flex flex-1 flex-col items-center gap-1 py-1 text-[9px] font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 ${
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
            className={`group relative flex flex-1 flex-col items-center gap-1 py-1 text-[9px] font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 ${
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

          {/* Center Elevated Action Button: S'ABONNER with Flash Animation */}
          <div className="relative -top-3.5 mx-1 flex shrink-0 items-center justify-center">
            {/* Ambient pulsing halo around the button */}
            <div className="pointer-events-none absolute -inset-1.5 rounded-2xl bg-lime/30 blur-md animate-pulse" />

            <button
              onClick={handleSubClick}
              aria-label="S'abonner maintenant"
              className="barbell-tab barbell-subscribe group/sub relative flex min-w-22 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-lime bg-lime px-3 py-2 text-lime-foreground shadow-[0_0_25px_oklch(0.85_0.2_128/0.45)] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {/* Speed-line streaks sweep across on a loop */}
              <span className="speed-line speed-line-1" />
              <span className="speed-line speed-line-2" />
              <span className="speed-line speed-line-3" />

              <div className="flash-dash relative flex flex-col items-center gap-0.5">
                <Zap className="flash-flicker size-4 fill-current transition-transform group-hover/sub:rotate-12" />
                <span className="skew-title text-[10px] font-black uppercase tracking-wider whitespace-nowrap text-lime-foreground">
                  S&apos;abonner
                </span>
              </div>
            </button>
          </div>

          {/* Tab 3: Abonnements */}
          <button
            onClick={() => onTabClick("abonnements")}
            className={`group relative flex flex-1 flex-col items-center gap-1 py-1 text-[9px] font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 ${
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

          {/* Tab 4: Infos */}
          <button
            onClick={() => onTabClick("infos")}
            className={`group relative flex flex-1 flex-col items-center gap-1 py-1 text-[9px] font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 ${
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
