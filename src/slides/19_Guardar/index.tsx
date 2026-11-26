import CodigoPorPasos, { type PasoCodigo } from '../../components/CodigoPorPasos'
import Slide from '../../components/Slide'

const GUARDAR = `using Mono.Data.Sqlite;

public static class Guardado {
  public static void Guardar(int jugadorId, int ranura, EstadoPartida e) {
    using var con = new SqliteConnection(DatabaseManager.Conexion);
    con.Open();
    using var tx = con.BeginTransaction();
    using var cmd = con.CreateCommand();
    cmd.Transaction = tx;
    try {
      cmd.CommandText = @"INSERT INTO partidas (jugador_id, ranura, nivel, checkpoint, vida, guardado_en)
        VALUES (@jugador, @ranura, @nivel, @checkpoint, @vida, datetime('now'))
        ON CONFLICT (jugador_id, ranura) DO UPDATE SET
          nivel = @nivel, checkpoint = @checkpoint, vida = @vida, guardado_en = datetime('now')";
      cmd.Parameters.AddWithValue("@jugador", jugadorId);
      cmd.Parameters.AddWithValue("@ranura", ranura);
      cmd.Parameters.AddWithValue("@nivel", e.nivel);
      cmd.Parameters.AddWithValue("@checkpoint", e.checkpoint);
      cmd.Parameters.AddWithValue("@vida", e.vida);
      cmd.ExecuteNonQuery();

      cmd.CommandText = "SELECT id FROM partidas WHERE jugador_id = @jugador AND ranura = @ranura";
      long partidaId = (long)cmd.ExecuteScalar();

      cmd.Parameters.Clear();
      cmd.Parameters.AddWithValue("@partida", partidaId);
      cmd.CommandText = "DELETE FROM inventario WHERE partida_id = @partida";
      cmd.ExecuteNonQuery();

      cmd.CommandText = "INSERT INTO inventario (partida_id, item, cantidad) VALUES (@partida, @item, @cantidad)";
      var item = cmd.Parameters.Add("@item", System.Data.DbType.String);
      var cantidad = cmd.Parameters.Add("@cantidad", System.Data.DbType.Int32);
      foreach (var par in e.inventario) {
        item.Value = par.Key;
        cantidad.Value = par.Value;
        cmd.ExecuteNonQuery();
      }
      tx.Commit();
    } catch (SqliteException) {
      tx.Rollback();
      throw;
    }
  }
}`

const PASOS: PasoCodigo[] = [
  { desde: 3, hasta: 4, titulo: 'Qué recibe', texto: <>El jugador, la ranura elegida y el <code>EstadoPartida</code> que armó el juego en ese momento.</> },
  { desde: 5, hasta: 9, titulo: 'Todo en una transacción', texto: <>Partida e inventario se guardan juntos: si algo falla, no queda una partida con el inventario a medias.</> },
  { desde: 11, hasta: 14, titulo: 'Insertar o actualizar (upsert)', texto: <>Si la ranura está vacía, <code>INSERT</code> crea la fila. Si ya existe, <code>ON CONFLICT … DO UPDATE</code> la sobrescribe. <code>datetime('now')</code> guarda la fecha. Requiere SQLite 3.24 o superior.</> },
  { desde: 15, hasta: 20, titulo: 'Los valores, como parámetros', texto: <>Cada dato del estado va en su parámetro: nada concatenado.</> },
  { desde: 22, hasta: 23, titulo: '¿Qué id tiene la partida?', texto: <>Se reutilizan <code>@jugador</code> y <code>@ranura</code> para obtener el <code>id</code> de la fila, nueva o actualizada. <code>ExecuteScalar()</code> devuelve ese único valor.</> },
  { desde: 25, hasta: 28, titulo: 'Vaciar el inventario anterior', texto: <>Se borran los objetos que tenía esa ranura: el inventario se reescribe completo con el estado actual.</> },
  { desde: 30, hasta: 37, titulo: 'Escribir cada objeto', texto: <>La sentencia se prepara una vez; en cada vuelta solo cambian <code>item</code> y <code>cantidad</code>.</> },
  { desde: 38, hasta: 42, titulo: 'Confirmar o deshacer', texto: <><code>Commit()</code> deja todo en disco de una vez. Ante un error, <code>Rollback()</code> deja la ranura como estaba y <code>throw</code> avisa al juego para mostrar un mensaje.</> },
]

export default function Guardar() {
  return (
    <Slide bloque="Bloque 3 · Guardado de partidas" titulo="Guardar">
      <CodigoPorPasos id="guardar" partes={[{ titulo: 'Guardar una partida', codigo: GUARDAR, pasos: PASOS }]} />
    </Slide>
  )
}
