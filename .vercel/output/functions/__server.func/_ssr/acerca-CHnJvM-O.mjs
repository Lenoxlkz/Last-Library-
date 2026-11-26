import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as Shell } from "./router-D7cGN0Ob.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/acerca-CHnJvM-O.js
var import_jsx_runtime = require_jsx_runtime();
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs tracking-widest text-faint uppercase",
			children: "Colofón"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-4 max-w-xl font-serif text-5xl leading-tight font-medium text-balance text-ink",
			children: "Cómo se habita"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 max-w-xl space-y-6 font-serif text-xl leading-relaxed text-pretty text-ink",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Cualquiera puede entrar sin saber qué busca. No hay autores a la vista ni cuentas que abrir. Los estantes guardan preguntas, respuestas, fragmentos, cartas y hallazgos." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "El buscador no devuelve libros. Devuelve papeles: textos breves que parecen encontrados entre otros. A veces uno encaja con lo que preguntaste. A veces solo estaba cerca." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Si dejas algo, pasa a la colección después de unas comprobaciones sencillas: que no lleve datos privados, abuso ni enlaces. Tu nombre no hace falta. Quizá nunca sepas quién lo lee." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Una pregunta puede recibir, con el tiempo, papeles que no fueron escritos para ella. Esa vecindad se muestra al margen, sin fingir que el autor quiso decir más de lo que dijo." })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/dejar",
				search: { shelf: "" },
				className: "text-sm text-wax underline decoration-rule underline-offset-4",
				children: "Dejar un papel"
			})
		})
	] });
}
//#endregion
export { AboutPage as component };
