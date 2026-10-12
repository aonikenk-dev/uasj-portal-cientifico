import Link from "next/link";
import { AREAS } from "@san-julian/shared";
import { ContactForm } from "./ContactForm";

// TODO: reemplazar cada href "#" por el link al contenido de ese ODS.
const ODS = [
  { n: 4, nombre: "Educación de calidad", href: "#" },
  { n: 11, nombre: "Ciudades y comunidades sostenibles", href: "#" },
  { n: 17, nombre: "Alianzas para lograr los objetivos", href: "#" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div id="contacto" className="scroll-mt-28">
          <p className="font-serif text-lg font-semibold">San Julián hace ciencia</p>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Divulgación científica de la Unidad Académica San Julián (UNPA–UASJ), en
            lenguaje claro para toda la comunidad.
          </p>
          <div className="mt-5">
            <ContactForm />
          </div>
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
                <Link href={o.href} className="hover:text-foreground">
                  ODS {o.n} · {o.nombre}
                </Link>
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
