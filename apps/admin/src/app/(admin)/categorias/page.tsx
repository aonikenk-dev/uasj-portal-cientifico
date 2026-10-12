import { Plus } from "lucide-react";
import { AREAS, CONTENIDOS } from "@san-julian/shared";
import { Topbar } from "@/components/Topbar";
import { AreasManager } from "@/components/AreasManager";

export const metadata = { title: "Categorías" };

export default function CategoriasPage() {
  const cantidades: Record<string, number> = {};
  for (const c of CONTENIDOS) cantidades[c.areaId] = (cantidades[c.areaId] ?? 0) + 1;

  return (
    <div>
      <Topbar
        title="Áreas temáticas"
        description="Las 5 áreas que estructuran el portal público. Cada una tiene un color y un icono propios."
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

      <AreasManager areas={AREAS} cantidades={cantidades} />
    </div>
  );
}
