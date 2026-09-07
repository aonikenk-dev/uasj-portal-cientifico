"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, Contrast, Minus, Plus, RotateCcw } from "lucide-react";

type Theme = "light" | "dark" | "contrast";
type FontSize = "base" | "lg" | "xl";

const THEME_ORDER: Theme[] = ["light", "dark", "contrast"];
const THEME_ICON: Record<Theme, typeof Sun> = { light: Sun, dark: Moon, contrast: Contrast };
const THEME_LABEL: Record<Theme, string> = {
  light: "Modo claro",
  dark: "Modo oscuro",
  contrast: "Alto contraste",
};

export function AccessibilityBar() {
  const [theme, setTheme] = useState<Theme>("light");
  const [fontSize, setFontSize] = useState<FontSize>("base");

  useEffect(() => {
    const storedTheme = (localStorage.getItem("sjhc-theme") as Theme | null) ?? "light";
    const storedFont = (localStorage.getItem("sjhc-fontsize") as FontSize | null) ?? "base";
    setTheme(storedTheme);
    setFontSize(storedFont);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("sjhc-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-fontsize", fontSize);
    localStorage.setItem("sjhc-fontsize", fontSize);
  }, [fontSize]);

  function cycleTheme() {
    const next = THEME_ORDER[(THEME_ORDER.indexOf(theme) + 1) % THEME_ORDER.length];
    setTheme(next);
  }

  function increaseFont() {
    setFontSize((f) => (f === "base" ? "lg" : "xl"));
  }
  function decreaseFont() {
    setFontSize((f) => (f === "xl" ? "lg" : "base"));
  }
  function resetFont() {
    setFontSize("base");
  }

  const ThemeIcon = THEME_ICON[theme];

  return (
    <div className="flex items-center gap-1 border-b border-border bg-muted/60 px-4 py-1.5 text-xs">
      <span className="mr-2 hidden text-muted-foreground sm:inline">Accesibilidad:</span>
      <button
        type="button"
        onClick={decreaseFont}
        className="rounded p-1 hover:bg-muted"
        aria-label="Disminuir tamaño de texto"
        title="Disminuir tamaño de texto"
      >
        <Minus className="h-3.5 w-3.5" aria-hidden />
      </button>
      <button
        type="button"
        onClick={resetFont}
        className="rounded p-1 hover:bg-muted"
        aria-label="Restablecer tamaño de texto"
        title="Restablecer tamaño de texto"
      >
        <RotateCcw className="h-3.5 w-3.5" aria-hidden />
      </button>
      <button
        type="button"
        onClick={increaseFont}
        className="rounded p-1 hover:bg-muted"
        aria-label="Aumentar tamaño de texto"
        title="Aumentar tamaño de texto"
      >
        <Plus className="h-3.5 w-3.5" aria-hidden />
      </button>
      <span className="mx-1.5 h-4 w-px bg-border" aria-hidden />
      <button
        type="button"
        onClick={cycleTheme}
        className="inline-flex items-center gap-1.5 rounded p-1 hover:bg-muted"
        aria-label={`Cambiar tema de color. Actual: ${THEME_LABEL[theme]}`}
        title={THEME_LABEL[theme]}
      >
        <ThemeIcon className="h-3.5 w-3.5" aria-hidden />
        <span className="hidden sm:inline">{THEME_LABEL[theme]}</span>
      </button>
    </div>
  );
}
