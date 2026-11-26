import { Link } from "@tanstack/react-router";

export function LibraryNotFound() {
  return (
    <div className="focus-pool max-w-xl">
      <p className="text-xs tracking-widest text-faint uppercase">Estante vacío</p>
      <h1 className="mt-4 font-serif text-4xl leading-tight text-balance text-ink">
        Este papel no está aquí.
      </h1>
      <p className="mt-6 font-serif text-xl leading-relaxed text-ink-soft">
        Puede que nunca se escribiera, o que el número esté mal copiado.
      </p>
      <Link
        to="/explorar"
        search={{ s: "" }}
        className="mt-8 inline-flex min-h-11 items-center text-sm text-wax underline decoration-rule underline-offset-4"
      >
        Abrir un cajón al azar
      </Link>
    </div>
  );
}
