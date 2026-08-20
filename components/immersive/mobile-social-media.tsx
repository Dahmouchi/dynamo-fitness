"use client";

import React, { useState } from "react";
import {
  Check,
  FingerprintPattern,
  Phone,
  Radio,
  Share2,
  X,
} from "lucide-react";

interface SocialItem {
  name: string;
  subtitle: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgHover: string;
  borderHover: string;
  glowHover: string;
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

const mobileSocialItems: SocialItem[] = [
  {
    name: "Instagram",
    subtitle: "@dynamofitsale",
    href: "https://www.instagram.com/dynamofitsale",
    icon: InstagramIcon,
    color: "text-pink-400",
    bgHover: "hover:bg-pink-500/10 active:bg-pink-500/20",
    borderHover: "hover:border-pink-500/50",
    glowHover: "hover:shadow-[0_0_15px_rgba(244,63,94,0.35)]",
  },
  {
    name: "Facebook",
    subtitle: "@dynamofitsale",
    href: "https://www.facebook.com/dynamofitsale",
    icon: FacebookIcon,
    color: "text-blue-400",
    bgHover: "hover:bg-blue-500/10 active:bg-blue-500/20",
    borderHover: "hover:border-blue-500/50",
    glowHover: "hover:shadow-[0_0_15px_rgba(59,130,246,0.35)]",
  },
  {
    name: "TikTok",
    subtitle: "@dynamofitsale",
    href: "https://www.tiktok.com/@dynamofitsale",
    icon: TikTokIcon,
    color: "text-cyan-400",
    bgHover: "hover:bg-cyan-500/10 active:bg-cyan-500/20",
    borderHover: "hover:border-cyan-500/50",
    glowHover: "hover:shadow-[0_0_15px_rgba(6,182,212,0.35)]",
  },
  {
    name: "WhatsApp",
    subtitle: "Discussion instantanée",
    href: "https://wa.me/212610307060?text=Bonjour%2C%20je%20souhaite%20des%20informations%20sur%20Dynamo%20Fit",
    icon: WhatsappIcon,
    color: "text-emerald-400",
    bgHover: "hover:bg-emerald-500/10 active:bg-emerald-500/20",
    borderHover: "hover:border-emerald-500/50",
    glowHover: "hover:shadow-[0_0_15px_rgba(52,211,153,0.35)]",
  },
  {
    name: "Appel Direct",
    subtitle: "06 10 30 70 60",
    href: "tel:0610307060",
    icon: Phone,
    color: "text-lime",
    bgHover: "hover:bg-lime/10 active:bg-lime/20",
    borderHover: "hover:border-lime/60",
    glowHover: "hover:shadow-[0_0_15px_oklch(0.85_0.2_128/0.35)]",
  },
];

interface MobileSocialMediaProps {
  className?: string;
  isPlaying?: boolean;
  onToggleMusic?: () => void;
  onShare?: () => void;
}

export function MobileSocialMedia({
  className = "",
  isPlaying = false,
  onToggleMusic,
  onShare,
}: MobileSocialMediaProps) {
  const [isOpen, setIsOpen] = useState(false);
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
    <div className={`relative ${className}`}>
      {/* Backdrop overlay when open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 animate-in fade-in"
        />
      )}

      {/* Popover Grid Menu (Floating above trigger button) */}
      {isOpen && (
        <div className="fixed right-4 bottom-20 z-50 w-[calc(100vw-32px)] max-w-sm overflow-hidden rounded-2xl border-2 border-lime/60 bg-background/95 p-3.5 shadow-[0_15px_45px_rgba(0,0,0,0.8),0_0_30px_oklch(0.85_0.2_128/0.3)] backdrop-blur-2xl transition-all duration-300 animate-in fade-in zoom-in-95 slide-in-from-bottom-6">
          {/* Metallic knurling top accent */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-0.75 bg-linear-to-r from-zinc-500 via-lime to-zinc-500 opacity-90" />

          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="flex size-2 rounded-full bg-lime shadow-[0_0_8px_var(--color-lime)] animate-pulse" />
              <span className="skew-title text-sm font-black uppercase tracking-wider text-foreground">
                Rejoignez <span className="text-lime">Dynamo Fit</span>
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="flex size-7 items-center justify-center rounded-lg border border-zinc-800 bg-card/80 text-muted-foreground transition hover:bg-zinc-800 hover:text-foreground"
              aria-label="Fermer"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Social Links & Actions Grid */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            {mobileSocialItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className={`group relative flex items-center gap-2.5 rounded-xl border border-zinc-800 bg-card/70 p-2.5 transition-all duration-300 active:scale-95 ${item.bgHover} ${item.borderHover} ${item.glowHover}`}
                >
                  <div
                    className={`flex size-8 shrink-0 items-center justify-center rounded-lg border border-zinc-700/60 bg-zinc-900/80 ${item.color} shadow-sm`}
                  >
                    <Icon className="size-4 transition-transform group-hover:scale-110" />
                  </div>
                  <div className="flex flex-col overflow-hidden text-left leading-tight">
                    <span className="truncate text-xs font-bold text-foreground group-hover:text-lime">
                      {item.name}
                    </span>
                    <span className="truncate text-[10px] text-muted-foreground">
                      {item.subtitle}
                    </span>
                  </div>
                </a>
              );
            })}

            {/* Quick Share Card in Grid */}
            <button
              onClick={handleShareClick}
              className={`group relative flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition-all duration-300 active:scale-95 cursor-pointer ${
                copied
                  ? "border-emerald-500/80 bg-emerald-500/15 shadow-[0_0_15px_rgba(52,211,153,0.35)]"
                  : "border-zinc-800 bg-card/70 hover:border-lime/60 hover:bg-lime/10"
              }`}
            >
              <div
                className={`flex size-8 shrink-0 items-center justify-center rounded-lg border shadow-sm ${
                  copied
                    ? "border-emerald-500/60 bg-emerald-950/80 text-emerald-400"
                    : "border-zinc-700/60 bg-zinc-900/80 text-muted-foreground group-hover:text-lime"
                }`}
              >
                {copied ? (
                  <Check className="size-4 text-emerald-400" />
                ) : (
                  <Share2 className="size-4 transition-transform group-hover:scale-110" />
                )}
              </div>
              <div className="flex flex-col overflow-hidden leading-tight">
                <span
                  className={`truncate text-xs font-bold ${
                    copied
                      ? "text-emerald-400"
                      : "text-foreground group-hover:text-lime"
                  }`}
                >
                  {copied ? "Lien Copié !" : "Partager"}
                </span>
                <span className="truncate text-[10px] text-muted-foreground">
                  Visite virtuelle
                </span>
              </div>
            </button>
          </div>

          {/* Full Width Radio FM Station Player */}
          {onToggleMusic && (
            <div className="mt-2.5 pt-2 border-t border-zinc-800/80">
              <button
                onClick={onToggleMusic}
                aria-label={
                  isPlaying
                    ? "Couper la radio fitness"
                    : "Allumer la radio fitness"
                }
                className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 transition-all duration-300 active:scale-98 cursor-pointer ${
                  isPlaying
                    ? "border-lime bg-lime/15 text-lime shadow-[0_0_20px_oklch(0.85_0.2_128/0.3)]"
                    : "border-zinc-800 bg-card/70 text-muted-foreground hover:border-lime/40 hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="relative flex size-8 shrink-0 items-center justify-center rounded-lg border border-zinc-700/80 bg-zinc-900/90">
                    <Radio
                      className={`size-4 ${
                        isPlaying
                          ? "text-lime animate-pulse"
                          : "text-muted-foreground"
                      }`}
                    />
                    {isPlaying && (
                      <span className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-lime shadow-[0_0_6px_var(--color-lime)] animate-ping" />
                    )}
                  </div>
                  <div className="flex flex-col text-left leading-tight">
                    <span className="skew-title text-xs font-black uppercase tracking-wider text-foreground">
                      FIT <span className="text-lime">FM RADIO</span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      {isPlaying
                        ? "En direct • Musique active"
                        : "Musique en pause"}
                    </span>
                  </div>
                </div>

                {/* Equalizer & Switch */}
                <div className="flex items-center gap-2">
                  {isPlaying && (
                    <div className="flex items-end gap-0.5 h-3.5 px-1">
                      <span className="w-0.5 rounded-full bg-lime eq-bar-1" />
                      <span className="w-0.5 rounded-full bg-lime eq-bar-2" />
                      <span className="w-0.5 rounded-full bg-lime eq-bar-3" />
                    </div>
                  )}
                  <div
                    className={`relative flex h-5 w-9 items-center rounded-full p-0.5 transition-colors duration-300 ${
                      isPlaying ? "bg-lime/35" : "bg-zinc-800"
                    }`}
                  >
                    <div
                      className={`size-4 rounded-full transition-transform duration-300 shadow-md ${
                        isPlaying
                          ? "translate-x-4 bg-lime shadow-[0_0_8px_var(--color-lime)]"
                          : "translate-x-0 bg-zinc-500"
                      }`}
                    />
                  </div>
                </div>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Floating Trigger Button (Fixed at Bottom-Right above the bottom bar) */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={
          isOpen
            ? "Fermer les réseaux sociaux"
            : "Ouvrir les réseaux sociaux et contrôles"
        }
        title="Réseaux sociaux & radio"
        className={`fixed right-4 bottom-24 z-10 flex size-12 cursor-pointer items-center justify-center rounded-2xl border-2 transition-all duration-300 active:scale-95 shadow-[0_10px_25px_rgba(0,0,0,0.7)] ${
          isOpen
            ? "border-lime bg-lime text-lime-foreground rotate-90 shadow-[0_0_25px_oklch(0.85_0.2_128/0.5)]"
            : "border-lime/70 bg-background/95 text-lime hover:border-lime hover:shadow-[0_0_20px_oklch(0.85_0.2_128/0.4)]"
        }`}
      >
        {/* Pulsing ambient halo when closed */}
        {!isOpen && (
          <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-lime/25 blur-md animate-pulse" />
        )}

        {isOpen ? (
          <X className="size-6 transition-transform duration-300" />
        ) : (
          <div className="relative flex items-center justify-center">
            <FingerprintPattern className="size-5 text-lime" />
            {isPlaying && (
              <span className="absolute -top-1.5 -right-1.5 size-2 rounded-full bg-lime shadow-[0_0_8px_var(--color-lime)] animate-ping" />
            )}
          </div>
        )}
      </button>
    </div>
  );
}
