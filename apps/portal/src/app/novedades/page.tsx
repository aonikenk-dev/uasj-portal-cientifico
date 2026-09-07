import { getContenidosPublicados } from "@san-julian/shared";
import { ContentCard } from "@/components/ContentCard";

export const metadata = { title: "Novedades" };

function mesDe(iso: string) {
  return new Intl.DateTimeFormat("es-AR", { month: "long", year: "numeric" }).format(
    new Date(iso),
  );
}

export default function NovedadesPage() {
  const contenidos = getContenidosPublicados();

  const grupos = new Map<string, typeof contenidos>();
  for (const item of contenidos) {
    const key = mesDe(item.fechaPublicacion);
    grupos.set(key, [...(grupos.get(key) ?? []), item]);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-serif text-3xl font-bold">Novedades</h1>
      <p className="mt-2 text-muted-foreground">
        Todo lo que publicamos, ordenado del más reciente al más antiguo.
      </p>

      <div className="mt-10 space-y-12">
        {Array.from(grupos.entries()).map(([mes, items]) => (
          <section key={mes}>
            <h2 className="font-serif text-xl font-semibold capitalize">{mes}</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
