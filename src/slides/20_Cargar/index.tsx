import CodigoPorPasos, { type PasoCodigo } from '../../components/CodigoPorPasos'
import Slide from '../../components/Slide'

const CARGAR = `using Mono.Data.Sqlite;

public static class Carga {
  public static EstadoPartida Cargar(int jugadorId, int ranura) {
    using var con = DatabaseManager.Abrir();
    using var cmd = con.CreateCommand();
    cmd.CommandText = "SELECT id, nivel, checkpoint, vida FROM partidas WHERE jugador_id = @jugador AND ranura = @ranura";
    cmd.Parameters.AddWithValue("@jugador", jugadorId);
    cmd.Parameters.AddWithValue("@ranura", ranura);

    var estado = new EstadoPartida();
    long partidaId;
    using (var fila = cmd.ExecuteReader()) {
      if (!fila.Read()) return null;
      partidaId = fila.GetInt64(0);
      estado.nivel = fila.GetInt32(1);
      estado.checkpoint = fila.IsDBNull(2) ? null : fila.GetString(2);
      estado.vida = fila.GetInt32(3);
    }

    cmd.Parameters.Clear();
    cmd.CommandText = "SELECT item, cantidad FROM inventario WHERE partida_id = @partida";
    cmd.Parameters.AddWithValue("@partida", partidaId);
    using var objetos = cmd.ExecuteReader();
    while (objetos.Read())
      estado.inventario[objetos.GetString(0)] = objetos.GetInt32(1);
    return estado;
  }
}`

const PASOS_CARGAR: PasoCodigo[] = [
  { desde: 4, hasta: 9, titulo: 'Buscar la ranura', texto: <>Un <code>SELECT</code> con <code>WHERE</code> pide solo la partida de ese jugador en esa ranura.</> },
  { desde: 11, hasta: 14, titulo: '¿Ranura vacía?', texto: <>Si <code>Read()</code> no encuentra fila, la ranura está vacía y el método devuelve <code>null</code>: el juego decide qué hacer.</> },
  { desde: 15, hasta: 19, titulo: 'Llenar el estado', texto: <>Cada columna pasa a su campo. <code>IsDBNull</code> cubre el checkpoint vacío (una partida recién empezada).</> },
  { desde: 21, hasta: 26, titulo: 'Recuperar el inventario', texto: <>Con el <code>id</code> de la partida se piden sus objetos y se agregan al diccionario uno por uno.</> },
  { desde: 27, hasta: 27, titulo: 'Listo', texto: <>Devuelve un <code>EstadoPartida</code> idéntico al que se guardó. Lo derivado (vida máxima, peso…) se recalcula después.</> },
]

const USAR = `using UnityEngine;
using UnityEngine.SceneManagement;

public class MenuRanuras : MonoBehaviour {
  public void AlPulsarRanura(int ranura) {
    EstadoPartida estado = Carga.Cargar(1, ranura);
    if (estado == null) {
      Debug.Log("Ranura vacía: empieza una partida nueva");
      estado = new EstadoPartida { nivel = 1, vida = 100 };
    }
    PartidaActual.Estado = estado;
    SceneManager.LoadScene("Nivel" + estado.nivel);
  }
}

public static class PartidaActual {
  public static EstadoPartida Estado;
}`

const PASOS_USAR: PasoCodigo[] = [
  { desde: 5, hasta: 6, titulo: 'El botón de la ranura', texto: <>Cada botón del menú llama a este método con su número de ranura.</> },
  { desde: 7, hasta: 10, titulo: 'Ranura vacía', texto: <>Si no hay partida, se crea un estado inicial: nivel 1 y vida completa.</> },
  { desde: 11, hasta: 11, titulo: 'Pasarlo a la escena', texto: <>Al cambiar de escena, los objetos se destruyen (nivel 1 del Bloque 1). Un campo <code>static</code> conserva el estado durante la sesión.</> },
  { desde: 12, hasta: 12, titulo: 'Cargar el nivel', texto: <>La escena del nivel lee <code>PartidaActual.Estado</code> y coloca al jugador en el checkpoint con su vida e inventario.</> },
]

const PARTES = [
  { titulo: 'Leer de la base', codigo: CARGAR, pasos: PASOS_CARGAR },
  { titulo: 'Usarlo en el juego', codigo: USAR, pasos: PASOS_USAR },
]

export default function Cargar() {
  return (
    <Slide bloque="Bloque 3 · Guardado de partidas" titulo="Cargar">
      <CodigoPorPasos id="cargar" partes={PARTES} />
    </Slide>
  )
}
