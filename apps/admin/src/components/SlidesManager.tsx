"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Eye,
  EyeOff,
  ImagePlus,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import type { SlidePortada } from "@san-julian/shared";

const SLIDE_VACIO: SlidePortada = {
  id: "",
  titulo: "",
  texto: "",
  imagenUrl: "",
  enlace: null,
  activo: true,
};

export function SlidesManager({ slides: iniciales }: { slides: SlidePortada[] }) {
  const [slides, setSlides] = useState(iniciales);
  const [editando, setEditando] = useState<SlidePortada | null>(null);

  function mover(i: number, delta: number) {
    setSlides((prev) => {
      const next = [...prev];
      [next[i], next[i + delta]] = [next[i + delta], next[i]];
      return next;
    });
  }

  function guardar(slide: SlidePortada) {
    setSlides((prev) =>
      slide.id
        ? prev.map((s) => (s.id === slide.id ? slide : s))
        : [...prev, { ...slide, id: `slide-${Date.now()}` }],
    );
    setEditando(null);
  }

  const activos = slides.filter((s) => s.activo).length;

  return (
    <div className="p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {activos} de {slides.length} slide{slides.length === 1 ? "" : "s"} visible
          {activos === 1 ? "" : "s"} en el portal. El orden de la lista es el orden del carrusel.
        </p>
        <button
          type="button"
          onClick={() => setEditando(SLIDE_VACIO)}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          <Plus className="h-4 w-4" aria-hidden />
          Nuevo slide
        </button>
      </div>

      {slides.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border px-6 py-10 text-center text-sm text-muted-foreground">
          No hay slides cargados: el carrusel no se mostrará en la portada.
        </p>
      ) : (
        <ol className="space-y-3">
          {slides.map((slide, i) => (
            <li
              key={slide.id}
              className={`flex items-center gap-4 rounded-lg border border-border bg-card p-3 ${
                slide.activo ? "" : "opacity-60"
              }`}
            >
              <span className="w-5 text-center text-sm font-semibold tabular-nums text-muted-foreground">
                {i + 1}
              </span>
              <div
                className="h-16 w-28 shrink-0 rounded-md border border-border bg-muted bg-cover bg-center"
                style={slide.imagenUrl ? { backgroundImage: `url("${slide.imagenUrl}")` } : undefined}
                aria-hidden
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{slide.titulo}</p>
                <p className="truncate text-xs text-muted-foreground">{slide.texto}</p>
                {slide.enlace && (
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    Botón: <span className="font-medium">{slide.enlace.etiqueta}</span> →{" "}
                    {slide.enlace.href}
                  </p>
                )}
              </div>
              <div className="flex shrink-0 items-center gap-0.5">
                <IconButton
                  label="Subir"
                  disabled={i === 0}
                  onClick={() => mover(i, -1)}
                  icon={ArrowUp}
                />
                <IconButton
                  label="Bajar"
                  disabled={i === slides.length - 1}
                  onClick={() => mover(i, 1)}
                  icon={ArrowDown}
                />
                <IconButton
                  label={slide.activo ? "Ocultar del portal" : "Mostrar en el portal"}
                  onClick={() =>
                    setSlides((prev) =>
                      prev.map((s) => (s.id === slide.id ? { ...s, activo: !s.activo } : s)),
                    )
                  }
                  icon={slide.activo ? Eye : EyeOff}
                />
                <IconButton label="Editar" onClick={() => setEditando(slide)} icon={Pencil} />
                <IconButton
                  label="Eliminar"
                  onClick={() => {
                    if (confirm(`¿Eliminar el slide "${slide.titulo}"?`))
                      setSlides((prev) => prev.filter((s) => s.id !== slide.id));
                  }}
                  icon={Trash2}
                />
              </div>
            </li>
          ))}
        </ol>
      )}

      {editando && (
        <SlideEditor slide={editando} onCancel={() => setEditando(null)} onSave={guardar} />
      )}
    </div>
  );
}

function IconButton({
  label,
  icon: Icon,
  onClick,
  disabled,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

function SlideEditor({
  slide,
  onCancel,
  onSave,
}: {
  slide: SlidePortada;
  onCancel: () => void;
  onSave: (slide: SlidePortada) => void;
}) {
  const [draft, setDraft] = useState(slide);
  const [conEnlace, setConEnlace] = useState(!!slide.enlace);
  const imgInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onCancel]);

  function handleImagen(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setDraft({ ...draft, imagenUrl: URL.createObjectURL(file) });
    e.target.value = "";
  }

  const enlace = draft.enlace ?? { etiqueta: "", href: "" };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onCancel}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="slide-editor-title"
        className="max-h-full w-full max-w-2xl overflow-y-auto rounded-lg border border-border bg-card shadow-xl"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault();
          onSave({ ...draft, enlace: conEnlace ? enlace : null });
        }}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 id="slide-editor-title" className="text-base font-semibold">
            {slide.id ? "Editar slide" : "Nuevo slide"}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-muted"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <div className="space-y-5 p-5">
          {/* Vista previa con la misma composicion que el carrusel del portal */}
          <div className="relative isolate aspect-[16/6] overflow-hidden rounded-md border border-border bg-[#0f1e33] text-white">
            {draft.imagenUrl && (
              <div
                className="absolute inset-0 -z-10 bg-cover bg-center"
                style={{ backgroundImage: `url("${draft.imagenUrl}")` }}
              />
            )}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />
            <div className="flex h-full flex-col justify-center px-6">
              <p className="max-w-md font-serif text-xl font-bold leading-tight">
                {draft.titulo || "Título del slide"}
              </p>
              {draft.texto && <p className="mt-2 max-w-md text-xs text-white/85">{draft.texto}</p>}
              {conEnlace && enlace.etiqueta && (
                <span className="mt-3 w-fit rounded bg-white px-3 py-1 text-xs font-semibold text-[#0f1e33]">
                  {enlace.etiqueta}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => imgInputRef.current?.click()}
              className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md bg-black/60 px-3 py-1.5 text-xs font-medium hover:bg-black/75"
            >
              <ImagePlus className="h-3.5 w-3.5" aria-hidden />
              {draft.imagenUrl ? "Cambiar imagen de fondo" : "Subir imagen de fondo"}
            </button>
            <input
              ref={imgInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImagen}
            />
          </div>
          <p className="-mt-3 text-xs text-muted-foreground">
            Recomendado: foto horizontal de al menos 1600 × 700 px. El texto se apoya sobre el
            lado izquierdo, que se oscurece para mantener la legibilidad.
          </p>

          <div>
            <label htmlFor="slide-titulo" className="text-sm font-medium">
              Título
            </label>
            <input
              id="slide-titulo"
              value={draft.titulo}
              onChange={(e) => setDraft({ ...draft, titulo: e.target.value })}
              required
              className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>

          <div>
            <label htmlFor="slide-texto" className="text-sm font-medium">
              Texto
            </label>
            <textarea
              id="slide-texto"
              value={draft.texto}
              onChange={(e) => setDraft({ ...draft, texto: e.target.value })}
              rows={2}
              className="mt-1.5 w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium">
              <input
                type="checkbox"
                checked={conEnlace}
                onChange={(e) => setConEnlace(e.target.checked)}
              />
              Agregar botón con enlace
            </label>
            {conEnlace && (
              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                <input
                  aria-label="Texto del botón"
                  placeholder="Texto del botón (ej: Ver más)"
                  value={enlace.etiqueta}
                  onChange={(e) =>
                    setDraft({ ...draft, enlace: { ...enlace, etiqueta: e.target.value } })
                  }
                  required
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                />
                <input
                  aria-label="Enlace del botón"
                  placeholder="/ambiente o https://..."
                  value={enlace.href}
                  onChange={(e) =>
                    setDraft({ ...draft, enlace: { ...enlace, href: e.target.value } })
                  }
                  required
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </div>
            )}
          </div>

          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={draft.activo}
              onChange={(e) => setDraft({ ...draft, activo: e.target.checked })}
            />
            Visible en el portal
          </label>
        </div>

        <div className="flex justify-end gap-2 border-t border-border px-5 py-4">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={!draft.imagenUrl}
            title={draft.imagenUrl ? undefined : "Subí una imagen de fondo"}
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Guardar slide
          </button>
        </div>
      </form>
    </div>
  );
}
