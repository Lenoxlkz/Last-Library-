import { SearchForm } from "@/components/library/search-form";
import { Shell } from "@/components/library/shell";
import { getHomeStats } from "@/lib/library/papers.functions";
import { randomSeed } from "@/lib/library/text";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  loader: () => getHomeStats(),
  component: Home,
});

function Home() {
  const { total, shelves } = Route.useLoaderData();
  const navigate = useNavigate();

  return (
    <Shell>
      <p className="text-xs tracking-widest text-faint uppercase">Una biblioteca pública</p>
      <h1 className="mt-4 max-w-xl font-serif text-5xl leading-tight font-medium text-balance text-ink sm:text-6xl">
        La última biblioteca
      </h1>
      <p className="mt-6 max-w-xl font-serif text-xl leading-relaxed text-pretty text-ink-soft italic">
        Construida por personas que quizá nunca lleguen a conocerse.
      </p>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-ink">
        A veces necesitamos leer unas palabras, aunque todavía no sepamos cuáles. No hace falta
        cuenta ni nombre. Hay {total}&nbsp;{total === 1 ? "papel" : "papeles"} en los estantes.
      </p>

      <div className="mt-10 max-w-xl">
        <SearchForm large />
        <button
          type="button"
          onClick={() =>
            void navigate({ to: "/explorar", search: { s: randomSeed() } })
          }
          className="mt-5 min-h-11 text-left text-sm text-faint underline decoration-rule underline-offset-4 hover:text-ink"
        >
          O entra sin una pregunta
        </button>
      </div>

      <section className="mt-14 border-t border-ink">
        <h2 className="sr-only">Estantes</h2>
        <ul>
          {shelves.map((shelf) => (
            <li key={shelf.id} className="border-b border-rule">
              <Link
                to="/estantes/$shelf"
                params={{ shelf: shelf.id }}
                className="flex min-h-16 flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <span className="font-serif text-2xl text-ink">{shelf.name}</span>
                <span className="text-sm leading-relaxed text-faint sm:max-w-xs sm:text-right">
                  {shelf.blurb}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <blockquote className="mt-14 max-w-xl border-l border-wax pl-4 font-serif text-lg leading-relaxed text-ink-soft italic">
        Hay palabras que alguien dejó aquí sin saber quién las encontraría.
      </blockquote>
    </Shell>
  );
}
