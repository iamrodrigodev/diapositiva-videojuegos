import { DatabaseIcon } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'framer-motion'
import { siUnity } from 'simple-icons'
import { fadeUp, stagger } from '../../lib/motion'
import BorrarProgreso from './BorrarProgreso'

const INTEGRANTES = [
  'Rodrigo Emerson Infanzón Acosta',
  'Carlos Daniel Aguilar Chirinos',
  'Abimael Frontado Fajardo',
  'Esther Mariana Chunga Pacheco',
]

export default function Portada() {
  const reducedMotion = useReducedMotion() === true

  return (
    <motion.div
      className="mx-auto grid w-full max-w-360 gap-[clamp(1.5rem,4vh,3rem)] px-[clamp(1.25rem,7vw,7rem)] py-[clamp(2rem,6vh,5rem)]"
      variants={stagger}
      initial={reducedMotion ? false : 'hidden'}
      animate="show"
    >
      <motion.header variants={fadeUp}>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-medium text-body">
          <span className="inline-flex items-center gap-2">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6 fill-current">
              <path d={siUnity.path} />
            </svg>
            Unity
          </span>
          <span className="inline-flex items-center gap-2 border-l border-white/20 pl-5">
            <DatabaseIcon aria-hidden="true" size={23} className="text-mint" />
            Bases de datos
          </span>
        </div>
        <h1 className="mt-[clamp(1.25rem,3vh,2.5rem)] font-display text-[clamp(2.35rem,8.65vw,8rem)] leading-[1.04] font-bold tracking-[-0.07em] text-fg">
          Persistencia de datos <span className="block w-fit text-amber">en videojuegos</span>
        </h1>
      </motion.header>

      <motion.div variants={fadeUp} className="w-fit max-w-full font-mono text-[0.85rem] leading-[1.4] text-fg max-[480px]:text-xs">
        <table className="border-collapse bg-panel [&_:is(th,td)]:border [&_:is(th,td)]:border-line [&_:is(th,td)]:px-[clamp(0.45rem,1.5vw,1rem)] [&_:is(th,td)]:py-[0.45rem] [&_:is(th,td)]:text-left [&_th]:font-normal [&_th]:text-muted">
          <caption className="pb-[0.55rem] text-left text-mint"><span className="inline-flex items-center gap-[0.55rem]"><DatabaseIcon aria-hidden="true" size={18} /> Progreso de la partida</span></caption>
          <thead>
            <tr><th scope="col">Partida</th><th scope="col">Nivel</th><th scope="col">Punto de control</th></tr>
          </thead>
          <tbody>
            <tr><td>42</td><td>07</td><td>Estación norte</td></tr>
          </tbody>
        </table>
      </motion.div>
      <motion.section variants={fadeUp} aria-labelledby="integrantes" className="portada-team border-t border-line pt-[0.85rem]">
        <h2 id="integrantes" className="font-mono text-xs font-medium tracking-[0.19em] text-mint uppercase">
          Integrantes
        </h2>
        <ul className="mt-[0.65rem] grid grid-cols-4 gap-x-6 gap-y-3 text-[clamp(0.95rem,1.3vw,1.1rem)] leading-normal text-fg max-[760px]:grid-cols-2">
          {INTEGRANTES.map((nombre) => <li key={nombre}>{nombre}</li>)}
        </ul>
      </motion.section>
      <motion.div variants={fadeUp}>
        <BorrarProgreso />
      </motion.div>
    </motion.div>
  )
}
