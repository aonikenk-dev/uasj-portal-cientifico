import { getAreaIcon, type AreaIcono } from "@san-julian/shared";

/** Vista previa del logo de un area tal como se ve en el portal. */
export function AreaLogo({ color, icono }: { color: string; icono: AreaIcono }) {
  const Icon = getAreaIcon(icono);
  return (
    <span
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white"
      style={{ backgroundColor: `hsl(${color})` }}
      aria-hidden
    >
      <Icon className="h-5 w-5" />
    </span>
  );
}
