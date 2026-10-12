import Link from "next/link";
import {
  AREAS,
  getDestacados,
  getContenidosPublicados,
  getSlidesPortada,
} from "@san-julian/shared";
import { AreaLogo } from "@/components/AreaLogo";
import { ContentCard } from "@/components/ContentCard";
import { HeroCarousel } from "@/components/HeroCarousel";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SearchBar } from "@/components/SearchBar";

export default function HomePage() {
  const slides = getSlidesPortada();
  const destacados = getDestacados().slice(0, 3);
  const ultimas = getContenidosPublicados().slice(0, 6);

  return (
    <div>
      <h1 className="sr-only">
        San Julián hace ciencia: portal de divulgación científica de la UASJ
      </h1>
      <HeroCarousel slides={slides} />

      <div className="border-b border-border bg-muted/40">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-muted-foreground">
            ¿Buscás algo en particular?
          </p>
          <div className="w-full max-w-md">
            <SearchBar />
          </div>
        </div>
      </div>

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
              className="flex flex-col gap-3 rounded-lg border border-border bg-card p-5 no-underline transition-shadow hover:shadow-md"
            >
              <AreaLogo area={area} />
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
