import { DetectiveIcon } from '@phosphor-icons/react'
import Lead from '../../components/Lead'
import Reveal from '../../components/Reveal'
import Slide from '../../components/Slide'
import { CASOS } from '../../data/casosReales'
import QuienSoy from './QuienSoy'

export default function JuegosReales() {
  return (
    <Slide bloque="Bloque 1 · Contexto" titulo={<span className="inline-flex items-center gap-3"><DetectiveIcon aria-hidden="true" /> ¿Quién soy?</span>} interactiva>
      <Lead>5 juegos al azar de {CASOS.length} casos reales. Cada pista extra resta puntos: <strong>arriésgate</strong>.</Lead>
      <Reveal>
        <QuienSoy />
      </Reveal>
    </Slide>
  )
}
