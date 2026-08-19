"use client";

import type { ReactNode } from "react";
import {
  Box,
  Calendar,
  Info,
  Sliders,
  Ticket,
  X,
} from "lucide-react";
import { MobileBottomSheet } from "./mobile-bottom-sheet";
import type { TabId } from "./types";

const tabs: { id: TabId; label: string; icon: typeof Box }[] = [
  { id: "club", label: "Club", icon: Box },
  { id: "programme", label: "Programme", icon: Calendar },
  { id: "options", label: "Options", icon: Sliders },
  { id: "abonnements", label: "Abos", icon: Ticket },
  { id: "infos", label: "Infos", icon: Info },
];

interface MobileLayoutProps {
  tab: TabId;
  open: boolean;
  onTabClick: (id: TabId) => void;
  onClose: () => void;
  children: ReactNode;
}

export function MobileLayout({
  tab,
  open,
  onTabClick,
  onClose,
  children,
}: MobileLayoutProps) {
  return (
    <>
      {/* Backdrop overlay when sheet is open */}
      {open && (
        <div
          className="absolute inset-0 z-30 bg-black/40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Bottom sheet */}
      <MobileBottomSheet open={open} onClose={onClose}>
        {/* Sheet header */}
        <div className="flex items-center justify-between border-b border-border px-4 pb-3 pt-2">
          <div className="flex items-center gap-3">
            <span className="skew-title text-lg font-black leading-none">
              DYNAMO <span className="text-lime">FIT</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
              Rabat - Salé
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>
        {/* Sheet content */}
        <div className="hide-scrollbar flex-1 overflow-y-auto pb-4">
          {children}
        </div>
      </MobileBottomSheet>

      {/* Bottom Navigation Bar */}
      <nav
        className="absolute inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-2xl"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="grid grid-cols-5">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id && open;
            return (
              <button
                key={t.id}
                onClick={() => onTabClick(t.id)}
                className={`relative flex flex-col items-center gap-1 pb-2 pt-2.5 text-[9px] font-bold uppercase tracking-wider transition-colors ${
                  active
                    ? "text-lime"
                    : "text-muted-foreground active:text-foreground"
                }`}
              >
                {/* Active indicator */}
                {active && (
                  <span className="absolute top-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-lime" />
                )}
                <Icon className="size-5" />
                {t.label}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
