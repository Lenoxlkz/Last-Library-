import { leavePaper } from "@/lib/library/papers.functions";
import { moderate } from "@/lib/library/text";
import { SHELVES, type Shelf } from "@/lib/library/types";
import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const SHELF_CHOICE: Record<Shelf, string> = {
  preguntas: "Una pregunta",
  respuestas: "Una respuesta",
  fragmentos: "Un fragmento",
  cartas: "Una carta",
  hallazgos: "Un hallazgo",
};

export function LeaveForm({
  initialShelf = "fragmentos",
  redirect = false,
}: {
  initialShelf?: Shelf;
  redirect?: boolean;
}) {
  const navigate = useNavigate();
  const [shelf, setShelf] = useState<Shelf>(initialShelf);
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const [doneId, setDoneId] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setShelf(initialShelf);
  }, [initialShelf]);

  if (doneId && !redirect) {
    return (
      <p className="font-serif text-xl leading-relaxed text-ink" role="status">
        Quedó en el estante. Quien venga después podrá encontrarlo, sin saber que eras tú.{" "}
        <Link
          to="/p/$id"
          params={{ id: doneId }}
          search={{ nuevo: false }}
          className="text-wax underline decoration-rule underline-offset-4"
        >
          Ver el papel
        </Link>
        .
      </p>
    );
  }

  return (
    <form
      className="flex flex-col gap-8"
      onSubmit={(event) => {
        event.preventDefault();
        const checked = moderate(shelf, body);
        if (!checked.ok) {
          setMessage(checked.message);
          return;
        }
        setPending(true);
        setMessage("");
        void leavePaper({ data: { shelf, body } })
          .then(async (result) => {
            if (!result.ok) {
              setMessage(result.message);
              return;
            }
            if (redirect) {
              await navigate({
                to: "/p/$id",
                params: { id: result.id },
                search: { nuevo: true },
              });
              return;
            }
            setDoneId(result.id);
            setBody("");
          })
          .catch(() => {
            setMessage("El papel no pudo entrar. Inténtalo otra vez en un momento.");
          })
          .finally(() => setPending(false));
      }}
    >
      <label className="block">
        <span className="sr-only">Tu texto</span>
        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
          rows={8}
          maxLength={1400}
          placeholder="Una frase, una anécdota, una pregunta, o algo que te habría gustado encontrar."
          className="min-h-52 w-full resize-y bg-transparent font-serif text-xl leading-relaxed text-ink outline-none placeholder:text-faint"
        />
      </label>
      <fieldset>
        <legend className="mb-3 text-xs tracking-widest text-faint uppercase">Esto es</legend>
        <div className="grid gap-1 sm:grid-cols-2">
          {SHELVES.map((item) => (
            <label key={item.id} className="flex min-h-11 items-center gap-3 text-ink">
              <input
                type="radio"
                name="shelf"
                value={item.id}
                checked={shelf === item.id}
                onChange={() => setShelf(item.id)}
                className="size-4 accent-wax"
              />
              <span className="font-serif text-lg">{SHELF_CHOICE[item.id]}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-faint tabular-nums" aria-live="polite">
          {body.trim().length} / 1200
        </p>
        <button
          type="submit"
          disabled={pending}
          className="min-h-12 bg-ink px-6 text-sm tracking-wide text-paper hover:bg-wax disabled:opacity-50"
        >
          {pending ? "Dejándolo…" : "Dejarlo en la biblioteca"}
        </button>
      </div>
      {message ? (
        <p className="text-sm text-wax" role="alert">
          {message}
        </p>
      ) : (
        <p className="max-w-md text-sm leading-relaxed text-faint">
          Sin nombre. Si el texto trae datos privados, insultos o enlaces, el estante lo devuelve.
        </p>
      )}
    </form>
  );
}
