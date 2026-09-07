"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  UploadCloud,
  Save,
  Send,
  FileText,
  FileUp,
  X,
  Maximize2,
  Minimize2,
  Mic,
  Video,
  type LucideIcon,
} from "lucide-react";
import {
  AREAS,
  AUTORES,
  CONTENT_TYPE_LABEL,
  SIGUIENTE_ESTADO,
  type ContentItem,
  type ContentStatus,
  type ContentType,
  type DocumentoAdjunto,
} from "@san-julian/shared";
import { RichTextEditor } from "./editor/RichTextEditor";
import { StatusBadge } from "./StatusBadge";

const TIPOS = Object.keys(CONTENT_TYPE_LABEL) as ContentType[];

const MULTIMEDIA_HINT: Record<ContentType, string> = {
  articulo: "Imagen de portada (JPG/PNG)",
  infografia: "Archivo de infografía (SVG/PNG)",
  podcast: "Audio (MP3) o enlace a Spotify/SoundCloud",
  video: "Video (MP4) o enlace de YouTube",
  "material-didactico": "Documento descargable (PDF)",
};

const MULTIMEDIA_ACCEPT: Record<ContentType, string> = {
  articulo: "image/*",
  infografia: "image/*,.svg",
  podcast: "audio/*",
  video: "video/*",
  "material-didactico": "application/pdf,.pdf",
};

const MULTIMEDIA_ICON: Partial<Record<ContentType, LucideIcon>> = {
  podcast: Mic,
  video: Video,
  "material-didactico": FileText,
};

const isImagenTipo = (t: ContentType) => t === "articulo" || t === "infografia";

const PRIMARY_ACTION_LABEL: Record<ContentStatus, string> = {
  borrador: "Enviar a revisión",
  en_revision: "Aprobar",
  aprobado: "Publicar",
  publicado: "Publicado",
};

interface ArchivoLocal {
  nombre: string;
  url: string;
  tamanioKB: number;
}

export function ContentForm({ initial }: { initial?: ContentItem }) {
  const router = useRouter();
  const [tipo, setTipo] = useState<ContentType>(initial?.tipo ?? "articulo");
  const [cuerpo, setCuerpo] = useState(initial?.cuerpo ?? "");
  const [estado, setEstado] = useState<ContentStatus>(initial?.estado ?? "borrador");
  const [documento, setDocumento] = useState<DocumentoAdjunto | null>(
    initial?.documentoAcademico ?? null,
  );
  const [multimedia, setMultimedia] = useState<ArchivoLocal | null>(null);
  const [maximizado, setMaximizado] = useState(false);
  const [saving, setSaving] = useState(false);
  const docInputRef = useRef<HTMLInputElement>(null);
  const mediaInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!maximizado) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMaximizado(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [maximizado]);

  function guardar(nuevoEstado: ContentStatus) {
    setEstado(nuevoEstado);
    setSaving(true);
    setTimeout(() => {
      router.push("/contenidos");
    }, 400);
  }

  function handleDocumentoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setDocumento({
      nombreArchivo: file.name,
      url: URL.createObjectURL(file),
      tamanioKB: Math.round(file.size / 1024),
    });
    e.target.value = "";
  }

  function handleMultimediaChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setMultimedia({
      nombre: file.name,
      url: URL.createObjectURL(file),
      tamanioKB: Math.round(file.size / 1024),
    });
    e.target.value = "";
  }

  const siguienteEstado = SIGUIENTE_ESTADO[estado];
  const publicado = estado === "publicado";
  const MediaIcon = MULTIMEDIA_ICON[tipo];

  return (
    <form
      className="grid gap-6 p-6 lg:grid-cols-[1fr_320px] lg:items-stretch"
      onSubmit={(e) => {
        e.preventDefault();
        if (siguienteEstado) guardar(siguienteEstado);
      }}
    >
      <div className="flex flex-col">
        <div className="flex min-h-0 flex-1 flex-col rounded-lg border border-border bg-card p-5">
          {!maximizado && (
            <>
              <label htmlFor="titulo" className="text-sm font-medium">
                Título
              </label>
              <input
                id="titulo"
                defaultValue={initial?.titulo}
                placeholder="Ej: Por qué San Julián es clave para los elefantes marinos"
                required
                className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />

              <label htmlFor="resumen" className="mt-4 block text-sm font-medium">
                Resumen
              </label>
              <textarea
                id="resumen"
                defaultValue={initial?.resumen}
                rows={2}
                placeholder="Uno o dos párrafos que resuman el contenido para las tarjetas y redes sociales."
                className="mt-1.5 w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </>
          )}

          <div
            className={
              maximizado
                ? "fixed inset-0 z-50 flex flex-col bg-background p-4"
                : "mt-4 flex min-h-0 flex-1 flex-col"
            }
          >
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-sm font-medium">Cuerpo del contenido</span>
              <button
                type="button"
                onClick={() => setMaximizado((m) => !m)}
                className="inline-flex items-center gap-1.5 rounded-md p-1.5 text-muted-foreground hover:bg-muted"
                aria-label={maximizado ? "Minimizar editor" : "Maximizar editor"}
                title={maximizado ? "Minimizar" : "Maximizar"}
              >
                {maximizado ? (
                  <Minimize2 className="h-4 w-4" aria-hidden />
                ) : (
                  <Maximize2 className="h-4 w-4" aria-hidden />
                )}
              </button>
            </div>
            <RichTextEditor content={cuerpo} onChange={setCuerpo} className="min-h-0 flex-1" />
          </div>

          {!maximizado && (
            <>
              <label htmlFor="tags" className="mt-4 block text-sm font-medium">
                Etiquetas
              </label>
              <input
                id="tags"
                defaultValue={initial?.tags.join(", ")}
                placeholder="fauna marina, conservación, monitoreo"
                className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </>
          )}
        </div>
      </div>

      <div className="space-y-5">
        <div className="rounded-lg border border-border bg-card p-5">
          <h2 className="text-sm font-semibold">Clasificación</h2>

          <label htmlFor="area" className="mt-3 block text-xs font-medium text-muted-foreground">
            Área temática
          </label>
          <select
            id="area"
            defaultValue={initial?.areaId ?? AREAS[0].id}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm"
          >
            {AREAS.map((a) => (
              <option key={a.id} value={a.id}>
                {a.nombre}
              </option>
            ))}
          </select>

          <label htmlFor="tipo" className="mt-3 block text-xs font-medium text-muted-foreground">
            Tipo de contenido
          </label>
          <select
            id="tipo"
            value={tipo}
            onChange={(e) => {
              setTipo(e.target.value as ContentType);
              setMultimedia(null);
            }}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm"
          >
            {TIPOS.map((t) => (
              <option key={t} value={t}>
                {CONTENT_TYPE_LABEL[t]}
              </option>
            ))}
          </select>

          <label htmlFor="autor" className="mt-3 block text-xs font-medium text-muted-foreground">
            Autor / responsable
          </label>
          <select
            id="autor"
            defaultValue={initial?.autorId ?? AUTORES[0].id}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm"
          >
            {AUTORES.map((a) => (
              <option key={a.id} value={a.id}>
                {a.nombre}
              </option>
            ))}
          </select>

          <span className="mt-3 block text-xs font-medium text-muted-foreground">
            Estado editorial
          </span>
          <div className="mt-1.5">
            <StatusBadge estado={estado} />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-5">
          <h2 className="text-sm font-semibold">Documento académico</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            PDF o Word con el trabajo completo, disponible para descarga junto al contenido
            (opcional, para cualquier tipo).
          </p>

          {documento ? (
            <div className="mt-3 flex items-center justify-between gap-2 rounded-md border border-border px-3 py-2">
              <span className="flex min-w-0 items-center gap-2 text-sm">
                <FileText className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                <span className="truncate">{documento.nombreArchivo}</span>
                {documento.tamanioKB && (
                  <span className="shrink-0 text-xs text-muted-foreground">
                    ({documento.tamanioKB.toLocaleString("es-AR")} KB)
                  </span>
                )}
              </span>
              <button
                type="button"
                onClick={() => setDocumento(null)}
                className="shrink-0 rounded-md p-1 text-muted-foreground hover:bg-muted"
                aria-label="Quitar documento académico"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => docInputRef.current?.click()}
              className="mt-3 flex w-full flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-border px-4 py-6 text-center hover:bg-muted/40"
            >
              <FileUp className="h-6 w-6 text-muted-foreground" aria-hidden />
              <span className="text-xs text-muted-foreground">PDF, DOC o DOCX</span>
            </button>
          )}
          <input
            ref={docInputRef}
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
            onChange={handleDocumentoChange}
          />
        </div>

        <div className="rounded-lg border border-border bg-card p-5">
          <h2 className="text-sm font-semibold">Multimedia</h2>

          {multimedia ? (
            <div className="mt-3 space-y-2">
              {isImagenTipo(tipo) ? (
                <div className="relative overflow-hidden rounded-md border border-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={multimedia.url}
                    alt={multimedia.nombre}
                    className="h-32 w-full object-cover"
                  />
                </div>
              ) : null}
              <div className="flex items-center justify-between gap-2 rounded-md border border-border px-3 py-2">
                <span className="flex min-w-0 items-center gap-2 text-sm">
                  {MediaIcon && !isImagenTipo(tipo) && (
                    <MediaIcon className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                  )}
                  <span className="truncate">{multimedia.nombre}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    ({multimedia.tamanioKB.toLocaleString("es-AR")} KB)
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => setMultimedia(null)}
                  className="shrink-0 rounded-md p-1 text-muted-foreground hover:bg-muted"
                  aria-label="Quitar archivo multimedia"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => mediaInputRef.current?.click()}
              className="mt-3 flex w-full flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-border px-4 py-8 text-center hover:bg-muted/40"
            >
              <UploadCloud className="h-6 w-6 text-muted-foreground" aria-hidden />
              <p className="text-xs text-muted-foreground">{MULTIMEDIA_HINT[tipo]}</p>
              <span className="rounded-md border border-border px-3 py-1 text-xs font-medium">
                Elegir archivo
              </span>
            </button>
          )}
          <input
            ref={mediaInputRef}
            type="file"
            accept={MULTIMEDIA_ACCEPT[tipo]}
            className="hidden"
            onChange={handleMultimediaChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="submit"
            disabled={saving || publicado}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Send className="h-4 w-4" aria-hidden />
            {saving ? "Guardando..." : PRIMARY_ACTION_LABEL[estado]}
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => guardar("borrador")}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-semibold hover:bg-muted disabled:opacity-60"
          >
            <Save className="h-4 w-4" aria-hidden />
            Guardar borrador
          </button>
          {publicado && (
            <p className="text-center text-xs text-muted-foreground">
              Este contenido ya está publicado: no tiene un estado siguiente.
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
