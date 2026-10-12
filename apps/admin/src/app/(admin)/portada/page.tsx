import { SLIDES_PORTADA } from "@san-julian/shared";
import { Topbar } from "@/components/Topbar";
import { SlidesManager } from "@/components/SlidesManager";

export const metadata = { title: "Portada" };

export default function PortadaPage() {
  return (
    <div>
      <Topbar
        title="Carrusel de portada"
        description="Slides que se muestran al inicio del portal: imagen de fondo, texto y un botón opcional."
      />
      <SlidesManager slides={SLIDES_PORTADA} />
    </div>
  );
}
