import { PlugsConnectedIcon } from '@phosphor-icons/react'
import Lead from '../../components/Lead'
import Reveal from '../../components/Reveal'
import Slide from '../../components/Slide'
import Cables from './Cables'

export default function ConectaLosCables() {
  return (
    <Slide bloque="Bloque 2 · SQLite en Unity" titulo={<span className="inline-flex items-center gap-3"><PlugsConnectedIcon aria-hidden="true" /> Conecta los cables</span>} interactiva>
      <Lead>El DatabaseManager se quedó sin energía. Une cada pieza de código con <strong>lo que hace</strong> y pulsa <strong>Dar energía</strong>.</Lead>
      <Reveal>
        <Cables />
      </Reveal>
    </Slide>
  )
}
