import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AREAS, getAreaBySlug, getContenidosPorArea } from "@san-julian/shared";
import { AreaContentGrid } from "@/components/AreaContentGrid";

export function generateStaticParams() {
  return AREAS.map((area) => ({ area: area.slug }));
}

export function generateMetadata({ params }: { params: { area: string } }): Metadata {
  const area = getAreaBySlug(params.area);
  if (!area) return {};
  return { title: area.nombre, description: area.descripcionCorta };
}

export default function AreaPage({ params }: { params: { area: string } }) {
  const area = getAreaBySlug(params.area);
  if (!area) notFound();

  const contenidos = getContenidosPorArea(area.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <span
        className="inline-block h-1.5 w-14 rounded-full"
        style={{ backgroundColor: `hsl(${area.color})` }}
        aria-hidden
      />
      <h1 className="mt-4 font-serif text-3xl font-bold sm:text-4xl">{area.nombre}</h1>
      <p className="mt-2 max-w-2xl text-lg text-muted-foreground">{area.descripcionCorta}</p>

      <div className="mt-8">
        <AreaContentGrid items={contenidos} />
      </div>
    </div>
  );
}
