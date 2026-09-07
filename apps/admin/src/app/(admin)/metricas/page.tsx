import { CONTENIDOS, METRICAS_GENERALES, getAreaById } from "@san-julian/shared";
import { Topbar } from "@/components/Topbar";
import { MonthlyVisitsChart } from "@/components/charts/MonthlyVisitsChart";
import { CategoricalBarList } from "@/components/charts/CategoricalBarList";

export const metadata = { title: "Métricas" };

export default function MetricasPage() {
  const porVisitas = [...CONTENIDOS]
    .filter((c) => c.estado === "publicado")
    .sort((a, b) => b.metrica.visitas - a.metrica.visitas);

  const dispositivos = METRICAS_GENERALES.dispositivos.map((d) => ({
    label: d.tipo,
    porcentaje: d.porcentaje,
  }));
  const origen = METRICAS_GENERALES.origenTrafico.map((o) => ({
    label: o.fuente,
    porcentaje: o.porcentaje,
  }));

  return (
    <div>
      <Topbar
        title="Métricas y analytics"
        description="Google Analytics 4 / Plausible — datos de ejemplo para el prototipo"
      />

      <div className="space-y-6 p-6">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-5 lg:col-span-2">
            <h2 className="text-sm font-semibold">Evolución de visitas</h2>
            <div className="mt-4">
              <MonthlyVisitsChart data={METRICAS_GENERALES.evolucionMensual} />
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-5">
            <h2 className="text-sm font-semibold">Dispositivos</h2>
            <div className="mt-4">
              <CategoricalBarList items={dispositivos} />
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-5">
            <h2 className="text-sm font-semibold">Origen del tráfico</h2>
            <div className="mt-4">
              <CategoricalBarList items={origen} />
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card lg:col-span-2">
            <div className="border-b border-border px-5 py-4">
              <h2 className="text-sm font-semibold">Métricas por pieza de contenido</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="px-5 py-2.5 font-medium">Contenido</th>
                    <th className="px-4 py-2.5 font-medium">Área</th>
                    <th className="px-4 py-2.5 text-right font-medium">Visitas</th>
                    <th className="px-4 py-2.5 text-right font-medium">Compartidos</th>
                  </tr>
                </thead>
                <tbody>
                  {porVisitas.map((item) => {
                    const area = getAreaById(item.areaId);
                    return (
                      <tr key={item.id} className="border-b border-border last:border-0">
                        <td className="max-w-xs truncate px-5 py-2.5 font-medium text-foreground">
                          {item.titulo}
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">{area?.nombre}</td>
                        <td className="px-4 py-2.5 text-right tabular-nums text-muted-foreground">
                          {item.metrica.visitas.toLocaleString("es-AR")}
                        </td>
                        <td className="px-4 py-2.5 text-right tabular-nums text-muted-foreground">
                          {item.metrica.compartidos.toLocaleString("es-AR")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
