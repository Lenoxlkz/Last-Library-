import { Shell } from "@/components/library/shell";
import { getShelfPapers } from "@/lib/library/papers.functions";
import { snippet } from "@/lib/library/text";
import { isShelf, shelfMeta } from "@/lib/library/types";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/estantes/$shelf")({
  loader: async ({ params }) => {
    if (!isShelf(params.shelf)) throw notFound();
    const result = await getShelfPapers({ data: { shelf: params.shelf } });
    if (!result) throw notFound();
    return result;
  },
  head: ({ params }) => ({
    meta: [
      {
        title: isShelf(params.shelf)
          ? `${shelfMeta(params.shelf).name} · La última biblioteca`
          : "Estantes · La última biblioteca",
      },
    ],
  }),
  component: ShelfPage,
});

function ShelfPage() {
  const { shelf, papers } = Route.useLoaderData();
  if (!isShelf(shelf)) throw notFound();
  const meta = shelfMeta(shelf);

  return (
    <Shell>
      <p className="text-xs tracking-widest text-faint uppercase">Estante</p>
      <h1 className="mt-4 font-serif text-5xl leading-tight font-medium text-ink">{meta.name}</h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-faint">{meta.blurb}</p>
      <p className="mt-6">
        <Link
          to="/dejar"
          search={{ shelf }}
          className="min-h-11 text-sm text-wax underline decoration-rule underline-offset-4"
        >
          Dejar un papel en este estante
        </Link>
      </p>
      <ul className="mt-8 border-t border-ink">
        {papers.map((paper) => (
          <li key={paper.id} className="border-b border-rule">
            <Link
              to="/p/$id"
              params={{ id: paper.id }}
              search={{ nuevo: false }}
              className="flex min-h-16 flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
            >
              <span className="font-serif text-lg leading-snug text-ink">{snippet(paper.body)}</span>
              <span className="shrink-0 text-xs tracking-widest text-faint uppercase tabular-nums">
                {paper.origin === "visitante" ? "Visitante · " : ""}
                {paper.id}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Shell>
  );
}
