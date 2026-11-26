import { LeaveForm } from "@/components/library/leave-form";
import { Shell } from "@/components/library/shell";
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
    <Shell>
      <p className="text-xs tracking-widest text-faint uppercase">Antes de irte</p>
      <h1 className="mt-4 max-w-xl font-serif text-5xl leading-tight font-medium text-balance text-ink">
        Un papel en blanco
      </h1>
      <p className="mt-6 max-w-xl font-serif text-xl leading-relaxed text-pretty text-ink-soft italic">
        Para quien todavía no ha llegado. No hace falta tu nombre, ni explicar por qué lo escribes.
      </p>
      <div className="mt-10 max-w-xl border-t border-ink pt-6">
        <LeaveForm initialShelf={initial} redirect />
      </div>
    </Shell>
  );
}
