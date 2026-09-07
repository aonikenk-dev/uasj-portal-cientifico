import type { ContentType } from "@san-julian/shared";
import { CONTENT_TYPE_LABEL } from "@san-julian/shared";
import { CONTENT_TYPE_ICON } from "@/lib/content-type";

export function TypeBadge({ tipo }: { tipo: ContentType }) {
  const Icon = CONTENT_TYPE_ICON[tipo];
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
      <Icon className="h-3.5 w-3.5" aria-hidden />
      {CONTENT_TYPE_LABEL[tipo]}
    </span>
  );
}
