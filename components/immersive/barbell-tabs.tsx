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
    <div className="relative z-40 flex items-center ">
      <div className="relative flex items-center gap-1.5 rounded-2xl border border-border/80 bg-background/90 px-3 py-2 shadow-2xl backdrop-blur-2xl">
        {/* Central connecting barbell steel rod effect */}
        <div className="pointer-events-none absolute inset-x-2 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-linear-to-r from-lime/20 via-lime/50 to-lime/20 shadow-[0_0_8px_var(--color-lime)] opacity-60" />

        {/* Tab plates */}
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = tab === t.id && open;
          return (
            <button
              key={t.id}
              onClick={() => onTabSelect(t.id)}
              className={`barbell-tab group relative z-10 flex min-w-24 flex-col items-center justify-center rounded-xl px-2.5 py-2 transition-all duration-300 lg:min-w-34 ${
                isActive
                  ? "barbell-tab-active border border-lime bg-lime/20 text-lime shadow-[0_0_20px_oklch(0.85_0.2_128/0.3)] ring-1 ring-lime/40"
                  : "border  bg-card/85 text-muted-foreground border-lime/50 hover:bg-card hover:text-foreground"
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                <Icon
                  className={`size-5 transition-transform duration-300 group-hover:scale-110 ${
                    isActive ? "text-lime scale-110" : ""
                  }`}
                />
                <span className="skew-title text-[16px] font-black uppercase tracking-wider">
                  {t.label}
                </span>
              </div>
              {isActive && (
                <span className="absolute -bottom-1 h-1 w-5 rounded-full bg-lime shadow-[0_0_8px_var(--color-lime)]" />
              )}
            </button>
          );
        })}

        {/* Connecting rod extension to the right */}

        {/* S'abonner Heavy Plate — positioned absolute on the right */}
      </div>
    </div>
  );
}
