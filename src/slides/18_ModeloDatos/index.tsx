import CodigoPorPasos, { type PasoCodigo } from '../../components/CodigoPorPasos'
import Slide from '../../components/Slide'
import Tabs from '../../components/Tabs'
import Diagrama from './Diagrama'

const SQL = `CREATE TABLE IF NOT EXISTS jugadores (
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
);

INSERT OR IGNORE INTO jugadores (id, nombre) VALUES (1, 'Jugador 1');`

const PASOS: PasoCodigo[] = [
  { desde: 1, hasta: 4, titulo: 'Jugadores', texto: <>Cada jugador tiene un <code>id</code> y un <code>nombre</code> que no se repite (<code>UNIQUE</code>).</> },
  { desde: 6, hasta: 9, titulo: '¿De quién es la partida?', texto: <><code>jugador_id</code> apunta a <code>jugadores(id)</code>: no se puede guardar una partida de un jugador que no existe.</> },
  { desde: 10, hasta: 13, titulo: 'El estado', texto: <>Los mismos campos de <code>EstadoPartida</code>, más la fecha para mostrarla en el menú de ranuras.</> },
  { desde: 14, hasta: 14, titulo: 'Una partida por ranura', texto: <><code>UNIQUE (jugador_id, ranura)</code> impide dos partidas en la misma ranura. Al guardar de nuevo, el upsert de la diapositiva 19 la <strong>reemplaza</strong>.</> },
  { desde: 17, hasta: 22, titulo: 'Inventario', texto: <>Una fila por objeto. <code>ON DELETE CASCADE</code>: al borrar una partida, sus objetos se borran solos.</> },
  { desde: 24, hasta: 24, titulo: 'El jugador inicial', texto: <>Un juego de un solo jugador crea el <strong>Jugador 1</strong> al instalarse. <code>OR IGNORE</code>: si ya existe, no hace nada.</> },
]

const ABRIR = `// En DatabaseManager (bloque 2), junto a Conexion
public static SqliteConnection Abrir()
{
    var con = new SqliteConnection(Conexion);
    con.Open();

    using var cmd = con.CreateCommand();
    cmd.CommandText = "PRAGMA foreign_keys = ON;";
    cmd.ExecuteNonQuery();

    return con;
}`

const PASOS_ABRIR: PasoCodigo[] = [
  { desde: 1, hasta: 5, titulo: 'Un solo lugar para abrir', texto: <>Todo el guardado y las puntuaciones abrirán la base con <code>DatabaseManager.Abrir()</code>.</> },
  { desde: 7, hasta: 9, titulo: 'Activar las llaves foráneas', texto: <>SQLite <strong>no revisa</strong> las FK ni hace <code>CASCADE</code> si no se le pide, y el ajuste dura solo esa conexión. Por eso va aquí.</> },
  { desde: 11, hasta: 11, titulo: 'Devolver la conexión', texto: <>Quien la pide la cierra con <code>using</code>.</> },
]

const TABS = [
  { id: 'diagrama', label: 'Diagrama', contenido: <Diagrama /> },
  {
    id: 'sql',
    label: 'Crear las tablas',
    contenido: (
      <CodigoPorPasos
        id="modelo-sql-v2"
        partes={[
          { titulo: 'Tablas del guardado', codigo: SQL, pasos: PASOS },
          { titulo: 'Abrir con llaves foráneas', codigo: ABRIR, pasos: PASOS_ABRIR },
        ]}
      />
    ),
  },
]

export default function ModeloDatos() {
  return (
    <Slide bloque="Bloque 3 · Guardado de partidas" titulo="Modelo de datos">
      <Tabs tabs={TABS} label="Modelo de datos" />
    </Slide>
  )
}
