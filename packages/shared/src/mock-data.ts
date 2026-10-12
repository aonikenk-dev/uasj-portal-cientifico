import type {
  Area,
  Autor,
  ContentItem,
  MetricasGenerales,
  SlidePortada,
  Usuario,
} from "./types";

// Imagen de relleno para el cuerpo de los contenidos de ejemplo (svg inline,
// sin depender de red). El editor real permite subir imagenes propias.
const PLACEHOLDER_IMG =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22800%22%20height%3D%22450%22%20viewBox%3D%220%200%20800%20450%22%3E%3Crect%20width%3D%22800%22%20height%3D%22450%22%20fill%3D%22%23e9e4d8%22%2F%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22%23a39a86%22%20stroke-width%3D%223%22%3E%3Crect%20x%3D%22300%22%20y%3D%22165%22%20width%3D%22200%22%20height%3D%22140%22%20rx%3D%228%22%2F%3E%3Ccircle%20cx%3D%22345%22%20cy%3D%22205%22%20r%3D%2214%22%2F%3E%3Cpath%20d%3D%22M300%20275%20L370%20225%20L430%20260%20L500%20200%20L500%20305%20L300%20305%20Z%22%20fill%3D%22%23a39a86%22%20stroke%3D%22none%22%2F%3E%3C%2Fg%3E%3Ctext%20x%3D%22400%22%20y%3D%22345%22%20font-family%3D%22sans-serif%22%20font-size%3D%2216%22%20fill%3D%22%238a8171%22%20text-anchor%3D%22middle%22%3EImagen%20ilustrativa%3C%2Ftext%3E%3C%2Fsvg%3E";

// Documento de ejemplo para el campo "Documento academico" (adjunto opcional
// a cualquier tipo de contenido, ver DocumentoAdjunto en types.ts).
const PLACEHOLDER_DOC_URL = "/docs/documento-academico-ejemplo.pdf";

export const AREAS: Area[] = [
  {
    id: "area-ambiente",
    slug: "ambiente",
    nombre: "Ambiente",
    descripcionCorta: "Clima, biodiversidad y ecosistemas de la costa patagonica.",
    color: "142 40% 34%",
    icono: "leaf",
  },
  {
    id: "area-sociedad",
    slug: "sociedad",
    nombre: "Sociedad",
    descripcionCorta: "Comunidad, cultura y vida cotidiana en San Julian.",
    color: "266 35% 45%",
    icono: "users",
  },
  {
    id: "area-historia",
    slug: "historia",
    nombre: "Historia",
    descripcionCorta: "Memoria, patrimonio y relatos del territorio.",
    color: "28 65% 42%",
    icono: "scroll-text",
  },
  {
    id: "area-economia",
    slug: "economia",
    nombre: "Economia",
    descripcionCorta: "Producción, pesca, mineria y economia social local.",
    color: "205 55% 38%",
    icono: "coins",
  },
  {
    id: "area-desarrollo",
    slug: "desarrollo",
    nombre: "Desarrollo",
    descripcionCorta: "Politicas publicas y proyectos de desarrollo territorial.",
    color: "12 65% 48%",
    icono: "trending-up",
  },
];

// Fondos ilustrados para los slides de ejemplo (svg inline, sin depender de
// red). Desde el admin se reemplazan subiendo fotos reales.
const svgDataUri = (svg: string) => `data:image/svg+xml,${encodeURIComponent(svg)}`;

const FONDO_MAR = svgDataUri(
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 700' preserveAspectRatio='xMidYMid slice'>" +
    "<defs><linearGradient id='c' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#1c2b4d'/><stop offset='.62' stop-color='#c8704a'/><stop offset='.72' stop-color='#f0b27a'/></linearGradient>" +
    "<linearGradient id='m' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#2c4a6e'/><stop offset='1' stop-color='#0f1e33'/></linearGradient></defs>" +
    "<rect width='1600' height='700' fill='url(#c)'/><circle cx='1080' cy='440' r='70' fill='#fcd9a4' opacity='.9'/>" +
    "<rect y='470' width='1600' height='230' fill='url(#m)'/>" +
    "<g stroke='#f6c08f' stroke-opacity='.35' stroke-width='3'><path d='M960 495h240M1000 520h160M1030 548h100M900 585h80M1180 600h60'/></g>" +
    "<path d='M1250 470 L1290 380 L1360 360 L1420 300 L1500 290 L1600 250 V700 H1330 Z' fill='#141c2b'/>" +
    "</svg>",
);

const FONDO_ESTEPA = svgDataUri(
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 700' preserveAspectRatio='xMidYMid slice'>" +
    "<defs><linearGradient id='c' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#5b8fbf'/><stop offset='1' stop-color='#d9e6ef'/></linearGradient></defs>" +
    "<rect width='1600' height='700' fill='url(#c)'/>" +
    "<path d='M0 400 L220 380 L260 330 L560 325 L600 380 L900 390 L940 300 L1300 295 L1340 360 L1600 370 V700 H0 Z' fill='#a98c6a'/>" +
    "<path d='M0 470 L380 450 L420 410 L760 405 L800 460 L1600 440 V700 H0 Z' fill='#8a6d4c'/>" +
    "<path d='M0 560 Q400 520 800 555 T1600 540 V700 H0 Z' fill='#6b5a3a'/>" +
    "<g fill='#c9b37a' opacity='.55'><circle cx='180' cy='600' r='14'/><circle cx='420' cy='630' r='10'/><circle cx='760' cy='610' r='16'/><circle cx='1120' cy='640' r='12'/><circle cx='1400' cy='605' r='15'/></g>" +
    "</svg>",
);

const FONDO_CIELO = svgDataUri(
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 700' preserveAspectRatio='xMidYMid slice'>" +
    "<defs><linearGradient id='c' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#070b1f'/><stop offset='1' stop-color='#26305c'/></linearGradient>" +
    "<radialGradient id='v' cx='.6' cy='.35' r='.5'><stop offset='0' stop-color='#8fa3e0' stop-opacity='.35'/><stop offset='1' stop-color='#8fa3e0' stop-opacity='0'/></radialGradient></defs>" +
    "<rect width='1600' height='700' fill='url(#c)'/><ellipse cx='980' cy='250' rx='620' ry='120' transform='rotate(-18 980 250)' fill='url(#v)'/>" +
    "<g fill='#fff'><circle cx='120' cy='80' r='2'/><circle cx='300' cy='190' r='1.5'/><circle cx='460' cy='60' r='2.5'/><circle cx='640' cy='150' r='1.5'/><circle cx='820' cy='90' r='2'/><circle cx='900' cy='260' r='1.5'/><circle cx='1060' cy='140' r='2.5'/><circle cx='1210' cy='60' r='1.5'/><circle cx='1330' cy='210' r='2'/><circle cx='1480' cy='110' r='2.5'/><circle cx='1540' cy='300' r='1.5'/><circle cx='720' cy='320' r='1.5'/><circle cx='220' cy='330' r='2'/><circle cx='1150' cy='330' r='1.5'/></g>" +
    "<path d='M0 560 L300 520 L520 545 L760 500 L1000 535 L1250 495 L1600 530 V700 H0 Z' fill='#0b0f1d'/>" +
    "</svg>",
);

export const SLIDES_PORTADA: SlidePortada[] = [
  {
    id: "slide-1",
    titulo: "Ciencia hecha en San Julián, contada para toda la comunidad",
    texto:
      "Artículos, infografías, podcasts y materiales didácticos que traducen la producción científica de la UASJ a un lenguaje claro y accesible.",
    imagenUrl: FONDO_MAR,
    enlace: { etiqueta: "Explorar áreas", href: "#areas" },
    activo: true,
  },
  {
    id: "slide-2",
    titulo: "La estepa también se investiga",
    texto:
      "Proyectos de desarrollo territorial, economía social y producción local con base en Puerto San Julián.",
    imagenUrl: FONDO_ESTEPA,
    enlace: { etiqueta: "Ver Desarrollo", href: "/desarrollo" },
    activo: true,
  },
  {
    id: "slide-3",
    titulo: "Novedades de la Unidad Académica",
    texto: "Lo último que publicaron nuestros equipos de investigación y extensión.",
    imagenUrl: FONDO_CIELO,
    enlace: { etiqueta: "Ver novedades", href: "/novedades" },
    activo: true,
  },
];

export const AUTORES: Autor[] = [
  {
    id: "autor-1",
    nombre: "Dra. Marina Coronel",
    rol: "Editor",
    filiacion: "Instituto de Ciencias Ambientales, UASJ",
    avatarIniciales: "MC",
  },
  {
    id: "autor-2",
    nombre: "Lic. Tomás Aguirre",
    rol: "Colaborador",
    filiacion: "Instituto de Ciencias Sociales, UASJ",
    avatarIniciales: "TA",
  },
  {
    id: "autor-3",
    nombre: "Prof. Elena Vidal",
    rol: "Colaborador",
    filiacion: "Area de Historia Regional, UASJ",
    avatarIniciales: "EV",
  },
  {
    id: "autor-4",
    nombre: "Mg. Rodrigo Paz",
    rol: "Revisor",
    filiacion: "Instituto de Economia Regional, UASJ",
    avatarIniciales: "RP",
  },
  {
    id: "autor-5",
    nombre: "Ing. Julieta Sosa",
    rol: "Administrador",
    filiacion: "Secretaria de Extensión, UASJ",
    avatarIniciales: "JS",
  },
];

export const USUARIOS: Usuario[] = [
  {
    ...AUTORES[4],
    email: "j.sosa@uasj.unpa.edu.ar",
    ultimoAcceso: "2026-09-05T14:12:00-03:00",
    activo: true,
  },
  {
    ...AUTORES[0],
    email: "m.coronel@uasj.unpa.edu.ar",
    ultimoAcceso: "2026-09-06T09:40:00-03:00",
    activo: true,
  },
  {
    ...AUTORES[1],
    email: "t.aguirre@uasj.unpa.edu.ar",
    ultimoAcceso: "2026-09-04T18:05:00-03:00",
    activo: true,
  },
  {
    ...AUTORES[2],
    email: "e.vidal@uasj.unpa.edu.ar",
    ultimoAcceso: "2026-08-29T11:20:00-03:00",
    activo: true,
  },
  {
    ...AUTORES[3],
    email: "r.paz@uasj.unpa.edu.ar",
    ultimoAcceso: "2026-09-01T16:50:00-03:00",
    activo: false,
  },
];

export const CONTENIDOS: ContentItem[] = [
  {
    id: "c-01",
    slug: "elefantes-marinos-costa-patagonica",
    titulo: "Por que Puerto San Julián es clave para los elefantes marinos",
    resumen:
      "Un recorrido por el monitoreo de la colonia reproductiva y lo que revela sobre la salud del ecosistema costero.",
    cuerpo:
      "<p>Cada año, entre agosto y noviembre, las costas de San Julián reciben a miles de elefantes marinos que llegan a reproducirse. Los equipos de investigación de la UASJ vienen monitoreando esta colonia desde hace más de una década, registrando datos que permiten entender cambios en el ecosistema marino patagónico.</p>" +
      `<img src="${PLACEHOLDER_IMG}" alt="Colonia de elefantes marinos en la costa de San Julián">` +
      "<h2>Por qué esta colonia importa</h2>" +
      "<p>La presencia sostenida de la especie es un indicador de la salud del ecosistema costero. Cuando la colonia crece o se retrae, algo está cambiando río arriba en la cadena alimentaria.</p>" +
      "<ul><li>Disponibilidad de alimento en la plataforma continental</li><li>Calidad del agua y temperatura superficial del mar</li><li>Presión de actividades humanas sobre la costa</li></ul>" +
      "<blockquote>“Monitorear esta colonia es, en los hechos, monitorear el estado del mar patagónico”, resume el equipo del Instituto de Ciencias Ambientales.</blockquote>" +
      "<p>El relevamiento continúa cada temporada reproductiva, con datos que se comparten con otras estaciones de investigación de la costa argentina.</p>",
    tipo: "articulo",
    areaId: "area-ambiente",
    autor: "Dra. Marina Coronel",
    estado: "publicado",
    destacado: true,
    fechaPublicacion: "2026-08-14T10:00:00-03:00",
    fechaActualizacion: "2026-08-14T10:00:00-03:00",
    tags: ["fauna marina", "conservación", "monitoreo"],
    metrica: { visitas: 1840, compartidos: 96, tiempoLecturaMin: 6 },
    documentoAcademico: {
      nombreArchivo: "estudio-elefantes-marinos-2026.pdf",
      url: PLACEHOLDER_DOC_URL,
      tamanioKB: 842,
    },
  },
  {
    id: "c-02",
    slug: "infografia-ciclo-marea-ria",
    titulo: "El ciclo de mareas de la ría de San Julián, explicado",
    resumen: "Una infografía interactiva sobre cómo las mareas moldean la ría y su biodiversidad.",
    cuerpo:
      "<p>La ría de San Julián tiene una de las amplitudes de marea más importantes de la costa patagónica. Esta infografía resume, paso a paso, cómo ese movimiento del agua sostiene a la fauna local.</p>",
    tipo: "infografia",
    areaId: "area-ambiente",
    autor: "Dra. Marina Coronel",
    estado: "publicado",
    destacado: false,
    fechaPublicacion: "2026-07-22T10:00:00-03:00",
    fechaActualizacion: "2026-07-25T10:00:00-03:00",
    tags: ["ría", "mareas", "infografía"],
    metrica: { visitas: 980, compartidos: 140, tiempoLecturaMin: 3 },
  },
  {
    id: "c-03",
    slug: "podcast-memorias-del-puerto",
    titulo: "Memorias del puerto: relatos de tres generaciones",
    resumen: "Un podcast en tres episodios con testimonios de familias julianenses.",
    cuerpo:
      "<p>En este ciclo de podcasts recorremos la historia oral de Puerto San Julián a través de entrevistas con vecinos y vecinas de distintas generaciones.</p>",
    tipo: "podcast",
    areaId: "area-sociedad",
    autor: "Lic. Tomás Aguirre",
    estado: "publicado",
    destacado: true,
    fechaPublicacion: "2026-06-10T10:00:00-03:00",
    fechaActualizacion: "2026-06-10T10:00:00-03:00",
    tags: ["historia oral", "comunidad", "podcast"],
    metrica: { visitas: 1220, compartidos: 58, tiempoLecturaMin: 24 },
  },
  {
    id: "c-04",
    slug: "hernando-de-magallanes-primera-misa",
    titulo: "1520: la primera misa en tierra argentina",
    resumen:
      "Qué sabemos realmente sobre la expedición de Magallanes y su paso por San Julián.",
    cuerpo:
      "<p>Puerto San Julián fue escenario de hechos fundacionales para la historia argentina. En 1520, la expedición de Fernando de Magallanes hizo escala en la bahía.</p>",
    tipo: "articulo",
    areaId: "area-historia",
    autor: "Prof. Elena Vidal",
    estado: "publicado",
    destacado: true,
    fechaPublicacion: "2026-05-20T10:00:00-03:00",
    fechaActualizacion: "2026-05-20T10:00:00-03:00",
    tags: ["patrimonio histórico", "expediciones"],
    metrica: { visitas: 2310, compartidos: 205, tiempoLecturaMin: 8 },
  },
  {
    id: "c-05",
    slug: "documento-informe-fauna-costera-2025",
    titulo: "Informe técnico: relevamiento de fauna costera 2025",
    resumen: "Documento académico completo del relevamiento anual, disponible para descarga.",
    cuerpo:
      "<p>Este informe técnico presenta los resultados del relevamiento de fauna costera realizado durante 2025 en el marco del convenio con la FADPSJ.</p>" +
      "<h2>Especies relevadas por sector</h2>" +
      "<table><thead><tr><th>Sector costero</th><th>Especies registradas</th><th>Estado</th></tr></thead>" +
      "<tbody>" +
      "<tr><td>Ría de San Julián</td><td>14</td><td>Estable</td></tr>" +
      "<tr><td>Cabo Curioso</td><td>9</td><td>En seguimiento</td></tr>" +
      "<tr><td>Bahía San Julián norte</td><td>11</td><td>Estable</td></tr>" +
      "</tbody></table>" +
      "<p>La metodología completa, planillas de campo y series históricas están disponibles en el documento descargable.</p>",
    tipo: "articulo",
    areaId: "area-ambiente",
    autor: "Dra. Marina Coronel",
    estado: "publicado",
    destacado: false,
    fechaPublicacion: "2026-03-02T10:00:00-03:00",
    fechaActualizacion: "2026-03-02T10:00:00-03:00",
    tags: ["informe técnico", "fauna costera"],
    metrica: { visitas: 410, compartidos: 12, tiempoLecturaMin: 35 },
    documentoAcademico: {
      nombreArchivo: "informe-fauna-costera-2025.pdf",
      url: PLACEHOLDER_DOC_URL,
      tamanioKB: 1240,
    },
  },
  {
    id: "c-06",
    slug: "video-cooperativas-textiles",
    titulo: "Cooperativas textiles: economía social en el territorio",
    resumen: "Un video documental sobre las cooperativas textiles de la región.",
    cuerpo:
      "<p>Recorremos el trabajo de las cooperativas textiles de Puerto San Julián, un ejemplo de economía social que combina tradición y organización comunitaria.</p>",
    tipo: "video",
    areaId: "area-economia",
    autor: "Mg. Rodrigo Paz",
    estado: "publicado",
    destacado: false,
    fechaPublicacion: "2026-04-18T10:00:00-03:00",
    fechaActualizacion: "2026-04-18T10:00:00-03:00",
    tags: ["economía social", "cooperativismo"],
    metrica: { visitas: 760, compartidos: 44, tiempoLecturaMin: 12 },
  },
  {
    id: "c-07",
    slug: "mineria-territorio-preguntas-frecuentes",
    titulo: "Minería y territorio: preguntas frecuentes",
    resumen: "Una ficha temática que responde dudas comunes sobre la actividad minera regional.",
    cuerpo:
      "<p>¿Qué tipo de minería se desarrolla en la región? ¿Cómo se regula? Esta ficha temática reúne las preguntas más frecuentes de la comunidad.</p>",
    tipo: "material-didactico",
    areaId: "area-economia",
    autor: "Mg. Rodrigo Paz",
    estado: "en_revision",
    destacado: false,
    fechaPublicacion: "2026-09-01T10:00:00-03:00",
    fechaActualizacion: "2026-09-04T10:00:00-03:00",
    tags: ["minería", "material didáctico"],
    metrica: { visitas: 0, compartidos: 0, tiempoLecturaMin: 5 },
  },
  {
    id: "c-08",
    slug: "plan-desarrollo-costero-2030",
    titulo: "Qué propone el plan de desarrollo costero 2030",
    resumen: "Un resumen accesible del plan estratégico que discuten los actores locales.",
    cuerpo:
      "<p>El plan de desarrollo costero 2030 busca articular turismo, producción y conservación ambiental en la costa de Puerto San Julián.</p>",
    tipo: "articulo",
    areaId: "area-desarrollo",
    autor: "Ing. Julieta Sosa",
    estado: "aprobado",
    destacado: false,
    fechaPublicacion: "2026-09-03T10:00:00-03:00",
    fechaActualizacion: "2026-09-03T10:00:00-03:00",
    tags: ["planificación", "desarrollo territorial"],
    metrica: { visitas: 0, compartidos: 0, tiempoLecturaMin: 7 },
  },
  {
    id: "c-09",
    slug: "infografia-linea-tiempo-fundacion",
    titulo: "Línea de tiempo: 500 años de Puerto San Julián",
    resumen: "Infografía interactiva con los hitos históricos más relevantes del territorio.",
    cuerpo:
      "<p>Desde la llegada de Magallanes hasta la actualidad: un recorrido visual por los hitos que marcaron la historia de San Julián.</p>",
    tipo: "infografia",
    areaId: "area-historia",
    autor: "Prof. Elena Vidal",
    estado: "publicado",
    destacado: true,
    fechaPublicacion: "2026-02-14T10:00:00-03:00",
    fechaActualizacion: "2026-02-16T10:00:00-03:00",
    tags: ["línea de tiempo", "patrimonio"],
    metrica: { visitas: 1560, compartidos: 188, tiempoLecturaMin: 4 },
  },
  {
    id: "c-10",
    slug: "material-didactico-mareas-para-el-aula",
    titulo: "Las mareas en el aula: guía para docentes",
    resumen: "Material didáctico descargable para trabajar el fenómeno de las mareas en nivel primario.",
    cuerpo:
      "<p>Esta guía propone actividades para llevar al aula el estudio de las mareas, pensada para docentes de nivel primario y secundario.</p>" +
      "<h2>Actividades propuestas</h2>" +
      "<ol><li>Observación de tablas de marea de la semana y registro en una bitácora grupal</li><li>Maqueta simple de la ría con dos niveles de agua (marea alta / marea baja)</li><li>Salida guiada a la costa para reconocer la línea de marea alta</li></ol>" +
      `<img src="${PLACEHOLDER_IMG}" alt="Esquema de marea alta y marea baja para el aula">` +
      "<p>Al final del documento vas a encontrar una ficha imprimible para que cada estudiante complete durante la observación.</p>",
    tipo: "material-didactico",
    areaId: "area-ambiente",
    autor: "Dra. Marina Coronel",
    estado: "publicado",
    destacado: false,
    fechaPublicacion: "2026-05-05T10:00:00-03:00",
    fechaActualizacion: "2026-05-05T10:00:00-03:00",
    tags: ["educación", "material didáctico"],
    metrica: { visitas: 640, compartidos: 33, tiempoLecturaMin: 5 },
  },
  {
    id: "c-11",
    slug: "podcast-voces-de-la-pesca-artesanal",
    titulo: "Voces de la pesca artesanal",
    resumen: "Episodio piloto del podcast sobre economía y trabajo en la costa.",
    cuerpo:
      "<p>Conversamos con pescadores artesanales de la región sobre los desafíos y transformaciones del oficio en las últimas décadas.</p>",
    tipo: "podcast",
    areaId: "area-economia",
    autor: "Lic. Tomás Aguirre",
    estado: "borrador",
    destacado: false,
    fechaPublicacion: "2026-09-06T10:00:00-03:00",
    fechaActualizacion: "2026-09-06T10:00:00-03:00",
    tags: ["pesca artesanal", "trabajo"],
    metrica: { visitas: 0, compartidos: 0, tiempoLecturaMin: 18 },
  },
  {
    id: "c-12",
    slug: "articulo-migraciones-internas-territorio",
    titulo: "Migraciones internas y transformación del territorio",
    resumen: "Cómo los movimientos poblacionales cambiaron la fisonomía social de San Julián.",
    cuerpo:
      "<p>A lo largo del siglo XX, distintas olas migratorias configuraron la composición social de Puerto San Julián. Este artículo repasa esos procesos.</p>",
    tipo: "articulo",
    areaId: "area-sociedad",
    autor: "Lic. Tomás Aguirre",
    estado: "publicado",
    destacado: false,
    fechaPublicacion: "2026-01-28T10:00:00-03:00",
    fechaActualizacion: "2026-01-28T10:00:00-03:00",
    tags: ["migraciones", "sociedad"],
    metrica: { visitas: 890, compartidos: 41, tiempoLecturaMin: 9 },
  },
];

export const METRICAS_GENERALES: MetricasGenerales = {
  visitasTotales: 12_310,
  visitasMesActual: 2_450,
  variacionMensualPorcentaje: 18.4,
  suscriptoresNewsletter: 356,
  origenTrafico: [
    { fuente: "Búsqueda orgánica", porcentaje: 42 },
    { fuente: "Redes sociales", porcentaje: 31 },
    { fuente: "Directo", porcentaje: 18 },
    { fuente: "Referidos", porcentaje: 9 },
  ],
  evolucionMensual: [
    { mes: "Abr", visitas: 1120 },
    { mes: "May", visitas: 1480 },
    { mes: "Jun", visitas: 1690 },
    { mes: "Jul", visitas: 1950 },
    { mes: "Ago", visitas: 2070 },
    { mes: "Sep", visitas: 2450 },
  ],
  dispositivos: [
    { tipo: "Móvil", porcentaje: 64 },
    { tipo: "Escritorio", porcentaje: 30 },
    { tipo: "Tablet", porcentaje: 6 },
  ],
};

export function getAreaBySlug(slug: string): Area | undefined {
  return AREAS.find((a) => a.slug === slug);
}

export function getAreaById(id: string): Area | undefined {
  return AREAS.find((a) => a.id === id);
}

export function getSlidesPortada(): SlidePortada[] {
  return SLIDES_PORTADA.filter((s) => s.activo);
}

export function getContenidosPublicados(): ContentItem[] {
  return CONTENIDOS.filter((c) => c.estado === "publicado").sort(
    (a, b) => new Date(b.fechaPublicacion).getTime() - new Date(a.fechaPublicacion).getTime(),
  );
}

export function getContenidosPorArea(areaId: string): ContentItem[] {
  return getContenidosPublicados().filter((c) => c.areaId === areaId);
}

export function getContenidoBySlug(slug: string): ContentItem | undefined {
  return CONTENIDOS.find((c) => c.slug === slug);
}

export function getDestacados(): ContentItem[] {
  return getContenidosPublicados().filter((c) => c.destacado);
}

export const CONTENT_TYPE_LABEL: Record<ContentItem["tipo"], string> = {
  articulo: "Artículo",
  infografia: "Infografía",
  podcast: "Podcast",
  video: "Video",
  "material-didactico": "Material didáctico",
};

export const CONTENT_STATUS_LABEL: Record<ContentItem["estado"], string> = {
  borrador: "Borrador",
  en_revision: "En revisión",
  aprobado: "Aprobado",
  publicado: "Publicado",
};
