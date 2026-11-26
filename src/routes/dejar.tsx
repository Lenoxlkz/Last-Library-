import { LeaveForm } from "@/components/library/leave-form";
import { isShelf, type Shelf } from "@/lib/library/types";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dejar")({
  validateSearch: (search: Record<string, unknown>) => ({
    shelf: typeof search.shelf === "string" && isShelf(search.shelf) ? search.shelf : "",
  }),
  head: () => ({ meta: [{ title: "Dejar algo · La última biblioteca" }] }),
  component: LeavePage,
});

function LeavePage() {
  const { shelf } = Route.useSearch();
  const initial = (shelf || "fragmentos") as Shelf;

  return (
    <div className="focus-pool max-w-xl">
      <p className="text-xs tracking-widest text-faint uppercase">La mesa vacía</p>
      <h1 className="mt-4 font-serif text-5xl leading-tight font-medium text-balance text-ink">
        Un papel en blanco
      </h1>
      <p className="mt-6 font-serif text-xl leading-relaxed text-pretty text-ink-soft italic">
        Para quien todavía no ha llegado. No hace falta tu nombre, ni explicar por qué lo escribes.
      </p>
      <div className="mt-8 border-t border-rule pt-6">
        <LeaveForm initialShelf={initial} redirect />
      </div>
    </div>
  );
}
