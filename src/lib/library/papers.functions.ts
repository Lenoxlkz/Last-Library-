import { createServerFn } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/react-start/server";
import {
  addPaper,
  findPapers,
  homeStats,
  openDrawer,
  paperPage,
  shelfPapers,
  threadPapers,
} from "@/lib/library/papers.server";

function quietCache() {
  setResponseHeader("Cache-Control", "no-store");
}

export const getHomeStats = createServerFn({ method: "GET" }).handler(async () => {
  quietCache();
  return homeStats();
});

export const searchLibrary = createServerFn({ method: "GET" })
  .validator((data: { q: string }) => ({ q: typeof data?.q === "string" ? data.q : "" }))
  .handler(async ({ data }) => {
    quietCache();
    return findPapers(data.q);
  });

export const drawLibraryPaper = createServerFn({ method: "GET" })
  .validator((data: { seed: string }) => ({
    seed: typeof data?.seed === "string" ? data.seed.slice(0, 40) : "",
  }))
  .handler(async ({ data }) => {
    quietCache();
    if (!data.seed) return null;
    return openDrawer(data.seed);
  });

export const getShelfPapers = createServerFn({ method: "GET" })
  .validator((data: { shelf: string }) => ({
    shelf: typeof data?.shelf === "string" ? data.shelf : "",
  }))
  .handler(async ({ data }) => {
    quietCache();
    return shelfPapers(data.shelf);
  });

export const getPaperPage = createServerFn({ method: "GET" })
  .validator((data: { id: string }) => ({
    id: typeof data?.id === "string" ? data.id.slice(0, 32) : "",
  }))
  .handler(async ({ data }) => {
    quietCache();
    return paperPage(data.id);
  });

export const getThread = createServerFn({ method: "GET" })
  .validator((data: { motif: string }) => ({
    motif: typeof data?.motif === "string" ? data.motif : "",
  }))
  .handler(async ({ data }) => {
    quietCache();
    return threadPapers(data.motif);
  });

export const leavePaper = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    if (typeof data !== "object" || data === null) {
      return { shelf: "", body: "" };
    }
    const shelf = "shelf" in data && typeof data.shelf === "string" ? data.shelf : "";
    const body = "body" in data && typeof data.body === "string" ? data.body : "";
    return { shelf, body };
  })
  .handler(async ({ data }) => {
    quietCache();
    return addPaper(data.shelf, data.body);
  });
