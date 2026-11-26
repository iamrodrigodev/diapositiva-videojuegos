import { ArrowCounterClockwiseIcon, CheckIcon } from '@phosphor-icons/react'
import { useState, type DragEvent, type ReactNode } from 'react'

export type ItemClasificable = { id: string; texto: string; destino: string }
export type DestinoClasificacion = { id: string; titulo: ReactNode; detalle?: ReactNode }

type Props = {
  items: ItemClasificable[]
  destinos: DestinoClasificacion[]
  columnas?: string
}

const chip = 'min-h-9 rounded-[0.4rem] border px-3 text-left text-sm focus-visible:outline-2 focus-visible:outline-[#7eb8ff]'
const accion = 'flex min-h-10 items-center gap-2 rounded-[0.4rem] px-4 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7eb8ff]'

// Mini-juego: arrastrar (o clic en ficha + clic en destino) cada ficha a su grupo y comprobar.
export default function Clasificador({ items, destinos, columnas = 'grid-cols-3' }: Props) {
  const [ubicacion, setUbicacion] = useState<Record<string, string>>({})
  const [seleccion, setSeleccion] = useState<string | null>(null)
  const [comprobado, setComprobado] = useState(false)

  const colocar = (itemId: string, destinoId: string | null) => {
    setUbicacion((u) => {
      const nueva = { ...u }
      if (destinoId) nueva[itemId] = destinoId
      else delete nueva[itemId]
      return nueva
    })
    setSeleccion(null)
    setComprobado(false)
  }

  const soltar = (destinoId: string) => (e: DragEvent) => {
    e.preventDefault()
    const id = e.dataTransfer.getData('text/plain')
    if (id) colocar(id, destinoId)
  }

  const ficha = (item: ItemClasificable) => {
    const lugar = ubicacion[item.id]
    const color = comprobado && lugar
      ? lugar === item.destino ? 'border-emerald-300 bg-[#0d453d80] text-emerald-100' : 'border-[#f87171] bg-[#f871711a] text-[#fecaca]'
      : seleccion === item.id ? 'border-[#c1a5ff] bg-[#c1a5ff26] text-[#f4f8ff]' : 'border-white/20 bg-[#0a0f19] text-[#e0edff] hover:border-white/40'
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
      <div onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); colocar(e.dataTransfer.getData('text/plain'), null) }} className="flex min-h-14 flex-wrap items-center gap-2 rounded-[0.5rem] border border-dashed border-white/20 p-3">
        {sueltos.length ? sueltos.map(ficha) : <p className="font-mono text-xs text-[#8997ad]">Todas las fichas están colocadas · clic en una para devolverla</p>}
      </div>

      <div className={`grid gap-3 ${columnas} max-[760px]:grid-cols-1`}>
        {destinos.map((d) => (
          <div key={d.id} onDragOver={(e) => e.preventDefault()} onDrop={soltar(d.id)} className="flex min-h-36 flex-col rounded-[0.5rem] border border-white/12 bg-[#101824] p-3">
            <button
              type="button"
              disabled={!seleccion}
              onClick={() => seleccion && colocar(seleccion, d.id)}
              className="rounded-[0.3rem] text-left font-display text-lg font-bold text-[#f4f8ff] enabled:underline enabled:decoration-[#c1a5ff] enabled:decoration-dashed enabled:underline-offset-4 focus-visible:outline-2 focus-visible:outline-[#7eb8ff]"
            >
              {d.titulo}
            </button>
            <div className="mt-2 flex flex-wrap gap-2">{items.filter((i) => ubicacion[i.id] === d.id).map(ficha)}</div>
            {comprobado && d.detalle && <div className="mt-auto pt-3 text-sm text-[#c9d6ec]">{d.detalle}</div>}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => setComprobado(true)} disabled={sueltos.length > 0} className={`${accion} bg-emerald-300 font-medium text-[#0a0d17] hover:bg-emerald-200 disabled:opacity-40`}>
          <CheckIcon aria-hidden="true" size={16} /> Comprobar
        </button>
        <button type="button" onClick={() => { setUbicacion({}); setComprobado(false); setSeleccion(null) }} className={`${accion} border border-white/20 text-[#e0edff] hover:bg-white/5`}>
          <ArrowCounterClockwiseIcon aria-hidden="true" size={16} /> Reiniciar
        </button>
        <p role="status" className="font-mono text-sm text-emerald-200">
          {comprobado ? `${aciertos} / ${items.length} correctas` : sueltos.length > 0 && 'Arrastra cada ficha (o clic en la ficha y luego en el grupo)'}
        </p>
      </div>
    </div>
  )
}
