import {
  Anchor,
  Building2,
  Coins,
  Factory,
  Fish,
  Globe,
  GraduationCap,
  HeartHandshake,
  Hourglass,
  Landmark,
  Leaf,
  Lightbulb,
  Mountain,
  ScrollText,
  Trees,
  TrendingUp,
  Users,
  Waves,
  type LucideIcon,
} from "lucide-react";
import type { AreaIcono } from "./types";

// Catalogo de iconos que el CMS ofrece para identificar un area. Vive en el
// paquete compartido para que el selector del admin y el portal usen
// exactamente el mismo mapeo nombre -> componente.

export const AREA_ICONOS: { id: AreaIcono; label: string; Icon: LucideIcon }[] = [
  { id: "leaf", label: "Hoja", Icon: Leaf },
  { id: "trees", label: "Árboles", Icon: Trees },
  { id: "fish", label: "Pez", Icon: Fish },
  { id: "waves", label: "Mar", Icon: Waves },
  { id: "mountain", label: "Montaña", Icon: Mountain },
  { id: "users", label: "Personas", Icon: Users },
  { id: "heart-handshake", label: "Comunidad", Icon: HeartHandshake },
  { id: "graduation-cap", label: "Educación", Icon: GraduationCap },
  { id: "scroll-text", label: "Documento histórico", Icon: ScrollText },
  { id: "landmark", label: "Patrimonio", Icon: Landmark },
  { id: "hourglass", label: "Tiempo", Icon: Hourglass },
  { id: "coins", label: "Monedas", Icon: Coins },
  { id: "factory", label: "Industria", Icon: Factory },
  { id: "anchor", label: "Puerto", Icon: Anchor },
  { id: "trending-up", label: "Crecimiento", Icon: TrendingUp },
  { id: "building", label: "Ciudad", Icon: Building2 },
  { id: "lightbulb", label: "Idea", Icon: Lightbulb },
  { id: "globe", label: "Mundo", Icon: Globe },
];

export function getAreaIcon(id: AreaIcono): LucideIcon {
  return AREA_ICONOS.find((i) => i.id === id)?.Icon ?? Leaf;
}
