import { UserPlus } from "lucide-react";
import { USUARIOS } from "@san-julian/shared";
import { Topbar } from "@/components/Topbar";
import { RoleBadge } from "@/components/RoleBadge";
import { formatDate } from "@/lib/format";

export const metadata = { title: "Usuarios" };

export default function UsuariosPage() {
  return (
    <div>
      <Topbar
        title="Usuarios y roles"
        description="Administrador, Editor, Colaborador y Revisor: flujo de aprobación pre-publicación"
        action={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            <UserPlus className="h-4 w-4" aria-hidden />
            Invitar usuario
          </button>
        }
      />

      <div className="p-6">
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-6 py-3 font-medium">Nombre</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Rol</th>
                <th className="px-4 py-3 font-medium">Último acceso</th>
                <th className="px-4 py-3 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody>
              {USUARIOS.map((u) => (
                <tr key={u.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                        {u.avatarIniciales}
                      </span>
                      <span className="font-medium text-foreground">{u.nombre}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                  <td className="px-4 py-3">
                    <RoleBadge rol={u.rol} />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{formatDate(u.ultimoAcceso)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                        u.activo ? "bg-[#dcf3dc] text-[#0a6b0a]" : "bg-[#e1e0d9] text-[#52514e]"
                      }`}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: u.activo ? "#0a6b0a" : "#898781" }}
                        aria-hidden
                      />
                      {u.activo ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
