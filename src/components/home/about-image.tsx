"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { staggerItem } from "@/lib/motion";
import { site } from "@/lib/site";

export function AboutImage() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      variants={staggerItem}
      whileHover={reduce ? undefined : { y: -6, transition: { duration: 0.35 } }}
      className="relative aspect-[3/4] max-w-[340px] mx-auto lg:mx-0 w-full rounded-2xl overflow-hidden border border-gold-subtle shadow-xl group"
    >
      <Image
        src="/advocate.jpg"
        alt={`Advocate ${site.advocate.name} — professional portrait at ${site.name}`}
        fill
        sizes="(max-width: 1024px) 80vw, 340px"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-kiwi-dark/80 via-transparent to-transparent" />
    </motion.div>
  );
}
