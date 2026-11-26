import { ArrowCounterClockwiseIcon, CheckIcon, TimerIcon } from '@phosphor-icons/react'
import { useEffect, useState, type DragEvent, type ReactNode } from 'react'

export type ItemClasificable = { id: string; texto: string; destino: string }
export type DestinoClasificacion = { id: string; titulo: ReactNode; detalle?: ReactNode }

type Props = {
  items: ItemClasificable[]
  destinos: DestinoClasificacion[]
  columnas?: string
}

const chip = 'min-h-9 rounded-[0.4rem] border px-3 text-left text-sm focus-visible:outline-2 focus-visible:outline-cyan'
const accion = 'flex min-h-10 items-center gap-2 rounded-[0.4rem] px-4 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan'

// Mini-juego: arrastrar (o clic en ficha + clic en destino) cada ficha a su grupo y comprobar.
export default function Clasificador({ items, destinos, columnas = 'grid-cols-3' }: Props) {
  const [ubicacion, setUbicacion] = useState<Record<string, string>>({})
  const [seleccion, setSeleccion] = useState<string | null>(null)
  const [comprobado, setComprobado] = useState(false)
  const [inicio, setInicio] = useState<number | null>(null)
  const [segundos, setSegundos] = useState(0)

  // Cronómetro: arranca con la primera ficha y se detiene al comprobar.
  useEffect(() => {
    if (inicio === null || comprobado) return
    const id = window.setInterval(() => setSegundos(Math.floor((Date.now() - inicio) / 1000)), 250)
    return () => window.clearInterval(id)
  }, [inicio, comprobado])

  const colocar = (itemId: string, destinoId: string | null) => {
    setUbicacion((u) => {
      const nueva = { ...u }
      if (destinoId) nueva[itemId] = destinoId
      else delete nueva[itemId]
      return nueva
    })
    setSeleccion(null)
    setComprobado(false)
    setInicio((t) => t ?? Date.now())
  }

  const reiniciar = () => { setUbicacion({}); setComprobado(false); setSeleccion(null); setInicio(null); setSegundos(0) }

  const soltar = (destinoId: string) => (e: DragEvent) => {
    e.preventDefault()
    const id = e.dataTransfer.getData('text/plain')
    if (id) colocar(id, destinoId)
  }

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
        onDragStart={(e) => e.dataTransfer.setData('text/plain', item.id)}
        onClick={() => (lugar ? colocar(item.id, null) : setSeleccion(seleccion === item.id ? null : item.id))}
        aria-pressed={seleccion === item.id}
        className={`${chip} cursor-grab ${color}`}
      >
        {item.texto}
      </button>
    )
  }

  const sueltos = items.filter((i) => !ubicacion[i.id])
  const aciertos = items.filter((i) => ubicacion[i.id] === i.destino).length

  return (
    <div className="grid gap-4">
      <div className="flex items-stretch gap-3">
        <div onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); colocar(e.dataTransfer.getData('text/plain'), null) }} className="flex min-h-14 flex-1 flex-wrap items-center gap-2 rounded-lg border border-dashed border-white/20 p-3">
          {sueltos.length ? sueltos.map(ficha) : <p className="font-mono text-xs text-muted">Todas las fichas están colocadas · clic en una para devolverla</p>}
        </div>
        <p className="chamfer flex min-w-28 items-center justify-center gap-2 bg-well px-4 font-mono text-2xl text-amber tabular-nums" aria-label={`Tiempo: ${segundos} segundos`}>
          <TimerIcon aria-hidden="true" size={22} />{String(Math.floor(segundos / 60)).padStart(2, '0')}:{String(segundos % 60).padStart(2, '0')}
        </p>
      </div>

      <div className={`grid gap-3 ${columnas} max-[760px]:grid-cols-1`}>
        {destinos.map((d) => (
          <div key={d.id} onDragOver={(e) => e.preventDefault()} onDrop={soltar(d.id)} className="flex min-h-36 flex-col rounded-lg border border-white/12 bg-panel p-3">
            <button
              type="button"
              disabled={!seleccion}
              onClick={() => seleccion && colocar(seleccion, d.id)}
              className="rounded-[0.3rem] text-left font-display text-lg font-bold text-fg enabled:underline enabled:decoration-amber enabled:decoration-dashed enabled:underline-offset-4 focus-visible:outline-2 focus-visible:outline-cyan"
            >
              {d.titulo} <span className="font-mono text-xs font-normal text-muted">{items.filter((i) => ubicacion[i.id] === d.id).length}</span>
            </button>
            <div className="mt-2 flex flex-wrap gap-2">{items.filter((i) => ubicacion[i.id] === d.id).map(ficha)}</div>
            {comprobado && d.detalle && <div className="mt-auto pt-3 text-sm text-body">{d.detalle}</div>}
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
        <p role="status" className="font-mono text-sm text-mint">
          {comprobado ? `${aciertos} / ${items.length} correctas en ${segundos} s` : sueltos.length > 0 && 'Arrastra cada ficha (o clic en la ficha y luego en el grupo)'}
        </p>
      </div>
    </div>
  )
}
