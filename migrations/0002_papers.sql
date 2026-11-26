create table if not exists papers (
  id text primary key,
  shelf text not null check (
    shelf in ('preguntas', 'respuestas', 'fragmentos', 'cartas', 'hallazgos')
  ),
  body text not null check (char_length(body) between 12 and 1200),
  motifs text not null default '',
  norm text not null,
  received_at timestamptz not null default now()
);

create unique index if not exists papers_norm_idx on papers (norm);
