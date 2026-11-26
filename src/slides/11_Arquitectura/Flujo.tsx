import { FileIcon, GameControllerIcon, HardDrivesIcon, WifiHighIcon, type Icon } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'framer-motion'
import Card from '../../components/Card'

type Nodo = { icono: Icon; texto: string }

function Capsula({ posiciones, duracion, retraso, texto, color }: { posiciones: string[]; duracion: number; retraso: number; texto: string; color: string }) {
  const opacidad = posiciones.map((_, i) => (i === 0 || i === posiciones.length - 1 ? 0 : 1))
  return (
    <motion.span
      aria-hidden="true"
      className="absolute top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full px-2.5 py-0.5 font-mono text-[0.7rem] font-bold whitespace-nowrap text-ink"
      style={{ background: color, boxShadow: `0 0 14px ${color}` }}
      initial={{ left: posiciones[0] ?? '0%', opacity: 0 }}
      animate={{ left: posiciones, opacity: opacidad }}
      transition={{ duration: duracion, delay: retraso, repeat: Infinity, repeatDelay: duracion, ease: 'easeInOut' }}
    >
      {texto}
    </motion.span>
  )
}

function Tuberia({ nodos, duracion, resaltada }: { nodos: Nodo[]; duracion: number; resaltada?: boolean }) {
  const reducido = useReducedMotion()
  const paradas = nodos.map((_, k) => `${(k / (nodos.length - 1)) * 100}%`)
  // Se repite cada parada para que la cápsula se detenga un instante en cada nodo.
  const ida = paradas.flatMap((p) => [p, p])
  const vuelta = [...ida].reverse()

  return (
    <div className="relative mt-4">
      <div className="absolute inset-x-16 top-1/2 h-1 -translate-y-1/2 rounded-full bg-[repeating-linear-gradient(90deg,#8b8f9e_0_10px,transparent_10px_16px)] opacity-60" />
      <div className="relative flex items-center justify-between">
        {nodos.map(({ icono: Icono, texto }) => (
          <div key={texto} className={`relative z-10 flex w-32 flex-col items-center gap-1 rounded-lg border bg-panel px-2 py-2 text-center text-sm ${resaltada ? 'border-cyan text-fg' : 'border-white/20 text-body'}`}>
            <Icono aria-hidden="true" size={26} className={resaltada ? 'text-cyan' : 'text-muted'} />
            {texto}
          </div>
        ))}
      </div>
      {!reducido && (
        <div className="pointer-events-none absolute inset-x-16 top-0 bottom-0">
          <Capsula posiciones={ida} duracion={duracion} retraso={0} texto="SELECT …" color="#ffb547" />
          <Capsula posiciones={vuelta} duracion={duracion} retraso={duracion} texto="3 filas" color="#7ef0b1" />
        </div>
      )}
    </div>
  )
}

const SERVIDOR: Nodo[] = [
  { icono: GameControllerIcon, texto: 'Juego' },
  { icono: WifiHighIcon, texto: 'Red' },
  { icono: HardDrivesIcon, texto: 'Servidor de BD' },
  { icono: FileIcon, texto: 'Disco' },
]

const EMBEBIDO: Nodo[] = [
  { icono: GameControllerIcon, texto: 'Juego + SQLite' },
  { icono: FileIcon, texto: 'estacion_norte.db' },
]

export default function Flujo() {
  return (
    <div className="grid gap-4">
      <Card title="Cliente-servidor (MySQL, PostgreSQL…)">
        <Tuberia nodos={SERVIDOR} duracion={3.2} />
        <p className="mt-4 text-sm">La consulta <span className="font-mono text-amber">SELECT</span> viaja por la red hasta un <strong className="text-fg">proceso aparte</strong>, que lee el disco y devuelve las <span className="font-mono text-mint">filas</span>: 3 tramos de ida y 3 de vuelta.</p>
      </Card>
      <Card tone="cyan" title="Embebido (SQLite)">
        <div className="w-1/2 max-[900px]:w-full">
          <Tuberia nodos={EMBEBIDO} duracion={1.1} resaltada />
        </div>
        <p className="mt-4 text-sm">La librería corre <strong className="text-fg">dentro del juego</strong> y lee el archivo directamente: 1 tramo de ida y 1 de vuelta, sin red ni servidor.</p>
      </Card>
    </div>
  )
}
