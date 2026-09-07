import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AREAS, getDestacados, getContenidosPublicados } from "@san-julian/shared";
import { ContentCard } from "@/components/ContentCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SearchBar } from "@/components/SearchBar";

export default function HomePage() {
  const destacados = getDestacados().slice(0, 3);
  const ultimas = getContenidosPublicados().slice(0, 6);

  return (
    <div>
      <section className="border-b border-border bg-gradient-to-b from-muted/60 to-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            UNPA · Unidad Académica San Julián
          </p>
          <h1 className="mt-3 max-w-2xl font-serif text-4xl font-bold leading-tight sm:text-5xl">
            Portal de divulgación científica de la UASJ, accesible para toda la comunidad.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Artículos, infografías, podcasts y materiales didácticos que traducen la
            producción científica de la UASJ a un lenguaje claro y accesible.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#areas"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground no-underline hover:opacity-90"
            >
              Explorar áreas
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/novedades"
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-semibold no-underline hover:bg-muted"
            >
              Ver novedades
            </Link>
          </div>
          <div className="mt-6 max-w-md">
            <SearchBar />
          </div>
        </div>
      </section>

      <section id="areas" className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-serif text-2xl font-semibold">Áreas temáticas</h2>
        <p className="mt-1 text-muted-foreground">
          Cinco recorridos posibles por la producción científica del territorio.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {AREAS.map((area) => (
            <Link
              key={area.id}
              href={`/${area.slug}`}
              className="flex flex-col gap-2 rounded-lg border border-border bg-card p-5 no-underline transition-shadow hover:shadow-md"
            >
              <span
                className="h-1.5 w-10 rounded-full"
                style={{ backgroundColor: `hsl(${area.color})` }}
                aria-hidden
              />
              <span className="font-serif text-lg font-semibold text-foreground">
                {area.nombre}
              </span>
              <span className="text-sm text-muted-foreground">{area.descripcionCorta}</span>
            </Link>
          ))}
        </div>
      </section>

      {destacados.length > 0 && (
        <section className="border-y border-border bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="font-serif text-2xl font-semibold">Contenidos destacados</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {destacados.map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl font-semibold">Últimas publicaciones</h2>
          <Link href="/novedades" className="text-sm font-medium text-primary no-underline hover:underline">
            Ver todas
          </Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ultimas.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-12 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-xl font-semibold">Recibí las novedades por email</h2>
            <p className="mt-1 text-sm text-primary-foreground/80">
              Un correo cada vez que publicamos contenido nuevo. Sin spam.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
