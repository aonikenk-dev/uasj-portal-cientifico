import type { EvolucionMensual } from "@san-julian/shared";

const BAR_COLOR = "#2a78d6"; // paleta validada, step secuencial "azul" 450

export function MonthlyVisitsChart({ data }: { data: EvolucionMensual[] }) {
  const max = Math.max(...data.map((d) => d.visitas));

  return (
    <div>
      <div className="flex h-40 items-end gap-3" role="img" aria-label="Visitas mensuales, de abril a septiembre">
        {data.map((d) => {
          const heightPct = Math.max((d.visitas / max) * 100, 4);
          return (
            <div key={d.mes} className="flex flex-1 flex-col items-center justify-end gap-1.5">
              <span className="text-xs font-medium tabular-nums text-[#52514e]">
                {d.visitas.toLocaleString("es-AR")}
              </span>
              <div
                className="w-full rounded-t-[4px]"
                style={{ height: `${heightPct}%`, backgroundColor: BAR_COLOR, minHeight: 4 }}
                title={`${d.mes}: ${d.visitas.toLocaleString("es-AR")} visitas`}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex gap-3 border-t border-[#e1e0d9] pt-2">
        {data.map((d) => (
          <span key={d.mes} className="flex-1 text-center text-xs text-muted-foreground">
            {d.mes}
          </span>
        ))}
      </div>
    </div>
  );
}
