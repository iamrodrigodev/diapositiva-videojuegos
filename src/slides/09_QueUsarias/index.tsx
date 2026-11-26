import { ChatsCircleIcon } from '@phosphor-icons/react'
import Lead from '../../components/Lead'
import Reveal from '../../components/Reveal'
import Slide from '../../components/Slide'
import { CASOS_VOTACION } from '../../data/casosVotacion'
import TarjetaVotacion from './TarjetaVotacion'

export default function QueUsarias() {
  return (
    <Slide bloque="Bloque 1 · Contexto" titulo={<span className="inline-flex items-center gap-3"><ChatsCircleIcon aria-hidden="true" /> Reto: ¿qué usarías?</span>} interactiva>
      <Lead>El público vota a mano alzada y luego se marca la opción más votada. Apliquen los criterios de la matriz de alternativas.</Lead>
      <Reveal>
        <ul className="grid grid-cols-2 gap-3 max-[760px]:grid-cols-1">
          {CASOS_VOTACION.map((c) => <TarjetaVotacion key={c.juego} caso={c} />)}
        </ul>
      </Reveal>
      <Reveal className="font-mono text-sm text-emerald-200">
        Por eso elegimos SQLite para Estación Norte. Cómo funciona por dentro: Bloque 2.
      </Reveal>
    </Slide>
  )
}
