import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Route, u as Shell } from "./router-D7cGN0Ob.mjs";
import { t as PaperSlip } from "./paper-slip-CfAlMyUv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/p._id-C-F8gCCP.js
var import_jsx_runtime = require_jsx_runtime();
function PaperPage() {
	const { paper, marginal, nearby } = Route.useLoaderData();
	const { nuevo } = Route.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaperSlip, {
		paper,
		marginal,
		nearby,
		kicker: nuevo ? "Acaba de quedar en el estante" : "Ficha de lectura",
		fresh: nuevo,
		offerLeave: !nuevo
	}) });
}
//#endregion
export { PaperPage as component };
