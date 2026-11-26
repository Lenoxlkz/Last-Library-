import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Z as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as shelfMeta, i as motifLabel, o as visibleThreads } from "./types-Cv8bB22i.mjs";
import { o as receivedLabel, s as snippet } from "./text-C2KgKLTX.mjs";
import { t as LeaveForm } from "./leave-form-CvtJq7d4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/paper-slip-Cz2Zh9Ud.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Paragraphs({ body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-6",
		children: body.split(/\n\n+/).map((paragraph, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-serif text-xl leading-relaxed whitespace-pre-wrap text-pretty text-ink",
			children: paragraph
		}, `${paragraph.slice(0, 24)}-${index}`))
	});
}
function PaperSlip({ paper, marginal, nearby, kicker, question, echoed, fresh = false, offerLeave = true }) {
	const shelf = shelfMeta(paper.shelf);
	const threads = visibleThreads(paper.motifs);
	const [openLeave, setOpenLeave] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "focus-pool rise max-w-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-widest text-faint uppercase",
				children: kicker
			}),
			question ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 max-w-xl font-serif text-lg leading-relaxed text-pretty text-faint italic",
				children: [
					"«",
					question,
					"»"
				]
			}) : null,
			echoed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 max-w-xl text-sm leading-relaxed text-faint",
				children: [
					"En preguntas ya estaba escrito:",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/p/$id",
						params: { id: echoed.id },
						search: { nuevo: false },
						className: "text-ink underline decoration-rule underline-offset-4",
						children: snippet(echoed.body, 96)
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mt-8 flex items-baseline justify-between gap-4 border-t border-ink pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-serif text-lg text-ink",
					children: shelf.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs tracking-widest text-faint uppercase tabular-nums",
					children: ["N.º ", paper.id]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-faint",
				children: [receivedLabel(paper.origin, paper.received), paper.origin === "visitante" ? " · sin nombre" : ""]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 max-w-xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paragraphs, { body: paper.body })
			}),
			threads.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-8 max-w-xl text-sm leading-relaxed text-faint",
				children: [
					"Comparte hilo con otros papeles:",
					" ",
					threads.map((motif, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [index > 0 ? " · " : "", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/hilo/$motif",
						params: { motif },
						className: "text-ink underline decoration-rule underline-offset-4",
						children: motifLabel(motif)
					})] }, motif))
				]
			}) : null,
			fresh ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 max-w-xl border-t border-rule pt-6 font-serif text-xl leading-relaxed text-ink",
				role: "status",
				children: "Quedó en el estante. Quien venga después podrá encontrarlo, sin saber que eras tú."
			}) : null,
			marginal ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "mt-12 max-w-xl border-t border-rule pt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-widest text-wax uppercase",
						children: "Al margen"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-faint",
						children: "No forma parte del texto anterior. Está cerca, y comparte una palabra. Nadie decidió que respondiera a lo demás."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-sm text-faint",
						children: [
							shelfMeta(marginal.shelf).name,
							" · N.º ",
							marginal.id
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paragraphs, { body: marginal.body })
					})
				]
			}) : null,
			nearby.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12 max-w-xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs tracking-widest text-faint uppercase",
					children: "En estantes vecinos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 divide-y divide-rule border-y border-rule",
					children: nearby.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/p/$id",
						params: { id: item.id },
						search: { nuevo: false },
						className: "flex min-h-11 flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-serif text-lg leading-snug text-ink",
							children: snippet(item.body)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 text-xs tracking-widest text-faint uppercase",
							children: shelfMeta(item.shelf).name
						})]
					}) }, item.id))
				})]
			}) : null,
			offerLeave && !fresh ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-14 max-w-xl border-t border-ink pt-8",
				children: openLeave ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-2xl leading-snug text-balance text-ink",
					children: "Un papel en blanco, para quien todavía no ha llegado."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeaveForm, {})
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setOpenLeave(true),
					className: "text-left font-serif text-2xl leading-snug text-balance text-ink underline decoration-rule underline-offset-4 hover:decoration-wax",
					children: "Antes de irte, ¿te gustaría dejar algo para quien venga después?"
				})
			}) : null
		]
	});
}
//#endregion
export { PaperSlip as t };
