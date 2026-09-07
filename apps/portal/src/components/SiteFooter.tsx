import Link from "next/link";
import { AREAS } from "@san-julian/shared";

const ODS = [
  { n: 4, nombre: "Educación de calidad" },
  { n: 11, nombre: "Ciudades y comunidades sostenibles" },
  { n: 17, nombre: "Alianzas para lograr los objetivos" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="font-serif text-lg font-semibold">San Julián hace ciencia</p>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Divulgación científica de la Unidad Académica San Julián (UNPA–UASJ), en
            lenguaje claro para toda la comunidad.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Áreas</p>
          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
            {AREAS.map((area) => (
              <li key={area.id}>
                <Link href={`/${area.slug}`} className="hover:text-foreground">
                  {area.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Objetivos de Desarrollo Sostenible</p>
          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
            {ODS.map((o) => (
              <li key={o.n}>
                ODS {o.n} · {o.nombre}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-4 py-4 text-center text-xs text-muted-foreground">
        Universidad Nacional de la Patagonia Austral · Unidad Académica San Julián ·
        Puerto San Julián, Santa Cruz
      </div>
    </footer>
  );
}
