// Contrato de datos compartido entre el CMS (panel admin) y el portal publico.
// Hoy esta poblado con mock-data.ts; cuando exista la API real (Modulo 02 del
// presupuesto), estos mismos tipos describiran la respuesta del endpoint.

export type AreaSlug = "ambiente" | "sociedad" | "historia" | "economia" | "desarrollo";

/** Iconos disponibles para identificar un area. Es un catalogo cerrado (ver
 *  AREA_ICONOS en area-icons.ts) para que el editor elija desde el CMS sin
 *  subir archivos y el portal siempre pueda renderizarlo. */
export type AreaIcono =
  | "leaf"
  | "trees"
  | "fish"
  | "waves"
  | "mountain"
  | "users"
  | "heart-handshake"
  | "graduation-cap"
  | "scroll-text"
  | "landmark"
  | "hourglass"
  | "coins"
  | "factory"
  | "anchor"
  | "trending-up"
  | "building"
  | "lightbulb"
  | "globe";

export interface Area {
  id: string;
  slug: AreaSlug;
  nombre: string;
  descripcionCorta: string;
  color: string; // color de acento HSL ("H S% L%") para la identidad del area
  icono: AreaIcono;
}

/** Item del carrusel de la portada del portal, administrable desde el CMS.
 *  El orden del carrusel es el orden del array. */
export interface SlidePortada {
  id: string;
  titulo: string;
  texto: string;
  imagenUrl: string;
  /** Llamado a la accion opcional (boton sobre la imagen). */
  enlace?: { etiqueta: string; href: string } | null;
  activo: boolean;
}

export type ContentType = "articulo" | "infografia" | "podcast" | "video" | "material-didactico";

export type ContentStatus = "borrador" | "en_revision" | "aprobado" | "publicado";

/** Flujo de aprobacion editorial: cada estado tiene un unico siguiente paso.
 *  `publicado` no tiene siguiente: es el estado final. */
export const SIGUIENTE_ESTADO: Record<ContentStatus, ContentStatus | null> = {
  borrador: "en_revision",
  en_revision: "aprobado",
  aprobado: "publicado",
  publicado: null,
};

/** Documento academico (PDF/Word) adjunto a una pieza de contenido. Es un
 *  campo opcional disponible para cualquier tipo de contenido, no un tipo en
 *  si mismo: un articulo, un podcast o una infografia pueden tener el paper
 *  o informe completo adjunto para quien quiera profundizar. */
export interface DocumentoAdjunto {
  nombreArchivo: string;
  url: string;
  tamanioKB?: number;
}

export type UserRole = "Administrador" | "Editor" | "Colaborador" | "Revisor";

export interface Autor {
  id: string;
  nombre: string;
  rol: UserRole;
  filiacion: string;
  avatarIniciales: string;
}

export interface Usuario extends Autor {
  email: string;
  ultimoAcceso: string; // ISO date
  activo: boolean;
}

export interface MetricaContenido {
  visitas: number;
  compartidos: number;
  tiempoLecturaMin: number;
}

export interface ContentItem {
  id: string;
  slug: string;
  titulo: string;
  resumen: string;
  /** HTML enriquecido producido por el editor del CMS (Tiptap): puede incluir
   *  encabezados, listas, imagenes, tablas y enlaces. El portal lo renderiza
   *  tal cual, con estilos de @tailwindcss/typography. */
  cuerpo: string;
  tipo: ContentType;
  areaId: string;
  /** Texto libre: el autor no tiene por que ser un usuario del CMS. */
  autor: string;
  estado: ContentStatus;
  destacado: boolean;
  /** PDF/Word con el trabajo academico completo, opcional para cualquier tipo. */
  documentoAcademico?: DocumentoAdjunto | null;
  fechaPublicacion: string; // ISO date
  fechaActualizacion: string; // ISO date
  tags: string[];
  metrica: MetricaContenido;
}

export interface OrigenTrafico {
  fuente: string;
  porcentaje: number;
}

export interface EvolucionMensual {
  mes: string;
  visitas: number;
}

export interface MetricasGenerales {
  visitasTotales: number;
  visitasMesActual: number;
  variacionMensualPorcentaje: number;
  suscriptoresNewsletter: number;
  origenTrafico: OrigenTrafico[];
  evolucionMensual: EvolucionMensual[];
  dispositivos: { tipo: string; porcentaje: number }[];
}
