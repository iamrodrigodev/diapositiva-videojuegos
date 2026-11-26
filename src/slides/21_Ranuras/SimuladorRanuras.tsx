import { DownloadSimpleIcon, FloppyDiskIcon, HeartIcon, MapPinIcon, MinusIcon, PlusIcon, TerminalWindowIcon, TrashIcon } from '@phosphor-icons/react'
import { sonido } from '../../lib/sonido'
import { usePersistentState } from '../../lib/usePersistentState'

type Estado = { nivel: number; vida: number; checkpoint: string }
type Ranura = (Estado & { hora: string }) | null

const CHECKPOINTS = ['Muelle sur', 'Estación norte', 'Faro', 'Búnker']
const INICIAL: Estado = { nivel: 3, vida: 80, checkpoint: 'Estación norte' }
const hora = () => new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })

const boton = 'flex min-h-9 flex-1 items-center justify-center gap-1.5 rounded-[0.4rem] border px-2 text-sm focus-visible:outline-2 focus-visible:outline-cyan disabled:opacity-30'
const ajuste = 'grid size-7 place-items-center rounded-[0.3rem] border border-white/20 text-fg hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-cyan'

export default function SimuladorRanuras() {
  const [actual, setActual] = usePersistentState<Estado>('ranuras:actual', INICIAL)
  const [ranuras, setRanuras] = usePersistentState<Ranura[]>('ranuras:lista', [null, null, null])
  const [log, setLog] = usePersistentState<string[]>('ranuras:log', [])

  const registrar = (sql: string) => setLog((l) => [sql, ...l].slice(0, 4))
  const cambiar = (campo: 'nivel' | 'vida', delta: number) =>
    setActual((e) => ({ ...e, [campo]: Math.min(campo === 'nivel' ? 9 : 100, Math.max(1, e[campo] + delta)) }))

  const guardar = (i: number) => {
    setRanuras((r) => r.map((x, k) => (k === i ? { ...actual, hora: hora() } : x)))
    registrar(`INSERT INTO partidas … VALUES (1, ${i + 1}, ${actual.nivel}, '${actual.checkpoint}', ${actual.vida}, …) ON CONFLICT DO UPDATE …`)
    sonido.acierto()
  }
  const cargar = (i: number) => {
    const r = ranuras[i]
    if (!r) return
    setActual({ nivel: r.nivel, vida: r.vida, checkpoint: r.checkpoint })
    registrar(`SELECT id, nivel, checkpoint, vida FROM partidas WHERE jugador_id = 1 AND ranura = ${i + 1}  → 1 fila`)
    sonido.pista()
  }
  const borrar = (i: number) => {
    setRanuras((r) => r.map((x, k) => (k === i ? null : x)))
    registrar(`DELETE FROM partidas WHERE jugador_id = 1 AND ranura = ${i + 1}  → su inventario se borra en cascada`)
    sonido.error()
  }

  return (
    <div className="grid grid-cols-[minmax(15rem,1fr)_3fr] gap-4 max-[900px]:grid-cols-1">
      <section className="grid content-start gap-3 rounded-lg border border-amber/45 bg-panel p-4">
        <p className="font-mono text-xs tracking-[0.2em] text-amber uppercase">Partida en curso</p>
        <p className="flex items-center justify-between text-fg"><span>Nivel</span><span className="flex items-center gap-2"><button type="button" aria-label="Bajar nivel" onClick={() => cambiar('nivel', -1)} className={ajuste}><MinusIcon size={14} /></button><strong className="w-6 text-center font-mono">{actual.nivel}</strong><button type="button" aria-label="Subir nivel" onClick={() => cambiar('nivel', 1)} className={ajuste}><PlusIcon size={14} /></button></span></p>
        <p className="flex items-center justify-between text-fg"><span className="flex items-center gap-1.5"><HeartIcon aria-hidden="true" size={16} className="text-coral" /> Vida</span><span className="flex items-center gap-2"><button type="button" aria-label="Bajar vida" onClick={() => cambiar('vida', -10)} className={ajuste}><MinusIcon size={14} /></button><strong className="w-8 text-center font-mono">{actual.vida}</strong><button type="button" aria-label="Subir vida" onClick={() => cambiar('vida', 10)} className={ajuste}><PlusIcon size={14} /></button></span></p>
        <label className="grid gap-1 text-fg">
          <span className="flex items-center gap-1.5"><MapPinIcon aria-hidden="true" size={16} className="text-mint" /> Checkpoint</span>
          <select value={actual.checkpoint} onChange={(e) => setActual({ ...actual, checkpoint: e.target.value })} className="min-h-9 rounded-[0.4rem] border border-white/20 bg-well px-2 text-sm text-fg focus-visible:outline-2 focus-visible:outline-cyan">
            {CHECKPOINTS.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        <p className="text-xs text-muted">Cambia la partida, guárdala en una ranura y prueba cargar otra.</p>
      </section>

      <div className="grid gap-3">
        <div className="grid grid-cols-3 gap-3 max-[700px]:grid-cols-1">
          {ranuras.map((r, i) => (
            <section key={i} className={`grid gap-2 rounded-lg border p-3 ${r ? 'border-mint/50 bg-mint/5' : 'border-dashed border-white/20 bg-panel'}`}>
              <p className="font-display text-lg font-bold text-fg">Ranura {i + 1}</p>
              {r
                ? <p className="text-sm text-body">Nivel <strong className="text-fg">{r.nivel}</strong> · Vida <strong className="text-fg">{r.vida}</strong><br />{r.checkpoint}<br /><span className="font-mono text-xs text-muted">guardada {r.hora}</span></p>
                : <p className="text-sm text-muted">Vacía</p>}
              <div className="flex gap-1.5">
                <button type="button" onClick={() => guardar(i)} className={`${boton} border-mint/50 text-mint hover:bg-mint/10`}><FloppyDiskIcon aria-hidden="true" size={16} /> Guardar</button>
                <button type="button" onClick={() => cargar(i)} disabled={!r} className={`${boton} border-cyan/50 text-cyan hover:bg-cyan/10`}><DownloadSimpleIcon aria-hidden="true" size={16} /> Cargar</button>
                <button type="button" onClick={() => borrar(i)} disabled={!r} aria-label={`Borrar ranura ${i + 1}`} className={`${boton} max-w-10 border-coral/50 text-coral hover:bg-coral/10`}><TrashIcon aria-hidden="true" size={16} /></button>
              </div>
            </section>
          ))}
        </div>
        <section aria-live="polite" className="rounded-lg border border-white/12 bg-well p-3 font-mono text-xs">
          <p className="mb-1.5 flex items-center gap-1.5 text-muted"><TerminalWindowIcon aria-hidden="true" size={14} /> SQL ejecutado</p>
          {log.length
            ? <ol className="grid gap-1">{log.map((l, i) => <li key={`${i}-${l}`} className={i === 0 ? 'text-fg' : 'text-muted/70'}>{l}</li>)}</ol>
            : <p className="text-muted/70">Aún no se ejecutó nada.</p>}
        </section>
      </div>
    </div>
  )
}
