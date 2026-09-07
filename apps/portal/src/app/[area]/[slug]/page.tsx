import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CONTENIDOS,
  CONTENT_TYPE_LABEL,
  getAreaBySlug,
  getAreaById,
  getAutorById,
  getContenidoBySlug,
  getContenidosPorArea,
} from "@san-julian/shared";
import { formatDate, stripHtml } from "@/lib/format";
import { TypeBadge } from "@/components/TypeBadge";
import { AreaPill } from "@/components/AreaPill";
import { TextToSpeechButton } from "@/components/TextToSpeechButton";
import { ShareButtons } from "@/components/ShareButtons";
import { ContentCard } from "@/components/ContentCard";
import { CONTENT_TYPE_ICON } from "@/lib/content-type";
import { FileDown } from "lucide-react";

export function generateStaticParams() {
  return CONTENIDOS.map((item) => {
    const area = getAreaById(item.areaId);
    return { area: area?.slug ?? "", slug: item.slug };
  });
}

export function generateMetadata({
  params,
}: {
  params: { area: string; slug: string };
}): Metadata {
  const item = getContenidoBySlug(params.slug);
  if (!item) return {};
  return { title: item.titulo, description: item.resumen };
}

export default function ContentDetailPage({
  params,
}: {
  params: { area: string; slug: string };
}) {
  const area = getAreaBySlug(params.area);
  const item = getContenidoBySlug(params.slug);

  if (!area || !item || item.areaId !== area.id) notFound();

  const autor = getAutorById(item.autorId);
  const relacionados = getContenidosPorArea(area.id)
    .filter((c) => c.id !== item.id)
    .slice(0, 3);
  const Icon = CONTENT_TYPE_ICON[item.tipo];

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <nav aria-label="Miga de pan" className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Inicio
        </Link>{" "}
        /{" "}
        <Link href={`/${area.slug}`} className="hover:text-foreground">
          {area.nombre}
        </Link>{" "}
        / <span className="text-foreground">{CONTENT_TYPE_LABEL[item.tipo]}</span>
      </nav>

      <div className="flex items-center gap-3">
        <TypeBadge tipo={item.tipo} />
        <AreaPill area={area} href={`/${area.slug}`} />
      </div>

      <h1 className="mt-3 font-serif text-3xl font-bold leading-tight sm:text-4xl">
        {item.titulo}
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">{item.resumen}</p>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
        {autor && <span>Por {autor.nombre}</span>}
        <span>·</span>
        <span>{formatDate(item.fechaPublicacion)}</span>
        <span>·</span>
        <span>{item.metrica.tiempoLecturaMin} min de lectura</span>
        <span>·</span>
        <span>{item.metrica.visitas.toLocaleString("es-AR")} visitas</span>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 border-y border-border py-3">
        <TextToSpeechButton text={`${item.titulo}. ${item.resumen}. ${stripHtml(item.cuerpo)}`} />
        <ShareButtons title={item.titulo} />
      </div>

      <div
        className="mt-8 flex aspect-[16/7] items-center justify-center rounded-lg border border-border"
        style={{ backgroundColor: `hsl(${area.color} / 0.1)` }}
      >
        <Icon className="h-14 w-14 opacity-40" style={{ color: `hsl(${area.color})` }} aria-hidden />
      </div>

      <div
        className="prose prose-neutral mt-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: item.cuerpo }}
      />

      {item.documentoAcademico && (
        <a
          href={item.documentoAcademico.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 flex items-center gap-3 rounded-lg border border-border bg-muted/40 p-4 no-underline hover:bg-muted"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <FileDown className="h-5 w-5" aria-hidden />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold text-foreground">
              Documento académico completo
            </span>
            <span className="block truncate text-xs text-muted-foreground">
              {item.documentoAcademico.nombreArchivo}
              {item.documentoAcademico.tamanioKB
                ? ` · ${(item.documentoAcademico.tamanioKB / 1024).toFixed(1)} MB`
                : ""}
            </span>
          </span>
        </a>
      )}

      {item.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {relacionados.length > 0 && (
        <section className="mt-14 border-t border-border pt-8">
          <h2 className="font-serif text-xl font-semibold">Más de {area.nombre}</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            {relacionados.map((rel) => (
              <ContentCard key={rel.id} item={rel} showArea={false} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
