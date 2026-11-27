import { ArrowClockwiseIcon, ArrowRightIcon, CheckIcon, CrownIcon, SignOutIcon, TimerIcon, TrophyIcon } from '@phosphor-icons/react'
import { Fragment, useState } from 'react'
import Celebracion from '../../components/Celebracion'
import { CONSULTAS_INCOMPLETAS } from '../../data/consultasIncompletas'
import { barajar } from '../../lib/barajar'
import { sonido } from '../../lib/sonido'
import { formatoTiempo, useCronometro } from '../../lib/useCronometro'
import { usePersistentState } from '../../lib/usePersistentState'

type Ficha = { id: number; texto: string }

const fichasDe = (i: number): Ficha[] => {
  const c = CONSULTAS_INCOMPLETAS[i]!
  return barajar([...c.respuestas, ...c.trampas]).map((texto, id) => ({ id, texto }))
}

export default function Rompecabezas() {
  const [indice, setIndice] = usePersistentState('rompecabezas:indice', 0)
  const [fichas, setFichas] = usePersistentState<Ficha[]>('rompecabezas:fichas', () => fichasDe(0))
  const [huecos, setHuecos] = usePersistentState<(number | null)[]>('rompecabezas:huecos', () => CONSULTAS_INCOMPLETAS[0]!.respuestas.map(() => null))
  const [comprobado, setComprobado] = usePersistentState('rompecabezas:comprobado', false)
  const [aciertos, setAciertos] = usePersistentState('rompecabezas:aciertos', 0)
  const [record, setRecord] = usePersistentState('rompecabezas:record', 0)
  const reloj = useCronometro('rompecabezas:reloj')
  const [elegido, setElegido] = useState<number | null>(null)

  const consulta = CONSULTAS_INCOMPLETAS[indice]
  const totalHuecos = CONSULTAS_INCOMPLETAS.reduce((n, c) => n + c.respuestas.length, 0)

  const preparar = (i: number) => {
    setIndice(i)
    if (CONSULTAS_INCOMPLETAS[i]) {
      setFichas(fichasDe(i))
      setHuecos(CONSULTAS_INCOMPLETAS[i]!.respuestas.map(() => null))
    }
    setComprobado(false)
    setElegido(null)
  }
  const reiniciar = () => { preparar(0); setAciertos(0); reloj.reiniciar() }

  if (!consulta) {
    return (
      <div role="status" className="relative grid justify-items-center gap-3 rounded-lg border border-coral/45 bg-panel p-8 text-center">
        <Celebracion activa={aciertos === totalHuecos} />
        <TrophyIcon aria-hidden="true" size={56} className="text-coral" />
        <p className="font-display text-4xl font-bold text-fg uppercase">{aciertos} de {totalHuecos} huecos</p>
        <p className="text-body">en {formatoTiempo(reloj.segundos)} · récord {record}</p>
        <button type="button" onClick={reiniciar} className="chamfer mt-2 flex min-h-11 items-center gap-2 bg-coral px-6 font-bold text-ink hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan">
          <ArrowClockwiseIcon aria-hidden="true" size={18} /> Jugar de nuevo
        </button>
      </div>
    )
  }

  const usadas = new Set(huecos.filter((h): h is number => h !== null))
  const texto = (id: number | null) => fichas.find((f) => f.id === id)?.texto
  const llenos = huecos.every((h) => h !== null)
  const correctos = huecos.filter((h, i) => texto(h) === consulta.respuestas[i]).length

  const destino = elegido ?? (huecos.indexOf(null) === -1 ? null : huecos.indexOf(null))

  const poner = (id: number) => {
    if (comprobado || destino === null) return
    reloj.iniciar()
    const nuevos = huecos.map((h, i) => (i === destino ? id : h))
    setHuecos(nuevos)
    setElegido(null)
    sonido.pista()
  }
  const tocarHueco = (i: number) => {
    if (comprobado) return
    if (i === destino && huecos[i] !== null) { setHuecos(huecos.map((h, k) => (k === i ? null : h))); return }
    setElegido(i)
  }
  const comprobar = () => {
    setComprobado(true)
    const total = aciertos + correctos
    setAciertos(total)
    if (correctos === consulta.respuestas.length) sonido.acierto()
    else sonido.error()
    if (indice + 1 >= CONSULTAS_INCOMPLETAS.length) { reloj.detener(); setRecord((r) => Math.max(r, total)) }
  }
  const siguiente = () => { if (indice + 1 >= CONSULTAS_INCOMPLETAS.length) sonido.victoria(); preparar(indice + 1) }

  return (
    <div className="relative grid gap-4">
      <Celebracion activa={comprobado && correctos === consulta.respuestas.length} />
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-sm">
        <span className="text-muted">Consulta {indice + 1} / {CONSULTAS_INCOMPLETAS.length} · <span className="text-fg">{consulta.titulo}</span></span>
        <span className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-amber"><TimerIcon aria-hidden="true" size={18} /> {formatoTiempo(reloj.segundos)}</span>
          <span className="flex items-center gap-1.5 text-muted"><CrownIcon aria-hidden="true" size={18} /> récord {record}/{totalHuecos}</span>
          {(indice > 0 || usadas.size > 0) && <button type="button" onClick={reiniciar} className="flex items-center gap-1 rounded-[0.3rem] border border-white/20 px-2 py-1 text-xs text-body hover:border-coral hover:text-coral focus-visible:outline-2 focus-visible:outline-cyan"><SignOutIcon aria-hidden="true" size={14} /> Salir</button>}
        </span>
      </div>

      <pre aria-label="Consulta con huecos" className="overflow-x-auto rounded-lg border border-white/12 bg-well p-5 font-mono text-[clamp(0.9rem,1.4vw,1.15rem)] leading-loose whitespace-pre-wrap text-fg">
        {consulta.partes.map((parte, i) => (
          <Fragment key={i}>
            {parte}
            {i < huecos.length && (() => {
              const id = huecos[i]!
              const color = comprobado
                ? texto(id) === consulta.respuestas[i] ? 'border-mint bg-mint/20 text-mint' : 'border-coral bg-coral/20 text-coral'
                : i === destino ? 'border-amber bg-amber/15 text-amber ring-2 ring-amber/40' : id !== null ? 'border-coral bg-coral/15 text-fg' : 'border-dashed border-white/40 text-muted'
              return (
                <button type="button" onClick={() => tocarHueco(i)} aria-pressed={!comprobado && i === destino} aria-label={id === null ? `Hueco ${i + 1} vacío` : `Hueco ${i + 1}: ${texto(id)}`} className={`mx-1 inline-flex min-w-20 justify-center rounded-[0.3rem] border-2 px-2 align-middle font-bold focus-visible:outline-2 focus-visible:outline-cyan ${color}`}>
                  {id === null ? (!comprobado && i === destino ? '▼ aquí' : '____') : texto(id)}
                </button>
              )
            })()}
          </Fragment>
        ))}
      </pre>

      <div role="group" aria-label="Fichas" className="flex flex-wrap gap-2">
        {fichas.map((f) => (
          <button key={f.id} type="button" disabled={usadas.has(f.id) || comprobado} onClick={() => poner(f.id)} className="chamfer min-h-11 min-w-24 bg-panel px-4 font-mono font-bold text-fg ring-1 ring-coral/60 hover:bg-coral/15 disabled:opacity-25 focus-visible:outline-2 focus-visible:outline-cyan">
            {f.texto}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {!comprobado
          ? <button type="button" onClick={comprobar} disabled={!llenos} className="chamfer flex min-h-10 items-center gap-2 bg-coral px-5 font-bold text-ink hover:brightness-110 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"><CheckIcon aria-hidden="true" size={16} /> Ejecutar</button>
          : <button type="button" onClick={siguiente} className="chamfer flex min-h-10 items-center gap-2 bg-coral px-5 font-bold text-ink hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan">{indice + 1 >= CONSULTAS_INCOMPLETAS.length ? 'Ver resultado' : 'Siguiente consulta'} <ArrowRightIcon aria-hidden="true" size={16} /></button>}
        <p role="status" className="text-sm">
          {comprobado
            ? <span className={correctos === consulta.respuestas.length ? 'text-mint' : 'text-coral'}>{correctos === consulta.respuestas.length ? '✓ La consulta funciona. ' : `✗ ${correctos} de ${consulta.respuestas.length} bien. Correcto: ${consulta.respuestas.join(' · ')}. `}<span className="text-body">{consulta.explicacion}</span></span>
            : <span className="text-muted">Toca un hueco para elegirlo (se marca en ámbar) y luego la ficha que va ahí. Toca dos veces un hueco lleno para vaciarlo. Sobran fichas.</span>}
        </p>
      </div>
    </div>
  )
}
