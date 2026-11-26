import { ChatsCircleIcon, CrownIcon } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'framer-motion'
import Celebracion from '../../components/Celebracion'
import Reveal from '../../components/Reveal'
import Slide from '../../components/Slide'
import { ordenarEquipos, useEquipos } from '../../lib/equipos'

const ESCALONES = [
  { puesto: 2, alto: 'h-32', color: 'bg-fg/80' },
  { puesto: 1, alto: 'h-44', color: 'bg-amber' },
  { puesto: 3, alto: 'h-24', color: 'bg-coral' },
]

export default function Podio() {
  const [equipos] = useEquipos()
  const orden = ordenarEquipos(equipos)
  const reducido = useReducedMotion()
  const hayPuntos = orden.some((e) => e.puntos > 0)

  return (
    <Slide bloque="Cierre" titulo="Podio final">
      <Reveal className="relative grid justify-items-center">
        <Celebracion activa={hayPuntos} />
        <div className="flex items-end gap-4">
          {ESCALONES.map(({ puesto, alto, color }, i) => {
            const equipo = orden[puesto - 1]
            return (
              <div key={puesto} className="flex w-44 flex-col items-center gap-2">
                {puesto === 1 && <CrownIcon aria-hidden="true" size={40} className="text-amber" />}
                <p className="font-display text-xl font-bold text-fg">{equipo?.nombre ?? '—'}</p>
                <p className="font-mono text-coral">{equipo ? `${equipo.puntos} pts` : ''}</p>
                <motion.div
                  initial={reducido ? false : { scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.3 + i * 0.25, duration: 0.6, ease: 'easeOut' }}
                  style={{ originY: 1 }}
                  className={`chamfer grid w-full place-items-center ${alto} ${color}`}
                >
                  <span className="font-display text-5xl font-bold text-ink">{puesto}</span>
                </motion.div>
              </div>
            )
          })}
        </div>
        {!hayPuntos && <p className="mt-3 text-sm text-muted">Aún no hay puntos: se suman en el Ranking en vivo (diapositiva 30).</p>}
      </Reveal>
      <Reveal className="flex items-center justify-center gap-4 rounded-lg border border-white/12 bg-panel p-5">
        <ChatsCircleIcon aria-hidden="true" size={48} className="text-cyan" />
        <p className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-fg uppercase">¿Preguntas?</p>
      </Reveal>
    </Slide>
  )
}
