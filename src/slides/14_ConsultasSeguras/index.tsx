import CodigoPorPasos, { type PasoCodigo } from '../../components/CodigoPorPasos'
import Slide from '../../components/Slide'
import Tabs from '../../components/Tabs'
import DemoInyeccion from './DemoInyeccion'

const TRANSACCION = `public bool RegistrarSesiones(IEnumerable<string> inicios) {
  using var con = new SqliteConnection(DatabaseManager.Conexion);
  con.Open();
  using var tx = con.BeginTransaction();
  try {
    using var cmd = con.CreateCommand();
    cmd.Transaction = tx;
    cmd.CommandText = "INSERT INTO sesiones (inicio) VALUES (@inicio)";
    var parametro = cmd.Parameters.Add("@inicio", DbType.String);

    foreach (string inicio in inicios) {
      parametro.Value = inicio;
      cmd.ExecuteNonQuery();
    }

    tx.Commit();
    return true;
  } catch (SqliteException e) {
    tx.Rollback();
    Debug.LogError($"No se pudo guardar: {e.Message}");
    return false;
  }
}`

const PASOS: PasoCodigo[] = [
  { desde: 1, hasta: 4, titulo: 'Abrir y empezar la transacción', texto: <>El método recibe varias sesiones a guardar. <code>BeginTransaction()</code> marca el inicio del «todo o nada».</> },
  { desde: 6, hasta: 7, titulo: 'Asociar el comando', texto: <>Cada comando que deba ir dentro de la transacción se enlaza con <code>cmd.Transaction = tx</code>.</> },
  { desde: 8, hasta: 9, titulo: 'Preparar una sola vez', texto: <>La sentencia y su <strong>parámetro</strong> se crean una vez; luego solo cambia el valor. Más rápido y sin texto concatenado.</> },
  { desde: 11, hasta: 14, titulo: 'Escribir en bucle', texto: <>Cada vuelta cambia <code>parametro.Value</code> y ejecuta el INSERT. Nada llega a disco todavía.</> },
  { desde: 16, hasta: 17, titulo: 'Confirmar', texto: <>Solo con <code>Commit()</code> los cambios quedan en disco. Si el juego se cierra antes, la base vuelve a su estado anterior.</> },
  { desde: 18, hasta: 22, titulo: 'Deshacer si algo falla', texto: <><code>Rollback()</code> descarta todas las escrituras, se registra el error y el método avisa con <code>false</code> para que el juego muestre un mensaje.</> },
]

const TABS = [
  { id: 'parametros', label: 'Consultas parametrizadas', contenido: <DemoInyeccion /> },
  { id: 'transacciones', label: 'Transacciones en código', contenido: <CodigoPorPasos id="transaccion" codigo={TRANSACCION} pasos={PASOS} /> },
]

export default function ConsultasSeguras() {
  return (
    <Slide bloque="Bloque 2 · SQLite en Unity" titulo="Código: consultas seguras">
      <Tabs tabs={TABS} label="Consultas seguras" />
    </Slide>
  )
}
