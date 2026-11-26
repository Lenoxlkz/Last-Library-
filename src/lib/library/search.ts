import type { Paper, Shelf } from "@/lib/library/types";
import { hashString, looksLikeQuestion, normalize, tokenize } from "@/lib/library/text";

export type Ranked = { paper: Paper; score: number };

export type SearchResult = {
  query: string;
  paper: Paper;
  marginal: Paper | null;
  nearby: Paper[];
  echoed: Paper | null;
  direct: boolean;
};

function motifHit(motifs: string[], tokens: string[]): number {
  let hits = 0;
  for (const motif of motifs) {
    if (
      tokens.some(
        (token) =>
          token === motif ||
          (token.startsWith(motif) && token.length <= motif.length + 3) ||
          (motif.startsWith(token) && token.length >= 4),
      )
    ) {
      hits += 1;
    }
  }
  return hits;
}

export function scorePaper(paper: Paper, tokens: string[], rawQuery: string): number {
  if (tokens.length === 0) return 0;
  const bodyTokens = tokenize(paper.body);
  const bodySet = new Set(bodyTokens);
  let overlap = 0;
  let soft = 0;
  for (const token of tokens) {
    if (bodySet.has(token)) {
      overlap += 1;
      continue;
    }
    if (
      bodyTokens.some((word) => {
        const short = Math.min(word.length, token.length);
        return short >= 4 && (word.startsWith(token) || token.startsWith(word));
      })
    ) {
      soft += 1;
    }
  }

  const motifs = motifHit(paper.motifs, tokens);
  let attend = 0;
  const queryNorm = rawQuery
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
  for (const phrase of paper.attends) {
    const phraseTokens = tokenize(phrase);
    const shared = phraseTokens.filter((token) => tokens.includes(token)).length;
    if (shared >= 2) attend += shared * 2;
    const bare = phrase
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{M}/gu, "");
    if (bare.length > 10 && queryNorm.includes(bare)) attend += 10;
  }

  let bias = 0;
  if (looksLikeQuestion(rawQuery)) {
    if (paper.shelf === "respuestas") bias += 3;
    if (paper.shelf === "preguntas") bias -= 2;
  }

  return overlap * 3 + soft * 2 + motifs * 4 + attend + bias;
}

function sharedMotifs(a: Paper, b: Paper): number {
  return a.motifs.filter((motif) => b.motifs.includes(motif)).length;
}

export function pickMarginal(papers: Paper[], main: Paper, skip: string[] = []): Paper | null {
  const skipped = new Set([main.id, ...skip]);
  let best: { paper: Paper; score: number } | null = null;
  for (const paper of papers) {
    if (skipped.has(paper.id)) continue;
    const shared = sharedMotifs(paper, main);
    if (shared === 0) continue;
    let score = shared * 10;
    if (paper.shelf !== main.shelf) score += 5;
    if (paper.shelf === "fragmentos" || paper.shelf === "cartas") score += 3;
    if (paper.origin === "visitante") score += 8;
    if (!best || score > best.score) best = { paper, score };
  }
  return best?.paper ?? null;
}

export function searchPapers(papers: Paper[], rawQuery: string): SearchResult | null {
  const query = rawQuery.trim().slice(0, 280);
  if (!query) return null;
  const tokens = tokenize(query);
  const ranked: Ranked[] = papers
    .map((paper) => ({ paper, score: scorePaper(paper, tokens, query) }))
    .sort((a, b) => b.score - a.score || a.paper.id.localeCompare(b.paper.id));

  const top = ranked[0];
  let winner = top;
  if (winner && looksLikeQuestion(query)) {
    const answer = ranked.find((row) => row.paper.shelf === "respuestas" && row.score >= 8);
    if (answer && answer.score >= winner.score - 6) winner = answer;
  }

  const direct = (winner?.score ?? 0) >= 8 && tokens.length > 0;
  let paper: Paper;
  if (direct && winner) {
    paper = winner.paper;
  } else {
    const pool = papers.filter((item) => item.shelf === "hallazgos");
    const source = pool.length > 0 ? pool : papers;
    paper = source[hashString(query) % source.length]!;
  }

  const echoedCandidate = direct
    ? (ranked.find(
        (row) =>
          row.paper.shelf === "preguntas" &&
          row.paper.id !== paper.id &&
          row.score >= 8,
      )?.paper ?? null)
    : null;
  const echoed =
    echoedCandidate && normalize(echoedCandidate.body) !== normalize(query)
      ? echoedCandidate
      : null;

  const marginal = direct ? pickMarginal(papers, paper, echoed ? [echoed.id] : []) : null;
  const used = new Set([paper.id, marginal?.id, echoed?.id].filter(Boolean));
  const nearby = direct
    ? ranked
        .filter((row) => row.score > 0 && !used.has(row.paper.id))
        .slice(0, 2)
        .map((row) => row.paper)
    : [];

  return { query, paper, marginal, nearby, echoed, direct };
}

export function drawPaper(papers: Paper[], seed: string): Paper {
  const index = hashString(seed) % papers.length;
  return papers[index]!;
}

export function papersOnShelf(papers: Paper[], shelf: Shelf): Paper[] {
  return papers
    .filter((paper) => paper.shelf === shelf)
    .sort((a, b) => {
      if (a.origin !== b.origin) return a.origin === "visitante" ? -1 : 1;
      return a.id.localeCompare(b.id);
    });
}

export function papersOnThread(papers: Paper[], motif: string): Paper[] {
  return papers
    .filter((paper) => paper.motifs.includes(motif))
    .sort((a, b) => a.id.localeCompare(b.id));
}
