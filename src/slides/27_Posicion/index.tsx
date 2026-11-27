import { CrownIcon } from '@phosphor-icons/react'
import CodigoPorPasos, { type PasoCodigo } from '../../components/CodigoPorPasos'
import Slide from '../../components/Slide'
import Tabs from '../../components/Tabs'

const POSICION = `public static int Posicion(int jugadorId, int nivel) {
  using var con = DatabaseManager.Abrir();
  using var cmd = con.CreateCommand();
  cmd.CommandText = @"SELECT posicion FROM (
      SELECT jugador_id, RANK() OVER (ORDER BY puntaje DESC) AS posicion
      FROM records WHERE nivel = @nivel)
    WHERE jugador_id = @jugador";
  cmd.Parameters.AddWithValue("@nivel", nivel);
  cmd.Parameters.AddWithValue("@jugador", jugadorId);
  object valor = cmd.ExecuteScalar();
  return valor == null ? 0 : System.Convert.ToInt32(valor);
}`

const PASOS_POSICION: PasoCodigo[] = [
  { desde: 1, hasta: 1, titulo: 'Otro método de Ranking', texto: <>Se agrega a la clase <code>Ranking</code> de la diapositiva anterior.</> },
  { desde: 5, hasta: 6, titulo: 'Numerar a todos', texto: <><code>RANK() OVER (ORDER BY puntaje DESC)</code> le da a cada fila su puesto. Si dos empatan, comparten el puesto. Requiere SQLite 3.25 o superior.</> },
  { desde: 4, hasta: 7, titulo: 'Quedarse con el mío', texto: <>La consulta de afuera busca, entre todos los puestos, solo el del jugador: «quedaste #7» aunque no esté en el top 10.</> },
  { desde: 10, hasta: 11, titulo: 'Sin puntaje', texto: <>Si el jugador nunca terminó ese nivel no hay fila: <code>ExecuteScalar()</code> devuelve <code>null</code> y el método responde 0.</> },
]

const PANTALLA = `using TMPro;
using UnityEngine;

public class PantallaRanking : MonoBehaviour {
  public Transform contenedor;
  public TMP_Text prefabFila;
  public TMP_Text textoPosicion;

  public void Mostrar(int nivel, int jugadorId) {
    foreach (Transform hijo in contenedor) Destroy(hijo.gameObject);

    int puesto = 1;
    foreach (FilaRanking fila in Ranking.Top(nivel, 10)) {
      TMP_Text texto = Instantiate(prefabFila, contenedor);
      texto.text = $"{puesto++}. {fila.nombre}   {fila.puntaje}";
    }

    int mio = Ranking.Posicion(jugadorId, nivel);
    textoPosicion.text = mio > 0 ? $"Tu puesto: #{mio}" : "Aún sin puntaje";
  }
}`

const PASOS_PANTALLA: PasoCodigo[] = [
  { desde: 5, hasta: 7, titulo: 'Piezas de la interfaz', texto: <>Se asignan en el Inspector: el contenedor de la lista (un <em>Vertical Layout Group</em>), una fila de texto como prefab y el texto de «tu puesto».</> },
  { desde: 10, hasta: 10, titulo: 'Limpiar la lista', texto: <>Se borran las filas anteriores antes de dibujar el ranking nuevo.</> },
  { desde: 12, hasta: 16, titulo: 'Una fila por puesto', texto: <>Por cada resultado de <code>Ranking.Top</code> se crea una copia del prefab con «puesto, nombre y puntaje».</> },
  { desde: 18, hasta: 19, titulo: 'Tu puesto aparte', texto: <>Debajo de la lista se muestra la posición del jugador, aunque esté lejos del top 10.</> },
]

const FILAS: [string, number][] = [['ana', 12040], ['leo', 11870], ['luis', 10400], ['sofia', 9990]]

function Maqueta() {
  return (
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-xl border-2 border-coral/60 bg-ink-deep shadow-[0_0_40px_#ff6b5b26]" role="img" aria-label="Maqueta de la pantalla de ranking en el juego">
      <p className="flex items-center justify-center gap-2 bg-coral/15 py-3 font-display text-xl font-bold text-coral uppercase"><CrownIcon aria-hidden="true" size={22} /> Ranking · Nivel 3</p>
      <ol className="grid gap-1 p-3 font-mono">
        {FILAS.map(([nombre, puntaje], i) => (
          <li key={nombre} className={`grid grid-cols-[2.5rem_1fr_auto] rounded-[0.3rem] px-3 py-2 ${i === 0 ? 'bg-amber/15 text-amber' : 'text-fg'}`}>
            <span>{i + 1}.</span><span>{nombre}</span><span>{puntaje.toLocaleString('es-PE')}</span>
          </li>
        ))}
      </ol>
      <p className="border-t border-white/10 py-3 text-center font-mono text-mint">Tu puesto (leo): #2</p>
    </div>
  )
}

const TABS = [
  { id: 'posicion', label: 'Tu posición', contenido: <CodigoPorPasos id="posicion" partes={[{ titulo: 'Calcular el puesto', codigo: POSICION, pasos: PASOS_POSICION }]} /> },
  { id: 'pantalla', label: 'Mostrarlo en Unity', contenido: (
    <div className="grid grid-cols-[3fr_2fr] items-start gap-4 max-[900px]:grid-cols-1">
      <CodigoPorPasos id="pantalla-ranking" partes={[{ titulo: 'Pantalla de ranking', codigo: PANTALLA, pasos: PASOS_PANTALLA }]} />
      <Maqueta />
    </div>
  ) },
]

export default function Posicion() {
  return (
    <Slide bloque="Bloque 4 · Puntuaciones" titulo="Tu posición">
      <Tabs tabs={TABS} label="Tu posición" />
    </Slide>
  )
}
