import { SearchForm } from "@/components/library/search-form";
import { getHomeStats } from "@/lib/library/papers.functions";
import { randomSeed } from "@/lib/library/text";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import type { CSSProperties } from "react";

export const Route = createFileRoute("/")({
  loader: () => getHomeStats(),
  component: Home,
});

function Home() {
  const { total, shelves, slips } = Route.useLoaderData();
  const navigate = useNavigate();

  return (
    <>
      <section className="focus-pool mx-auto max-w-xl">
        <p className="text-xs tracking-widest text-faint uppercase">La sala, bajo la lámpara</p>
        <h1 className="mt-4 font-serif text-5xl leading-tight font-medium text-balance text-ink sm:text-6xl">
          La última biblioteca
        </h1>
        <p className="mt-5 font-serif text-xl leading-relaxed text-pretty text-ink-soft italic">
          Construida por personas que quizá nunca lleguen a conocerse.
        </p>
        <p className="mt-5 text-base leading-relaxed text-pretty text-ink">
          A veces necesitamos leer unas palabras, aunque todavía no sepamos cuáles. No hace falta
          cuenta ni nombre. Hay {total}&nbsp;{total === 1 ? "papel" : "papeles"} en los estantes.
        </p>
        <div className="mt-8">
          <SearchForm large />
          <button
            type="button"
            onClick={() => void navigate({ to: "/explorar", search: { s: randomSeed() } })}
            className="mt-5 min-h-11 text-left text-sm text-faint underline decoration-rule underline-offset-4 hover:text-ink"
          >
            O entra sin una pregunta
          </button>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="estantes-home">
        <h2 id="estantes-home" className="text-xs tracking-widest text-faint uppercase">
          Cinco maneras de entrar
        </h2>
        <ul className="shelf-tiles mt-4 grid gap-3">
          {shelves.map((shelf) => (
            <li key={shelf.id} className={`shelf-tile shelf-tile-${shelf.id}`}>
              <Link to="/estantes/$shelf" params={{ shelf: shelf.id }}>
                <span className="font-serif text-2xl text-ink">{shelf.name}</span>
                <span className="text-sm leading-relaxed text-faint">{shelf.blurb}</span>
                <span className="text-xs tracking-widest text-wax uppercase tabular-nums">
                  {shelf.count} {shelf.count === 1 ? "papel" : "papeles"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14" aria-labelledby="puzzle-home">
        <h2 id="puzzle-home" className="max-w-xl font-serif text-2xl leading-snug text-balance text-ink">
          Un rompecabezas al que todavía le faltan piezas
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-faint">
          Frases, preguntas y restos sueltos. No forman un texto único. Se rozan.
        </p>
        <ul className="puzzle">
          {slips.map((slip, index) => (
            <li key={slip.id} className="piece" style={{ "--i": index } as CSSProperties}>
              <Link to="/p/$id" params={{ id: slip.id }} search={{ nuevo: false }}>
                <span className="text-xs tracking-widest text-wax uppercase">{slip.name}</span>
                <span className="font-serif text-lg leading-snug text-ink">{slip.line}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
