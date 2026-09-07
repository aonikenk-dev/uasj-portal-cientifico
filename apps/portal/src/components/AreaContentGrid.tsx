"use client";

import { useMemo, useState } from "react";
import type { ContentItem, ContentType } from "@san-julian/shared";
import { CONTENT_TYPE_LABEL } from "@san-julian/shared";
import { ContentCard } from "./ContentCard";

export function AreaContentGrid({ items }: { items: ContentItem[] }) {
  const [tipo, setTipo] = useState<ContentType | "todos">("todos");

  const tiposDisponibles = useMemo(() => {
    const set = new Set(items.map((i) => i.tipo));
    return Array.from(set);
  }, [items]);

  const filtrados = tipo === "todos" ? items : items.filter((i) => i.tipo === tipo);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por tipo de contenido">
        <button
          type="button"
          onClick={() => setTipo("todos")}
          className={`rounded-full border px-3 py-1.5 text-sm font-medium ${
            tipo === "todos"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border hover:bg-muted"
          }`}
        >
          Todos ({items.length})
        </button>
        {tiposDisponibles.map((t) => {
          const count = items.filter((i) => i.tipo === t).length;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setTipo(t)}
              className={`rounded-full border px-3 py-1.5 text-sm font-medium ${
                tipo === t
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:bg-muted"
              }`}
            >
              {CONTENT_TYPE_LABEL[t]} ({count})
            </button>
          );
        })}
      </div>

      {filtrados.length === 0 ? (
        <p className="mt-8 text-muted-foreground">No hay contenidos de este tipo todavía.</p>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((item) => (
            <ContentCard key={item.id} item={item} showArea={false} />
          ))}
        </div>
      )}
    </div>
  );
}
