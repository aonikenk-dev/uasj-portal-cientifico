import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <h1 className="font-serif text-3xl font-bold">Página no encontrada</h1>
      <p className="mt-3 text-muted-foreground">
        El contenido que buscás no existe o fue movido.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground no-underline hover:opacity-90"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
