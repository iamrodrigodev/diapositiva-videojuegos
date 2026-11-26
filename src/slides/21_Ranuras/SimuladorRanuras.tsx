import { DownloadSimpleIcon, FloppyDiskIcon, GameControllerIcon, TrashIcon } from '@phosphor-icons/react'
import { sonido } from '../../lib/sonido'
import { usePersistentState } from '../../lib/usePersistentState'

type Estado = { nivel: number; vida: number; lugar: string }
type Ranura = (Estado & { hora: string }) | null

const LUGARES = ['Muelle sur', 'Estación norte', 'Faro', 'Búnker', 'Cumbre']
const INICIAL: Estado = { nivel: 3, vida: 80, lugar: 'Estación norte' }
const hora = () => new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })

const boton = 'flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-[0.4rem] border px-2 font-bold focus-visible:outline-2 focus-visible:outline-cyan disabled:opacity-25'

export default function SimuladorRanuras() {
  const [actual, setActual] = usePersistentState<Estado>('ranuras2:actual', INICIAL)
  const [ranuras, setRanuras] = usePersistentState<Ranura[]>('ranuras2:lista', [null, null, null])
  const [aviso, setAviso] = usePersistentState<{ texto: string; sql: string } | null>('ranuras2:aviso', null)

  const jugar = () => {
    setActual((e) => ({ nivel: Math.min(9, e.nivel + 1), vida: Math.max(10, Math.min(100, e.vida + (Math.random() > 0.5 ? 15 : -25))), lugar: LUGARES[(LUGARES.indexOf(e.lugar) + 1) % LUGARES.length]! }))
    setAviso({ texto: 'Avanzaste en el juego. Esto todavía está solo en memoria: si cierras ahora, se pierde.', sql: '' })
  }
  const guardar = (i: number) => {
    const ocupada = ranuras[i] !== null
    setRanuras((r) => r.map((x, k) => (k === i ? { ...actual, hora: hora() } : x)))
    setAviso({ texto: ocupada ? `Ranura ${i + 1} sobrescrita con tu partida actual.` : `Partida guardada en la ranura ${i + 1}.`, sql: `INSERT … ON CONFLICT DO UPDATE  (ranura ${i + 1})` })
    sonido.acierto()
  }
  const cargar = (i: number) => {
    const r = ranuras[i]
    if (!r) return
    setActual({ nivel: r.nivel, vida: r.vida, lugar: r.lugar })
    setAviso({ texto: `Cargaste la ranura ${i + 1}: vuelves al nivel ${r.nivel} en ${r.lugar}.`, sql: `SELECT … WHERE ranura = ${i + 1}` })
    sonido.pista()
  }
  const borrar = (i: number) => {
    setRanuras((r) => r.map((x, k) => (k === i ? null : x)))
    setAviso({ texto: `Ranura ${i + 1} borrada, junto con su inventario.`, sql: `DELETE … WHERE ranura = ${i + 1}` })
    sonido.error()
  }

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center gap-4 rounded-lg border border-amber/45 bg-panel p-4">
        <GameControllerIcon aria-hidden="true" size={36} className="text-amber" />
        <div className="flex-1">
          <p className="font-mono text-xs tracking-[0.2em] text-amber uppercase">Tu partida ahora</p>
          <p className="font-display text-2xl font-bold text-fg">Nivel {actual.nivel} · {actual.lugar} · ❤ {actual.vida}</p>
        </div>
        <button type="button" onClick={jugar} className="chamfer flex min-h-11 items-center gap-2 bg-amber px-5 font-bold text-ink hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan">
          <GameControllerIcon aria-hidden="true" size={18} /> Jugar un rato
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 max-[800px]:grid-cols-1">
        {ranuras.map((r, i) => (
          <section key={i} className={`grid gap-3 rounded-lg border-2 p-4 ${r ? 'border-violet/60 bg-violet/5' : 'border-dashed border-white/20 bg-panel'}`}>
            <p className="font-display text-xl font-bold text-fg">Ranura {i + 1}</p>
            {r
              ? <p className="text-body">Nivel <strong className="text-fg">{r.nivel}</strong> · {r.lugar} · ❤ {r.vida}<br /><span className="font-mono text-xs text-muted">guardada a las {r.hora}</span></p>
              : <p className="text-muted">— Vacía —</p>}
            <div className="flex gap-2">
              <button type="button" onClick={() => guardar(i)} className={`${boton} border-mint/60 text-mint hover:bg-mint/10`}><FloppyDiskIcon aria-hidden="true" size={18} /> Guardar</button>
              <button type="button" onClick={() => cargar(i)} disabled={!r} className={`${boton} border-cyan/60 text-cyan hover:bg-cyan/10`}><DownloadSimpleIcon aria-hidden="true" size={18} /> Cargar</button>
              <button type="button" onClick={() => borrar(i)} disabled={!r} aria-label={`Borrar ranura ${i + 1}`} className={`${boton} max-w-11 border-coral/60 text-coral hover:bg-coral/10`}><TrashIcon aria-hidden="true" size={18} /></button>
            </div>
          </section>
        ))}
      </div>

      <p role="status" className="min-h-12 rounded-lg border border-white/12 bg-well px-4 py-3 text-lg text-fg">
        {aviso ? <>{aviso.texto}{aviso.sql && <span className="ml-2 font-mono text-xs text-muted">{aviso.sql}</span>}</> : 'Pulsa «Jugar un rato», guarda en una ranura, sigue jugando y luego carga: vuelves a donde guardaste.'}
      </p>
      <p className="text-sm text-muted">Cada ranura es <strong className="text-body">una fila</strong> de la tabla <code className="text-violet">partidas</code>: por eso guardar en una ranura ocupada la reemplaza (UNIQUE de la diapositiva 18).</p>
    </div>
  )
}
