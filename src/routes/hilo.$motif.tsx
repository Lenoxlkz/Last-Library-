import { Shell } from "@/components/library/shell";
import { getThread } from "@/lib/library/papers.functions";
import { snippet } from "@/lib/library/text";
import { motifLabel, shelfMeta } from "@/lib/library/types";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/hilo/$motif")({
  loader: async ({ params }) => {
    const thread = await getThread({ data: { motif: params.motif } });
    if (!thread) throw notFound();
    return thread;
  },
  head: ({ params }) => ({
    meta: [{ title: `Hilo: ${motifLabel(params.motif)} · La última biblioteca` }],
  }),
  component: ThreadPage,
});

function ThreadPage() {
  const { motif, papers } = Route.useLoaderData();

  return (
    <Shell>
      <p className="text-xs tracking-widest text-faint uppercase">Un hilo</p>
      <h1 className="mt-4 font-serif text-5xl leading-tight font-medium text-balance text-ink">
        {motifLabel(motif)}
      </h1>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-ink-soft">
        Estos papeles no se escribieron juntos. Comparten una palabra y, a veces, un recuerdo. Con
        el tiempo dejan de parecer consultas sueltas.
      </p>
      {papers.length === 0 ? (
        <p className="mt-10 font-serif text-xl text-ink">Este hilo todavía espera a alguien.</p>
      ) : (
        <ul className="mt-10 border-t border-ink">
          {papers.map((paper) => (
            <li key={paper.id} className="border-b border-rule">
              <Link
                to="/p/$id"
                params={{ id: paper.id }}
                search={{ nuevo: false }}
                className="flex min-h-16 flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <span className="font-serif text-lg leading-snug text-ink">{snippet(paper.body)}</span>
                <span className="shrink-0 text-xs tracking-widest text-faint uppercase">
                  {shelfMeta(paper.shelf).name} · {paper.id}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Shell>
  );
}
