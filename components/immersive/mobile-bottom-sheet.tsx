"use client";

import { useRef } from "react";
import type { ReactNode } from "react";

export function MobileBottomSheet({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  const touchStart = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const delta = e.changedTouches[0].clientY - touchStart.current;
    if (delta > 60) onClose(); // swipe down on drag handle → dismiss
    touchStart.current = null;
  };

  return (
    <div
      className={`absolute inset-x-0 z-40 pb-3 flex flex-col rounded-t-2xl border-t border-border bg-background/95 backdrop-blur-2xl transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        open
          ? "translate-y-0 opacity-100 visible"
          : "translate-y-[120%] opacity-0 invisible pointer-events-none"
      }`}
      style={{
        top: "15%",
        bottom: "60px",
      }}
    >
      {/* Drag handle */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="flex cursor-grab justify-center py-3 touch-none select-none active:cursor-grabbing"
        aria-label="Faire glisser vers le bas pour fermer"
      >
        <span className="h-1.5 w-12 rounded-full bg-border hover:bg-muted-foreground/50 transition-colors" />
      </div>
      {children}
    </div>
  );
}
