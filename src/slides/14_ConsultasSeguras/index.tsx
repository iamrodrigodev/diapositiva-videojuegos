import CodigoPorPasos, { type PasoCodigo } from '../../components/CodigoPorPasos'
import Slide from '../../components/Slide'
import Tabs from '../../components/Tabs'
import DemoInyeccion from './DemoInyeccion'

const TRANSACCION = `using var con = new SqliteConnection(DatabaseManager.Conexion);
con.Open();
using var tx = con.BeginTransaction();
try {
  using var cmd = con.CreateCommand();
  cmd.Transaction = tx;
  cmd.CommandText = "INSERT INTO sesiones (inicio) VALUES (@inicio)";
  cmd.Parameters.AddWithValue("@inicio", System.DateTime.Now.ToString("s"));
  cmd.ExecuteNonQuery();
  tx.Commit();
} catch (SqliteException e) {
  tx.Rollback();
  Debug.LogError("No se pudo guardar: " + e.Message);
}`

const PASOS: PasoCodigo[] = [
  { desde: 1, hasta: 3, titulo: 'Empezar la transacción', texto: <><code>BeginTransaction()</code> marca el inicio del «todo o nada»: desde aquí, ninguna escritura es definitiva.</> },
  { desde: 5, hasta: 6, titulo: 'Meter el comando en la transacción', texto: <><code>cmd.Transaction = tx</code> enlaza el comando con la transacción abierta.</> },
  { desde: 7, hasta: 9, titulo: 'Escribir con parámetro', texto: <>El mismo INSERT de la diapositiva anterior, con el valor como <strong>parámetro</strong>. Aquí podrían ir varias escrituras que deben ir juntas.</> },
  { desde: 10, hasta: 10, titulo: 'Confirmar', texto: <>Solo con <code>Commit()</code> los cambios quedan en disco. Si el juego se cierra antes, no queda nada a medias.</> },
  { desde: 11, hasta: 14, titulo: 'Deshacer si algo falla', texto: <>Ante un error, <code>Rollback()</code> descarta todo lo escrito en la transacción y se registra el problema en la consola.</> },
]

const TABS = [
  { id: 'parametros', label: 'Inyección SQL', contenido: <DemoInyeccion /> },
  { id: 'transacciones', label: 'Transacciones', contenido: <CodigoPorPasos id="transaccion" partes={[{ titulo: 'Transacción completa', codigo: TRANSACCION, pasos: PASOS }]} /> },
]

export default function ConsultasSeguras() {
  return (
    <Slide bloque="Bloque 2 · SQLite en Unity" titulo="Consultas seguras">
      <Tabs tabs={TABS} label="Consultas seguras" />
    </Slide>
  )
}
