import { ArrowClockwiseIcon, CrownIcon, LightbulbIcon, LightningIcon, PlugIcon, ShuffleIcon, TimerIcon } from '@phosphor-icons/react'
import { useLayoutEffect, useRef, useState } from 'react'
import Celebracion from '../../components/Celebracion'
import { CABLES_SQLITE } from '../../data/cablesSqlite'
import { barajar } from '../../lib/barajar'
import { sonido } from '../../lib/sonido'
import { formatoTiempo, useCronometro } from '../../lib/useCronometro'
import { usePersistentState } from '../../lib/usePersistentState'

const POR_RONDA = 6
const COLORES = ['#ffb547', '#5ee1ff', '#7ef0b1', '#ff6b5b', '#c1a5ff', '#ece6d6']

type Ronda = { izquierda: string[]; derecha: string[] }
type Punto = { x: number; y: number }

const nuevaRonda = (): Ronda => {
  const ids = barajar(CABLES_SQLITE.map((c) => c.id)).slice(0, POR_RONDA)
  return { izquierda: ids, derecha: barajar(ids) }
}
const cable = (id: string) => CABLES_SQLITE.find((c) => c.id === id)!

export default function Cables() {
  const [ronda, setRonda] = usePersistentState<Ronda>('cables:ronda', nuevaRonda)
  const [conexiones, setConexiones] = usePersistentState<Record<string, string>>('cables:conexiones', {})
  const [comprobado, setComprobado] = usePersistentState('cables:comprobado', false)
  const [seleccion, setSeleccion] = useState<string | null>(null)
  const [pistas, setPistas] = usePersistentState('cables:pistas', 0)
  const [pistaVisible, setPistaVisible] = useState<string | null>(null)
  const [record, setRecord] = usePersistentState<number | null>('cables:record', null)
  const reloj = useCronometro('cables:reloj')
  const [puntos, setPuntos] = useState<Record<string, Punto>>({})
  const marco = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const m = marco.current
    if (!m) return
    const medir = () => {
      const base = m.getBoundingClientRect()
      const escala = m.offsetWidth / base.width || 1
      const nuevos: Record<string, Punto> = {}
      m.querySelectorAll<HTMLElement>('[data-enchufe]').forEach((el) => {
        const r = el.getBoundingClientRect()
        nuevos[el.dataset['enchufe']!] = { x: (r.left + r.width / 2 - base.left) * escala, y: (r.top + r.height / 2 - base.top) * escala }
      })
      setPuntos(nuevos)
    }
    const observador = new ResizeObserver(medir)
    observador.observe(m)
    medir()
    return () => observador.disconnect()
  }, [ronda])

  const conectar = (izq: string, der: string) => {
    setConexiones((c) => {
      const nuevas = Object.fromEntries(Object.entries(c).filter(([i, d]) => i !== izq && d !== der))
      return { ...nuevas, [izq]: der }
    })
    setSeleccion(null)
    setPistaVisible(null)
    setComprobado(false)
  }
  const tocarIzquierda = (id: string) => {
    if (conexiones[id] && seleccion !== id) {
      setConexiones((c) => Object.fromEntries(Object.entries(c).filter(([i]) => i !== id)))
      setComprobado(false)
      return
    }
    reloj.iniciar()
    setPistaVisible(null)
    setSeleccion(seleccion === id ? null : id)
  }
  const pedirPista = () => {
    if (!seleccion) return
    setPistaVisible(seleccion)
    setPistas((p) => p + 1)
    sonido.pista()
  }
  const tocarDerecha = (id: string) => { if (seleccion) conectar(seleccion, id) }

  const completos = Object.keys(conexiones).length === ronda.izquierda.length
  const aciertos = Object.entries(conexiones).filter(([i, d]) => i === d).length
  const ganado = comprobado && aciertos === ronda.izquierda.length
  const tiempoFinal = reloj.segundos + pistas * 10
  const comprobar = () => {
    setComprobado(true)
    if (aciertos === ronda.izquierda.length) {
      reloj.detener()
      setRecord((r) => (r === null ? tiempoFinal : Math.min(r, tiempoFinal)))
      sonido.victoria()
    } else sonido.error()
  }
  const otraRonda = () => { setRonda(nuevaRonda()); setConexiones({}); setComprobado(false); setSeleccion(null); setPistas(0); setPistaVisible(null); reloj.reiniciar() }
  const reiniciar = () => { setConexiones({}); setComprobado(false); setSeleccion(null); setPistaVisible(null) }

  const color = (id: string) => COLORES[ronda.izquierda.indexOf(id) % COLORES.length]!

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap items-center justify-end gap-4 font-mono text-sm">
        <span className="flex items-center gap-1.5 text-amber"><TimerIcon aria-hidden="true" size={18} /> {formatoTiempo(reloj.segundos)}{pistas > 0 && ` +${pistas * 10} s de pistas`}</span>
        <span className="flex items-center gap-1.5 text-muted"><CrownIcon aria-hidden="true" size={18} /> Récord: {record === null ? '—' : formatoTiempo(record)}</span>
      </div>
      <div ref={marco} className="relative grid grid-cols-[1fr_minmax(6rem,14rem)_1fr] items-stretch">
        <Celebracion activa={ganado} />
        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 size-full overflow-visible">
          {Object.entries(conexiones).map(([izq, der]) => {
            const a = puntos[`i-${izq}`]
            const b = puntos[`d-${der}`]
            if (!a || !b) return null
            const medio = (a.x + b.x) / 2
            const trazo = comprobado ? (izq === der ? '#7ef0b1' : '#ff6b5b') : color(izq)
            return (
              <path key={izq} className={ganado ? 'cable-energia' : undefined} d={`M ${a.x} ${a.y} C ${medio} ${a.y}, ${medio} ${b.y}, ${b.x} ${b.y}`} fill="none" stroke={trazo} strokeWidth="5" strokeLinecap="round" strokeDasharray={comprobado && izq !== der ? '10 8' : ganado ? '14 10' : undefined} />
            )
          })}
        </svg>

        <ul aria-label="Código" className="grid gap-2">
          {ronda.izquierda.map((id) => (
            <li key={id}>
              <button type="button" aria-pressed={seleccion === id} onClick={() => tocarIzquierda(id)} className={`flex min-h-11 w-full items-center justify-between gap-3 rounded-[0.4rem] border bg-well py-1.5 pr-2 pl-3 text-left font-mono text-sm text-fg focus-visible:outline-2 focus-visible:outline-cyan ${seleccion === id ? 'border-amber bg-amber/10' : 'border-white/15 hover:border-white/40'}`}>
                {cable(id).codigo}
                <span data-enchufe={`i-${id}`} className="size-4 shrink-0 rounded-full border-2 border-ink" style={{ background: color(id) }} />
              </button>
            </li>
          ))}
        </ul>
        <div />
        <ul aria-label="Qué hace" className="grid gap-2">
          {ronda.derecha.map((id) => {
            const conectado = Object.values(conexiones).includes(id)
            return (
              <li key={id}>
                <button type="button" disabled={!seleccion} onClick={() => tocarDerecha(id)} className={`flex min-h-11 w-full items-center gap-3 rounded-[0.4rem] border bg-panel py-1.5 pr-3 pl-2 text-left text-sm text-fg focus-visible:outline-2 focus-visible:outline-cyan ${pistaVisible === id ? 'border-amber bg-amber/20 ring-2 ring-amber' : seleccion ? 'border-amber/50 hover:bg-amber/10' : 'border-white/15'}`}>
                  <span data-enchufe={`d-${id}`} className={`size-4 shrink-0 rounded-full border-2 ${conectado ? 'border-fg bg-fg' : 'border-muted bg-transparent'}`} />
                  {cable(id).funcion}
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={comprobar} disabled={!completos} className="chamfer flex min-h-10 items-center gap-2 bg-cyan px-5 font-bold text-ink hover:brightness-110 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber">
          <LightningIcon aria-hidden="true" size={16} /> Dar energía
        </button>
        <button type="button" onClick={pedirPista} disabled={!seleccion || comprobado} className="flex min-h-10 items-center gap-2 rounded-[0.4rem] border border-amber/50 px-4 text-sm text-amber hover:bg-amber/10 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-cyan">
          <LightbulbIcon aria-hidden="true" size={16} /> Pista (+10 s)
        </button>
        <button type="button" onClick={reiniciar} className="flex min-h-10 items-center gap-2 rounded-[0.4rem] border border-white/20 px-4 text-sm text-fg hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-cyan">
          <ArrowClockwiseIcon aria-hidden="true" size={16} /> Desconectar todo
        </button>
        <button type="button" onClick={otraRonda} className="flex min-h-10 items-center gap-2 rounded-[0.4rem] border border-cyan/50 px-4 text-sm text-cyan hover:bg-cyan/10 focus-visible:outline-2 focus-visible:outline-cyan">
          <ShuffleIcon aria-hidden="true" size={16} /> Nuevos cables
        </button>
        <p role="status" className={`flex items-center gap-2 font-mono text-sm ${comprobado ? (aciertos === ronda.izquierda.length ? 'text-mint' : 'text-coral') : 'text-muted'}`}>
          <PlugIcon aria-hidden="true" size={16} />
          {comprobado
            ? aciertos === ronda.izquierda.length ? `¡Sistema encendido en ${formatoTiempo(tiempoFinal)}!` : `${aciertos} de ${ronda.izquierda.length} cables bien: los rojos van en otro lado`
            : seleccion ? 'Ahora elige qué hace ese código' : `Elige un código y luego su función (${Object.keys(conexiones).length}/${ronda.izquierda.length})`}
        </p>
      </div>
    </div>
  )
}
