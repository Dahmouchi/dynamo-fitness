"use client";

import React, { useEffect } from "react";
import { ArrowRight, X } from "lucide-react";

interface PromoDialogProps {
  open: boolean;
  onClose: () => void;
  onClaim: () => void;
  countdown: { d: number; h: string; m: string; s: string };
}

export function PromoDialog({
  open,
  onClose,
  onClaim,
  countdown: cd,
}: PromoDialogProps) {
  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Dialog Card */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-zinc-700/80 bg-zinc-950 shadow-[0_25px_70px_rgba(0,0,0,0.9)] animate-in zoom-in-95 fade-in duration-300">
        {/* Background image & atmospheric gradients */}
        <div className="absolute inset-0">
          <img
            src="/assets/space-muscu.jpg"
            alt="Dynamo Fit Promo"
            className="h-full w-full object-cover object-center opacity-40 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
          {/* Subtle blue/cyan accent glow in background */}
          <div className="pointer-events-none absolute -right-10 top-0 size-64 rounded-full bg-blue-600/15 blur-3xl" />
          <div className="pointer-events-none absolute -left-10 bottom-0 size-64 rounded-full bg-lime/15 blur-3xl" />
        </div>

        {/* Dialog Content */}
        <div className="relative z-10 flex flex-col p-6 sm:p-8">
          {/* Top Bar: Brand Logo + Close Button */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="skew-title text-xl font-black tracking-wider text-white">
                DYNAMO <span className="text-lime">FIT</span>
              </span>
              <span className="text-[8px] uppercase tracking-[0.25em] text-muted-foreground font-bold">
                Se dépasser · Se surpasser
              </span>
            </div>

            <button
              onClick={onClose}
              aria-label="Fermer la promotion"
              className="flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white/90 shadow-md backdrop-blur-md transition hover:bg-white hover:text-black active:scale-95"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Promo Offer Details */}
          <div className="mt-6 flex flex-col items-start">
            {/* Promo Date Badge */}
            <div className="rounded-sm border border-lime bg-lime/10 px-2.5 py-0.5 shadow-[0_0_12px_var(--color-lime)]">
              <span className="skew-title text-[11px] font-black uppercase tracking-widest text-lime">
                Offre Exceptionnelle
              </span>
            </div>

            {/* Headline */}
            <div className="mt-3 flex flex-col">
              <h2 className="skew-title text-3xl font-black italic tracking-tight text-white sm:text-4xl leading-none">
                FRAIS D&apos;ADHÉSION
              </h2>
              <span className="skew-title text-5xl font-black italic tracking-tight text-lime sm:text-6xl leading-none drop-shadow-[0_0_25px_oklch(0.85_0.2_128/0.45)] mt-1">
                OFFERTS
              </span>
            </div>

            <p className="mt-2 text-[10px] font-medium text-zinc-400">
              *Voir conditions sur dynamofit.ma · Offre réservée aux 50 premiers inscrits
            </p>
          </div>

          {/* Countdown Section */}
          <div className="mt-6 flex flex-col items-center">
            <span className="skew-title text-xs font-black uppercase tracking-widest text-zinc-300 text-center">
              L&apos;offre se termine dans
            </span>

            {/* 4 Circular Countdown Dials */}
            <div className="mt-3 grid grid-cols-4 gap-2.5 sm:gap-4 w-full max-w-sm">
              {/* Days */}
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-lime/40 bg-black/75 py-2.5 shadow-lg backdrop-blur-md">
                <span className="font-mono text-xl sm:text-2xl font-black text-lime leading-none">
                  {String(cd.d).padStart(2, "0")}
                </span>
                <span className="mt-1 text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-zinc-400">
                  Jours
                </span>
              </div>

              {/* Hours */}
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-lime/40 bg-black/75 py-2.5 shadow-lg backdrop-blur-md">
                <span className="font-mono text-xl sm:text-2xl font-black text-lime leading-none">
                  {cd.h}
                </span>
                <span className="mt-1 text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-zinc-400">
                  H
                </span>
              </div>

              {/* Minutes */}
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-lime/40 bg-black/75 py-2.5 shadow-lg backdrop-blur-md">
                <span className="font-mono text-xl sm:text-2xl font-black text-lime leading-none">
                  {cd.m}
                </span>
                <span className="mt-1 text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-zinc-400">
                  Min
                </span>
              </div>

              {/* Seconds */}
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-lime/40 bg-black/75 py-2.5 shadow-lg backdrop-blur-md">
                <span className="font-mono text-xl sm:text-2xl font-black text-lime leading-none">
                  {cd.s}
                </span>
                <span className="mt-1 text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-zinc-400">
                  Sec
                </span>
              </div>
            </div>
          </div>

          {/* Primary CTA Button */}
          <button
            onClick={() => {
              onClaim();
              onClose();
            }}
            className="group mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-lime bg-lime py-3.5 px-6 font-black uppercase tracking-wider text-lime-foreground shadow-[0_0_35px_oklch(0.85_0.2_128/0.4)] transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
          >
            <span className="skew-title text-base sm:text-lg font-black">
              J&apos;en profite maintenant
            </span>
            <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
