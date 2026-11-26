import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as shelfMeta, i as motifLabel } from "./types-Cv8bB22i.mjs";
import { r as Route$1 } from "./router-M8lgtIMg.mjs";
import { s as snippet } from "./text-C2KgKLTX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hilo._motif-luQ8RoZV.js
var import_jsx_runtime = require_jsx_runtime();
function ThreadPage() {
	const { motif, papers } = Route$1.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "focus-pool max-w-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-widest text-faint uppercase",
				children: "Un hilo"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 font-serif text-5xl leading-tight font-medium text-balance text-ink",
				children: motifLabel(motif)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-base leading-relaxed text-pretty text-ink-soft",
				children: "Estos papeles no se escribieron juntos. Comparten una palabra y, a veces, un recuerdo. Con el tiempo dejan de parecer consultas sueltas."
			})
		]
	}), papers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-10 font-serif text-xl text-ink",
		children: "Este hilo todavía espera a alguien."
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "board board-fragmentos",
		children: papers.map((paper, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
			style: { "--i": index },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/p/$id",
				params: { id: paper.id },
				search: { nuevo: false },
				className: "slip",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-serif text-lg leading-snug text-ink",
					children: snippet(paper.body)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs tracking-widest text-faint uppercase",
					children: [
						shelfMeta(paper.shelf).name,
						" · ",
						paper.id
					]
				})]
			})
		}, paper.id))
	})] });
}
//#endregion
export { ThreadPage as component };
