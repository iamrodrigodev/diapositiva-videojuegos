import { LightningSlashIcon } from '@phosphor-icons/react'
import Lead from '../../components/Lead'
import Reveal from '../../components/Reveal'
import Slide from '../../components/Slide'
import Simulacion from './Simulacion'

export default function SeFueLaLuz() {
  return (
    <Slide bloque="Bloque 3 · Guardado de partidas" titulo={<span className="inline-flex items-center gap-3"><LightningSlashIcon aria-hidden="true" /> Se fue la luz</span>} interactiva>
      <Lead>Un guardado son <strong>varias escrituras seguidas</strong>. ¿Qué pasa si se va la luz justo en medio?</Lead>
      <Reveal>
        <Simulacion />
      </Reveal>
    </Slide>
  )
}
