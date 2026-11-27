import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, stagger } from '../../lib/motion'
import Confeti from './Confeti'

export default function Preguntas() {
  const reducido = useReducedMotion() === true

  return (
    <>
      <Confeti />
      <motion.div
        className="mx-auto grid max-w-360 justify-items-center gap-6 px-[clamp(1.25rem,5vw,5rem)] py-10 text-center"
        variants={stagger}
        initial={reducido ? false : 'hidden'}
        animate="show"
      >
        <motion.p variants={fadeUp} className="font-mono text-sm font-medium tracking-[0.3em] text-amber uppercase">Gracias</motion.p>
        <motion.h1 variants={fadeUp} className="font-display text-[clamp(3rem,7vw,6rem)] leading-none font-bold text-fg uppercase">¿Preguntas?</motion.h1>
        <motion.p variants={fadeUp} className="max-w-[50ch] text-lg text-body">Persistencia de datos en videojuegos: guardado de partidas y tablas de puntuaciones con <strong className="text-fg">SQLite en Unity</strong>.</motion.p>
      </motion.div>
    </>
  )
}
