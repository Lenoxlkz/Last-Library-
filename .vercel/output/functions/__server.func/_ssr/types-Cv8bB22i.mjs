//#region node_modules/.nitro/vite/services/ssr/assets/types-Cv8bB22i.js
var SHELVES = [
	{
		id: "preguntas",
		name: "Preguntas",
		blurb: "Dudas personales, curiosas o difíciles de explicar."
	},
	{
		id: "respuestas",
		name: "Respuestas",
		blurb: "Reflexiones que intentan acompañar una pregunta."
	},
	{
		id: "fragmentos",
		name: "Fragmentos",
		blurb: "Historias incompletas, ideas sueltas, párrafos sin contexto."
	},
	{
		id: "cartas",
		name: "Cartas",
		blurb: "Mensajes dirigidos a alguien que todavía no se conoce."
	},
	{
		id: "hallazgos",
		name: "Hallazgos",
		blurb: "Textos absurdos, inesperados o difíciles de clasificar."
	}
];
var THREAD_SET = /* @__PURE__ */ new Set([
	"reloj",
	"tarde",
	"vida",
	"llave",
	"tren",
	"ventana",
	"nombre",
	"lluvia",
	"silla",
	"silencio",
	"cocina",
	"dias",
	"puerta",
	"anden",
	"cuarto",
	"luz"
]);
function isShelf(value) {
	return SHELVES.some((shelf) => shelf.id === value);
}
function shelfMeta(id) {
	return SHELVES.find((shelf) => shelf.id === id);
}
function isThread(value) {
	return THREAD_SET.has(value);
}
var MOTIF_LABEL = {
	dias: "días",
	anden: "andén"
};
function motifLabel(motif) {
	return MOTIF_LABEL[motif] ?? motif;
}
function visibleThreads(motifs) {
	return motifs.filter(isThread).slice(0, 4);
}
//#endregion
export { shelfMeta as a, motifLabel as i, isShelf as n, visibleThreads as o, isThread as r, SHELVES as t };
