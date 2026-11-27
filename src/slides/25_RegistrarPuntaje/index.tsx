import CodigoPorPasos, { type PasoCodigo } from '../../components/CodigoPorPasos'
import Slide from '../../components/Slide'

const REGISTRAR = `using Mono.Data.Sqlite;

public static class Puntajes {
  public static void Registrar(string nombre, int nivel, int puntaje) {
    using var con = DatabaseManager.Abrir();
    using var cmd = con.CreateCommand();
    cmd.Parameters.AddWithValue("@nombre", nombre);
    cmd.CommandText = "INSERT OR IGNORE INTO jugadores (nombre) VALUES (@nombre)";
    cmd.ExecuteNonQuery();

    cmd.CommandText = @"INSERT INTO records (jugador_id, nivel, puntaje, fecha)
      VALUES ((SELECT id FROM jugadores WHERE nombre = @nombre), @nivel, @puntaje, datetime('now'))
      ON CONFLICT (jugador_id, nivel) DO UPDATE
        SET puntaje = excluded.puntaje, fecha = excluded.fecha
        WHERE excluded.puntaje > records.puntaje";
    cmd.Parameters.AddWithValue("@nivel", nivel);
    cmd.Parameters.AddWithValue("@puntaje", puntaje);
    cmd.ExecuteNonQuery();
  }
}`

const PASOS: PasoCodigo[] = [
  { desde: 3, hasta: 5, titulo: 'Al terminar el nivel', texto: <>La pantalla de resultados pide un nombre y llama a <code>Puntajes.Registrar</code>. Abre con el <code>Abrir()</code> del Bloque 3.</> },
  { desde: 7, hasta: 9, titulo: '¿Jugador nuevo?', texto: <>Si el nombre no existe, se crea en <code>jugadores</code>. <code>OR IGNORE</code>: si ya existe (<code>UNIQUE</code>), no pasa nada.</> },
  { desde: 11, hasta: 12, titulo: 'Insertar el récord', texto: <>El <code>id</code> se busca por nombre dentro del mismo <code>INSERT</code>. Si es su primer puntaje en ese nivel, se crea la fila.</> },
  { desde: 13, hasta: 14, titulo: 'El mismo upsert del guardado', texto: <>Si ya tiene récord, <code>ON CONFLICT</code> actualiza. <code>excluded</code> es la fila que se intentó insertar: el puntaje nuevo.</> },
  { desde: 15, hasta: 15, titulo: 'Solo si lo supera', texto: <>El <code>WHERE</code> actualiza <strong>solo si el puntaje nuevo es mayor</strong>. Si no, el récord se queda igual.</> },
  { desde: 16, hasta: 18, titulo: 'Parámetros, como siempre', texto: <>Nombre, nivel y puntaje van aparte del SQL: el nombre lo escribe el jugador y podría traer una inyección.</> },
]

export default function RegistrarPuntaje() {
  return (
    <Slide bloque="Bloque 4 · Puntuaciones" titulo="Registrar un puntaje">
      <CodigoPorPasos id="registrar-puntaje-v2" partes={[{ titulo: 'Registrar el récord', codigo: REGISTRAR, pasos: PASOS }]} />
    </Slide>
  )
}
