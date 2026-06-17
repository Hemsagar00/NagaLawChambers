"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";

export function ParallaxImage({
  src,
  alt,
  className,
  speed = 0.2,
  scaleRange = [1, 1.08],
}: {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  scaleRange?: [number, number];
}) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200 * speed]);
  const scale = useTransform(scrollYProgress, [0, 0.5], scaleRange);

  return (
    <motion.div
      className={`overflow-hidden ${className || ""}`}
      style={reduce ? undefined : { y }}
    >
      <motion.div
        className="h-full w-full"
        style={reduce ? undefined : { scale }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 90vw, 500px"
          className="object-cover"
          priority
        />
      </motion.div>
    </motion.div>
  );
}
