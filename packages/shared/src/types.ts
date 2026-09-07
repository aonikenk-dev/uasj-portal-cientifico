// Contrato de datos compartido entre el CMS (panel admin) y el portal publico.
// Hoy esta poblado con mock-data.ts; cuando exista la API real (Modulo 02 del
// presupuesto), estos mismos tipos describiran la respuesta del endpoint.

export type AreaSlug = "ambiente" | "sociedad" | "historia" | "economia" | "desarrollo";

export interface Area {
  id: string;
  slug: AreaSlug;
  nombre: string;
  descripcionCorta: string;
  color: string; // color de acento HSL para la identidad del area
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
  autorId: string;
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
