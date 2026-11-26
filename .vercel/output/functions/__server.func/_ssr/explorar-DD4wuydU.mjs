import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Z as require_react, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Route$3 } from "./router-M8lgtIMg.mjs";
import { a as randomSeed } from "./text-C2KgKLTX.mjs";
import { t as PaperSlip } from "./paper-slip-Cz2Zh9Ud.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/explorar-DD4wuydU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ExplorePage() {
	const { s } = Route$3.useSearch();
	const paper = Route$3.useLoaderData();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (!s) navigate({
			to: "/explorar",
			search: { s: randomSeed() },
			replace: true
		});
	}, [s, navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: paper ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaperSlip, {
		paper,
		marginal: null,
		nearby: [],
		kicker: "Abierto al azar",
		offerLeave: true
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => void navigate({
			to: "/explorar",
			search: { s: randomSeed() }
		}),
		className: "mt-8 min-h-11 text-sm text-faint underline decoration-rule underline-offset-4 hover:text-ink",
		children: "Abrir otro cajón"
	})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "focus-pool max-w-xl font-serif text-3xl leading-snug text-ink",
		children: "Un cajón cerrado. Un momento."
	}) });
}
//#endregion
export { ExplorePage as component };
