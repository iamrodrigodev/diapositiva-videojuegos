import { CodeIcon, DatabaseIcon, FileIcon, GameControllerIcon, HardDrivesIcon, WifiHighIcon, type Icon } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Card from '../../components/Card'

type Nodo = { icono: Icon; texto: string; detalle: string }
type Grupo = { desde: number; hasta: number; texto: string; tono: 'cyan' | 'muted' }

const OPERACIONES = [
  { consulta: 'SELECT', respuesta: '3 filas' },
  { consulta: 'INSERT', respuesta: '1 fila insertada' },
  { consulta: 'UPDATE', respuesta: '2 filas actualizadas' },
  { consulta: 'DELETE', respuesta: '1 fila borrada' },
]

function Capsula({ posiciones, duracion, texto, color }: { posiciones: string[]; duracion: number; texto: string; color: string }) {
  return (
    <motion.span
      aria-hidden="true"
      className="absolute top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full px-2.5 py-0.5 font-mono text-[0.7rem] font-bold whitespace-nowrap text-ink"
      style={{ background: color, boxShadow: `0 0 14px ${color}` }}
      initial={{ left: posiciones[0] ?? '0%', opacity: 0 }}
      animate={{ left: posiciones, opacity: posiciones.map((_, i) => (i === 0 || i === posiciones.length - 1 ? 0 : 1)) }}
      transition={{ duration: duracion, ease: 'easeInOut' }}
    >
      {texto}
    </motion.span>
  )
}

function Tuberia({ nodos, grupos, duracion, resaltada }: { nodos: Nodo[]; grupos: Grupo[]; duracion: number; resaltada?: boolean }) {
  const reducido = useReducedMotion()
  const [vuelta, setVuelta] = useState(0)

  useEffect(() => {
    if (reducido) return
    const t = window.setInterval(() => setVuelta((v) => v + 1), duracion * 2000)
    return () => window.clearInterval(t)
  }, [duracion, reducido])

  const n = nodos.length
  const centro = (k: number) => `${((k + 0.5) / n) * 100}%`
  const ida = nodos.flatMap((_, k) => [centro(k), centro(k)])
  const regreso = [...ida].reverse()
  const op = OPERACIONES[vuelta % OPERACIONES.length]!
  const fase = vuelta % 2

  return (
    <div className="relative mt-2 pt-7">
      {grupos.map((g) => (
        <div key={g.texto} className={`absolute top-0 bottom-0 rounded-lg border-2 border-dashed ${g.tono === 'cyan' ? 'border-cyan/50 bg-cyan/5' : 'border-white/20'}`} style={{ left: `${(g.desde / n) * 100}%`, width: `${((g.hasta - g.desde + 1) / n) * 100}%` }}>
          <span className={`absolute top-1 left-3 font-mono text-[0.7rem] tracking-[0.12em] uppercase ${g.tono === 'cyan' ? 'text-cyan' : 'text-muted'}`}>{g.texto}</span>
        </div>
      ))}
      <div className="absolute top-[calc(50%+0.875rem)] h-1 -translate-y-1/2 rounded-full bg-[repeating-linear-gradient(90deg,#8b8f9e_0_10px,transparent_10px_16px)] opacity-60" style={{ left: centro(0), right: `${(0.5 / n) * 100}%` }} />
      <div className="relative grid pb-3" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
        {nodos.map(({ icono: Icono, texto, detalle }) => (
          <div key={texto} className="flex justify-center px-2">
            <div className={`relative z-10 flex w-full max-w-36 flex-col items-center gap-0.5 rounded-lg border bg-panel px-2 py-2 text-center text-sm ${resaltada ? 'border-cyan text-fg' : 'border-white/20 text-body'}`}>
              <Icono aria-hidden="true" size={24} className={resaltada ? 'text-cyan' : 'text-muted'} />
              <span className="font-bold text-fg">{texto}</span>
              <span className="text-[0.7rem] leading-tight text-muted">{detalle}</span>
            </div>
          </div>
        ))}
      </div>
      {!reducido && (
        <div className="pointer-events-none absolute inset-x-0 top-7 bottom-3">
          {fase === 0
            ? <Capsula key={`ida-${vuelta}`} posiciones={ida} duracion={duracion} texto={`${op.consulta} …`} color="#ffb547" />
            : <Capsula key={`vuelta-${vuelta}`} posiciones={regreso} duracion={duracion} texto={OPERACIONES[(vuelta - 1) % OPERACIONES.length]!.respuesta} color="#7ef0b1" />}
        </div>
      )}
    </div>
  )
}

const SERVIDOR: Nodo[] = [
  { icono: GameControllerIcon, texto: 'Juego', detalle: 'tu código C#' },
  { icono: WifiHighIcon, texto: 'Red', detalle: 'internet o LAN' },
  { icono: HardDrivesIcon, texto: 'Servidor de BD', detalle: 'MySQL, PostgreSQL' },
  { icono: FileIcon, texto: 'Disco', detalle: 'archivos del servidor' },
]

const EMBEBIDO: Nodo[] = [
  { icono: CodeIcon, texto: 'Juego', detalle: 'tu código C#' },
  { icono: DatabaseIcon, texto: 'SQLite', detalle: 'librería dentro del juego' },
  { icono: FileIcon, texto: 'estacion_norte.db', detalle: 'archivo local' },
]

export default function Flujo() {
  return (
    <div className="grid gap-3">
      <Card title="Cliente-servidor">
        <Tuberia
          nodos={SERVIDOR}
          duracion={3.2}
          grupos={[{ desde: 0, hasta: 0, texto: 'Tu equipo', tono: 'muted' }, { desde: 2, hasta: 3, texto: 'Otra máquina', tono: 'muted' }]}
        />
        <p className="mt-2 text-sm">Cada operación viaja por la red hasta un <strong className="text-fg">programa aparte</strong> que hay que instalar y mantener encendido.</p>
      </Card>
      <Card tone="cyan" title="Embebido · SQLite">
        <Tuberia
          nodos={EMBEBIDO}
          duracion={1.1}
          resaltada
          grupos={[{ desde: 0, hasta: 1, texto: 'Un solo programa: el juego', tono: 'cyan' }]}
        />
        <p className="mt-2 text-sm">SQLite es una <strong className="text-fg">librería que se compila dentro del juego</strong>: la operación no sale del programa y va directo al archivo.</p>
      </Card>
    </div>
  )
}
