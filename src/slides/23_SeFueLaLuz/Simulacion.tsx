import { ArrowClockwiseIcon, CheckCircleIcon, FloppyDiskIcon, LightningSlashIcon, PlugIcon, WarningIcon } from '@phosphor-icons/react'
import { useEffect } from 'react'
import DataTable from '../../components/DataTable'
import { sonido } from '../../lib/sonido'
import { usePersistentState } from '../../lib/usePersistentState'

type Disco = { nivel: number; checkpoint: string; inventario: [string, number][] }
type Fase = 'listo' | 'escribiendo' | 'cortado' | 'recuperado' | 'terminado'

const ANTES: Disco = { nivel: 7, checkpoint: 'Estación norte', inventario: [['Linterna', 1], ['Botiquín', 2]] }

const OPERACIONES: { sql: string; aplicar: (d: Disco) => Disco }[] = [
  { sql: "UPDATE partidas SET nivel = 8, checkpoint = 'Faro'", aplicar: (d) => ({ ...d, nivel: 8, checkpoint: 'Faro' }) },
  { sql: 'DELETE FROM inventario WHERE partida_id = 1', aplicar: (d) => ({ ...d, inventario: [] }) },
  { sql: "INSERT INTO inventario VALUES (1, 'Linterna', 1)", aplicar: (d) => ({ ...d, inventario: [...d.inventario, ['Linterna', 1]] }) },
  { sql: "INSERT INTO inventario VALUES (1, 'Llave roja', 1)", aplicar: (d) => ({ ...d, inventario: [...d.inventario, ['Llave roja', 1]] }) },
]

const aplicarHasta = (k: number) => OPERACIONES.slice(0, k).reduce((d, op) => op.aplicar(d), ANTES)

function VistaDisco({ disco }: { disco: Disco }) {
  return (
    <div className="grid gap-2">
      <DataTable nombre="partidas (en disco)" columnas={['nivel', 'checkpoint']} filas={[[disco.nivel, disco.checkpoint]]} />
      <DataTable nombre="inventario (en disco)" columnas={['item', 'cantidad']} filas={disco.inventario.length ? disco.inventario : [['—', '—']]} />
    </div>
  )
}

const boton = 'flex min-h-11 items-center gap-2 rounded-[0.4rem] px-5 font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan disabled:opacity-30'

export default function Simulacion() {
  const [fase, setFase] = usePersistentState<Fase>('luz:fase', 'listo')
  const [hechas, setHechas] = usePersistentState('luz:hechas', 0)

  useEffect(() => {
    if (fase !== 'escribiendo') return
    const t = window.setInterval(() => setHechas((k) => Math.min(k + 1, OPERACIONES.length)), 1100)
    return () => window.clearInterval(t)
  }, [fase, setHechas])

  useEffect(() => {
    if (fase === 'escribiendo' && hechas >= OPERACIONES.length) { setFase('terminado'); sonido.acierto() }
  }, [fase, hechas, setFase])

  const sinTx = aplicarHasta(hechas)
  const conTx = fase === 'terminado' ? aplicarHasta(OPERACIONES.length) : ANTES
  const corrupta = hechas > 0 && hechas < OPERACIONES.length

  const empezar = () => { setHechas(0); setFase('escribiendo') }
  const cortar = () => { setFase('cortado'); sonido.error() }
  const encender = () => setFase('recuperado')

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={empezar} disabled={fase === 'escribiendo'} className={`${boton} chamfer bg-mint text-ink hover:brightness-110`}><FloppyDiskIcon aria-hidden="true" size={18} /> Guardar partida</button>
        <button type="button" onClick={cortar} disabled={fase !== 'escribiendo'} className={`${boton} chamfer bg-coral text-ink hover:brightness-110`}><LightningSlashIcon aria-hidden="true" size={18} /> Cortar la luz</button>
        <button type="button" onClick={encender} disabled={fase !== 'cortado'} className={`${boton} border border-amber text-amber hover:bg-amber/10`}><PlugIcon aria-hidden="true" size={18} /> Volver a encender</button>
        {fase !== 'listo' && fase !== 'escribiendo' && <button type="button" onClick={() => { setFase('listo'); setHechas(0) }} className={`${boton} border border-white/20 text-fg hover:bg-white/5`}><ArrowClockwiseIcon aria-hidden="true" size={18} /> Reiniciar</button>}
      </div>

      <ol className="grid grid-cols-4 gap-2 font-mono text-[0.72rem] max-[900px]:grid-cols-2">
        {OPERACIONES.map((op, i) => (
          <li key={op.sql} className={`rounded-[0.4rem] border p-2 ${i < hechas ? 'border-mint/50 bg-mint/10 text-fg' : fase === 'escribiendo' && i === hechas ? 'animate-pulse border-amber text-amber' : fase === 'cortado' || fase === 'recuperado' ? 'border-coral/40 text-muted line-through' : 'border-white/12 text-muted'}`}>
            <span className="text-muted">{i + 1}.</span> {op.sql}
          </li>
        ))}
      </ol>

      <div className={`grid grid-cols-2 gap-4 max-[900px]:grid-cols-1 ${fase === 'cortado' ? 'opacity-40 grayscale' : ''}`}>
        <section className="grid content-start gap-2 rounded-lg border border-coral/45 bg-panel p-4">
          <p className="flex items-center gap-2 font-display text-lg font-bold text-coral"><WarningIcon aria-hidden="true" size={22} /> Sin transacción</p>
          <p className="text-sm text-body">Cada orden se escribe en disco apenas se ejecuta.</p>
          <VistaDisco disco={sinTx} />
          {fase === 'recuperado' && (corrupta
            ? <p className="rounded-[0.4rem] border border-coral bg-coral/15 p-2.5 text-sm font-bold text-coral">Partida corrupta: dice nivel {sinTx.nivel} en «{sinTx.checkpoint}», pero el inventario quedó a medias.</p>
            : <p className="text-sm text-body">El corte llegó {hechas === 0 ? 'antes de escribir nada' : 'al final'}: esta vez hubo suerte.</p>)}
        </section>
        <section className="grid content-start gap-2 rounded-lg border border-mint/45 bg-panel p-4">
          <p className="flex items-center gap-2 font-display text-lg font-bold text-mint"><CheckCircleIcon aria-hidden="true" size={22} /> Con transacción</p>
          <p className="text-sm text-body">Las órdenes esperan en el diario; el disco cambia solo con <code className="text-mint">COMMIT</code>.</p>
          <VistaDisco disco={conTx} />
          {fase === 'escribiendo' && <p className="font-mono text-xs text-amber">En el diario: {hechas} de {OPERACIONES.length} cambios pendientes…</p>}
          {fase === 'terminado' && <p className="text-sm text-mint">COMMIT: los 4 cambios entraron juntos.</p>}
          {fase === 'recuperado' && <p className="rounded-[0.4rem] border border-mint bg-mint/15 p-2.5 text-sm font-bold text-mint">Al reabrir, SQLite descartó el diario incompleto: la partida anterior sigue intacta.</p>}
        </section>
      </div>
    </div>
  )
}
