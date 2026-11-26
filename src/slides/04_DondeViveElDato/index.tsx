import { GameControllerIcon } from '@phosphor-icons/react'
import Clasificador, { type DestinoClasificacion, type ItemClasificable } from '../../components/Clasificador'
import Lead from '../../components/Lead'
import Reveal from '../../components/Reveal'
import Slide from '../../components/Slide'

const DESTINOS: DestinoClasificacion[] = [
  { id: 'escena', titulo: '1 · Escena' },
  { id: 'sesion', titulo: '2 · Sesión' },
  { id: 'disco', titulo: '3 · Disco' },
]

const ITEMS: ItemClasificable[] = [
  { id: 'balas', texto: 'Posición de las balas en pantalla', destino: 'escena' },
  { id: 'volumen', texto: 'Volumen elegido en Opciones', destino: 'disco' },
  { id: 'musica', texto: 'Música que sigue entre niveles', destino: 'sesion' },
  { id: 'enemigo', texto: 'Vida del jefe actual', destino: 'escena' },
  { id: 'record', texto: 'Mejor puntaje histórico', destino: 'disco' },
  { id: 'acumulado', texto: 'Puntaje de la partida en curso', destino: 'sesion' },
  { id: 'checkpoint', texto: 'Checkpoint "Estación norte"', destino: 'disco' },
]

export default function DondeViveElDato() {
  return (
    <Slide bloque="Bloque 1 · Contexto" titulo={<span className="inline-flex items-center gap-3"><GameControllerIcon aria-hidden="true" /> Mini-juego: ¿dónde vive cada dato?</span>} interactiva>
      <Lead>Un voluntario pasa al frente y lleva cada dato de <strong>Estación Norte</strong> al nivel de vida que necesita.</Lead>
      <Reveal>
        <Clasificador items={ITEMS} destinos={DESTINOS} />
      </Reveal>
    </Slide>
  )
}
