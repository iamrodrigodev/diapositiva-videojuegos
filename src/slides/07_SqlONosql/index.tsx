import { GameControllerIcon } from '@phosphor-icons/react'
import Clasificador, { type DestinoClasificacion, type ItemClasificable } from '../../components/Clasificador'
import Lead from '../../components/Lead'
import Reveal from '../../components/Reveal'
import Slide from '../../components/Slide'

const DESTINOS: DestinoClasificacion[] = [
  { id: 'sql', titulo: <span className="text-cyan">SQL</span> },
  { id: 'nosql', titulo: <span className="text-amber">NoSQL</span> },
]

const ITEMS: ItemClasificable[] = [
  { id: 'mongo', texto: 'MongoDB', destino: 'nosql' },
  { id: 'join', texto: 'JOIN entre partidas e inventario', destino: 'sql' },
  { id: 'sqlite', texto: 'SQLite', destino: 'sql' },
  { id: 'campos', texto: 'Cada registro con campos distintos', destino: 'nosql' },
  { id: 'postgres', texto: 'PostgreSQL', destino: 'sql' },
  { id: 'leveldb', texto: 'LevelDB', destino: 'nosql' },
  { id: 'esquema', texto: 'Esquema fijo de columnas', destino: 'sql' },
  { id: 'firestore', texto: 'Firestore', destino: 'nosql' },
]

export default function SqlONosql() {
  return (
    <Slide bloque="Bloque 1 · Contexto" titulo={<span className="inline-flex items-center gap-3"><GameControllerIcon aria-hidden="true" /> Mini-juego: ¿SQL o NoSQL?</span>} interactiva>
      <Lead>Un voluntario clasifica motores y características. Contra el reloj: ¿quién lo hace en menos de 30 segundos?</Lead>
      <Reveal>
        <Clasificador items={ITEMS} destinos={DESTINOS} columnas="grid-cols-2" />
      </Reveal>
    </Slide>
  )
}
