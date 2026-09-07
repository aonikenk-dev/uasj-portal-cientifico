// Paleta categorica validada (dataviz skill): orden fijo, nunca ciclado.
const CATEGORICAL_SLOTS = ["#2a78d6", "#eb6834", "#1baf7a", "#eda100"];

export function CategoricalBarList({
  items,
}: {
  items: { label: string; porcentaje: number }[];
}) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={item.label}>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 font-medium text-foreground">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: CATEGORICAL_SLOTS[i % CATEGORICAL_SLOTS.length] }}
                aria-hidden
              />
              {item.label}
            </span>
            <span className="tabular-nums text-muted-foreground">{item.porcentaje}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-[#e1e0d9]">
            <div
              className="h-2 rounded-full"
              style={{
                width: `${item.porcentaje}%`,
                backgroundColor: CATEGORICAL_SLOTS[i % CATEGORICAL_SLOTS.length],
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
