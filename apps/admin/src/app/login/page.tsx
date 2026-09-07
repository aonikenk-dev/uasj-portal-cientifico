"use client";

import { useRouter } from "next/navigation";
import { Microscope } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-8 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Microscope className="h-6 w-6" aria-hidden />
          </span>
          <h1 className="mt-4 text-lg font-semibold">San Julián hace ciencia</h1>
          <p className="text-sm text-muted-foreground">Panel de administración de contenidos</p>
        </div>

        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            router.push("/dashboard");
          }}
        >
          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Correo institucional
            </label>
            <input
              id="email"
              type="email"
              defaultValue="j.sosa@uasj.unpa.edu.ar"
              required
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              defaultValue="••••••••"
              required
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Ingresar
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Prototipo con datos de ejemplo · sin autenticación real todavía
        </p>
      </div>
    </div>
  );
}
