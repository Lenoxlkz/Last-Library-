import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as Route$5, u as Shell } from "./router-D7cGN0Ob.mjs";
import { t as LeaveForm } from "./leave-form-CvtJq7d4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dejar-p6o0Z4yY.js
var import_jsx_runtime = require_jsx_runtime();
function LeavePage() {
	const { shelf } = Route$5.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs tracking-widest text-faint uppercase",
			children: "Antes de irte"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-4 max-w-xl font-serif text-5xl leading-tight font-medium text-balance text-ink",
			children: "Un papel en blanco"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 max-w-xl font-serif text-xl leading-relaxed text-pretty text-ink-soft italic",
			children: "Para quien todavía no ha llegado. No hace falta tu nombre, ni explicar por qué lo escribes."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 max-w-xl border-t border-ink pt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeaveForm, {
				initialShelf: shelf || "fragmentos",
				redirect: true
			})
		})
	] });
}
//#endregion
export { LeavePage as component };
