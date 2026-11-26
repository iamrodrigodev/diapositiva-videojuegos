import CodigoPorPasos, { type PasoCodigo } from '../../components/CodigoPorPasos'
import Slide from '../../components/Slide'
import Tabs from '../../components/Tabs'
import Diagrama from './Diagrama'

const SQL = `PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS jugadores (
  id     INTEGER PRIMARY KEY,
  nombre TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS partidas (
  id          INTEGER PRIMARY KEY,
  jugador_id  INTEGER NOT NULL REFERENCES jugadores(id),
  ranura      INTEGER NOT NULL,
  nivel       INTEGER NOT NULL,
  checkpoint  TEXT,
  vida        INTEGER NOT NULL,
  guardado_en TEXT NOT NULL,
  UNIQUE (jugador_id, ranura)
);

CREATE TABLE IF NOT EXISTS inventario (
  partida_id INTEGER NOT NULL REFERENCES partidas(id) ON DELETE CASCADE,
  item       TEXT NOT NULL,
  cantidad   INTEGER NOT NULL,
  PRIMARY KEY (partida_id, item)
);`

const PASOS: PasoCodigo[] = [
  { desde: 1, hasta: 1, titulo: 'Activar las llaves foráneas', texto: <>SQLite <strong>no revisa</strong> las FK si no se le pide. Se activa cada vez que se abre la conexión.</> },
  { desde: 3, hasta: 6, titulo: 'Jugadores', texto: <>Cada jugador tiene un <code>id</code> y un <code>nombre</code> que no se repite (<code>UNIQUE</code>).</> },
  { desde: 8, hasta: 11, titulo: '¿De quién es la partida?', texto: <><code>jugador_id</code> apunta a <code>jugadores(id)</code>: no se puede guardar una partida de un jugador que no existe.</> },
  { desde: 12, hasta: 15, titulo: 'El estado', texto: <>Los mismos campos de <code>EstadoPartida</code>, más la fecha para mostrarla en el menú de ranuras.</> },
  { desde: 16, hasta: 16, titulo: 'Una partida por ranura', texto: <><code>UNIQUE (jugador_id, ranura)</code> impide dos partidas en la misma ranura: al guardar de nuevo, se <strong>reemplaza</strong>.</> },
  { desde: 19, hasta: 24, titulo: 'Inventario', texto: <>Una fila por objeto. <code>ON DELETE CASCADE</code>: al borrar una partida, sus objetos se borran solos.</> },
]

const TABS = [
  { id: 'diagrama', label: 'Diagrama', contenido: <Diagrama /> },
  { id: 'sql', label: 'Crear las tablas', contenido: <CodigoPorPasos id="modelo-sql" partes={[{ titulo: 'Tablas del guardado', codigo: SQL, pasos: PASOS }]} /> },
]

export default function ModeloDatos() {
  return (
    <Slide bloque="Bloque 3 · Guardado de partidas" titulo="Modelo de datos">
      <Tabs tabs={TABS} label="Modelo de datos" />
    </Slide>
  )
}
