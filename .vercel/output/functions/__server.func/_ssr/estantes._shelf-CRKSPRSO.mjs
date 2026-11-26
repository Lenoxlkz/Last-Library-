import { a as shelfMeta, n as isShelf } from "./types-Cv8bB22i.mjs";
import { C as require_jsx_runtime, X as notFound, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Route$2, u as Shell } from "./router-D7cGN0Ob.mjs";
import { s as snippet } from "./text-C2KgKLTX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/estantes._shelf-CRKSPRSO.js
var import_jsx_runtime = require_jsx_runtime();
function ShelfPage() {
	const { shelf, papers } = Route$2.useLoaderData();
	if (!isShelf(shelf)) throw notFound();
	const meta = shelfMeta(shelf);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs tracking-widest text-faint uppercase",
			children: "Estante"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-4 font-serif text-5xl leading-tight font-medium text-ink",
			children: meta.name
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 max-w-xl text-base leading-relaxed text-faint",
			children: meta.blurb
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/dejar",
				search: { shelf },
				className: "min-h-11 text-sm text-wax underline decoration-rule underline-offset-4",
				children: "Dejar un papel en este estante"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-8 border-t border-ink",
			children: papers.map((paper) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "border-b border-rule",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/p/$id",
					params: { id: paper.id },
					search: { nuevo: false },
					className: "flex min-h-16 flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-serif text-lg leading-snug text-ink",
						children: snippet(paper.body)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "shrink-0 text-xs tracking-widest text-faint uppercase tabular-nums",
						children: [paper.origin === "visitante" ? "Visitante · " : "", paper.id]
					})]
				})
			}, paper.id))
		})
	] });
}
//#endregion
export { ShelfPage as component };
