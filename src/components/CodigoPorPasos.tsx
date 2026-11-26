import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react'
import { useEffect, useRef, type ReactNode } from 'react'
import { usePersistentState } from '../lib/usePersistentState'

export type PasoCodigo = { desde: number; hasta: number; titulo: string; texto: ReactNode }

type Props = { id: string; codigo: string; pasos: PasoCodigo[] }

const boton = 'flex min-h-9 items-center gap-1.5 rounded-[0.4rem] border px-3 text-sm focus-visible:outline-2 focus-visible:outline-cyan disabled:opacity-30'

export default function CodigoPorPasos({ id, codigo, pasos }: Props) {
  const [indice, setIndice] = usePersistentState(`${id}:paso`, 0)
  const paso = pasos[Math.min(indice, pasos.length - 1)]
  const lineas = codigo.split('\n')
  const panel = useRef<HTMLPreElement>(null)

  useEffect(() => {
    const p = panel.current
    const linea = p?.querySelector<HTMLElement>(`[data-linea="${paso?.desde}"]`)
    if (p && linea) p.scrollTo({ top: linea.offsetTop - p.clientHeight / 3 })
  }, [paso?.desde])

  return (
    <div className="grid grid-cols-[3fr_2fr] gap-4 max-[900px]:grid-cols-1">
      <pre ref={panel} aria-label="Código" className="relative max-h-96 overflow-auto rounded-lg border border-white/12 bg-well py-3 font-mono text-[0.78rem] leading-normal">
        <code>
          {lineas.map((linea, i) => {
            const activa = paso !== undefined && i + 1 >= paso.desde && i + 1 <= paso.hasta
            return (
              <span key={i} data-linea={i + 1} className={`grid grid-cols-[2.5rem_1fr] transition-colors ${activa ? 'bg-cyan/15 text-fg' : paso ? 'text-muted/70' : 'text-fg'}`}>
                <span className={`pr-3 text-right select-none ${activa ? 'text-cyan' : 'text-muted/50'}`}>{i + 1}</span>
                <span className={`pr-3 ${activa ? 'border-l-2 border-cyan pl-2' : 'pl-2.5'}`}>{linea || ' '}</span>
              </span>
            )
          })}
        </code>
      </pre>
      {paso && (
        <section aria-live="polite" className="grid content-start gap-3 rounded-lg border border-cyan/45 bg-panel p-4">
          <p className="font-mono text-xs tracking-[0.2em] text-cyan uppercase">Paso {indice + 1} / {pasos.length} · líneas {paso.desde}{paso.hasta !== paso.desde && `–${paso.hasta}`}</p>
          <h3 className="font-display text-xl font-bold text-fg">{paso.titulo}</h3>
          <div className="text-sm leading-relaxed text-body [&_code]:text-cyan [&_strong]:text-fg">{paso.texto}</div>
          <div className="mt-1 flex gap-2">
            <button type="button" disabled={indice === 0} onClick={() => setIndice(indice - 1)} className={`${boton} border-white/20 text-fg hover:bg-white/5`}>
              <ArrowLeftIcon aria-hidden="true" size={16} /> Anterior
            </button>
            <button type="button" disabled={indice >= pasos.length - 1} onClick={() => setIndice(indice + 1)} className={`${boton} chamfer border-transparent bg-cyan font-bold text-ink hover:brightness-110`}>
              Siguiente <ArrowRightIcon aria-hidden="true" size={16} />
            </button>
          </div>
        </section>
      )}
    </div>
  )
}
