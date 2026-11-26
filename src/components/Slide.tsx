import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, stagger } from '../lib/motion'

type Props = {
  bloque: string
  titulo: ReactNode
  interactiva?: boolean
  children: ReactNode
}

export default function Slide({ bloque, titulo, interactiva, children }: Props) {
  const reducedMotion = useReducedMotion() === true

  return (
    <motion.div
      className="mx-auto grid w-full max-w-360 gap-[clamp(1rem,3vh,2rem)] px-[clamp(1.25rem,6vw,6rem)] py-[clamp(1.5rem,5vh,4rem)]"
      variants={stagger}
      initial={reducedMotion ? false : 'hidden'}
      animate="show"
    >
      <motion.header variants={fadeUp}>
        <p className="flex items-center gap-3 font-mono text-xs font-medium tracking-[0.2em] text-amber uppercase">
          <span aria-hidden="true" className="size-2 rotate-45 bg-amber" />
          {bloque}
          {interactiva && <span className="chamfer bg-amber px-2.5 py-1 font-bold tracking-[0.14em] text-ink">▶ Jugable</span>}
        </p>
        <h1 className="mt-3 font-display text-[clamp(1.9rem,4.4vw,3.75rem)] leading-[1.05] font-bold tracking-[-0.01em] text-fg uppercase">{titulo}</h1>
      </motion.header>
      {children}
    </motion.div>
  )
}
