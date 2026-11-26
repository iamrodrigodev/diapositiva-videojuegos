import CodigoPorPasos, { type PasoCodigo } from '../../components/CodigoPorPasos'
import Slide from '../../components/Slide'
import Tabs from '../../components/Tabs'
import SimuladorRanuras from './SimuladorRanuras'

const AUTOGUARDADO = `using UnityEngine;

public class Checkpoint : MonoBehaviour {
  public string nombre;

  void OnTriggerEnter(Collider otro) {
    if (!otro.CompareTag("Player")) return;
    PartidaActual.Estado.checkpoint = nombre;
    Guardado.Guardar(1, 0, PartidaActual.Estado);
  }
}

public class AutoguardadoMovil : MonoBehaviour {
  void OnApplicationPause(bool pausado) {
    if (pausado) Guardado.Guardar(1, 0, PartidaActual.Estado);
  }
}`

const PASOS_AUTO: PasoCodigo[] = [
  { desde: 3, hasta: 4, titulo: 'Un checkpoint en la escena', texto: <>Un objeto invisible con un <em>collider</em> marcado como trigger. Su <code>nombre</code> es el que se guarda.</> },
  { desde: 6, hasta: 8, titulo: 'Detectar al jugador', texto: <>Cuando el jugador lo cruza, se actualiza el checkpoint del estado en memoria.</> },
  { desde: 9, hasta: 9, titulo: 'Guardar en la ranura 0', texto: <>Se reutiliza <code>Guardado.Guardar</code> de la diapositiva 19. La ranura <strong>0</strong> queda reservada para el autoguardado: no pisa las del jugador.</> },
  { desde: 13, hasta: 17, titulo: 'Al salir en el móvil', texto: <>En Android e iOS el sistema puede cerrar el juego sin aviso. <code>OnApplicationPause(true)</code> llega cuando la app pasa a segundo plano: es el último momento seguro para guardar.</> },
]

const MIGRACION = `cmd.CommandText = "PRAGMA user_version";
long version = (long)cmd.ExecuteScalar();

if (version < 1) {
  cmd.CommandText = CrearTablas;
  cmd.ExecuteNonQuery();
}
if (version < 2) {
  cmd.CommandText = "ALTER TABLE partidas ADD COLUMN monedas INTEGER NOT NULL DEFAULT 0";
  cmd.ExecuteNonQuery();
}
cmd.CommandText = "PRAGMA user_version = 2";
cmd.ExecuteNonQuery();`

const PASOS_MIGRACION: PasoCodigo[] = [
  { desde: 1, hasta: 2, titulo: '¿Qué versión tiene este archivo?', texto: <>SQLite guarda un número libre en el archivo: <code>user_version</code>. Una base nueva empieza en 0.</> },
  { desde: 4, hasta: 7, titulo: 'Versión 1: crear las tablas', texto: <>Si el jugador nunca abrió el juego, se crean las tablas de la diapositiva 18 (<code>CrearTablas</code> es ese SQL).</> },
  { desde: 8, hasta: 11, titulo: 'Versión 2: la actualización', texto: <>La versión 1.1 del juego agrega monedas. <code>ALTER TABLE … ADD COLUMN</code> agrega la columna <strong>sin borrar las partidas</strong> existentes; <code>DEFAULT 0</code> les da un valor.</> },
  { desde: 12, hasta: 13, titulo: 'Anotar la versión', texto: <>Se guarda el número nuevo: la próxima vez estos pasos se saltan. Va en el <code>DatabaseManager</code>, al abrir la base.</> },
]

const TABS = [
  { id: 'ranuras', label: 'Ranuras', contenido: <SimuladorRanuras /> },
  { id: 'auto', label: 'Autoguardado', contenido: <CodigoPorPasos id="autoguardado" partes={[{ titulo: 'Guardar sin que el jugador lo pida', codigo: AUTOGUARDADO, pasos: PASOS_AUTO }]} /> },
  { id: 'migracion', label: 'Actualizar sin perder partidas', contenido: <CodigoPorPasos id="migracion" partes={[{ titulo: 'Migración con user_version', codigo: MIGRACION, pasos: PASOS_MIGRACION }]} /> },
]

export default function Ranuras() {
  return (
    <Slide bloque="Bloque 3 · Guardado de partidas" titulo="Ranuras y versiones">
      <Tabs tabs={TABS} label="Ranuras y versiones" />
    </Slide>
  )
}
