import { CheckCircleIcon, XCircleIcon } from '@phosphor-icons/react'
import Card from '../../components/Card'
import CodeBlock from '../../components/CodeBlock'
import Lead from '../../components/Lead'
import Slide from '../../components/Slide'
import Tabs from '../../components/Tabs'
import Herramientas from './Herramientas'
import Instalacion from './Instalacion'
import Orm from './Orm'

const UBICACION = (
  <div className="grid grid-cols-[3fr_2fr] gap-4 max-[900px]:grid-cols-1">
    <Card tone="cyan" title="Copiar una base inicial al primer arranque">
      <p className="mt-2 text-sm leading-relaxed">El juego puede traer un <code>.db</code> con datos de fábrica en <code>StreamingAssets</code>, pero esa carpeta es de solo lectura. Al primer arranque se copia a <code>persistentDataPath</code>; en Android hay que leerla con <code>UnityWebRequest</code> porque está dentro del APK.</p>
      <CodeBlock code={`string destino = Path.Combine(Application.persistentDataPath, "estacion_norte.db");
if (!File.Exists(destino)) {
  string origen = Path.Combine(Application.streamingAssetsPath, "estacion_norte.db");
  using var req = UnityWebRequest.Get(origen);
  yield return req.SendWebRequest();
  File.WriteAllBytes(destino, req.downloadHandler.data);
}`} />
    </Card>
    <Card title="¿Y si no hay base inicial?">
      <p className="mt-2 text-sm leading-relaxed">No hace falta copiar nada: al abrir la conexión, SQLite <strong className="text-fg">crea el archivo vacío</strong> en la ruta indicada y el juego crea sus tablas (diapositiva siguiente).</p>
    </Card>
  </div>
)

const PLATAFORMAS: [string, boolean, string][] = [
  ['Windows · macOS · Linux', true, 'Librería nativa sqlite3 por sistema'],
  ['Android', true, 'libsqlite3.so por arquitectura (ARM64, ARMv7)'],
  ['iOS', true, 'SQLite ya viene en el sistema'],
  ['WebGL', false, 'El navegador no carga librerías nativas ni tiene un sistema de archivos real: se usa PlayerPrefs, JSON o un servidor'],
]

const PLATAFORMAS_TABLA = (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse text-left text-fg [&_:is(th,td)]:border [&_:is(th,td)]:border-line [&_:is(th,td)]:px-4 [&_:is(th,td)]:py-3">
      <thead className="bg-panel font-mono text-xs text-muted uppercase">
        <tr><th scope="col">Plataforma</th><th scope="col">¿SQLite nativo?</th><th scope="col">Qué se necesita</th></tr>
      </thead>
      <tbody>
        {PLATAFORMAS.map(([nombre, ok, nota]) => (
          <tr key={nombre} className={ok ? '' : 'bg-coral/10'}>
            <th scope="row" className="font-display font-bold">{nombre}</th>
            <td>{ok ? <span className="flex items-center gap-1.5 text-mint"><CheckCircleIcon aria-hidden="true" size={18} /> Sí</span> : <span className="flex items-center gap-1.5 text-coral"><XCircleIcon aria-hidden="true" size={18} /> No</span>}</td>
            <td className="text-sm">{nota}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const TABS = [
  { id: 'orm', label: 'ADO.NET u ORM', contenido: <Orm /> },
  { id: 'instalar', label: 'Instalación', contenido: <Instalacion /> },
  { id: 'ubicacion', label: '¿Dónde vive el .db?', contenido: UBICACION },
  { id: 'plataformas', label: 'Plataformas', contenido: PLATAFORMAS_TABLA },
  { id: 'herramientas', label: 'Herramientas', contenido: <Herramientas /> },
]

export default function IntegracionUnity() {
  return (
    <Slide bloque="Bloque 2 · SQLite en Unity" titulo="Integrar SQLite en Unity">
      <Lead>Elegir cómo hablarle (SQL a mano u <strong>ORM</strong>), instalar el <strong>plugin</strong> y saber dónde vive el archivo.</Lead>
      <Tabs tabs={TABS} label="Integración en Unity" />
    </Slide>
  )
}
