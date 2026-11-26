import { PaperSlip } from "@/components/library/paper-slip";
import { drawLibraryPaper } from "@/lib/library/papers.functions";
import { randomSeed } from "@/lib/library/text";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/explorar")({
  validateSearch: (search: Record<string, unknown>) => ({
    s: typeof search.s === "string" ? search.s.slice(0, 40) : "",
  }),
  loaderDeps: ({ search }) => ({ s: search.s }),
  loader: ({ deps }) => (deps.s ? drawLibraryPaper({ data: { seed: deps.s } }) : Promise.resolve(null)),
  head: () => ({ meta: [{ title: "Explorar · La última biblioteca" }] }),
  component: ExplorePage,
});

function ExplorePage() {
  const { s } = Route.useSearch();
  const paper = Route.useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!s) {
      void navigate({ to: "/explorar", search: { s: randomSeed() }, replace: true });
    }
  }, [s, navigate]);

  return (
    <>
      {paper ? (
        <>
          <PaperSlip paper={paper} marginal={null} nearby={[]} kicker="Abierto al azar" offerLeave />
          <button
            type="button"
            onClick={() => void navigate({ to: "/explorar", search: { s: randomSeed() } })}
            className="mt-8 min-h-11 text-sm text-faint underline decoration-rule underline-offset-4 hover:text-ink"
          >
            Abrir otro cajón
          </button>
        </>
      ) : (
        <p className="focus-pool max-w-xl font-serif text-3xl leading-snug text-ink">
          Un cajón cerrado. Un momento.
        </p>
      )}
    </>
  );
}
