import CodigoPorPasos, { type PasoCodigo } from '../../components/CodigoPorPasos'
import Slide from '../../components/Slide'

const HISTORIAL = `using Mono.Data.Sqlite;

public static class Puntajes {
  public static void Registrar(int jugadorId, int nivel, int puntaje) {
    using var con = new SqliteConnection(DatabaseManager.Conexion);
    con.Open();
    using var cmd = con.CreateCommand();
    cmd.CommandText = @"INSERT INTO puntuaciones (jugador_id, nivel, puntaje, fecha)
                        VALUES (@jugador, @nivel, @puntaje, datetime('now'))";
    cmd.Parameters.AddWithValue("@jugador", jugadorId);
    cmd.Parameters.AddWithValue("@nivel", nivel);
    cmd.Parameters.AddWithValue("@puntaje", puntaje);
    cmd.ExecuteNonQuery();
  }
}`

const PASOS_HISTORIAL: PasoCodigo[] = [
  { desde: 3, hasta: 4, titulo: 'Al terminar el nivel', texto: <>El juego llama a <code>Puntajes.Registrar</code> en la pantalla de resultados.</> },
  { desde: 8, hasta: 9, titulo: 'Siempre una fila nueva', texto: <>Cada partida queda registrada: sirve para historiales, gráficos de progreso o «tus últimas 5 partidas».</> },
  { desde: 10, hasta: 13, titulo: 'Parámetros, como siempre', texto: <>Los tres valores van aparte del SQL. Un solo <code>INSERT</code> no necesita transacción.</> },
]

const RECORD = `CREATE TABLE IF NOT EXISTS records (
  jugador_id INTEGER NOT NULL REFERENCES jugadores(id),
  nivel      INTEGER NOT NULL,
  puntaje    INTEGER NOT NULL,
  fecha      TEXT NOT NULL,
  PRIMARY KEY (jugador_id, nivel)
);

INSERT INTO records (jugador_id, nivel, puntaje, fecha)
VALUES (@jugador, @nivel, @puntaje, datetime('now'))
ON CONFLICT (jugador_id, nivel) DO UPDATE
  SET puntaje = excluded.puntaje, fecha = excluded.fecha
  WHERE excluded.puntaje > records.puntaje;`

const PASOS_RECORD: PasoCodigo[] = [
  { desde: 1, hasta: 7, titulo: 'Una fila por jugador y nivel', texto: <>La llave primaria <code>(jugador_id, nivel)</code> garantiza que cada jugador tenga <strong>un solo récord</strong> por nivel.</> },
  { desde: 9, hasta: 11, titulo: 'Insertar o actualizar', texto: <>El mismo upsert del guardado (Bloque 3): si es su primer puntaje en ese nivel, se inserta.</> },
  { desde: 12, hasta: 12, titulo: 'excluded', texto: <><code>excluded</code> es la fila que se intentó insertar: el puntaje nuevo.</> },
  { desde: 13, hasta: 13, titulo: 'Solo si lo supera', texto: <>El <code>WHERE</code> hace que se actualice <strong>solo si el puntaje nuevo es mayor</strong>. Si no, el récord se queda igual.</> },
]

const PARTES = [
  { titulo: 'Guardar todos (historial)', codigo: HISTORIAL, pasos: PASOS_HISTORIAL },
  { titulo: 'Solo el mejor (récord)', codigo: RECORD, pasos: PASOS_RECORD },
]

export default function RegistrarPuntaje() {
  return (
    <Slide bloque="Bloque 4 · Puntuaciones" titulo="Registrar un puntaje">
      <CodigoPorPasos id="registrar-puntaje" partes={PARTES} />
    </Slide>
  )
}
