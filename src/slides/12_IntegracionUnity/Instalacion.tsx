import Card from '../../components/Card'
import CodeBlock from '../../components/CodeBlock'

const PASOS = [
  { hacer: 'Cambiar la compatibilidad de .NET', donde: 'Edit › Project Settings › Player › Api Compatibility Level → .NET Framework', porque: 'Mono.Data.Sqlite usa clases de .NET que el perfil por defecto no incluye.' },
  { hacer: 'Copiar las DLL de C#', donde: 'Mono.Data.Sqlite.dll y System.Data.dll → Assets/Plugins', porque: 'Son la API con la que tu código C# le habla a SQLite. Vienen dentro de la instalación de Unity.' },
  { hacer: 'Agregar el motor nativo', donde: 'Windows: sqlite3.dll de sqlite.org · Android: libsqlite3.so del paquete SQLite4Unity3d o compilado con el NDK → Assets/Plugins/<plataforma>', porque: 'El motor real de SQLite está escrito en C: hay una versión por sistema operativo.' },
  { hacer: 'Marcar las plataformas', donde: 'Seleccionar cada plugin › Inspector › casillas de plataforma', porque: 'Así Unity incluye en cada build solo la librería que esa plataforma necesita.' },
]

const ARBOL = `Assets/
└─ Plugins/
   ├─ Mono.Data.Sqlite.dll   ← API de C#
   ├─ System.Data.dll        ← su dependencia
   ├─ x86_64/
   │  └─ sqlite3.dll         ← motor para Windows
   └─ Android/libs/arm64-v8a/
      └─ libsqlite3.so       ← motor para Android`

export default function Instalacion() {
  return (
    <div className="grid grid-cols-[3fr_2fr] gap-4 max-[900px]:grid-cols-1">
      <ol className="grid gap-2.5">
        {PASOS.map((p, i) => (
          <li key={p.hacer} className="grid grid-cols-[2rem_1fr] gap-3 rounded-lg border border-white/12 bg-panel p-3">
            <span className="chamfer grid size-8 place-items-center bg-cyan font-mono font-bold text-ink">{i + 1}</span>
            <div>
              <p className="font-display font-bold text-fg">{p.hacer}</p>
              <p className="font-mono text-xs text-cyan">{p.donde}</p>
              <p className="mt-1 text-sm text-body">{p.porque}</p>
            </div>
          </li>
        ))}
      </ol>
      <Card title="Resultado en el proyecto">
        <CodeBlock code={ARBOL} label="Árbol de carpetas de Assets/Plugins" />
        <p className="mt-3 text-sm text-body">Dos piezas: la <strong className="text-fg">API en C#</strong> (igual en todas las plataformas) y el <strong className="text-fg">motor nativo</strong> (uno por plataforma).</p>
      </Card>
    </div>
  )
}
