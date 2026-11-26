import { n as isShelf } from "./types-Cv8bB22i.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/text-C2KgKLTX.js
var STOP = /* @__PURE__ */ new Set([
	"el",
	"la",
	"los",
	"las",
	"un",
	"una",
	"unos",
	"unas",
	"de",
	"del",
	"al",
	"y",
	"o",
	"u",
	"que",
	"en",
	"con",
	"por",
	"para",
	"su",
	"sus",
	"mi",
	"mis",
	"tu",
	"tus",
	"se",
	"es",
	"son",
	"ser",
	"como",
	"mas",
	"pero",
	"si",
	"no",
	"ya",
	"lo",
	"le",
	"les",
	"me",
	"te",
	"nos",
	"esto",
	"este",
	"esta",
	"ese",
	"esa",
	"eso",
	"hay",
	"fue",
	"era",
	"muy",
	"tan",
	"cuando",
	"donde",
	"quien",
	"porque",
	"sobre",
	"entre",
	"sin",
	"hasta",
	"desde",
	"tambien",
	"hacia",
	"ni",
	"bien",
	"cada",
	"todo",
	"toda",
	"todos",
	"todas",
	"algo",
	"alguien",
	"nada",
	"nadie",
	"aqui",
	"alli",
	"asi",
	"hago",
	"estoy",
	"esta",
	"estan",
	"esa",
	"eso",
	"the",
	"and",
	"que",
	"qué",
	"como",
	"cómo",
	"para",
	"por",
	"una",
	"uno",
	"sus",
	"del",
	"las",
	"los",
	"con",
	"sin",
	"mas",
	"más",
	"puede",
	"pueden",
	"puedo",
	"tiene",
	"tienen",
	"hacer",
	"hace",
	"sido",
	"esta",
	"están",
	"solo",
	"sola",
	"sólo"
]);
var BANNED = /* @__PURE__ */ new Set([
	"nazi",
	"hitler",
	"maricón",
	"maricon",
	"marica",
	"nigger",
	"nigga",
	"faggot",
	"retrasado",
	"subnormal"
]);
function normalize(value) {
	return value.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "").replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();
}
function tokenize(value) {
	return normalize(value).split(" ").filter((word) => word.length > 2 && !STOP.has(word));
}
function cleanBody(input) {
	return input.replace(/\r\n/g, "\n").split("\n").map((line) => line.replace(/[ \t]+$/g, "").replace(/[ \t]{2,}/g, " ")).join("\n").replace(/\n{3,}/g, "\n\n").trim();
}
function snippet(body, max = 148) {
	const line = (body.split("\n").find((part) => part.trim()) ?? body).trim();
	if (line.length <= max) return line;
	return `${line.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}
function receivedLabel(origin, received) {
	if (origin === "fundacion") return "Dejado en la fundación";
	const [year, month, day] = received.split("-");
	const months = [
		"enero",
		"febrero",
		"marzo",
		"abril",
		"mayo",
		"junio",
		"julio",
		"agosto",
		"septiembre",
		"octubre",
		"noviembre",
		"diciembre"
	];
	const index = Number(month) - 1;
	if (!year || !day || index < 0 || index > 11) return "Dejado por un visitante";
	return `Dejado el ${Number(day)} de ${months[index]} de ${year}`;
}
function randomSeed() {
	const alphabet = "abcdefghjkmnpqrstuvwxyz23456789";
	const bytes = /* @__PURE__ */ new Uint8Array(8);
	crypto.getRandomValues(bytes);
	return Array.from(bytes, (byte) => alphabet[byte % 31]).join("");
}
function hashString(value) {
	let hash = 2166136261;
	for (let i = 0; i < value.length; i++) {
		hash ^= value.charCodeAt(i);
		hash = Math.imul(hash, 16777619);
	}
	return hash >>> 0;
}
var LEXICON = [
	"reloj",
	"tarde",
	"vida",
	"dias",
	"mesa",
	"ventana",
	"lluvia",
	"silla",
	"nombre",
	"frase",
	"casa",
	"cajon",
	"lugar",
	"temprano",
	"llave",
	"puerta",
	"carta",
	"cuarto",
	"noticia",
	"tren",
	"luz",
	"papel",
	"tinta",
	"volver",
	"abrigo",
	"noche",
	"edificio",
	"libro",
	"llegar",
	"anden",
	"pregunta",
	"biblioteca",
	"paraguas",
	"duda",
	"mapa",
	"estante",
	"silencio",
	"palabra",
	"orden",
	"cocina",
	"sobre"
];
function hasMotif(tokens, motif) {
	return tokens.some((token) => token === motif || token.startsWith(motif) && token.length <= motif.length + 3 || motif.startsWith(token) && token.length >= 4 && motif.length <= token.length + 3);
}
function extractMotifs(body) {
	const tokens = tokenize(body);
	return LEXICON.filter((motif) => hasMotif(tokens, motif)).slice(0, 6);
}
function moderate(rawShelf, rawBody) {
	if (!isShelf(rawShelf)) return {
		ok: false,
		message: "Elige un estante antes de dejar el papel."
	};
	const body = cleanBody(rawBody);
	if (body.length < 12 || tokenize(body).length < 2) return {
		ok: false,
		message: "Todavía es poco papel. Escribe al menos una frase."
	};
	if (body.length > 1200) return {
		ok: false,
		message: "Este estante guarda textos breves. Quédate por debajo de mil doscientos caracteres."
	};
	if (/https?:\/\/|www\./i.test(body)) return {
		ok: false,
		message: "Los enlaces no entran en la biblioteca."
	};
	if (/[^\s@]+@[^\s@]+\.[^\s@]+/.test(body)) return {
		ok: false,
		message: "No dejes direcciones ni datos que puedan identificar a alguien."
	};
	if (/(?:\d[\s.-]*){8,}/.test(body)) return {
		ok: false,
		message: "No dejes teléfonos, documentos ni números largos."
	};
	if (/<[^>]+>/.test(body)) return {
		ok: false,
		message: "Deja solo palabras. El estante no acepta código."
	};
	if (/(.)\1{7,}/u.test(body)) return {
		ok: false,
		message: "Eso no parece un mensaje. Prueba con una frase."
	};
	const letters = body.replace(/[^\p{L}]/gu, "");
	const upper = letters.replace(/[^\p{Lu}]/gu, "");
	if (letters.length > 60 && upper.length / letters.length > .8) return {
		ok: false,
		message: "Puedes bajar la voz. El estante se lee en voz baja."
	};
	const tokens = new Set(normalize(body).split(" "));
	for (const word of tokens) if (BANNED.has(word)) return {
		ok: false,
		message: "Eso no puede quedarse en el estante."
	};
	return {
		ok: true,
		body,
		shelf: rawShelf,
		motifs: extractMotifs(body),
		norm: normalize(body)
	};
}
function looksLikeQuestion(query) {
	if (/[?¿]/.test(query)) return true;
	const start = normalize(query).split(" ")[0] ?? "";
	return [
		"que",
		"como",
		"cuando",
		"donde",
		"quien",
		"por",
		"cual"
	].includes(start);
}
//#endregion
export { randomSeed as a, tokenize as c, normalize as i, looksLikeQuestion as n, receivedLabel as o, moderate as r, snippet as s, hashString as t };
