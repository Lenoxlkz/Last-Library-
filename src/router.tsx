import { createRouter } from "@tanstack/react-router";
import { LibraryNotFound } from "@/components/library/not-found";
import { AppErrorComponent } from "@/lib/error-component";
import { previewPathRewrite } from "@/lib/preview-path-prefix";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  return createRouter({
    routeTree,
    rewrite: previewPathRewrite(),
    defaultErrorComponent: AppErrorComponent,
    defaultNotFoundComponent: LibraryNotFound,
    scrollRestoration: true,
  });
}
