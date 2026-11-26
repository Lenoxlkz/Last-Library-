import { o as __toESM } from "../_runtime.mjs";
import { a as shelfMeta, i as motifLabel, n as isShelf } from "./types-Cv8bB22i.mjs";
import { C as require_jsx_runtime, S as useRouter, X as notFound, Z as require_react, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/papers.functions-DZaExtNp.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getHomeStats = createServerFn({ method: "GET" }).handler(createSsrRpc("206b51427f1d26db22903df4b50ea3fef73b6e908efc11e7ac702ff1078d3740"));
var searchLibrary = createServerFn({ method: "GET" }).validator((data) => ({ q: typeof data?.q === "string" ? data.q : "" })).handler(createSsrRpc("d7d95cb39d946e604d1404f45a1a372b686632546d9566c29a55d939d4ed8f50"));
var drawLibraryPaper = createServerFn({ method: "GET" }).validator((data) => ({ seed: typeof data?.seed === "string" ? data.seed.slice(0, 40) : "" })).handler(createSsrRpc("a9375e31726514c501f2b98043dda7b6cb1b6565b0711e5c021ba4975cda556d"));
var getShelfPapers = createServerFn({ method: "GET" }).validator((data) => ({ shelf: typeof data?.shelf === "string" ? data.shelf : "" })).handler(createSsrRpc("f2adcb7f283f8386251c388e13f7c19eefc0fb3651283d459b56dad947dcd425"));
var getPaperPage = createServerFn({ method: "GET" }).validator((data) => ({ id: typeof data?.id === "string" ? data.id.slice(0, 32) : "" })).handler(createSsrRpc("68ac000ae5e608a8563e4ec4534be174c670f0d26604f2c37c41e4e318360832"));
var getThread = createServerFn({ method: "GET" }).validator((data) => ({ motif: typeof data?.motif === "string" ? data.motif : "" })).handler(createSsrRpc("3712a134dc0a77a87f711ae5feb090724c45432aaa731f9d48ba2f7ae54454f8"));
var leavePaper = createServerFn({ method: "POST" }).validator((data) => {
	if (typeof data !== "object" || data === null) return {
		shelf: "",
		body: ""
	};
	return {
		shelf: "shelf" in data && typeof data.shelf === "string" ? data.shelf : "",
		body: "body" in data && typeof data.body === "string" ? data.body : ""
	};
}).handler(createSsrRpc("5945d7162c4f508b0ff897dcc1ad27f142a6b821bb6d17fd0d67760a67dc29bf"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-D7cGN0Ob.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var NAV = [
	{
		to: "/",
		label: "Entrada",
		match: (path) => path === "/"
	},
	{
		to: "/estantes",
		label: "Estantes",
		match: (path) => path.startsWith("/estantes")
	},
	{
		to: "/explorar",
		label: "Explorar",
		match: (path) => path.startsWith("/explorar")
	},
	{
		to: "/dejar",
		label: "Dejar algo",
		match: (path) => path.startsWith("/dejar")
	}
];
function Shell({ children }) {
	const path = useRouterState({ select: (state) => state.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b border-rule",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex w-full max-w-3xl flex-col gap-3 px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "font-serif text-lg leading-tight text-ink",
						children: "La última biblioteca"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex flex-wrap gap-x-4 gap-y-1",
						"aria-label": "Secciones",
						children: NAV.map((item) => {
							const active = item.match(path);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.to,
								className: active ? "min-h-11 border-b border-wax py-2 text-sm text-ink" : "min-h-11 py-2 text-sm text-faint",
								children: item.label
							}, item.to);
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto w-full max-w-3xl flex-1 px-5 py-10 sm:px-6 sm:py-14",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-rule",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex w-full max-w-3xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-end sm:justify-between sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-sm font-serif text-base italic leading-relaxed text-ink-soft",
						children: "La biblioteca nunca estuvo terminada. Siempre faltaba alguien por llegar."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/acerca",
						className: "min-h-11 py-2 text-sm text-faint underline decoration-rule underline-offset-4",
						children: "Acerca de este lugar"
					})]
				})
			})
		]
	});
}
function LibraryNotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs tracking-widest text-faint uppercase",
			children: "Estante vacío"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-4 font-serif text-4xl leading-tight text-balance text-ink",
			children: "Este papel no está aquí."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 max-w-xl font-serif text-xl leading-relaxed text-ink-soft",
			children: "Puede que nunca se escribiera, o que el número esté mal copiado."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/explorar",
			search: { s: "" },
			className: "mt-8 inline-flex min-h-11 items-center text-sm text-wax underline decoration-rule underline-offset-4",
			children: "Abrir un cajón al azar"
		})
	] });
}
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-dvh flex-col items-center justify-center gap-4 bg-paper px-6 text-center text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block h-px w-10 bg-wax",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-3xl font-medium text-balance",
				children: "Algo se desordenó"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-faint",
				children: errorMessage(error)
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var styles_default = "/assets/styles-DMbSNKYF.css";
var Route$9 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "La última biblioteca" },
			{
				name: "description",
				content: "Una biblioteca pública de mensajes anónimos. Entra, lee lo que otros dejaron y, si quieres, deja algo para quien venga después."
			},
			{
				name: "theme-color",
				content: "#F3EDE3"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,460;9..144,560&family=Source+Sans+3:ital,wght@0,400;0,600;1,400&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "es",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$8 = () => import("./routes-D_YqLEJ4.mjs");
var Route$8 = createFileRoute("/")({
	loader: () => getHomeStats(),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./acerca-CHnJvM-O.mjs");
var Route$7 = createFileRoute("/acerca")({
	head: () => ({ meta: [{ title: "Acerca · La última biblioteca" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./buscar-ylqKd1fo.mjs");
var Route$6 = createFileRoute("/buscar")({
	validateSearch: (search) => ({ q: typeof search.q === "string" ? search.q.slice(0, 280) : "" }),
	loaderDeps: ({ search }) => ({ q: search.q }),
	loader: ({ deps }) => deps.q ? searchLibrary({ data: { q: deps.q } }) : Promise.resolve(null),
	head: ({ loaderData }) => ({ meta: [{ title: loaderData?.query ? `«${loaderData.query.slice(0, 48)}» · La última biblioteca` : "Buscar · La última biblioteca" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./dejar-p6o0Z4yY.mjs");
var Route$5 = createFileRoute("/dejar")({
	validateSearch: (search) => ({ shelf: typeof search.shelf === "string" && isShelf(search.shelf) ? search.shelf : "" }),
	head: () => ({ meta: [{ title: "Dejar algo · La última biblioteca" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./estantes-Dh6aUySH.mjs");
var Route$4 = createFileRoute("/estantes")({
	loader: () => getHomeStats(),
	head: () => ({ meta: [{ title: "Estantes · La última biblioteca" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./explorar-rDF3PHlN.mjs");
var Route$3 = createFileRoute("/explorar")({
	validateSearch: (search) => ({ s: typeof search.s === "string" ? search.s.slice(0, 40) : "" }),
	loaderDeps: ({ search }) => ({ s: search.s }),
	loader: ({ deps }) => deps.s ? drawLibraryPaper({ data: { seed: deps.s } }) : Promise.resolve(null),
	head: () => ({ meta: [{ title: "Explorar · La última biblioteca" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./estantes._shelf-CRKSPRSO.mjs");
var Route$2 = createFileRoute("/estantes/$shelf")({
	loader: async ({ params }) => {
		if (!isShelf(params.shelf)) throw notFound();
		const result = await getShelfPapers({ data: { shelf: params.shelf } });
		if (!result) throw notFound();
		return result;
	},
	head: ({ params }) => ({ meta: [{ title: isShelf(params.shelf) ? `${shelfMeta(params.shelf).name} · La última biblioteca` : "Estantes · La última biblioteca" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./hilo._motif-D55Ra1xF.mjs");
var Route$1 = createFileRoute("/hilo/$motif")({
	loader: async ({ params }) => {
		const thread = await getThread({ data: { motif: params.motif } });
		if (!thread) throw notFound();
		return thread;
	},
	head: ({ params }) => ({ meta: [{ title: `Hilo: ${motifLabel(params.motif)} · La última biblioteca` }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./p._id-C-F8gCCP.mjs");
var Route = createFileRoute("/p/$id")({
	validateSearch: (search) => ({ nuevo: search.nuevo === true || search.nuevo === "1" || search.nuevo === "true" }),
	loader: async ({ params }) => {
		const page = await getPaperPage({ data: { id: params.id } });
		if (!page) throw notFound();
		return page;
	},
	head: ({ params }) => ({ meta: [{ title: `N.º ${params.id} · La última biblioteca` }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$9
});
var AcercaRoute = Route$7.update({
	id: "/acerca",
	path: "/acerca",
	getParentRoute: () => Route$9
});
var BuscarRoute = Route$6.update({
	id: "/buscar",
	path: "/buscar",
	getParentRoute: () => Route$9
});
var DejarRoute = Route$5.update({
	id: "/dejar",
	path: "/dejar",
	getParentRoute: () => Route$9
});
var EstantesRoute = Route$4.update({
	id: "/estantes",
	path: "/estantes",
	getParentRoute: () => Route$9
});
var ExplorarRoute = Route$3.update({
	id: "/explorar",
	path: "/explorar",
	getParentRoute: () => Route$9
});
var EstantesShelfRoute = Route$2.update({
	id: "/$shelf",
	path: "/$shelf",
	getParentRoute: () => EstantesRoute
});
var HiloMotifRoute = Route$1.update({
	id: "/hilo/$motif",
	path: "/hilo/$motif",
	getParentRoute: () => Route$9
});
var PIdRoute = Route.update({
	id: "/p/$id",
	path: "/p/$id",
	getParentRoute: () => Route$9
});
var EstantesRouteChildren = { EstantesShelfRoute };
var rootRouteChildren = {
	IndexRoute,
	AcercaRoute,
	BuscarRoute,
	DejarRoute,
	EstantesRoute: EstantesRoute._addFileChildren(EstantesRouteChildren),
	ExplorarRoute,
	HiloMotifRoute,
	PIdRoute
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent,
		defaultNotFoundComponent: LibraryNotFound,
		scrollRestoration: true
	});
}
//#endregion
export { Route$3 as a, Route$6 as c, leavePaper as d, Route$2 as i, Route$8 as l, Route as n, Route$4 as o, Route$1 as r, Route$5 as s, router_exports as t, Shell as u };
