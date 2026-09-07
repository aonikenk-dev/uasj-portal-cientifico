"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useState } from "react";

export function SearchBar({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter();
  const [q, setQ] = useState(initialQuery);

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/buscar${q ? `?q=${encodeURIComponent(q)}` : ""}`);
      }}
      className="flex w-full items-center gap-2 rounded-md border border-border bg-card px-3 py-2"
    >
      <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
      <label htmlFor="site-search" className="sr-only">
        Buscar contenidos
      </label>
      <input
        id="site-search"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar artículos, infografías, podcasts..."
        className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
    </form>
  );
}
