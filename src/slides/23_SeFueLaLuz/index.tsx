import { XCircleIcon } from '@phosphor-icons/react'
import Lead from '../../components/Lead'
import Reveal from '../../components/Reveal'
import Slide from '../../components/Slide'
import Simulacion from './Simulacion'

export default function SeFueLaLuz() {
  return (
    <Slide bloque="Bloque 3 · Guardado de partidas" titulo={<span className="inline-flex items-center gap-3"><XCircleIcon aria-hidden="true" /> El juego se cerró</span>} interactiva>
      <Lead>Un guardado son <strong>varias escrituras seguidas</strong>. ¿Qué pasa si el juego <strong>se cierra de golpe</strong> justo en medio? Un cuelgue, la batería agotada, un apagón…</Lead>
      <Reveal>
        <Simulacion />
      </Reveal>
    </Slide>
  )
}
