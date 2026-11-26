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
        <p className="flex items-center gap-3 font-mono text-xs font-medium tracking-[0.19em] text-emerald-300 uppercase">
          {bloque}
          {interactiva && <span className="rounded-[0.3rem] border border-[#c1a5ff80] px-2 py-1 tracking-[0.12em] text-[#d6c6ff]">Interactiva</span>}
        </p>
        <h1 className="mt-3 font-display text-[clamp(1.9rem,4.6vw,4rem)] leading-[1.05] font-bold tracking-[-0.05em] text-[#f4f8ff]">{titulo}</h1>
      </motion.header>
      {children}
    </motion.div>
  )
}
