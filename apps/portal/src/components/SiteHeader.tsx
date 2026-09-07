import Link from "next/link";
import { AREAS } from "@san-julian/shared";
import { Microscope, Search } from "lucide-react";
import { AccessibilityBar } from "./AccessibilityBar";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <a href="#contenido-principal" className="skip-link">
        Saltar al contenido principal
      </a>
      <AccessibilityBar />
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Microscope className="h-5 w-5" aria-hidden />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-lg font-semibold text-foreground">
              San Julián
            </span>
            <span className="-mt-1 text-xs font-medium uppercase tracking-wide text-accent">
              hace ciencia
            </span>
          </span>
        </Link>

        <nav aria-label="Áreas temáticas" className="order-3 w-full lg:order-2 lg:w-auto">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm font-medium">
            {AREAS.map((area) => (
              <li key={area.id}>
                <Link
                  href={`/${area.slug}`}
                  className="text-foreground/80 no-underline hover:text-foreground"
                >
                  {area.nombre}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/novedades"
                className="text-foreground/80 no-underline hover:text-foreground"
              >
                Novedades
              </Link>
            </li>
          </ul>
        </nav>

        <Link
          href="/buscar"
          aria-label="Buscar contenidos"
          className="order-2 flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground hover:bg-muted lg:order-3"
        >
          <Search className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </header>
  );
}
