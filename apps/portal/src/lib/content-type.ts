import type { ContentType } from "@san-julian/shared";
import {
  FileText,
  Image as ImageIcon,
  Mic,
  Clapperboard,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";

export const CONTENT_TYPE_ICON: Record<ContentType, LucideIcon> = {
  articulo: FileText,
  infografia: ImageIcon,
  podcast: Mic,
  video: Clapperboard,
  "material-didactico": GraduationCap,
};
