import { TrophyIcon } from '@phosphor-icons/react'
import { PUNTAJES_EJEMPLO } from '../../data/rankingEjemplo'
import { usePersistentState } from '../../lib/usePersistentState'

type Periodo = 'todo' | 'semana' | 'hoy'
const PERIODOS: { id: Periodo; texto: string; dias: number; sql: string }[] = [
  { id: 'todo', texto: 'Siempre', dias: Infinity, sql: '' },
  { id: 'semana', texto: 'Últimos 7 días', dias: 7, sql: "\n  AND r.fecha >= datetime('now', '-7 days')" },
  { id: 'hoy', texto: 'Hoy', dias: 1, sql: "\n  AND r.fecha >= date('now')" },
]

const opcion = (activa: boolean) => `min-h-9 rounded-[0.4rem] border px-3 text-sm focus-visible:outline-2 focus-visible:outline-cyan ${activa ? 'border-coral bg-coral/15 text-fg' : 'border-white/15 text-muted hover:text-fg'}`

export default function Constructor() {
  const [nivel, setNivel] = usePersistentState('top:nivel', 1)
  const [periodo, setPeriodo] = usePersistentState<Periodo>('top:periodo', 'todo')
  const [cantidad, setCantidad] = usePersistentState('top:cantidad', 3)

  const p = PERIODOS.find((x) => x.id === periodo)!
  const resultado = PUNTAJES_EJEMPLO
    .filter((f) => f.nivel === nivel && f.dias < p.dias)
    .sort((a, b) => b.puntaje - a.puntaje)
    .slice(0, cantidad)

  const sql = `SELECT j.nombre, r.puntaje
FROM records r
JOIN jugadores j ON j.id = r.jugador_id
WHERE r.nivel = ${nivel}${p.sql}
ORDER BY r.puntaje DESC
LIMIT ${cantidad};`

  return (
    <div className="grid grid-cols-[minmax(15rem,1fr)_2fr] gap-4 max-[900px]:grid-cols-1">
      <section className="grid content-start gap-3 rounded-lg border border-white/12 bg-panel p-4">
        <fieldset className="grid gap-1.5">
          <legend className="mb-1 font-mono text-xs tracking-[0.2em] text-muted uppercase">Nivel</legend>
          <div className="flex gap-2">{[1, 2, 3].map((n) => <button key={n} type="button" aria-pressed={nivel === n} onClick={() => setNivel(n)} className={opcion(nivel === n)}>Nivel {n}</button>)}</div>
        </fieldset>
        <fieldset className="grid gap-1.5">
          <legend className="mb-1 font-mono text-xs tracking-[0.2em] text-muted uppercase">Período</legend>
          <div className="flex flex-wrap gap-2">{PERIODOS.map((x) => <button key={x.id} type="button" aria-pressed={periodo === x.id} onClick={() => setPeriodo(x.id)} className={opcion(periodo === x.id)}>{x.texto}</button>)}</div>
        </fieldset>
        <fieldset className="grid gap-1.5">
          <legend className="mb-1 font-mono text-xs tracking-[0.2em] text-muted uppercase">¿Cuántos?</legend>
          <div className="flex gap-2">{[3, 5, 10].map((n) => <button key={n} type="button" aria-pressed={cantidad === n} onClick={() => setCantidad(n)} className={opcion(cantidad === n)}>Top {n}</button>)}</div>
        </fieldset>
      </section>
      <div className="grid content-start gap-3">
        <pre aria-label="Consulta SQL generada" className="overflow-x-auto rounded-lg border border-coral/40 bg-well p-3 font-mono text-[0.8rem] leading-normal text-fg">{sql}</pre>
        <section aria-live="polite" className="rounded-lg border border-white/12 bg-panel p-3">
          <p className="mb-2 flex items-center gap-2 font-mono text-xs text-muted"><TrophyIcon aria-hidden="true" size={14} className="text-coral" /> Resultado · {resultado.length} fila{resultado.length === 1 ? '' : 's'}</p>
          {resultado.length
            ? <ol className="grid gap-1.5">{resultado.map((f, i) => (
                <li key={f.jugador} className="grid grid-cols-[2rem_1fr_auto] items-center rounded-[0.3rem] bg-well px-3 py-1.5 font-mono text-sm">
                  <span className={i === 0 ? 'text-amber' : 'text-muted'}>{i + 1}.</span><span className="text-fg">{f.jugador}</span><span className="text-coral">{f.puntaje.toLocaleString('es-PE')}</span>
                </li>
              ))}</ol>
            : <p className="text-sm text-muted">Nadie jugó ese nivel en ese período.</p>}
        </section>
      </div>
    </div>
  )
}
