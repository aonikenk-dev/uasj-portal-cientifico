import Link from "next/link";
import type { ContentItem } from "@san-julian/shared";
import { getAreaById } from "@san-julian/shared";
import { formatDate } from "@/lib/format";
import { AreaPill } from "./AreaPill";
import { TypeBadge } from "./TypeBadge";
import { CONTENT_TYPE_ICON } from "@/lib/content-type";

export function ContentCard({ item, showArea = true }: { item: ContentItem; showArea?: boolean }) {
  const area = getAreaById(item.areaId);
  const Icon = CONTENT_TYPE_ICON[item.tipo];

  return (
    <Link
      href={area ? `/${area.slug}/${item.slug}` : "#"}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card text-card-foreground no-underline transition-shadow hover:shadow-md"
    >
      <div
        className="flex aspect-[16/9] items-center justify-center border-b border-border"
        style={{ backgroundColor: area ? `hsl(${area.color} / 0.12)` : undefined }}
      >
        <Icon
          className="h-10 w-10 opacity-40"
          style={{ color: area ? `hsl(${area.color})` : undefined }}
          aria-hidden
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <TypeBadge tipo={item.tipo} />
          {showArea && area ? <AreaPill area={area} /> : null}
        </div>
        <h3 className="text-base font-semibold leading-snug group-hover:underline">
          {item.titulo}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{item.resumen}</p>
        <div className="mt-auto flex items-center justify-between pt-2 text-xs text-muted-foreground">
          <span>{formatDate(item.fechaPublicacion)}</span>
          <span>{item.metrica.tiempoLecturaMin} min</span>
        </div>
      </div>
    </Link>
  );
}
