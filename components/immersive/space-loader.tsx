"use client";

import React from "react";

interface SpaceLoaderProps {
  isLoading: boolean;
  spaceName?: string | null;
}

export function SpaceLoader({ isLoading, spaceName }: SpaceLoaderProps) {
  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/90 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-label="Chargement de l'espace 3D"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="relative">
          <div className="flex items-center justify-center rounded-2xl px-5 py-3">
            <div className="dft-loader text-6xl font-black tracking-tight">
              <span>D</span>
              <span>F</span>
              <span>T</span>
            </div>
          </div>

          {/* Glow */}
          <div className="pointer-events-none absolute inset-0 -z-10 blur-2xl">
            <div className="h-full w-full rounded-full bg-lime/20" />
          </div>
        </div>

        {/* Loading text */}
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">
          Chargement
        </p>
      </div>
    </div>
  );
}
