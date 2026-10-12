"use client";

import { useEffect, useState } from "react";
import { Check, Pencil, X } from "lucide-react";
import { AREA_ICONOS, type Area } from "@san-julian/shared";
import { hexToHsl, hslToHex } from "@/lib/color";
import { AreaLogo } from "./AreaLogo";

export function AreasManager({
  areas: iniciales,
  cantidades,
}: {
  areas: Area[];
  cantidades: Record<string, number>;
}) {
  const [areas, setAreas] = useState(iniciales);
  const [editando, setEditando] = useState<Area | null>(null);

  return (
    <>
      <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
        {areas.map((area) => {
          const cantidad = cantidades[area.id] ?? 0;
          return (
            <div key={area.id} className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-start justify-between">
                <AreaLogo color={area.color} icono={area.icono} />
                <button
                  type="button"
                  onClick={() => setEditando(area)}
                  className="rounded-md p-1.5 text-muted-foreground hover:bg-muted"
                  aria-label={`Editar ${area.nombre}`}
                >
                  <Pencil className="h-4 w-4" aria-hidden />
                </button>
              </div>
              <h2 className="mt-3 text-base font-semibold">{area.nombre}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{area.descripcionCorta}</p>
              <p className="mt-4 text-xs font-medium text-muted-foreground">
                {cantidad} contenido{cantidad === 1 ? "" : "s"}
              </p>
            </div>
          );
        })}
      </div>

      {editando && (
        <AreaEditor
          area={editando}
          onCancel={() => setEditando(null)}
          onSave={(actualizada) => {
            setAreas((prev) => prev.map((a) => (a.id === actualizada.id ? actualizada : a)));
            setEditando(null);
          }}
        />
      )}
    </>
  );
}

function AreaEditor({
  area,
  onCancel,
  onSave,
}: {
  area: Area;
  onCancel: () => void;
  onSave: (area: Area) => void;
}) {
  const [draft, setDraft] = useState(area);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onCancel}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="area-editor-title"
        className="max-h-full w-full max-w-lg overflow-y-auto rounded-lg border border-border bg-card shadow-xl"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault();
          onSave(draft);
        }}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 id="area-editor-title" className="text-base font-semibold">
            Editar área
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
          <div>
            <span className="text-xs font-medium text-muted-foreground">Vista previa en el portal</span>
            <div className="mt-2 flex items-center gap-6 rounded-md border border-border bg-background p-4">
              <div className="flex items-center gap-3">
                <AreaLogo color={draft.color} icono={draft.icono} />
                <span className="text-sm font-semibold">{draft.nombre || "Área"}</span>
              </div>
              <div className="flex flex-col gap-1 text-sm font-medium">
                {draft.nombre || "Área"}
                <span
                  className="h-[3px] rounded-full"
                  style={{ backgroundColor: `hsl(${draft.color})` }}
                />
                <span className="text-[10px] font-normal text-muted-foreground">menú superior</span>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="area-nombre" className="text-sm font-medium">
              Nombre
            </label>
            <input
              id="area-nombre"
              value={draft.nombre}
              onChange={(e) => setDraft({ ...draft, nombre: e.target.value })}
              required
              className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>

          <div>
            <label htmlFor="area-descripcion" className="text-sm font-medium">
              Descripción corta
            </label>
            <textarea
              id="area-descripcion"
              value={draft.descripcionCorta}
              onChange={(e) => setDraft({ ...draft, descripcionCorta: e.target.value })}
              rows={2}
              className="mt-1.5 w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>

          <div>
            <label htmlFor="area-color" className="text-sm font-medium">
              Color
            </label>
            <div className="mt-1.5 flex items-center gap-3">
              <input
                id="area-color"
                type="color"
                value={hslToHex(draft.color)}
                onChange={(e) => setDraft({ ...draft, color: hexToHsl(e.target.value) })}
                className="h-9 w-14 cursor-pointer rounded-md border border-border bg-background p-1"
              />
              <span className="font-mono text-xs text-muted-foreground">
                {hslToHex(draft.color)}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              El icono se muestra en blanco: elegí un color suficientemente oscuro para que contraste.
            </p>
          </div>

          <fieldset>
            <legend className="text-sm font-medium">Icono</legend>
            <div className="mt-2 grid grid-cols-6 gap-2">
              {AREA_ICONOS.map(({ id, label, Icon }) => {
                const activo = draft.icono === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setDraft({ ...draft, icono: id })}
                    aria-label={label}
                    aria-pressed={activo}
                    title={label}
                    className={`relative flex aspect-square items-center justify-center rounded-md border transition-colors ${
                      activo
                        ? "border-transparent text-white"
                        : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                    style={activo ? { backgroundColor: `hsl(${draft.color})` } : undefined}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                    {activo && (
                      <Check
                        className="absolute right-0.5 top-0.5 h-3 w-3"
                        aria-hidden
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </fieldset>
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
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
}
