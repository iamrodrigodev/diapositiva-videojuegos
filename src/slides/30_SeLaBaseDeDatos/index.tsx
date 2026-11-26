import { DatabaseIcon } from '@phosphor-icons/react'
import Lead from '../../components/Lead'
import Reveal from '../../components/Reveal'
import Slide from '../../components/Slide'
import Ejecutor from './Ejecutor'

export default function SeLaBaseDeDatos() {
  return (
    <Slide bloque="Bloque 4 · Puntuaciones" titulo={<span className="inline-flex items-center gap-3"><DatabaseIcon aria-hidden="true" /> Sé la base de datos</span>} interactiva>
      <Lead>Ahora tú eres SQLite: lee la consulta y toca, <strong>en orden</strong>, las filas que devolverías.</Lead>
      <Reveal>
        <Ejecutor />
      </Reveal>
    </Slide>
  )
}
