"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import {
  AREAS,
  CONTENT_TYPE_LABEL,
  getContenidosPublicados,
  type ContentType,
} from "@san-julian/shared";
import { ContentCard } from "./ContentCard";

const TIPOS = Object.keys(CONTENT_TYPE_LABEL) as ContentType[];

export function BuscarClient() {
  const searchParams = useSearchParams();
  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const [areaId, setAreaId] = useState<string | "todas">("todas");
  const [tipo, setTipo] = useState<ContentType | "todos">("todos");

  const contenidos = useMemo(() => getContenidosPublicados(), []);

  const resultados = useMemo(() => {
    const query = q.trim().toLowerCase();
    return contenidos.filter((item) => {
      const matchesQuery =
        query.length === 0 ||
        item.titulo.toLowerCase().includes(query) ||
        item.resumen.toLowerCase().includes(query) ||
        item.tags.some((t) => t.toLowerCase().includes(query));
      const matchesArea = areaId === "todas" || item.areaId === areaId;
      const matchesTipo = tipo === "todos" || item.tipo === tipo;
      return matchesQuery && matchesArea && matchesTipo;
    });
  }, [contenidos, q, areaId, tipo]);

  return (
    <div>
      <div className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2.5">
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
        <label htmlFor="buscar-input" className="sr-only">
          Buscar contenidos
        </label>
        <input
          id="buscar-input"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por título, resumen o etiqueta..."
          className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
          autoFocus
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <select
          value={areaId}
          onChange={(e) => setAreaId(e.target.value)}
          className="rounded-md border border-border bg-card px-3 py-2 text-sm"
          aria-label="Filtrar por área temática"
        >
          <option value="todas">Todas las áreas</option>
          {AREAS.map((area) => (
            <option key={area.id} value={area.id}>
              {area.nombre}
            </option>
          ))}
        </select>

        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value as ContentType | "todos")}
          className="rounded-md border border-border bg-card px-3 py-2 text-sm"
          aria-label="Filtrar por tipo de contenido"
        >
          <option value="todos">Todos los formatos</option>
          {TIPOS.map((t) => (
            <option key={t} value={t}>
              {CONTENT_TYPE_LABEL[t]}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        {resultados.length} resultado{resultados.length === 1 ? "" : "s"}
      </p>

      {resultados.length === 0 ? (
        <p className="mt-4 text-muted-foreground">
          No encontramos contenidos con esos criterios. Probá con otras palabras clave.
        </p>
      ) : (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {resultados.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
