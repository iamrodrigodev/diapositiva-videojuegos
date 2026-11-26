import { MagnifyingGlassIcon } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { PUNTAJES_EJEMPLO } from '../../data/rankingEjemplo'

const NIVEL = 1
const TOP = 3
const filas = PUNTAJES_EJEMPLO
const ordenadas = [...filas].filter((f) => f.nivel === NIVEL).sort((a, b) => b.puntaje - a.puntaje)

function Columna({ titulo, lista, leidas, objetivo, nota }: { titulo: string; lista: typeof filas; leidas: number; objetivo: (i: number) => boolean; nota: string }) {
  return (
    <section className="grid content-start gap-2 rounded-lg border border-white/12 bg-panel p-3">
      <p className="font-display font-bold text-fg">{titulo}</p>
      <p className="text-xs text-muted">{nota}</p>
      <ol className={`grid gap-1 font-mono text-xs ${lista.length > 6 ? 'grid-flow-col grid-rows-7' : ''}`}>
        {lista.map((f, i) => {
          const leida = i < leidas
          return (
            <li key={`${f.jugador}-${f.nivel}`} className={`flex justify-between rounded-[0.3rem] px-2 py-1 transition-colors ${leida ? (objetivo(i) ? 'bg-mint/20 text-mint' : 'bg-coral/10 text-coral/80') : 'text-muted/60'}`}>
              <span>{f.jugador} · nivel {f.nivel}</span><span>{f.puntaje}</span>
            </li>
          )
        })}
      </ol>
      <p className="font-mono text-sm text-fg">Filas leídas: <strong className={leidas > TOP ? 'text-coral' : 'text-mint'}>{leidas}</strong></p>
    </section>
  )
}

export default function Indice() {
  const [paso, setPaso] = useState(0)
  const buscando = paso > 0 && paso < filas.length

  useEffect(() => {
    if (!buscando) return
    const t = window.setTimeout(() => setPaso((p) => p + 1), 160)
    return () => window.clearTimeout(t)
  }, [paso, buscando])

  const esObjetivoSin = (i: number) => {
    const f = filas[i]!
    return f.nivel === NIVEL && ordenadas.slice(0, TOP).includes(f)
  }

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-body">Consulta: <code className="font-mono text-coral">top {TOP} del nivel {NIVEL}</code>. Un índice es como el índice de un libro: no hay que leer todas las páginas.</p>
        <button type="button" onClick={() => setPaso(1)} disabled={buscando} className="chamfer flex min-h-10 items-center gap-2 bg-coral px-5 font-bold text-ink hover:brightness-110 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan">
          <MagnifyingGlassIcon aria-hidden="true" size={18} /> Buscar
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 max-[800px]:grid-cols-1">
        <Columna titulo="Sin índice" nota="Lee la tabla completa, fila por fila, y después ordena." lista={filas} leidas={Math.min(paso, filas.length)} objetivo={esObjetivoSin} />
        <Columna titulo="Con índice (nivel, puntaje DESC)" nota="Salta al nivel 1, ya ordenado: lee solo las primeras 3." lista={ordenadas} leidas={Math.min(paso, TOP)} objetivo={(i) => i < TOP} />
      </div>
    </div>
  )
}
