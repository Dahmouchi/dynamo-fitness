"use client";

import { Box, Calendar, Info, Sliders, Ticket } from "lucide-react";
import type { TabId } from "./types";

const tabs: { id: TabId; label: string; icon: typeof Box }[] = [
  { id: "club", label: "Club", icon: Box },
  { id: "programme", label: "Programme", icon: Calendar },
  { id: "options", label: "Options", icon: Sliders },
  { id: "abonnements", label: "Abos", icon: Ticket },
  { id: "infos", label: "Infos", icon: Info },
];

interface BarbellTabsProps {
  tab: TabId;
  open: boolean;
  onTabSelect: (id: TabId) => void;
  onClose?: () => void;
  setOpen?: (v: boolean) => void;
  onSubscribe?: () => void;
}

export function BarbellTabs({ tab, open, onTabSelect }: BarbellTabsProps) {
  return (
    <div className="relative z-40 flex items-center">
      <div className="relative flex items-center gap-1 sm:gap-1.5 rounded-2xl border border-border/80 bg-background/90 p-1 sm:p-1.5 xl:px-3 xl:py-2 shadow-2xl backdrop-blur-2xl">
        {/* Central connecting barbell steel rod effect */}
        <div className="pointer-events-none absolute inset-x-2 top-1/2 h-[2px] sm:h-[3px] -translate-y-1/2 rounded-full bg-linear-to-r from-lime/20 via-lime/50 to-lime/20 shadow-[0_0_8px_var(--color-lime)] opacity-60" />

        {/* Tab plates */}
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = tab === t.id && open;
          return (
            <button
              key={t.id}
              onClick={() => onTabSelect(t.id)}
              className={`barbell-tab group relative z-10 flex min-w-14 sm:min-w-16 md:min-w-18 lg:min-w-20 xl:min-w-28 2xl:min-w-32 flex-col items-center justify-center rounded-xl px-1.5 py-1 sm:px-2 sm:py-1.5 md:px-2.5 md:py-2 transition-all duration-300 ${
                isActive
                  ? "barbell-tab-active border border-lime bg-lime/20 text-lime shadow-[0_0_20px_oklch(0.85_0.2_128/0.3)] ring-1 ring-lime/40"
                  : "border bg-card/85 text-muted-foreground border-lime/50 hover:bg-card hover:text-foreground"
              }`}
            >
              <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                <Icon
                  className={`size-3.5 sm:size-4 xl:size-5 transition-transform duration-300 group-hover:scale-110 ${
                    isActive ? "text-lime scale-110" : ""
                  }`}
                />
                <span className="skew-title text-[11px] sm:text-xs md:text-sm xl:text-[15px] font-black uppercase tracking-wider">
                  {t.label}
                </span>
              </div>
              {isActive && (
                <span className="absolute -bottom-0.5 sm:-bottom-1 h-0.5 sm:h-1 w-3 sm:w-4 xl:w-5 rounded-full bg-lime shadow-[0_0_8px_var(--color-lime)]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
