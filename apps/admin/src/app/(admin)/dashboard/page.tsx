import Link from "next/link";
import { Eye, TrendingUp, Mail, FileClock, Plus } from "lucide-react";
import { CONTENIDOS, METRICAS_GENERALES } from "@san-julian/shared";
import { Topbar } from "@/components/Topbar";
import { StatCard } from "@/components/StatCard";
import { MonthlyVisitsChart } from "@/components/charts/MonthlyVisitsChart";
import { CategoricalBarList } from "@/components/charts/CategoricalBarList";
import { ContentTable } from "@/components/ContentTable";

export const metadata = { title: "Dashboard" };

export default function DashboardPage() {
  const pendientes = CONTENIDOS.filter((c) => c.estado === "en_revision" || c.estado === "aprobado");
  const masVisitados = [...CONTENIDOS]
    .filter((c) => c.estado === "publicado")
    .sort((a, b) => b.metrica.visitas - a.metrica.visitas)
    .slice(0, 5);

  return (
    <div>
      <Topbar
        title="Dashboard"
        description="Resumen general del portal San Julián hace ciencia"
        action={
          <Link
            href="/contenidos/nuevo"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground no-underline hover:opacity-90"
          >
            <Plus className="h-4 w-4" aria-hidden />
            Nuevo contenido
          </Link>
        }
      />

      <div className="space-y-6 p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Visitas totales"
            value={METRICAS_GENERALES.visitasTotales.toLocaleString("es-AR")}
            icon={Eye}
          />
          <StatCard
            label="Visitas este mes"
            value={METRICAS_GENERALES.visitasMesActual.toLocaleString("es-AR")}
            icon={TrendingUp}
            deltaLabel={`+${METRICAS_GENERALES.variacionMensualPorcentaje}% vs. mes anterior`}
            deltaDirection="up"
          />
          <StatCard
            label="Suscriptores newsletter"
            value={METRICAS_GENERALES.suscriptoresNewsletter.toLocaleString("es-AR")}
            icon={Mail}
          />
          <StatCard
            label="Contenidos pendientes"
            value={String(pendientes.length)}
            icon={FileClock}
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-5 lg:col-span-2">
            <h2 className="text-sm font-semibold text-foreground">Visitas por mes</h2>
            <div className="mt-4">
              <MonthlyVisitsChart data={METRICAS_GENERALES.evolucionMensual} />
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-5">
            <h2 className="text-sm font-semibold text-foreground">Origen del tráfico</h2>
            <div className="mt-4">
              <CategoricalBarList
                items={METRICAS_GENERALES.origenTrafico.map((o) => ({
                  label: o.fuente,
                  porcentaje: o.porcentaje,
                }))}
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <h2 className="text-sm font-semibold text-foreground">Contenidos más visitados</h2>
            <Link href="/contenidos" className="text-sm font-medium text-primary no-underline hover:underline">
              Ver todos
            </Link>
          </div>
          <ContentTable items={masVisitados} />
        </div>

        {pendientes.length > 0 && (
          <div className="rounded-lg border border-border bg-card">
            <div className="border-b border-border px-6 py-4">
              <h2 className="text-sm font-semibold text-foreground">Pendientes de publicación</h2>
              <p className="text-sm text-muted-foreground">
                Contenidos en revisión o aprobados que todavía no salieron al portal.
              </p>
            </div>
            <ContentTable items={pendientes} />
          </div>
        )}
      </div>
    </div>
  );
}
