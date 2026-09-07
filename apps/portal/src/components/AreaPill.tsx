import Link from "next/link";
import type { Area } from "@san-julian/shared";

export function AreaPill({ area, href }: { area: Area; href?: string }) {
  const style = {
    color: `hsl(${area.color})`,
    borderColor: `hsl(${area.color} / 0.35)`,
    backgroundColor: `hsl(${area.color} / 0.08)`,
  } as React.CSSProperties;
  const content = (
    <span
      style={style}
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium"
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: `hsl(${area.color})` }}
        aria-hidden
      />
      {area.nombre}
    </span>
  );

  if (!href) return content;
  return (
    <Link href={href} className="no-underline hover:opacity-80">
      {content}
    </Link>
  );
}
