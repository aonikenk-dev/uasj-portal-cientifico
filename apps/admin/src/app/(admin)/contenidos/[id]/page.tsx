import { notFound } from "next/navigation";
import { CONTENIDOS } from "@san-julian/shared";
import { Topbar } from "@/components/Topbar";
import { ContentForm } from "@/components/ContentForm";

export function generateStaticParams() {
  return CONTENIDOS.map((item) => ({ id: item.id }));
}

export default function EditarContenidoPage({ params }: { params: { id: string } }) {
  const item = CONTENIDOS.find((c) => c.id === params.id);
  if (!item) notFound();

  return (
    <div>
      <Topbar title={item.titulo} description="Editar contenido" />
      <ContentForm initial={item} />
    </div>
  );
}
