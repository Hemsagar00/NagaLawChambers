"use client";

import { useEffect, useState } from "react";

/**
 * Returns true when the user prefers reduced motion OR is on a mobile / low-power
 * viewport, so we can swap a heavy WebGL scene for a static visual.
 *
 * Re-evaluates on resize and on `prefers-reduced-motion` media-query changes.
 */
export function useLowMotion(maxWidth = 768): boolean {
  const [lowMotion, setLowMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const widthQuery = window.matchMedia(`(max-width: ${maxWidth}px)`);

    // Best-effort low-power signal (Chrome / Edge expose this; others ignored)
    const deviceMemory =
      (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
    const lowMemory = deviceMemory > 0 && deviceMemory <= 2;

    const evaluate = () =>
      setLowMotion(motionQuery.matches || widthQuery.matches || lowMemory);

    evaluate();
    motionQuery.addEventListener("change", evaluate);
    widthQuery.addEventListener("change", evaluate);

    return () => {
      motionQuery.removeEventListener("change", evaluate);
      widthQuery.removeEventListener("change", evaluate);
    };
  }, [maxWidth]);

  return lowMotion;
}
