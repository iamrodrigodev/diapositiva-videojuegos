import { DatabaseIcon, MagnifyingGlassIcon, WarningIcon } from '@phosphor-icons/react'
import Card from '../../components/Card'
import CodeBlock from '../../components/CodeBlock'
import DataTable from '../../components/DataTable'

export default function Herramientas() {
  return (
    <div className="grid grid-cols-[2fr_3fr] gap-4 max-[900px]:grid-cols-1">
      <Card tone="cyan" title={<><MagnifyingGlassIcon aria-hidden="true" size={22} /> Ver el .db por dentro</>}>
        <p className="mt-2 text-sm leading-relaxed"><strong className="text-fg">DB Browser for SQLite</strong> es gratuito y de código abierto: abre el archivo, muestra las tablas, permite ejecutar consultas y editar datos mientras se desarrolla.</p>
        <p className="mt-3 text-sm">1. Averiguar dónde está el archivo:</p>
        <CodeBlock code={`Debug.Log(Application.persistentDataPath);
// C:\\Users\\<usuario>\\AppData\\LocalLow\\<empresa>\\<juego>`} />
        <p className="mt-3 text-sm">2. Abrir <code className="text-cyan">estacion_norte.db</code> desde el programa.</p>
        <p className="mt-3 flex gap-2 rounded-[0.4rem] border border-amber/40 bg-amber/5 p-2.5 text-sm text-fg">
          <WarningIcon aria-hidden="true" size={20} className="shrink-0 text-amber" /> Cerrar el juego antes de editar: dos programas escribiendo a la vez pueden bloquear la base.
        </p>
      </Card>
      <div className="overflow-hidden rounded-lg border border-white/15 bg-panel" role="img" aria-label="Vista de ejemplo de DB Browser for SQLite mostrando la tabla sesiones">
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
          <p className="font-mono text-xs text-muted">Tabla: <span className="text-cyan">sesiones</span> · 3 filas</p>
          <DataTable nombre="sesiones" columnas={['id', 'inicio']} filas={[[1, '2026-11-24T18:02:11'], [2, '2026-11-25T09:40:57'], [3, '2026-11-26T21:15:03']]} />
          <CodeBlock code="SELECT COUNT(*) FROM sesiones;  -- 3" />
        </div>
      </div>
    </div>
  )
}
