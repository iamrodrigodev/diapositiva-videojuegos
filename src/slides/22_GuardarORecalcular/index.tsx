import { CardsIcon } from '@phosphor-icons/react'
import Lead from '../../components/Lead'
import Reveal from '../../components/Reveal'
import Slide from '../../components/Slide'
import Cartas from './Cartas'

export default function GuardarORecalcular() {
  return (
    <Slide bloque="Bloque 3 · Guardado de partidas" titulo={<span className="inline-flex items-center gap-3"><CardsIcon aria-hidden="true" /> ¿Guardar o recalcular?</span>} interactiva>
      <Lead>Aplica la regla de oro: ¿el dato es <strong>estado</strong> o se puede <strong>calcular</strong>? Decide rápido y mantén la racha.</Lead>
      <Reveal>
        <Cartas />
      </Reveal>
    </Slide>
  )
}
