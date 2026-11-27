import { ChatsCircleIcon } from '@phosphor-icons/react'
import Reveal from '../../components/Reveal'

export default function Preguntas() {
  return (
    <Reveal className="mx-auto grid max-w-360 justify-items-center gap-6 px-[clamp(1.25rem,5vw,5rem)] py-10 text-center">
      <ChatsCircleIcon aria-hidden="true" size={110} className="text-cyan" />
      <p className="font-mono text-sm font-medium tracking-[0.3em] text-amber uppercase">Gracias</p>
      <h1 className="font-display text-[clamp(3rem,7vw,6rem)] leading-none font-bold text-fg uppercase">¿Preguntas?</h1>
      <p className="max-w-[50ch] text-lg text-body">Persistencia de datos en videojuegos: guardado de partidas y tablas de puntuaciones con <strong className="text-fg">SQLite en Unity</strong>.</p>
    </Reveal>
  )
}
