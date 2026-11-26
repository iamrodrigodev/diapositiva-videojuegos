import CodigoPorPasos, { type PasoCodigo } from '../../components/CodigoPorPasos'
import Slide from '../../components/Slide'
import Tabs from '../../components/Tabs'

const GESTOR = `using System.IO;
using Mono.Data.Sqlite;
using UnityEngine;

public class DatabaseManager : MonoBehaviour {
  public static string Conexion { get; private set; }
  static DatabaseManager instancia;

  void Awake() {
    if (instancia != null) { Destroy(gameObject); return; }
    instancia = this;
    DontDestroyOnLoad(gameObject);

    string ruta = Path.Combine(Application.persistentDataPath, "estacion_norte.db");
    Conexion = "URI=file:" + ruta;
    CrearTablas();
  }

  void CrearTablas() {
    try {
      using var con = new SqliteConnection(Conexion);
      con.Open();
      using var cmd = con.CreateCommand();
      cmd.CommandText = "PRAGMA journal_mode = WAL;";
      cmd.ExecuteNonQuery();
      cmd.CommandText = @"CREATE TABLE IF NOT EXISTS sesiones (
        id INTEGER PRIMARY KEY, inicio TEXT NOT NULL)";
      cmd.ExecuteNonQuery();
    } catch (SqliteException e) {
      Debug.LogError($"No se pudo preparar la base: {e.Message}");
    }
  }
}`

const PASOS_GESTOR: PasoCodigo[] = [
  { desde: 1, hasta: 3, titulo: 'Importar', texto: <><code>Mono.Data.Sqlite</code> aporta <strong>SqliteConnection</strong> y <strong>SqliteCommand</strong>; <code>System.IO</code>, la clase <code>Path</code>.</> },
  { desde: 5, hasta: 7, titulo: 'Un único gestor', texto: <>La cadena de conexión queda en un campo <code>static</code> para que cualquier script la use. <code>instancia</code> evita que existan dos gestores.</> },
  { desde: 9, hasta: 12, titulo: 'Singleton que cruza escenas', texto: <>Si ya hay un gestor, el duplicado se destruye. Con <code>DontDestroyOnLoad</code> el gestor vive toda la sesión (nivel 2 del Bloque 1).</> },
  { desde: 14, hasta: 16, titulo: 'Ruta y tablas al arrancar', texto: <>El archivo va en <code>persistentDataPath</code>; <code>URI=file:</code> indica que es local. Luego se preparan las tablas.</> },
  { desde: 20, hasta: 23, titulo: 'Abrir la conexión', texto: <><code>Open()</code> abre el archivo y <strong>lo crea si no existe</strong>. Con <code>using var</code> todo se cierra solo al terminar, incluso si hay un error.</> },
  { desde: 24, hasta: 25, titulo: 'Activar WAL', texto: <>Cambia al modo de diario <strong>WAL</strong> (visto en la diapositiva anterior): lecturas y escrituras no se bloquean entre sí.</> },
  { desde: 26, hasta: 28, titulo: 'Crear la tabla una sola vez', texto: <><code>IF NOT EXISTS</code> permite ejecutarlo en cada arranque sin borrar nada. <code>ExecuteNonQuery()</code> se usa porque no devuelve filas.</> },
  { desde: 29, hasta: 31, titulo: 'Manejar el error', texto: <>Si el disco está lleno o el archivo bloqueado, se registra el problema en vez de cerrar el juego.</> },
]

const LECTURA = `public List<string> SesionesDesde(string desde) {
  var resultado = new List<string>();
  using var con = new SqliteConnection(DatabaseManager.Conexion);
  con.Open();
  using var cmd = con.CreateCommand();
  cmd.CommandText = "SELECT id, inicio FROM sesiones WHERE inicio >= @desde";
  cmd.Parameters.AddWithValue("@desde", desde);

  using var lector = cmd.ExecuteReader();
  while (lector.Read()) {
    int id = lector.GetInt32(0);
    string inicio = lector.GetString(1);
    resultado.Add($"Sesión {id}: {inicio}");
  }
  return resultado;
}

public int TotalSesiones() {
  using var con = new SqliteConnection(DatabaseManager.Conexion);
  con.Open();
  using var cmd = con.CreateCommand();
  cmd.CommandText = "SELECT COUNT(*) FROM sesiones";
  return System.Convert.ToInt32(cmd.ExecuteScalar());
}`

const PASOS_LECTURA: PasoCodigo[] = [
  { desde: 1, hasta: 4, titulo: 'Preparar el resultado', texto: <>Se crea la lista que se devolverá y se abre la conexión con la cadena del <code>DatabaseManager</code>.</> },
  { desde: 5, hasta: 7, titulo: 'Consulta con parámetro', texto: <>El <code>WHERE</code> filtra en la base: solo llegan las filas pedidas, sin cargar todo el archivo.</> },
  { desde: 9, hasta: 9, titulo: 'ExecuteReader', texto: <>Ejecuta el <code>SELECT</code> y devuelve un <strong>lector</strong> que avanza fila por fila.</> },
  { desde: 10, hasta: 14, titulo: 'Recorrer las filas', texto: <><code>Read()</code> pasa a la siguiente fila y devuelve <code>false</code> al terminar. <code>GetInt32(0)</code> y <code>GetString(1)</code> leen cada columna por su posición.</> },
  { desde: 18, hasta: 24, titulo: 'Un solo valor: ExecuteScalar', texto: <>Para un único dato, como un <code>COUNT(*)</code>, <code>ExecuteScalar()</code> devuelve directamente la primera columna de la primera fila.</> },
]

const TABS = [
  { id: 'gestor', label: 'Abrir y crear tablas', contenido: <CodigoPorPasos id="database-manager-v2" codigo={GESTOR} pasos={PASOS_GESTOR} /> },
  { id: 'lectura', label: 'Leer datos', contenido: <CodigoPorPasos id="lectura" codigo={LECTURA} pasos={PASOS_LECTURA} /> },
]

export default function DatabaseManager() {
  return (
    <Slide bloque="Bloque 2 · SQLite en Unity" titulo="Código: el DatabaseManager">
      <Tabs tabs={TABS} label="DatabaseManager" />
    </Slide>
  )
}
