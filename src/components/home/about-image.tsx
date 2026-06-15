"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { staggerItem } from "@/lib/motion";
import { site } from "@/lib/site";

export function AboutImage() {
  return (
    <motion.div
      variants={staggerItem}
      className="relative aspect-[3/4] max-w-[340px] mx-auto lg:mx-0 w-full rounded-2xl overflow-hidden border border-gold-subtle shadow-xl"
    >
      <Image
        src="/advocate.jpg"
        alt={`Advocate ${site.advocate.name} — professional portrait`}
        fill
        sizes="(max-width: 1024px) 80vw, 340px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-kiwi-dark/80 via-transparent to-transparent" />
    </motion.div>
  );
}