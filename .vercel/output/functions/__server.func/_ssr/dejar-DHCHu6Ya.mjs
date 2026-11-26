import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as Route$5 } from "./router-M8lgtIMg.mjs";
import { t as LeaveForm } from "./leave-form-CvtJq7d4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dejar-DHCHu6Ya.js
var import_jsx_runtime = require_jsx_runtime();
function LeavePage() {
	const { shelf } = Route$5.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "focus-pool max-w-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-widest text-faint uppercase",
				children: "La mesa vacía"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 font-serif text-5xl leading-tight font-medium text-balance text-ink",
				children: "Un papel en blanco"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 font-serif text-xl leading-relaxed text-pretty text-ink-soft italic",
				children: "Para quien todavía no ha llegado. No hace falta tu nombre, ni explicar por qué lo escribes."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 border-t border-rule pt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeaveForm, {
					initialShelf: shelf || "fragmentos",
					redirect: true
				})
			})
		]
	});
}
//#endregion
export { LeavePage as component };
