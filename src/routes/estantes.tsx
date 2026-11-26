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
    <>
      <div className="focus-pool max-w-xl">
        <p className="text-xs tracking-widest text-faint uppercase">Colecciones</p>
        <h1 className="mt-4 font-serif text-5xl leading-tight font-medium text-balance text-ink">
          Los estantes
        </h1>
        <p className="mt-6 text-base leading-relaxed text-pretty text-ink-soft">
          No son reglas. Son maneras de caminar entre {total}&nbsp;
          {total === 1 ? "papel" : "papeles"}. Un mensaje no tiene que ser profundo para tener un
          lugar.
        </p>
      </div>
      <ul className="shelf-tiles mt-8 grid gap-3">
        {shelves.map((shelf) => (
          <li key={shelf.id} className={`shelf-tile shelf-tile-${shelf.id}`}>
            <Link to="/estantes/$shelf" params={{ shelf: shelf.id }}>
              <span className="font-serif text-2xl text-ink">{shelf.name}</span>
              <span className="text-sm leading-relaxed text-faint">{shelf.blurb}</span>
              <span className="text-sm text-wax tabular-nums">
                {shelf.count} {shelf.count === 1 ? "papel" : "papeles"}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
