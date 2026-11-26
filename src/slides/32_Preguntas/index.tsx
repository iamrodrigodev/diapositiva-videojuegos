import { ChatsCircleIcon } from '@phosphor-icons/react'
import Reveal from '../../components/Reveal'
import Slide from '../../components/Slide'

export default function Preguntas() {
  return (
    <Slide bloque="Cierre" titulo="Gracias">
      <Reveal className="grid justify-items-center gap-6 py-10 text-center">
        <ChatsCircleIcon aria-hidden="true" size={110} className="text-cyan" />
        <p className="font-display text-[clamp(3rem,7vw,6rem)] leading-none font-bold text-fg uppercase">¿Preguntas?</p>
        <p className="max-w-[50ch] text-lg text-body">Persistencia de datos en videojuegos: guardado de partidas y tablas de puntuaciones con <strong className="text-fg">SQLite en Unity</strong>.</p>
      </Reveal>
    </Slide>
  )
}
