"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { SlidePortada } from "@san-julian/shared";

const INTERVALO_MS = 7000;

/** Carrusel de la portada. Los slides se cargan desde el CMS (seccion
 *  "Portada"). Accesible: se puede pausar (WCAG 2.2.2), navegar con teclado
 *  y no avanza solo si el usuario prefiere movimiento reducido. */
export function HeroCarousel({ slides }: { slides: SlidePortada[] }) {
  const [actual, setActual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [enFoco, setEnFoco] = useState(false);
  const total = slides.length;

  const ir = useCallback((i: number) => setActual(((i % total) + total) % total), [total]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPausado(true);
  }, []);

  useEffect(() => {
    if (pausado || enFoco || total < 2) return;
    const t = setTimeout(() => ir(actual + 1), INTERVALO_MS);
    return () => clearTimeout(t);
  }, [actual, pausado, enFoco, total, ir]);

  if (total === 0) return null;

  return (
    <section
      aria-roledescription="carrusel"
      aria-label="Destacados de la portada"
      className="relative isolate overflow-hidden border-b border-border bg-[#0f1e33] text-white"
      onMouseEnter={() => setEnFoco(true)}
      onMouseLeave={() => setEnFoco(false)}
      onFocus={() => setEnFoco(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setEnFoco(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") ir(actual - 1);
        if (e.key === "ArrowRight") ir(actual + 1);
      }}
    >
      <div className="relative h-[26rem] sm:h-[30rem]">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="diapositiva"
            aria-label={`${i + 1} de ${total}`}
            aria-hidden={i !== actual}
            className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${
              i === actual ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <div
              className="absolute inset-0 -z-10 bg-cover bg-center"
              style={{ backgroundImage: `url("${slide.imagenUrl}")` }}
              aria-hidden
            />
            <div
              className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/45 to-black/10"
              aria-hidden
            />
            <div className="mx-auto flex h-full max-w-6xl flex-col justify-center px-4 pb-10">
              <p className="text-sm font-semibold uppercase tracking-wide text-white/80">
                UNPA · Unidad Académica San Julián
              </p>
              <h2 className="mt-3 max-w-2xl font-serif text-3xl font-bold leading-tight sm:text-5xl">
                {slide.titulo}
              </h2>
              {slide.texto && (
                <p className="mt-4 max-w-xl text-base text-white/85 sm:text-lg">{slide.texto}</p>
              )}
              {slide.enlace && (
                <div className="mt-8">
                  <Link
                    href={slide.enlace.href}
                    tabIndex={i === actual ? 0 : -1}
                    className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-[#0f1e33] no-underline hover:bg-white/90"
                  >
                    {slide.enlace.etiqueta}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {total > 1 && (
        <div className="absolute inset-x-0 bottom-4">
          <div className="mx-auto flex max-w-6xl items-center gap-2 px-4">
            <button
              type="button"
              onClick={() => setPausado((p) => !p)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 hover:bg-black/60"
              aria-label={pausado ? "Reanudar carrusel" : "Pausar carrusel"}
            >
              {pausado ? (
                <Play className="h-3.5 w-3.5" aria-hidden />
              ) : (
                <Pause className="h-3.5 w-3.5" aria-hidden />
              )}
            </button>
            <button
              type="button"
              onClick={() => ir(actual - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 hover:bg-black/60"
              aria-label="Diapositiva anterior"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => ir(actual + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 hover:bg-black/60"
              aria-label="Diapositiva siguiente"
            >
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
            <div className="ml-2 flex items-center gap-1.5">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => ir(i)}
                  aria-label={`Ir a la diapositiva ${i + 1}`}
                  aria-current={i === actual}
                  className={`h-2 rounded-full transition-all ${
                    i === actual ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
