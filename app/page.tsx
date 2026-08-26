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
import { SpaceLoader } from "@/components/immersive/space-loader";
import { SocialMedia } from "@/components/immersive/social-media";
import { MobileSocialMedia } from "@/components/immersive/mobile-social-media";
import { ExerciseDetailsSidebar } from "@/components/immersive/exercise-details-sidebar";
import type { Exercise } from "@/lib/exercise-api";
import { MousePointerClick, Music, Zap } from "lucide-react";

const MODEL_ID = "BV51UNAki75";

export default function Immersive() {
  const isMobile = useIsMobile();
  const [tab, setTab] = useState<TabId>("club");
  const [open, setOpen] = useState(false);
  const [promoOpen, setPromoOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null,
  );
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [muted, setMuted] = useState(true);
  const [lang, setLang] = useState<"fr" | "en">("fr");
  const [spaceParams, setSpaceParams] = useState<Record<string, string> | null>(
    null,
  );
  const [view, setView] = useState<"pano" | "dollhouse" | "floorplan">("pano");
  const [loadingSpace, setLoadingSpace] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(4 * 86400 + 40538);
  const shellRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wasPlayingRef = useRef(false);
  const loadingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
    };
  }, []);

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      wasPlayingRef.current = false;
      audioRef.current
        .play()
        .then(() => setIsMusicPlaying(true))
        .catch(() => {});
    } else {
      wasPlayingRef.current = false;
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

  // Pause music only when tab/window is hidden (switched tabs/minimized), resume when visible again
  useEffect(() => {
    const handleVisibilityChange = () => {
      const audio = audioRef.current;
      if (!audio) return;

      if (document.hidden) {
        if (!audio.paused) {
          wasPlayingRef.current = true;
          audio.pause();
          setIsMusicPlaying(false);
        }
      } else {
        if (wasPlayingRef.current) {
          audio
            .play()
            .then(() => setIsMusicPlaying(true))
            .catch(() => {});
          wasPlayingRef.current = false;
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
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
      play: hasInteracted ? "1" : "0",
      qs: "0",
      brand: "0",
      lang,
      ss: "9",
      sr: "-0.2, 0.8",
      zoom: "1.0",
    });
    if (spaceParams) {
      Object.entries(spaceParams).forEach(([k, v]) => {
        p.set(k, v);
      });
    }
    if (view === "dollhouse") p.set("dh", "1");
    if (view === "floorplan") p.set("f", "1");
    return `https://my.matterport.com/show/?${p.toString()}`;
  }, [hasInteracted, lang, spaceParams, view]);

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
    (params?: Record<string, string>, title?: string) => {
      setHasInteracted(true);
      if (params) {
        setSpaceParams({ qs: "1", ...params });
        setView("pano");
      }
      setLoadingSpace(title || "Espace Dynamo Fit");
      if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
      loadingTimerRef.current = setTimeout(() => {
        setLoadingSpace(null);
      }, 2200);

      if (isMobile) {
        setOpen(false);
      }
    },
    [isMobile],
  );

  const handleResetView = useCallback(() => {
    setHasInteracted(true);
    setSpaceParams(null);
    setView("pano");
    setLoadingSpace("Visite complète");
    if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
    loadingTimerRef.current = setTimeout(() => {
      setLoadingSpace(null);
    }, 3000);
    if (isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  const handleSubscribe = useCallback(() => {
    setTab("abonnements");
    setOpen(true);
  }, []);

  const handleSelectExercise = useCallback((exercise: Exercise) => {
    setSelectedExercise(exercise);
  }, []);

  const tabContent = (
    <TabContent
      tab={tab}
      onScan={handleSelectSpace}
      onResetView={handleResetView}
      onSelectExercise={handleSelectExercise}
      selectedExercise={selectedExercise}
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
        className="barbell-tab animate-slide-in-bottom barbell-subscribe group hidden md:flex absolute bottom-3.5 right-3 xl:bottom-4 xl:right-8 z-20 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-lime bg-lime px-3 py-2 sm:px-4 sm:py-2.5 xl:px-5 xl:py-3 text-lime-foreground shadow-[0_0_25px_oklch(0.85_0.2_128/0.35)] transition-all duration-300 hover:scale-105 active:scale-95 min-w-28 sm:min-w-32 xl:min-w-44"
      >
        {/* Speed-line streaks, sweep across on a loop */}
        <span className="speed-line speed-line-1" />
        <span className="speed-line speed-line-2" />
        <span className="speed-line speed-line-3" />

        <div className="flash-dash relative flex items-center xl:flex-col gap-1.5 xl:gap-1">
          <Zap className="flash-flicker size-3.5 sm:size-4 transition-transform group-hover:rotate-12" />
          <span className="skew-title whitespace-nowrap text-xs sm:text-sm xl:text-[15px] font-black uppercase tracking-wider text-lime-foreground">
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
          className="group absolute left-3 bottom-3.5 xl:left-4 xl:bottom-4 z-20 hidden md:flex items-center gap-1.5 sm:gap-2 rounded-full border border-zinc-800/80 bg-background/85 px-2.5 py-1 sm:px-3 sm:py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-lime/60 hover:shadow-[0_0_15px_oklch(0.85_0.2_128/0.25)]"
        >
          <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-foreground">
            Powered by
          </span>
          <img
            src="/assets/logov1white.png"
            alt="BUILD360"
            className="h-4 sm:h-5 xl:h-6 w-auto object-contain opacity-80 transition-opacity group-hover:opacity-100"
            width={85}
            height={20}
          />
        </a>
      )}

      {/* Mobile Top Brand Dumbbell Header */}
      {isMobile && (
        <div className="animate-slide-in-top absolute top-2.5 sm:top-3 inset-x-0 z-50 flex justify-center pointer-events-auto">
          <DumbbellHeader
            onClick={() => setPromoOpen(true)}
            className="scale-[0.88] sm:scale-95 md:scale-100 origin-top"
          />
        </div>
      )}
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
        <div className="pointer-events-none absolute inset-x-0 bottom-3.5 xl:bottom-4 z-40 flex justify-center">
          <div className="pointer-events-auto animate-slide-in-bottom">
            <BarbellTabs
              tab={tab}
              open={open}
              onTabSelect={handleTabClick}
              onSubscribe={handleSubscribe}
            />
          </div>
        </div>
      )}

      {/* Exercise Details Right Sidebar */}
      {selectedExercise && (
        <ExerciseDetailsSidebar
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
          isMobile={isMobile}
        />
      )}

      {/* 3D Space Switching Transition Loader */}
      <SpaceLoader isLoading={!!loadingSpace} spaceName={loadingSpace} />

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
