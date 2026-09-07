"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  FolderKanban,
  Users,
  BarChart3,
  Microscope,
  LogOut,
} from "lucide-react";
import { USUARIOS } from "@san-julian/shared";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/contenidos", label: "Contenidos", icon: Newspaper },
  { href: "/categorias", label: "Categorías", icon: FolderKanban },
  { href: "/usuarios", label: "Usuarios", icon: Users },
  { href: "/metricas", label: "Métricas", icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();
  const currentUser = USUARIOS[0];

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-5 py-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Microscope className="h-4 w-4" aria-hidden />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-semibold">San Julián hace ciencia</p>
          <p className="text-xs text-muted-foreground">Panel de administración</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {NAV.map((item) => {
          const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium no-underline transition-colors ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/80 hover:bg-muted"
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <div className="flex items-center gap-2 rounded-md px-2 py-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-semibold">
            {currentUser.avatarIniciales}
          </span>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-medium">{currentUser.nombre}</p>
            <p className="truncate text-xs text-muted-foreground">{currentUser.rol}</p>
          </div>
        </div>
        <Link
          href="/login"
          className="mt-1 flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground no-underline hover:bg-muted"
        >
          <LogOut className="h-4 w-4" aria-hidden />
          Cerrar sesión
        </Link>
      </div>
    </aside>
  );
}
