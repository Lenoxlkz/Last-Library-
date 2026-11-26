import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Z as require_react, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as SHELVES } from "./types-Cv8bB22i.mjs";
import { u as leavePaper } from "./router-M8lgtIMg.mjs";
import { r as moderate } from "./text-C2KgKLTX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/leave-form-CvtJq7d4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SHELF_CHOICE = {
	preguntas: "Una pregunta",
	respuestas: "Una respuesta",
	fragmentos: "Un fragmento",
	cartas: "Una carta",
	hallazgos: "Un hallazgo"
};
function LeaveForm({ initialShelf = "fragmentos", redirect = false }) {
	const navigate = useNavigate();
	const [shelf, setShelf] = (0, import_react.useState)(initialShelf);
	const [body, setBody] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	const [doneId, setDoneId] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setShelf(initialShelf);
	}, [initialShelf]);
	if (doneId && !redirect) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "font-serif text-xl leading-relaxed text-ink",
		role: "status",
		children: [
			"Quedó en el estante. Quien venga después podrá encontrarlo, sin saber que eras tú.",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/p/$id",
				params: { id: doneId },
				search: { nuevo: false },
				className: "text-wax underline decoration-rule underline-offset-4",
				children: "Ver el papel"
			}),
			"."
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "flex flex-col gap-8",
		onSubmit: (event) => {
			event.preventDefault();
			const checked = moderate(shelf, body);
			if (!checked.ok) {
				setMessage(checked.message);
				return;
			}
			setPending(true);
			setMessage("");
			leavePaper({ data: {
				shelf,
				body
			} }).then(async (result) => {
				if (!result.ok) {
					setMessage(result.message);
					return;
				}
				if (redirect) {
					await navigate({
						to: "/p/$id",
						params: { id: result.id },
						search: { nuevo: true }
					});
					return;
				}
				setDoneId(result.id);
				setBody("");
			}).catch(() => {
				setMessage("El papel no pudo entrar. Inténtalo otra vez en un momento.");
			}).finally(() => setPending(false));
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "Tu texto"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: body,
					onChange: (event) => setBody(event.target.value),
					rows: 8,
					maxLength: 1400,
					placeholder: "Una frase, una anécdota, una pregunta, o algo que te habría gustado encontrar.",
					className: "min-h-52 w-full resize-y bg-transparent font-serif text-xl leading-relaxed text-ink outline-none placeholder:text-faint"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
				className: "mb-3 text-xs tracking-widest text-faint uppercase",
				children: "Esto es"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-1 sm:grid-cols-2",
				children: SHELVES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex min-h-11 items-center gap-3 text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "radio",
						name: "shelf",
						value: item.id,
						checked: shelf === item.id,
						onChange: () => setShelf(item.id),
						className: "size-4 accent-wax"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-serif text-lg",
						children: SHELF_CHOICE[item.id]
					})]
				}, item.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-faint tabular-nums",
					"aria-live": "polite",
					children: [body.trim().length, " / 1200"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: pending,
					className: "min-h-12 bg-ink px-6 text-sm tracking-wide text-paper hover:bg-wax disabled:opacity-50",
					children: pending ? "Dejándolo…" : "Dejarlo en la biblioteca"
				})]
			}),
			message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-wax",
				role: "alert",
				children: message
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm leading-relaxed text-faint",
				children: "Sin nombre. Si el texto trae datos privados, insultos o enlaces, el estante lo devuelve."
			})
		]
	});
}
//#endregion
export { LeaveForm as t };
