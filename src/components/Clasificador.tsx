import { ArrowCounterClockwiseIcon, CheckIcon, LightbulbIcon, ShuffleIcon, TimerIcon } from '@phosphor-icons/react'
import { useEffect, useState, type DragEvent, type ReactNode } from 'react'
import { barajar } from '../lib/barajar'
import { usePersistentState } from '../lib/usePersistentState'

export type ItemClasificable = { id: string; texto: string; destino: string; porque?: string }
export type DestinoClasificacion = { id: string; titulo: ReactNode; detalle?: ReactNode; pista?: ReactNode }

type Props = {
  id: string
  items: ItemClasificable[]
  destinos: DestinoClasificacion[]
  columnas?: string
  porRonda?: number
  onNuevasCartas?: () => void
}

const chip = 'min-h-9 rounded-[0.4rem] border px-3 text-left text-sm focus-visible:outline-2 focus-visible:outline-cyan'
const accion = 'flex min-h-10 items-center gap-2 rounded-[0.4rem] px-4 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan'

export default function Clasificador({ id, items: mazo, destinos, columnas = 'grid-cols-3', porRonda, onNuevasCartas }: Props) {
  const repartir = () => barajar(mazo).slice(0, porRonda ?? mazo.length)
  const [items, setItems] = usePersistentState(`${id}:mano`, repartir)
  const [ubicacion, setUbicacion] = usePersistentState<Record<string, string>>(`${id}:ubicacion`, {})
  const [seleccion, setSeleccion] = useState<string | null>(null)
  const [comprobado, setComprobado] = usePersistentState(`${id}:comprobado`, false)
  const [inicio, setInicio] = usePersistentState<number | null>(`${id}:inicio`, null)
  const [segundos, setSegundos] = usePersistentState(`${id}:segundos`, 0)
  const [pistas, setPistas] = usePersistentState<Record<string, boolean>>(`${id}:pistas`, {})
  const iniciar = () => setInicio((t) => t ?? Date.now())

  useEffect(() => {
    if (inicio === null || comprobado) return
    const id = window.setInterval(() => setSegundos(Math.floor((Date.now() - inicio) / 1000)), 250)
    return () => window.clearInterval(id)
  }, [inicio, comprobado, setSegundos])

  const colocar = (itemId: string, destinoId: string | null) => {
    setUbicacion((u) => {
      const nueva = { ...u }
      if (destinoId) nueva[itemId] = destinoId
      else delete nueva[itemId]
      return nueva
    })
    setSeleccion(null)
    setComprobado(false)
    iniciar()
  }

  const reiniciar = () => { setUbicacion({}); setComprobado(false); setSeleccion(null); setInicio(null); setSegundos(0) }
  const nuevasCartas = () => { if (onNuevasCartas) onNuevasCartas(); else setItems(repartir()); reiniciar(); setPistas({}) }
  const hayMasCartas = onNuevasCartas !== undefined || (porRonda !== undefined && porRonda < mazo.length)

  const soltar = (destinoId: string) => (e: DragEvent) => {
    e.preventDefault()
    const id = e.dataTransfer.getData('text/plain')
    if (id) colocar(id, destinoId)
  }

  const tituloDe = (id: string) => destinos.find((d) => d.id === id)?.titulo

  const ficha = (item: ItemClasificable) => {
    const lugar = ubicacion[item.id]
    const color = comprobado && lugar
      ? lugar === item.destino ? 'border-mint bg-mint/15 text-mint' : 'border-coral bg-coral/10 text-fg'
      : seleccion === item.id ? 'border-amber bg-amber/15 text-fg' : 'border-white/20 bg-well text-fg hover:border-white/40'
    return (
      <button
        key={item.id}
        type="button"
        draggable
        onDragStart={(e) => { e.dataTransfer.setData('text/plain', item.id); iniciar() }}
        onClick={() => { if (lugar) colocar(item.id, null); else { setSeleccion(seleccion === item.id ? null : item.id); iniciar() } }}
        aria-pressed={seleccion === item.id}
        className={`${chip} cursor-grab ${color}`}
      >
        {item.texto}
        {comprobado && lugar && lugar !== item.destino && <span className="ml-1.5 font-bold text-coral">→ {tituloDe(item.destino)}</span>}
      </button>
    )
  }

  const sueltos = items.filter((i) => !ubicacion[i.id])
  const aciertos = items.filter((i) => ubicacion[i.id] === i.destino).length
  const errores = items.filter((i) => ubicacion[i.id] && ubicacion[i.id] !== i.destino)
  const explicaciones = errores.filter((i) => i.porque)
  const veredicto = aciertos === items.length ? '¡Partida perfecta!' : aciertos >= items.length * 0.7 ? 'Bien jugado' : 'A repasar'

  return (
    <div className="grid gap-4">
      {sueltos.length > 0 && (
        <div onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); colocar(e.dataTransfer.getData('text/plain'), null) }} className="flex min-h-14 flex-wrap items-center gap-2 rounded-lg border border-dashed border-white/20 p-3">
          {sueltos.map(ficha)}
        </div>
      )}

      <div className={`grid gap-3 ${columnas} max-[760px]:grid-cols-1`}>
        {destinos.map((d) => (
          <div key={d.id} onDragOver={(e) => e.preventDefault()} onDrop={soltar(d.id)} className="flex min-h-28 flex-col rounded-lg border border-white/12 bg-panel p-3">
            <button
              type="button"
              disabled={!seleccion}
              onClick={() => seleccion && colocar(seleccion, d.id)}
              className="rounded-[0.3rem] text-left font-display text-lg font-bold text-fg enabled:underline enabled:decoration-amber enabled:decoration-dashed enabled:underline-offset-4 focus-visible:outline-2 focus-visible:outline-cyan"
            >
              {d.titulo} <span className="font-mono text-xs font-normal text-muted">{items.filter((i) => ubicacion[i.id] === d.id).length}</span>
            </button>
            {d.pista && !comprobado && (
              pistas[d.id]
                ? <p className="mt-1 text-[0.8rem] leading-snug text-amber">💡 {d.pista}</p>
                : <button type="button" onClick={() => setPistas({ ...pistas, [d.id]: true })} className="mt-1 flex w-fit items-center gap-1 rounded-[0.3rem] font-mono text-xs text-muted hover:text-amber focus-visible:outline-2 focus-visible:outline-cyan"><LightbulbIcon aria-hidden="true" size={14} /> Ver pista</button>
            )}
            <div className="mt-2 flex flex-wrap gap-2">{items.filter((i) => ubicacion[i.id] === d.id).map(ficha)}</div>
            {comprobado && d.detalle && <div className="mt-auto pt-3 text-[0.8rem] leading-snug text-body">{d.detalle}</div>}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => setComprobado(true)} disabled={sueltos.length > 0} className={`${accion} chamfer bg-amber font-bold text-ink hover:brightness-110 disabled:opacity-40`}>
          <CheckIcon aria-hidden="true" size={16} /> Comprobar
        </button>
        <button type="button" onClick={reiniciar} className={`${accion} border border-white/20 text-fg hover:bg-white/5`}>
          <ArrowCounterClockwiseIcon aria-hidden="true" size={16} /> Reiniciar
        </button>
        {hayMasCartas && (
          <button type="button" onClick={nuevasCartas} className={`${accion} border border-amber/50 text-amber hover:bg-amber/10`}>
            <ShuffleIcon aria-hidden="true" size={16} /> Nuevas cartas
          </button>
        )}
        <p role="status" className={`font-mono text-sm ${comprobado && errores.length ? 'text-amber' : 'text-mint'}`}>
          {comprobado ? `${veredicto} · ${aciertos} / ${items.length} en ${segundos} s` : sueltos.length > 0 ? 'Arrastra cada ficha (o clic en la ficha y luego en el grupo)' : 'Clic en una ficha colocada para devolverla'}
        </p>
        <p className="chamfer ml-auto flex min-h-10 min-w-28 items-center justify-center gap-2 bg-well px-4 font-mono text-xl text-amber tabular-nums" aria-label={`Tiempo: ${segundos} segundos`}>
          <TimerIcon aria-hidden="true" size={22} />{String(Math.floor(segundos / 60)).padStart(2, '0')}:{String(segundos % 60).padStart(2, '0')}
        </p>
      </div>

      {comprobado && explicaciones.length > 0 && (
        <ul aria-label="Correcciones" className="grid max-h-24 grid-cols-2 gap-x-6 gap-y-1.5 overflow-y-auto rounded-lg border border-coral/30 bg-coral/5 p-3 text-[0.8rem] leading-snug max-[760px]:grid-cols-1">
          {explicaciones.map((i) => (
            <li key={i.id}>
              <span className="text-coral">✗ {i.texto}</span> → <strong className="text-fg">{tituloDe(i.destino)}</strong>
              {i.porque && <span className="text-body">: {i.porque}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
