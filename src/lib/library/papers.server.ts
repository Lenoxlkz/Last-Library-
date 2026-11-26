import { getSql } from "@/lib/db";
import { getRequestHeader } from "@tanstack/react-start/server";
import { SEED, SEED_NORMS } from "@/lib/library/seed";
import {
  drawPaper,
  papersOnShelf,
  papersOnThread,
  pickMarginal,
  searchPapers,
  type SearchResult,
} from "@/lib/library/search";
import { moderate, snippet } from "@/lib/library/text";
import { isShelf, isThread, SHELVES, type Paper, type Shelf } from "@/lib/library/types";

type PaperRow = {
  id: string;
  shelf: string;
  body: string;
  motifs: string;
  received: string;
};

const recentHits = new Map<string, number[]>();

function clientKey(): string {
  const forwarded = getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || "local";
}

function withinRate(key: string): boolean {
  const now = Date.now();
  const hits = (recentHits.get(key) ?? []).filter((stamp) => now - stamp < 60_000);
  if (hits.length >= 8) return false;
  const last = hits[hits.length - 1];
  if (last && now - last < 2_000) return false;
  hits.push(now);
  recentHits.set(key, hits);
  return true;
}

function fromRow(row: PaperRow): Paper | null {
  if (!isShelf(row.shelf)) return null;
  return {
    id: row.id,
    shelf: row.shelf,
    body: row.body,
    motifs: row.motifs.split(",").filter(Boolean),
    attends: [],
    received: row.received,
    origin: "visitante",
  };
}

export async function loadPapers(): Promise<Paper[]> {
  const sql = await getSql();
  const rows = await sql<PaperRow>`
    select id, shelf, body, motifs, to_char(received_at at time zone 'UTC', 'YYYY-MM-DD') as received
    from papers
    order by received_at asc
  `;
  const visitors = rows.map(fromRow).filter((paper): paper is Paper => paper !== null);
  return [...SEED, ...visitors];
}

function newId(shelf: Shelf, taken: Set<string>): string {
  const prefix = { preguntas: "P", respuestas: "R", fragmentos: "F", cartas: "C", hallazgos: "H" }[shelf];
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  for (let attempt = 0; attempt < 8; attempt++) {
    const bytes = new Uint8Array(4);
    crypto.getRandomValues(bytes);
    const id = `${prefix}-${Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("")}`;
    if (!taken.has(id)) return id;
  }
  return `${prefix}-${Date.now().toString(36).toUpperCase()}`;
}

export async function homeStats() {
  const papers = await loadPapers();
  return {
    total: papers.length,
    shelves: SHELVES.map((shelf) => ({
      ...shelf,
      count: papers.filter((paper) => paper.shelf === shelf.id).length,
    })),
    slips: SHELVES.flatMap((shelf) =>
      papers
        .filter((paper) => paper.shelf === shelf.id)
        .slice(0, 2)
        .map((paper) => ({
          id: paper.id,
          shelf: shelf.id,
          name: shelf.name,
          line: snippet(paper.body, 110),
        })),
    ),
  };
}

export async function findPapers(query: string): Promise<SearchResult | null> {
  const papers = await loadPapers();
  return searchPapers(papers, query);
}

export async function openDrawer(seed: string): Promise<Paper> {
  const papers = await loadPapers();
  return drawPaper(papers, seed);
}

export async function shelfPapers(shelf: string) {
  if (!isShelf(shelf)) return null;
  const papers = await loadPapers();
  return { shelf, papers: papersOnShelf(papers, shelf) };
}

export async function paperPage(id: string) {
  const papers = await loadPapers();
  const paper = papers.find((item) => item.id === id);
  if (!paper) return null;
  const marginal = pickMarginal(papers, paper);
  const nearby = papers
    .filter((item) => item.id !== paper.id && item.id !== marginal?.id)
    .map((item) => ({
      item,
      shared: item.motifs.filter((motif) => paper.motifs.includes(motif)).length,
    }))
    .filter((row) => row.shared > 0)
    .sort((a, b) => b.shared - a.shared || a.item.id.localeCompare(b.item.id))
    .slice(0, 2)
    .map((row) => row.item);
  return { paper, marginal, nearby };
}

export async function threadPapers(motif: string) {
  if (!/^[a-z]{3,24}$/.test(motif)) return null;
  const papers = await loadPapers();
  const matches = papersOnThread(papers, motif);
  if (!isThread(motif) && matches.length === 0) return null;
  return { motif, papers: matches };
}

export type LeaveResult = { ok: true; id: string } | { ok: false; message: string };

export async function addPaper(shelf: string, body: string): Promise<LeaveResult> {
  if (!withinRate(clientKey())) {
    return { ok: false, message: "Acabas de dejar un papel. Espera un momento antes del siguiente." };
  }

  const checked = moderate(shelf, body);
  if (!checked.ok) return checked;
  if (SEED_NORMS.has(checked.norm)) {
    return { ok: false, message: "Esas palabras ya estaban aquí." };
  }

  const sql = await getSql();
  const existing = await sql<{ id: string }>`select id from papers where norm = ${checked.norm} limit 1`;
  if (existing.length > 0) {
    return { ok: false, message: "Esas palabras ya estaban aquí." };
  }

  const papers = await loadPapers();
  const id = newId(checked.shelf, new Set(papers.map((paper) => paper.id)));
  try {
    await sql`
      insert into papers (id, shelf, body, motifs, norm)
      values (${id}, ${checked.shelf}, ${checked.body}, ${checked.motifs.join(",")}, ${checked.norm})
    `;
  } catch (error) {
    const message = error instanceof Error ? error.message.toLowerCase() : "";
    if (message.includes("unique") || message.includes("duplicate") || message.includes("23505")) {
      return { ok: false, message: "Esas palabras ya estaban aquí." };
    }
    if (message.includes("check")) {
      return { ok: false, message: "Este papel no cabe en el estante." };
    }
    throw error;
  }

  return { ok: true, id };
}
