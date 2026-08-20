"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useIsMobile } from "@/hooks/use-is-mobile";
import type { TabId } from "@/components/immersive/types";
import { TabContent } from "@/components/immersive/tab-content";
import { MobileLayout } from "@/components/immersive/mobile-layout";
import { DesktopSidebar } from "@/components/immersive/desktop-sidebar";
import { BarbellTabs } from "@/components/immersive/barbell-tabs";
import { DumbbellHeader } from "@/components/immersive/dumbbell-header";
import { PromoDialog } from "@/components/immersive/promo-dialog";
import { SocialMedia } from "@/components/immersive/social-media";
import { MobileSocialMedia } from "@/components/immersive/mobile-social-media";
import { MousePointerClick, Music, Zap } from "lucide-react";

const MODEL_ID = "YtiwUw2DFQL";

export default function Immersive() {
  const isMobile = useIsMobile();
  const [tab, setTab] = useState<TabId>("club");
  const [open, setOpen] = useState(true);
  const [promoOpen, setPromoOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [muted, setMuted] = useState(true);
  const [lang, setLang] = useState<"fr" | "en">("fr");
  const [spaceParams, setSpaceParams] = useState<Record<string, string> | null>(
    null,
  );
  const [view, setView] = useState<"pano" | "dollhouse" | "floorplan">("pano");
  const [countdown, setCountdown] = useState(4 * 86400 + 40538);
  const shellRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current
        .play()
        .then(() => setIsMusicPlaying(true))
        .catch(() => {});
    } else {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    }
  }, []);

  const handleStartInteraction = useCallback(() => {
    setHasInteracted(true);
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current
        .play()
        .then(() => setIsMusicPlaying(true))
        .catch(() => {});
    }
  }, []);

  // Close mobile sheet on resize to mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Countdown timer
  useEffect(() => {
    const i = setInterval(() => setCountdown((c) => (c > 0 ? c - 1 : 0)), 1000);
    return () => clearInterval(i);
  }, []);

  // 3D iframe src
  const src = useMemo(() => {
    const p = new URLSearchParams({
      m: MODEL_ID,
      play: "1",
      qs: "0",
      brand: "0",
      lang,
    });
    if (spaceParams) {
      Object.entries(spaceParams).forEach(([k, v]) => {
        p.set(k, v);
      });
    }
    if (view === "dollhouse") p.set("dh", "1");
    if (view === "floorplan") p.set("f", "1");
    return `https://my.matterport.com/show/?${p.toString()}`;
  }, [lang, spaceParams, view]);

  const fullscreen = () => {
    const el = shellRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.();
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share)
      navigator.share({ title: "Dynamo Fit", url: window.location.href });
    else navigator?.clipboard?.writeText(window.location.href);
  };

  const cd = {
    d: Math.floor(countdown / 86400),
    h: String(Math.floor((countdown % 86400) / 3600)).padStart(2, "0"),
    m: String(Math.floor((countdown % 3600) / 60)).padStart(2, "0"),
    s: String(countdown % 60).padStart(2, "0"),
  };

  const handleTabClick = useCallback(
    (id: TabId) => {
      if (tab === id && open) {
        setOpen(false);
      } else {
        setTab(id);
        setOpen(true);
      }
    },
    [tab, open],
  );

  const handleSelectSpace = useCallback(
    (params?: Record<string, string>) => {
      if (params) {
        setSpaceParams(params);
        setView("pano");
      }
      if (isMobile) {
        setOpen(false);
      }
    },
    [isMobile],
  );

  const handleResetView = useCallback(() => {
    setSpaceParams(null);
    setView("pano");
    if (isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  const handleSubscribe = useCallback(() => {
    setTab("abonnements");
    setOpen(true);
  }, []);

  const tabContent = (
    <TabContent
      tab={tab}
      onScan={handleSelectSpace}
      onResetView={handleResetView}
    />
  );

  return (
    <div
      ref={shellRef}
      className="relative h-dvh lg:h-screen w-full overflow-hidden bg-background"
    >
      {/* 3D space */}
      <iframe
        key={src}
        title="Visite virtuelle 3D du club Dynamo Fit"
        src={src}
        allow="xr-spatial-tracking; fullscreen; autoplay"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,transparent_40%,oklch(0.13_0.008_260/0.75))]" />

      {/* Interactive 3D Guide Overlay Indicator (Disappears on first click and starts music) */}
      {!hasInteracted && (
        <div
          onClick={handleStartInteraction}
          className="animate-fade-in absolute inset-0 z-20 flex cursor-pointer items-center justify-center bg-black/25 backdrop-blur-[2px] transition-all duration-500 hover:bg-black/15"
        >
          <div className="animate-fade-in-scale group/guide relative flex flex-col items-center gap-3 rounded-2xl border-2 border-lime/60 bg-background/90 px-6 py-4.5 text-center shadow-[0_0_35px_oklch(0.85_0.2_128/0.4)] backdrop-blur-2xl transition-all duration-300 hover:scale-105 hover:border-lime">
            {/* Ambient pulsing ring */}
            <div className="pointer-events-none absolute -inset-2 rounded-3xl bg-lime/20 blur-xl animate-pulse" />

            {/* Top Icon Badge */}
            <div className="relative flex size-12 items-center justify-center rounded-xl border border-lime bg-lime/20 text-lime shadow-[0_0_15px_oklch(0.85_0.2_128/0.5)]">
              <MousePointerClick className="size-6 animate-bounce text-lime" />
            </div>

            {/* Title & Subtitle */}
            <div className="relative flex flex-col items-center gap-1">
              <span className="skew-title text-base sm:text-lg font-black uppercase tracking-wider text-foreground">
                Cliquez pour explorer en <span className="text-lime">3D</span>
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground">
                <Music className="size-3 text-lime animate-pulse" />
                Ambiance sonore activée au clic
              </span>
            </div>

            {/* Action button */}
            <div className="relative mt-1 flex items-center gap-2 rounded-full border border-lime/50 bg-lime/20 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-lime shadow-[0_0_10px_var(--color-lime)]">
              <span>Démarrer l&apos;immersion</span>
            </div>
          </div>
        </div>
      )}
      {/* Desktop S'abonner CTA Button */}
      <button
        onClick={handleSubscribe}
        className="barbell-tab animate-slide-in-bottom barbell-subscribe group hidden lg:flex absolute lg:bottom-4 lg:right-8 z-20 min-w-24 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-lime bg-lime px-2 py-4 text-lime-foreground shadow-[0_0_25px_oklch(0.85_0.2_128/0.35)] transition-all duration-300 hover:scale-105 active:scale-95 lg:min-w-54"
      >
        {/* Speed-line streaks, sweep across on a loop */}
        <span className="speed-line speed-line-1" />
        <span className="speed-line speed-line-2" />
        <span className="speed-line speed-line-3" />

        <div className="flash-dash relative flex flex-col items-center gap-1">
          <Zap className="flash-flicker size-4 transition-transform group-hover:rotate-12" />
          <span className="skew-title whitespace-nowrap text-[16px] font-black uppercase tracking-wider text-lime-foreground">
            S&apos;abonner
          </span>
        </div>
      </button>

      {/* Desktop Powered By BUILD360 Backlink Badge */}
      {!isMobile && (
        <a
          href="https://build360.ma"
          target="_blank"
          rel="noopener noreferrer"
          title="Visite virtuelle 3D réalisée par BUILD360"
          aria-label="Visite virtuelle 3D réalisée par BUILD360"
          className="group absolute left-2 bottom-5 z-20 hidden lg:flex items-center gap-2 rounded-full border border-zinc-800/80 bg-background/85 px-3 py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-lime/60 hover:shadow-[0_0_15px_oklch(0.85_0.2_128/0.25)]"
        >
          <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-foreground">
            Powered by
          </span>
          <img
            src="/assets/logov1white.png"
            alt="BUILD360"
            className="h-6 w-auto object-contain opacity-80 transition-opacity group-hover:opacity-100"
            width={85}
            height={20}
          />
        </a>
      )}

      {isMobile && <DumbbellHeader onClick={() => setPromoOpen(true)} />}
      {/* Top toolbar — MOBILE ONLY 
      {isMobile && (
        <TopToolbar
          isMobile
          open={open}
          setOpen={setOpen}
          view={view}
          setView={setView}
          muted={muted}
          setMuted={setMuted}
          lang={lang}
          setLang={setLang}
          setTab={setTab}
          onFullscreen={fullscreen}
        />
      )}*/}

      {/* Desktop Brand Dumbbell Header & Dropdown Connected Sidebar */}
      {!isMobile && (
        <div className="animate-slide-in-left absolute -left-18 top-3 z-30 hidden flex-col items-center md:flex">
          <DumbbellHeader onClick={() => setPromoOpen(true)} />
          <DesktopSidebar tab={tab} open={open} onClose={() => setOpen(false)}>
            {tabContent}
          </DesktopSidebar>
        </div>
      )}

      {/* Desktop Top-Right Social Media & Controls Barbell */}
      {!isMobile && (
        <div className="absolute animate-slide-in-right right-4 top-3 z-30 hidden md:block">
          <SocialMedia
            isPlaying={isMusicPlaying}
            onToggleMusic={toggleMusic}
            onShare={handleShare}
          />
        </div>
      )}

      {/* Mobile layout */}
      {isMobile && (
        <>
          <MobileLayout
            tab={tab}
            open={open}
            onTabClick={handleTabClick}
            onSubscribe={handleSubscribe}
            onClose={() => setOpen(false)}
          >
            {tabContent}
          </MobileLayout>

          {/* Mobile Floating Social Media & Controls Button & Popover Grid */}
          <MobileSocialMedia
            isPlaying={isMusicPlaying}
            onToggleMusic={toggleMusic}
            onShare={handleShare}
          />
        </>
      )}

      {/* Desktop Permanent Barbell Tabs (Always displayed at bottom even when sidebar is closed) */}
      {!isMobile && (
        <div className="animate-slide-in-bottom absolute bottom-4 left-1/2 z-40">
          <BarbellTabs
            tab={tab}
            open={open}
            onTabSelect={handleTabClick}
            onSubscribe={handleSubscribe}
          />
        </div>
      )}

      {/* Special Promotional Offer Modal Dialog */}
      <PromoDialog
        open={promoOpen}
        onClose={() => setPromoOpen(false)}
        onClaim={handleSubscribe}
        countdown={cd}
      />

      {/* Background Fitness Ambient Music Player */}
      <audio ref={audioRef} src="/fitness_music.mp3" loop preload="auto" />
    </div>
  );
}
