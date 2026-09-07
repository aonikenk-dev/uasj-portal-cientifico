import { Topbar } from "@/components/Topbar";
import { ContentForm } from "@/components/ContentForm";

export const metadata = { title: "Nuevo contenido" };

export default function NuevoContenidoPage() {
  return (
    <div>
      <Topbar title="Nuevo contenido" description="Completá los campos y enviá a revisión" />
      <ContentForm />
    </div>
  );
}
