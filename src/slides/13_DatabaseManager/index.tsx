import CodigoPorPasos, { type PasoCodigo } from '../../components/CodigoPorPasos'
import Slide from '../../components/Slide'

const ABRIR = `using System.IO;
using Mono.Data.Sqlite;
using UnityEngine;

public class DatabaseManager : MonoBehaviour {
  public static string Conexion;

  void Awake() {
    string ruta = Path.Combine(Application.persistentDataPath, "estacion_norte.db");
    Conexion = "URI=file:" + ruta;

    using var con = new SqliteConnection(Conexion);
    con.Open();
    using var cmd = con.CreateCommand();
    cmd.CommandText = "CREATE TABLE IF NOT EXISTS sesiones (id INTEGER PRIMARY KEY, inicio TEXT)";
    cmd.ExecuteNonQuery();
  }
}`

const PASOS_ABRIR: PasoCodigo[] = [
  { desde: 1, hasta: 3, titulo: 'Importar', texto: <><code>Mono.Data.Sqlite</code> es el plugin instalado: trae <strong>SqliteConnection</strong> (la conexión) y los comandos.</> },
  { desde: 5, hasta: 6, titulo: 'Un script en la escena', texto: <>Se agrega a un GameObject de la primera escena. Guarda la cadena de conexión en un campo <code>static</code> para que otros scripts la usen.</> },
  { desde: 8, hasta: 10, titulo: '¿Dónde está el archivo?', texto: <>En <code>persistentDataPath</code>, la carpeta con escritura del Bloque 1. <code>URI=file:</code> indica que es un archivo local.</> },
  { desde: 12, hasta: 13, titulo: 'Abrir', texto: <><code>Open()</code> abre el archivo y <strong>lo crea si no existe</strong>. <code>using var</code> lo cierra solo al terminar.</> },
  { desde: 14, hasta: 16, titulo: 'Crear una tabla de prueba', texto: <>Una tabla mínima, <code>sesiones</code>, para practicar. <code>IF NOT EXISTS</code> evita el error en el segundo arranque. Las tablas de partidas y puntajes llegan en los Bloques 3 y 4.</> },
]

const LEER = `using Mono.Data.Sqlite;
using UnityEngine;

public class Sesiones : MonoBehaviour {
  void Start() {
    using var con = new SqliteConnection(DatabaseManager.Conexion);
    con.Open();
    using var cmd = con.CreateCommand();

    cmd.CommandText = "INSERT INTO sesiones (inicio) VALUES (@inicio)";
    cmd.Parameters.AddWithValue("@inicio", System.DateTime.Now.ToString("s"));
    cmd.ExecuteNonQuery();

    cmd.Parameters.Clear();
    cmd.CommandText = "SELECT id, inicio FROM sesiones";
    using var lector = cmd.ExecuteReader();
    while (lector.Read())
      Debug.Log($"Sesión {lector.GetInt32(0)}: {lector.GetString(1)}");
  }
}`

const PASOS_LEER: PasoCodigo[] = [
  { desde: 4, hasta: 8, titulo: 'Abrir con la misma conexión', texto: <>Cualquier script reutiliza <code>DatabaseManager.Conexion</code>. Este registra cada vez que se inicia el juego.</> },
  { desde: 10, hasta: 12, titulo: 'Escribir una fila', texto: <><code>@inicio</code> es un <strong>parámetro</strong>: el valor va aparte del SQL (la diapositiva siguiente explica por qué). <code>ExecuteNonQuery()</code> se usa porque no devuelve filas.</> },
  { desde: 14, hasta: 16, titulo: 'Pedir las filas', texto: <>Se limpia el parámetro anterior y se cambia la orden. <code>ExecuteReader()</code> ejecuta el <code>SELECT</code> y devuelve un <strong>lector</strong> que avanza fila por fila.</> },
  { desde: 17, hasta: 18, titulo: 'Recorrerlas', texto: <><code>Read()</code> pasa a la siguiente fila hasta que no quedan. <code>GetInt32(0)</code> y <code>GetString(1)</code> leen cada columna por su posición. En la consola aparece: <code>Sesión 1: 2026-11-24T18:02:11</code>.</> },
]

const PARTES = [
  { titulo: 'Abrir y crear la tabla', codigo: ABRIR, pasos: PASOS_ABRIR },
  { titulo: 'Escribir y leer', codigo: LEER, pasos: PASOS_LEER },
]

export default function DatabaseManager() {
  return (
    <Slide bloque="Bloque 2 · SQLite en Unity" titulo="DatabaseManager">
      <CodigoPorPasos id="database-manager-v4" partes={PARTES} />
    </Slide>
  )
}
