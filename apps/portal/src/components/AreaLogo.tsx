import { getAreaIcon, type Area } from "@san-julian/shared";

const SIZES = {
  md: { box: "h-12 w-12 rounded-xl", icon: "h-6 w-6" },
  lg: { box: "h-16 w-16 rounded-2xl", icon: "h-8 w-8" },
};

/** Logo de un area: icono blanco sobre el color del area (ambos definidos en el CMS). */
export function AreaLogo({ area, size = "md" }: { area: Area; size?: keyof typeof SIZES }) {
  const Icon = getAreaIcon(area.icono);
  const s = SIZES[size];
  return (
    <span
      className={`flex shrink-0 items-center justify-center text-white ${s.box}`}
      style={{ backgroundColor: `hsl(${area.color})` }}
      aria-hidden
    >
      <Icon className={s.icon} />
    </span>
  );
}
