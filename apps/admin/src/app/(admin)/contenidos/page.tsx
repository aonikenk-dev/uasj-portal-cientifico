import Link from "next/link";
import { Plus, Filter } from "lucide-react";
import {
  AREAS,
  CONTENIDOS,
  CONTENT_STATUS_LABEL,
  CONTENT_TYPE_LABEL,
  type ContentStatus,
  type ContentType,
} from "@san-julian/shared";
import { Topbar } from "@/components/Topbar";
import { ContentTable } from "@/components/ContentTable";

export const metadata = { title: "Contenidos" };

const ESTADOS = Object.keys(CONTENT_STATUS_LABEL) as ContentStatus[];
const TIPOS = Object.keys(CONTENT_TYPE_LABEL) as ContentType[];

export default function ContenidosPage({
  searchParams,
}: {
  searchParams: { estado?: string; area?: string; tipo?: string; q?: string };
}) {
  const { estado, area: areaId, tipo, q } = searchParams;

  const filtrados = CONTENIDOS.filter((item) => {
    const matchesEstado = !estado || item.estado === estado;
    const matchesArea = !areaId || item.areaId === areaId;
    const matchesTipo = !tipo || item.tipo === tipo;
    const matchesQuery = !q || item.titulo.toLowerCase().includes(q.toLowerCase());
    return matchesEstado && matchesArea && matchesTipo && matchesQuery;
  }).sort((a, b) => new Date(b.fechaActualizacion).getTime() - new Date(a.fechaActualizacion).getTime());

  return (
    <div>
      <Topbar
        title="Contenidos"
        description={`${CONTENIDOS.length} contenidos en total`}
        action={
          <Link
            href="/contenidos/nuevo"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground no-underline hover:opacity-90"
          >
            <Plus className="h-4 w-4" aria-hidden />
            Nuevo contenido
          </Link>
        }
      />

      <div className="p-6">
        <form className="mb-5 flex flex-wrap items-end gap-3 rounded-lg border border-border bg-card p-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="q" className="text-xs font-medium text-muted-foreground">
              Buscar por título
            </label>
            <input
              id="q"
              name="q"
              defaultValue={q}
              placeholder="Ej: mareas"
              className="rounded-md border border-border bg-background px-3 py-1.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="estado" className="text-xs font-medium text-muted-foreground">
              Estado
            </label>
            <select
              id="estado"
              name="estado"
              defaultValue={estado ?? ""}
              className="rounded-md border border-border bg-background px-3 py-1.5 text-sm"
            >
              <option value="">Todos</option>
              {ESTADOS.map((e) => (
                <option key={e} value={e}>
                  {CONTENT_STATUS_LABEL[e]}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="area" className="text-xs font-medium text-muted-foreground">
              Área
            </label>
            <select
              id="area"
              name="area"
              defaultValue={areaId ?? ""}
              className="rounded-md border border-border bg-background px-3 py-1.5 text-sm"
            >
              <option value="">Todas</option>
              {AREAS.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="tipo" className="text-xs font-medium text-muted-foreground">
              Tipo
            </label>
            <select
              id="tipo"
              name="tipo"
              defaultValue={tipo ?? ""}
              className="rounded-md border border-border bg-background px-3 py-1.5 text-sm"
            >
              <option value="">Todos</option>
              {TIPOS.map((t) => (
                <option key={t} value={t}>
                  {CONTENT_TYPE_LABEL[t]}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-1.5 text-sm font-medium hover:bg-muted"
          >
            <Filter className="h-4 w-4" aria-hidden />
            Filtrar
          </button>
        </form>

        <div className="rounded-lg border border-border bg-card">
          <ContentTable items={filtrados} />
        </div>
      </div>
    </div>
  );
}
