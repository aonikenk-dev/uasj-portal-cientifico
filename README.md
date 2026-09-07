# San Julián hace ciencia

Portal de divulgación científica de la Unidad Académica San Julián (UNPA–UASJ).
Monorepo con panel de administración (CMS) y portal público desacoplados, tal
como se definió en la propuesta `Presupuesto #001` (arquitectura headless).

Este es el **prototipo navegable del Módulo 01**: ambas apps funcionan con
datos mock (`packages/shared`) que simulan el contrato de la futura API de
contenidos. Cuando exista el CMS real (Módulo 02), solo hay que reemplazar las
funciones de `packages/shared/src/mock-data.ts` por llamadas a la API.

## Estructura

```
apps/
  portal/   -> Portal público (Next.js, puerto 3000)
  admin/    -> Panel de administración / CMS (Next.js, puerto 3001)
packages/
  shared/   -> Tipos + datos mock compartidos por ambas apps
```

## Requisitos

- Node.js 18.18+ (probado con Node 24)
- npm 9+ (usa npm workspaces)

## Uso

```bash
npm install

# Portal público -> http://localhost:3000
npm run dev:portal

# Panel admin -> http://localhost:3001
npm run dev:admin
```

Podés correr ambos en paralelo (dos terminales) para navegar el CMS y el
portal público al mismo tiempo, como en el diagrama de arquitectura de la
propuesta.

## Qué incluye el prototipo

**Portal público** (`apps/portal`)
- Home con destacados, últimas publicaciones y newsletter (mock)
- 5 áreas temáticas: Ambiente, Sociedad, Historia, Economía, Desarrollo
- Página de área con filtro por tipo de contenido
- Página de detalle de contenido (artículo, infografía, podcast, video,
  material didáctico, documento académico) con lectura en voz alta (Web
  Speech API) y botones de compartir
- Buscador con filtros por área y tipo
- Barra de accesibilidad: tamaño de texto y modo claro/oscuro/alto contraste
  (Módulo 04 del presupuesto)

**Panel admin** (`apps/admin`)
- Login mock (sin autenticación real todavía)
- Dashboard con métricas generales, visitas por mes y contenidos pendientes
- Listado de contenidos con filtros por estado, área y tipo
- Formulario de creación/edición de contenido con flujo editorial
  (borrador → en revisión → aprobado → publicado)
- Gestión de áreas temáticas (categorías)
- Usuarios y roles (Administrador, Editor, Colaborador, Revisor)
- Métricas y analytics por pieza de contenido

## Próximos pasos (fuera de este prototipo)

- Reemplazar `packages/shared` por la API real del CMS (Módulo 02)
- Autenticación real y control de acceso por rol en el panel admin
- Editor de texto enriquecido para el cuerpo del contenido
- Carga real de archivos multimedia
- Integración de Google Analytics 4 / Plausible (Módulo 06)
