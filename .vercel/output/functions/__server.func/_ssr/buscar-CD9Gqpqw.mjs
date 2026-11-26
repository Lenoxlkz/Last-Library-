import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Route$6 } from "./router-M8lgtIMg.mjs";
import { t as PaperSlip } from "./paper-slip-Cz2Zh9Ud.mjs";
import { t as SearchForm } from "./search-form-CXK1Ajzf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/buscar-CD9Gqpqw.js
var import_jsx_runtime = require_jsx_runtime();
function SearchPage() {
	const { q } = Route$6.useSearch();
	const result = Route$6.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [!q ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "focus-pool max-w-xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchForm, { large: true }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 font-serif text-2xl leading-snug text-ink",
			children: "Escribe algo. Aunque sea torpe. La biblioteca no pide que sepas el título."
		})]
	}) : null, result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaperSlip, {
		paper: result.paper,
		marginal: result.marginal,
		nearby: result.nearby,
		echoed: result.echoed,
		question: result.query,
		kicker: result.direct ? "Encontrado entre los estantes" : "No había un papel con esa forma. Esto estaba cerca, o quizá no"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-12 max-w-xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchForm, { initial: q })
	})] }) : null] });
}
//#endregion
export { SearchPage as component };
