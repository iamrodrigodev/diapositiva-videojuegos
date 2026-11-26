import { DatabaseIcon } from '@phosphor-icons/react'
import CodeBlock from '../../components/CodeBlock'
import DataTable from '../../components/DataTable'

const PASOS = [
  { titulo: 'Instalar DB Browser for SQLite', texto: 'Programa gratuito y de código abierto (sqlitebrowser.org) para mirar y editar bases SQLite.' },
  { titulo: 'Encontrar el archivo', texto: 'Imprimir la ruta desde Unity y abrir esa carpeta:', codigo: 'Debug.Log(Application.persistentDataPath);' },
  { titulo: 'Abrir estacion_norte.db', texto: 'En «Hoja de datos» se ven las tablas; en «Ejecutar SQL» se prueban consultas antes de ponerlas en el código.' },
  { titulo: 'Cerrar el juego antes de editar', texto: 'Si el juego y el programa escriben a la vez, la base puede quedar bloqueada.' },
]

export default function Herramientas() {
  return (
    <div className="grid grid-cols-[2fr_3fr] gap-4 max-[900px]:grid-cols-1">
      <ol className="grid content-start gap-2.5">
        {PASOS.map((p, i) => (
          <li key={p.titulo} className="grid grid-cols-[2rem_1fr] gap-3 rounded-lg border border-white/12 bg-panel p-3">
            <span className="chamfer grid size-8 place-items-center bg-cyan font-mono font-bold text-ink">{i + 1}</span>
            <div className="text-sm">
              <p className="font-display text-base font-bold text-fg">{p.titulo}</p>
              <p className="mt-0.5 text-body">{p.texto}</p>
              {p.codigo && <CodeBlock code={p.codigo} />}
            </div>
          </li>
        ))}
      </ol>
      <div className="self-start overflow-hidden rounded-lg border border-white/15 bg-panel" role="img" aria-label="Vista de ejemplo de DB Browser for SQLite mostrando la tabla sesiones">
        <div className="flex items-center gap-2 border-b border-white/10 bg-well px-3 py-2 font-mono text-xs text-muted">
          <span className="size-2.5 rounded-full bg-coral" /><span className="size-2.5 rounded-full bg-amber" /><span className="size-2.5 rounded-full bg-mint" />
          <DatabaseIcon aria-hidden="true" size={14} className="ml-2 text-cyan" /> DB Browser for SQLite — estacion_norte.db
        </div>
        <div className="flex gap-1 border-b border-white/10 px-3 pt-2 text-xs">
          {['Estructura', 'Hoja de datos', 'Ejecutar SQL'].map((t, i) => (
            <span key={t} className={`rounded-t-[0.3rem] px-3 py-1.5 ${i === 1 ? 'bg-well text-fg' : 'text-muted'}`}>{t}</span>
          ))}
        </div>
        <div className="grid gap-3 p-3">
          <DataTable nombre="sesiones" columnas={['id', 'inicio']} filas={[[1, '2026-11-24T18:02:11'], [2, '2026-11-25T09:40:57'], [3, '2026-11-26T21:15:03']]} />
          <CodeBlock code="SELECT COUNT(*) FROM sesiones;  -- 3" />
        </div>
      </div>
    </div>
  )
}
