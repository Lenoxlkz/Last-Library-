import { PaperSlip } from "@/components/library/paper-slip";
import { Shell } from "@/components/library/shell";
import { getPaperPage } from "@/lib/library/papers.functions";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/p/$id")({
  validateSearch: (search: Record<string, unknown>) => ({
    nuevo: search.nuevo === true || search.nuevo === "1" || search.nuevo === "true",
  }),
  loader: async ({ params }) => {
    const page = await getPaperPage({ data: { id: params.id } });
    if (!page) throw notFound();
    return page;
  },
  head: ({ params }) => ({
    meta: [{ title: `N.º ${params.id} · La última biblioteca` }],
  }),
  component: PaperPage,
});

function PaperPage() {
  const { paper, marginal, nearby } = Route.useLoaderData();
  const { nuevo } = Route.useSearch();

  return (
    <Shell>
      <PaperSlip
        paper={paper}
        marginal={marginal}
        nearby={nearby}
        kicker={nuevo ? "Acaba de quedar en el estante" : "Ficha de lectura"}
        fresh={nuevo}
        offerLeave={!nuevo}
      />
    </Shell>
  );
}
