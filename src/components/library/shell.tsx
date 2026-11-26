import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

const NAV = [
  { to: "/", label: "Entrada", match: (path: string) => path === "/" },
  { to: "/estantes", label: "Estantes", match: (path: string) => path.startsWith("/estantes") },
  { to: "/explorar", label: "Explorar", match: (path: string) => path.startsWith("/explorar") },
  { to: "/dejar", label: "Dejar algo", match: (path: string) => path.startsWith("/dejar") },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (state) => state.location.pathname });

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-rule">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:px-6">
          <Link to="/" className="font-serif text-lg leading-tight text-ink">
            La última biblioteca
          </Link>
          <nav className="flex flex-wrap gap-x-4 gap-y-1" aria-label="Secciones">
            {NAV.map((item) => {
              const active = item.match(path);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={
                    active
                      ? "min-h-11 border-b border-wax py-2 text-sm text-ink"
                      : "min-h-11 py-2 text-sm text-faint"
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-10 sm:px-6 sm:py-14">{children}</main>
      <footer className="border-t border-rule">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <p className="max-w-sm font-serif text-base italic leading-relaxed text-ink-soft">
            La biblioteca nunca estuvo terminada. Siempre faltaba alguien por llegar.
          </p>
          <Link to="/acerca" className="min-h-11 py-2 text-sm text-faint underline decoration-rule underline-offset-4">
            Acerca de este lugar
          </Link>
        </div>
      </footer>
    </div>
  );
}
