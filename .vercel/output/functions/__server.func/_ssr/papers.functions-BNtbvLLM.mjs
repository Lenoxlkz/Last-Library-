import { n as isShelf, r as isThread, t as SHELVES } from "./types-Cv8bB22i.mjs";
import { a as setResponseHeader, i as getRequestHeader, n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { c as tokenize, i as normalize, n as looksLikeQuestion, r as moderate, t as hashString } from "./text-C2KgKLTX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/papers.functions-BNtbvLLM.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var _0002_papers_default = "create table if not exists papers (\n  id text primary key,\n  shelf text not null check (\n    shelf in ('preguntas', 'respuestas', 'fragmentos', 'cartas', 'hallazgos')\n  ),\n  body text not null check (char_length(body) between 12 and 1200),\n  motifs text not null default '',\n  norm text not null,\n  received_at timestamptz not null default now()\n);\n\ncreate unique index if not exists papers_norm_idx on papers (norm);\n";
/**
* Migration bookkeeping shared by the two appliers — `scripts/migrate.mjs`
* (deploy, `readdir`) and `src/lib/db.ts` (PGLite preview, `import.meta.glob`).
*
* Applied files are keyed by BASENAME, so the same file applies once no matter
* which directory it is globbed from. That is what makes the auth schema safe to
* copy from `migrations/auth/` into `migrations/` when an app turns sign-in on:
* a database that already has `0001_auth.sql` will not re-run it.
*
* Neither applier descends into subdirectories, so `migrations/auth/*.sql` is
* out of scope for both until it is copied up.
*/
/**
* The `_migrations` key for a migration path (or bare filename).
* @param {string} path
* @returns {string}
*/
function migrationName(path) {
	return path.split("/").pop() ?? path;
}
/**
* @param {string} path
* @returns {boolean}
*/
function isMigrationFile(path) {
	return path.endsWith(".sql");
}
/**
* Migrations in `paths` that are not yet in `applied`, in apply order.
* Non-`.sql` entries (a `readdir` also yields `migrations/auth/`) are dropped.
* @param {Iterable<string>} paths
* @param {Iterable<string>} applied
* @returns {Array<{ name: string, path: string }>}
*/
function pendingMigrations(paths, applied) {
	const done = new Set(applied);
	return [...paths].filter(isMigrationFile).map((path) => ({
		name: migrationName(path),
		path
	})).sort((a, b) => a.name.localeCompare(b.name)).filter(({ name }) => !done.has(name));
}
var rawDatabaseUrl = typeof process !== "undefined" ? process.env.DATABASE_URL : void 0;
var databaseUrl = rawDatabaseUrl && rawDatabaseUrl.trim() ? rawDatabaseUrl : void 0;
/**
* Active backend: real **Neon** when `DATABASE_URL` is set (deployed / configured
* sandbox), otherwise a local embedded **PGLite** (Postgres compiled to WASM) so
* the app has a working database even with nothing configured — the live preview
* included. Swap in Neon later by just setting `DATABASE_URL`; no code changes.
*/
var dbSource = databaseUrl ? "neon" : "pglite";
/**
* Init state lives on globalThis as promises: dev HMR creates new instances of
* this module, and two instances racing module-level state would open a second
* pool or run two concurrent PGLite migration passes (whose duplicate
* `_migrations` insert rejects — and would get memoized, poisoning every later
* `getSql()`). A failed init clears its slot so the next call retries.
*/
var globalRef = globalThis;
/**
* Result-type parity: Postgres sends every value as text plus a type OID — the
* JS value is the DRIVER's parsing choice, and pg and PGLite disagree (pg:
* int8 -> string, date -> local-midnight Date; PGLite: int8 -> BigInt, which
* JSON.stringify rejects, date -> UTC Date). Normalize both so preview and
* production return identical, JSON-safe shapes:
*   int8/bigint (incl. count(*)) -> number (past 2^53 loses precision — cast
*                                   `::text` if you ever need huge integers)
*   date                         -> 'YYYY-MM-DD' string
*   interval                     -> Postgres interval text
* numeric already comes back as a string on both (arbitrary precision).
*/
var OID_INT8 = 20;
var OID_DATE = 1082;
var OID_INTERVAL = 1186;
var identity = (v) => v;
/** Wrap a query runner in the tagged-template + `.query()` `Sql` surface. */
function toSql(run) {
	const sql = (async (strings, ...values) => {
		let text = strings[0];
		for (let i = 0; i < values.length; i += 1) text += `$${i + 1}${strings[i + 1]}`;
		return run(text, values);
	});
	sql.query = (text, params = []) => run(text, params);
	return sql;
}
function createNeonSql() {
	globalRef.__pgSqlPromise__ ??= (async () => {
		const { Pool, types } = await import("../_libs/pg.mjs").then((n) => n.t);
		types.setTypeParser(OID_INT8, Number);
		types.setTypeParser(OID_DATE, identity);
		types.setTypeParser(OID_INTERVAL, identity);
		const pool = new Pool({ connectionString: databaseUrl });
		return toSql(async (text, params) => {
			return (await pool.query(text, params)).rows;
		});
	})().catch((err) => {
		globalRef.__pgSqlPromise__ = void 0;
		throw err;
	});
	return globalRef.__pgSqlPromise__;
}
async function createPgliteSql() {
	globalRef.__pgliteInstance__ ??= (async () => {
		const { PGlite } = await import("../_libs/electric-sql__pglite.mjs").then((n) => n.t);
		const pg = new PGlite({ parsers: {
			[OID_INT8]: Number,
			[OID_DATE]: identity,
			[OID_INTERVAL]: identity
		} });
		await pg.waitReady;
		await pg.exec("create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())");
		return pg;
	})().catch((err) => {
		globalRef.__pgliteInstance__ = void 0;
		throw err;
	});
	const pg = await globalRef.__pgliteInstance__;
	const migrate = async () => {
		const migrations = /* #__PURE__ */ Object.assign({ "/migrations/0002_papers.sql": _0002_papers_default });
		const done = (await pg.query("select name from _migrations")).rows.map((r) => r.name);
		for (const { name, path } of pendingMigrations(Object.keys(migrations), done)) await pg.transaction(async (tx) => {
			await tx.exec(migrations[path]);
			await tx.query("insert into _migrations (name) values ($1)", [name]);
		});
	};
	const pass = (globalRef.__pgliteMigrateChain__ ?? Promise.resolve()).catch(() => void 0).then(migrate);
	globalRef.__pgliteMigrateChain__ = pass;
	await pass;
	return toSql(async (text, params) => {
		return (await pg.query(text, params)).rows;
	});
}
var sqlPromise = null;
async function createSql() {
	if (typeof window !== "undefined") throw new Error("@/lib/db is server-only — call getSql() from a createServerFn handler or a server route loader, never from client code.");
	return dbSource === "neon" ? createNeonSql() : createPgliteSql();
}
/**
* Get the shared, **server-only** SQL client. Neon when `DATABASE_URL` is set,
* otherwise the local PGLite fallback. Memoized — safe to call per request.
*
* Schema comes from `migrations/*.sql`, auto-applied before the first query on
* both backends — define tables there, never inline in server functions.
*/
function getSql() {
	sqlPromise ??= createSql().catch((err) => {
		sqlPromise = null;
		throw err;
	});
	return sqlPromise;
}
/**
* Finish DB bootstrap before the server handles traffic.
*
* - **PGLite** (preview / no `DATABASE_URL`): open the in-memory DB and apply
*   `migrations/*.sql`. Idempotent — concurrent callers share one promise.
* - **Neon**: no-op (pool is created lazily on first query).
*
* Vite `configureServer` awaits this at dev startup; production imports of this
* module kick it off immediately (see bottom of file).
*/
function ensureDbReady() {
	if (dbSource !== "pglite") return Promise.resolve();
	return getSql().then(() => void 0);
}
var globalBoot = globalThis;
if (typeof window === "undefined" && dbSource === "pglite") globalBoot.__pgBootstrapPromise__ ??= ensureDbReady().catch((err) => {
	globalBoot.__pgBootstrapPromise__ = void 0;
	console.error("[db] PGLite bootstrap failed:", err);
	throw err;
});
var SEED = [
	{
		id: "R-014",
		shelf: "respuestas",
		motifs: [
			"reloj",
			"tarde",
			"vida",
			"dias"
		],
		attends: [
			"llegando tarde a mi propia vida",
			"tarde a mi vida",
			"relojes de los demas"
		],
		received: "fundacion",
		origin: "fundacion",
		body: "Quizá llevas tanto tiempo mirando los relojes de los demás que olvidaste comprobar si el tuyo todavía funciona.\n\nHay personas que llegan temprano a lugares donde nunca quisieron estar. Otras llegan tarde y descubren que nadie las estaba esperando, porque el lugar siempre había sido suyo.\n\nNo tienes que recuperar todos los días que crees haber perdido."
	},
	{
		id: "R-003",
		shelf: "respuestas",
		motifs: [
			"mesa",
			"ventana",
			"lluvia",
			"silla"
		],
		attends: ["no se que necesito", "sentarme junto a la ventana"],
		received: "fundacion",
		origin: "fundacion",
		body: "Hay una mesa junto a la ventana que nadie reclama. Si te sientas ahí, la lluvia se ocupa de la conversación.\n\nNo hace falta explicar por qué llegaste. La silla de enfrente ya estaba vacía antes de que pensaras en ocuparla."
	},
	{
		id: "R-007",
		shelf: "respuestas",
		motifs: ["nombre", "frase"],
		attends: ["el nombre que no dije", "nombre que no dijiste"],
		received: "fundacion",
		origin: "fundacion",
		body: "El nombre que no dijiste sigue ocupando un lugar en la frase. No se borra por omitirlo; solo cambia de habitación.\n\nPuedes dejarlo ahí. Algunas palabras trabajan mejor cuando no se las llama."
	},
	{
		id: "R-011",
		shelf: "respuestas",
		motifs: ["dias", "vida"],
		attends: ["dias perdidos", "recuperar los dias"],
		received: "fundacion",
		origin: "fundacion",
		body: "No tienes que recuperar todos los días que crees haber perdido. Algunos no eran tuyos. Otros siguen en el bolsillo, arrugados, esperando que dejes de contarlos.\n\nUn día que no se nombra también cuenta. A veces cuenta más."
	},
	{
		id: "R-018",
		shelf: "respuestas",
		motifs: ["casa", "cajon"],
		attends: ["la casa se siente pequena", "no encuentro nada"],
		received: "fundacion",
		origin: "fundacion",
		body: "Si la casa se siente pequeña, abre un cajón. No para ordenarlo: para comprobar que todavía hay cosas que no recuerdas haber guardado.\n\nLo que buscas puede estar ahí, con otro nombre."
	},
	{
		id: "R-021",
		shelf: "respuestas",
		motifs: [
			"reloj",
			"tarde",
			"lugar",
			"temprano"
		],
		attends: [
			"llegar temprano",
			"perder el tiempo",
			"lugar donde nunca quise estar"
		],
		received: "fundacion",
		origin: "fundacion",
		body: "Llegar temprano a un lugar donde nunca quisiste estar también es una forma de perder el tiempo. Puedes irte sin pedir disculpas al reloj.\n\nNadie te debe la tarde que no elegiste. Tampoco tú se la debes a nadie."
	},
	{
		id: "R-025",
		shelf: "respuestas",
		motifs: [
			"noticia",
			"tarde",
			"dias"
		],
		attends: ["buena noticia", "noticia que llego tarde"],
		received: "fundacion",
		origin: "fundacion",
		body: "Cuando una buena noticia llega tarde, no se convierte en una mala. Se convierte en otra clase de objeto: algo que ya no cambia el día, pero todavía puede cambiar la manera de contarlo.\n\nGuárdala donde guardes lo que no pide respuesta."
	},
	{
		id: "P-002",
		shelf: "preguntas",
		motifs: [
			"tarde",
			"vida",
			"reloj"
		],
		attends: [],
		received: "fundacion",
		origin: "fundacion",
		body: "¿Qué hago cuando siento que estoy llegando tarde a mi propia vida?"
	},
	{
		id: "P-006",
		shelf: "preguntas",
		motifs: ["carta", "nombre"],
		attends: [],
		received: "fundacion",
		origin: "fundacion",
		body: "¿A quién se le escribe cuando la persona todavía no existe?"
	},
	{
		id: "P-009",
		shelf: "preguntas",
		motifs: ["llave", "puerta"],
		attends: [],
		received: "fundacion",
		origin: "fundacion",
		body: "¿Por qué guardo una llave que no abre ninguna puerta?"
	},
	{
		id: "P-012",
		shelf: "preguntas",
		motifs: ["cuarto"],
		attends: [],
		received: "fundacion",
		origin: "fundacion",
		body: "¿Es posible extrañar un cuarto en el que nunca se durmió?"
	},
	{
		id: "P-015",
		shelf: "preguntas",
		motifs: ["noticia", "tarde"],
		attends: [],
		received: "fundacion",
		origin: "fundacion",
		body: "¿Qué se hace con una buena noticia que llegó demasiado tarde?"
	},
	{
		id: "P-018",
		shelf: "preguntas",
		motifs: ["tren"],
		attends: [],
		received: "fundacion",
		origin: "fundacion",
		body: "¿Y si el tren de las seis era una metáfora y yo igual corrí?"
	},
	{
		id: "P-021",
		shelf: "preguntas",
		motifs: ["silencio"],
		attends: [],
		received: "fundacion",
		origin: "fundacion",
		body: "¿Se puede devolver un silencio?"
	},
	{
		id: "F-004",
		shelf: "fragmentos",
		motifs: ["luz", "casa"],
		attends: [],
		received: "fundacion",
		origin: "fundacion",
		body: "Alguien dejó la luz encendida en el pasillo. No era una invitación. Tampoco un descuido. Era la manera de decir que la casa seguía teniendo horario."
	},
	{
		id: "F-008",
		shelf: "fragmentos",
		motifs: [
			"papel",
			"lluvia",
			"tinta"
		],
		attends: [],
		received: "fundacion",
		origin: "fundacion",
		body: "El papel estaba húmedo. La tinta no se había corrido, lo cual resultaba sospechoso, como si la lluvia hubiera tenido cuidado."
	},
	{
		id: "F-011",
		shelf: "fragmentos",
		motifs: ["volver"],
		attends: [],
		received: "fundacion",
		origin: "fundacion",
		body: "En el margen de un cuaderno: «volver». Sin fecha. Sin dirección. La palabra había sido subrayada dos veces, por dos manos distintas."
	},
	{
		id: "F-016",
		shelf: "fragmentos",
		motifs: [
			"silla",
			"abrigo",
			"noche"
		],
		attends: [],
		received: "fundacion",
		origin: "fundacion",
		body: "La silla de enfrente tenía el abrigo de otra persona. Esperé hasta que se hizo de noche y el abrigo siguió sin dueño. Me fui con la sensación de haber interrumpido una cita entre objetos."
	},
	{
		id: "F-019",
		shelf: "fragmentos",
		motifs: [
			"ventana",
			"luz",
			"edificio"
		],
		attends: [],
		received: "fundacion",
		origin: "fundacion",
		body: "Conté las ventanas del edificio de enfrente. En la cuarta había una planta que alguien giraba cada día hacia una luz que yo no veía."
	},
	{
		id: "F-023",
		shelf: "fragmentos",
		motifs: [
			"frase",
			"dias",
			"libro"
		],
		attends: ["recuperar los dias"],
		received: "fundacion",
		origin: "fundacion",
		body: "Una frase suelta, encontrada dentro de un libro que no era mío: no tienes que recuperar todos los días. El libro se llamaba de otra manera."
	},
	{
		id: "F-027",
		shelf: "fragmentos",
		motifs: [
			"mesa",
			"ventana",
			"llave",
			"sobre"
		],
		attends: [],
		received: "fundacion",
		origin: "fundacion",
		body: "Había un sobre sin dirección encima de la mesa junto a la ventana. Lo levanté. Pesaba como si dentro hubiera una llave, pero al abrirlo solo encontré la frase: «todavía no»."
	},
	{
		id: "F-030",
		shelf: "fragmentos",
		motifs: [
			"cuarto",
			"reloj",
			"cocina"
		],
		attends: ["extranar un cuarto", "cuarto en el que nunca"],
		received: "fundacion",
		origin: "fundacion",
		body: "Me dijeron que el cuarto estaba alquilado. Entré igual. La cama no se había usado, pero el reloj de la cocina —¿por qué había un reloj de cocina en un cuarto?— marcaba una hora amable."
	},
	{
		id: "C-001",
		shelf: "cartas",
		motifs: [
			"silla",
			"nombre",
			"llegar"
		],
		attends: ["a quien se le escribe", "persona que todavia no existe"],
		received: "fundacion",
		origin: "fundacion",
		body: "Para quien abra esto sin saber su nombre:\n\nNo te conozco y, aun así, te dejé la silla libre. Si llegas cansado, no expliques el camino. Aquí el té se enfría a la velocidad correcta.\n\nAlguien que también llegó sin avisar."
	},
	{
		id: "C-005",
		shelf: "cartas",
		motifs: ["tren", "anden"],
		attends: ["tren de las seis"],
		received: "fundacion",
		origin: "fundacion",
		body: "Querida persona del andén:\n\nEl tren de las seis no te esperó, pero yo sí estuve un minuto de más. No para encontrarte. Para comprobar que el andén seguía siendo un lugar y no solo una prisa.\n\nSi lees esto en otro año, el minuto sigue ahí."
	},
	{
		id: "C-009",
		shelf: "cartas",
		motifs: [
			"llave",
			"puerta",
			"pregunta"
		],
		attends: ["llave que no abre", "llave ninguna puerta"],
		received: "fundacion",
		origin: "fundacion",
		body: "A la que guarda llaves:\n\nLa llave que no abre ninguna puerta abre, en cambio, la pregunta. No la tires. No todas las cosas tienen que servir para entrar."
	},
	{
		id: "C-014",
		shelf: "cartas",
		motifs: [
			"tarde",
			"vida",
			"reloj",
			"cocina"
		],
		attends: ["tarde a mi vida", "reloj de la cocina"],
		received: "fundacion",
		origin: "fundacion",
		body: "Para ti, que lees tarde:\n\nNo llegaste tarde a tu vida. Llegaste tarde a la versión que otros habían cronometrado. El reloj de la cocina sigue atrasado a propósito. Nadie lo adelanta porque así la mañana dura un poco más."
	},
	{
		id: "C-017",
		shelf: "cartas",
		motifs: ["llegar", "biblioteca"],
		attends: ["quien todavia no ha llegado"],
		received: "fundacion",
		origin: "fundacion",
		body: "A quien todavía no ha llegado:\n\nTe dejé esto entre dos páginas, no al final. Los finales asustan a la gente que solo venía a mirar. Quédate el rato que puedas. La biblioteca no cierra: solo finge que tiene horario."
	},
	{
		id: "C-021",
		shelf: "cartas",
		motifs: ["tren", "anden"],
		attends: ["correr detras del tren", "tren de las seis"],
		received: "fundacion",
		origin: "fundacion",
		body: "Para el que corre detrás del tren:\n\nEl tren de las seis ya sabe irse sin ti. Eso no es un juicio. Es su trabajo. El tuyo, si quieres uno, puede ser quedarte en el andén hasta que la prisa se baje sola."
	},
	{
		id: "H-003",
		shelf: "hallazgos",
		motifs: [
			"lluvia",
			"paraguas",
			"duda"
		],
		attends: [],
		received: "fundacion",
		origin: "fundacion",
		body: "Instrucciones encontradas en un paraguas:\n\n1. Abrir solo si la lluvia es de las que escuchan.\n2. No preguntar de quién es.\n3. Al terminar, dejarlo donde alguien más vaya a dudar."
	},
	{
		id: "H-007",
		shelf: "hallazgos",
		motifs: [
			"llave",
			"puerta",
			"nombre",
			"mapa"
		],
		attends: ["llave que no abre"],
		received: "fundacion",
		origin: "fundacion",
		body: "Catálogo de objetos que no cupieron en ninguna mudanza:\n\n— un mapa de una ciudad con una calle tachada\n— el recibo de un café tomado de pie\n— una llave que no abre ninguna puerta\n— el nombre que no dijiste, doblado en cuatro"
	},
	{
		id: "H-011",
		shelf: "hallazgos",
		motifs: [
			"reloj",
			"cocina",
			"duda"
		],
		attends: ["reloj de la cocina"],
		received: "fundacion",
		origin: "fundacion",
		body: "Se busca: persona que haya visto el reloj de la cocina marcar la misma hora dos veces. No se ofrece recompensa. Se ofrece la duda."
	},
	{
		id: "H-015",
		shelf: "hallazgos",
		motifs: ["frase", "estante"],
		attends: [],
		received: "fundacion",
		origin: "fundacion",
		body: "Nota de servicio, estante 4:\n\nSi encuentra una frase que parece escrita para usted, no firme al pie. La autoría aquí es un malentendido útil."
	},
	{
		id: "H-020",
		shelf: "hallazgos",
		motifs: [
			"biblioteca",
			"silencio",
			"palabra"
		],
		attends: ["devolver un silencio"],
		received: "fundacion",
		origin: "fundacion",
		body: "Hoy la biblioteca prestó un silencio. Fecha de devolución: cuando alguien lo necesite más. Recargo: ninguna palabra de más."
	},
	{
		id: "H-024",
		shelf: "hallazgos",
		motifs: [
			"estante",
			"papel",
			"orden"
		],
		attends: [],
		received: "fundacion",
		origin: "fundacion",
		body: "Clasificación provisional:\n\nEste papel no sabe en qué estante está. Se lo dejamos aquí, entre los hallazgos, porque insistir habría sido mentir con más orden."
	}
];
var SEED_NORMS = new Set(SEED.map((paper) => normalize(paper.body)));
function motifHit(motifs, tokens) {
	let hits = 0;
	for (const motif of motifs) if (tokens.some((token) => token === motif || token.startsWith(motif) && token.length <= motif.length + 3 || motif.startsWith(token) && token.length >= 4)) hits += 1;
	return hits;
}
function scorePaper(paper, tokens, rawQuery) {
	if (tokens.length === 0) return 0;
	const bodyTokens = tokenize(paper.body);
	const bodySet = new Set(bodyTokens);
	let overlap = 0;
	let soft = 0;
	for (const token of tokens) {
		if (bodySet.has(token)) {
			overlap += 1;
			continue;
		}
		if (bodyTokens.some((word) => {
			return Math.min(word.length, token.length) >= 4 && (word.startsWith(token) || token.startsWith(word));
		})) soft += 1;
	}
	const motifs = motifHit(paper.motifs, tokens);
	let attend = 0;
	const queryNorm = rawQuery.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
	for (const phrase of paper.attends) {
		const shared = tokenize(phrase).filter((token) => tokens.includes(token)).length;
		if (shared >= 2) attend += shared * 2;
		const bare = phrase.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
		if (bare.length > 10 && queryNorm.includes(bare)) attend += 10;
	}
	let bias = 0;
	if (looksLikeQuestion(rawQuery)) {
		if (paper.shelf === "respuestas") bias += 3;
		if (paper.shelf === "preguntas") bias -= 2;
	}
	return overlap * 3 + soft * 2 + motifs * 4 + attend + bias;
}
function sharedMotifs(a, b) {
	return a.motifs.filter((motif) => b.motifs.includes(motif)).length;
}
function pickMarginal(papers, main, skip = []) {
	const skipped = /* @__PURE__ */ new Set([main.id, ...skip]);
	let best = null;
	for (const paper of papers) {
		if (skipped.has(paper.id)) continue;
		const shared = sharedMotifs(paper, main);
		if (shared === 0) continue;
		let score = shared * 10;
		if (paper.shelf !== main.shelf) score += 5;
		if (paper.shelf === "fragmentos" || paper.shelf === "cartas") score += 3;
		if (paper.origin === "visitante") score += 8;
		if (!best || score > best.score) best = {
			paper,
			score
		};
	}
	return best?.paper ?? null;
}
function searchPapers(papers, rawQuery) {
	const query = rawQuery.trim().slice(0, 280);
	if (!query) return null;
	const tokens = tokenize(query);
	const ranked = papers.map((paper) => ({
		paper,
		score: scorePaper(paper, tokens, query)
	})).sort((a, b) => b.score - a.score || a.paper.id.localeCompare(b.paper.id));
	let winner = ranked[0];
	if (winner && looksLikeQuestion(query)) {
		const answer = ranked.find((row) => row.paper.shelf === "respuestas" && row.score >= 8);
		if (answer && answer.score >= winner.score - 6) winner = answer;
	}
	const direct = (winner?.score ?? 0) >= 8 && tokens.length > 0;
	let paper;
	if (direct && winner) paper = winner.paper;
	else {
		const pool = papers.filter((item) => item.shelf === "hallazgos");
		const source = pool.length > 0 ? pool : papers;
		paper = source[hashString(query) % source.length];
	}
	const echoedCandidate = direct ? ranked.find((row) => row.paper.shelf === "preguntas" && row.paper.id !== paper.id && row.score >= 8)?.paper ?? null : null;
	const echoed = echoedCandidate && normalize(echoedCandidate.body) !== normalize(query) ? echoedCandidate : null;
	const marginal = direct ? pickMarginal(papers, paper, echoed ? [echoed.id] : []) : null;
	const used = new Set([
		paper.id,
		marginal?.id,
		echoed?.id
	].filter(Boolean));
	const nearby = direct ? ranked.filter((row) => row.score > 0 && !used.has(row.paper.id)).slice(0, 2).map((row) => row.paper) : [];
	return {
		query,
		paper,
		marginal,
		nearby,
		echoed,
		direct
	};
}
function drawPaper(papers, seed) {
	return papers[hashString(seed) % papers.length];
}
function papersOnShelf(papers, shelf) {
	return papers.filter((paper) => paper.shelf === shelf).sort((a, b) => {
		if (a.origin !== b.origin) return a.origin === "visitante" ? -1 : 1;
		return a.id.localeCompare(b.id);
	});
}
function papersOnThread(papers, motif) {
	return papers.filter((paper) => paper.motifs.includes(motif)).sort((a, b) => a.id.localeCompare(b.id));
}
var recentHits = /* @__PURE__ */ new Map();
function clientKey() {
	return getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}
function withinRate(key) {
	const now = Date.now();
	const hits = (recentHits.get(key) ?? []).filter((stamp) => now - stamp < 6e4);
	if (hits.length >= 8) return false;
	const last = hits[hits.length - 1];
	if (last && now - last < 2e3) return false;
	hits.push(now);
	recentHits.set(key, hits);
	return true;
}
function fromRow(row) {
	if (!isShelf(row.shelf)) return null;
	return {
		id: row.id,
		shelf: row.shelf,
		body: row.body,
		motifs: row.motifs.split(",").filter(Boolean),
		attends: [],
		received: row.received,
		origin: "visitante"
	};
}
async function loadPapers() {
	const visitors = (await (await getSql())`
    select id, shelf, body, motifs, to_char(received_at at time zone 'UTC', 'YYYY-MM-DD') as received
    from papers
    order by received_at asc
  `).map(fromRow).filter((paper) => paper !== null);
	return [...SEED, ...visitors];
}
function newId(shelf, taken) {
	const prefix = {
		preguntas: "P",
		respuestas: "R",
		fragmentos: "F",
		cartas: "C",
		hallazgos: "H"
	}[shelf];
	const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	for (let attempt = 0; attempt < 8; attempt++) {
		const bytes = /* @__PURE__ */ new Uint8Array(4);
		crypto.getRandomValues(bytes);
		const id = `${prefix}-${Array.from(bytes, (byte) => alphabet[byte % 32]).join("")}`;
		if (!taken.has(id)) return id;
	}
	return `${prefix}-${Date.now().toString(36).toUpperCase()}`;
}
async function homeStats() {
	const papers = await loadPapers();
	return {
		total: papers.length,
		shelves: SHELVES.map((shelf) => ({
			...shelf,
			count: papers.filter((paper) => paper.shelf === shelf.id).length
		}))
	};
}
async function findPapers(query) {
	return searchPapers(await loadPapers(), query);
}
async function openDrawer(seed) {
	return drawPaper(await loadPapers(), seed);
}
async function shelfPapers(shelf) {
	if (!isShelf(shelf)) return null;
	return {
		shelf,
		papers: papersOnShelf(await loadPapers(), shelf)
	};
}
async function paperPage(id) {
	const papers = await loadPapers();
	const paper = papers.find((item) => item.id === id);
	if (!paper) return null;
	const marginal = pickMarginal(papers, paper);
	return {
		paper,
		marginal,
		nearby: papers.filter((item) => item.id !== paper.id && item.id !== marginal?.id).map((item) => ({
			item,
			shared: item.motifs.filter((motif) => paper.motifs.includes(motif)).length
		})).filter((row) => row.shared > 0).sort((a, b) => b.shared - a.shared || a.item.id.localeCompare(b.item.id)).slice(0, 2).map((row) => row.item)
	};
}
async function threadPapers(motif) {
	if (!/^[a-z]{3,24}$/.test(motif)) return null;
	const matches = papersOnThread(await loadPapers(), motif);
	if (!isThread(motif) && matches.length === 0) return null;
	return {
		motif,
		papers: matches
	};
}
async function addPaper(shelf, body) {
	if (!withinRate(clientKey())) return {
		ok: false,
		message: "Acabas de dejar un papel. Espera un momento antes del siguiente."
	};
	const checked = moderate(shelf, body);
	if (!checked.ok) return checked;
	if (SEED_NORMS.has(checked.norm)) return {
		ok: false,
		message: "Esas palabras ya estaban aquí."
	};
	const sql = await getSql();
	if ((await sql`select id from papers where norm = ${checked.norm} limit 1`).length > 0) return {
		ok: false,
		message: "Esas palabras ya estaban aquí."
	};
	const papers = await loadPapers();
	const id = newId(checked.shelf, new Set(papers.map((paper) => paper.id)));
	try {
		await sql`
      insert into papers (id, shelf, body, motifs, norm)
      values (${id}, ${checked.shelf}, ${checked.body}, ${checked.motifs.join(",")}, ${checked.norm})
    `;
	} catch (error) {
		const message = error instanceof Error ? error.message.toLowerCase() : "";
		if (message.includes("unique") || message.includes("duplicate") || message.includes("23505")) return {
			ok: false,
			message: "Esas palabras ya estaban aquí."
		};
		if (message.includes("check")) return {
			ok: false,
			message: "Este papel no cabe en el estante."
		};
		throw error;
	}
	return {
		ok: true,
		id
	};
}
function quietCache() {
	setResponseHeader("Cache-Control", "no-store");
}
var getHomeStats_createServerFn_handler = createServerRpc({
	id: "206b51427f1d26db22903df4b50ea3fef73b6e908efc11e7ac702ff1078d3740",
	name: "getHomeStats",
	filename: "src/lib/library/papers.functions.ts"
}, (opts) => getHomeStats.__executeServer(opts));
var getHomeStats = createServerFn({ method: "GET" }).handler(getHomeStats_createServerFn_handler, async () => {
	quietCache();
	return homeStats();
});
var searchLibrary_createServerFn_handler = createServerRpc({
	id: "d7d95cb39d946e604d1404f45a1a372b686632546d9566c29a55d939d4ed8f50",
	name: "searchLibrary",
	filename: "src/lib/library/papers.functions.ts"
}, (opts) => searchLibrary.__executeServer(opts));
var searchLibrary = createServerFn({ method: "GET" }).validator((data) => ({ q: typeof data?.q === "string" ? data.q : "" })).handler(searchLibrary_createServerFn_handler, async ({ data }) => {
	quietCache();
	return findPapers(data.q);
});
var drawLibraryPaper_createServerFn_handler = createServerRpc({
	id: "a9375e31726514c501f2b98043dda7b6cb1b6565b0711e5c021ba4975cda556d",
	name: "drawLibraryPaper",
	filename: "src/lib/library/papers.functions.ts"
}, (opts) => drawLibraryPaper.__executeServer(opts));
var drawLibraryPaper = createServerFn({ method: "GET" }).validator((data) => ({ seed: typeof data?.seed === "string" ? data.seed.slice(0, 40) : "" })).handler(drawLibraryPaper_createServerFn_handler, async ({ data }) => {
	quietCache();
	if (!data.seed) return null;
	return openDrawer(data.seed);
});
var getShelfPapers_createServerFn_handler = createServerRpc({
	id: "f2adcb7f283f8386251c388e13f7c19eefc0fb3651283d459b56dad947dcd425",
	name: "getShelfPapers",
	filename: "src/lib/library/papers.functions.ts"
}, (opts) => getShelfPapers.__executeServer(opts));
var getShelfPapers = createServerFn({ method: "GET" }).validator((data) => ({ shelf: typeof data?.shelf === "string" ? data.shelf : "" })).handler(getShelfPapers_createServerFn_handler, async ({ data }) => {
	quietCache();
	return shelfPapers(data.shelf);
});
var getPaperPage_createServerFn_handler = createServerRpc({
	id: "68ac000ae5e608a8563e4ec4534be174c670f0d26604f2c37c41e4e318360832",
	name: "getPaperPage",
	filename: "src/lib/library/papers.functions.ts"
}, (opts) => getPaperPage.__executeServer(opts));
var getPaperPage = createServerFn({ method: "GET" }).validator((data) => ({ id: typeof data?.id === "string" ? data.id.slice(0, 32) : "" })).handler(getPaperPage_createServerFn_handler, async ({ data }) => {
	quietCache();
	return paperPage(data.id);
});
var getThread_createServerFn_handler = createServerRpc({
	id: "3712a134dc0a77a87f711ae5feb090724c45432aaa731f9d48ba2f7ae54454f8",
	name: "getThread",
	filename: "src/lib/library/papers.functions.ts"
}, (opts) => getThread.__executeServer(opts));
var getThread = createServerFn({ method: "GET" }).validator((data) => ({ motif: typeof data?.motif === "string" ? data.motif : "" })).handler(getThread_createServerFn_handler, async ({ data }) => {
	quietCache();
	return threadPapers(data.motif);
});
var leavePaper_createServerFn_handler = createServerRpc({
	id: "5945d7162c4f508b0ff897dcc1ad27f142a6b821bb6d17fd0d67760a67dc29bf",
	name: "leavePaper",
	filename: "src/lib/library/papers.functions.ts"
}, (opts) => leavePaper.__executeServer(opts));
var leavePaper = createServerFn({ method: "POST" }).validator((data) => {
	if (typeof data !== "object" || data === null) return {
		shelf: "",
		body: ""
	};
	return {
		shelf: "shelf" in data && typeof data.shelf === "string" ? data.shelf : "",
		body: "body" in data && typeof data.body === "string" ? data.body : ""
	};
}).handler(leavePaper_createServerFn_handler, async ({ data }) => {
	quietCache();
	return addPaper(data.shelf, data.body);
});
//#endregion
export { drawLibraryPaper_createServerFn_handler, getHomeStats_createServerFn_handler, getPaperPage_createServerFn_handler, getShelfPapers_createServerFn_handler, getThread_createServerFn_handler, leavePaper_createServerFn_handler, searchLibrary_createServerFn_handler };
