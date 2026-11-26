import { Shell } from "@/components/library/shell";
import { getHomeStats } from "@/lib/library/papers.functions";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/estantes")({
  loader: () => getHomeStats(),
  head: () => ({ meta: [{ title: "Estantes · La última biblioteca" }] }),
  component: ShelvesPage,
});

function ShelvesPage() {
  const { shelves, total } = Route.useLoaderData();

  return (
    <Shell>
      <p className="text-xs tracking-widest text-faint uppercase">Colecciones</p>
      <h1 className="mt-4 max-w-xl font-serif text-5xl leading-tight font-medium text-balance text-ink">
        Los estantes
      </h1>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-ink-soft">
        No son reglas. Son maneras de caminar entre {total} {total === 1 ? "papel" : "papeles"}. Un
        mensaje no tiene que ser profundo para tener un lugar.
      </p>
      <ul className="mt-10 border-t border-ink">
        {shelves.map((shelf) => (
          <li key={shelf.id} className="border-b border-rule">
            <Link
              to="/estantes/$shelf"
              params={{ shelf: shelf.id }}
              className="grid gap-2 py-6 sm:grid-cols-[10rem_1fr_auto] sm:items-baseline sm:gap-6"
            >
              <span className="font-serif text-2xl text-ink">{shelf.name}</span>
              <span className="text-sm leading-relaxed text-faint">{shelf.blurb}</span>
              <span className="text-sm text-faint tabular-nums">
                {shelf.count} {shelf.count === 1 ? "papel" : "papeles"}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Shell>
  );
}
