import { C as require_jsx_runtime, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as Route$8, u as Shell } from "./router-D7cGN0Ob.mjs";
import { a as randomSeed } from "./text-C2KgKLTX.mjs";
import { t as SearchForm } from "./search-form-Cs3PL7uD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D_YqLEJ4.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const { total, shelves } = Route$8.useLoaderData();
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs tracking-widest text-faint uppercase",
			children: "Una biblioteca pública"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-4 max-w-xl font-serif text-5xl leading-tight font-medium text-balance text-ink sm:text-6xl",
			children: "La última biblioteca"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 max-w-xl font-serif text-xl leading-relaxed text-pretty text-ink-soft italic",
			children: "Construida por personas que quizá nunca lleguen a conocerse."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-6 max-w-xl text-base leading-relaxed text-pretty text-ink",
			children: [
				"A veces necesitamos leer unas palabras, aunque todavía no sepamos cuáles. No hace falta cuenta ni nombre. Hay ",
				total,
				"\xA0",
				total === 1 ? "papel" : "papeles",
				" en los estantes."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 max-w-xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchForm, { large: true }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => void navigate({
					to: "/explorar",
					search: { s: randomSeed() }
				}),
				className: "mt-5 min-h-11 text-left text-sm text-faint underline decoration-rule underline-offset-4 hover:text-ink",
				children: "O entra sin una pregunta"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-14 border-t border-ink",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "sr-only",
				children: "Estantes"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: shelves.map((shelf) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "border-b border-rule",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/estantes/$shelf",
					params: { shelf: shelf.id },
					className: "flex min-h-16 flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-serif text-2xl text-ink",
						children: shelf.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm leading-relaxed text-faint sm:max-w-xs sm:text-right",
						children: shelf.blurb
					})]
				})
			}, shelf.id)) })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
			className: "mt-14 max-w-xl border-l border-wax pl-4 font-serif text-lg leading-relaxed text-ink-soft italic",
			children: "Hay palabras que alguien dejó aquí sin saber quién las encontraría."
		})
	] });
}
//#endregion
export { Home as component };
