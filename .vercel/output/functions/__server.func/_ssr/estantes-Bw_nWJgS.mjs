import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as Route$4 } from "./router-M8lgtIMg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/estantes-Bw_nWJgS.js
var import_jsx_runtime = require_jsx_runtime();
function ShelvesPage() {
	const { shelves, total } = Route$4.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "focus-pool max-w-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-widest text-faint uppercase",
				children: "Colecciones"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 font-serif text-5xl leading-tight font-medium text-balance text-ink",
				children: "Los estantes"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 text-base leading-relaxed text-pretty text-ink-soft",
				children: [
					"No son reglas. Son maneras de caminar entre ",
					total,
					"\xA0",
					total === 1 ? "papel" : "papeles",
					". Un mensaje no tiene que ser profundo para tener un lugar."
				]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "shelf-tiles mt-8 grid gap-3",
		children: shelves.map((shelf) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
			className: `shelf-tile shelf-tile-${shelf.id}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/estantes/$shelf",
				params: { shelf: shelf.id },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-serif text-2xl text-ink",
						children: shelf.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm leading-relaxed text-faint",
						children: shelf.blurb
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm text-wax tabular-nums",
						children: [
							shelf.count,
							" ",
							shelf.count === 1 ? "papel" : "papeles"
						]
					})
				]
			})
		}, shelf.id))
	})] });
}
//#endregion
export { ShelvesPage as component };
