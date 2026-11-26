import { LeaveForm } from "@/components/library/leave-form";
import { receivedLabel, snippet } from "@/lib/library/text";
import {
  motifLabel,
  shelfMeta,
  visibleThreads,
  type Paper,
} from "@/lib/library/types";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

function Paragraphs({ body }: { body: string }) {
  return (
    <div className="space-y-6">
      {body.split(/\n\n+/).map((paragraph, index) => (
        <p key={`${paragraph.slice(0, 24)}-${index}`} className="font-serif text-xl leading-relaxed whitespace-pre-wrap text-pretty text-ink">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

export function PaperSlip({
  paper,
  marginal,
  nearby,
  kicker,
  question,
  echoed,
  fresh = false,
  offerLeave = true,
}: {
  paper: Paper;
  marginal: Paper | null;
  nearby: Paper[];
  kicker: string;
  question?: string;
  echoed?: Paper | null;
  fresh?: boolean;
  offerLeave?: boolean;
}) {
  const shelf = shelfMeta(paper.shelf);
  const threads = visibleThreads(paper.motifs);
  const [openLeave, setOpenLeave] = useState(false);

  return (
    <article className="focus-pool rise max-w-xl">
      <p className="text-xs tracking-widest text-faint uppercase">{kicker}</p>
      {question ? (
        <p className="mt-4 max-w-xl font-serif text-lg leading-relaxed text-pretty text-faint italic">
          «{question}»
        </p>
      ) : null}

      {echoed ? (
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-faint">
          En preguntas ya estaba escrito:{" "}
          <Link
            to="/p/$id"
            params={{ id: echoed.id }}
            search={{ nuevo: false }}
            className="text-ink underline decoration-rule underline-offset-4"
          >
            {snippet(echoed.body, 96)}
          </Link>
        </p>
      ) : null}

      <header className="mt-8 flex items-baseline justify-between gap-4 border-t border-ink pt-4">
        <p className="font-serif text-lg text-ink">{shelf.name}</p>
        <p className="text-xs tracking-widest text-faint uppercase tabular-nums">N.º {paper.id}</p>
      </header>
      <p className="mt-2 text-sm text-faint">
        {receivedLabel(paper.origin, paper.received)}
        {paper.origin === "visitante" ? " · sin nombre" : ""}
      </p>

      <div className="mt-8 max-w-xl">
        <Paragraphs body={paper.body} />
      </div>

      {threads.length > 0 ? (
        <p className="mt-8 max-w-xl text-sm leading-relaxed text-faint">
          Comparte hilo con otros papeles:{" "}
          {threads.map((motif, index) => (
            <span key={motif}>
              {index > 0 ? " · " : ""}
              <Link
                to="/hilo/$motif"
                params={{ motif }}
                className="text-ink underline decoration-rule underline-offset-4"
              >
                {motifLabel(motif)}
              </Link>
            </span>
          ))}
        </p>
      ) : null}

      {fresh ? (
        <p className="mt-10 max-w-xl border-t border-rule pt-6 font-serif text-xl leading-relaxed text-ink" role="status">
          Quedó en el estante. Quien venga después podrá encontrarlo, sin saber que eras tú.
        </p>
      ) : null}

      {marginal ? (
        <aside className="mt-12 max-w-xl border-t border-rule pt-6">
          <p className="text-xs tracking-widest text-wax uppercase">Al margen</p>
          <p className="mt-2 text-sm leading-relaxed text-faint">
            No forma parte del texto anterior. Está cerca, y comparte una palabra. Nadie decidió que
            respondiera a lo demás.
          </p>
          <p className="mt-4 text-sm text-faint">
            {shelfMeta(marginal.shelf).name} · N.º {marginal.id}
          </p>
          <div className="mt-4">
            <Paragraphs body={marginal.body} />
          </div>
        </aside>
      ) : null}

      {nearby.length > 0 ? (
        <section className="mt-12 max-w-xl">
          <h2 className="text-xs tracking-widest text-faint uppercase">En estantes vecinos</h2>
          <ul className="mt-4 divide-y divide-rule border-y border-rule">
            {nearby.map((item) => (
              <li key={item.id}>
                <Link
                  to="/p/$id"
                  params={{ id: item.id }}
                  search={{ nuevo: false }}
                  className="flex min-h-11 flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <span className="font-serif text-lg leading-snug text-ink">{snippet(item.body)}</span>
                  <span className="shrink-0 text-xs tracking-widest text-faint uppercase">
                    {shelfMeta(item.shelf).name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {offerLeave && !fresh ? (
        <section className="mt-14 max-w-xl border-t border-ink pt-8">
          {openLeave ? (
            <>
              <h2 className="font-serif text-2xl leading-snug text-balance text-ink">
                Un papel en blanco, para quien todavía no ha llegado.
              </h2>
              <div className="mt-6">
                <LeaveForm />
              </div>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setOpenLeave(true)}
              className="text-left font-serif text-2xl leading-snug text-balance text-ink underline decoration-rule underline-offset-4 hover:decoration-wax"
            >
              Antes de irte, ¿te gustaría dejar algo para quien venga después?
            </button>
          )}
        </section>
      ) : null}
    </article>
  );
}
