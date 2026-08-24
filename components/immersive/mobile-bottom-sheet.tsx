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
  const sheetRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const delta = e.changedTouches[0].clientY - touchStart.current;
    if (delta > 80) onClose(); // swipe down > 80px → dismiss
    touchStart.current = null;
  };

  return (
    <div
      ref={sheetRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`absolute inset-x-0 z-40 pb-8 flex flex-col rounded-t-2xl border-t border-border bg-background/95 backdrop-blur-2xl transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        open
          ? "translate-y-0 opacity-100 visible"
          : "translate-y-[120%] opacity-0 invisible pointer-events-none"
      }`}
      style={{
        top: "15%",
        bottom: "calc(64px + env(safe-area-inset-bottom, 0px))",
      }}
    >
      {/* Drag handle */}
      <div className="flex justify-center py-2">
        <span className="h-1 w-10 rounded-full bg-border" />
      </div>
      {children}
    </div>
  );
}
