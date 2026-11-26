import { FloppyDiskIcon, FilmSlateIcon, InfinityIcon } from '@phosphor-icons/react'
import Card from '../../components/Card'
import CodeBlock from '../../components/CodeBlock'
import Lead from '../../components/Lead'
import Slide from '../../components/Slide'
import Tabs from '../../components/Tabs'

const RUTAS: [string, string, string][] = [
  ['Application.dataPath', 'Archivos del juego instalado (carpeta <juego>_Data en Windows).', 'Solo lectura en el build: no sirve para guardar.'],
  ['Application.streamingAssetsPath', 'Archivos que viajan dentro del build tal cual (p. ej. una base de datos inicial).', 'Solo lectura; en Android está dentro del APK.'],
  ['Application.persistentDataPath', 'Carpeta del usuario con permiso de escritura que sobrevive a las actualizaciones.', 'Sí: aquí se guardan las partidas.'],
]

const NIVELES = (
  <div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-1">
    <Card tone="coral" title={<><FilmSlateIcon aria-hidden="true" size={22} /> 1 · Escena</>}>
      <p className="mt-2 text-sm">Los campos de un <code>MonoBehaviour</code> pertenecen a un GameObject. Al cargar otra escena, Unity destruye esos objetos y sus datos.</p>
      <CodeBlock code={`class Enemigo : MonoBehaviour {
  int vidas = 3;
}
SceneManager.LoadScene("Nivel2");
// vidas se destruye`} />
    </Card>
    <Card tone="cyan" title={<><InfinityIcon aria-hidden="true" size={22} /> 2 · Sesión</>}>
      <p className="mt-2 text-sm">Con <code>DontDestroyOnLoad</code> o <code>static</code>, el dato cruza escenas. Pero sigue en RAM: al <strong>cerrar el juego</strong> se pierde.</p>
      <CodeBlock code={`class GameManager : MonoBehaviour {
  public static int puntaje;
  void Awake() =>
    DontDestroyOnLoad(gameObject);
}`} />
    </Card>
    <Card tone="mint" title={<><FloppyDiskIcon aria-hidden="true" size={22} /> 3 · Disco</>}>
      <p className="mt-2 text-sm">Se escribe en un archivo, el registro o una base de datos. <strong>Sobrevive al cierre</strong>: solo este nivel es persistencia real.</p>
      <CodeBlock code={`string ruta = Path.Combine(
  Application.persistentDataPath,
  "partida.json");
// Windows: AppData/LocalLow/...`} />
    </Card>
  </div>
)

const RUTAS_TABLA = (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse text-left text-fg [&_:is(th,td)]:border [&_:is(th,td)]:border-line [&_:is(th,td)]:px-4 [&_:is(th,td)]:py-3">
      <thead className="bg-panel font-mono text-xs text-muted uppercase">
        <tr><th scope="col">Ruta</th><th scope="col">Qué contiene</th><th scope="col">¿Sirve para guardar?</th></tr>
      </thead>
      <tbody>
        {RUTAS.map(([ruta, contiene, uso], i) => (
          <tr key={ruta} className={i === 2 ? 'bg-mint/15' : ''}>
            <th scope="row" className="font-mono text-sm font-normal text-cyan">{ruta}</th><td>{contiene}</td><td className={i === 2 ? 'text-mint' : 'text-coral'}>{uso}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const ESPECTRO = [
  { nivel: 'Nada o casi nada', juego: 'Arcade de una sesión', guarda: 'Se juega y se reinicia; como mucho, el récord.', ancho: 'w-1/12' },
  { nivel: 'Mínima', juego: 'Puzzle casual', guarda: 'Ajustes y último nivel: pocos valores sueltos.', ancho: 'w-4/12' },
  { nivel: 'Estructurada', juego: 'RPG o aventura', guarda: 'Ranuras de partida, inventario, misiones y puntajes.', ancho: 'w-8/12' },
  { nivel: 'Compartida', juego: 'Juego online', guarda: 'Cuentas, rankings globales y progreso entre dispositivos.', ancho: 'w-full' },
]

const CUANDO = (
  <div className="grid gap-3">
    <p className="text-body">Casi todo juego persiste algo, pero <strong className="text-fg">no todo juego necesita una base de datos</strong>: depende de cuántos datos hay y de cómo se usan.</p>
    <ol className="grid gap-2.5">
      {ESPECTRO.map((paso) => (
        <li key={paso.nivel} className="grid grid-cols-[13rem_1fr] items-center gap-4 rounded-lg border border-white/12 bg-panel px-4 py-3 max-[760px]:grid-cols-1">
          <div>
            <p className="font-mono text-xs text-muted">{paso.juego}</p>
            <p className="font-display text-lg font-bold text-fg">{paso.nivel}</p>
          </div>
          <div>
            <div className="h-2 rounded-full bg-well"><div className={`h-2 rounded-full bg-amber ${paso.ancho}`} /></div>
            <p className="mt-1.5 text-sm text-body">{paso.guarda}</p>
          </div>
        </li>
      ))}
    </ol>
    <p className="font-mono text-sm text-amber">Estación Norte está en «Estructurada»: ranuras, inventario y top 10 en un solo dispositivo.</p>
  </div>
)

const TABS = [
  { id: 'niveles', label: 'Los tres niveles de vida', contenido: NIVELES },
  { id: 'rutas', label: 'Rutas de Unity: ¿dónde escribir?', contenido: RUTAS_TABLA },
  { id: 'cuando', label: '¿Todo juego necesita base de datos?', contenido: CUANDO },
]

export default function Persistencia() {
  return (
    <Slide bloque="Bloque 1 · Contexto" titulo="La vida de un dato">
      <Lead>
        Todo lo que está en RAM desaparece en algún momento. <strong>Persistir</strong> es escribirlo en almacenamiento permanente para que <strong>sobreviva al cierre del juego</strong>.
      </Lead>
      <Tabs tabs={TABS} label="Persistencia en Unity" />
    </Slide>
  )
}
