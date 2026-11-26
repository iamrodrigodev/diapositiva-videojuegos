import { StackIcon } from '@phosphor-icons/react'
import Clasificador, { type DestinoClasificacion, type ItemClasificable } from '../../components/Clasificador'
import Lead from '../../components/Lead'
import Reveal from '../../components/Reveal'
import Slide from '../../components/Slide'

const DESTINOS: DestinoClasificacion[] = [
  { id: 'prefs', titulo: <span className="text-fg">PlayerPrefs</span>, detalle: 'Pocos valores sueltos que se leen al iniciar: no merecen una base de datos.' },
  { id: 'json', titulo: <span className="text-fg">JSON</span>, detalle: 'Un objeto que se guarda y carga entero, o que el jugador puede exportar y compartir.' },
  { id: 'sqlite', titulo: <span className="text-amber">SQLite</span>, detalle: 'Muchos registros relacionados que se consultan, filtran y ordenan en el dispositivo.' },
  { id: 'servidor', titulo: <span className="text-cyan">Servidor</span>, detalle: 'Datos compartidos entre jugadores o con valor real: el servidor es la fuente de verdad.' },
]

const ITEMS: ItemClasificable[] = [
  { id: 'ranuras', texto: '3 ranuras de partida', destino: 'sqlite' },
  { id: 'volumen', texto: 'Volumen y brillo', destino: 'prefs' },
  { id: 'mundial', texto: 'Ranking mundial', destino: 'servidor' },
  { id: 'controles', texto: 'Mapa de controles personalizado', destino: 'json' },
  { id: 'inventario', texto: 'Inventario de cada partida', destino: 'sqlite' },
  { id: 'idioma', texto: 'Idioma elegido', destino: 'prefs' },
  { id: 'compras', texto: 'Compras con dinero real', destino: 'servidor' },
  { id: 'top10', texto: 'Top 10 local con fechas', destino: 'sqlite' },
  { id: 'nivel', texto: 'Nivel creado por el jugador para compartir', destino: 'json' },
  { id: 'historial', texto: 'Historial de 500 partidas jugadas', destino: 'sqlite' },
]

export default function QuienGuardaQue() {
  return (
    <Slide bloque="Bloque 1 · Contexto" titulo={<span className="inline-flex items-center gap-3"><StackIcon aria-hidden="true" /> Jefe final: ¿quién guarda qué?</span>} interactiva>
      <Lead>
        Un juego real <strong>combina varias tecnologías</strong>. Un voluntario reparte los 10 datos de Estación Norte entre las cuatro; al comprobar se revela el criterio de cada una. Fíjense en cuál se lleva más datos.
      </Lead>
      <Reveal>
        <Clasificador items={ITEMS} destinos={DESTINOS} columnas="grid-cols-4 max-[1100px]:grid-cols-2" />
      </Reveal>
    </Slide>
  )
}
