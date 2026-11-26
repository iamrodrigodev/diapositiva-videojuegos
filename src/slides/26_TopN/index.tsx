import CodigoPorPasos, { type PasoCodigo } from '../../components/CodigoPorPasos'
import Slide from '../../components/Slide'
import Tabs from '../../components/Tabs'
import Constructor from './Constructor'

const CODIGO = `using System.Collections.Generic;
using Mono.Data.Sqlite;

public class FilaRanking { public string nombre; public int puntaje; }

public static class Ranking {
  public static List<FilaRanking> Top(int nivel, int cantidad) {
    var lista = new List<FilaRanking>();
    using var con = new SqliteConnection(DatabaseManager.Conexion);
    con.Open();
    using var cmd = con.CreateCommand();
    cmd.CommandText = @"SELECT j.nombre, r.puntaje
      FROM records r JOIN jugadores j ON j.id = r.jugador_id
      WHERE r.nivel = @nivel
      ORDER BY r.puntaje DESC
      LIMIT @cantidad";
    cmd.Parameters.AddWithValue("@nivel", nivel);
    cmd.Parameters.AddWithValue("@cantidad", cantidad);
    using var lector = cmd.ExecuteReader();
    while (lector.Read())
      lista.Add(new FilaRanking { nombre = lector.GetString(0), puntaje = lector.GetInt32(1) });
    return lista;
  }
}`

const PASOS: PasoCodigo[] = [
  { desde: 4, hasta: 4, titulo: 'Una fila del ranking', texto: <>Una clase simple con lo que muestra la pantalla: nombre y puntaje.</> },
  { desde: 12, hasta: 13, titulo: 'Unir con jugadores', texto: <><code>JOIN</code> trae el nombre desde la tabla <code>jugadores</code> usando la llave foránea.</> },
  { desde: 14, hasta: 16, titulo: 'Filtrar, ordenar, cortar', texto: <><code>WHERE</code> elige el nivel, <code>ORDER BY … DESC</code> pone el mayor primero y <code>LIMIT</code> se queda con los N primeros. El índice de la diapositiva 24 hace esto rápido.</> },
  { desde: 17, hasta: 18, titulo: 'También son parámetros', texto: <>El nivel y la cantidad los elige el menú: van como parámetros, nunca concatenados.</> },
  { desde: 19, hasta: 22, titulo: 'Armar la lista', texto: <>Cada fila leída se convierte en un <code>FilaRanking</code>. La pantalla del ranking recibe esta lista lista para mostrar.</> },
]

const TABS = [
  { id: 'constructor', label: 'Arma tu consulta', contenido: <Constructor /> },
  { id: 'csharp', label: 'En C#', contenido: <CodigoPorPasos id="top-n" partes={[{ titulo: 'Leer el top N', codigo: CODIGO, pasos: PASOS }]} /> },
]

export default function TopN() {
  return (
    <Slide bloque="Bloque 4 · Puntuaciones" titulo="Top N">
      <Tabs tabs={TABS} label="Top N" />
    </Slide>
  )
}
