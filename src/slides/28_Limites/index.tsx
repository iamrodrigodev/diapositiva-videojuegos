import { CloudArrowUpIcon, DeviceMobileIcon, PencilSimpleIcon, TrashIcon, type Icon } from '@phosphor-icons/react'
import Card from '../../components/Card'
import Reveal from '../../components/Reveal'
import Slide from '../../components/Slide'
import { sonido } from '../../lib/sonido'
import { usePersistentState } from '../../lib/usePersistentState'

const LIMITES: { icono: Icon; titulo: string; texto: string }[] = [
  { icono: DeviceMobileIcon, titulo: 'No es global', texto: 'Cada dispositivo tiene su propio .db: tu ranking no ve el de tus amigos.' },
  { icono: PencilSimpleIcon, titulo: 'Se puede editar', texto: 'El archivo está en el dispositivo del jugador: con DB Browser (Bloque 2) cualquiera abre estacion_norte.db y cambia su puntaje.' },
  { icono: TrashIcon, titulo: 'Se pierde con el dispositivo', texto: 'Desinstalar el juego borra persistentDataPath y el ranking con él; al cambiar de celular, el ranking se queda en el viejo.' },
]

function Trampa() {
  const [editado, setEditado] = usePersistentState('trampa:editado', false)
  const filas: [string, number][] = [['ana', 12040], ['leo', 11870], ['tú', editado ? 999999 : 8200]]
  const orden = [...filas].sort((a, b) => b[1] - a[1])

  return (
    <Card tone="coral" title="Pruébalo: hacer trampa en 1 clic">
      <ol className="mt-3 grid gap-1 font-mono text-sm">
        {orden.map(([n, p], i) => (
          <li key={n} className={`grid grid-cols-[2rem_1fr_auto] rounded-[0.3rem] px-3 py-1.5 ${n === 'tú' ? (editado ? 'bg-coral/20 text-coral' : 'bg-mint/10 text-mint') : 'text-fg'}`}>
            <span>{i + 1}.</span><span>{n}</span><span>{p.toLocaleString('es-PE')}</span>
          </li>
        ))}
      </ol>
      <code className="mt-3 block rounded-[0.3rem] bg-well p-2 font-mono text-xs text-fg">UPDATE records SET puntaje = 999999 WHERE jugador_id = 3 AND nivel = 3;</code>
      <button type="button" onClick={() => { setEditado(!editado); if (!editado) sonido.error() }} className="chamfer mt-3 flex min-h-10 items-center gap-2 bg-coral px-4 font-bold text-ink hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan">
        <PencilSimpleIcon aria-hidden="true" size={16} /> {editado ? 'Deshacer' : 'Editar estacion_norte.db'}
      </button>
    </Card>
  )
}

export default function Limites() {
  return (
    <Slide bloque="Bloque 4 · Puntuaciones" titulo="Límites del ranking local">
      <Reveal className="grid grid-cols-[3fr_2fr] gap-4 max-[900px]:grid-cols-1">
        <div className="grid content-start gap-3">
          {LIMITES.map(({ icono: Icono, titulo, texto }) => (
            <div key={titulo} className="flex gap-3 rounded-lg border border-white/12 bg-panel p-3">
              <Icono aria-hidden="true" size={30} className="shrink-0 text-coral" />
              <div><p className="font-display text-lg font-bold text-fg">{titulo}</p><p className="text-body">{texto}</p></div>
            </div>
          ))}
          <div className="flex gap-3 rounded-lg border border-cyan/45 bg-cyan/5 p-3">
            <CloudArrowUpIcon aria-hidden="true" size={30} className="shrink-0 text-cyan" />
            <div><p className="font-display text-lg font-bold text-fg">¿Y si el ranking importa?</p><p className="text-body">Ranking mundial o con premios: los puntajes van a un <strong className="text-fg">servidor</strong> que los valida (las alternativas del Bloque 1). SQLite sigue siendo ideal para el ranking personal y sin conexión.</p></div>
          </div>
        </div>
        <Trampa />
      </Reveal>
    </Slide>
  )
}
