import { C as require_jsx_runtime, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as Route$8 } from "./router-M8lgtIMg.mjs";
import { a as randomSeed } from "./text-C2KgKLTX.mjs";
import { t as SearchForm } from "./search-form-CXK1Ajzf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DAHX45gZ.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const { total, shelves, slips } = Route$8.useLoaderData();
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "focus-pool mx-auto max-w-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-widest text-faint uppercase",
					children: "La sala, bajo la lámpara"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 font-serif text-5xl leading-tight font-medium text-balance text-ink sm:text-6xl",
					children: "La última biblioteca"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 font-serif text-xl leading-relaxed text-pretty text-ink-soft italic",
					children: "Construida por personas que quizá nunca lleguen a conocerse."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-5 text-base leading-relaxed text-pretty text-ink",
					children: [
						"A veces necesitamos leer unas palabras, aunque todavía no sepamos cuáles. No hace falta cuenta ni nombre. Hay ",
						total,
						"\xA0",
						total === 1 ? "papel" : "papeles",
						" en los estantes."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchForm, { large: true }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => void navigate({
							to: "/explorar",
							search: { s: randomSeed() }
						}),
						className: "mt-5 min-h-11 text-left text-sm text-faint underline decoration-rule underline-offset-4 hover:text-ink",
						children: "O entra sin una pregunta"
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-12",
			"aria-labelledby": "estantes-home",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "estantes-home",
				className: "text-xs tracking-widest text-faint uppercase",
				children: "Cinco maneras de entrar"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "shelf-tiles mt-4 grid gap-3",
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
								className: "text-xs tracking-widest text-wax uppercase tabular-nums",
								children: [
									shelf.count,
									" ",
									shelf.count === 1 ? "papel" : "papeles"
								]
							})
						]
					})
				}, shelf.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-14",
			"aria-labelledby": "puzzle-home",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "puzzle-home",
					className: "max-w-xl font-serif text-2xl leading-snug text-balance text-ink",
					children: "Un rompecabezas al que todavía le faltan piezas"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xl text-sm leading-relaxed text-faint",
					children: "Frases, preguntas y restos sueltos. No forman un texto único. Se rozan."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "puzzle",
					children: slips.map((slip, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "piece",
						style: { "--i": index },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/p/$id",
							params: { id: slip.id },
							search: { nuevo: false },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs tracking-widest text-wax uppercase",
								children: slip.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-serif text-lg leading-snug text-ink",
								children: slip.line
							})]
						})
					}, slip.id))
				})
			]
		})
	] });
}
//#endregion
export { Home as component };
