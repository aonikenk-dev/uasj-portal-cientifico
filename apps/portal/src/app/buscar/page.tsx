import { Suspense } from "react";
import { BuscarClient } from "@/components/BuscarClient";

export const metadata = { title: "Buscar" };

export default function BuscarPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-serif text-3xl font-bold">Buscar contenidos</h1>
      <p className="mt-2 text-muted-foreground">
        Explorá artículos, infografías, podcasts, videos y materiales didácticos.
      </p>
      <div className="mt-8">
        <Suspense fallback={<p className="text-muted-foreground">Cargando buscador...</p>}>
          <BuscarClient />
        </Suspense>
      </div>
    </div>
  );
}
