import { Pencil, Plus } from "lucide-react";
import { AREAS, CONTENIDOS } from "@san-julian/shared";
import { Topbar } from "@/components/Topbar";

export const metadata = { title: "Categorías" };

export default function CategoriasPage() {
  return (
    <div>
      <Topbar
        title="Áreas temáticas"
        description="Las 5 áreas que estructuran el portal público"
        action={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
          >
            <Plus className="h-4 w-4" aria-hidden />
            Nueva área
          </button>
        }
      />

      <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
        {AREAS.map((area) => {
          const cantidad = CONTENIDOS.filter((c) => c.areaId === area.id).length;
          return (
            <div key={area.id} className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-start justify-between">
                <span
                  className="h-2 w-10 rounded-full"
                  style={{ backgroundColor: `hsl(${area.color})` }}
                  aria-hidden
                />
                <button
                  type="button"
                  className="rounded-md p-1.5 text-muted-foreground hover:bg-muted"
                  aria-label={`Editar ${area.nombre}`}
                >
                  <Pencil className="h-4 w-4" aria-hidden />
                </button>
              </div>
              <h2 className="mt-3 text-base font-semibold">{area.nombre}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{area.descripcionCorta}</p>
              <p className="mt-4 text-xs font-medium text-muted-foreground">
                {cantidad} contenido{cantidad === 1 ? "" : "s"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
