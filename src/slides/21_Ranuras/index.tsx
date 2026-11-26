import Slide from '../../components/Slide'
import Tabs from '../../components/Tabs'
import Actualizacion from './Actualizacion'
import Autoguardado from './Autoguardado'
import SimuladorRanuras from './SimuladorRanuras'

const TABS = [
  { id: 'ranuras', label: 'Ranuras', contenido: <SimuladorRanuras /> },
  { id: 'auto', label: 'Autoguardado', contenido: <Autoguardado /> },
  { id: 'actualizar', label: 'Actualizar el juego', contenido: <Actualizacion /> },
]

export default function Ranuras() {
  return (
    <Slide bloque="Bloque 3 · Guardado de partidas" titulo="Ranuras de guardado">
      <Tabs tabs={TABS} label="Ranuras de guardado" />
    </Slide>
  )
}
