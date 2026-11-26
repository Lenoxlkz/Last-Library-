import { PaperSlip } from "@/components/library/paper-slip";
import { SearchForm } from "@/components/library/search-form";
import { searchLibrary } from "@/lib/library/papers.functions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/buscar")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q.slice(0, 280) : "",
  }),
  loaderDeps: ({ search }) => ({ q: search.q }),
  loader: ({ deps }) => (deps.q ? searchLibrary({ data: { q: deps.q } }) : Promise.resolve(null)),
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData?.query ? `«${loaderData.query.slice(0, 48)}» · La última biblioteca` : "Buscar · La última biblioteca" }],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const result = Route.useLoaderData();

  return (
    <>
      {!q ? (
        <div className="focus-pool max-w-xl">
          <SearchForm large />
          <p className="mt-8 font-serif text-2xl leading-snug text-ink">
            Escribe algo. Aunque sea torpe. La biblioteca no pide que sepas el título.
          </p>
        </div>
      ) : null}
      {result ? (
        <>
          <PaperSlip
            paper={result.paper}
            marginal={result.marginal}
            nearby={result.nearby}
            echoed={result.echoed}
            question={result.query}
            kicker={
              result.direct
                ? "Encontrado entre los estantes"
                : "No había un papel con esa forma. Esto estaba cerca, o quizá no"
            }
          />
          <div className="mt-12 max-w-xl">
            <SearchForm initial={q} />
          </div>
        </>
      ) : null}
    </>
  );
}
