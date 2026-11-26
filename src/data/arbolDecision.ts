export type Nodo =
  | { tipo: 'pregunta'; texto: string; si: string; no: string }
  | { tipo: 'resultado'; texto: string; porque: string }

export const INICIO = 'compartido'

export const ARBOL: Record<string, Nodo> = {
  compartido: { tipo: 'pregunta', texto: '¿Los datos se comparten entre jugadores o dispositivos?', si: 'servidor', no: 'pocos' },
  pocos: { tipo: 'pregunta', texto: '¿Son solo unos pocos valores sueltos (ajustes, último nivel)?', si: 'playerprefs', no: 'consultas' },
  consultas: { tipo: 'pregunta', texto: '¿Necesitas consultar, ordenar o relacionar muchos registros?', si: 'sqlite', no: 'json' },
  servidor: { tipo: 'resultado', texto: 'Servidor / nube', porque: 'Un archivo local no puede compartirse: la fuente de verdad debe estar en un servidor.' },
  playerprefs: { tipo: 'resultado', texto: 'PlayerPrefs', porque: 'Para pocos valores, una base de datos sería excesiva.' },
  sqlite: { tipo: 'resultado', texto: 'SQLite', porque: 'Datos relacionados y consultas SQL, sin servidor ni internet.' },
  json: { tipo: 'resultado', texto: 'JSON', porque: 'Un objeto que se guarda y carga entero no necesita consultas.' },
}
