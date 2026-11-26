export type CodigoConBugs = {
  titulo: string
  lineas: string[]
  bugs: Record<number, string>
}

export const CODIGOS_CON_BUGS: CodigoConBugs[] = [
  {
    titulo: 'Buscar un jugador por nombre',
    lineas: [
      'public string BuscarNivel(string nombre) {',
      '  var con = new SqliteConnection(DatabaseManager.Conexion);',
      '  con.Open();',
      '  var cmd = con.CreateCommand();',
      '  cmd.CommandText = "SELECT nivel FROM jugadores WHERE nombre = \'" + nombre + "\'";',
      '  return cmd.ExecuteScalar()?.ToString();',
      '}',
    ],
    bugs: {
      1: 'Sin «using»: la conexión nunca se cierra y el archivo queda bloqueado.',
      4: 'Concatena el nombre: inyección SQL. Debe usar un parámetro @nombre.',
    },
  },
  {
    titulo: 'Preparar la base al arrancar',
    lineas: [
      'void Awake() {',
      '  string ruta = Path.Combine(Application.dataPath, "estacion_norte.db");',
      '  using var con = new SqliteConnection("URI=file:" + ruta);',
      '  con.Open();',
      '  using var cmd = con.CreateCommand();',
      '  cmd.CommandText = "CREATE TABLE sesiones (id INTEGER PRIMARY KEY, inicio TEXT)";',
      '  cmd.ExecuteNonQuery();',
      '}',
    ],
    bugs: {
      1: 'dataPath es de solo lectura en el build: debe ser persistentDataPath.',
      5: 'Sin «IF NOT EXISTS»: en el segundo arranque falla porque la tabla ya existe.',
    },
  },
  {
    titulo: 'Guardar dentro de una transacción',
    lineas: [
      'using var tx = con.BeginTransaction();',
      'try {',
      '  using var cmd = con.CreateCommand();',
      '  cmd.Transaction = tx;',
      '  cmd.CommandText = "INSERT INTO sesiones (inicio) VALUES (\'" + ahora + "\')";',
      '  cmd.ExecuteNonQuery();',
      '  tx.Commit();',
      '} catch (SqliteException) { }',
    ],
    bugs: {
      4: 'Valor concatenado en el INSERT: debe ir como parámetro @inicio.',
      7: 'El catch vacío no hace Rollback ni avisa: el error pasa en silencio.',
    },
  },
  {
    titulo: 'Contar las sesiones jugadas',
    lineas: [
      'public int ContarSesiones() {',
      '  string ruta = Path.Combine(Application.streamingAssetsPath, "estacion_norte.db");',
      '  using var con = new SqliteConnection("URI=file:" + ruta);',
      '  con.Open();',
      '  using var cmd = con.CreateCommand();',
      '  cmd.CommandText = "SELECT COUNT(*) FROM sesiones";',
      '  return cmd.ExecuteNonQuery();',
      '}',
    ],
    bugs: {
      1: 'streamingAssetsPath es de solo lectura (y en Android está dentro del APK): la base vive en persistentDataPath.',
      6: 'ExecuteNonQuery no devuelve filas: para leer un único valor se usa ExecuteScalar.',
    },
  },
  {
    titulo: 'Registrar dos sesiones juntas',
    lineas: [
      'using var con = new SqliteConnection(DatabaseManager.Conexion);',
      'con.Open();',
      'con.Close();',
      'using var tx = con.BeginTransaction();',
      'using var cmd = con.CreateCommand();',
      'cmd.Transaction = tx;',
      'tx.Commit();',
      'cmd.CommandText = "INSERT INTO sesiones (inicio) VALUES (@a), (@b)";',
      'cmd.ExecuteNonQuery();',
    ],
    bugs: {
      2: 'Cierra la conexión justo después de abrirla: la transacción no tiene con qué trabajar.',
      6: 'Confirma antes de escribir: el INSERT queda fuera de la transacción.',
    },
  },
  {
    titulo: 'Guardar el volumen',
    lineas: [
      'public void GuardarVolumen(float volumen) {',
      '  using var con = new SqliteConnection(DatabaseManager.Conexion);',
      '  con.Open();',
      '  using var cmd = con.CreateCommand();',
      '  cmd.CommandText = "UPDATE ajustes SET volumen = " + volumen;',
      '  cmd.ExecuteReader();',
      '}',
    ],
    bugs: {
      4: 'Valor concatenado: debe ir como parámetro @volumen (además evita errores con comas decimales).',
      5: 'UPDATE no devuelve filas: se ejecuta con ExecuteNonQuery, no con ExecuteReader.',
    },
  },
]
