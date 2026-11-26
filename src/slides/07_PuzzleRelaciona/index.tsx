import { PuzzlePieceIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import Button from '../../components/Button'
import Lead from '../../components/Lead'
import Reveal from '../../components/Reveal'
import Slide from '../../components/Slide'
import { CASOS, OPCIONES_PUZZLE } from '../../data/casosReales'
import FilaPuzzle from './FilaPuzzle'

export default function PuzzleRelaciona() {
  const [respuestas, setRespuestas] = useState<Record<string, string>>({})
  const [comprobado, setComprobado] = useState(false)
  const aciertos = CASOS.filter((c) => respuestas[c.juego] === c.tecnologia).length

  return (
    <Slide bloque="Bloque 1 · Contexto" titulo={<span className="inline-flex items-center gap-3"><PuzzlePieceIcon aria-hidden="true" /> Puzzle: relaciona juego y tecnología</span>} interactiva>
      <Lead>Por equipos: elijan qué tecnología usa cada juego real para persistir sus datos. <strong>Una opción sobra.</strong></Lead>
      <Reveal>
        <ul className="grid grid-cols-2 gap-3 max-[760px]:grid-cols-1">
          {CASOS.map((c) => {
            const valor = respuestas[c.juego] ?? ''
            return (
              <FilaPuzzle
                key={c.juego}
                juego={c.juego}
                opciones={OPCIONES_PUZZLE}
                valor={valor}
                estado={!comprobado ? 'pendiente' : valor === c.tecnologia ? 'correcto' : 'incorrecto'}
                onChange={(v) => { setRespuestas({ ...respuestas, [c.juego]: v }); setComprobado(false) }}
              />
            )
          })}
        </ul>
      </Reveal>
      <Reveal className="flex flex-wrap items-center gap-4">
        <Button onClick={() => setComprobado(true)}>Comprobar</Button>
        <Button variant="secondary" onClick={() => { setRespuestas({}); setComprobado(false) }}>Reiniciar</Button>
        <p role="status" className="font-mono text-emerald-200">
          {comprobado && `${aciertos} / ${CASOS.length} aciertos · la solución, en la siguiente diapositiva`}
        </p>
      </Reveal>
    </Slide>
  )
}
