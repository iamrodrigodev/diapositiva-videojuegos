import { FloppyDiskIcon, FilmSlateIcon, InfinityIcon } from '@phosphor-icons/react'
import Card from '../../components/Card'
import CodeBlock from '../../components/CodeBlock'
import Lead from '../../components/Lead'
import Reveal from '../../components/Reveal'
import Slide from '../../components/Slide'

const RUTAS: [string, string, string][] = [
  ['Application.dataPath', 'Archivos del juego instalado (carpeta <juego>_Data en Windows).', 'Solo lectura en el build: no sirve para guardar.'],
  ['Application.streamingAssetsPath', 'Archivos que viajan dentro del build tal cual (p. ej. una base de datos inicial).', 'Solo lectura; en Android está dentro del APK.'],
  ['Application.persistentDataPath', 'Carpeta del usuario con permiso de escritura que sobrevive a las actualizaciones.', 'Aquí se guardan las partidas.'],
]

export default function Persistencia() {
  return (
    <Slide bloque="Bloque 1 · Contexto" titulo="Persistencia en Unity: ¿cuánto vive un dato?">
      <Lead>
        Todo lo que el juego tiene en memoria RAM desaparece en algún momento. <strong>Persistir</strong> es escribir los datos en almacenamiento permanente para que <strong>sobrevivan al cierre del juego</strong> y se puedan leer en la siguiente sesión. En Unity, un dato puede vivir en tres niveles:
      </Lead>
      <Reveal className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-1">
        <Card tone="coral" title={<><FilmSlateIcon aria-hidden="true" size={22} /> 1 · Escena</>}>
          <p className="mt-2 text-sm">Los campos de un <code>MonoBehaviour</code> pertenecen a un GameObject. Al cargar otra escena, Unity destruye esos objetos y sus datos con ellos.</p>
          <CodeBlock code={`public class Enemigo : MonoBehaviour {
  int vidas = 3;
}
SceneManager.LoadScene("Nivel2");
// vidas se destruye`} />
        </Card>
        <Card tone="cyan" title={<><InfinityIcon aria-hidden="true" size={22} /> 2 · Sesión</>}>
          <p className="mt-2 text-sm">Con <code>DontDestroyOnLoad</code> o un campo <code>static</code>, el dato cruza escenas. Pero sigue en RAM: al <strong>cerrar el juego</strong> se pierde.</p>
          <CodeBlock code={`public class GameManager : MonoBehaviour {
  public static int puntaje;
  void Awake() {
    DontDestroyOnLoad(gameObject);
  }
}`} />
        </Card>
        <Card tone="mint" title={<><FloppyDiskIcon aria-hidden="true" size={22} /> 3 · Disco</>}>
          <p className="mt-2 text-sm">El dato se escribe en un archivo, el registro o una base de datos. <strong>Sobrevive al cierre</strong>: solo este nivel es persistencia real.</p>
          <CodeBlock code={`string ruta = Path.Combine(
  Application.persistentDataPath,
  "partida.json");
// Windows: AppData/LocalLow/<empresa>/<juego>`} />
        </Card>
      </Reveal>
      <Reveal className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm text-fg [&_:is(th,td)]:border [&_:is(th,td)]:border-line [&_:is(th,td)]:px-3 [&_:is(th,td)]:py-1.5">
          <caption className="pb-2 text-left font-mono text-xs tracking-[0.19em] text-muted uppercase">Las tres rutas de Unity: ¿dónde se puede escribir?</caption>
          <thead className="bg-panel font-mono text-xs text-muted">
            <tr><th scope="col">Ruta</th><th scope="col">Qué contiene</th><th scope="col">¿Sirve para guardar?</th></tr>
          </thead>
          <tbody>
            {RUTAS.map(([ruta, contiene, uso], i) => (
              <tr key={ruta} className={i === 2 ? 'bg-mint/15' : ''}>
                <th scope="row" className="font-mono font-normal text-cyan">{ruta}</th><td>{contiene}</td><td>{uso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </Slide>
  )
}
