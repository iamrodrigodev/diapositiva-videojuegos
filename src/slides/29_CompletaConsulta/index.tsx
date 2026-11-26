import { PuzzlePieceIcon } from '@phosphor-icons/react'
import Lead from '../../components/Lead'
import Reveal from '../../components/Reveal'
import Slide from '../../components/Slide'
import Rompecabezas from './Rompecabezas'

export default function CompletaConsulta() {
  return (
    <Slide bloque="Bloque 4 · Puntuaciones" titulo={<span className="inline-flex items-center gap-3"><PuzzlePieceIcon aria-hidden="true" /> Completa la consulta</span>} interactiva>
      <Lead>Cuatro consultas del bloque con huecos. Arma cada una con las fichas correctas y pulsa <strong>Ejecutar</strong>.</Lead>
      <Reveal>
        <Rompecabezas />
      </Reveal>
    </Slide>
  )
}
