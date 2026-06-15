import {
  BookOpen,
  Clock,
  FileText,
  Gavel,
  Landmark,
  MapPin,
  Scale,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { PracticeAreaIcon, StatIcon } from "@/lib/content";

const practiceAreaIcons: Record<PracticeAreaIcon, LucideIcon> = {
  landmark: Landmark,
  "file-text": FileText,
  gavel: Gavel,
  users: Users,
  "shield-check": ShieldCheck,
};

const statIcons: Record<StatIcon, LucideIcon> = {
  clock: Clock,
  "book-open": BookOpen,
  "map-pin": MapPin,
  landmark: Landmark,
};

export function getPracticeAreaIcon(icon: PracticeAreaIcon): LucideIcon {
  return practiceAreaIcons[icon];
}

export function getStatIcon(icon: StatIcon): LucideIcon {
  return statIcons[icon];
}