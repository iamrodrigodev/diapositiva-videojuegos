import { FloppyDiskIcon, FilmSlateIcon, InfinityIcon } from '@phosphor-icons/react'
import Card from '../../components/Card'
import CodeBlock from '../../components/CodeBlock'
import Lead from '../../components/Lead'
import Reveal from '../../components/Reveal'
import Slide from '../../components/Slide'

export default function Persistencia() {
  return (
    <Slide bloque="Bloque 1 · Contexto" titulo="Persistencia en Unity: ¿cuánto vive un dato?">
      <Lead>
        En Unity, cada dato tiene una <strong>vida útil</strong>. Persistir es llevarlo al último nivel: que <strong>sobreviva al cierre del juego</strong>.
      </Lead>
      <Reveal className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-1">
        <Card tone="red" title={<><FilmSlateIcon aria-hidden="true" size={22} /> 1 · Escena</>}>
          <p className="mt-2 text-sm">Campos de un <code>MonoBehaviour</code>. Mueren al cargar otra escena.</p>
          <CodeBlock code={`public class Enemigo : MonoBehaviour {
  int vidas = 3;
}
SceneManager.LoadScene("Nivel2");
// vidas se destruye`} />
        </Card>
        <Card tone="blue" title={<><InfinityIcon aria-hidden="true" size={22} /> 2 · Sesión</>}>
          <p className="mt-2 text-sm">Objetos que cruzan escenas. Mueren al <strong>cerrar el juego</strong>.</p>
          <CodeBlock code={`public class GameManager : MonoBehaviour {
  public static int puntaje;
  void Awake() {
    DontDestroyOnLoad(gameObject);
  }
}`} />
        </Card>
        <Card tone="emerald" title={<><FloppyDiskIcon aria-hidden="true" size={22} /> 3 · Disco</>}>
          <p className="mt-2 text-sm">Escrito fuera de la RAM. <strong>Sobrevive al cierre</strong>: esto es persistencia.</p>
          <CodeBlock code={`// carpeta segura por plataforma
Application.persistentDataPath
// Windows:
// AppData/LocalLow/<empresa>/<juego>`} />
        </Card>
      </Reveal>
    </Slide>
  )
}
