import type { ContentStatus } from "@san-julian/shared";
import { CONTENT_STATUS_LABEL } from "@san-julian/shared";

// Paleta de estado (fija, nunca se reusa para series/categorías).
const STATUS_STYLE: Record<ContentStatus, { color: string; bg: string }> = {
  borrador: { color: "#52514e", bg: "#e1e0d9" },
  en_revision: { color: "#8a5a00", bg: "#fef0d1" },
  aprobado: { color: "#3d3193", bg: "#e6e2fb" },
  publicado: { color: "#0a6b0a", bg: "#dcf3dc" },
};

export function StatusBadge({ estado }: { estado: ContentStatus }) {
  const style = STATUS_STYLE[estado];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
      style={{ color: style.color, backgroundColor: style.bg }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: style.color }} aria-hidden />
      {CONTENT_STATUS_LABEL[estado]}
    </span>
  );
}
