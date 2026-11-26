import { GameControllerIcon } from '@phosphor-icons/react'
import Clasificador, { type DestinoClasificacion, type ItemClasificable } from '../../components/Clasificador'
import Lead from '../../components/Lead'
import Reveal from '../../components/Reveal'
import Slide from '../../components/Slide'
import { CASOS } from '../../data/casosReales'

const DESTINOS: DestinoClasificacion[] = CASOS.map((c) => ({
  id: c.juego,
  titulo: c.juego,
  detalle: (
    <>
      <p className="font-mono text-xs text-cyan">{c.tipo}</p>
      <p className="mt-1">{c.detalle}</p>
      <p className="mt-1 font-mono text-xs text-muted">Fuente: {c.fuente}</p>
    </>
  ),
}))

// Orden mezclado a propósito para que no coincida con el de los juegos.
const ITEMS: ItemClasificable[] = [3, 0, 4, 2, 1].flatMap((i) => {
  const c = CASOS[i]
  return c ? [{ id: c.tecnologia, texto: c.tecnologia, destino: c.juego }] : []
})

export default function JuegosReales() {
  return (
    <Slide bloque="Bloque 1 · Contexto" titulo={<span className="inline-flex items-center gap-3"><GameControllerIcon aria-hidden="true" /> Mini-juego: ¿qué usa cada juego real?</span>} interactiva>
      <Lead>Un voluntario empareja cada juego con su tecnología. Al comprobar se revela <strong>cómo y qué persiste</strong> cada uno.</Lead>
      <Reveal>
        <Clasificador items={ITEMS} destinos={DESTINOS} columnas="grid-cols-5 max-[1200px]:grid-cols-3" />
      </Reveal>
    </Slide>
  )
}
