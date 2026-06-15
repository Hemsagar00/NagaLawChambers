import {
  BookOpen,
  Clock,
  FileText,
  Landmark,
  MapPin,
  Scale,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { PracticeAreaIcon, StatIcon } from "@/lib/content";

const practiceAreaIcons: Record<PracticeAreaIcon, LucideIcon> = {
  landmark: Landmark,
  "file-text": FileText,
  scale: Scale,
  users: Users,
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