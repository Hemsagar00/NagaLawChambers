"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MutableRefObject,
  type ReactNode,
} from "react";

/** The card's top-left offset inside its section, and the section's size. */
export type MaskPosition = { x: number; y: number; sw: number; sh: number };

/** True below the single `md` breakpoint (767px). */
export function useIsMobile(): boolean {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mobile;
}

/**
 * Measures where each card sits inside its section, so one shared image can be
 * shown through every card as a different window. Uses layout offsets, which
 * ignore the reveal animation's translateY. The section must be `relative`.
 */
export function useMaskPositions(
  sectionRef: MutableRefObject<HTMLElement | null>,
  cardRefs: MutableRefObject<(HTMLElement | null)[]>,
  count: number,
): (MaskPosition | null)[] {
  const [positions, setPositions] = useState<(MaskPosition | null)[]>(() =>
    Array.from({ length: count }, () => null),
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const measure = () => {
      const sw = section.offsetWidth;
      const sh = section.offsetHeight;
      setPositions(
        Array.from({ length: count }, (_, i) => {
          const el = cardRefs.current[i];
          if (!el) return null;
          let x = 0;
          let y = 0;
          let node: HTMLElement | null = el;
          while (node && node !== section) {
            x += node.offsetLeft;
            y += node.offsetTop;
            node = node.offsetParent as HTMLElement | null;
          }
          return { x, y, sw, sh };
        }),
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(section);
    cardRefs.current.forEach((el) => el && observer.observe(el));
    window.addEventListener("load", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("load", measure);
    };
  }, [sectionRef, cardRefs, count]);

  return positions;
}

/** How wide the image is when scaled to the section's height. */
export function useImageWidth(src: string, sectionHeight: number): number {
  const [ratio, setRatio] = useState(0);
  useEffect(() => {
    const img = new Image();
    img.onload = () => setRatio(img.naturalWidth / img.naturalHeight);
    img.src = src;
  }, [src]);
  return ratio * sectionHeight;
}

export function MaskedCard({
  bgImage,
  position,
  imageWidth,
  focalX,
  className = "",
  fallbackClass = "bg-neutral-200",
  children,
  cardRef,
  style,
}: {
  bgImage: string;
  position: MaskPosition | null;
  imageWidth: number;
  focalX: number;
  className?: string;
  fallbackClass?: string;
  children?: ReactNode;
  cardRef?: (el: HTMLDivElement | null) => void;
  style?: CSSProperties;
}) {
  let masked: CSSProperties = {};
  if (position && imageWidth > 0) {
    const overflow = imageWidth > position.sw ? imageWidth - position.sw : 0;
    const focalOffset = overflow * focalX;
    masked = {
      backgroundImage: `url(${bgImage})`,
      backgroundSize: `auto ${position.sh}px`,
      backgroundPosition: `-${position.x + focalOffset}px -${position.y}px`,
      backgroundRepeat: "no-repeat",
    };
  }
  return (
    <div
      ref={cardRef}
      className={`${className} ${position && imageWidth > 0 ? "" : fallbackClass}`}
      style={{ ...masked, ...style }}
    >
      {children}
    </div>
  );
}

/** Fades and lifts a section's elements in once, staggered by 120ms. */
export function useStaggeredReveal(count: number, threshold = 0.15) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const getAnimStyle = (index: number): CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms`,
  });

  void count;
  return { containerRef, getAnimStyle };
}
