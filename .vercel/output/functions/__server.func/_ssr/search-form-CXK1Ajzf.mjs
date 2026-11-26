import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Z as require_react, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-form-CXK1Ajzf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SearchForm({ initial = "", large = false }) {
	const navigate = useNavigate();
	const [value, setValue] = (0, import_react.useState)(initial);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "flex flex-col gap-3 sm:flex-row sm:items-end",
		onSubmit: (event) => {
			event.preventDefault();
			const q = value.trim();
			if (!q) return;
			navigate({
				to: "/buscar",
				search: { q }
			});
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "block min-w-0 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mb-2 block text-xs tracking-widest text-faint uppercase",
				children: large ? "Escribe lo que traías" : "Otra búsqueda"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value,
				onChange: (event) => setValue(event.target.value),
				maxLength: 280,
				autoComplete: "off",
				placeholder: "Una pregunta, una inquietud, una idea extraña",
				className: "min-h-12 w-full border-b border-rule bg-transparent font-serif text-lg text-ink outline-none placeholder:text-faint focus:border-wax"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "submit",
			className: "min-h-12 bg-ink px-6 text-sm tracking-wide text-paper hover:bg-wax",
			children: "Buscar"
		})]
	});
}
//#endregion
export { SearchForm as t };
