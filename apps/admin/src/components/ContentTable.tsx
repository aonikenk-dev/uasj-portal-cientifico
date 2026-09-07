import Link from "next/link";
import type { ContentItem } from "@san-julian/shared";
import { CONTENT_TYPE_LABEL, getAreaById, getAutorById } from "@san-julian/shared";
import { StatusBadge } from "./StatusBadge";
import { formatShortDate } from "@/lib/format";

export function ContentTable({ items }: { items: ContentItem[] }) {
  if (items.length === 0) {
    return (
      <p className="px-6 py-10 text-center text-sm text-muted-foreground">
        No hay contenidos que coincidan con estos filtros.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
            <th className="px-6 py-3 font-medium">Título</th>
            <th className="px-4 py-3 font-medium">Área</th>
            <th className="px-4 py-3 font-medium">Tipo</th>
            <th className="px-4 py-3 font-medium">Autor</th>
            <th className="px-4 py-3 font-medium">Estado</th>
            <th className="px-4 py-3 font-medium">Fecha</th>
            <th className="px-4 py-3 text-right font-medium">Visitas</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const area = getAreaById(item.areaId);
            const autor = getAutorById(item.autorId);
            return (
              <tr key={item.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                <td className="max-w-xs px-6 py-3">
                  <Link
                    href={`/contenidos/${item.id}`}
                    className="font-medium text-foreground no-underline hover:underline"
                  >
                    {item.titulo}
                  </Link>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{area?.nombre ?? "—"}</td>
                <td className="px-4 py-3 text-muted-foreground">{CONTENT_TYPE_LABEL[item.tipo]}</td>
                <td className="px-4 py-3 text-muted-foreground">{autor?.nombre ?? "—"}</td>
                <td className="px-4 py-3">
                  <StatusBadge estado={item.estado} />
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {formatShortDate(item.fechaPublicacion)}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                  {item.metrica.visitas.toLocaleString("es-AR")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
