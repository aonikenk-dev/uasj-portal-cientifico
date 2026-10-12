"use client";

import { Check } from "lucide-react";
import { useState } from "react";

const inputClass =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary";

// Envio simulado, igual que NewsletterForm: cuando exista la API (Modulo 02)
// el submit va a postear al endpoint de contacto.
export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p role="status" className="flex items-center gap-2 text-sm text-muted-foreground">
        <Check className="h-4 w-4 text-emerald-600" aria-hidden />
        Mensaje enviado. ¡Gracias!
      </p>
    );
  }

  return (
    <form
      aria-label="Contacto"
      className="max-w-xs space-y-2"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <label htmlFor="contacto-email" className="sr-only">
        Correo electrónico
      </label>
      <input
        id="contacto-email"
        type="email"
        required
        autoComplete="email"
        placeholder="Tu email"
        className={inputClass}
      />
      <label htmlFor="contacto-mensaje" className="sr-only">
        Mensaje
      </label>
      <textarea
        id="contacto-mensaje"
        required
        rows={3}
        placeholder="Escribinos tu consulta"
        className={`${inputClass} resize-none`}
      />
      <button
        type="submit"
        className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
      >
        Enviar
      </button>
    </form>
  );
}
