export const SHELVES = [
  {
    id: "preguntas",
    name: "Preguntas",
    blurb: "Dudas personales, curiosas o difíciles de explicar.",
  },
  {
    id: "respuestas",
    name: "Respuestas",
    blurb: "Reflexiones que intentan acompañar una pregunta.",
  },
  {
    id: "fragmentos",
    name: "Fragmentos",
    blurb: "Historias incompletas, ideas sueltas, párrafos sin contexto.",
  },
  {
    id: "cartas",
    name: "Cartas",
    blurb: "Mensajes dirigidos a alguien que todavía no se conoce.",
  },
  {
    id: "hallazgos",
    name: "Hallazgos",
    blurb: "Textos absurdos, inesperados o difíciles de clasificar.",
  },
] as const;

export type Shelf = (typeof SHELVES)[number]["id"];

export type Origin = "fundacion" | "visitante";

export type Paper = {
  id: string;
  shelf: Shelf;
  body: string;
  motifs: string[];
  attends: string[];
  received: string;
  origin: Origin;
};

export const THREADS = [
  "reloj",
  "tarde",
  "vida",
  "llave",
  "tren",
  "ventana",
  "nombre",
  "lluvia",
  "silla",
  "silencio",
  "cocina",
  "dias",
  "puerta",
  "anden",
  "cuarto",
  "luz",
] as const;

export type Thread = (typeof THREADS)[number];

const THREAD_SET = new Set<string>(THREADS);

export function isShelf(value: string): value is Shelf {
  return SHELVES.some((shelf) => shelf.id === value);
}

export function shelfMeta(id: Shelf) {
  return SHELVES.find((shelf) => shelf.id === id)!;
}

export function isThread(value: string): value is Thread {
  return THREAD_SET.has(value);
}

const MOTIF_LABEL: Record<string, string> = {
  dias: "días",
  anden: "andén",
};

export function motifLabel(motif: string): string {
  return MOTIF_LABEL[motif] ?? motif;
}

export function visibleThreads(motifs: string[]): Thread[] {
  return motifs.filter(isThread).slice(0, 4);
}
