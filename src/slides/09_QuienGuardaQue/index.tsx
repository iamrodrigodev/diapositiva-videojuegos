import { CloudArrowUpIcon, DatabaseIcon, FileCodeIcon, SlidersHorizontalIcon, StackIcon } from '@phosphor-icons/react'
import Clasificador, { type DestinoClasificacion, type ItemClasificable } from '../../components/Clasificador'
import Lead from '../../components/Lead'
import Reveal from '../../components/Reveal'
import Slide from '../../components/Slide'

const DESTINOS: DestinoClasificacion[] = [
  { id: 'prefs', titulo: <span className="inline-flex items-center gap-2 text-fg"><SlidersHorizontalIcon aria-hidden="true" /> PlayerPrefs</span>, detalle: 'Pocos valores sueltos que se leen al iniciar: no merecen una base de datos.' },
  { id: 'json', titulo: <span className="inline-flex items-center gap-2 text-fg"><FileCodeIcon aria-hidden="true" /> JSON</span>, detalle: 'Un objeto que se guarda y carga entero, o que el jugador puede exportar y compartir.' },
  { id: 'sqlite', titulo: <span className="inline-flex items-center gap-2 text-amber"><DatabaseIcon aria-hidden="true" /> SQLite</span>, detalle: 'Muchos registros relacionados que se consultan, filtran y ordenan en el dispositivo.' },
  { id: 'servidor', titulo: <span className="inline-flex items-center gap-2 text-cyan"><CloudArrowUpIcon aria-hidden="true" /> Servidor</span>, detalle: 'Datos compartidos entre jugadores o con valor real: el servidor es la fuente de verdad.' },
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
    <Slide bloque="Bloque 1 · Contexto" titulo={<span className="inline-flex items-center gap-3"><StackIcon aria-hidden="true" /> ¿Quién guarda qué?</span>} interactiva>
      <Lead>
        Un juego real <strong>combina varias tecnologías</strong>: reparte los 10 datos de Estación Norte y mira cuál se lleva más.
      </Lead>
      <Reveal>
        <Clasificador id="quien-guarda-que" items={ITEMS} destinos={DESTINOS} columnas="grid-cols-4 max-[1100px]:grid-cols-2"
          conclusion={
            <p className="flex flex-wrap items-center gap-2 text-fg">
              <DatabaseIcon aria-hidden="true" size={22} className="text-amber" />
              <strong className="font-display text-lg text-amber">Por eso elegimos SQLite para Estación Norte:</strong>
              es la que más datos guarda (4 de 10: partidas, inventario, historial y top 10) con consultas y sin servidor. Cómo usarlo en Unity: Bloque 2.
            </p>
          }
        />
      </Reveal>
    </Slide>
  )
}
