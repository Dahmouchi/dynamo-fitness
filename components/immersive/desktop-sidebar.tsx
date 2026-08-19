"use client";

import type { ReactNode } from "react";
import { X } from "lucide-react";
import type { TabId } from "./types";

interface DesktopSidebarProps {
  tab?: TabId;
  open: boolean;
  onClose: () => void;
  muted?: boolean;
  onToggleMute?: () => void;
  lang?: "fr" | "en";
  onToggleLang?: () => void;
  onFullscreen?: () => void;
  onShare?: () => void;
  children: ReactNode;
}

const tabLabels: Record<TabId, string> = {
  club: "Espace Club",
  programme: "Programme & Cours",
  options: "Options & Services",
  abonnements: "Nos Abonnements",
  infos: "Informations Pratiques",
};

export function DesktopSidebar({
  tab,
  open,
  onClose,
  children,
}: DesktopSidebarProps) {
  return (
    <div className="relative mt-0 flex flex-col items-center">
      {/* Connecting vertical steel rod link from Dumbbell Header to Sidebar */}
      <div
        className={`h-2 w-1.5 rounded-full border-x border-zinc-600 bg-linear-to-b from-lime/80 via-zinc-400 to-zinc-700 shadow-sm transition-all duration-300 ${
          open ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
        }`}
      />

      {/* Sidebar Panel dropping down from top to bottom */}
      <aside
        className={`relative  z-30 flex w-80 flex-col rounded-2xl pb-3 border border-zinc-800/90 bg-background/95 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top lg:w-96 ${
          open
            ? "translate-y-0 opacity-100 scale-y-100 pointer-events-auto"
            : "-translate-y-6 opacity-0 scale-y-95 pointer-events-none overflow-hidden"
        }`}
        style={{ height: open ? "calc(101vh - 140px)" : 0 }}
      >
        {/* ---- Header with active section title + close button ---- */}
        <div className="flex items-center justify-between border-b border-border/80 px-4 py-2.5 bg-card/50 rounded-2xl">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-lime shadow-[0_0_8px_var(--color-lime)]" />
            <span className="skew-title text-xs font-black uppercase tracking-wider text-foreground">
              {tab ? tabLabels[tab] : "Détails & Infos"}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer le panneau"
            className="rounded-full p-1.5 text-muted-foreground transition hover:bg-secondary hover:text-foreground active:scale-95"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* ---- Full-height scrollable panel content ---- */}
        <div className="flex-1 h-[calc(100vh-100px)] overflow-y-auto">
          {children}
        </div>
      </aside>
    </div>
  );
}
