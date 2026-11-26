import { ArrowClockwiseIcon, ArrowRightIcon, PlayIcon, TrophyIcon } from '@phosphor-icons/react'
import Celebracion from '../../components/Celebracion'
import { PUNTAJES_EJEMPLO } from '../../data/rankingEjemplo'
import { clave, RONDAS } from '../../data/rondasBaseDeDatos'
import { sonido } from '../../lib/sonido'
import { usePersistentState } from '../../lib/usePersistentState'

const filaDe = (k: string) => PUNTAJES_EJEMPLO.find((f) => clave(f) === k)!

export default function Ejecutor() {
  const [indice, setIndice] = usePersistentState('base-de-datos:indice', 0)
  const [elegidas, setElegidas] = usePersistentState<string[]>('base-de-datos:elegidas', [])
  const [ejecutado, setEjecutado] = usePersistentState('base-de-datos:ejecutado', false)
  const [aciertos, setAciertos] = usePersistentState('base-de-datos:aciertos', 0)

  const ronda = RONDAS[indice]
  const reiniciar = () => { setIndice(0); setElegidas([]); setEjecutado(false); setAciertos(0) }

  if (!ronda) {
    return (
      <div role="status" className="relative grid justify-items-center gap-3 rounded-lg border border-coral/45 bg-panel p-8 text-center">
        <Celebracion activa={aciertos === RONDAS.length} />
        <TrophyIcon aria-hidden="true" size={56} className="text-coral" />
        <p className="font-display text-4xl font-bold text-fg uppercase">{aciertos} de {RONDAS.length} consultas</p>
        <p className="text-body">{aciertos === RONDAS.length ? '¡Pensaste como SQLite!' : 'Repasa WHERE, ORDER BY y LIMIT del Top N.'}</p>
        <button type="button" onClick={reiniciar} className="chamfer mt-2 flex min-h-11 items-center gap-2 bg-coral px-6 font-bold text-ink hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan">
          <ArrowClockwiseIcon aria-hidden="true" size={18} /> Jugar de nuevo
        </button>
      </div>
    )
  }

  const correcto = ejecutado && elegidas.length === ronda.respuesta.length && elegidas.every((k, i) => k === ronda.respuesta[i])

  const alternar = (k: string) => {
    if (ejecutado) return
    setElegidas((e) => (e.includes(k) ? e.filter((x) => x !== k) : [...e, k]))
  }
  const ejecutar = () => {
    setEjecutado(true)
    const bien = elegidas.length === ronda.respuesta.length && elegidas.every((k, i) => k === ronda.respuesta[i])
    if (bien) { setAciertos((a) => a + 1); sonido.acierto() } else sonido.error()
  }
  const siguiente = () => {
    setElegidas([])
    setEjecutado(false)
    setIndice(indice + 1)
    if (indice + 1 >= RONDAS.length) sonido.victoria()
  }

  return (
    <div className="relative grid grid-cols-[2fr_3fr] gap-4 max-[900px]:grid-cols-1">
      <Celebracion activa={correcto} />
      <div className="grid content-start gap-3">
        <p className="font-mono text-sm text-muted">Consulta {indice + 1} / {RONDAS.length}</p>
        <pre aria-label="Consulta a ejecutar" className="rounded-lg border border-coral/50 bg-well p-4 font-mono text-[clamp(0.95rem,1.4vw,1.15rem)] leading-relaxed text-fg">{ronda.consulta}</pre>
        <section className="rounded-lg border border-white/12 bg-panel p-3">
          <p className="mb-2 font-mono text-xs tracking-[0.2em] text-muted uppercase">Tu resultado, en orden</p>
          {elegidas.length === 0
            ? <p className="text-sm text-muted">Toca las filas que devuelve la consulta, en el orden en que saldrían.</p>
            : <ol className="grid gap-1 font-mono text-sm">{elegidas.map((k, i) => {
                const f = filaDe(k)
                const color = !ejecutado ? 'text-fg' : ronda.respuesta[i] === k ? 'text-mint' : 'text-coral'
                return <li key={k} className={`grid grid-cols-[1.5rem_1fr_auto_auto] gap-3 ${color}`}><span>{i + 1}.</span><span>{f.jugador}</span><span>nivel {f.nivel}</span><span>{f.puntaje}</span></li>
              })}</ol>}
        </section>
        <div className="flex flex-wrap items-center gap-3">
          {!ejecutado
            ? <button type="button" onClick={ejecutar} disabled={elegidas.length === 0} className="chamfer flex min-h-10 items-center gap-2 bg-coral px-5 font-bold text-ink hover:brightness-110 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"><PlayIcon aria-hidden="true" size={16} /> Ejecutar</button>
            : <button type="button" onClick={siguiente} className="chamfer flex min-h-10 items-center gap-2 bg-coral px-5 font-bold text-ink hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan">{indice + 1 >= RONDAS.length ? 'Ver resultado' : 'Siguiente consulta'} <ArrowRightIcon aria-hidden="true" size={16} /></button>}
        </div>
        {ejecutado && (
          <p role="status" className={`text-sm ${correcto ? 'text-mint' : 'text-coral'}`}>
            {correcto ? '✓ Exacto, eso devuelve SQLite. ' : `✗ SQLite devolvería: ${ronda.respuesta.map((k) => `${filaDe(k).jugador} (${filaDe(k).puntaje})`).join(', ')}. `}
            <span className="text-body">{ronda.explicacion}</span>
          </p>
        )}
      </div>

      <section aria-label="Tabla records" className="rounded-lg border border-white/12 bg-panel p-3">
        <p className="mb-2 font-mono text-xs tracking-[0.2em] text-muted uppercase">Tabla records</p>
        <div className="grid grid-cols-2 gap-1.5">
          {PUNTAJES_EJEMPLO.map((f) => {
            const k = clave(f)
            const posicion = elegidas.indexOf(k)
            const enRespuesta = ronda.respuesta.includes(k)
            const color = posicion >= 0
              ? 'border-coral bg-coral/15 text-fg'
              : ejecutado && enRespuesta ? 'border-amber/70 text-amber' : 'border-white/10 text-body hover:border-white/40'
            return (
              <button key={k} type="button" onClick={() => alternar(k)} aria-pressed={posicion >= 0} className={`grid min-h-9 grid-cols-[1.5rem_1fr_auto_auto] items-center gap-2 rounded-[0.3rem] border px-2 text-left font-mono text-sm focus-visible:outline-2 focus-visible:outline-cyan ${color}`}>
                <span className="font-bold text-coral">{posicion >= 0 ? posicion + 1 : ''}</span>
                <span>{f.jugador}</span><span className="text-xs text-muted">nivel {f.nivel}</span><span>{f.puntaje}</span>
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )
}
