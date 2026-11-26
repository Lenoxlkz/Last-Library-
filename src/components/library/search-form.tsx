import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export function SearchForm({ initial = "", large = false }: { initial?: string; large?: boolean }) {
  const navigate = useNavigate();
  const [value, setValue] = useState(initial);

  return (
    <form
      className="flex flex-col gap-3 sm:flex-row sm:items-end"
      onSubmit={(event) => {
        event.preventDefault();
        const q = value.trim();
        if (!q) return;
        void navigate({ to: "/buscar", search: { q } });
      }}
    >
      <label className="block min-w-0 flex-1">
        <span className="mb-2 block text-xs tracking-widest text-faint uppercase">
          {large ? "Escribe lo que traías" : "Otra búsqueda"}
        </span>
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          maxLength={280}
          autoComplete="off"
          placeholder="Una pregunta, una inquietud, una idea extraña"
          className="min-h-12 w-full border-b border-ink bg-transparent font-serif text-lg text-ink outline-none placeholder:text-faint"
        />
      </label>
      <button
        type="submit"
        className="min-h-12 bg-ink px-6 text-sm tracking-wide text-paper hover:bg-wax"
      >
        Buscar
      </button>
    </form>
  );
}
