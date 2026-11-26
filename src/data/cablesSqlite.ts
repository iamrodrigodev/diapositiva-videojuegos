export type Cable = { id: string; codigo: string; funcion: string }

export const CABLES_SQLITE: Cable[] = [
  { id: 'open', codigo: 'con.Open()', funcion: 'Abre el archivo .db y lo crea si no existe' },
  { id: 'nonquery', codigo: 'ExecuteNonQuery()', funcion: 'Ejecuta una sentencia que no devuelve filas' },
  { id: 'reader', codigo: 'ExecuteReader()', funcion: 'Ejecuta un SELECT y recorre las filas' },
  { id: 'begin', codigo: 'BeginTransaction()', funcion: 'Inicia un grupo de escrituras «todo o nada»' },
  { id: 'commit', codigo: 'tx.Commit()', funcion: 'Confirma y deja los cambios en disco' },
  { id: 'rollback', codigo: 'tx.Rollback()', funcion: 'Descarta las escrituras si algo falló' },
  { id: 'param', codigo: '@nombre', funcion: 'Envía el dato aparte y evita la inyección SQL' },
  { id: 'ifnot', codigo: 'IF NOT EXISTS', funcion: 'Crea la tabla solo la primera vez' },
  { id: 'using', codigo: 'using var con', funcion: 'Cierra la conexión sola al terminar' },
  { id: 'ruta', codigo: 'persistentDataPath', funcion: 'Carpeta con escritura donde vive el .db' },
]
