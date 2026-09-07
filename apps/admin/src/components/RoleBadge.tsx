import type { UserRole } from "@san-julian/shared";

// Orden categorico fijo (paleta validada), reutilizado para identidad de rol.
const ROLE_COLOR: Record<UserRole, string> = {
  Administrador: "#2a78d6",
  Editor: "#eb6834",
  Colaborador: "#1baf7a",
  Revisor: "#eda100",
};

export function RoleBadge({ rol }: { rol: UserRole }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground">
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: ROLE_COLOR[rol] }} aria-hidden />
      {rol}
    </span>
  );
}
