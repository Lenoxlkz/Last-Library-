import { getShelfPapers } from "@/lib/library/papers.functions";
import { snippet } from "@/lib/library/text";
import { isShelf, shelfMeta } from "@/lib/library/types";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { CSSProperties } from "react";

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
    <>
      <div className="focus-pool max-w-xl">
        <p className="text-xs tracking-widest text-wax uppercase">{meta.name}</p>
        <h1 className="mt-3 font-serif text-5xl leading-tight font-medium text-ink">{meta.name}</h1>
        <p className="mt-4 text-base leading-relaxed text-faint">{meta.blurb}</p>
        <p className="mt-6">
          <Link
            to="/dejar"
            search={{ shelf }}
            className="inline-flex min-h-11 items-center text-sm text-wax underline decoration-rule underline-offset-4"
          >
            Dejar un papel en este estante
          </Link>
        </p>
      </div>
      <ul className={`board board-${shelf}`}>
        {papers.map((paper, index) => (
          <li key={paper.id} style={{ "--i": index } as CSSProperties}>
            <Link
              to="/p/$id"
              params={{ id: paper.id }}
              search={{ nuevo: false }}
              className="slip"
            >
              <span className="font-serif text-lg leading-snug text-ink">{snippet(paper.body)}</span>
              <span className="text-xs tracking-widest text-faint uppercase tabular-nums">
                {paper.origin === "visitante" ? "Visitante · " : ""}
                {paper.id}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
