import { Clock, Sparkles } from "lucide-react";
import type { TabId } from "./types";

interface RightCtasProps {
  isMobile: boolean;
  setTab: (id: TabId) => void;
  setOpen: (v: boolean) => void;
  countdown: { d: number; h: string; m: string; s: string };
}

export function RightCtas({ isMobile, setTab, setOpen, countdown: cd }: RightCtasProps) {
  const handleSubscribe = (e: React.MouseEvent) => {
    e.preventDefault();
    setTab("abonnements");
    setOpen(true);
  };

  if (isMobile) {
    return (
      <div className="absolute right-3 top-14 z-20 flex flex-col items-end gap-2">
        <a
          href="#abonnements"
          onClick={handleSubscribe}
          className="skew-title flex items-center gap-1.5 rounded-lg bg-lime px-3.5 py-2 text-sm text-lime-foreground shadow-[0_0_30px_oklch(0.95_0.24_118/0.3)] transition hover:brightness-110"
        >
          <Sparkles className="size-3.5" /> S&apos;abonner
        </a>
        <div className="flex items-center gap-1.5 rounded-full border border-lime/40 bg-background/80 px-2.5 py-1 font-mono text-[10px] font-bold text-lime backdrop-blur-xl">
          <Clock className="size-3" />
          {cd.d}j {cd.h}:{cd.m}:{cd.s}
        </div>
      </div>
    );
  }

  return (
    <div className="absolute right-4 top-4 z-20 flex flex-col items-end gap-3">
      <a
        href="#abonnements"
        onClick={handleSubscribe}
        className="skew-title flex items-center gap-2 rounded-xl bg-lime px-6 py-3 text-lg text-lime-foreground shadow-[0_0_40px_oklch(0.95_0.24_118/0.35)] transition hover:brightness-110"
      >
        <Sparkles className="size-5" /> S&apos;abonner
      </a>
      <div className="flex items-center gap-2 rounded-full border border-lime/40 bg-background/80 px-3 py-1.5 font-mono text-xs font-bold text-lime backdrop-blur-xl">
        <Clock className="size-3.5" />
        {cd.d}j {cd.h}:{cd.m}:{cd.s}
      </div>
    </div>
  );
}
