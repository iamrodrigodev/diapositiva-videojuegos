import { GameControllerIcon } from '@phosphor-icons/react'
import Clasificador, { type DestinoClasificacion } from '../../components/Clasificador'
import Lead from '../../components/Lead'
import Reveal from '../../components/Reveal'
import Slide from '../../components/Slide'
import { MAZO_VIDA_DATOS } from '../../data/mazoVidaDatos'

const DESTINOS: DestinoClasificacion[] = [
  { id: 'escena', titulo: '1 · Escena' },
  { id: 'sesion', titulo: '2 · Sesión' },
  { id: 'disco', titulo: '3 · Disco' },
]

export default function DondeViveElDato() {
  return (
    <Slide bloque="Bloque 1 · Contexto" titulo={<span className="inline-flex items-center gap-3"><GameControllerIcon aria-hidden="true" /> ¿Dónde vive cada dato?</span>} interactiva>
      <Lead>Lleva cada dato de <strong>Estación Norte</strong> a su nivel de vida. ¿Otra mano? <strong>Nuevas cartas</strong>.</Lead>
      <Reveal>
        <Clasificador id="vida-datos" items={MAZO_VIDA_DATOS} destinos={DESTINOS} porRonda={7} />
      </Reveal>
    </Slide>
  )
}
