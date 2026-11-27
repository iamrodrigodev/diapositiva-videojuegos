import { ArrowRightIcon, FolderLockIcon, FolderOpenIcon } from '@phosphor-icons/react'
import Card from '../../components/Card'
import CodeBlock from '../../components/CodeBlock'

const RUTAS: [string, string][] = [
  ['Windows', 'C:\\Users\\<usuario>\\AppData\\LocalLow\\<empresa>\\<juego>\\'],
  ['Android', '/storage/emulated/0/Android/data/<paquete>/files/'],
  ['iOS', '<carpeta de la app>/Documents/'],
]

export default function Ubicacion() {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-3 max-[900px]:grid-cols-1">
        <Card title={<><FolderLockIcon aria-hidden="true" size={22} /> StreamingAssets</>}>
          <p className="mt-2 text-sm">Viene <strong className="text-fg">dentro del build</strong>. Sirve para traer una base con datos iniciales (niveles, objetos).</p>
          <p className="mt-2 font-mono text-sm text-coral">Solo lectura · en Android está dentro del APK</p>
        </Card>
        <div className="flex flex-col items-center justify-center gap-1 px-2 text-center font-mono text-xs text-amber">
          <ArrowRightIcon aria-hidden="true" size={32} />
          se copia una vez<br />al primer arranque
        </div>
        <Card tone="mint" title={<><FolderOpenIcon aria-hidden="true" size={22} /> persistentDataPath</>}>
          <p className="mt-2 text-sm">Carpeta del jugador. Aquí vive el <code className="text-mint">estacion_norte.db</code> que el juego lee y modifica.</p>
          <p className="mt-2 font-mono text-sm text-mint">Lectura y escritura · sobrevive a las actualizaciones</p>
        </Card>
      </div>
      <div className="grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
        <Card title="La copia en código (una corrutina)">
          <CodeBlock code={`IEnumerator CopiarBaseInicial() {
  string destino = Path.Combine(Application.persistentDataPath, "estacion_norte.db");
  if (File.Exists(destino)) yield break;
  string origen = Path.Combine(Application.streamingAssetsPath, "estacion_norte.db");
  using var req = UnityWebRequest.Get(origen);  // en Android se lee como descarga
  yield return req.SendWebRequest();
  if (req.result != UnityWebRequest.Result.Success) yield break;
  File.WriteAllBytes(destino, req.downloadHandler.data);
}
// antes de abrir la base: yield return CopiarBaseInicial();`} />
          <p className="mt-2 text-sm text-body">Debe terminar antes de abrir la conexión: Open() crearía un .db vacío y la copia ya no se haría. ¿Sin base inicial? No se copia nada: SQLite crea el archivo al abrir.</p>
        </Card>
        <Card title="¿Dónde queda en cada sistema?">
          <ul className="mt-2 grid gap-2 text-sm">
            {RUTAS.map(([so, ruta]) => (
              <li key={so}><strong className="text-fg">{so}</strong><br /><code className="font-mono text-xs break-all text-cyan">{ruta}</code></li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}
