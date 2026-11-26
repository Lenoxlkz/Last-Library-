import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/acerca")({
  head: () => ({ meta: [{ title: "Acerca · La última biblioteca" }] }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="focus-pool max-w-xl">
      <p className="text-xs tracking-widest text-faint uppercase">Colofón</p>
      <h1 className="mt-4 font-serif text-5xl leading-tight font-medium text-balance text-ink">
        Cómo se habita
      </h1>
      <div className="mt-8 max-w-xl space-y-6 font-serif text-xl leading-relaxed text-pretty text-ink">
        <p>
          Cualquiera puede entrar sin saber qué busca. No hay autores a la vista ni cuentas que
          abrir. Los estantes guardan preguntas, respuestas, fragmentos, cartas y hallazgos.
        </p>
        <p>
          El buscador no devuelve libros. Devuelve papeles: textos breves que parecen encontrados
          entre otros. A veces uno encaja con lo que preguntaste. A veces solo estaba cerca.
        </p>
        <p>
          Si dejas algo, pasa a la colección después de unas comprobaciones sencillas: que no lleve
          datos privados, abuso ni enlaces. Tu nombre no hace falta. Quizá nunca sepas quién lo lee.
        </p>
        <p>
          Una pregunta puede recibir, con el tiempo, papeles que no fueron escritos para ella. Esa
          vecindad se muestra al margen, sin fingir que el autor quiso decir más de lo que dijo.
        </p>
      </div>
      <p className="mt-10">
        <Link to="/dejar" search={{ shelf: "" }} className="text-sm text-wax underline decoration-rule underline-offset-4">
          Dejar un papel
        </Link>
      </p>
    </div>
  );
}
