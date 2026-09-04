"use client";

import { useEffect, useRef, useState } from "react";
import { Hand, MousePointerClick } from "lucide-react";

interface MobileZoomHintProps {
  onComplete?: () => void;
}

/**
 * Ultra-simple 3D navigation hint:
 * Single animated icon in translucent white, no text, no background box.
 */
export function MobileZoomHint({ onComplete }: MobileZoomHintProps) {
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    const tEnter = setTimeout(() => setVisible(true), 50);
    const tFade = setTimeout(() => setVisible(false), 5000);
    const tExit = setTimeout(() => {
      setShouldRender(false);
      onCompleteRef.current?.();
    }, 6000);

    return () => {
      clearTimeout(tEnter);
      clearTimeout(tFade);
      clearTimeout(tExit);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-30 pointer-events-none flex items-center justify-center select-none transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Mobile: Simple swipe gesture in white with opacity */}
      <div className="md:hidden flex items-center justify-center">
        <img
          src="/assets/tap.png"
          alt="Mobile hint"
          className="size-14 text-white/70 animate-swipe-hint drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
        />
      </div>

      {/* Desktop: Simple click & drag gesture in white with opacity */}
      <div className="hidden md:flex items-center justify-center">
        <MousePointerClick
          className="size-10 text-white/70 animate-swipe-hint drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
          strokeWidth={1.5}
        />
      </div>
    </div>
  );
}
