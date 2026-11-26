import { a as shelfMeta, i as motifLabel } from "./types-Cv8bB22i.mjs";
import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as Route$1, u as Shell } from "./router-D7cGN0Ob.mjs";
import { s as snippet } from "./text-C2KgKLTX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hilo._motif-D55Ra1xF.js
var import_jsx_runtime = require_jsx_runtime();
function ThreadPage() {
	const { motif, papers } = Route$1.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs tracking-widest text-faint uppercase",
			children: "Un hilo"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-4 font-serif text-5xl leading-tight font-medium text-balance text-ink",
			children: motifLabel(motif)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 max-w-xl text-base leading-relaxed text-pretty text-ink-soft",
			children: "Estos papeles no se escribieron juntos. Comparten una palabra y, a veces, un recuerdo. Con el tiempo dejan de parecer consultas sueltas."
		}),
		papers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-10 font-serif text-xl text-ink",
			children: "Este hilo todavía espera a alguien."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-10 border-t border-ink",
			children: papers.map((paper) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "border-b border-rule",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/p/$id",
					params: { id: paper.id },
					search: { nuevo: false },
					className: "flex min-h-16 flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-serif text-lg leading-snug text-ink",
						children: snippet(paper.body)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "shrink-0 text-xs tracking-widest text-faint uppercase",
						children: [
							shelfMeta(paper.shelf).name,
							" · ",
							paper.id
						]
					})]
				})
			}, paper.id))
		})
	] });
}
//#endregion
export { ThreadPage as component };
