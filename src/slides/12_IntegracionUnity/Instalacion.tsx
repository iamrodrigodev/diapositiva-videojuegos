import Card from '../../components/Card'
import CodeBlock from '../../components/CodeBlock'

const PASOS = [
  <>En <strong className="text-fg">Player Settings › Other Settings</strong>, poner <em>Api Compatibility Level</em> en <code className="text-cyan">.NET Framework</code>.</>,
  <>Copiar <code className="text-cyan">Mono.Data.Sqlite.dll</code> y <code className="text-cyan">System.Data.dll</code> desde la instalación de Unity (<code className="text-cyan">Editor/Data/MonoBleedingEdge/lib/mono/4.5</code>) a <code className="text-cyan">Assets/Plugins</code>.</>,
  <>Descargar la librería nativa precompilada de <strong className="text-fg">sqlite.org</strong> para cada plataforma destino.</>,
  <>Seleccionar cada plugin y, en el <strong className="text-fg">Inspector</strong>, marcar en qué plataforma se incluye.</>,
]

const ARBOL = `Assets/
└─ Plugins/
   ├─ Mono.Data.Sqlite.dll     ← API para C#
   ├─ System.Data.dll          ← dependencia
   ├─ x86_64/
   │  └─ sqlite3.dll           ← Windows
   └─ Android/libs/arm64-v8a/
      └─ libsqlite3.so         ← Android`

export default function Instalacion() {
  return (
    <div className="grid grid-cols-[3fr_2fr] gap-4 max-[900px]:grid-cols-1">
      <Card tone="cyan" title="Cuatro pasos">
        <ol className="mt-2 grid gap-2.5 text-sm">
          {PASOS.map((p, i) => (
            <li key={i} className="flex gap-3"><span className="chamfer grid size-6 shrink-0 place-items-center bg-cyan font-mono text-xs font-bold text-ink">{i + 1}</span><span className="leading-relaxed">{p}</span></li>
          ))}
        </ol>
      </Card>
      <Card title="Así queda el proyecto">
        <CodeBlock code={ARBOL} label="Árbol de carpetas de Assets/Plugins" />
      </Card>
    </div>
  )
}
