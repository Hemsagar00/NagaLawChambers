"use client";

import { useEffect, useState } from "react";

/** Gate Framer "hidden" initial states until after mount so SSR/HTML is readable without JS. */
export function useMotionReady(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return ready;
}