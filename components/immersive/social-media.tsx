"use client";

import React, { useState } from "react";
import { Check, Phone, Radio, Share2 } from "lucide-react";

interface SocialLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  hoverGlow: string;
}

// Custom TikTok Icon
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 2h-6a4 4 0 0 0-4 4v4H4v6h4v8h6v-8h4l2-6h-6V6a2 2 0 0 1 2-2h4" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
    </svg>
  );
}

function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

const socialLinks: SocialLink[] = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/dynamofitsale",
    icon: InstagramIcon,
    color: "hover:text-pink-400 hover:border-pink-500/50",
    hoverGlow: "hover:shadow-[0_0_15px_rgba(244,63,94,0.4)]",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/dynamofitsale",
    icon: FacebookIcon,
    color: "hover:text-blue-400 hover:border-blue-500/50",
    hoverGlow: "hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@dynamofitsale",
    icon: TikTokIcon,
    color: "hover:text-cyan-400 hover:border-cyan-500/50",
    hoverGlow: "hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/212610307060?text=Bonjour%2C%20je%20souhaite%20des%20informations%20sur%20Dynamo%20Fit",
    icon: WhatsappIcon,
    color: "hover:text-emerald-400 hover:border-emerald-500/50",
    hoverGlow: "hover:shadow-[0_0_15px_rgba(52,211,153,0.4)]",
  },
  {
    name: "Appel Direct",
    href: "tel:0610307060",
    icon: Phone,
    color: "hover:text-lime hover:border-lime/60",
    hoverGlow: "hover:shadow-[0_0_15px_oklch(0.85_0.2_128/0.4)]",
  },
];

interface SocialMediaProps {
  className?: string;
  isPlaying?: boolean;
  onToggleMusic?: () => void;
  onShare?: () => void;
}

export function SocialMedia({
  className = "",
  isPlaying = true,
  onToggleMusic,
  onShare,
}: SocialMediaProps) {
  const [copied, setCopied] = useState(false);

  const handleShareClick = () => {
    if (onShare) {
      onShare();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else if (typeof navigator !== "undefined") {
      if (navigator.share) {
        navigator
          .share({
            title: "Dynamo Fit - Visite 3D",
            url: window.location.href,
          })
          .catch(() => {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <div
      className={`group relative flex items-center justify-center select-none ${className}`}
      aria-label="Contrôles & Réseaux Sociaux Dynamo Fit"
    >
      {/* Background ambient glow matching dumbbell header */}
      <div className="pointer-events-none absolute -inset-3 rounded-3xl bg-lime/10 blur-xl transition-opacity duration-500 group-hover:bg-lime/25" />

      {/* Barbell Structure Container */}
      <div className="relative flex items-center">
        {/* ================= CENTRAL BAR (SOCIAL ICONS + RADIO TOGGLE + SHARE) ================= */}
        <div className="relative z-20 -mx-0.5 flex items-center gap-2 overflow-hidden rounded-2xl border-2 border-zinc-700/80 bg-background/95 px-3.5 py-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.65)] backdrop-blur-2xl transition-all duration-300 group-hover:border-lime/60 group-hover:shadow-[0_0_25px_oklch(0.85_0.2_128/0.25)]">
          {/* Metallic Bar Knurling / Grip Top Accent */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-0.75 bg-linear-to-r from-zinc-500 via-lime to-zinc-500 opacity-80" />

          {/* Subtle knurling grid pattern background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%), repeating-linear-gradient(-45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)`,
              backgroundSize: "6px 6px",
            }}
          />

          {/* Steel bar center line */}
          <div className="pointer-events-none absolute inset-x-2 top-1/2 h-px -translate-y-1/2 bg-linear-to-r from-transparent via-lime/20 to-transparent" />

          {/* Social Media Link Buttons */}
          <div className="relative z-10 flex items-center gap-1.5">
            {socialLinks.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  title={s.name}
                  className={`group/icon relative flex size-8 items-center justify-center rounded-xl border border-zinc-700/80 bg-card/80 text-muted-foreground transition-all duration-300 hover:scale-110 hover:bg-zinc-900 active:scale-95 ${s.color} ${s.hoverGlow}`}
                >
                  <Icon className="size-4 transition-transform duration-300 group-hover/icon:scale-110" />
                </a>
              );
            })}
          </div>

          {/* Divider Ring */}
          <div className="relative z-10 mx-0.5 h-6 w-px bg-zinc-700/90" />

          {/* ================= RADIO FM TOGGLE ================= */}
          {onToggleMusic && (
            <button
              onClick={onToggleMusic}
              aria-label={
                isPlaying
                  ? "Couper la radio fitness"
                  : "Allumer la radio fitness"
              }
              title={
                isPlaying
                  ? "Radio Fitness: ON (Cliquer pour couper)"
                  : "Radio Fitness: OFF (Cliquer pour allumer)"
              }
              className={`group/radio relative z-10 flex items-center gap-2 rounded-xl border px-3 py-1.5 transition-all duration-300 active:scale-95 cursor-pointer ${
                isPlaying
                  ? "border-lime bg-lime/15 text-lime shadow-[0_0_20px_oklch(0.85_0.2_128/0.35)]"
                  : "border-zinc-700/80 bg-card/70 text-muted-foreground hover:border-lime/40 hover:text-foreground"
              }`}
            >
              {/* Radio Icon / Signal */}
              <div className="relative flex items-center justify-center">
                <Radio
                  className={`size-4 transition-transform ${isPlaying ? "text-lime animate-pulse" : "text-muted-foreground"}`}
                />
                {isPlaying && (
                  <span className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-lime shadow-[0_0_6px_var(--color-lime)] animate-ping" />
                )}
              </div>

              {/* Radio Label + Live status */}
              <div className="flex flex-col items-start leading-tight">
                <span className="skew-title text-[10px] font-black uppercase tracking-wider text-foreground">
                  FIT <span className="text-lime">FM</span>
                </span>
                <span className="text-[7px] font-bold uppercase tracking-widest text-muted-foreground">
                  {isPlaying ? "LIVE ON" : "OFF"}
                </span>
              </div>

              {/* Animated Equalizer Wave Bars when playing */}
              {isPlaying && (
                <div className="flex items-end gap-0.5 h-3.5 px-0.5">
                  <span className="w-0.5 rounded-full bg-lime eq-bar-1" />
                  <span className="w-0.5 rounded-full bg-lime eq-bar-2" />
                  <span className="w-0.5 rounded-full bg-lime eq-bar-3" />
                </div>
              )}

              {/* Sliding Radio Switch Knob */}
              <div
                className={`relative flex h-4.5 w-8 items-center rounded-full p-0.5 transition-colors duration-300 ${
                  isPlaying ? "bg-lime/35" : "bg-zinc-800"
                }`}
              >
                <div
                  className={`size-3.5 rounded-full transition-transform duration-300 shadow-md ${
                    isPlaying
                      ? "translate-x-3.5 bg-lime shadow-[0_0_8px_var(--color-lime)]"
                      : "translate-x-0 bg-zinc-500"
                  }`}
                />
              </div>
            </button>
          )}

          {/* Share Button */}
          <button
            onClick={handleShareClick}
            aria-label="Partager la visite 3D"
            title={
              copied
                ? "Lien copié dans le presse-papier !"
                : "Partager la visite 3D"
            }
            className={`relative z-10 flex size-8 items-center justify-center rounded-xl border transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer ${
              copied
                ? "border-emerald-500 bg-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.4)]"
                : "border-zinc-700/80 bg-card/80 text-muted-foreground hover:border-lime/50 hover:text-lime hover:shadow-[0_0_15px_oklch(0.85_0.2_128/0.3)]"
            }`}
          >
            {copied ? (
              <Check className="size-4 text-emerald-400" />
            ) : (
              <Share2 className="size-4" />
            )}
          </button>

          {/* Metallic Bar Knurling / Grip Bottom Accent */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0.75 bg-linear-to-r from-zinc-500 via-lime to-zinc-500 opacity-80" />
        </div>
      </div>
    </div>
  );
}
