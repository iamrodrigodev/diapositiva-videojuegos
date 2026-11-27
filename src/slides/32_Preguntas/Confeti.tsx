import { motion, useReducedMotion } from 'framer-motion'
import { createPortal } from 'react-dom'

const COLORES = ['#ffb547', '#5ee1ff', '#7ef0b1', '#ff6b5b', '#b39cff']
const PIEZAS = Array.from({ length: 70 }, (_, i) => ({
  izquierda: (i * 37) % 100,
  color: COLORES[i % COLORES.length]!,
  ancho: 6 + (i % 3) * 3,
  alto: 10 + (i % 4) * 3,
  duracion: 4 + (i % 5) * 0.9,
  retraso: (i % 14) * 0.35,
  vaiven: (i % 2 ? 1 : -1) * (20 + (i % 6) * 8),
  giro: (i % 2 ? 1 : -1) * (360 + (i % 4) * 180),
}))

export default function Confeti() {
  if (useReducedMotion()) return null

  return createPortal(
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {PIEZAS.map((p, i) => (
        <motion.span
          key={i}
          className="absolute -top-6 rounded-[2px]"
          style={{ left: `${p.izquierda}%`, width: p.ancho, height: p.alto, background: p.color }}
          initial={{ y: '0vh', x: 0, rotate: 0, opacity: 0 }}
          animate={{ y: '110vh', x: [0, p.vaiven, 0], rotate: p.giro, opacity: [0, 1, 1, 0.8] }}
          transition={{ duration: p.duracion, delay: p.retraso, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>,
    document.body,
  )
}
