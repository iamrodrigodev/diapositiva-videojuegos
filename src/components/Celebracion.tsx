import { motion, useReducedMotion } from 'framer-motion'

const COLORES = ['#ffb547', '#5ee1ff', '#7ef0b1', '#ff6b5b', '#c1a5ff']
const CHISPAS = Array.from({ length: 28 }, (_, i) => {
  const angulo = (i / 28) * Math.PI * 2
  const distancia = 140 + (i % 4) * 45
  return { x: Math.cos(angulo) * distancia, y: Math.sin(angulo) * distancia, color: COLORES[i % COLORES.length]!, giro: i * 37 }
})

export default function Celebracion({ activa }: { activa: boolean }) {
  const reducido = useReducedMotion()
  if (!activa || reducido) return null

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 grid place-items-center overflow-visible">
      {CHISPAS.map((c, i) => (
        <motion.span
          key={i}
          className="absolute size-2.5"
          style={{ background: c.color, clipPath: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)' }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1.4, rotate: 0 }}
          animate={{ x: c.x, y: c.y, opacity: 0, scale: 0.4, rotate: c.giro }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}
