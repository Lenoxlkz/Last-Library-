import type { ErrorComponentProps } from "@tanstack/react-router";

const FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return FALLBACK_MESSAGE;
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-paper px-6 text-center text-ink">
      <span className="block h-px w-10 bg-wax" aria-hidden />
      <h1 className="font-serif text-3xl font-medium text-balance">Algo se desordenó</h1>
      <p className="max-w-md text-sm break-words text-faint">{errorMessage(error)}</p>
    </main>
  );
}
