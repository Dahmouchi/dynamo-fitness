import {
  Accessibility,
  Box,
  Expand,
  Globe,
  HelpCircle,
  PanelLeftClose,
  PanelLeftOpen,
  Share2,
  Volume2,
  VolumeX,
} from "lucide-react";
import { ToolBtn } from "./tool-btn";
import type { TabId } from "./types";

interface TopToolbarProps {
  isMobile: boolean;
  open: boolean;
  setOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  view: "pano" | "dollhouse" | "floorplan";
  setView: (v: "pano" | "dollhouse" | "floorplan") => void;
  muted: boolean;
  setMuted: (v: boolean | ((prev: boolean) => boolean)) => void;
  lang: "fr" | "en";
  setLang: (v: "fr" | "en") => void;
  setTab: (id: TabId) => void;
  onFullscreen: () => void;
}

export function TopToolbar({
  isMobile,
  open,
  setOpen,
  view,
  setView,
  muted,
  setMuted,
  lang,
  setLang,
  setTab,
  onFullscreen,
}: TopToolbarProps) {
  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share)
      navigator.share({
        title: "Dynamo Fit",
        url: window.location.href,
      });
    else navigator?.clipboard?.writeText(window.location.href);
  };

  if (isMobile) {
    return (
      <div className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-3 pb-2 pt-[max(0.75rem,env(safe-area-inset-top))]">
        {/* Left: brand */}
        <div className="flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 py-1.5 backdrop-blur-xl">
          <span className="skew-title text-sm font-black leading-none">
            DYNAMO <span className="text-lime">FIT</span>
          </span>
        </div>
        {/* Right: mini tools */}
        <div className="flex items-center gap-0.5 rounded-full border border-border bg-background/80 px-1.5 py-1 backdrop-blur-xl">
          <ToolBtn
            active={view === "dollhouse"}
            label="Vue maquette 3D"
            onClick={() =>
              setView(view === "dollhouse" ? "pano" : "dollhouse")
            }
          >
            <Box className="size-3.5" />
          </ToolBtn>
          <ToolBtn
            active={!muted}
            label="Son"
            onClick={() => setMuted((m) => !m)}
          >
            {muted ? (
              <VolumeX className="size-3.5" />
            ) : (
              <Volume2 className="size-3.5" />
            )}
          </ToolBtn>
          <ToolBtn label="Plein écran" onClick={onFullscreen}>
            <Expand className="size-3.5" />
          </ToolBtn>
          <ToolBtn label="Partager" onClick={handleShare}>
            <Share2 className="size-3.5" />
          </ToolBtn>
          <button
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="flex items-center gap-1 rounded-full px-2 py-1.5 text-[10px] font-bold uppercase text-foreground/80 transition hover:bg-secondary"
          >
            <Globe className="size-3.5" /> {lang}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute left-1/2 top-4 z-30 -translate-x-1/2 px-3">
      <div className="flex items-center gap-1 rounded-full border border-border bg-background/80 px-2 py-1.5 backdrop-blur-xl">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Afficher le panneau"
          className="rounded-full bg-lime p-2 text-lime-foreground transition hover:brightness-110"
        >
          {open ? (
            <PanelLeftClose className="size-4" />
          ) : (
            <PanelLeftOpen className="size-4" />
          )}
        </button>
        <span className="mx-1 h-6 w-px bg-border" />
        <ToolBtn
          active={view === "dollhouse"}
          label="Vue maquette 3D"
          onClick={() =>
            setView(view === "dollhouse" ? "pano" : "dollhouse")
          }
        >
          <Box className="size-4" />
        </ToolBtn>
        <ToolBtn
          active={view === "floorplan"}
          label="Plan du club"
          onClick={() =>
            setView(view === "floorplan" ? "pano" : "floorplan")
          }
        >
          <Accessibility className="size-4" />
        </ToolBtn>
        <span className="mx-1 h-6 w-px bg-border" />
        <ToolBtn label="Aide" onClick={() => setTab("infos")}>
          <HelpCircle className="size-4" />
        </ToolBtn>
        <ToolBtn label="Partager" onClick={handleShare}>
          <Share2 className="size-4" />
        </ToolBtn>
        <ToolBtn label="Plein écran" onClick={onFullscreen}>
          <Expand className="size-4" />
        </ToolBtn>
        <ToolBtn
          active={!muted}
          label="Son"
          onClick={() => setMuted((m) => !m)}
        >
          {muted ? (
            <VolumeX className="size-4" />
          ) : (
            <Volume2 className="size-4" />
          )}
        </ToolBtn>
        <span className="mx-1 h-6 w-px bg-border" />
        <button
          onClick={() => setLang(lang === "fr" ? "en" : "fr")}
          className="flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold uppercase text-foreground/80 transition hover:bg-secondary"
        >
          <Globe className="size-4" /> {lang}
        </button>
      </div>
    </div>
  );
}
