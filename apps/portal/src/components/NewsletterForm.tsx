"use client";

import { Mail, Check } from "lucide-react";
import { useState } from "react";

export function NewsletterForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex w-full max-w-sm items-center gap-2 rounded-md bg-primary-foreground px-4 py-3 text-sm font-medium text-foreground">
        <Check className="h-4 w-4 text-emerald-600" aria-hidden />
        ¡Listo! Vas a recibir las novedades por email.
      </div>
    );
  }

  return (
    <form
      className="flex w-full max-w-sm items-center gap-2 rounded-md bg-primary-foreground p-1"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Correo electrónico
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="tu@email.com"
        className="w-full rounded-sm bg-transparent px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
      />
      <button
        type="submit"
        className="inline-flex shrink-0 items-center gap-1.5 rounded-sm bg-accent px-3 py-2 text-sm font-semibold text-accent-foreground"
      >
        <Mail className="h-4 w-4" aria-hidden />
        Suscribirme
      </button>
    </form>
  );
}
