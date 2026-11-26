import { TideToggle } from "@/components/library/tide";
import { SHELVES } from "@/lib/library/types";
import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function Shell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (state) => state.location.pathname });

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="tide-bar" data-live="false">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
          <div className="flex items-center justify-between gap-3 pt-3 pb-1">
            <Link to="/" className="font-serif text-lg leading-none text-ink">
              La última biblioteca
            </Link>
            <TideToggle />
          </div>
          <nav className="flex gap-1 overflow-x-auto pb-1" aria-label="Secciones">
            <Link to="/" data-active={path === "/" ? "true" : "false"} className="nav-link">
              Entrada
            </Link>
            <Link
              to="/estantes"
              data-active={path === "/estantes" ? "true" : "false"}
              className="nav-link"
            >
              Estantes
            </Link>
            <Link
              to="/explorar"
              search={{ s: "" }}
              data-active={path.startsWith("/explorar") ? "true" : "false"}
              className="nav-link"
            >
              Explorar
            </Link>
            <Link
              to="/buscar"
              search={{ q: "" }}
              data-active={path.startsWith("/buscar") ? "true" : "false"}
              className="nav-link"
            >
              Buscar
            </Link>
            <Link
              to="/dejar"
              search={{ shelf: "" }}
              data-active={path.startsWith("/dejar") ? "true" : "false"}
              className="nav-link"
            >
              Dejar algo
            </Link>
          </nav>
          <nav className="flex gap-2 overflow-x-auto pt-1 pb-3" aria-label="Estantes">
            {SHELVES.map((shelf) => {
              const active = path === `/estantes/${shelf.id}`;
              return (
                <Link
                  key={shelf.id}
                  to="/estantes/$shelf"
                  params={{ shelf: shelf.id }}
                  data-active={active ? "true" : "false"}
                  className="chip"
                >
                  {shelf.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">{children}</main>
      <footer className="border-t border-rule">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <p className="max-w-sm font-serif text-base italic leading-relaxed text-ink-soft">
            La biblioteca nunca estuvo terminada. Siempre faltaba alguien por llegar.
          </p>
          <Link
            to="/acerca"
            className="min-h-11 py-2 text-sm text-faint underline decoration-rule underline-offset-4"
          >
            Acerca de este lugar
          </Link>
        </div>
      </footer>
    </div>
  );
}
