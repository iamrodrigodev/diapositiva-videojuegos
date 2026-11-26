import { BugIcon } from '@phosphor-icons/react'
import Lead from '../../components/Lead'
import Reveal from '../../components/Reveal'
import Slide from '../../components/Slide'
import CazaBugs from './CazaBugs'

export default function EncuentraElBug() {
  return (
    <Slide bloque="Bloque 2 · SQLite en Unity" titulo={<span className="inline-flex items-center gap-3"><BugIcon aria-hidden="true" /> Encuentra el bug</span>} interactiva>
      <Lead>Tres fragmentos con errores de lo que acabamos de ver: rutas, conexiones, inyección SQL y transacciones. <strong>¿Quién los caza todos?</strong></Lead>
      <Reveal>
        <CazaBugs />
      </Reveal>
    </Slide>
  )
}
