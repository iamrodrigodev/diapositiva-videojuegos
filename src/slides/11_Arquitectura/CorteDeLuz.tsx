import { CheckCircleIcon, LightningSlashIcon } from '@phosphor-icons/react'
import Card from '../../components/Card'
import CodeBlock from '../../components/CodeBlock'

const MODOS = [
  {
    nombre: 'Rollback journal (por defecto)',
    archivo: 'estacion_norte.db-journal',
    pasos: [
      'Antes de modificar, copia las páginas originales al archivo -journal.',
      'Escribe los cambios en el .db.',
      'Al confirmar (COMMIT), borra el -journal.',
    ],
    corte: 'Si se corta la luz, al volver a abrir SQLite encuentra el -journal y restaura las páginas originales: la base queda como antes.',
  },
  {
    nombre: 'WAL (Write-Ahead Log)',
    archivo: 'estacion_norte.db-wal',
    pasos: [
      'Los cambios se agregan al final del archivo -wal; el .db no se toca.',
      'Las lecturas combinan el .db con lo que hay en el -wal.',
      'Cada cierto tiempo, un «checkpoint» pasa el -wal al .db.',
    ],
    corte: 'Si se corta la luz, lo que no llegó a confirmarse en el -wal se ignora; lo confirmado se recupera.',
  },
]

export default function CorteDeLuz() {
  return (
    <div className="grid gap-3">
      <div className="grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
        {MODOS.map((m) => (
          <Card key={m.nombre} tone="cyan" title={m.nombre}>
            <p className="mt-1 font-mono text-xs text-muted">Archivo auxiliar: {m.archivo}</p>
            <ol className="mt-2 grid gap-1.5 text-sm">
              {m.pasos.map((p, i) => (
                <li key={p} className="flex gap-2"><span className="chamfer grid size-5 shrink-0 place-items-center bg-cyan font-mono text-xs font-bold text-ink">{i + 1}</span>{p}</li>
              ))}
            </ol>
            <p className="mt-3 flex gap-2 rounded-[0.4rem] border border-coral/40 bg-coral/5 p-2.5 text-sm text-fg">
              <LightningSlashIcon aria-hidden="true" size={20} className="shrink-0 text-coral" /> {m.corte}
            </p>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3 text-sm text-body">
        <CheckCircleIcon aria-hidden="true" size={20} className="text-mint" />
        En juegos conviene WAL: lecturas y escrituras no se bloquean entre sí. Se activa una vez al abrir la conexión:
        <CodeBlock code="PRAGMA journal_mode = WAL;" />
      </div>
    </div>
  )
}
